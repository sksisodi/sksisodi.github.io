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

document.getElementById("alchemist").addEventListener("click", function() {
  window.location.href = "work.html";
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

const texts = ["Mixed-Method Researcher", "Data Scientist", "UX Researcher"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Speed of typing (ms)
const erasingSpeed = 50; // Speed of erasing (ms)
const delayBetweenTexts = 1500; // Delay before starting the next text
const typewriter = document.getElementById("typewriter");

function type() {
  if (charIndex < texts[textIndex].length) {
    typewriter.textContent = "a " + texts[textIndex].substring(0, charIndex + 1) + ".";
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriter.textContent = "a " + texts[textIndex].substring(0, charIndex - 1) + ".";
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

// Start the typewriter effect
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 1000));