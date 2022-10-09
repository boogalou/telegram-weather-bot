"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTime = void 0;
function convertTime(date) {
    const newDate = new Date(date * 1000);
    return new Intl.DateTimeFormat('ru').format(newDate);
}
exports.convertTime = convertTime;
//# sourceMappingURL=convertTime.js.map