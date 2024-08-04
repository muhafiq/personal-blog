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

const editor = document.getElementById("editor");
const form = document.getElementById("compose-form");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const content = quill.root.innerHTML;

  // Ekstrak data URI gambar dari konten
  const imgTags = content.match(/<img [^>]*src="data:image\/[^>]*>/g) || [];
  const imgPromises = imgTags.map(async (imgTag) => {
    const dataUri = imgTag.match(/src="([^"]*)"/)[1];
    const response = await fetch(dataUri);
    const blob = await response.blob();
    const file = new File([blob], "image.png", { type: blob.type });

    // Buat FormData untuk unggahan
    const formData = new FormData();
    formData.append("images", file);

    // Unggah gambar
    const res = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    return result.file;
  });

  // Tunggu semua gambar terunggah
  const uploadedImages = await Promise.all(imgPromises);

  // Gantikan data URI dengan URL gambar yang diunggah
  let updatedContent = content;
  uploadedImages.forEach((url, index) => {
    updatedContent = updatedContent.replace(
      /src="data:image\/[^"]*"/,
      `src="${url}"`
    );
  });

  // Kirim konten yang diperbarui ke server
  const postData = {
    content: updatedContent,
  };

  const saveRes = await fetch("/save-content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (saveRes.ok) {
    console.log("Content saved successfully");
  }
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
