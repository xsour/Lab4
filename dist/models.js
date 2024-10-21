"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
var Book = (function () {
  function Book(title, author, year) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = false;
  }
  return Book;
})();
exports.Book = Book;
var User = (function () {
  function User(name, email) {
    this.id = Date.now().toString();
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }
  return User;
})();
exports.User = User;
//# sourceMappingURL=models.js.map
