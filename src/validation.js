"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
  static validateBook(title, author, year) {
    const errors = {};
    if (!title.trim()) {
      errors["bookTitle"] = "Назва книги не може бути пустою";
    }
    if (!author.trim()) {
      errors["bookAuthor"] = "Автор не може бути пустим";
    }
    if (!year.trim() || isNaN(Number(year))) {
      errors["bookYear"] = "Рік видання повинен бути числом";
    }
    return errors;
  }
  static validateUser(name, email) {
    const errors = {};
    if (!name.trim()) {
      errors["userName"] = "Ім'я не може бути пустим";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors["userEmail"] = "Email не є дійсним";
    }
    return errors;
  }
  static displayErrors(errors) {
    document.querySelectorAll(".form-control").forEach((input) => {
      input.classList.remove("border", "border-danger");
    });
    document.querySelectorAll(".text-danger").forEach((el) => {
      el.textContent = "";
    });
    Object.keys(errors).forEach((key) => {
      var _a;
      const field = document.getElementById(key);
      if (field) {
        field.classList.add("border", "border-danger");
        const errorElement = document.createElement("div");
        errorElement.classList.add("text-danger");
        errorElement.textContent = errors[key];
        (_a = field.parentElement) === null || _a === void 0
          ? void 0
          : _a.appendChild(errorElement);
      }
    });
  }
}
exports.Validation = Validation;
