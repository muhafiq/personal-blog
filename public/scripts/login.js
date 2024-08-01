/**
 * Page transition
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("main-content")
    .classList.add("animate-[load_0.5s_ease-in-out]");
});

/**
 * Close alert button
 */

if (document.getElementById("close-alert")) {
  document.getElementById("close-alert").addEventListener("click", () => {
    document.getElementById("alert-notification").classList.add("hidden");
  });
}
