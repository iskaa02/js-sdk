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
import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Client from '@/Client';
import LocalAuthStore from '@/stores/LocalAuthStore';
import { FetchMock } from './mocks';
import Admin from '@/models/Admin';
import Record from '@/models/Record';
import RecordService from '@/services/RecordService';
chai.use(chaiAsPromised);
describe('Client', function () {
    var fetchMock = new FetchMock();
    before(function () {
        fetchMock.init();
    });
    after(function () {
        fetchMock.restore();
    });
    afterEach(function () {
        fetchMock.clearMocks();
    });
    describe('constructor()', function () {
        it('Should create a properly configured http client instance', function () {
            var client = new Client('test_base_url', null, 'test_language');
            assert.equal(client.baseUrl, 'test_base_url');
            assert.instanceOf(client.authStore, LocalAuthStore);
            assert.equal(client.lang, 'test_language');
        });
        it('Should load all api resources', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, baseServices, _i, baseServices_1, service;
                return __generator(this, function (_a) {
                    client = new Client('test_base_url');
                    baseServices = [
                        'admins',
                        'collections',
                        'logs',
                        'settings',
                        'realtime',
                    ];
                    for (_i = 0, baseServices_1 = baseServices; _i < baseServices_1.length; _i++) {
                        service = baseServices_1[_i];
                        assert.isNotEmpty(client[service]);
                    }
                    return [2 /*return*/];
                });
            });
        });
    });
    describe('collection()', function () {
        it('Should initialize the related collection record service', function () {
            var client = new Client('test_base_url');
            var service1 = client.collection('test1');
            var service2 = client.collection('test2');
            var service3 = client.collection('test1'); // same as service1
            assert.instanceOf(service1, RecordService);
            assert.instanceOf(service2, RecordService);
            assert.instanceOf(service3, RecordService);
            assert.equal(service1, service3);
            assert.notEqual(service1, service2);
            assert.equal(service1.baseCrudPath, '/api/collections/test1/records');
            assert.equal(service2.baseCrudPath, '/api/collections/test2/records');
            assert.equal(service3.baseCrudPath, '/api/collections/test1/records');
        });
    });
    describe('buildUrl()', function () {
        it('Should properly concatenate path to baseUrl', function () {
            // with trailing slash
            var client1 = new Client('test_base_url/');
            assert.equal(client1.buildUrl("test123"), 'test_base_url/test123');
            assert.equal(client1.buildUrl("/test123"), 'test_base_url/test123');
            // no trailing slash
            var client2 = new Client('test_base_url');
            assert.equal(client2.buildUrl("test123"), 'test_base_url/test123');
            assert.equal(client2.buildUrl("/test123"), 'test_base_url/test123');
        });
    });
    describe('getFileUrl()', function () {
        var client = new Client('test_base_url');
        it('Should return a formatted url', function () {
            return __awaiter(this, void 0, void 0, function () {
                var record, result;
                return __generator(this, function (_a) {
                    record = new Record({ 'id': '456', 'collectionId': '123' });
                    result = client.getFileUrl(record, 'demo.png');
                    assert.deepEqual(result, 'test_base_url/api/files/123/456/demo.png');
                    return [2 /*return*/];
                });
            });
        });
        it('Should return a formatted url + query params', function () {
            return __awaiter(this, void 0, void 0, function () {
                var record, result;
                return __generator(this, function (_a) {
                    record = new Record({ 'id': '456', 'collectionId': '123' });
                    result = client.getFileUrl(record, 'demo=', { 'test': 'abc' });
                    assert.deepEqual(result, 'test_base_url/api/files/123/456/demo%3D?test=abc');
                    return [2 /*return*/];
                });
            });
        });
    });
    describe('send()', function () {
        it('Should build and send http request', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, testCases, _i, testCases_1, testCase, responseData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url', null, 'test_language_A');
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                replyCode: 200,
                                replyBody: 'successGet',
                            });
                            fetchMock.on({
                                method: 'POST',
                                url: 'test_base_url/123',
                                replyCode: 200,
                                replyBody: 'successPost',
                            });
                            fetchMock.on({
                                method: 'PUT',
                                url: 'test_base_url/123',
                                replyCode: 200,
                                replyBody: 'successPut',
                            });
                            fetchMock.on({
                                method: 'PATCH',
                                url: 'test_base_url/123',
                                replyCode: 200,
                                replyBody: 'successPatch',
                            });
                            fetchMock.on({
                                method: 'DELETE',
                                url: 'test_base_url/123',
                                replyCode: 200,
                                replyBody: 'successDelete',
                            });
                            testCases = [
                                [client.send('/123', { method: 'GET' }), 'successGet'],
                                [client.send('/123', { method: 'POST' }), 'successPost'],
                                [client.send('/123', { method: 'PUT' }), 'successPut'],
                                [client.send('/123', { method: 'PATCH' }), 'successPatch'],
                                [client.send('/123', { method: 'DELETE' }), 'successDelete'],
                            ];
                            _i = 0, testCases_1 = testCases;
                            _a.label = 1;
                        case 1:
                            if (!(_i < testCases_1.length)) return [3 /*break*/, 4];
                            testCase = testCases_1[_i];
                            return [4 /*yield*/, testCase[0]];
                        case 2:
                            responseData = _a.sent();
                            assert.equal(responseData, testCase[1]);
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        });
        it('Should auto add authorization header if missing', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, admin, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url', null, 'test_language_A');
                            // none
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/none',
                                additionalMatcher: function (_, config) {
                                    var _a;
                                    return !((_a = config === null || config === void 0 ? void 0 : config.headers) === null || _a === void 0 ? void 0 : _a.Authorization);
                                },
                                replyCode: 200,
                            });
                            return [4 /*yield*/, client.send('/none', { method: 'GET' })];
                        case 1:
                            _a.sent();
                            // admin token
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/admin',
                                additionalMatcher: function (_, config) {
                                    var _a;
                                    return ((_a = config === null || config === void 0 ? void 0 : config.headers) === null || _a === void 0 ? void 0 : _a.Authorization) === 'token123';
                                },
                                replyCode: 200,
                            });
                            admin = new Admin({ 'id': 'test-admin' });
                            client.authStore.save('token123', admin);
                            return [4 /*yield*/, client.send('/admin', { method: 'GET' })];
                        case 2:
                            _a.sent();
                            // user token
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/user',
                                additionalMatcher: function (_, config) {
                                    var _a;
                                    return ((_a = config === null || config === void 0 ? void 0 : config.headers) === null || _a === void 0 ? void 0 : _a.Authorization) === 'token123';
                                },
                                replyCode: 200,
                            });
                            user = new Record({ 'id': 'test-user', "collectionId": 'test-user' });
                            client.authStore.save('token123', user);
                            return [4 /*yield*/, client.send('/user', { method: 'GET' })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should trigger the before and after hooks', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, responseSuccess, responseFailure;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url');
                            client.beforeSend = function (url, reqConfig) {
                                reqConfig.headers = Object.assign(reqConfig.headers, {
                                    'X-Custom-Header': url,
                                });
                                return reqConfig;
                            };
                            client.afterSend = function (response, _) {
                                if (response.url === 'test_base_url/failure') {
                                    throw new Error("test_error");
                                }
                                return '789';
                            };
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/success',
                                replyCode: 200,
                                replyBody: '123',
                                additionalMatcher: function (url, config) {
                                    var _a;
                                    return url != "" && ((_a = config === null || config === void 0 ? void 0 : config.headers) === null || _a === void 0 ? void 0 : _a['X-Custom-Header']) == url;
                                },
                            });
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/failure',
                                replyCode: 200,
                                replyBody: '456',
                            });
                            return [4 /*yield*/, client.send('/success', { method: 'GET' })];
                        case 1:
                            responseSuccess = _a.sent();
                            assert.equal(responseSuccess, '789');
                            responseFailure = client.send('/failure', { method: 'GET' });
                            return [4 /*yield*/, assert.isRejected(responseFailure, null)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('cancelRequest()', function () {
        it('Should cancel pending request', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url');
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                delay: 5,
                                replyCode: 200,
                            });
                            response = client.send("/123", { method: 'GET', params: { '$cancelKey': 'testKey' } });
                            client.cancelRequest('testKey');
                            return [4 /*yield*/, assert.isRejected(response, null)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('cancelAllRequests()', function () {
        it('Should cancel all pending requests', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, requestA, requestB;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url');
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                delay: 5,
                                replyCode: 200,
                            });
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/456',
                                delay: 5,
                                replyCode: 200,
                            });
                            requestA = client.send("/123", { method: 'GET' });
                            requestB = client.send("/456", { method: 'GET' });
                            client.cancelAllRequests();
                            return [4 /*yield*/, assert.isRejected(requestA, null)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, assert.isRejected(requestB, null)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('auto cancellation', function () {
        it('Should disable auto cancellation', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, requestA, requestB;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url').autoCancellation(false);
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                delay: 5,
                                replyCode: 200,
                            });
                            requestA = client.send('/123', { method: 'GET' });
                            requestB = client.send('/123', { method: 'GET' });
                            return [4 /*yield*/, assert.isFulfilled(requestA)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, assert.isFulfilled(requestB)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should auto cancel duplicated requests with default key', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, requestA, requestB, requestC;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url');
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                delay: 5,
                                replyCode: 200,
                            });
                            requestA = client.send('/123', { method: 'GET' });
                            requestB = client.send('/123', { method: 'GET' });
                            requestC = client.send('/123', { method: 'GET' });
                            return [4 /*yield*/, assert.isRejected(requestA, null)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, assert.isRejected(requestB, null)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, assert.isFulfilled(requestC)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should auto cancel duplicated requests with custom key', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, requestA, requestB;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url');
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                delay: 5,
                                replyCode: 200,
                            });
                            requestA = client.send('/123', { method: 'GET', params: { $cancelKey: 'customKey' } });
                            requestB = client.send('/123', { method: 'GET' });
                            return [4 /*yield*/, assert.isFulfilled(requestA)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, assert.isFulfilled(requestB)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should skip auto cancellation', function () {
            return __awaiter(this, void 0, void 0, function () {
                var client, requestA, requestB, requestC;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            client = new Client('test_base_url');
                            fetchMock.on({
                                method: 'GET',
                                url: 'test_base_url/123',
                                delay: 5,
                                replyCode: 200,
                            });
                            requestA = client.send('/123', { method: 'GET', params: { $autoCancel: false } });
                            requestB = client.send('/123', { method: 'GET', params: { $autoCancel: false } });
                            requestC = client.send('/123', { method: 'GET', params: { $autoCancel: false } });
                            return [4 /*yield*/, assert.isFulfilled(requestA)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, assert.isFulfilled(requestB)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, assert.isFulfilled(requestC)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
