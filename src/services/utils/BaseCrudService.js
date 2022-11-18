var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import ListResult from '@/models/utils/ListResult';
import BaseService from '@/services/utils/BaseService';
import ClientResponseError from '@/ClientResponseError';
// @todo since there is no longer need of SubCrudService consider merging with CrudService in v0.9+
var BaseCrudService = /** @class */ (function (_super) {
    __extends(BaseCrudService, _super);
    function BaseCrudService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    BaseCrudService.prototype._getFullList = function (basePath, batchSize, queryParams) {
        var _this = this;
        if (batchSize === void 0) { batchSize = 100; }
        if (queryParams === void 0) { queryParams = {}; }
        var result = [];
        var request = function (page) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getList(basePath, page, batchSize, queryParams).then(function (list) {
                        var castedList = list;
                        var items = castedList.items;
                        var totalItems = castedList.totalItems;
                        result = result.concat(items);
                        if (items.length && totalItems > result.length) {
                            return request(page + 1);
                        }
                        return result;
                    })];
            });
        }); };
        return request(1);
    };
    /**
     * Returns paginated items list.
     */
    BaseCrudService.prototype._getList = function (basePath, page, perPage, queryParams) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 30; }
        if (queryParams === void 0) { queryParams = {}; }
        queryParams = Object.assign({
            'page': page,
            'perPage': perPage,
        }, queryParams);
        return this.client.send(basePath, {
            'method': 'GET',
            'params': queryParams,
        }).then(function (responseData) {
            var items = [];
            if (responseData === null || responseData === void 0 ? void 0 : responseData.items) {
                responseData.items = responseData.items || [];
                for (var _i = 0, _a = responseData.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    items.push(_this.decode(item));
                }
            }
            return new ListResult((responseData === null || responseData === void 0 ? void 0 : responseData.page) || 1, (responseData === null || responseData === void 0 ? void 0 : responseData.perPage) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalItems) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalPages) || 0, items);
        });
    };
    /**
     * Returns single item by its id.
     */
    BaseCrudService.prototype._getOne = function (basePath, id, queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(basePath + '/' + encodeURIComponent(id), {
            'method': 'GET',
            'params': queryParams
        }).then(function (responseData) { return _this.decode(responseData); });
    };
    /**
     * Returns the first found item by a list filter.
     *
     * Internally it calls `_getList(basePath, 1, 1, { filter })` and returns its
     * first item.
     *
     * For consistency with `_getOne`, this method will throw a 404
     * ClientResponseError if no item was found.
     */
    BaseCrudService.prototype._getFirstListItem = function (basePath, filter, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        queryParams = Object.assign({
            'filter': filter,
            '$cancelKey': 'one_by_filter_' + basePath + "_" + filter,
        }, queryParams);
        return this._getList(basePath, 1, 1, queryParams)
            .then(function (result) {
            var _a;
            if (!((_a = result === null || result === void 0 ? void 0 : result.items) === null || _a === void 0 ? void 0 : _a.length)) {
                throw new ClientResponseError({
                    status: 404,
                    data: {
                        code: 404,
                        message: "The requested resource wasn't found.",
                        data: {},
                    },
                });
            }
            return result.items[0];
        });
    };
    /**
     * Creates a new item.
     */
    BaseCrudService.prototype._create = function (basePath, bodyParams, queryParams) {
        var _this = this;
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(basePath, {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function (responseData) { return _this.decode(responseData); });
    };
    /**
     * Updates an existing item by its id.
     */
    BaseCrudService.prototype._update = function (basePath, id, bodyParams, queryParams) {
        var _this = this;
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(basePath + '/' + encodeURIComponent(id), {
            'method': 'PATCH',
            'params': queryParams,
            'body': bodyParams,
        }).then(function (responseData) { return _this.decode(responseData); });
    };
    /**
     * Deletes an existing item by its id.
     */
    BaseCrudService.prototype._delete = function (basePath, id, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(basePath + '/' + encodeURIComponent(id), {
            'method': 'DELETE',
            'params': queryParams,
        }).then(function () { return true; });
    };
    return BaseCrudService;
}(BaseService));
export default BaseCrudService;
