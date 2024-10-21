"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var Modal = (function () {
  function Modal() {}
  Modal.showSuccessModal = function (message) {
    var modalElement = document.getElementById("successModal");
    var messageElement = document.getElementById("successModalMessage");
    if (messageElement) {
      messageElement.textContent = message;
    }
    if (modalElement) {
      modalElement.style.display = "block";
      modalElement.classList.add("show");
      modalElement.setAttribute("aria-hidden", "false");
    }
  };
  Modal.hideModal = function (modalId) {
    var modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = "none";
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
    }
  };
  Modal.showBorrowBookModal = function (bookId, onConfirm) {
    var _this = this;
    var modalElement = document.getElementById("borrowBookModal");
    var confirmButton = document.getElementById("confirmBorrowButton");
    var userIdInput = document.getElementById("borrowUserId");
    var handleConfirm = function () {
      var userId = userIdInput.value.trim();
      if (userId) {
        onConfirm(userId);
        _this.hideModal("borrowBookModal");
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
  };
  Modal.showSuccessBookActionModal = function (action) {
    var message =
      action === "borrowed"
        ? "Книгу успішно позичено"
        : "Книгу успішно повернено";
    var modalElement = document.getElementById("bookActionModal");
    var messageElement = document.getElementById("bookActionModalMessage");
    if (messageElement) {
      messageElement.textContent = message;
    }
    if (modalElement) {
      modalElement.style.display = "block";
      modalElement.classList.add("show");
      modalElement.setAttribute("aria-hidden", "false");
    }
  };
  Modal.showErrorModal = function (title, message) {
    var modalElement = document.getElementById("errorModal");
    var titleElement = document.getElementById("errorModalTitle");
    var messageElement = document.getElementById("errorModalMessage");
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
  };
  return Modal;
})();
exports.Modal = Modal;
document
  .querySelectorAll(".btn-close, .btn-secondary")
  .forEach(function (button) {
    button.addEventListener("click", function (event) {
      var modalId = event.target.getAttribute("data-modal-id");
      if (modalId) {
        Modal.hideModal(modalId);
      }
    });
  });
//# sourceMappingURL=modal.js.map
