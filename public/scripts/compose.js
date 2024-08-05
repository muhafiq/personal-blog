/**
 * Quill editor.
 */
const quill = new Quill("#editor", {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      ["link", "image", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ align: [] }],
    ],
  },
  placeholder: "Compose an epic...",
  theme: "snow",
});

/**
 * Submit form action.
 */

const form = document.getElementById("compose-form");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
  document.getElementById("content").value = quill.root.innerHTML;
  form.submit();
});

/**
 * Preview Image.
 */

document
  .getElementById("thumbnail")
  .addEventListener("change", function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = "";

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add(
          "aspect-video",
          "object-center",
          "object-cover",
          "max-w-2xl",
          "rounded",
          "shadow-md"
        );
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

/**
 * Show and hide add category.
 */

document
  .getElementById("show-add-category-button")
  .addEventListener("click", () => {
    document
      .getElementById("add-category-container")
      .classList.toggle("hidden");
  });
