/* ==========================================
   GREENVITA CAFE — WEBSITE JAVASCRIPT
========================================== */

// Cafe details — update when available
const cafe = {
  phone: "",
  address: "",
  openingHours: "",
  instagramUrl: "",
  mapsUrl: "",
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
  { name: "Mosambi Juice", category: "beverages", image: "images/Mosambi Juice.PNG", description: "₹99" },
  { name: "Guava Juice", category: "beverages", image: "images/Guava Juice.PNG", description: "₹99" },
  { name: "Watermelon Juice", category: "beverages", image: "images/Watermelon Juice.PNG", description: "₹99" },
  { name: "Pineapple Juice", category: "beverages", image: "images/Pineapple Juice.PNG", description: "₹99" },
  { name: "Orange Juice", category: "beverages", image: "images/Orange Juice.PNG", description: "₹99" },
  { name: "Dragon Fruit Juice", category: "beverages", image: "images/Dragon Fruit Juice.PNG", description: "₹99" },

  // MOJITOS
  { name: "Classic Mojito", category: "beverages", image: "images/Classic Mojito.PNG", description: "₹129" },
  { name: "Blue Mojito", category: "beverages", image: "images/Blue Mojito.PNG", description: "₹129" },
  { name: "Watermelon Mojito", category: "beverages", image: "images/Watermelon Mojito.PNG", description: "₹129" },
  { name: "Pineapple Mojito", category: "beverages", image: "images/Pineapple Mojito.PNG", description: "₹129" },
  { name: "Masala Mojito", category: "beverages", image: "images/Masala Mojito.PNG", description: "₹79" },
  { name: "Guava Mojito", category: "beverages", image: "images/Guava Mojito.PNG", description: "₹129" },

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
  { name: "Fruit Bowl Mini", category: "food", image: "images/Fruit Bowl Mini.PNG", description: "₹99" },
  { name: "Fruit Bowl Regular", category: "food", image: "images/Fruit Bowl Regular.PNG", description: "₹149" }
];

// Render menu cards
const menuGrid = document.getElementById("menuGrid");

function renderMenu(category = "all") {
  if (!menuGrid) return;

  const filteredItems = menuItems.filter(item =>
    category === "all" || item.category === category
  );

  menuGrid.innerHTML = "";

  filteredItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "food-card";

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
    card.append(img, body);
    menuGrid.appendChild(card);
  });
}

renderMenu();

// Menu category filters
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
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
