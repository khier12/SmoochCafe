// smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Product hover animation
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// mobile view 
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav-menu");
    const overlay = document.querySelector(".nav-overlay");
  
    if (!toggle || !nav || !overlay) return;
  
    function open() {
      toggle.classList.add("active");
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  
    function close() {
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  
    toggle.addEventListener("click", () => (nav.classList.contains("active") ? close() : open()));
    overlay.addEventListener("click", close);
  
    // close when clicking any nav link
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      close();
    });
  
    // close on ESC
    document.addEventListener("keydown", (e) => {
      if ((e.key === "Escape" || e.key === "Esc") && nav.classList.contains("active")) close();
    });
  });
  


  // for dropdown menu
function filterCategory() {
  const selected = document.getElementById("filterSelect").value;

  const foodSection   = document.getElementById("food");
  const pastrySection = document.getElementById("pastry");
  const drinksSection = document.getElementById("drinks");

  const foodCats   = ["quarter-pounder","sandwiches","quesadilla","fries","rice-bowls","pasta","nachos"];
  const pastryCats = ["pastry-brownies","pastry-cookies","pastry-muffins","pastry-cakes"];
  const drinkCats  = ["coffee","non-coffee","ice-blended","lava-series","chilled","dessert-drinks"];

  // helper: show/hide whole sections
  function showSections(showFood, showPastry, showDrinks) {
    foodSection.style.display   = showFood   ? "block" : "none";
    pastrySection.style.display = showPastry ? "block" : "none";
    drinksSection.style.display = showDrinks ? "block" : "none";
  }

  // helper: show all categories inside a given list (by id)
  function showAllCategories(ids) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "block";
    });
  }

  // helper: show only one category from a group
  function showOnlyCategory(ids, targetId) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = (id === targetId) ? "block" : "none";
    });
  }

  // RESET: show all categories first (we'll hide as needed)
  document.querySelectorAll(".menu-category").forEach(sec => {
    sec.style.display = "block";
  });

  // 1) SHOW ALL
  if (selected === "all") {
    showSections(true, true, true);
    return;
  }

  // 2) FOOD-ALL
  if (selected === "food-all") {
    showSections(true, false, false);
    showAllCategories(foodCats);
    return;
  }

  // 3) PASTRY-ALL
  if (selected === "pastry-all") {
    showSections(false, true, false);
    showAllCategories(pastryCats);
    return;
  }

  // 4) DRINKS-ALL
  if (selected === "drinks-all") {
    showSections(false, false, true);
    showAllCategories(drinkCats);
    return;
  }

  // 5) Specific FOOD category
  if (foodCats.includes(selected)) {
    showSections(true, false, false);
    showOnlyCategory(foodCats, selected);
    return;
  }

  // 6) Specific PASTRY category
  if (pastryCats.includes(selected)) {
    showSections(false, true, false);
    showOnlyCategory(pastryCats, selected);
    return;
  }

  // 7) Specific DRINK category
  if (drinkCats.includes(selected)) {
    showSections(false, false, true);
    showOnlyCategory(drinkCats, selected);
    return;
  }
}


// =======================
// SIMPLE CART FUNCTIONALITY
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "smoochCart";
  let cart = [];

  const cartIcon     = document.getElementById("cart-icon");
  const cartCount    = document.getElementById("cart-count");
  const cartModal    = document.getElementById("cart-modal");
  const cartItems    = document.getElementById("cart-items");
  const cartTotal    = document.getElementById("cart-total");
  const cartClose    = document.getElementById("cart-close");
  const cartCheckout = document.getElementById("cart-checkout");

  // kung wala sa page (hal. home page lang), wag na mag-run
  if (!cartIcon || !cartModal) return;

  // --- helpers ---
  function loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    cart = saved ? JSON.parse(saved) : [];
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function updateBadge() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalQty;
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = "<li>No items yet. Add something yummy! 🧋🍰</li>";
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.qty;

        const li = document.createElement("li");
        li.className = "cart-item-row";
        li.dataset.index = index;

        li.innerHTML = `
          <div class="cart-item-main">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">P${item.price.toFixed(2)}</span>
          </div>
          <div class="cart-item-controls">
            <input type="number" min="1" value="${item.qty}" class="cart-item-qty">
            <button class="cart-remove" title="Remove">&times;</button>
          </div>
        `;

        cartItems.appendChild(li);
      });
    }

    cartTotal.textContent = total.toFixed(2);
    updateBadge();
  }

  function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
    renderCart();
  }

  // --- events ---

  // Add to cart buttons (products page) + MINI FEEDBACK
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name  = btn.dataset.name;
      const price = parseFloat(btn.dataset.price || "0");
      addToCart(name, price);

      // ⭐ mini feedback sa button
      const originalText = btn.textContent;
      btn.textContent = "Added!";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  });

  // open / close cart modal
  cartIcon.addEventListener("click", () => {
    cartModal.classList.add("show");
    cartModal.setAttribute("aria-hidden", "false");
  });

  cartClose.addEventListener("click", () => {
    cartModal.classList.remove("show");
    cartModal.setAttribute("aria-hidden", "true");
  });

  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove("show");
      cartModal.setAttribute("aria-hidden", "true");
    }
  });

  // ESC key para isara ang modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal.classList.contains("show")) {
      cartModal.classList.remove("show");
      cartModal.setAttribute("aria-hidden", "true");
    }
  });

  // change qty / remove item (event delegation)
  cartItems.addEventListener("click", (e) => {
    const row = e.target.closest(".cart-item-row");
    if (!row) return;
    const index = parseInt(row.dataset.index, 10);

    if (e.target.classList.contains("cart-remove")) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  cartItems.addEventListener("change", (e) => {
    if (!e.target.classList.contains("cart-item-qty")) return;
    const row = e.target.closest(".cart-item-row");
    const index = parseInt(row.dataset.index, 10);
    let qty = parseInt(e.target.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    cart[index].qty = qty;
    saveCart();
    renderCart();
  });

  // fake checkout
  cartCheckout.addEventListener("click", () => {
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }
    alert("Order placed! (demo only)");
  });

  // initial load
  loadCart();
  renderCart();
});
// =======================
// SIMPLE CART FUNCTIONALITY
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "smoochCart";
  let cart = [];

  const cartIcon     = document.getElementById("cart-icon");
  const cartCount    = document.getElementById("cart-count");
  const cartModal    = document.getElementById("cart-modal");
  const cartItems    = document.getElementById("cart-items");
  const cartTotal    = document.getElementById("cart-total");
  const cartClose    = document.getElementById("cart-close");
  const cartCheckout = document.getElementById("cart-checkout");

  // kung wala sa page (hal. home page lang), wag na mag-run
  if (!cartIcon || !cartModal) return;

  // --- helpers ---
  function loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    cart = saved ? JSON.parse(saved) : [];
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function updateBadge() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalQty;
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = "<li>No items yet. Add something yummy! 🧋🍰</li>";
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.qty;

        const li = document.createElement("li");
        li.className = "cart-item-row";
        li.dataset.index = index;

        li.innerHTML = `
          <div class="cart-item-main">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">P${item.price.toFixed(2)}</span>
          </div>
          <div class="cart-item-controls">
            <input type="number" min="1" value="${item.qty}" class="cart-item-qty">
            <button class="cart-remove" title="Remove" type="button">&times;</button>
          </div>
        `;

        cartItems.appendChild(li);
      });
    }

    cartTotal.textContent = total.toFixed(2);
    updateBadge();
  }

  function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
    renderCart();
  }

  // ---- ACCESSIBLE OPEN/CLOSE HELPERS ----
  function openCart() {
    cartModal.classList.add("show");
    cartModal.setAttribute("aria-hidden", "false");
    cartIcon.setAttribute("aria-expanded", "true");
    if (cartClose) cartClose.focus();   // focus sa close button
  }

  function closeCart() {
    cartModal.classList.remove("show");
    cartModal.setAttribute("aria-hidden", "true");
    cartIcon.setAttribute("aria-expanded", "false");
    cartIcon.focus();                   // ibalik focus sa icon
  }

  // --- events ---

  // Add to cart buttons (products page) + MINI FEEDBACK
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    const card  = btn.closest(".product-card");
    const name  = card?.dataset.name;
    const price = parseFloat(card?.dataset.price || "0");

    const originalText = btn.textContent;

    btn.addEventListener("click", () => {
      if (!name || !price) return; // safety

      addToCart(name, price);

      // ⭐ mini feedback sa button
      btn.textContent = "Added!";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 800);
    });
  });

  // open / close cart modal (mouse)
  cartIcon.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);

  // open via keyboard (Enter / Space) sa cart icon
  cartIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCart();
    }
  });

  // close when clicking backdrop
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCart();
    }
  });

  // ESC key para isara ang modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal.classList.contains("show")) {
      closeCart();
    }
  });

  // change qty / remove item (event delegation)
  cartItems.addEventListener("click", (e) => {
    const row = e.target.closest(".cart-item-row");
    if (!row) return;
    const index = parseInt(row.dataset.index, 10);

    if (e.target.classList.contains("cart-remove")) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  cartItems.addEventListener("change", (e) => {
    if (!e.target.classList.contains("cart-item-qty")) return;
    const row = e.target.closest(".cart-item-row");
    const index = parseInt(row.dataset.index, 10);
    let qty = parseInt(e.target.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    cart[index].qty = qty;
    saveCart();
    renderCart();
  });

  // fake checkout
  // prevent double event binding
cartCheckout.onclick = () => {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }
  alert("Order placed! (demo only)");
};

  // initial load
  loadCart();
  renderCart();
});
