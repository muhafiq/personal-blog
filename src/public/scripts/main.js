/**
 * Navbar action
 */
let isOpen = false;

function showMenu() {
  const menu = document.getElementById("menu");
  if (isOpen) {
    menu.classList.remove("visible", "opacity-100");
    menu.classList.add("invisible", "opacity-0");
  } else {
    menu.classList.remove("invisible", "opacity-0");
    menu.classList.add("visible", "opacity-100");
  }
  isOpen = !isOpen;
}

document.getElementById("menu-btn").addEventListener("click", () => {
  showMenu();
});

/**
 * Page transition
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("main-content")
    .classList.add("animate-[load_0.5s_ease-in-out]");
});
