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

function selectLocalImage() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  // Listen upload local image and save to server
  input.onchange = () => {
    const file = input.files[0];

    // file type is only image.
    if (/^image\//.test(file.type)) {
      saveToServer(file);
    } else {
      console.warn("You could only upload images.");
    }
  };
}

/**
 *
 * @param {File} file
 */
function saveToServer(file) {
  const fd = new FormData();
  fd.append("images", file);
  fd.append("postId", location.pathname.split("/")[2]);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/v1/upload", true);
  xhr.onload = () => {
    console.log(xhr);
    if (xhr.status === 201) {
      const url = JSON.parse(xhr.responseText).file;
      insertToEditor(url);
    }
  };
  xhr.send(fd);
}

/**
 * Step3. insert image url to rich editor.
 *
 * @param {string} url
 */
function insertToEditor(url) {
  // push image url to rich editor.
  const range = quill.getSelection();
  quill.insertEmbed(range.index, "image", url);
}

// quill editor add image handler
quill.getModule("toolbar").addHandler("image", () => {
  selectLocalImage();
});

/**
 * Submit form action.
 */

const form = document.getElementById("editor-form");
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

/**
 * Page /edit
 */
if (window.location.pathname.includes("/edit")) {
  const content = document.getElementById("content");
  quill.root.innerHTML = content.value;

  // thumbnail
  const previewContainer = document.getElementById("preview-container");
  const img = document.createElement("img");
  img.src = document.getElementById("thumbnail-source").value;
  img.loading = "lazy";
  img.classList.add(
    "aspect-video",
    "object-center",
    "object-cover",
    "max-w-2xl",
    "rounded",
    "shadow-md"
  );
  previewContainer.appendChild(img);
}
