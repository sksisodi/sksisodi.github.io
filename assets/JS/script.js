const navRightAlt = document.querySelector(".nav-right-alt");
const hamButton = document.querySelector(".ham-icon");

function handleResize() {
  if (window.innerWidth > 1024) {
    navRightAlt.classList.remove("show");
  }
}

hamButton.addEventListener("click", () => {
  // Toggle the 'show' class to hide or display the menu
  navRightAlt.classList.toggle("show");
});

// Add event listener for window resize
window.addEventListener("resize", handleResize);

// Initial check in case the page is already wide
handleResize();
