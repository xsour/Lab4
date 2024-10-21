"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
var Library = (function () {
  function Library(storageKey) {
    this.storageKey = storageKey;
    this.items = [];
    this.nextId = 1;
    this.loadFromStorage();
  }
  Library.prototype.loadFromStorage = function () {
    var data = localStorage.getItem(this.storageKey);
    if (data) {
      this.items = JSON.parse(data);
    }
    var nextId = localStorage.getItem(Library.idKey);
    if (nextId) {
      this.nextId = parseInt(nextId, 10);
    }
  };
  Library.prototype.saveToStorage = function () {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    localStorage.setItem(Library.idKey, this.nextId.toString());
  };
  Library.prototype.generateId = function () {
    return (this.nextId++).toString();
  };
  Library.prototype.add = function (item) {
    var id = this.generateId();
    item.id = id;
    this.items.push(item);
    this.saveToStorage();
    return id;
  };
  Library.prototype.remove = function (id) {
    this.items = this.items.filter(function (item) {
      return item.id !== id;
    });
    this.saveToStorage();
  };
  Library.prototype.getAll = function () {
    return this.items;
  };
  Library.prototype.findById = function (id) {
    return this.items.find(function (item) {
      return item.id === id;
    });
  };
  Library.prototype.update = function (item) {
    var index = this.items.findIndex(function (i) {
      return i.id === item.id;
    });
    if (index !== -1) {
      this.items[index] = item;
      this.saveToStorage();
    }
  };
  Library.idKey = "nextId";
  return Library;
})();
exports.Library = Library;
//# sourceMappingURL=library.js.map
