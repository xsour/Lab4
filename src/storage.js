"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
  static clear() {
    localStorage.clear();
  }
  static remove(key) {
    localStorage.removeItem(key);
  }
}
exports.Storage = Storage;
