/* Live Kora site business id (matches repo / Azure user-media folder). */
window.KORA_SITE_CONFIG = {
  apiBaseUrl: "https://kora-agent.grubtok.com",
  businessId: "dd826c39-4bc3-42fb-8cae-ec34a6b6279a",
  recaptchaSiteKey: "6LcsdJYsAAAAAAur-h7cYlZuGJTmijNHmOi5kFH7",
};
window.KORA_CONFIG = Object.assign(window.KORA_CONFIG || {}, window.KORA_SITE_CONFIG);

/* Menu data loaded from js/menu-data.js */

function parseApiError(data, fallback) {
  const detail = data && data.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const joined = detail.map((d) => d.msg || d.message || "").filter(Boolean).join(" ");
    if (joined) return joined;
  }
  if (data && typeof data.message === "string" && data.message.trim()) return data.message;
  return fallback;
}

function setFormStatus(form, text, kind) {
  const statusEl = form.querySelector(".form-status, [data-form-status]");
  if (!statusEl) return;
  statusEl.textContent = text || "";
  statusEl.classList.toggle("is-visible", Boolean(text));
  statusEl.classList.remove(
    "form-status--error",
    "form-status--success",
    "form-status--neutral",
    "is-error",
    "is-success",
    "is-neutral"
  );
  if (kind === "error") statusEl.classList.add("form-status--error", "is-error");
  else if (kind === "success") statusEl.classList.add("form-status--success", "is-success");
  else if (kind) statusEl.classList.add("form-status--neutral", "is-neutral");
}

function setSubmittingState(form, isSubmitting, busyLabel) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  if (isSubmitting) {
    submitBtn.dataset.originalText = submitBtn.textContent || "Send Message";
    submitBtn.textContent = busyLabel || "Sending...";
    submitBtn.disabled = true;
    return;
  }
  submitBtn.textContent = submitBtn.dataset.originalText || "Send Message";
  submitBtn.disabled = false;
}

let recaptchaScriptPromise = null;
const RECAPTCHA_W = 304;
const RECAPTCHA_H = 78;
const responsiveRecaptchaBoxes = [];

function scaleRecaptcha(box) {
  const wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains("g-recaptcha-scale")) return;
  const available = wrap.clientWidth;
  if (!available) return;
  const scale = Math.min(1, available / RECAPTCHA_W);
  box.style.transform = scale < 1 ? "scale(" + scale.toFixed(4) + ")" : "none";
  wrap.style.height = Math.ceil(RECAPTCHA_H * scale) + "px";
}

function makeRecaptchaResponsive(box) {
  if (!box || box.dataset.koraRecaptchaResponsive === "true") return;
  box.dataset.koraRecaptchaResponsive = "true";

  let wrap = box.parentElement;
  if (!wrap || !wrap.classList.contains("g-recaptcha-scale")) {
    wrap = document.createElement("div");
    wrap.className = "g-recaptcha-scale";
    box.parentNode.insertBefore(wrap, box);
    wrap.appendChild(box);
  }

  scaleRecaptcha(box);
  const observer = new MutationObserver(() => scaleRecaptcha(box));
  observer.observe(box, { childList: true, subtree: true });
  responsiveRecaptchaBoxes.push(box);
}

let recaptchaResizeTimer = null;
window.addEventListener("resize", () => {
  window.clearTimeout(recaptchaResizeTimer);
  recaptchaResizeTimer = window.setTimeout(() => {
    responsiveRecaptchaBoxes.forEach(scaleRecaptcha);
  }, 150);
});

function ensureRecaptchaScript(siteKey) {
  if (!siteKey) return Promise.resolve();
  if (typeof window.grecaptcha !== "undefined") return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;
  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-kora-recaptcha="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA failed to load")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.koraRecaptcha = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });
  return recaptchaScriptPromise;
}

function getRecaptchaToken(form) {
  if (typeof window.grecaptcha === "undefined") return "";
  const recaptchaEl = form.querySelector(".g-recaptcha");
  if (!recaptchaEl) return "";
  return window.grecaptcha.getResponse() || "";
}

function resetRecaptcha(form) {
  if (typeof window.grecaptcha === "undefined") return;
  if (form.querySelector(".g-recaptcha")) window.grecaptcha.reset();
}

/**
 * Kora public forms API — POST {apiBaseUrl}/api/v1/public/forms/submit
 * reCAPTCHA v2 + business_id matching the live Kora site.
 */
function initContactForm() {
  const form = document.getElementById("contact-form") || document.querySelector("[data-contact-form]");
  if (!form || form.dataset.bound) return;
  form.dataset.bound = "true";

  const config = window.KORA_SITE_CONFIG || window.KORA_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || "").replace(/\/+$/, "");
  const businessId = config.businessId || "";
  const recaptchaSiteKey = (config.recaptchaSiteKey || "").trim();
  const recaptchaEl = form.querySelector(".g-recaptcha");

  if (recaptchaEl && recaptchaSiteKey) {
    recaptchaEl.setAttribute("data-sitekey", recaptchaSiteKey);
    makeRecaptchaResponsive(recaptchaEl);
    form.addEventListener(
      "focusin",
      () => {
        ensureRecaptchaScript(recaptchaSiteKey).catch(() => {
          setFormStatus(form, "Security check failed to load. Please refresh and try again.", "error");
        });
      },
      { once: true }
    );
  } else if (recaptchaEl && !recaptchaSiteKey) {
    recaptchaEl.style.display = "none";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = ((form.querySelector('[name="name"]') || {}).value || "").trim();
    const email = ((form.querySelector('[name="email"]') || {}).value || "").trim();
    const phone = ((form.querySelector('[name="phone"]') || {}).value || "").trim();
    const party = ((form.querySelector('[name="party"]') || {}).value || "").trim();
    const message = ((form.querySelector('[name="message"]') || {}).value || "").trim();

    if (!name || !email || !message) {
      setFormStatus(form, "Please fill in your name, email, and message.", "error");
      return;
    }

    if (!businessId || !apiBaseUrl) {
      setFormStatus(form, "Form submission is not configured for this site.", "error");
      return;
    }

    if (recaptchaEl && !recaptchaSiteKey) {
      setFormStatus(form, "Form temporarily unavailable.", "error");
      return;
    }

    if (recaptchaEl && recaptchaSiteKey) {
      try {
        await ensureRecaptchaScript(recaptchaSiteKey);
      } catch (err) {
        setFormStatus(form, "Security check failed to load. Please refresh and try again.", "error");
        return;
      }
      if (!getRecaptchaToken(form)) {
        setFormStatus(form, "Please complete the security check.", "error");
        return;
      }
    }

    const captchaToken = getRecaptchaToken(form);
    setSubmittingState(form, true, "Sending...");
    setFormStatus(form, "Sending...", "neutral");

    const formData = {
      name: name,
      email: email,
      message: party ? `Party size: ${party}\n${message}` : message,
    };
    if (phone) formData.phone = phone;
    if (party) formData.party_size = party;

    try {
      const response = await fetch(apiBaseUrl + "/api/v1/public/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          form_type: "contact",
          form_data: formData,
          submitter_email: email,
          captcha_token: captchaToken || "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          parseApiError(data, "Something went wrong. Please try again or call us at (914) 713-8899.")
        );
      }
      form.reset();
      resetRecaptcha(form);
      setFormStatus(form, data.message || "Thank you! Your message has been received.", "success");
    } catch (error) {
      resetRecaptcha(form);
      setFormStatus(
        form,
        (error && error.message) || "Something went wrong. Please try again or call us at (914) 713-8899.",
        "error"
      );
    } finally {
      setSubmittingState(form, false);
    }
  });
}

(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        },
        /* threshold 0: fire as soon as any pixel is visible (tall blocks like gallery
           grids fail at 0.12 until most of the element is on-screen). */
        { threshold: 0, rootMargin: "24px 0px 24px 0px" }
      );
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight + 24 && rect.bottom > -24;
        if (inView) el.classList.add("is-in");
        else io.observe(el);
      });
    } else {
      reveals.forEach((el) => el.classList.add("is-in"));
    }

    const links = window.KUMO_LINKS || {};
    function wireExternal(sel, url) {
      if (!url) return;
      document.querySelectorAll(sel).forEach((a) => {
        a.href = url;
        if (/^https?:/i.test(url)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
      });
    }
    wireExternal("[data-order]", links.ORDER);
    wireExternal("[data-reserve]", links.RESERVE);
    wireExternal("[data-catering]", links.CATERING);

    /* Menu page: Green Chili–style ledger + scroll-spy */
    const menu = window.KUMO_MENU;
    const cats = (menu && menu.categories) || [];
    const ledgerNav = document.querySelector("[data-ledger-nav]");
    const ledgerBody = document.querySelector("[data-ledger-body]");
    const ledgerRoot = document.querySelector(".menu-ledger");
    const ledgerHeader = document.querySelector(".site-header");
    let ledgerSpyPaused = false;
    let ledgerSpyTimer = null;
    let ledgerActiveId = "";
    let ledgerScrollRaf = 0;
    const LEDGER_SCROLL_MARGIN = 12;
    const LEDGER_SPY_SLACK = 2;
    const LEDGER_END_PIN_PX = 48;

    function isLedgerMobile() {
      return window.matchMedia("(max-width: 899px)").matches;
    }

    function getLedgerChromeHeight() {
      const headerH = ledgerHeader ? ledgerHeader.offsetHeight : 82;
      const navH = isLedgerMobile() && ledgerNav ? ledgerNav.offsetHeight : 0;
      return headerH + navH;
    }

    function getLedgerScrollMargin() {
      return getLedgerChromeHeight() + LEDGER_SCROLL_MARGIN;
    }

    function getLedgerSpyLine() {
      const sample = ledgerBody && ledgerBody.querySelector("[data-ledger-section]");
      if (sample) {
        const margin = parseFloat(getComputedStyle(sample).scrollMarginTop);
        if (!Number.isNaN(margin) && margin > 0) return margin + LEDGER_SPY_SLACK;
      }
      return getLedgerScrollMargin() + LEDGER_SPY_SLACK;
    }

    function updateLedgerStickyOffset() {
      if (!ledgerNav) return;
      const value = getLedgerScrollMargin() + "px";
      if (ledgerRoot) {
        ledgerRoot.style.setProperty("--ledger-sticky-offset", value);
        ledgerRoot.classList.toggle("is-nav-sticky", isLedgerMobile());
      }
      document.documentElement.style.setProperty("--ledger-sticky-offset", value);
    }

    function setActiveLedgerLink(id, { scrollBtnIntoView = false, updateHash = false } = {}) {
      if (!ledgerNav || !id || id === ledgerActiveId) return;
      ledgerActiveId = id;
      let activeBtn = null;
      ledgerNav.querySelectorAll("[data-ledger-link]").forEach((a) => {
        const on = a.getAttribute("data-ledger-link") === id;
        a.classList.toggle("is-active", on);
        if (on) {
          a.setAttribute("aria-current", "true");
          activeBtn = a;
        } else {
          a.removeAttribute("aria-current");
        }
      });
      if (scrollBtnIntoView && activeBtn && ledgerNav.scrollWidth > ledgerNav.clientWidth + 4) {
        const navRect = ledgerNav.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const offset = btnRect.left - navRect.left - (navRect.width - btnRect.width) / 2;
        ledgerNav.scrollBy({ left: offset, behavior: "smooth" });
      }
      if (updateHash) {
        try {
          history.replaceState(null, "", "#" + id);
        } catch (_) {}
      }
    }

    function resolveLedgerActiveId(sections) {
      if (!sections.length) return "";
      const scrollingEl = document.scrollingElement || document.documentElement;
      const scrollBottom = scrollingEl.scrollTop + window.innerHeight;
      const docHeight = scrollingEl.scrollHeight;
      if (docHeight - scrollBottom <= LEDGER_END_PIN_PX) {
        return sections[sections.length - 1].getAttribute("data-ledger-section");
      }
      const line = getLedgerSpyLine();
      let currentId = sections[0].getAttribute("data-ledger-section");
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) {
          currentId = sections[i].getAttribute("data-ledger-section");
        } else {
          break;
        }
      }
      return currentId;
    }

    function syncLedgerSpyFromScroll(sections) {
      if (ledgerSpyPaused || !sections.length) return;
      const currentId = resolveLedgerActiveId(sections);
      if (currentId) setActiveLedgerLink(currentId, { scrollBtnIntoView: true });
    }

    function scrollToLedgerCategory(id) {
      const section = document.getElementById("cat-" + id);
      if (!section) return;
      ledgerSpyPaused = true;
      clearTimeout(ledgerSpyTimer);
      updateLedgerStickyOffset();
      setActiveLedgerLink(id, { scrollBtnIntoView: true, updateHash: true });
      requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      let settled = false;
      const resume = () => {
        if (settled) return;
        settled = true;
        ledgerSpyPaused = false;
        window.removeEventListener("scrollend", resume);
        clearTimeout(ledgerSpyTimer);
        setActiveLedgerLink(id, { scrollBtnIntoView: true });
      };
      window.addEventListener("scrollend", resume, { once: true });
      ledgerSpyTimer = setTimeout(resume, 900);
    }

    function itemRows(items) {
      return (items || [])
        .map(
          (item) => `
            <article class="menu-row">
              <div>
                <h3>${item.name}${
                  item.tag
                    ? `<span class="badge${item.tagTone === "hot" ? " badge-hot" : ""}">${item.tag}</span>`
                    : ""
                }</h3>
                ${item.description ? `<p>${item.description}</p>` : ""}
              </div>
              <div class="price">${item.price || ""}</div>
            </article>`
        )
        .join("");
    }

    if (ledgerNav && ledgerBody && cats.length) {
      const order = (window.KUMO_LINKS && window.KUMO_LINKS.ORDER) || "https://www.toasttab.com/kumo-sushi";
      const catering = (window.KUMO_LINKS && window.KUMO_LINKS.CATERING) || "#";
      ledgerNav.innerHTML = cats
        .map(
          (cat, i) =>
            `<button type="button" class="ledger-link${i === 0 ? " is-active" : ""}" data-ledger-link="${cat.id}"${i === 0 ? ' aria-current="true"' : ""}>${cat.name}</button>`
        )
        .join("");

      ledgerBody.innerHTML =
        cats
          .map(
            (cat) => `
        <section class="ledger-block" id="cat-${cat.id}" data-ledger-section="${cat.id}">
          <div class="ledger-block-head">
            <h2>${cat.name}</h2>
            ${cat.note ? `<span>${cat.note}</span>` : ""}
          </div>
          ${itemRows(cat.items)}
        </section>`
          )
          .join("") +
        `<div class="menu-actions ledger-order menu-foot">
          <div class="divider" aria-hidden="true"><i></i><span>◆</span><i></i></div>
          <p>Prices subject to change · Please inform your server of any food allergies. Consuming raw or undercooked seafood may increase risk of foodborne illness.</p>
          <div class="hero-actions">
            <a class="btn btn-hot" data-order href="${order}" target="_blank" rel="noopener noreferrer">Order Online</a>
            <a class="btn btn-ghost" data-catering href="${catering}" target="_blank" rel="noopener noreferrer">Order Catering</a>
          </div>
        </div>`;

      wireExternal("[data-order]", links.ORDER);
      wireExternal("[data-catering]", links.CATERING);

      const sections = [...ledgerBody.querySelectorAll("[data-ledger-section]")];
      ledgerActiveId = cats[0].id;

      ledgerNav.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-ledger-link]");
        if (!btn) return;
        scrollToLedgerCategory(btn.getAttribute("data-ledger-link"));
      });

      const onScrollOrResize = () => {
        if (ledgerScrollRaf) return;
        ledgerScrollRaf = requestAnimationFrame(() => {
          ledgerScrollRaf = 0;
          updateLedgerStickyOffset();
          syncLedgerSpyFromScroll(sections);
        });
      };

      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize, { passive: true });
      updateLedgerStickyOffset();
      syncLedgerSpyFromScroll(sections);

      const hashId = (location.hash || "").replace(/^#/, "");
      if (cats.some((c) => c.id === hashId)) {
        requestAnimationFrame(() => scrollToLedgerCategory(hashId));
      }
    }

    /* Gallery lightbox */
    const lb = document.querySelector("[data-lightbox]");
    const lbImg = document.querySelector("[data-lightbox-img]");
    const lbClose = document.querySelector("[data-lightbox-close]");
    document.querySelectorAll("[data-gallery-item]").forEach((el) => {
      el.addEventListener("click", () => {
        const src = getComputedStyle(el).backgroundImage.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
        if (!src || !lb || !lbImg) return;
        lbImg.src = src;
        lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLb() {
      if (!lb) return;
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    lbClose && lbClose.addEventListener("click", closeLb);
    lb &&
      lb.addEventListener("click", (e) => {
        if (e.target === lb) closeLb();
      });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLb();
    });

    initContactForm();
  });
})();
