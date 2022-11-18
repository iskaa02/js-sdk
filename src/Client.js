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
import LocalAuthStore from "@/stores/LocalAuthStore";
import ViewService from "./services/ViewService";
import SettingsService from "@/services/SettingsService";
import AdminService from "@/services/AdminService";
import RecordService from "@/services/RecordService";
import CollectionService from "@/services/CollectionService";
import LogService from "@/services/LogService";
import RealtimeService from "@/services/RealtimeService";
/**
 * PocketBase JS Client.
 */
var Client = /** @class */ (function () {
    function Client(baseUrl, authStore, lang) {
        if (baseUrl === void 0) { baseUrl = "/"; }
        if (lang === void 0) { lang = "en-US"; }
        this.cancelControllers = {};
        this.recordServices = {};
        this.enableAutoCancellation = true;
        this.baseUrl = baseUrl;
        this.lang = lang;
        this.authStore = authStore || new LocalAuthStore();
        // services
        this.views = new ViewService(this);
        this.admins = new AdminService(this);
        this.collections = new CollectionService(this);
        this.logs = new LogService(this);
        this.settings = new SettingsService(this);
        this.realtime = new RealtimeService(this);
    }
    /**
     * Returns the RecordService associated to the specified collection.
     *
     * @param  {string} idOrName
     * @return {RecordService}
     */
    Client.prototype.collection = function (idOrName) {
        if (!this.recordServices[idOrName]) {
            this.recordServices[idOrName] = new RecordService(this, idOrName);
        }
        return this.recordServices[idOrName];
    };
    /**
     * Globally enable or disable auto cancellation for pending duplicated requests.
     */
    Client.prototype.autoCancellation = function (enable) {
        this.enableAutoCancellation = !!enable;
        return this;
    };
    /**
     * Cancels single request by its cancellation key.
     */
    Client.prototype.cancelRequest = function (cancelKey) {
        if (this.cancelControllers[cancelKey]) {
            this.cancelControllers[cancelKey].abort();
            delete this.cancelControllers[cancelKey];
        }
        return this;
    };
    /**
     * Cancels all pending requests.
     */
    Client.prototype.cancelAllRequests = function () {
        for (var k in this.cancelControllers) {
            this.cancelControllers[k].abort();
        }
        this.cancelControllers = {};
        return this;
    };
    /**
     * Sends an api http request.
     */
    Client.prototype.send = function (path, reqConfig) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var config, cancelKey, controller, url, query;
            var _this = this;
            return __generator(this, function (_j) {
                config = Object.assign({ method: "GET" }, reqConfig);
                // serialize the body if needed and set the correct content type
                // note1: for FormData body the Content-Type header should be skipped
                // note2: we are checking the constructor name because FormData is not available natively in node
                if (config.body && config.body.constructor.name !== "FormData") {
                    if (typeof config.body !== "string") {
                        config.body = JSON.stringify(config.body);
                    }
                    // add the json header (if not already)
                    if (typeof ((_a = config === null || config === void 0 ? void 0 : config.headers) === null || _a === void 0 ? void 0 : _a["Content-Type"]) === "undefined") {
                        config.headers = Object.assign({}, config.headers, {
                            "Content-Type": "application/json",
                        });
                    }
                }
                // add Accept-Language header (if not already)
                if (typeof ((_b = config === null || config === void 0 ? void 0 : config.headers) === null || _b === void 0 ? void 0 : _b["Accept-Language"]) === "undefined") {
                    config.headers = Object.assign({}, config.headers, {
                        "Accept-Language": this.lang,
                    });
                }
                // check if Authorization header can be added
                if (
                // has stored token
                ((_c = this.authStore) === null || _c === void 0 ? void 0 : _c.token) &&
                    // auth header is not explicitly set
                    typeof ((_d = config === null || config === void 0 ? void 0 : config.headers) === null || _d === void 0 ? void 0 : _d.Authorization) === "undefined") {
                    config.headers = Object.assign({}, config.headers, {
                        Authorization: this.authStore.token,
                    });
                }
                // handle auto cancelation for duplicated pending request
                if (this.enableAutoCancellation && ((_e = config.params) === null || _e === void 0 ? void 0 : _e.$autoCancel) !== false) {
                    cancelKey = ((_f = config.params) === null || _f === void 0 ? void 0 : _f.$cancelKey) || (config.method || "GET") + path;
                    // cancel previous pending requests
                    this.cancelRequest(cancelKey);
                    controller = new AbortController();
                    this.cancelControllers[cancelKey] = controller;
                    config.signal = controller.signal;
                }
                // remove the special cancellation params from the other valid query params
                (_g = config.params) === null || _g === void 0 ? true : delete _g.$autoCancel;
                (_h = config.params) === null || _h === void 0 ? true : delete _h.$cancelKey;
                url = this.buildUrl(path);
                // serialize the query parameters
                if (typeof config.params !== "undefined") {
                    query = this.serializeQueryParams(config.params);
                    if (query) {
                        url += (url.includes("?") ? "&" : "?") + query;
                    }
                    delete config.params;
                }
                if (this.beforeSend) {
                    config = Object.assign({}, this.beforeSend(url, config));
                }
                // send the request
                return [2 /*return*/, fetch(url, config)
                        .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var data, _1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    data = {};
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _1 = _a.sent();
                                    return [3 /*break*/, 4];
                                case 4:
                                    if (this.afterSend) {
                                        data = this.afterSend(response, data);
                                    }
                                    if (response.status >= 400) {
                                        throw new ClientResponseError({
                                            url: response.url,
                                            status: response.status,
                                            data: data,
                                        });
                                    }
                                    return [2 /*return*/, data];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        // wrap to normalize all errors
                        throw new ClientResponseError(err);
                    })];
            });
        });
    };
    /**
     * Builds and returns an absolute record file url for the provided filename.
     */
    Client.prototype.getFileUrl = function (record, filename, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        var parts = [];
        parts.push("api");
        parts.push("files");
        parts.push(encodeURIComponent(record.collectionId || record.collectionName));
        parts.push(encodeURIComponent(record.id));
        parts.push(encodeURIComponent(filename));
        var result = this.buildUrl(parts.join("/"));
        if (Object.keys(queryParams).length) {
            var params = new URLSearchParams(queryParams);
            result += (result.includes("?") ? "&" : "?") + params;
        }
        return result;
    };
    /**
     * Builds a full client url by safely concatenating the provided path.
     */
    Client.prototype.buildUrl = function (path) {
        var url = this.baseUrl + (this.baseUrl.endsWith("/") ? "" : "/");
        if (path) {
            url += path.startsWith("/") ? path.substring(1) : path;
        }
        return url;
    };
    /**
     * Serializes the provided query parameters into a query string.
     */
    Client.prototype.serializeQueryParams = function (params) {
        var result = [];
        for (var key in params) {
            if (params[key] === null) {
                // skip null query params
                continue;
            }
            var value = params[key];
            var encodedKey = encodeURIComponent(key);
            if (Array.isArray(value)) {
                // "repeat" array params
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var v = value_1[_i];
                    result.push(encodedKey + "=" + encodeURIComponent(v));
                }
            }
            else if (value instanceof Date) {
                result.push(encodedKey + "=" + encodeURIComponent(value.toISOString()));
            }
            else if (typeof value !== null && typeof value === "object") {
                result.push(encodedKey + "=" + encodeURIComponent(JSON.stringify(value)));
            }
            else {
                result.push(encodedKey + "=" + encodeURIComponent(value));
            }
        }
        return result.join("&");
    };
    return Client;
}());
export default Client;
