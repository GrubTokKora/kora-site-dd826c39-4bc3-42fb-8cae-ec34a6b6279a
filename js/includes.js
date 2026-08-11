/* Kumo Sushi Lounge shared chrome — links from kumoscarsdale.com */
(function () {
  const ORDER = "https://www.toasttab.com/kumo-sushi";
  const RESERVE = "https://www.opentable.com/restaurant/profile/1505575/reserve?restref=1505575&lang=en-US&ot_source=Restaurant%20website";
  const CATERING = "https://www.ezcater.com/catering/pvt/kumo-japanese-restaurant-3?fcv=1";
  const PHONE = "9147138899";
  const PHONE_DISPLAY = "914.713.8899";
  const FAX = "914.713.8895";
  const EMAIL = "info@kumoscarsdale.com";
  const MAPS = "https://maps.app.goo.gl/tB9yCV884DJ5TJR4A";
  const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.336409145281!2d-73.80646742350218!3d40.974584621498195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c29305a05de229%3A0x9661f245e8f173a6!2sKUMO%20Sushi%20Lounge!5e1!3m2!1sen!2sin!4v1786426836713!5m2!1sen!2sin";
  const LOGO = "https://quseprdus1.blob.core.windows.net/kora-business-images/user-media/dd826c39-4bc3-42fb-8cae-ec34a6b6279a/de8c94d8-887e-4625-825f-ec262dbc28df/1786366227_a7x4az.png";
  const SOCIAL = {
    facebook: "https://www.facebook.com/Kumo-Sushi-Japanese-Restaurant-336360726556772/",
    instagram: "https://www.instagram.com/kumoscarsdale/",
    twitter: "https://twitter.com/kumoscarsdale",
    yelp: "https://www.yelp.com/biz/kumo-japanese-restaurant-scarsdale",
    tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g48570-d13437854-Reviews-Kumo_Sushi_and_Lounge-Scarsdale_New_York.html"
  };

  window.KUMO_LINKS = {
    ORDER, RESERVE, CATERING, PHONE, PHONE_DISPLAY, FAX, EMAIL, MAPS, MAP_EMBED, SOCIAL
  };

  const icon = {
    menu: '<svg class="icon-stroke" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg class="icon-stroke" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  function mountHeader(el, page) {
    const active = (id) => (page === id ? ' aria-current="page"' : "");
    el.innerHTML = `
      <div class="nav-shell">
        <a class="brand" href="index.html" aria-label="Kumo Sushi Lounge home">
          <img src="${LOGO}" width="138" height="56" alt="Kumo Sushi Lounge">
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="index.html"${active("home")}>Home</a>
          <a href="about.html"${active("about")}>About</a>
          <a href="menu.html"${active("menu")}>Menu</a>
          <a href="gallery.html"${active("gallery")}>Gallery</a>
          <a href="contact.html"${active("contact")}>Contact</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-ghost btn-sm" data-reserve href="${RESERVE}" target="_blank" rel="noopener noreferrer">Reserve</a>
          <a class="btn btn-hot btn-sm" data-order href="${ORDER}" target="_blank" rel="noopener noreferrer">Order Online</a>
        </div>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-open>${icon.menu}</button>
      </div>`;
  }

  function mountMobile(el) {
    el.innerHTML = `
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="menu.html">Menu</a>
      <a href="gallery.html">Gallery</a>
      <a href="contact.html">Contact</a>
      <a href="${CATERING}" target="_blank" rel="noopener noreferrer">Order Catering</a>
      <a href="${RESERVE}" target="_blank" rel="noopener noreferrer">Reservation</a>
      <a href="${ORDER}" target="_blank" rel="noopener noreferrer">Order Online</a>
      <a href="tel:${PHONE}">Call ${PHONE_DISPLAY}</a>
      <a href="${MAPS}" target="_blank" rel="noopener noreferrer">Directions</a>`;
  }

  function mountFooter(el) {
    const year = new Date().getFullYear();
    el.innerHTML = `
      <div class="footer-shell">
        <div class="footer-brand">
          <img src="${LOGO}" width="160" height="65" alt="Kumo Sushi Lounge">
          <p>An inspiration derived from traditional Japanese culture. Freshest ingredients, prepared to individual taste.</p>
          <div class="footer-social" aria-label="Social media">
            <a href="${SOCIAL.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="${SOCIAL.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="${SOCIAL.twitter}" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="${SOCIAL.yelp}" target="_blank" rel="noopener noreferrer">Yelp</a>
            <a href="${SOCIAL.tripadvisor}" target="_blank" rel="noopener noreferrer">TripAdvisor</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Visit</h4>
          <p><a href="${MAPS}" target="_blank" rel="noopener noreferrer">777 White Plains Rd.<br>Scarsdale, NY 10583</a></p>
          <p>Tel: <a href="tel:${PHONE}">${PHONE_DISPLAY}</a></p>
          <p>Fax: ${FAX}</p>
          <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
          <p style="margin-top:1rem"><a href="${CATERING}" target="_blank" rel="noopener noreferrer">Order Catering</a></p>
          <p><a href="${RESERVE}" target="_blank" rel="noopener noreferrer">Reservation (OpenTable)</a></p>
          <p><a href="${ORDER}" target="_blank" rel="noopener noreferrer">Order Online</a></p>
        </div>
        <div class="footer-col">
          <h4>Open 7 Days</h4>
          <p class="footer-note">(Serving Lunch &amp; Dinner)</p>
          <div class="footer-hours">
            <div><span>Mon – Thu</span><span>11:30am – 10pm</span></div>
            <div><span>Fri – Sat</span><span>11:30am – 11pm</span></div>
            <div><span>Sunday</span><span>12:30pm – 10pm</span></div>
            <div><span>Happy Hour</span><span>Mon – Sat · 4–7pm</span></div>
          </div>
          <p class="footer-note" style="margin-top:1rem">Free delivery with purchases of $20 or more</p>
          <p class="footer-note">Omakase available — call for more info</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${year} Kumo — Sushi · Lounge · All Rights Reserved</p>
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page || "home";
    const header = document.querySelector("[data-header]");
    const footer = document.querySelector("[data-footer]");
    const mobile = document.querySelector("[data-mobile-nav]");
    if (header) mountHeader(header, page);
    if (footer) mountFooter(footer);
    if (mobile) mountMobile(mobile);

    const openBtn = document.querySelector("[data-nav-open]");

    function setChromeHeight() {
      const siteHeader = document.querySelector(".site-header");
      const headH = siteHeader ? siteHeader.offsetHeight : 82;
      document.documentElement.style.setProperty("--header-h", headH + "px");
      document.documentElement.style.setProperty("--site-chrome-h", headH + "px");
      if (mobile) mobile.style.top = headH + "px";
    }

    function openNav() {
      if (!mobile) return;
      mobile.classList.add("is-open");
      document.body.classList.add("nav-open");
      if (openBtn) {
        openBtn.setAttribute("aria-expanded", "true");
        openBtn.setAttribute("aria-label", "Close menu");
        openBtn.innerHTML = icon.close;
      }
    }

    function closeNav() {
      if (!mobile) return;
      mobile.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      if (openBtn) {
        openBtn.setAttribute("aria-expanded", "false");
        openBtn.setAttribute("aria-label", "Open menu");
        openBtn.innerHTML = icon.menu;
      }
    }

    openBtn && openBtn.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
    });
    mobile && mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    const siteHeader = document.querySelector(".site-header");
    const onScroll = () => {
      if (!siteHeader) return;
      if (page === "home") {
        siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setChromeHeight, { passive: true });
    onScroll();
    setChromeHeight();
    requestAnimationFrame(setChromeHeight);

    document.querySelectorAll("[data-map-embed]").forEach((el) => {
      if (el.tagName === "IFRAME") el.src = MAP_EMBED;
    });
  });
})();
