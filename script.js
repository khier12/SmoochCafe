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

    const foodSection = document.getElementById("food");
    const drinksSection = document.getElementById("drinks");

    // Categories inside each section
    const foodCats = ["quarter-pounder","sandwiches","quesadilla","fries","rice-bowls","pasta","nachos"];
    const drinkCats = ["coffee","non-coffee","ice-blended","lava-series","chilled","dessert-drinks"];

    // --- SHOW ALL ---
    if(selected === "all"){
        foodSection.style.display = "block";
        drinksSection.style.display = "block";
        document.querySelectorAll(".menu-category").forEach(sec => sec.style.display = "block");
        return;
    }

    // --- FOOD categories selected ---
    if(foodCats.includes(selected)){
        foodSection.style.display = "block";
        drinksSection.style.display = "none";

        foodCats.forEach(id => document.getElementById(id).style.display = (id === selected ? "block" : "none"));
        return;
    }

    // --- DRINK categories selected ---
    if(drinkCats.includes(selected)){
        drinksSection.style.display = "block";
        foodSection.style.display = "none";

        drinkCats.forEach(id => document.getElementById(id).style.display = (id === selected ? "block" : "none"));
    }
}