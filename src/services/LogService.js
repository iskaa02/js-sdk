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
import LogRequest from '@/models/LogRequest';
import ListResult from '@/models/utils/ListResult';
import BaseService from '@/services/utils/BaseService';
var LogService = /** @class */ (function (_super) {
    __extends(LogService, _super);
    function LogService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns paginated logged requests list.
     */
    LogService.prototype.getRequestsList = function (page, perPage, queryParams) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 30; }
        if (queryParams === void 0) { queryParams = {}; }
        queryParams = Object.assign({
            'page': page,
            'perPage': perPage,
        }, queryParams);
        return this.client.send('/api/logs/requests', {
            'method': 'GET',
            'params': queryParams,
        }).then(function (responseData) {
            var items = [];
            if (responseData === null || responseData === void 0 ? void 0 : responseData.items) {
                responseData.items = (responseData === null || responseData === void 0 ? void 0 : responseData.items) || [];
                for (var _i = 0, _a = responseData.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    items.push(new LogRequest(item));
                }
            }
            return new ListResult((responseData === null || responseData === void 0 ? void 0 : responseData.page) || 1, (responseData === null || responseData === void 0 ? void 0 : responseData.perPage) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalItems) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalPages) || 0, items);
        });
    };
    /**
     * Returns a single logged request by its id.
     */
    LogService.prototype.getRequest = function (id, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send('/api/logs/requests/' + encodeURIComponent(id), {
            'method': 'GET',
            'params': queryParams
        }).then(function (responseData) { return new LogRequest(responseData); });
    };
    /**
     * Returns request logs statistics.
     */
    LogService.prototype.getRequestsStats = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send('/api/logs/requests/stats', {
            'method': 'GET',
            'params': queryParams
        }).then(function (responseData) { return responseData; });
    };
    return LogService;
}(BaseService));
export default LogService;
