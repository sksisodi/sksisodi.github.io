const navRightAlt = document.querySelector(".nav-right-alt");
const hamButton = document.querySelector(".ham-icon");

function handleResize() {
  if (window.innerWidth > 1024) {
    navRightAlt.classList.remove("show");
  }
}

hamButton.addEventListener("click", () => {
  navRightAlt.classList.toggle("show");
});

window.addEventListener("resize", handleResize);
handleResize();

// Scroll to specific sections based on query parameters
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 45; // Offset for any fixed navigation
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop - offset,
      behavior: "smooth",
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sectionId = urlParams.get("section");
  if (sectionId) {
    scrollToSection(sectionId);
  }
});

document.getElementById("about").addEventListener("click", function() {
  window.location.href = "about.html";
});

document.getElementById("alchemist").addEventListener("click", function() {
  window.location.href = "alchemist.html";
});

document.getElementById("gamemech").addEventListener("click", function() {
  window.location.href = "gamemech.html";
});

document.getElementById("shibu").addEventListener("click", function() {
  window.location.href = "shibu.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("[data-section]");
  const buttons = document.querySelectorAll(".nav-btn");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSection = entry.target.getAttribute("data-section");
          updateActiveButton(activeSection);
        }
      });
    },
    { threshold: 0.5 } // Adjust threshold as needed
  );

  sections.forEach((section) => observer.observe(section));

  function updateActiveButton(activeSection) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeButton = document.querySelector(`#${activeSection}Btn`);
    if (activeButton) {
      activeButton.classList.add("active");

      // Move stars around the active button
      const btnContainer = activeButton.parentNode;
      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => star.remove());

      const starHTML = `<img src="./assets/images/star_white.png" alt="" class="star" />`;
      activeButton.insertAdjacentHTML("beforebegin", starHTML);
      activeButton.insertAdjacentHTML("afterend", starHTML);
    }
  }
});