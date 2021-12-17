"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var LoaderService = /** @class */ (function () {
    function LoaderService() {
        // A BehaviourSubject is an Observable with a default value
        this.isLoading = new rxjs_1.BehaviorSubject(false);
    }
    return LoaderService;
}());
exports.LoaderService = LoaderService;
//# sourceMappingURL=loader.service.js.map