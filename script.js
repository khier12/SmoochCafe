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
  
    const open = () => {
      toggle.classList.add("active");
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };
  
    toggle.addEventListener("click", () => (nav.classList.contains("active") ? close() : open()));
    overlay.addEventListener("click", close);
  
    // close when clicking any internal link
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      close();
    });
  
    // close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("active")) close();
    });
  });
