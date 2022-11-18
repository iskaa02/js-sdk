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
import Client from '@/Client';
import SettingsService from '@/services/SettingsService';
import { FetchMock } from 'tests/mocks';
describe('SettingsService', function () {
    var client = new Client('test_base_url');
    var service = new SettingsService(client);
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
    describe('getAll()', function () {
        it('Should fetch all app settings', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'GET',
                                url: service.client.buildUrl('/api/settings') + '?q1=123',
                                replyCode: 200,
                                replyBody: { 'test': 'abc' },
                            });
                            return [4 /*yield*/, service.getAll({ 'q1': 123 })];
                        case 1:
                            result = _a.sent();
                            assert.deepEqual(result, { 'test': 'abc' });
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('update()', function () {
        it('Should send bulk app settings update', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'PATCH',
                                url: service.client.buildUrl('/api/settings'),
                                body: { 'b1': 123 },
                                replyCode: 200,
                                replyBody: { 'test': 'abc' },
                            });
                            return [4 /*yield*/, service.update({ 'b1': 123 })];
                        case 1:
                            result = _a.sent();
                            assert.deepEqual(result, { 'test': 'abc' });
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('testS3()', function () {
        it('Should send S3 connection test request', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'POST',
                                url: service.client.buildUrl('/api/settings/test/s3') + '?q1=123',
                                replyCode: 204,
                                replyBody: true,
                            });
                            return [4 /*yield*/, service.testS3({ 'q1': 123 })];
                        case 1:
                            result = _a.sent();
                            assert.isTrue(result);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('testEmail()', function () {
        it('Should send a test email request', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fetchMock.on({
                                method: 'POST',
                                url: service.client.buildUrl('/api/settings/test/email') + '?q1=123',
                                body: { 'template': "abc", "email": "test@example.com" },
                                replyCode: 204,
                                replyBody: true,
                            });
                            return [4 /*yield*/, service.testEmail("test@example.com", "abc", { "q1": 123 })];
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
