"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
class Modal {
  static showSuccessModal(message) {
    const modalElement = document.getElementById("successModal");
    const messageElement = document.getElementById("successModalMessage");
    if (messageElement) {
      messageElement.textContent = message;
    }
    if (modalElement) {
      modalElement.style.display = "block";
      modalElement.classList.add("show");
      modalElement.setAttribute("aria-hidden", "false");
    }
  }
  static hideModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = "none";
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
    }
  }
  static showBorrowBookModal(bookId, onConfirm) {
    const modalElement = document.getElementById("borrowBookModal");
    const confirmButton = document.getElementById("confirmBorrowButton");
    const userIdInput = document.getElementById("borrowUserId");
    const handleConfirm = () => {
      const userId = userIdInput.value.trim();
      if (userId) {
        onConfirm(userId);
        this.hideModal("borrowBookModal");
      } else {
        alert("Будь ласка, введіть ID користувача");
      }
    };
    if (confirmButton) {
      confirmButton.onclick = handleConfirm;
    }
    if (modalElement) {
      modalElement.style.display = "block";
      modalElement.classList.add("show");
      modalElement.setAttribute("aria-hidden", "false");
    }
    userIdInput.value = "";
  }
  static showSuccessBookActionModal(action) {
    const message =
      action === "borrowed"
        ? "Книгу успішно позичено"
        : "Книгу успішно повернено";
    const modalElement = document.getElementById("bookActionModal");
    const messageElement = document.getElementById("bookActionModalMessage");
    if (messageElement) {
      messageElement.textContent = message;
    }
    if (modalElement) {
      modalElement.style.display = "block";
      modalElement.classList.add("show");
      modalElement.setAttribute("aria-hidden", "false");
    }
  }
  static showErrorModal(title, message) {
    const modalElement = document.getElementById("errorModal");
    const titleElement = document.getElementById("errorModalTitle");
    const messageElement = document.getElementById("errorModalMessage");
    if (titleElement) {
      titleElement.textContent = title;
    }
    if (messageElement) {
      messageElement.textContent = message;
    }
    if (modalElement) {
      modalElement.style.display = "block";
      modalElement.classList.add("show");
      modalElement.setAttribute("aria-hidden", "false");
    }
  }
}
exports.Modal = Modal;
document.querySelectorAll(".btn-close, .btn-secondary").forEach((button) => {
  button.addEventListener("click", (event) => {
    const modalId = event.target.getAttribute("data-modal-id");
    if (modalId) {
      Modal.hideModal(modalId);
    }
  });
});
