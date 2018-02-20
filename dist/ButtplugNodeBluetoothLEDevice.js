"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var util = require("util");
var ButtplugNodeBluetoothLEDevice = /** @class */ (function (_super) {
    __extends(ButtplugNodeBluetoothLEDevice, _super);
    function ButtplugNodeBluetoothLEDevice(_deviceInfo, _device) {
        var _this = _super.call(this) || this;
        _this._deviceInfo = _deviceInfo;
        _this._device = _device;
        _this._characteristics = new Map();
        _this.Connect = function () { return __awaiter(_this, void 0, void 0, function () {
            var connectAsync, discoverServicesAsync, nobleServices, _a, discoverCharsAsync, _i, _b, name_1, nobleChr, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        connectAsync = util.promisify(this._device.connect.bind(this._device));
                        return [4 /*yield*/, connectAsync()];
                    case 1:
                        _f.sent();
                        discoverServicesAsync = util.promisify(this._device.discoverServices.bind(this._device));
                        nobleServices = this._deviceInfo.Services;
                        nobleServices = nobleServices.map(function (x) { return x.replace(/-/g, ""); });
                        _a = this;
                        return [4 /*yield*/, discoverServicesAsync(nobleServices)];
                    case 2:
                        _a._service = (_f.sent())[0];
                        discoverCharsAsync = util.promisify(this._service.discoverCharacteristics.bind(this._service));
                        _i = 0, _b = Object.getOwnPropertyNames(this._deviceInfo.Characteristics);
                        _f.label = 3;
                    case 3:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        name_1 = _b[_i];
                        nobleChr = this._deviceInfo.Characteristics[name_1].replace(/-/g, "");
                        _d = (_c = this._characteristics).set;
                        _e = [name_1];
                        return [4 /*yield*/, discoverCharsAsync([nobleChr])];
                    case 4:
                        _d.apply(_c, _e.concat([(_f.sent())[0]]));
                        _f.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        _this.OnDisconnect = function () {
            _this._device.disconnect();
            _this.emit("deviceremoved");
        };
        _this.WriteValue = function (aCharacteristic, aValue) { return __awaiter(_this, void 0, void 0, function () {
            var chr, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._characteristics.has(aCharacteristic)) {
                            return [2 /*return*/];
                        }
                        chr = this._characteristics.get(aCharacteristic);
                        buffer = new Buffer(aValue);
                        return [4 /*yield*/, util.promisify(chr.write.bind(chr))(buffer, false)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.ReadValue = function (aCharacteristic) { return __awaiter(_this, void 0, void 0, function () {
            var chr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._characteristics.has(aCharacteristic)) {
                            throw new Error("Tried to access wrong characteristic!");
                        }
                        chr = this._characteristics.get(aCharacteristic);
                        return [4 /*yield*/, util.promisify(chr.read.bind(chr))()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        return _this;
    }
    ButtplugNodeBluetoothLEDevice.CreateDevice = function (aDeviceInfo, aDevice) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceImpl, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deviceImpl = new ButtplugNodeBluetoothLEDevice(aDeviceInfo, aDevice);
                        return [4 /*yield*/, deviceImpl.Connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, aDeviceInfo.Create(deviceImpl)];
                    case 2:
                        device = _a.sent();
                        // Use a fat arrow closure here, as we need to close over this definition of device.
                        deviceImpl.addListener("deviceremoved", function () {
                            device.OnDisconnect();
                        });
                        return [2 /*return*/, device];
                }
            });
        });
    };
    Object.defineProperty(ButtplugNodeBluetoothLEDevice.prototype, "Name", {
        get: function () {
            return this._device.advertisement.localName;
        },
        enumerable: true,
        configurable: true
    });
    return ButtplugNodeBluetoothLEDevice;
}(events_1.EventEmitter));
exports.ButtplugNodeBluetoothLEDevice = ButtplugNodeBluetoothLEDevice;
//# sourceMappingURL=ButtplugNodeBluetoothLEDevice.js.map