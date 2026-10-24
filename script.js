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
  {
    name: "Cappuccino",
    category: "coffee",
    image: "images/coffee.jpg",
    description: "Freshly brewed coffee"
  },
  {
    name: "Cold Coffee",
    category: "coffee",
    image: "images/cold-coffee.jpg",
    description: "Chilled and refreshing"
  },
  {
    name: "Signature Pasta",
    category: "food",
    image: "images/pasta.jpg",
    description: "Creamy and delicious"
  },
  {
    name: "Classic Pizza",
    category: "food",
    image: "images/pizza.jpg",
    description: "Freshly prepared"
  },
  {
    name: "Chocolate Brownie",
    category: "desserts",
    image: "images/brownie.jpg",
    description: "Rich chocolate flavour"
  },
  {
    name: "Fresh Mojito",
    category: "beverages",
    image: "images/mojito.jpg",
    description: "Cool and refreshing"
  }
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
