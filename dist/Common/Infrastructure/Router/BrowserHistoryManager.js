"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrowserHistoryManager {
    constructor(history) {
        this.history = history;
        this.getOnChangeCurrentUrlPromise = this.getOnChangeCurrentUrlPromise.bind(this);
    }
    openUrlInOtherTarget(url, target) {
        window.open(url, target);
    }
    changeCurrentUrl(url, replaceCurrentUrl) {
        if (replaceCurrentUrl) {
            this.history.replace(url);
            return;
        }
        this.history.push(url);
    }
    getCurrentUrl() {
        return this.history.location.pathname;
    }
    getOnChangeCurrentUrlPromise() {
        return new Promise((resolve) => {
            this.history.listen((location) => resolve(location.pathname));
        });
    }
}
exports.BrowserHistoryManager = BrowserHistoryManager;
//# sourceMappingURL=BrowserHistoryManager.js.map