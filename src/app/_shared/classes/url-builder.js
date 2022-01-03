"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlBuilder = void 0;
// Application Classes
var query_string_parameters_1 = require("./query-string-parameters");
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(baseUrl, action, queryString) {
        this.baseUrl = baseUrl;
        this.action = action;
        this.url = [baseUrl, action].join('/');
        this.queryString = queryString || new query_string_parameters_1.QueryStringParameters();
    }
    UrlBuilder.prototype.toString = function () {
        var qs = this.queryString ?
            this.queryString.toString() : '';
        return qs ? this.url + "?" + qs : this.url;
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
//# sourceMappingURL=url-builder.js.map