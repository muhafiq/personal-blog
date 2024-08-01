/**
 * Sidebar action.
 */

let isSidebarOpen = false;

const sidebarBtn = document.getElementById("sidebar-trigger-btn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");

function openSidebar() {
  if (!isSidebarOpen) {
    // add
    sidebarBtn.classList.add(
      "visible",
      "opacity-100",
      "[&_span:nth-child(1)]:w-6",
      "[&_span:nth-child(1)]:translate-y-0",
      "[&_span:nth-child(1)]:rotate-45",
      "[&_span:nth-child(3)]:w-0",
      "[&_span:nth-child(2)]:-rotate-45",
      "translate-x-[500%]"
    );
    sidebar.classList.add("translate-x-0");
    sidebarOverlay.classList.add("block");

    // remove
    sidebar.classList.remove("-translate-x-full");
    sidebarOverlay.classList.remove("hidden");
  } else {
    // remove
    sidebarBtn.classList.remove(
      "visible",
      "opacity-100",
      "[&_span:nth-child(1)]:w-6",
      "[&_span:nth-child(1)]:translate-y-0",
      "[&_span:nth-child(1)]:rotate-45",
      "[&_span:nth-child(3)]:w-0",
      "[&_span:nth-child(2)]:-rotate-45",
      "translate-x-[500%]"
    );
    sidebar.classList.remove("translate-x-0");
    sidebarOverlay.classList.remove("block");

    // add
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
  }

  isSidebarOpen = !isSidebarOpen;
}

sidebarBtn.addEventListener("click", () => {
  openSidebar();
});

sidebarOverlay.addEventListener("click", () => {
  openSidebar();
});

/**
 * Close alert button.
 */

if (document.getElementById("close-alert")) {
  document.getElementById("close-alert").addEventListener("click", () => {
    document.getElementById("alert-notification").classList.add("hidden");
  });
}

/**
 * Page transition
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("main-content")
    .classList.add("animate-[load_0.5s_ease-in-out]");

  document.querySelectorAll("#sidebar-item-link").forEach((a) => {
    if (a.getAttribute("href") === window.location.pathname) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
});
