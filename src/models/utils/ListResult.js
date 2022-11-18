var ListResult = /** @class */ (function () {
    function ListResult(page, perPage, totalItems, totalPages, items) {
        this.page = page > 0 ? page : 1;
        this.perPage = perPage >= 0 ? perPage : 0;
        this.totalItems = totalItems >= 0 ? totalItems : 0;
        this.totalPages = totalPages >= 0 ? totalPages : 0;
        this.items = items || [];
    }
    return ListResult;
}());
export default ListResult;
