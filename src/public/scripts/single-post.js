const article = document.getElementById("single-post-content");
const backBtn = document.getElementById("back-to-top-btn");

document.addEventListener("DOMContentLoaded", () => {
  article.querySelectorAll("img").forEach((el) => {
    el.setAttribute("loading", "lazy");
  });
});

document.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backBtn.classList.remove("opacity-0", "invisible");
    backBtn.classList.add("opacity-100", "visible");
  } else {
    backBtn.classList.remove("opacity-100", "visible");
    backBtn.classList.add("opacity-0", "invisible");
  }
});

backBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
