const deleteButtons = document.querySelectorAll(".toggle-modal");
const deleteForm = document.getElementById("delete-form");
const modalContainer = document.getElementById("modal-container");
const cancelButton = document.getElementById("cancel-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const postId = button.dataset.id;

    deleteForm.action = `/delete/${postId}?_method=DELETE`;

    modalContainer.classList.toggle("hidden");
    document.body.classList.add("overflow-y-hidden");
  });
});

cancelButton.addEventListener("click", (e) => {
  e.stopPropagation();
  modalContainer.classList.toggle("hidden");
  document.body.classList.remove("overflow-y-hidden");
});

modalContainer.addEventListener("click", () => {
  modalContainer.classList.toggle("hidden");
  document.body.classList.remove("overflow-y-hidden");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalContainer.classList.add("hidden");
    document.body.classList.remove("overflow-y-hidden");
  }
});
