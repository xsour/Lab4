"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.items = [];
    this.nextId = 1;
    this.loadFromStorage();
  }
  loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.items = JSON.parse(data);
    }
    const nextId = localStorage.getItem(Library.idKey);
    if (nextId) {
      this.nextId = parseInt(nextId, 10);
    }
  }
  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    localStorage.setItem(Library.idKey, this.nextId.toString());
  }
  generateId() {
    return (this.nextId++).toString();
  }
  add(item) {
    const id = this.generateId();
    item.id = id;
    this.items.push(item);
    this.saveToStorage();
    return id;
  }
  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToStorage();
  }
  getAll() {
    return this.items;
  }
  findById(id) {
    return this.items.find((item) => item.id === id);
  }
  update(item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
      this.saveToStorage();
    }
  }
}
exports.Library = Library;
Library.idKey = "nextId";
