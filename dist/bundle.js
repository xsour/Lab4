/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/app.ts":
      /*!********************!*\
          !*** ./src/app.ts ***!
          \********************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nvar services_1 = __webpack_require__(/*! ./services */ "./src/services.ts");\nvar validation_1 = __webpack_require__(/*! ./validation */ "./src/validation.ts");\nvar modal_1 = __webpack_require__(/*! ./modal */ "./src/modal.ts");\nvar App = (function () {\n    function App() {\n        var _this = this;\n        this.addBook = function () {\n            var titleInput = document.getElementById("bookTitle");\n            var authorInput = document.getElementById("bookAuthor");\n            var yearInput = document.getElementById("bookYear");\n            var title = titleInput.value;\n            var author = authorInput.value;\n            var year = parseInt(yearInput.value, 10);\n            var errors = validation_1.Validation.validateBook(title, author, year.toString());\n            if (Object.keys(errors).length > 0) {\n                validation_1.Validation.displayErrors(errors);\n                return;\n            }\n            var success = _this.bookService.addBook(title, author, year);\n            if (success) {\n                _this.clearValidationErrors();\n                modal_1.Modal.showSuccessModal("Книгу успішно додано!");\n                titleInput.value = "";\n                authorInput.value = "";\n                yearInput.value = "";\n                _this.displayBooks();\n            }\n            else {\n                modal_1.Modal.showSuccessModal("Не вдалося додати книгу.");\n            }\n        };\n        this.addUser = function () {\n            var nameInput = document.getElementById("userName");\n            var emailInput = document.getElementById("userEmail");\n            var name = nameInput.value;\n            var email = emailInput.value;\n            var errors = validation_1.Validation.validateUser(name, email);\n            if (Object.keys(errors).length > 0) {\n                validation_1.Validation.displayErrors(errors);\n                return;\n            }\n            var success = _this.userService.addUser(name, email);\n            if (success) {\n                _this.clearValidationErrors();\n                modal_1.Modal.showSuccessModal("Користувача успішно додано!");\n                nameInput.value = "";\n                emailInput.value = "";\n                _this.displayUsers();\n            }\n            else {\n                modal_1.Modal.showSuccessModal("Не вдалося додати користувача.");\n            }\n        };\n        this.initEventListeners = function () {\n            var _a, _b, _c;\n            (_a = document\n                .getElementById("addBookBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", _this.addBook);\n            (_b = document\n                .getElementById("addUserBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", _this.addUser);\n            (_c = document\n                .getElementById("booksList")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", _this.handleBookAction);\n        };\n        this.displayBooks = function () {\n            var booksListElement = document.getElementById("booksList");\n            if (booksListElement) {\n                booksListElement.innerHTML = _this.bookService\n                    .getAllBooks()\n                    .map(function (book) { return _this.createBookListItem(book); })\n                    .join("");\n            }\n        };\n        this.createBookListItem = function (book) {\n            var buttonClass = book.isBorrowed ? "btn-warning" : "btn-primary";\n            var buttonText = book.isBorrowed ? "Повернути" : "Позичити";\n            return "\\n          <li class=\\"d-flex justify-content-between align-items-center mb-2\\">\\n              <span>".concat(book.title, " by ").concat(book.author, " (").concat(book.year, ")</span>\\n              <button class=\\"btn ").concat(buttonClass, " btn-sm\\" data-book-id=\\"").concat(book.id, "\\" data-action=\\"").concat(book.isBorrowed ? "return" : "borrow", "\\">").concat(buttonText, "</button>\\n          </li>");\n        };\n        this.displayUsers = function () {\n            var usersListElement = document.getElementById("usersList");\n            if (usersListElement) {\n                usersListElement.innerHTML = _this.userService\n                    .getAllUsers()\n                    .map(function (user) {\n                    return "<li>".concat(user.name, " (").concat(user.email, ") - ID: ").concat(user.id, " - \\u041F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u0456 \\u043A\\u043D\\u0438\\u0433\\u0438: ").concat(user.borrowedBooks.length, "</li>");\n                })\n                    .join("");\n            }\n        };\n        this.handleBookAction = function (event) {\n            var target = event.target;\n            if (target.tagName === "BUTTON") {\n                var bookId = target.getAttribute("data-book-id");\n                var action = target.getAttribute("data-action");\n                if (bookId && action) {\n                    if (action === "borrow") {\n                        _this.showBorrowBookModal(bookId);\n                    }\n                    else if (action === "return") {\n                        _this.returnBook(bookId);\n                    }\n                }\n            }\n        };\n        this.showBorrowBookModal = function (bookId) {\n            modal_1.Modal.showBorrowBookModal(bookId, function (userId) {\n                return _this.borrowBook(bookId, userId);\n            });\n        };\n        this.borrowBook = function (bookId, userId) {\n            try {\n                _this.bookService.borrowBook(bookId);\n                _this.userService.borrowBook(userId, bookId);\n                modal_1.Modal.showSuccessBookActionModal("borrowed");\n                _this.displayBooks();\n                _this.displayUsers();\n            }\n            catch (error) {\n                console.error("Error borrowing book:", error);\n                if (error instanceof Error &&\n                    error.message === "Користувач не може позичити більше 3-х книг") {\n                    modal_1.Modal.showErrorModal("Помилка позичення книги", error.message);\n                }\n                else {\n                    modal_1.Modal.showErrorModal("Помилка позичення книги", "Не вдалося позичити книгу.");\n                }\n                _this.updateBookButtonState(bookId, false);\n            }\n        };\n        this.updateBookButtonState = function (bookId, isBorrowed) {\n            var bookElement = document.querySelector("[data-book-id=\\"".concat(bookId, "\\"]"));\n            if (bookElement) {\n                if (isBorrowed) {\n                    bookElement.textContent = "Повернути";\n                    bookElement.classList.remove("btn-primary");\n                    bookElement.classList.add("btn-warning");\n                    bookElement.setAttribute("data-action", "return");\n                }\n                else {\n                    bookElement.textContent = "Позичити";\n                    bookElement.classList.remove("btn-warning");\n                    bookElement.classList.add("btn-primary");\n                    bookElement.setAttribute("data-action", "borrow");\n                }\n            }\n        };\n        this.returnBook = function (bookId) {\n            try {\n                var user = _this.userService.getUserByBookId(bookId);\n                if (user) {\n                    _this.bookService.returnBook(bookId);\n                    _this.userService.returnBook(user.id, bookId);\n                    modal_1.Modal.showSuccessBookActionModal("returned");\n                    _this.displayBooks();\n                    _this.displayUsers();\n                }\n            }\n            catch (error) {\n                console.error("Error returning book:", error);\n                modal_1.Modal.showErrorModal("Помилка повернення книги", "Не вдалося повернути книгу.");\n            }\n        };\n        this.bookService = new services_1.BookService();\n        this.userService = new services_1.UserService();\n        this.initEventListeners();\n        this.displayBooks();\n        this.displayUsers();\n    }\n    App.prototype.clearValidationErrors = function () {\n        var errorElements = document.querySelectorAll(".is-invalid, .border-danger");\n        errorElements.forEach(function (element) {\n            element.classList.remove("is-invalid", "border-danger");\n        });\n        var errorMessages = document.querySelectorAll(".invalid-feedback, .text-danger");\n        errorMessages.forEach(function (element) {\n            element.remove();\n        });\n    };\n    return App;\n}());\ndocument.addEventListener("DOMContentLoaded", function () {\n    new App();\n});\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?',
        );

        /***/
      },

    /***/ "./src/library.ts":
      /*!************************!*\
          !*** ./src/library.ts ***!
          \************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Library = void 0;\nvar Library = (function () {\n    function Library(storageKey) {\n        this.storageKey = storageKey;\n        this.items = [];\n        this.nextId = 1;\n        this.loadFromStorage();\n    }\n    Library.prototype.loadFromStorage = function () {\n        var data = localStorage.getItem(this.storageKey);\n        if (data) {\n            this.items = JSON.parse(data);\n        }\n        var nextId = localStorage.getItem(Library.idKey);\n        if (nextId) {\n            this.nextId = parseInt(nextId, 10);\n        }\n    };\n    Library.prototype.saveToStorage = function () {\n        localStorage.setItem(this.storageKey, JSON.stringify(this.items));\n        localStorage.setItem(Library.idKey, this.nextId.toString());\n    };\n    Library.prototype.generateId = function () {\n        return (this.nextId++).toString();\n    };\n    Library.prototype.add = function (item) {\n        var id = this.generateId();\n        item.id = id;\n        this.items.push(item);\n        this.saveToStorage();\n        return id;\n    };\n    Library.prototype.remove = function (id) {\n        this.items = this.items.filter(function (item) { return item.id !== id; });\n        this.saveToStorage();\n    };\n    Library.prototype.getAll = function () {\n        return this.items;\n    };\n    Library.prototype.findById = function (id) {\n        return this.items.find(function (item) { return item.id === id; });\n    };\n    Library.prototype.update = function (item) {\n        var index = this.items.findIndex(function (i) { return i.id === item.id; });\n        if (index !== -1) {\n            this.items[index] = item;\n            this.saveToStorage();\n        }\n    };\n    Library.idKey = 'nextId';\n    return Library;\n}());\nexports.Library = Library;\n\n\n//# sourceURL=webpack://lab-app/./src/library.ts?",
        );

        /***/
      },

    /***/ "./src/modal.ts":
      /*!**********************!*\
          !*** ./src/modal.ts ***!
          \**********************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Modal = void 0;\nvar Modal = (function () {\n    function Modal() {\n    }\n    Modal.showSuccessModal = function (message) {\n        var modalElement = document.getElementById('successModal');\n        var messageElement = document.getElementById('successModalMessage');\n        if (messageElement) {\n            messageElement.textContent = message;\n        }\n        if (modalElement) {\n            modalElement.style.display = 'block';\n            modalElement.classList.add('show');\n            modalElement.setAttribute('aria-hidden', 'false');\n        }\n    };\n    Modal.hideModal = function (modalId) {\n        var modalElement = document.getElementById(modalId);\n        if (modalElement) {\n            modalElement.style.display = 'none';\n            modalElement.classList.remove('show');\n            modalElement.setAttribute('aria-hidden', 'true');\n        }\n    };\n    Modal.showBorrowBookModal = function (bookId, onConfirm) {\n        var _this = this;\n        var modalElement = document.getElementById('borrowBookModal');\n        var confirmButton = document.getElementById('confirmBorrowButton');\n        var userIdInput = document.getElementById('borrowUserId');\n        var handleConfirm = function () {\n            var userId = userIdInput.value.trim();\n            if (userId) {\n                onConfirm(userId);\n                _this.hideModal('borrowBookModal');\n            }\n            else {\n                alert('Будь ласка, введіть ID користувача');\n            }\n        };\n        if (confirmButton) {\n            confirmButton.onclick = handleConfirm;\n        }\n        if (modalElement) {\n            modalElement.style.display = 'block';\n            modalElement.classList.add('show');\n            modalElement.setAttribute('aria-hidden', 'false');\n        }\n        userIdInput.value = '';\n    };\n    Modal.showSuccessBookActionModal = function (action) {\n        var message = action === 'borrowed' ? 'Книгу успішно позичено' : 'Книгу успішно повернено';\n        var modalElement = document.getElementById('bookActionModal');\n        var messageElement = document.getElementById('bookActionModalMessage');\n        if (messageElement) {\n            messageElement.textContent = message;\n        }\n        if (modalElement) {\n            modalElement.style.display = 'block';\n            modalElement.classList.add('show');\n            modalElement.setAttribute('aria-hidden', 'false');\n        }\n    };\n    Modal.showErrorModal = function (title, message) {\n        var modalElement = document.getElementById('errorModal');\n        var titleElement = document.getElementById('errorModalTitle');\n        var messageElement = document.getElementById('errorModalMessage');\n        if (titleElement) {\n            titleElement.textContent = title;\n        }\n        if (messageElement) {\n            messageElement.textContent = message;\n        }\n        if (modalElement) {\n            modalElement.style.display = 'block';\n            modalElement.classList.add('show');\n            modalElement.setAttribute('aria-hidden', 'false');\n        }\n    };\n    return Modal;\n}());\nexports.Modal = Modal;\ndocument.querySelectorAll('.btn-close, .btn-secondary').forEach(function (button) {\n    button.addEventListener('click', function (event) {\n        var modalId = event.target.getAttribute('data-modal-id');\n        if (modalId) {\n            Modal.hideModal(modalId);\n        }\n    });\n});\n\n\n//# sourceURL=webpack://lab-app/./src/modal.ts?",
        );

        /***/
      },

    /***/ "./src/models.ts":
      /*!***********************!*\
          !*** ./src/models.ts ***!
          \***********************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.User = exports.Book = void 0;\nvar Book = (function () {\n    function Book(title, author, year) {\n        this.id = Date.now().toString();\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.isBorrowed = false;\n    }\n    return Book;\n}());\nexports.Book = Book;\nvar User = (function () {\n    function User(name, email) {\n        this.id = Date.now().toString();\n        this.name = name;\n        this.email = email;\n        this.borrowedBooks = [];\n    }\n    return User;\n}());\nexports.User = User;\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?',
        );

        /***/
      },

    /***/ "./src/services.ts":
      /*!*************************!*\
          !*** ./src/services.ts ***!
          \*************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserService = exports.BookService = void 0;\nvar models_1 = __webpack_require__(/*! ./models */ \"./src/models.ts\");\nvar library_1 = __webpack_require__(/*! ./library */ \"./src/library.ts\");\nvar BookService = (function () {\n    function BookService() {\n        this.library = new library_1.Library('books');\n    }\n    BookService.prototype.addBook = function (title, author, year) {\n        try {\n            var book = new models_1.Book(title, author, year);\n            this.library.add(book);\n            return true;\n        }\n        catch (error) {\n            console.error('Error adding book:', error);\n            return false;\n        }\n    };\n    BookService.prototype.removeBook = function (id) {\n        this.library.remove(id);\n    };\n    BookService.prototype.getAllBooks = function () {\n        return this.library.getAll();\n    };\n    BookService.prototype.borrowBook = function (bookId) {\n        var book = this.library.findById(bookId);\n        if (book && !book.isBorrowed) {\n            book.isBorrowed = true;\n            this.library.update(book);\n        }\n    };\n    BookService.prototype.returnBook = function (bookId) {\n        var book = this.library.findById(bookId);\n        if (book && book.isBorrowed) {\n            book.isBorrowed = false;\n            this.library.update(book);\n        }\n    };\n    return BookService;\n}());\nexports.BookService = BookService;\nvar UserService = (function () {\n    function UserService() {\n        this.library = new library_1.Library('users');\n    }\n    UserService.prototype.addUser = function (name, email) {\n        try {\n            var user = new models_1.User(name, email);\n            this.library.add(user);\n            return true;\n        }\n        catch (error) {\n            console.error('Error adding user:', error);\n            return false;\n        }\n    };\n    UserService.prototype.removeUser = function (id) {\n        this.library.remove(id);\n    };\n    UserService.prototype.getAllUsers = function () {\n        return this.library.getAll();\n    };\n    UserService.prototype.borrowBook = function (userId, bookId) {\n        var user = this.library.findById(userId);\n        if (user) {\n            if (user.borrowedBooks.length >= 3) {\n                throw new Error(\"Користувач не може позичити більше 3-х книг\");\n            }\n            user.borrowedBooks.push(bookId);\n            this.library.update(user);\n        }\n    };\n    UserService.prototype.returnBook = function (userId, bookId) {\n        var user = this.library.findById(userId);\n        if (user) {\n            user.borrowedBooks = user.borrowedBooks.filter(function (id) { return id !== bookId; });\n            this.library.update(user);\n        }\n    };\n    UserService.prototype.getUserByBookId = function (bookId) {\n        return this.getAllUsers().find(function (user) { return user.borrowedBooks.includes(bookId); });\n    };\n    return UserService;\n}());\nexports.UserService = UserService;\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?",
        );

        /***/
      },

    /***/ "./src/validation.ts":
      /*!***************************!*\
          !*** ./src/validation.ts ***!
          \***************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Validation = void 0;\nvar Validation = (function () {\n    function Validation() {\n    }\n    Validation.validateBook = function (title, author, year) {\n        var errors = {};\n        if (!title.trim()) {\n            errors['bookTitle'] = 'Назва книги не може бути пустою';\n        }\n        if (!author.trim()) {\n            errors['bookAuthor'] = 'Автор не може бути пустим';\n        }\n        if (!year.trim() || isNaN(Number(year))) {\n            errors['bookYear'] = 'Рік видання повинен бути числом';\n        }\n        return errors;\n    };\n    Validation.validateUser = function (name, email) {\n        var errors = {};\n        if (!name.trim()) {\n            errors['userName'] = 'Ім\\'я не може бути пустим';\n        }\n        if (!email.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {\n            errors['userEmail'] = 'Email не є дійсним';\n        }\n        return errors;\n    };\n    Validation.displayErrors = function (errors) {\n        document.querySelectorAll('.form-control').forEach(function (input) {\n            input.classList.remove('border', 'border-danger');\n        });\n        document.querySelectorAll('.text-danger').forEach(function (el) {\n            el.textContent = '';\n        });\n        Object.keys(errors).forEach(function (key) {\n            var _a;\n            var field = document.getElementById(key);\n            if (field) {\n                field.classList.add('border', 'border-danger');\n                var errorElement = document.createElement('div');\n                errorElement.classList.add('text-danger');\n                errorElement.textContent = errors[key];\n                (_a = field.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(errorElement);\n            }\n        });\n    };\n    return Validation;\n}());\nexports.Validation = Validation;\n\n\n//# sourceURL=webpack://lab-app/./src/validation.ts?",
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./src/app.ts");
  /******/
  /******/
})();
