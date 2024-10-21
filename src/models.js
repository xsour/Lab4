"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
class Book {
  constructor(title, author, year) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
    this.year = year;
    this.isBorrowed = false;
  }
}
exports.Book = Book;
class User {
  constructor(name, email) {
    this.id = Date.now().toString();
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }
}
exports.User = User;
