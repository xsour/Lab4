"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.BookService = void 0;
var models_1 = require("./models");
var library_1 = require("./library");
var BookService = (function () {
  function BookService() {
    this.library = new library_1.Library("books");
  }
  BookService.prototype.addBook = function (title, author, year) {
    try {
      var book = new models_1.Book(title, author, year);
      this.library.add(book);
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };
  BookService.prototype.removeBook = function (id) {
    this.library.remove(id);
  };
  BookService.prototype.getAllBooks = function () {
    return this.library.getAll();
  };
  BookService.prototype.borrowBook = function (bookId) {
    var book = this.library.findById(bookId);
    if (book && !book.isBorrowed) {
      book.isBorrowed = true;
      this.library.update(book);
    }
  };
  BookService.prototype.returnBook = function (bookId) {
    var book = this.library.findById(bookId);
    if (book && book.isBorrowed) {
      book.isBorrowed = false;
      this.library.update(book);
    }
  };
  return BookService;
})();
exports.BookService = BookService;
var UserService = (function () {
  function UserService() {
    this.library = new library_1.Library("users");
  }
  UserService.prototype.addUser = function (name, email) {
    try {
      var user = new models_1.User(name, email);
      this.library.add(user);
      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      return false;
    }
  };
  UserService.prototype.removeUser = function (id) {
    this.library.remove(id);
  };
  UserService.prototype.getAllUsers = function () {
    return this.library.getAll();
  };
  UserService.prototype.borrowBook = function (userId, bookId) {
    var user = this.library.findById(userId);
    if (user) {
      if (user.borrowedBooks.length >= 3) {
        throw new Error("Користувач не може позичити більше 3-х книг");
      }
      user.borrowedBooks.push(bookId);
      this.library.update(user);
    }
  };
  UserService.prototype.returnBook = function (userId, bookId) {
    var user = this.library.findById(userId);
    if (user) {
      user.borrowedBooks = user.borrowedBooks.filter(function (id) {
        return id !== bookId;
      });
      this.library.update(user);
    }
  };
  UserService.prototype.getUserByBookId = function (bookId) {
    return this.getAllUsers().find(function (user) {
      return user.borrowedBooks.includes(bookId);
    });
  };
  return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=services.js.map
