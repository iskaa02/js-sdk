var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import ClientResponseError from "@/ClientResponseError";
var FetchMock = /** @class */ (function () {
    function FetchMock() {
        this.mocks = [];
    }
    FetchMock.prototype.on = function (request) {
        this.mocks.push(request);
    };
    /**
     * Initializes the mock by temporary overwriting `global.fetch`.
     */
    FetchMock.prototype.init = function () {
        var _this = this;
        this.originalFetch = global === null || global === void 0 ? void 0 : global.fetch;
        global.fetch = function (url, config) {
            var _loop_1 = function (mock) {
                // match url and method
                if (mock.url !== url ||
                    (config === null || config === void 0 ? void 0 : config.method) !== mock.method) {
                    return "continue";
                }
                // match body params
                if (mock.body) {
                    var configBody = {};
                    // deserialize
                    if (typeof (config === null || config === void 0 ? void 0 : config.body) === 'string') {
                        configBody = JSON.parse(config === null || config === void 0 ? void 0 : config.body);
                    }
                    var hasMissingBodyParam = false;
                    for (var key in mock.body) {
                        if (typeof configBody[key] === 'undefined') {
                            hasMissingBodyParam = true;
                            break;
                            ;
                        }
                    }
                    if (hasMissingBodyParam) {
                        return "continue";
                    }
                }
                if (mock.additionalMatcher && !mock.additionalMatcher(url, config)) {
                    return "continue";
                }
                var response = {
                    url: url,
                    status: mock.replyCode,
                    statusText: 'test',
                    json: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, (mock.replyBody || {})];
                    }); }); },
                };
                return { value: new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            var _a;
                            if (!!((_a = config === null || config === void 0 ? void 0 : config.signal) === null || _a === void 0 ? void 0 : _a.aborted)) {
                                reject(new ClientResponseError());
                            }
                            resolve(response);
                        }, mock.delay || 0);
                    }) };
            };
            for (var _i = 0, _a = _this.mocks; _i < _a.length; _i++) {
                var mock = _a[_i];
                var state_1 = _loop_1(mock);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            throw new Error('Request not mocked: ' + url);
        };
    };
    /**
     * Restore the original node fetch function.
     */
    FetchMock.prototype.restore = function () {
        global.fetch = this.originalFetch;
    };
    /**
     * Clears all registered mocks.
     */
    FetchMock.prototype.clearMocks = function () {
        this.mocks = [];
    };
    return FetchMock;
}());
export { FetchMock };
