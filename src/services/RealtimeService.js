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
import BaseService from '@/services/utils/BaseService';
var RealtimeService = /** @class */ (function (_super) {
    __extends(RealtimeService, _super);
    function RealtimeService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clientId = "";
        _this.eventSource = null;
        _this.subscriptions = {};
        return _this;
    }
    /**
     * Register the subscription listener.
     *
     * You can subscribe multiple times to the same topic.
     *
     * If the SSE connection is not started yet,
     * this method will also initialize it.
     */
    RealtimeService.prototype.subscribe = function (topic, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var listener;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!topic) {
                            throw new Error('topic must be set.');
                        }
                        listener = function (e) {
                            var msgEvent = e;
                            var data;
                            try {
                                data = JSON.parse(msgEvent === null || msgEvent === void 0 ? void 0 : msgEvent.data);
                            }
                            catch (_a) { }
                            callback(data || {});
                        };
                        // store the listener
                        if (!this.subscriptions[topic]) {
                            this.subscriptions[topic] = [];
                        }
                        this.subscriptions[topic].push(listener);
                        if (!!this.eventSource) return [3 /*break*/, 1];
                        // start a new sse connection
                        this.connect();
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(this.subscriptions[topic].length === 1)) return [3 /*break*/, 3];
                        // send the updated subscriptions (if it is the first for the topic)
                        return [4 /*yield*/, this.submitSubscriptions()];
                    case 2:
                        // send the updated subscriptions (if it is the first for the topic)
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // only register the listener
                        this.eventSource.addEventListener(topic, listener);
                        _a.label = 4;
                    case 4: return [2 /*return*/, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.unsubscribeByTopicAndListener(topic, listener)];
                            });
                        }); }];
                }
            });
        });
    };
    /**
     * Unsubscribe from all subscription listeners with the specified topic.
     *
     * If `topic` is not provided, then this method will unsubscribe
     * from all active subscriptions.
     *
     * This method is no-op if there are no active subscriptions.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operation there are no active subscriptions left.
     */
    RealtimeService.prototype.unsubscribe = function (topic) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _b, listener;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.hasSubscriptionListeners(topic)) {
                            return [2 /*return*/]; // already unsubscribed
                        }
                        if (!topic) {
                            // remove all subscriptions
                            this.subscriptions = {};
                        }
                        else {
                            // remove all topic listeners
                            for (_i = 0, _b = this.subscriptions[topic]; _i < _b.length; _i++) {
                                listener = _b[_i];
                                (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener(topic, listener);
                            }
                            delete this.subscriptions[topic];
                        }
                        if (!!this.hasSubscriptionListeners()) return [3 /*break*/, 1];
                        // no other active subscriptions -> close the sse connection
                        this.disconnect();
                        return [3 /*break*/, 3];
                    case 1:
                        if (!!this.hasSubscriptionListeners(topic)) return [3 /*break*/, 3];
                        // submit subscriptions change if there are no other active subscriptions related to the topic
                        return [4 /*yield*/, this.submitSubscriptions()];
                    case 2:
                        // submit subscriptions change if there are no other active subscriptions related to the topic
                        _c.sent();
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Unsubscribe from all subscription listeners starting with the specified topic prefix.
     *
     * This method is no-op if there are no active subscriptions with the specified topic prefix.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operation there are no active subscriptions left.
     */
    RealtimeService.prototype.unsubscribeByPrefix = function (topicPrefix) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var hasAtleastOneTopic, topic, _i, _b, listener;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        hasAtleastOneTopic = false;
                        for (topic in this.subscriptions) {
                            if (!topic.startsWith(topicPrefix)) {
                                continue;
                            }
                            hasAtleastOneTopic = true;
                            for (_i = 0, _b = this.subscriptions[topic]; _i < _b.length; _i++) {
                                listener = _b[_i];
                                (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener(topic, listener);
                            }
                            delete this.subscriptions[topic];
                        }
                        if (!hasAtleastOneTopic) {
                            return [2 /*return*/]; // nothing to unsubscribe from
                        }
                        if (!this.hasSubscriptionListeners()) return [3 /*break*/, 2];
                        // submit the deleted subscriptions
                        return [4 /*yield*/, this.submitSubscriptions()];
                    case 1:
                        // submit the deleted subscriptions
                        _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        // no other active subscriptions -> close the sse connection
                        this.disconnect();
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Unsubscribe from all subscriptions matching the specified topic and listener function.
     *
     * This method is no-op if there are no active subscription with
     * the specified topic and listener.
     *
     * The related sse connection will be autoclosed if after the
     * unsubscribe operation there are no active subscriptions left.
     */
    RealtimeService.prototype.unsubscribeByTopicAndListener = function (topic, listener) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var exist, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!Array.isArray(this.subscriptions[topic]) || !this.subscriptions[topic].length) {
                            return [2 /*return*/]; // already unsubscribed
                        }
                        exist = false;
                        for (i = this.subscriptions[topic].length - 1; i >= 0; i--) {
                            if (this.subscriptions[topic][i] !== listener) {
                                continue;
                            }
                            exist = true; // has at least one matching listener
                            delete this.subscriptions[topic][i]; // removes the function reference
                            this.subscriptions[topic].splice(i, 1); // reindex the array
                            (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener(topic, listener);
                        }
                        if (!exist) {
                            return [2 /*return*/];
                        }
                        // remove the topic from the subscriptions list if there are no other listeners
                        if (!this.subscriptions[topic].length) {
                            delete this.subscriptions[topic];
                        }
                        if (!!this.hasSubscriptionListeners()) return [3 /*break*/, 1];
                        // no other active subscriptions -> close the sse connection
                        this.disconnect();
                        return [3 /*break*/, 3];
                    case 1:
                        if (!!this.hasSubscriptionListeners(topic)) return [3 /*break*/, 3];
                        // submit subscriptions change if there are no other active subscriptions related to the topic
                        return [4 /*yield*/, this.submitSubscriptions()];
                    case 2:
                        // submit subscriptions change if there are no other active subscriptions related to the topic
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RealtimeService.prototype.hasSubscriptionListeners = function (topicToCheck) {
        var _a, _b;
        this.subscriptions = this.subscriptions || {};
        // check the specified topic
        if (topicToCheck) {
            return !!((_a = this.subscriptions[topicToCheck]) === null || _a === void 0 ? void 0 : _a.length);
        }
        // check for at least one non-empty topic
        for (var topic in this.subscriptions) {
            if (!!((_b = this.subscriptions[topic]) === null || _b === void 0 ? void 0 : _b.length)) {
                return true;
            }
        }
        return false;
    };
    RealtimeService.prototype.submitSubscriptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.clientId) {
                    return [2 /*return*/, false];
                }
                // optimistic update
                this.addAllSubscriptionListeners();
                return [2 /*return*/, this.client.send('/api/realtime', {
                        'method': 'POST',
                        'body': {
                            'clientId': this.clientId,
                            'subscriptions': this.getNonEmptySubscriptionTopics(),
                        },
                        'params': {
                            '$cancelKey': "realtime_subscriptions_" + this.clientId,
                        },
                    }).then(function () { return true; }).catch(function (err) {
                        if (err === null || err === void 0 ? void 0 : err.isAbort) {
                            return true; // silently ignore aborted pending requests
                        }
                        throw err;
                    })];
            });
        });
    };
    RealtimeService.prototype.getNonEmptySubscriptionTopics = function () {
        var result = [];
        for (var topic in this.subscriptions) {
            if (this.subscriptions[topic].length) {
                result.push(topic);
            }
        }
        return result;
    };
    RealtimeService.prototype.addAllSubscriptionListeners = function () {
        if (!this.eventSource) {
            return;
        }
        this.removeAllSubscriptionListeners();
        for (var topic in this.subscriptions) {
            for (var _i = 0, _a = this.subscriptions[topic]; _i < _a.length; _i++) {
                var listener = _a[_i];
                this.eventSource.addEventListener(topic, listener);
            }
        }
    };
    RealtimeService.prototype.removeAllSubscriptionListeners = function () {
        if (!this.eventSource) {
            return;
        }
        for (var topic in this.subscriptions) {
            for (var _i = 0, _a = this.subscriptions[topic]; _i < _a.length; _i++) {
                var listener = _a[_i];
                this.eventSource.removeEventListener(topic, listener);
            }
        }
    };
    RealtimeService.prototype.connectHandler = function (e) {
        var msgEvent = e;
        this.clientId = msgEvent === null || msgEvent === void 0 ? void 0 : msgEvent.lastEventId;
        this.submitSubscriptions();
    };
    RealtimeService.prototype.connect = function () {
        var _this = this;
        this.disconnect();
        this.eventSource = new EventSource(this.client.buildUrl('/api/realtime'));
        this.eventSource.addEventListener('PB_CONNECT', function (e) { return _this.connectHandler(e); });
    };
    RealtimeService.prototype.disconnect = function () {
        var _this = this;
        var _a, _b;
        this.removeAllSubscriptionListeners();
        (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener('PB_CONNECT', function (e) { return _this.connectHandler(e); });
        (_b = this.eventSource) === null || _b === void 0 ? void 0 : _b.close();
        this.eventSource = null;
        this.clientId = "";
    };
    return RealtimeService;
}(BaseService));
export default RealtimeService;
