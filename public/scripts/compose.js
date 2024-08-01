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

const editor = document.getElementById("editor");
const form = document.getElementById("compose-form");

form.addEventListener("submit", async (evt) => {});

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
