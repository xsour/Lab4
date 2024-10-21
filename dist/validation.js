"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
var Validation = (function () {
  function Validation() {}
  Validation.validateBook = function (title, author, year) {
    var errors = {};
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
  };
  Validation.validateUser = function (name, email) {
    var errors = {};
    if (!name.trim()) {
      errors["userName"] = "Ім'я не може бути пустим";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors["userEmail"] = "Email не є дійсним";
    }
    return errors;
  };
  Validation.displayErrors = function (errors) {
    document.querySelectorAll(".form-control").forEach(function (input) {
      input.classList.remove("border", "border-danger");
    });
    document.querySelectorAll(".text-danger").forEach(function (el) {
      el.textContent = "";
    });
    Object.keys(errors).forEach(function (key) {
      var _a;
      var field = document.getElementById(key);
      if (field) {
        field.classList.add("border", "border-danger");
        var errorElement = document.createElement("div");
        errorElement.classList.add("text-danger");
        errorElement.textContent = errors[key];
        (_a = field.parentElement) === null || _a === void 0
          ? void 0
          : _a.appendChild(errorElement);
      }
    });
  };
  return Validation;
})();
exports.Validation = Validation;
//# sourceMappingURL=validation.js.map
