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
