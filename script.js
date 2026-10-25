/* ==========================================
   GREENVITA CAFE — WEBSITE JAVASCRIPT
========================================== */

// Cafe details — update when available
const cafe = {
  phone: "8779500135",
  address: "Shop No. 4, Shantivan 3 Society, Vrindavan Society, Shantivan Society, Raheja Township, Malad East, Mumbai, Maharashtra 400097",
  openingHours: "Monday – Sunday: 10:00 AM – 12:00 Midnight",
  instagramUrl: "https://www.instagram.com/greenvita_cafe/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shop+No+4+Shantivan+3+Society+Raheja+Township+Malad+East+Mumbai+400097",
  googleReviewUrl: ""
};

// Website loading screen
const loader = document.getElementById("loader");

function hideLoader() {
  if (loader) loader.classList.add("hide");
}

window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 2500);

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Menu data — sample items only
// Replace these with the cafe's actual menu.
const menuItems = [
  // JUICES
  { name: "Mosambi Juice", category: "juices", image: "images/Mosambi Juice.PNG", description: "₹99" },
  { name: "Guava Juice", category: "juices", image: "images/Guava Juice.PNG", description: "₹99" },
  { name: "Watermelon Juice", category: "juices", image: "images/Watermelon Juice.PNG", description: "₹99" },
  { name: "Pineapple Juice", category: "juices", image: "images/Pineapple Juice.PNG", description: "₹99" },
  { name: "Orange Juice", category: "juices", image: "images/Orange Juice.PNG", description: "₹99" },
  { name: "Dragon Fruit Juice", category: "juices", image: "images/Dragon Fruit Juice.PNG", description: "₹99" },

  // MOJITOS
  { name: "Classic Mojito", category: "mojitos", image: "images/Classic Mojito.PNG", description: "₹129" },
  { name: "Blue Mojito", category: "mojitos", image: "images/Blue Mojito.PNG", description: "₹129" },
  { name: "Watermelon Mojito", category: "mojitos", image: "images/Watermelon Mojito.PNG", description: "₹129" },
  { name: "Pineapple Mojito", category: "mojitos", image: "images/Pineapple Mojito.PNG", description: "₹129" },
  { name: "Masala Mojito", category: "mojitos", image: "images/Masala Mojito.PNG", description: "₹79" },
  { name: "Guava Mojito", category: "mojitos", image: "images/Guava Mojito.PNG", description: "₹129" },

  // SNACKS
  { name: "Masala Maggi", category: "food", image: "images/Masala Maggi.PNG", description: "₹59" },
  { name: "Cheese Maggi", category: "food", image: "images/Cheese Maggi.PNG", description: "₹79" },
  { name: "Peri Peri Fries", category: "food", image: "images/Peri Peri Fries .PNG", description: "₹99" },
  { name: "Classic Salted Fries", category: "food", image: "images/Classic Salted Fries.PNG", description: "₹79" },
  { name: "Cheese Fries", category: "food", image: "images/Cheese Fries.PNG", description: "₹119" },

  // COFFEE
  { name: "Espresso", category: "coffee", image: "images/Espresso.PNG", description: "₹99" },
  { name: "Cappuccino", category: "coffee", image: "images/Cappuccino.PNG", description: "₹129" },
  { name: "Cafe Latte", category: "coffee", image: "images/Cafe Latte.PNG", description: "₹129" },
  { name: "Cold Coffee", category: "coffee", image: "images/Cold Coffee.PNG", description: "₹129" },

  // SANDWICHES
  { name: "Toast Sandwich", category: "food", image: "images/Toast Sandwich.PNG", description: "₹79" },
  { name: "Cheese Toast Sandwich", category: "food", image: "images/Cheese Toast Sandwich.PNG", description: "₹99" },
  { name: "Veg Sandwich", category: "food", image: "images/Veg Sandwich.PNG", description: "₹79" },
  { name: "Veg Grill Sandwich", category: "food", image: "images/Veg Grill Sandwich.PNG", description: "₹99" },
  { name: "Veg Cheese Grill Sandwich", category: "food", image: "images/Veg Cheese Grill Sandwich.PNG", description: "₹119" },

  // FRUIT BOWLS
  { name: "Fruit Bowl Mini", category: "bowls", image: "images/Fruit Bowl Mini.PNG", description: "₹99" },
  { name: "Fruit Bowl Regular", category: "bowls", image: "images/Fruit Bowl Regular.PNG", description: "₹149" }
];

// Favourite items are stored only in this browser.
const FAVOURITES_KEY = "greenvita-favourites-v1";
let favourites = [];
try {
  const saved = JSON.parse(localStorage.getItem(FAVOURITES_KEY) || "[]");
  favourites = Array.isArray(saved) ? saved.filter(name => menuItems.some(item => item.name === name)) : [];
} catch (error) {
  favourites = [];
}
let showingFavourites = false;
let currentCategory = "coffee";
let selectedItem = null;
const itemModal = document.getElementById("itemModal");
const favouritesToggle = document.getElementById("viewFavourites");
const favouritesCount = document.getElementById("favouritesCount");
const modalFavouriteButton = document.getElementById("modalFavouriteButton");
let previousFocus = null;

function saveFavourites() {
  try { localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites)); } catch (error) { /* Storage disabled */ }
  if (favouritesCount) favouritesCount.textContent = favourites.length;
  if (favouritesToggle) {
    favouritesToggle.classList.toggle("selected", showingFavourites);
    favouritesToggle.setAttribute("aria-pressed", String(showingFavourites));
  }
}

function toggleFavourite(name) {
  if (favourites.includes(name)) favourites = favourites.filter(item => item !== name);
  else favourites.push(name);
  saveFavourites();
  updateModalFavourite();
  renderMenu(currentCategory);
}

function updateModalFavourite() {
  if (!selectedItem || !modalFavouriteButton) return;
  const isFavourite = favourites.includes(selectedItem.name);
  modalFavouriteButton.textContent = isFavourite ? "♥ Remove from Favourites" : "♡ Add to Favourites";
  modalFavouriteButton.classList.toggle("is-favourite", isFavourite);
  modalFavouriteButton.setAttribute("aria-pressed", String(isFavourite));
}

function openItemModal(item) {
  if (!itemModal) return;
  selectedItem = item;
  previousFocus = document.activeElement;
  document.getElementById("modalItemImage").src = item.image;
  document.getElementById("modalItemImage").alt = item.name;
  document.getElementById("modalItemName").textContent = item.name;
  document.getElementById("modalItemPrice").textContent = item.description;
  updateModalFavourite();
  const whatsappButton = document.getElementById("modalWhatsAppButton");
  if (whatsappButton) {
    const message = `Hi Green Vita Café! I would like to order ${item.name} (${item.description}). Please confirm availability and order details.`;
    whatsappButton.href = "https://wa.me/918779500135?text=" + encodeURIComponent(message);
  }
  itemModal.hidden = false;
  document.body.classList.add("item-modal-open");
  itemModal.querySelector(".item-modal-close").focus();
}

function closeItemModal() {
  if (!itemModal || itemModal.hidden) return;
  itemModal.hidden = true;
  document.body.classList.remove("item-modal-open");
  selectedItem = null;
  if (previousFocus && previousFocus.isConnected) previousFocus.focus();
}

if (itemModal) {
  itemModal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeItemModal));
  itemModal.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = [...itemModal.querySelectorAll("button")];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeItemModal();
});
if (modalFavouriteButton) modalFavouriteButton.addEventListener("click", () => {
  if (selectedItem) toggleFavourite(selectedItem.name);
});
if (favouritesToggle) favouritesToggle.addEventListener("click", () => {
  showingFavourites = !showingFavourites;
  saveFavourites();
  renderMenu(currentCategory);
});
saveFavourites();

// Render menu cards
const menuGrid = document.getElementById("menuGrid");

function renderMenu(category = "coffee") {
  if (!menuGrid) return;
  currentCategory = category;
  const filteredItems = showingFavourites
    ? menuItems.filter(item => favourites.includes(item.name))
    : menuItems.filter(item => category === "all" || item.category === category);

  menuGrid.replaceChildren();
  if (filteredItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "menu-empty";
    empty.textContent = showingFavourites
      ? "No favourites yet. Open a menu item and tap Add to Favourites!"
      : "Items for this category are coming soon.";
    menuGrid.appendChild(empty);
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "food-card interactive-food-card";

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "food-card-open";
    openButton.setAttribute("aria-label", "View details for " + item.name);
    openButton.addEventListener("click", () => openItemModal(item));

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.loading = "lazy";

    const body = document.createElement("div");
    body.className = "card-body";
    const title = document.createElement("h3");
    title.textContent = item.name;
    const description = document.createElement("p");
    description.textContent = item.description;
    body.append(title, description);
    openButton.append(img, body);

    card.append(openButton);
    menuGrid.appendChild(card);
  });
}

renderMenu("coffee");

// Menu category filters
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    showingFavourites = false;
    saveFavourites();
    renderMenu(button.dataset.category);
  });
});

// Scroll animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Contact details
function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
}

function setExternalLink(id, url) {
  const element = document.getElementById(id);

  if (!element) return;

  if (url) {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  } else {
    element.removeAttribute("href");
    element.style.opacity = "0.5";
    element.style.cursor = "default";
  }
}

setText("address", cafe.address);
setText("openingHours", cafe.openingHours);
setText("phone", cafe.phone);

setExternalLink("mapsLink", cafe.mapsUrl);
setExternalLink("instagramLink", cafe.instagramUrl);
setExternalLink("reviewLink", cafe.googleReviewUrl);

// Google Maps embed
const mapContainer = document.getElementById("mapContainer");

if (mapContainer && cafe.address) {
  const iframe = document.createElement("iframe");

  iframe.src =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(cafe.address) +
    "&output=embed";

  iframe.title = "Greenvita Cafe location";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  mapContainer.replaceChildren(iframe);
}

// QR code — links to the website menu
function generateQRCode() {
  const qrContainer = document.getElementById("qrCode");

  if (!qrContainer || typeof QRCode === "undefined") return;

  qrContainer.innerHTML = "";

  const menuUrl = new URL(
    window.location.pathname + "#menu",
    window.location.origin
  ).href;

  new QRCode(qrContainer, {
    text: menuUrl,
    width: 110,
    height: 110,
    colorDark: "#006400",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

generateQRCode();
