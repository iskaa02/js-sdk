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
import BaseCrudService from '@/services/utils/BaseCrudService';
var SubCrudService = /** @class */ (function (_super) {
    __extends(SubCrudService, _super);
    function SubCrudService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a promise with all list items batch fetched at once.
     */
    SubCrudService.prototype.getFullList = function (sub, batchSize, queryParams) {
        if (batchSize === void 0) { batchSize = 100; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._getFullList(this.baseCrudPath(sub), batchSize, queryParams);
    };
    /**
     * Returns paginated items list.
     */
    SubCrudService.prototype.getList = function (sub, page, perPage, queryParams) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 30; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._getList(this.baseCrudPath(sub), page, perPage, queryParams);
    };
    /**
     * Returns single item by its id.
     */
    SubCrudService.prototype.getOne = function (sub, id, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this._getOne(this.baseCrudPath(sub), id, queryParams);
    };
    /**
     * Creates a new item.
     */
    SubCrudService.prototype.create = function (sub, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._create(this.baseCrudPath(sub), bodyParams, queryParams);
    };
    /**
     * Updates an existing item by its id.
     */
    SubCrudService.prototype.update = function (sub, id, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._update(this.baseCrudPath(sub), id, bodyParams, queryParams);
    };
    /**
     * Deletes an existing item by its id.
     */
    SubCrudService.prototype.delete = function (sub, id, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this._delete(this.baseCrudPath(sub), id, queryParams);
    };
    return SubCrudService;
}(BaseCrudService));
export default SubCrudService;
