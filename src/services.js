"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.BookService = void 0;
const models_1 = require("./models");
const library_1 = require("./library");
class BookService {
  constructor() {
    this.library = new library_1.Library("books");
  }
  addBook(title, author, year) {
    try {
      const book = new models_1.Book(title, author, year);
      this.library.add(book);
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  }
  removeBook(id) {
    this.library.remove(id);
  }
  getAllBooks() {
    return this.library.getAll();
  }
  borrowBook(bookId) {
    const book = this.library.findById(bookId);
    if (book && !book.isBorrowed) {
      book.isBorrowed = true;
      this.library.update(book);
    }
  }
  returnBook(bookId) {
    const book = this.library.findById(bookId);
    if (book && book.isBorrowed) {
      book.isBorrowed = false;
      this.library.update(book);
    }
  }
}
exports.BookService = BookService;
class UserService {
  constructor() {
    this.library = new library_1.Library("users");
  }
  addUser(name, email) {
    try {
      const user = new models_1.User(name, email);
      this.library.add(user);
      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      return false;
    }
  }
  removeUser(id) {
    this.library.remove(id);
  }
  getAllUsers() {
    return this.library.getAll();
  }
  borrowBook(userId, bookId) {
    const user = this.library.findById(userId);
    if (user) {
      if (user.borrowedBooks.length >= 3) {
        throw new Error("Користувач не може позичити більше 3-х книг");
      }
      user.borrowedBooks.push(bookId);
      this.library.update(user);
    }
  }
  returnBook(userId, bookId) {
    const user = this.library.findById(userId);
    if (user) {
      user.borrowedBooks = user.borrowedBooks.filter((id) => id !== bookId);
      this.library.update(user);
    }
  }
  getUserByBookId(bookId) {
    return this.getAllUsers().find((user) =>
      user.borrowedBooks.includes(bookId),
    );
  }
}
exports.UserService = UserService;
