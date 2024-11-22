document.addEventListener("DOMContentLoaded", () => {
    const sidebarItems = document.querySelectorAll(".side-bar ul li");
    const sections = document.querySelectorAll(".work-details .details-section");
  
    // Intersection Observer for section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const sidebarItem = document.querySelector(`.side-bar ul li[data-target="${id}"]`);
  
          if (entry.isIntersecting) {
            sidebarItems.forEach((item) => item.classList.remove("active"));
            if (sidebarItem) sidebarItem.classList.add("active");
          }
        });
      },
      { threshold: 0.6 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    // Smooth scrolling for sidebar items
    sidebarItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const targetId = item.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          const offset = 100;
          const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionTop - offset,
            behavior: "smooth",
          });
          sidebarItems.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");
        }
      });
    });
  });
  