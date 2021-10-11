"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
let map = new Map();
class storage {
    static set(bot, context) {
        map.set(1, { bot, context });
    }
    static get() {
        return map.get(1);
    }
}
exports.storage = storage;
//# sourceMappingURL=temp.js.map