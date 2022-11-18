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
import { crudServiceTestsSuite } from '../suites';
import { FetchMock } from 'tests/mocks';
import Client from '@/Client';
import AdminService from '@/services/AdminService';
import Admin from '@/models/Admin';
describe('AdminService', function () {
    var client = new Client('test_base_url');
    var service = new AdminService(client);
    // base tests
    crudServiceTestsSuite(service, '/api/admins');
    var fetchMock = new FetchMock();
    beforeEach(function () {
        service.client.authStore.clear(); // reset
    });
    before(function () {
        fetchMock.init();
    });
    after(function () {
        fetchMock.restore();
    });
    afterEach(function () {
        fetchMock.clearMocks();
    });
    function authResponseCheck(result, expectedToken, expectedAdmin) {
        assert.isNotEmpty(result);
        assert.equal(result.token, expectedToken);
        assert.instanceOf(result.admin, Admin);
        assert.deepEqual(result.admin, expectedAdmin);
        assert.equal(service.client.authStore.token, expectedToken);
        assert.deepEqual(service.client.authStore.model, expectedAdmin);
    }
    // more tests:
    // ---------------------------------------------------------------
    describe('AuthStore sync', function () {
        it('Should update the AuthStore admin model on matching update id', function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fetchMock.on({
                                method: 'PATCH',
                                url: service.client.buildUrl('/api/admins/test123'),
                                replyCode: 200,
                                replyBody: {
                                    id: "test123",
                                    email: "new@example.com",
                                },
                            });
                            service.client.authStore.save("test_token", new Admin({ id: "test123", email: "old@example.com" }));
                            return [4 /*yield*/, service.update('test123', { email: "new@example.com" })];
                        case 1:
                            _b.sent();
                            assert.equal((_a = service.client.authStore.model) === null || _a === void 0 ? void 0 : _a.email, "new@example.com");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should not update the AuthStore admin model on mismatched update id', function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fetchMock.on({
                                method: 'PATCH',
                                url: service.client.buildUrl('/api/admins/test123'),
                                replyCode: 200,
                                replyBody: {
                                    id: "test123",
                                    email: "new@example.com",
                                },
                            });
                            service.client.authStore.save("test_token", new Admin({ id: "test456", email: "old@example.com" }));
                            return [4 /*yield*/, service.update('test123', { email: "new@example.com" })];
                        case 1:
                            _b.sent();
                            assert.equal((_a = service.client.authStore.model) === null || _a === void 0 ? void 0 : _a.email, "old@example.com");
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should delete the AuthStore admin model on matching delete id', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'DELETE',
                                url: service.client.buildUrl('/api/admins/test123'),
                                replyCode: 204,
                            });
                            service.client.authStore.save("test_token", new Admin({ id: "test123" }));
                            return [4 /*yield*/, service.delete('test123')];
                        case 1:
                            _a.sent();
                            assert.isNull(service.client.authStore.model);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should not delete the AuthStore admin model on mismatched delete id', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'DELETE',
                                url: service.client.buildUrl('/api/admins/test123'),
                                replyCode: 204,
                            });
                            service.client.authStore.save("test_token", new Admin({ id: "test456" }));
                            return [4 /*yield*/, service.delete('test123')];
                        case 1:
                            _a.sent();
                            assert.isNotNull(service.client.authStore.model);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('authWithPassword()', function () {
        it('Should auth an admin by its email and password', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'POST',
                                url: service.client.buildUrl('/api/admins/auth-with-password') + '?q1=456',
                                body: {
                                    'identity': 'test@example.com',
                                    'password': '123456',
                                    'b1': 123,
                                },
                                replyCode: 200,
                                replyBody: {
                                    'token': 'token_authorize',
                                    'admin': { 'id': 'id_authorize' },
                                },
                            });
                            return [4 /*yield*/, service.authWithPassword('test@example.com', '123456', { 'b1': 123 }, { 'q1': 456 })];
                        case 1:
                            result = _a.sent();
                            authResponseCheck(result, 'token_authorize', service.decode({ 'id': 'id_authorize' }));
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('authRefresh()', function () {
        it('Should refresh an authorized admin instance', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'POST',
                                url: service.client.buildUrl('/api/admins/auth-refresh') + '?q1=456',
                                body: { 'b1': 123 },
                                replyCode: 200,
                                replyBody: {
                                    'token': 'token_refresh',
                                    'admin': { 'id': 'id_refresh' },
                                },
                            });
                            return [4 /*yield*/, service.authRefresh({ 'b1': 123 }, { 'q1': 456 })];
                        case 1:
                            result = _a.sent();
                            authResponseCheck(result, 'token_refresh', service.decode({ 'id': 'id_refresh' }));
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('requestPasswordReset()', function () {
        it('Should send a password reset request', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'POST',
                                url: service.client.buildUrl('/api/admins/request-password-reset') + '?q1=456',
                                body: {
                                    'email': 'test@example.com',
                                    'b1': 123,
                                },
                                replyCode: 204,
                                replyBody: true,
                            });
                            return [4 /*yield*/, service.requestPasswordReset('test@example.com', { 'b1': 123 }, { 'q1': 456 })];
                        case 1:
                            result = _a.sent();
                            assert.isTrue(result);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('confirmPasswordReset()', function () {
        it('Should confirm a password reset request', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'POST',
                                url: service.client.buildUrl('/api/admins/confirm-password-reset') + '?q1=456',
                                body: {
                                    'token': 'test',
                                    'password': '123',
                                    'passwordConfirm': '456',
                                    'b1': 123,
                                },
                                replyCode: 204,
                                replyBody: true,
                            });
                            return [4 /*yield*/, service.confirmPasswordReset('test', '123', '456', { 'b1': 123 }, { 'q1': 456 })];
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
