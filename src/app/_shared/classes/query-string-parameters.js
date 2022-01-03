"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryStringParameters = void 0;
var QueryStringParameters = /** @class */ (function () {
    function QueryStringParameters() {
        var _this = this;
        this.toString = function () { return _this.paramsAndValues.join('&'); };
        this.paramsAndValues = [];
    }
    QueryStringParameters.prototype.push = function (key, value) {
        value = encodeURIComponent(value.toString());
        this.paramsAndValues.push([key, value].join('='));
    };
    return QueryStringParameters;
}());
exports.QueryStringParameters = QueryStringParameters;
//# sourceMappingURL=query-string-parameters.js.map