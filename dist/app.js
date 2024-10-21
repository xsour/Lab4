"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("./services");
var validation_1 = require("./validation");
var modal_1 = require("./modal");
var App = (function () {
  function App() {
    var _this = this;
    this.addBook = function () {
      var titleInput = document.getElementById("bookTitle");
      var authorInput = document.getElementById("bookAuthor");
      var yearInput = document.getElementById("bookYear");
      var title = titleInput.value;
      var author = authorInput.value;
      var year = parseInt(yearInput.value, 10);
      var errors = validation_1.Validation.validateBook(
        title,
        author,
        year.toString(),
      );
      if (Object.keys(errors).length > 0) {
        validation_1.Validation.displayErrors(errors);
        return;
      }
      var success = _this.bookService.addBook(title, author, year);
      if (success) {
        _this.clearValidationErrors();
        modal_1.Modal.showSuccessModal("Книгу успішно додано!");
        titleInput.value = "";
        authorInput.value = "";
        yearInput.value = "";
        _this.displayBooks();
      } else {
        modal_1.Modal.showSuccessModal("Не вдалося додати книгу.");
      }
    };
    this.addUser = function () {
      var nameInput = document.getElementById("userName");
      var emailInput = document.getElementById("userEmail");
      var name = nameInput.value;
      var email = emailInput.value;
      var errors = validation_1.Validation.validateUser(name, email);
      if (Object.keys(errors).length > 0) {
        validation_1.Validation.displayErrors(errors);
        return;
      }
      var success = _this.userService.addUser(name, email);
      if (success) {
        _this.clearValidationErrors();
        modal_1.Modal.showSuccessModal("Користувача успішно додано!");
        nameInput.value = "";
        emailInput.value = "";
        _this.displayUsers();
      } else {
        modal_1.Modal.showSuccessModal("Не вдалося додати користувача.");
      }
    };
    this.initEventListeners = function () {
      var _a, _b, _c;
      (_a = document.getElementById("addBookBtn")) === null || _a === void 0
        ? void 0
        : _a.addEventListener("click", _this.addBook);
      (_b = document.getElementById("addUserBtn")) === null || _b === void 0
        ? void 0
        : _b.addEventListener("click", _this.addUser);
      (_c = document.getElementById("booksList")) === null || _c === void 0
        ? void 0
        : _c.addEventListener("click", _this.handleBookAction);
    };
    this.displayBooks = function () {
      var booksListElement = document.getElementById("booksList");
      if (booksListElement) {
        booksListElement.innerHTML = _this.bookService
          .getAllBooks()
          .map(function (book) {
            return _this.createBookListItem(book);
          })
          .join("");
      }
    };
    this.createBookListItem = function (book) {
      var buttonClass = book.isBorrowed ? "btn-warning" : "btn-primary";
      var buttonText = book.isBorrowed ? "Повернути" : "Позичити";
      return '\n          <li class="d-flex justify-content-between align-items-center mb-2">\n              <span>'
        .concat(book.title, " by ")
        .concat(book.author, " (")
        .concat(book.year, ')</span>\n              <button class="btn ')
        .concat(buttonClass, ' btn-sm" data-book-id="')
        .concat(book.id, '" data-action="')
        .concat(book.isBorrowed ? "return" : "borrow", '">')
        .concat(buttonText, "</button>\n          </li>");
    };
    this.displayUsers = function () {
      var usersListElement = document.getElementById("usersList");
      if (usersListElement) {
        usersListElement.innerHTML = _this.userService
          .getAllUsers()
          .map(function (user) {
            return "<li>"
              .concat(user.name, " (")
              .concat(user.email, ") - ID: ")
              .concat(
                user.id,
                " - \u041F\u043E\u0437\u0438\u0447\u0435\u043D\u0456 \u043A\u043D\u0438\u0433\u0438: ",
              )
              .concat(user.borrowedBooks.length, "</li>");
          })
          .join("");
      }
    };
    this.handleBookAction = function (event) {
      var target = event.target;
      if (target.tagName === "BUTTON") {
        var bookId = target.getAttribute("data-book-id");
        var action = target.getAttribute("data-action");
        if (bookId && action) {
          if (action === "borrow") {
            _this.showBorrowBookModal(bookId);
          } else if (action === "return") {
            _this.returnBook(bookId);
          }
        }
      }
    };
    this.showBorrowBookModal = function (bookId) {
      modal_1.Modal.showBorrowBookModal(bookId, function (userId) {
        return _this.borrowBook(bookId, userId);
      });
    };
    this.borrowBook = function (bookId, userId) {
      try {
        _this.bookService.borrowBook(bookId);
        _this.userService.borrowBook(userId, bookId);
        modal_1.Modal.showSuccessBookActionModal("borrowed");
        _this.displayBooks();
        _this.displayUsers();
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Користувач не може позичити більше 3-х книг"
        ) {
          modal_1.Modal.showErrorModal(
            "Помилка позичення книги",
            error.message,
          );
        } else {
          modal_1.Modal.showErrorModal(
            "Помилка позичення книги",
            "Не вдалося позичити книгу.",
          );
        }
        _this.updateBookButtonState(bookId, false);
      }
    };
    this.updateBookButtonState = function (bookId, isBorrowed) {
      var bookElement = document.querySelector(
        '[data-book-id="'.concat(bookId, '"]'),
      );
      if (bookElement) {
        if (isBorrowed) {
          bookElement.textContent = "Повернути";
          bookElement.classList.remove("btn-primary");
          bookElement.classList.add("btn-warning");
          bookElement.setAttribute("data-action", "return");
        } else {
          bookElement.textContent = "Позичити";
          bookElement.classList.remove("btn-warning");
          bookElement.classList.add("btn-primary");
          bookElement.setAttribute("data-action", "borrow");
        }
      }
    };
    this.returnBook = function (bookId) {
      try {
        var user = _this.userService.getUserByBookId(bookId);
        if (user) {
          _this.bookService.returnBook(bookId);
          _this.userService.returnBook(user.id, bookId);
          modal_1.Modal.showSuccessBookActionModal("returned");
          _this.displayBooks();
          _this.displayUsers();
        }
      } catch (error) {
        console.error("Error returning book:", error);
        modal_1.Modal.showErrorModal(
          "Помилка повернення книги",
          "Не вдалося повернути книгу.",
        );
      }
    };
    this.bookService = new services_1.BookService();
    this.userService = new services_1.UserService();
    this.initEventListeners();
    this.displayBooks();
    this.displayUsers();
  }
  App.prototype.clearValidationErrors = function () {
    var errorElements = document.querySelectorAll(
      ".is-invalid, .border-danger",
    );
    errorElements.forEach(function (element) {
      element.classList.remove("is-invalid", "border-danger");
    });
    var errorMessages = document.querySelectorAll(
      ".invalid-feedback, .text-danger",
    );
    errorMessages.forEach(function (element) {
      element.remove();
    });
  };
  return App;
})();
document.addEventListener("DOMContentLoaded", function () {
  new App();
});
//# sourceMappingURL=app.js.map
