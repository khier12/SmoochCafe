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
  