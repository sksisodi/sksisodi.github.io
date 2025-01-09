document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".side-bar ul li");
  const sections = document.querySelectorAll(".work-details .details-section");
  const workDetails = document.querySelector(".work-details");

  if (!workDetails) return; // Ensure .work-details exists before proceeding

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
    { threshold: 0.6 } // Adjust this to detect sections when 60% is in view
  );

  sections.forEach((section) => observer.observe(section));

  // Smooth scrolling for sidebar items
  sidebarItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection && workDetails) {
        const offset = 417; // Adjust the offset as needed
        const sectionTop = targetSection.offsetTop;

        // Smooth scroll within the .work-details container
        workDetails.scrollTo({
          top: sectionTop - offset,
          behavior: "smooth",
        });

        // Update active class on sidebar item
        sidebarItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });
});
