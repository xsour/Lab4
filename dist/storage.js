"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
var Storage = (function () {
  function Storage() {}
  Storage.clear = function () {
    localStorage.clear();
  };
  Storage.remove = function (key) {
    localStorage.removeItem(key);
  };
  return Storage;
})();
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map
