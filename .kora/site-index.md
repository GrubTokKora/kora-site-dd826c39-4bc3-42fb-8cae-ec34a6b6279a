# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Kumo Sushi Lounge | Japanese Izakaya in Scarsdale, NY
purpose: Home page for Kumo Sushi Lounge, an izakaya in Scarsdale, NY, providing an overview, hours, and quick links to reservations, menus, online ordering, and catering.
sections:
- Hero introduction
- `#about` "Welcome to Kumo — Sushi & Lounge" — About story and awards
- Featured menu categories: Sushi & Sashimi, Chef's Selection, The Lounge
- `#main` "Open 7 Days · Lunch & Dinner" — Hours, service highlights, and action links: Order Online, Reservation, Order Catering
also: The restaurant name, description, and image appear in the head meta tags, OpenGraph tags, Twitter cards, and JSON-LD structured data.

## about.html → /about
title: About | Kumo Sushi Lounge Scarsdale
purpose: Provide information about the history, concept, and background of Kumo Sushi & Lounge in Scarsdale.
sections:
- page introduction
- business background, stats, and reservation link: Make a Reservation

## contact.html → /contact
title: Contact | Kumo Sushi Lounge Scarsdale
purpose: Provide contact information, location, operating hours, and a contact form for Kumo Sushi Lounge.
sections:
- page introduction: Contact & Reservations, Kumo — Sushi · Lounge
- contact details, hours, delivery info, and action links: Reservation, Order Online, Order Catering, Get directions →
- `#main` "Send us a note" — contact form: Send Message

## gallery.html → /gallery
title: Gallery | Kumo Sushi Lounge Scarsdale
purpose: Display a photo gallery of dishes, drinks, and the lounge atmosphere at Kumo Sushi Lounge.
sections:
- `#main` "Our Gallery" — Photo gallery images

## menu.html → /menu
title: Menu | Kumo Sushi Lounge Scarsdale
purpose: Display the restaurant's menu with categories and items.
sections:
- introduction text
- `#menu` — menu ledger and categories

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — Restaurant profile, contact details, hours, links, and brand settings for LLMs and scrapers: Home, About, Menu, Gallery, Contact  [content]
- `robots.txt` — 26 bytes — too small to hold content
- `sitemap.xml` — 110 bytes — too small to hold content
- `assets/site.css` — Stylesheet defining the site's layout, design system variables, and component styles
- `js/includes.js` — site header, footer, contact details, business hours, and external links: Home, About, Menu, Gallery, Contact, Reserve, Order Online, Order Catering, Reservation, Directions, Instagram, Facebook, Twitter, Yelp, TripAdvisor  [content]
- `js/main.js` — Form handling, reCAPTCHA integration, smooth scrolling, menu ledger layout logic, and external link wiring for the site
- `js/menu-data.js` — the restaurant menu items, prices, and categories: Miso / Clear / Kinoko Soup for 1, Green Salad, Seaweed Salad, Avocado Salad, Kani Salad, Chicken Avocado Salad, Yellowtail / Salmon / Tuna Salad, Ichiban Salad, Salmon Skin Salad, Truffle Tuna, Salmon Asian Pear, Yuzu Baby Yellowtail, Tuna / Salmon / Yellowtail Tartare, Toro Tartare, Tuna / Salmon / Yellowtail Pizza, Crispy Bites, Black Cod Wonton, Grill Lamb Chop (2 pcs), Sweet Soy Rib, Orange Cauliflower, Rock Shrimp Tempura, Edamame, Harumaki, Vegetable / Sweet Potato Tempura, Chicken / Shrimp & Veg Tempura, Pork or Duck Bun, Crispy Calamari, Roast Duck Wrap, Grill Octopus, Shishito Pepper, Beef Spare Ribs, Miso Chilean Seabass, Soft Shell Crab, Beef Negimaki, Beef Shumai (3 pcs), Pork Shumai (3 pcs), Pork and Shrimp Shumai (3 pcs), Shrimp Shumai (6 pcs), Shrimp Crystal Dumpling (3 pcs), Steam Roasted Pork Bun (2 pcs), Black Truffle Shrimp Dumpling (3 pcs), Pork Soup Dumpling (4 pcs), Shrimp Soup Dumpling (4 pcs), Shrimp & Pork Soup Dumpling (4 pcs), Vegetable Gyoza (Steamed or Fried), Chicken Gyoza (Steamed or Fried), Shiso Squid, Spicy Crunch Tuna, Salmon Ikura, Yellowtail Avocado Yuzu Sauce, Eel Cucumber, Shiitake Mushroom, Toro Caviar, Wagyu Kombu Salt, King Crab, Uni Caviar, California Roll, Tuna / Salmon / Yellowtail Scallion Roll, Tuna Avocado or Cucumber Roll, Spicy Tuna / Salmon Roll, Toro Scallion Roll, Sweet Potato Roll, Philadelphia Roll, Spicy Yellowtail / Kani / Shrimp Roll, Eel / Avocado Cucumber Roll, Salmon Skin Roll, King Crab Avocado Roll, Spider Roll (5 pcs), Dragon Roll (8 pcs), Rainbow Roll, Shrimp Tempura Roll, Tuna (Maguro), Fatty Tuna (Toro), Salmon (Sake), Yellowtail (Hamachi), Baby Yellowtail, California Uni, Japanese Maidai, Flying Fish Roe (Tobiko), Salmon Roe (Ikura), Eel (Unagi), Shrimp (Ebi), Kumamoto Oyster, Lobster, Alaskan King Crab, Sweet Shrimp (Amaebi), Octopus (Tako), Egg (Tamago), Fluke (Hirame), King Salmon, Sea Scallop, Bronzini, Live Scallop, Rock N Roll, Greenwich Roll, Lobster Roll, Passion Roll, Mango Roll, Out Of Control Roll, Lonely Angel Roll, Ocean Roll, Fancy Roll, Naruto Style, Banzai Roll, Manhattan Roll, Good 4 You Roll, Kumo Roll, Godzilla Roll, Sweetheart Roll, Spicy Girl Roll, Lobster King Roll, Fire Roll, Crazy Tuna Roll, Sushi Deluxe, Sashimi Deluxe, Tuna or Salmon Lover, American Sushi, American Sashimi, Sushi & Sashimi Combo, Crispy Lychee Bronzino, Grill Chilean Sea Bass, Thai Curry Seafood, Tempura Shrimp or Chicken, Teriyaki, Fried Rice, Chicken, Salmon, Steak, Shrimp, Filet Mignon  [content]

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
