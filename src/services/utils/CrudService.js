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
var CrudService = /** @class */ (function (_super) {
    __extends(CrudService, _super);
    function CrudService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns a promise with all list items batch fetched at once.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     */
    CrudService.prototype.getFullList = function (batch, queryParams) {
        if (batch === void 0) { batch = 200; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._getFullList(this.baseCrudPath, batch, queryParams);
    };
    /**
     * Returns paginated items list.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     */
    CrudService.prototype.getList = function (page, perPage, queryParams) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 30; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._getList(this.baseCrudPath, page, perPage, queryParams);
    };
    /**
     * Returns the first found item by the specified filter.
     *
     * Internally it calls `getList(1, 1, { filter })` and returns the
     * first found item.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     *
     * For consistency with `getOne`, this method will throw a 404
     * ClientResponseError if no item was found.
     */
    CrudService.prototype.getFirstListItem = function (filter, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this._getFirstListItem(this.baseCrudPath, filter, queryParams);
    };
    /**
     * Returns single item by its id.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     */
    CrudService.prototype.getOne = function (id, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this._getOne(this.baseCrudPath, id, queryParams);
    };
    /**
     * Creates a new item.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     */
    CrudService.prototype.create = function (bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._create(this.baseCrudPath, bodyParams, queryParams);
    };
    /**
     * Updates an existing item by its id.
     *
     * You can use the generic T to supply a wrapper type of the crud model.
     */
    CrudService.prototype.update = function (id, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this._update(this.baseCrudPath, id, bodyParams, queryParams);
    };
    /**
     * Deletes an existing item by its id.
     */
    CrudService.prototype.delete = function (id, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this._delete(this.baseCrudPath, id, queryParams);
    };
    return CrudService;
}(BaseCrudService));
export default CrudService;
