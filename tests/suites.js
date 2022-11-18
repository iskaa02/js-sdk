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
import { assert } from 'chai';
import ListResult from '@/models/utils/ListResult';
import { FetchMock } from './mocks';
export function crudServiceTestsSuite(service, expectedBasePath) {
    var id = 'abc=';
    describe('CrudServiceTests', function () {
        var fetchMock = new FetchMock();
        before(function () {
            fetchMock.init();
        });
        after(function () {
            fetchMock.restore();
        });
        // Prepare mock data
        // -----------------------------------------------------------
        // getFullList and getList
        fetchMock.on({
            method: 'GET',
            url: service.client.buildUrl(service.baseCrudPath) + '?page=1&perPage=1&q1=abc',
            replyCode: 200,
            replyBody: {
                'page': 1,
                'perPage': 1,
                'totalItems': 3,
                'totalPages': 3,
                'items': [{ 'id': 'item1' }, { 'id': 'item2' }],
            },
        });
        fetchMock.on({
            method: 'GET',
            url: service.client.buildUrl(service.baseCrudPath) + '?page=2&perPage=1&q1=abc',
            replyCode: 200,
            replyBody: {
                'page': 2,
                'perPage': 1,
                'totalItems': 3,
                'totalPages': 3,
                'items': [{ 'id': 'item3' }],
            },
        });
        // getOne
        fetchMock.on({
            method: 'GET',
            url: service.client.buildUrl(service.baseCrudPath) + '/' + encodeURIComponent(id) + '?q1=abc',
            replyCode: 200,
            replyBody: { 'id': 'item-one' },
        });
        // getFirstListItem
        fetchMock.on({
            method: 'GET',
            url: service.client.buildUrl(service.baseCrudPath) + '?page=1&perPage=1&filter=test%3D123&q1=abc',
            replyCode: 200,
            replyBody: {
                'page': 1,
                'perPage': 1,
                'totalItems': 3,
                'totalPages': 3,
                'items': [{ 'id': 'item1' }, { 'id': 'item2' }],
            },
        });
        // create
        fetchMock.on({
            method: 'POST',
            url: service.client.buildUrl(service.baseCrudPath) + '?q1=456',
            body: { 'b1': 123 },
            replyCode: 200,
            replyBody: { 'id': 'item-create' },
        });
        // update
        fetchMock.on({
            method: 'PATCH',
            url: service.client.buildUrl(service.baseCrudPath) + '/' + encodeURIComponent(id) + '?q1=456',
            body: { 'b1': 123 },
            replyCode: 200,
            replyBody: { 'id': 'item-update' },
        });
        // delete
        fetchMock.on({
            method: 'DELETE',
            url: service.client.buildUrl(service.baseCrudPath) + '/' + encodeURIComponent(id) + '?q1=456',
            replyCode: 204,
        });
        // -----------------------------------------------------------
        describe('baseCrudPath()', function () {
            it('Should corectly return the service base crud path', function (done) {
                assert.equal(service.baseCrudPath, expectedBasePath);
                done();
            });
        });
        describe('getFullList()', function () {
            it('Should correctly return batched request data', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result, expected, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.getFullList(1, { 'q1': 'abc' })];
                            case 1:
                                result = _a.sent();
                                expected = [
                                    service.decode({ 'id': 'item1' }),
                                    service.decode({ 'id': 'item2' }),
                                    service.decode({ 'id': 'item3' }),
                                ];
                                assert.deepEqual(result, expected);
                                for (i in result) {
                                    assert.instanceOf(result[i], expected[i].constructor);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('getList()', function () {
            it('Should correctly return paginated list result', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var list, expected, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.getList(2, 1, { 'q1': 'abc' })];
                            case 1:
                                list = _a.sent();
                                expected = [service.decode({ 'id': 'item3' })];
                                assert.deepEqual(list, new ListResult(2, 1, 3, 3, expected));
                                for (i in list.items) {
                                    assert.instanceOf(list.items[i], expected[i].constructor);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('getFirstListItem()', function () {
            it('Should return single model item by a filter', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result, expected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.getFirstListItem("test=123", { 'q1': 'abc' })];
                            case 1:
                                result = _a.sent();
                                expected = service.decode({ 'id': 'item1' });
                                assert.instanceOf(result, expected.constructor);
                                assert.deepEqual(result, expected);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('getOne()', function () {
            it('Should return single model item by an id', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result, expected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.getOne(id, { 'q1': 'abc' })];
                            case 1:
                                result = _a.sent();
                                expected = service.decode({ 'id': 'item-one' });
                                assert.instanceOf(result, expected.constructor);
                                assert.deepEqual(result, expected);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('create()', function () {
            it('Should create new model item', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result, expected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.create({ 'b1': 123 }, { 'q1': 456 })];
                            case 1:
                                result = _a.sent();
                                expected = service.decode({ 'id': 'item-create' });
                                assert.instanceOf(result, expected.constructor);
                                assert.deepEqual(result, expected);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('update()', function () {
            it('Should update existing model item', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result, expected;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.update(id, { 'b1': 123 }, { 'q1': 456 })];
                            case 1:
                                result = _a.sent();
                                expected = service.decode({ 'id': 'item-update' });
                                assert.instanceOf(result, expected.constructor);
                                assert.deepEqual(result, expected);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('delete()', function () {
            it('Should delete single model item', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, service.delete(id, { "q1": 456 })];
                            case 1:
                                result = _a.sent();
                                assert.isTrue(result);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
}
