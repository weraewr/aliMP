(my["webpackJsonp"] = my["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // ??????atob??????????????????????????????????????????`const Base64 = {atob};Base64.atob('xxxx')`??????????????????
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = my.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('?????????????????????????????????????????????????????????' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _my$getSystemInfoSync =




  my.getSystemInfoSync(),platform = _my$getSystemInfoSync.platform,pixelRatio = _my$getSystemInfoSync.pixelRatio,windowWidth = _my$getSystemInfoSync.windowWidth; // uni=>my runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(my.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // ?????????
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // ???????????? $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(my.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this2 = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this2.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


function setStorageSync(key, data) {
  return my.setStorageSync({
    key: key,
    data: data });

}
function getStorageSync(key) {
  var result = my.getStorageSync({
    key: key });

  // ?????????????????????????????? success ???????????????????????????????????????????????? true????????????????????????????????????????????????????????????????????????
  return result.data !== null ? result.data : '';
}
function removeStorageSync(key) {
  return my.removeStorageSync({
    key: key });

}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-alipay".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = platform;
    osVersion = system;
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // ??? ?????? ?????? ??????

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;
  {_SDKVersion = my.SDKVersion;}

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__AA8FF5E",
    appName: "ths_one",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.4.15",
    uniRuntimeVersion: "3.4.15",
    uniPlatform: undefined || "mp-alipay",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = "mp-alipay".split('-')[1];
  var _hostName = result.hostName || _platform; // mp-jd
  _hostName = result.app;

  return _hostName;
}

var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    my.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function normalizePlatform(result) {
  var platform = result.platform ? result.platform.toLowerCase() : 'devtools';
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools';
  }
  result.platform = platform;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
    normalizePlatform(result);
    populateParameters(result);
  } };


// ???????????? API ??????
var todos = [
'preloadPage',
'unPreloadPage',
'loadSubPackage'
// 'getRecorderManager',
// 'getBackgroundAudioManager',
// 'createInnerAudioContext',
// 'createCameraContext',
// 'createLivePlayerContext',
// 'startAccelerometer',
// 'startCompass',
// 'authorize',
// 'chooseInvoiceTitle',
// 'addTemplate',
// 'deleteTemplate',
// 'getTemplateLibraryById',
// 'getTemplateLibraryList',
// 'getTemplateList',
// 'sendTemplateMessage',
// 'setEnableDebug',
// 'getExtConfig',
// 'getExtConfigSync',
// 'onWindowResize',
// 'offWindowResize'
];

// ?????????????????? API ??????
var canIUses = [
'startPullDownRefresh',
'setTabBarItem',
'setTabBarStyle',
'hideTabBar',
'showTabBar',
'setTabBarBadge',
'removeTabBarBadge',
'showTabBarRedDot',
'hideTabBarRedDot',
'openSetting',
'getSetting',
'createIntersectionObserver',
'getUpdateManager',
'setBackgroundColor',
'setBackgroundTextStyle',
'checkIsSupportSoterAuthentication',
'startSoterAuthentication',
'checkIsSoterEnrolledInDevice',
'openDocument',
'createVideoContext',
'onMemoryWarning',
'addPhoneContact'];


function _handleNetworkInfo(result) {
  switch (result.networkType) {
    case 'NOTREACHABLE':
      result.networkType = 'none';
      break;
    case 'WWAN':
      // TODO ?
      result.networkType = '3g';
      break;
    default:
      result.networkType = result.networkType.toLowerCase();
      break;}

  return {};
}

var protocols = { // ?????????????????? API ??????
  navigateTo: navigateTo,
  redirectTo: redirectTo,
  returnValue: function returnValue(methodName) {var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // ?????? returnValue ??????
    if (res.error || res.errorMessage) {
      res.errMsg = "".concat(methodName, ":fail ").concat(res.errorMessage || res.error);
      delete res.error;
      delete res.errorMessage;
    } else {
      res.errMsg = "".concat(methodName, ":ok");
    }
    return res;
  },
  request: {
    name: my.canIUse('request') ? 'request' : 'httpRequest',
    args: function args(fromArgs) {
      var method = fromArgs.method || 'GET';
      if (!fromArgs.header) {// ???????????? header ???????????????????????? content-type
        fromArgs.header = {};
      }
      var headers = {
        'content-type': 'application/json' };

      Object.keys(fromArgs.header).forEach(function (key) {
        headers[key.toLocaleLowerCase()] = fromArgs.header[key];
      });
      return {
        header: function header() {var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var toArgs = arguments.length > 1 ? arguments[1] : undefined;
          return {
            name: 'headers',
            value: headers };

        },
        data: function data(_data) {
          // ??????????????????content-type???application/json???????????????????????????data?????????my.dd???????????????????????????????????????????????????
          if (my.canIUse('saveFileToDingTalk') && method.toUpperCase() === 'POST' && headers['content-type'].indexOf(
          'application/json') === 0 && isPlainObject(_data)) {
            return {
              name: 'data',
              value: JSON.stringify(_data) };

          }
          return {
            name: 'data',
            value: _data };

        },
        method: 'method', // TODO ??????????????????????????? get,post
        responseType: false };

    },
    returnValue: {
      status: 'statusCode',
      headers: 'header' } },


  setNavigationBarColor: {
    name: 'setNavigationBar',
    args: {
      frontColor: false,
      animation: false } },


  setNavigationBarTitle: {
    name: 'setNavigationBar' },

  showModal: function showModal()

  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$showCancel = _ref.showCancel,showCancel = _ref$showCancel === void 0 ? true : _ref$showCancel;
    if (showCancel) {
      return {
        name: 'confirm',
        args: {
          cancelColor: false,
          confirmColor: false,
          cancelText: 'cancelButtonText',
          confirmText: 'confirmButtonText' },

        returnValue: function returnValue(fromRes, toRes) {
          toRes.confirm = fromRes.confirm;
          toRes.cancel = !fromRes.confirm;
        } };

    }
    return {
      name: 'alert',
      args: {
        confirmColor: false,
        confirmText: 'buttonText' },

      returnValue: function returnValue(fromRes, toRes) {
        toRes.confirm = true;
        toRes.cancel = false;
      } };

  },
  showToast: function showToast()

  {var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref2$icon = _ref2.icon,icon = _ref2$icon === void 0 ? 'success' : _ref2$icon;
    var args = {
      title: 'content',
      icon: 'type',
      duration: false,
      image: false,
      mask: false };

    if (icon === 'loading') {
      return {
        name: 'showLoading',
        args: args };

    }
    return {
      name: 'showToast',
      args: args };

  },
  showActionSheet: {
    name: 'showActionSheet',
    args: {
      itemList: 'items',
      itemColor: false },

    returnValue: {
      index: 'tapIndex' } },


  showLoading: {
    args: {
      title: 'content',
      mask: false } },


  uploadFile: {
    args: {
      name: 'fileName' }

    // ?????????????????????????????????????????????????????????????????????
  },
  downloadFile: {
    returnValue: {
      apFilePath: 'tempFilePath' } },


  getFileInfo: {
    args: {
      filePath: 'apFilePath' } },


  compressImage: {
    args: function args(fromArgs) {
      fromArgs.compressLevel = 4;
      if (fromArgs && fromArgs.quality) {
        fromArgs.compressLevel = Math.floor(fromArgs.quality / 26);
      }
      fromArgs.apFilePaths = [fromArgs.src];
    },
    returnValue: function returnValue(result) {
      if (result.apFilePaths && result.apFilePaths.length) {
        result.tempFilePath = result.apFilePaths[0];
      }
    } },

  chooseVideo: {
    // ?????????????????????????????????????????????getSetting??????????????????????????????
    returnValue: {
      apFilePath: 'tempFilePath' } },


  connectSocket: {
    args: {
      method: false,
      protocols: false }

    // TODO ????????????????????????????????????
  },
  chooseImage: {
    returnValue: function returnValue(result) {
      var hasTempFilePaths = hasOwn(result, 'tempFilePaths') && result.tempFilePaths;
      if (hasOwn(result, 'apFilePaths') && !hasTempFilePaths) {
        result.tempFilePaths = result.apFilePaths;
        delete result.apFilePaths;
      }
      if (!hasOwn(result, 'tempFiles') && hasTempFilePaths) {
        result.tempFiles = [];
        result.tempFilePaths.forEach(function (tempFilePath) {return result.tempFiles.push({ path: tempFilePath });});
      }
      return {};
    } },

  previewImage: {
    args: function args(fromArgs) {
      // ????????????????????? current ????????????????????????????????????
      var currentIndex = Number(fromArgs.current);
      if (isNaN(currentIndex)) {
        if (fromArgs.current && Array.isArray(fromArgs.urls)) {
          var index = fromArgs.urls.indexOf(fromArgs.current);
          fromArgs.current = ~index ? index : 0;
        }
      } else {
        fromArgs.current = currentIndex;
      }
      return {
        indicator: false,
        loop: false };

    } },

  saveFile: {
    args: {
      tempFilePath: 'apFilePath' },

    returnValue: {
      apFilePath: 'savedFilePath' } },


  getSavedFileInfo: {
    args: {
      filePath: 'apFilePath' } },


  getSavedFileList: {
    returnValue: function returnValue(result) {
      if (result.fileList && result.fileList.length) {
        result.fileList.forEach(function (file) {
          file.filePath = file.apFilePath;
          delete file.apFilePath;
        });
      }
      return {};
    } },

  removeSavedFile: {
    args: {
      filePath: 'apFilePath' } },


  getLocation: {
    args: {
      type: false,
      altitude: false } },


  openLocation: {
    args: {
      // TODO address ??????????????????????????????
    } },

  getNetworkType: {
    returnValue: _handleNetworkInfo },

  onNetworkStatusChange: {
    returnValue: _handleNetworkInfo },

  stopAccelerometer: {
    name: 'offAccelerometerChange' },

  stopCompass: {
    name: 'offCompassChange' },

  scanCode: {
    name: 'scan',
    args: function args(fromArgs) {
      if (fromArgs.scanType) {
        switch (fromArgs.scanType[0]) {
          case 'qrCode':
            fromArgs.type = 'qr';
            break;
          case 'barCode':
            fromArgs.type = 'bar';
            break;}

      }
      return {
        onlyFromCamera: 'hideAlbum' };

    },
    returnValue: {
      code: 'result' } },


  setClipboardData: {
    name: 'setClipboard',
    args: {
      data: 'text' } },


  getClipboardData: {
    name: 'getClipboard',
    returnValue: {
      text: 'data' } },


  login: {
    name: 'getAuthCode',
    returnValue: function returnValue(result) {
      result.code = result.authCode;
    } },

  getUserInfo: {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue: function returnValue(result) {
      if (my.canIUse('getOpenUserInfo')) {
        var response = {};
        try {
          response = JSON.parse(result.response).response;
        } catch (e) {}
        result.nickName = response.nickName;
        result.avatar = response.avatar;
      }
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar };

    } },

  getUserProfile: {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue: function returnValue(result) {
      if (my.canIUse('getOpenUserInfo')) {
        var response = {};
        try {
          response = JSON.parse(result.response).response;
        } catch (e) {}
        result.nickName = response.nickName;
        result.avatar = response.avatar;
      }
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar };

    } },

  requestPayment: {
    name: 'tradePay',
    args: {
      orderInfo: 'tradeNO' } },


  getBLEDeviceServices: {
    returnValue: function returnValue(result) {
      result.services.forEach(function (item) {
        item.uuid = item.serviceId;
      });
    } },

  createBLEConnection: {
    name: 'connectBLEDevice',
    args: {
      timeout: false } },


  closeBLEConnection: {
    name: 'disconnectBLEDevice' },

  onBLEConnectionStateChange: {
    name: 'onBLEConnectionStateChanged' },

  makePhoneCall: {
    args: {
      phoneNumber: 'number' } },


  stopGyroscope: {
    name: 'offGyroscopeChange' },

  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  // ???????????????????????????????????????
  canvasToTempFilePath: {
    returnValue: function returnValue(result) {
      // ???????????????????????? tempFilePath ???????????????????????????????????????
      result.tempFilePath = result.apFilePath;
    } },

  setScreenBrightness: {
    args: {
      value: 'brightness' } },


  getScreenBrightness: {
    returnValue: {
      brightness: 'value' } },


  showShareMenu: {
    name: 'showSharePanel' },

  hideHomeButton: {
    name: 'hideBackHome' },

  saveImageToPhotosAlbum: {
    name: 'saveImage',
    args: {
      filePath: 'url' } },


  saveVideoToPhotosAlbum: {
    args: {
      filePath: 'src' } },


  chooseAddress: {
    name: 'getAddress',
    returnValue: function returnValue(result) {
      var info = result.result || {};
      result.userName = info.fullname;
      result.provinceName = info.prov;
      result.cityName = info.city;
      result.countyName = info.area;
      result.detailInfo = info.address;
      result.telNumber = info.mobilePhone;
      result.errMsg = result.resultStatus;
    } } };



var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("The '".concat(methodName, "' method of platform '\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("Platform '\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = my[methodName].apply(my, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref3)


  {var fail = _ref3.fail,complete = _ref3.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['alipay'],
  share: ['alipay'],
  payment: ['alipay'],
  push: ['alipay'] };


function getProvider(_ref4)




{var service = _ref4.service,success = _ref4.success,fail = _ref4.fail,complete = _ref4.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


function createMediaQueryObserver() {
  var mediaQueryObserver = {};var _my$getSystemInfoSync2 =



  my.getSystemInfoSync(),windowWidth = _my$getSystemInfoSync2.windowWidth,windowHeight = _my$getSystemInfoSync2.windowHeight;

  var orientation = windowWidth < windowHeight ? 'portrait' : 'landscape';

  mediaQueryObserver.observe = function (options, callback) {
    var matches = true;
    for (var item in options) {
      var itemValue = item === 'orientation' ? options[item] : Number(options[item]);
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }

        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }

        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
      }
    }
    callback(matches);

    return matches;
  };

  mediaQueryObserver.disconnect = function () {
  };

  return mediaQueryObserver;
}

/**
   * ????????? try-catch
   */
/**
       * ????????? try-catch
       */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'receive',
        data: normalizePushMessage(args.message) });

    });
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientid(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  getPushCidCallbacks.push(function (cid, errMsg) {
    var res;
    if (cid) {
      res = {
        errMsg: 'getPushClientid:ok',
        cid: cid };

      hasSuccess && success(res);
    } else {
      res = {
        errMsg: 'getPushClientid:fail' + (errMsg ? ' ' + errMsg : '') };

      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  if (typeof cid !== 'undefined') {
    Promise.resolve().then(function () {return invokeGetPushCidCallbacks(cid, cidErrMsg);});
  }
}

var onPushMessageCallbacks = [];
// ????????? defineOnApi ?????????????????? defineOnApi ?????? UniServiceJSBridge ????????????????????????????????????????????????????????????
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

function startGyroscope(params) {
  if (hasOwn(params, 'interval')) {
    console.warn('?????????????????? startGyroscope????????????interval');
  }
  params.success && params.success({
    errMsg: 'startGyroscope:ok' });

  params.complete && params.complete({
    errMsg: 'startGyroscope:ok' });

}

function createExecCallback(execCallback) {
  return function wrapperExecCallback(res) {
    this.actions.forEach(function (action, index) {
      (action._$callbacks || []).forEach(function (callback) {
        callback(res[index]);
      });
    });
    if (isFn(execCallback)) {
      execCallback(res);
    }
  };
}

function addCallback(callback) {
  if (isFn(callback)) {
    var action = this.actions[this.actions.length - 1];
    if (action) {
      (action._$callbacks || (action._$callbacks = [])).push(callback);
    }
  }
}

function createSelectorQuery() {
  var query = my.createSelectorQuery();

  var oldExec = query.exec;
  var oldScrollOffset = query.scrollOffset;
  var oldBoundingClientRect = query.boundingClientRect;
  query.exec = function exec(callback) {
    return oldExec.call(this, createExecCallback(callback).bind(this));
  };
  query.scrollOffset = function scrollOffset(callback) {
    var ret = oldScrollOffset.call(this);
    addCallback.call(this, callback);
    return ret;
  };
  query.boundingClientRect = function boundingClientRect(callback) {
    var ret = oldBoundingClientRect.call(this);
    addCallback.call(this, callback);
    return ret;
  };

  if (!query.fields) {
    query.fields = function ()



    {var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},rect = _ref5.rect,size = _ref5.size,scrollOffset = _ref5.scrollOffset;var callback = arguments.length > 1 ? arguments[1] : undefined;
      if (rect || size) {
        this.boundingClientRect();
      }
      if (scrollOffset) {
        this.scrollOffset();
      }
      addCallback.call(this, callback);
      return this;
    };
  }

  if (!query.in) {
    query.in = function () {
      return this;
    };
  }
  return query;
}

function createIntersectionObserver(component, options) {
  if (options && options.observeAll) {
    options.selectAll = options.observeAll;
    delete options.observeAll;
  }
  return my.createIntersectionObserver(options);
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  startGyroscope: startGyroscope,
  createSelectorQuery: createSelectorQuery,
  createIntersectionObserver: createIntersectionObserver,
  createMediaQueryObserver: createMediaQueryObserver,
  setStorageSync: setStorageSync,
  getStorageSync: getStorageSync,
  removeStorageSync: removeStorageSync,
  getPushClientid: getPushClientid,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"VUE_APP_NAME":"ths_one","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "my".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  {// alipay ????????????props?????????,????????????????????????????????????????????????????????????????????????alipay?????????
    return;
  }
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this3 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this3.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this3.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this3.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // ??????????????????????????????????????????????????????????????????????????????
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel$1() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref6)


{var mocks = _ref6.mocks,initRefs = _ref6.initRefs;
  initEventChannel$1();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-alipay";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(my.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);

  return appOptions;
}

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function handleLink(event) {var _ref7 =



  event.detail || event.value,vuePid = _ref7.vuePid,vueOptions = _ref7.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

var isArray = Array.isArray;
var keyList = Object.keys;

function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    var arrA = isArray(a);
    var arrB = isArray(b);
    var i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }
      return true;
    }
    if (arrA !== arrB) return false;

    var dateA = a instanceof Date;
    var dateB = b instanceof Date;
    if (dateA !== dateB) return false;
    if (dateA && dateB) return a.getTime() === b.getTime();

    var regexpA = a instanceof RegExp;
    var regexpB = b instanceof RegExp;
    if (regexpA !== regexpB) return false;
    if (regexpA && regexpB) return a.toString() === b.toString();

    var keys = keyList(a);
    length = keys.length;
    if (length !== keyList(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!hasOwn.call(b, keys[i])) return false;
    }
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

var isComponent2 = my.canIUse('component2');

var mocks = ['$id'];

function initRefs() {

}

function initRelation(detail) {
  this.props.onVueInit(detail);
}

function initSpecialMethods(mpInstance) {
  if (!mpInstance.$vm) {
    return;
  }
  var path = mpInstance.is || mpInstance.route;
  if (!path) {
    return;
  }
  if (path.indexOf('/') === 0) {
    path = path.substr(1);
  }
  var specialMethods = my.specialMethods && my.specialMethods[path];
  if (specialMethods) {
    specialMethods.forEach(function (method) {
      if (isFn(mpInstance.$vm[method])) {
        mpInstance[method] = function (event) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {};
            event.detail.markerId = event.markerId;
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event);
        };
      }
    });
  }
}

function initChildVues(mpInstance) {
  // ????????????????????? mpInstance ???????????? $vm
  if (!mpInstance.$vm) {
    return;
  }
  mpInstance._$childVues && mpInstance._$childVues.forEach(function (_ref8)




  {var vuePid = _ref8.vuePid,vueOptions = _ref8.vueOptions,VueComponent = _ref8.VueComponent,childMPInstance = _ref8.mpInstance;
    // ????????????
    handleLink.call(mpInstance, {
      detail: {
        vuePid: vuePid,
        vueOptions: vueOptions } });



    childMPInstance.$vm = new VueComponent(vueOptions);

    initSpecialMethods(childMPInstance);

    handleRef.call(vueOptions.parent.$scope, childMPInstance);

    childMPInstance.$vm.$mount();

    initChildVues(childMPInstance);

    childMPInstance.$vm._isMounted = true;
    childMPInstance.$vm.__call_hook('mounted');
    childMPInstance.$vm.__call_hook('onReady');
  });

  delete mpInstance._$childVues;
}

function handleProps(ref) {
  var eventProps = {};
  var refProps = ref.props;
  var eventList = refProps['data-event-list'].split(',');
  // ???????????????????????????????????????
  Object.keys(refProps).forEach(function (key) {
    if (eventList.includes(key)) {
      var handler = refProps[key];
      var res = key.match(/^on([A-Z])(\S*)/);
      var event = res && res[1].toLowerCase() + res[2];
      refProps[key] = eventProps[key] = function () {
        var props = Object.assign({}, refProps);
        props[key] = handler;
        // ????????????????????????????????????????????????????????????????????????????????????
        delete props['data-com-type'];
        triggerEvent.bind({ props: props })(event, {
          __args__: Array.prototype.slice.call(arguments) });

      };
    }
  });
  // ?????? props ??????
  Object.defineProperty(ref, 'props', {
    get: function get() {
      return refProps;
    },
    set: function set(value) {
      refProps = Object.assign(value, eventProps);
    } });

}

function handleRef(ref) {
  if (!ref) {
    return;
  }
  if (ref.props['data-com-type'] === 'wx') {
    handleProps(ref);
  }
  var refName = ref.props['data-ref'];
  var refInForName = ref.props['data-ref-in-for'];
  if (refName) {
    this.$vm.$refs[refName] = ref.$vm || ref;
  } else if (refInForName) {
    (this.$vm.$refs[refInForName] || (this.$vm.$refs[refInForName] = [])).push(ref.$vm || ref);
  }
}

function triggerEvent(type, detail, options) {
  var handler = this.props && this.props[customize('on-' + type)];
  if (!handler) {
    return;
  }

  var eventOpts = this.props['data-event-opts'];
  var eventParams = this.props['data-event-params'];
  var comType = this.props['data-com-type'];

  var target = {
    dataset: {
      eventOpts: eventOpts,
      eventParams: eventParams,
      comType: comType } };



  handler({
    type: customize(type),
    target: target,
    currentTarget: target,
    detail: detail });

}

var IGNORES = ['$slots', '$scopedSlots'];

function createObserver$1(isDidUpdate) {
  return function observe(props) {var _this4 = this;
    var prevProps = isDidUpdate ? props : this.props;
    var nextProps = isDidUpdate ? this.props : props;
    if (equal(prevProps, nextProps)) {
      return;
    }
    Object.keys(prevProps).forEach(function (name) {
      if (IGNORES.indexOf(name) === -1) {
        var prevValue = prevProps[name];
        var nextValue = nextProps[name];
        if (!isFn(prevValue) && !isFn(nextValue) && !equal(prevValue, nextValue)) {
          _this4.$vm[name] = nextProps[name];
        }
      }
    });
  };
}

var handleLink$1 = function () {
  if (isComponent2) {
    return function handleLink$1(detail) {
      return handleLink.call(this, {
        detail: detail });

    };
  }
  return function handleLink$1(detail) {
    if (this.$vm && this.$vm._isMounted) {// ???????????????
      return handleLink.call(this, {
        detail: {
          vuePid: detail.vuePid,
          vueOptions: detail.vueOptions } });


    }
    // ??????????????? didMount ???????????????????????????????????? ready ????????????????????????
    (this._$childVues || (this._$childVues = [])).unshift(detail);
  };
}();

var handleWrap = function handleWrap(mp, destory) {var _this5 = this;
  var vueId = mp.props.vueId;
  var list = mp.props['data-event-list'].split(',');
  list.forEach(function (eventName) {
    var key = "".concat(eventName).concat(vueId);
    if (destory) {
      delete _this5[key];
    } else {
      _this5[key] = function () {
        mp.props[eventName].apply(this, arguments);
      };
    }
  });
  if (!destory) {
    handleProps(mp);
  }
};

function parseApp(vm) {
  Object.defineProperty(_vue.default.prototype, '$slots', {
    get: function get() {
      return this.$scope && this.$scope.props.$slots;
    },
    set: function set() {

    } });

  Object.defineProperty(_vue.default.prototype, '$scopedSlots', {
    get: function get() {
      return this.$scope && this.$scope.props.$scopedSlots;
    },
    set: function set() {

    } });


  _vue.default.prototype.$onAliGetAuthorize = function onAliGetAuthorize(method, $event) {var _this6 = this;
    my.getPhoneNumber({
      success: function success(res) {
        $event.type = 'getphonenumber';
        var response = JSON.parse(res.response);
        $event.detail.errMsg = 'getPhoneNumber:ok';
        $event.detail.encryptedData = response.response;
        $event.detail.sign = response.sign;
        _this6[method]($event);
      },
      fail: function fail(res) {
        $event.type = 'getphonenumber';
        $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + JSON.stringify(res);
        _this6[method]($event);
      } });

  };

  _vue.default.prototype.$onAliAuthError = function $onAliAuthError(method, $event) {
    $event.type = 'getphonenumber';
    $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + $event.detail.errorMessage;
    this[method]($event);
  };

  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

var hooks$1 = [
'onShow',
'onHide',
// mp-alipay ??????
'onTitleClick',
'onOptionMenuClick',
'onPopMenuClick',
'onPullIntercept'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parsePage(vuePageOptions) {var _initVueComponent =
  initVueComponent(_vue.default, vuePageOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var pageOptions = {
    mixins: initBehaviors(vueOptions),
    data: initData(vueOptions, _vue.default.prototype),
    onLoad: function onLoad(query) {
      var properties = this.props;

      var options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties };


      // ????????? vue ??????
      this.$vm = new VueComponent(options);

      initSpecialMethods(this);

      // ???????????? setData
      this.$vm.$mount();

      var copyQuery = Object.assign({}, query);
      delete copyQuery.__id__;

      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(copyQuery) };


      this.options = query;
      this.$vm.$mp.query = query; // ?????? mpvue
      this.$vm.__call_hook('onLoad', query);
    },
    onReady: function onReady() {
      initChildVues(this);
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    },
    onUnload: function onUnload() {
      this.$vm.__call_hook('onUnload');
      this.$vm.$destroy();
    },
    events: {
      // ????????????????????????????????????????????????events???
      onBack: function onBack() {
        this.$vm.__call_hook('onBackPress');
      } },

    __r: handleRef,
    __e: handleEvent,
    __l: handleLink$1,
    __w: handleWrap,
    triggerEvent: triggerEvent };


  initHooks(pageOptions, hooks$1, vuePageOptions);

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      pageOptions[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  return pageOptions;
}

function createPage(vuePageOptions) {
  {
    return Page(parsePage(vuePageOptions));
  }
}

function initVm(VueComponent) {
  if (this.$vm) {
    return;
  }
  var properties = this.props;

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: properties };


  initVueIds(properties.vueId, this);

  if (isComponent2) {
    // ??????????????????
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options });


    // ????????? vue ??????
    this.$vm = new VueComponent(options);

    // ???????????? setData
    this.$vm.$mount();
  } else {
    // ??????????????????
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options,
      VueComponent: VueComponent,
      mpInstance: this });


    if (options.parent) {// ???????????????????????????????????????????????????????????????????????? didMount ?????????
      // ????????? vue ??????
      this.$vm = new VueComponent(options);
      handleRef.call(options.parent.$scope, this);
      // ???????????? setData
      this.$vm.$mount();

      initChildVues(this);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    }
  }
}

function parseComponent(vueComponentOptions) {var _initVueComponent3 =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent4 = _slicedToArray(_initVueComponent3, 2),VueComponent = _initVueComponent4[0],vueOptions = _initVueComponent4[1];

  var properties = initProperties(vueOptions.props, false, vueOptions.__file);

  var props = {
    onVueInit: function onVueInit() {} };


  Object.keys(properties).forEach(function (key) {
    if (key !== 'vueSlots') {
      props[key] = properties[key].value;
    }
  });

  var componentOptions = {
    mixins: initBehaviors(vueOptions),
    data: initData(vueOptions, _vue.default.prototype),
    props: props,
    didMount: function didMount() {var _this7 = this;
      if (my.dd) {// ????????????????????????????????? bug,?????????????????????,??? didMount ????????????????????? props ????????????
        setTimeout(function () {
          initVm.call(_this7, VueComponent);
        }, 4);
      } else {
        initVm.call(this, VueComponent);
      }

      initSpecialMethods(this);

      if (isComponent2) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    },
    didUnmount: function didUnmount() {
      this.$vm && this.$vm.$destroy();
    },
    methods: {
      __r: handleRef,
      __e: handleEvent,
      __l: handleLink$1,
      __w: handleWrap,
      triggerEvent: triggerEvent } };



  if (isComponent2) {
    componentOptions.onInit = function onInit() {
      initVm.call(this, VueComponent);
    };
    componentOptions.deriveDataFromProps = createObserver$1();
  } else {
    componentOptions.didUpdate = createObserver$1(true);
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  return componentOptions;
}

function createComponent(vueOptions) {
  {
    return my.defineComponent(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && my.onAppShow) {
    my.onAppShow(function () {for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && my.onAppHide) {
    my.onAppHide(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = my.getLaunchOptionsSync && my.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && my.onAppShow) {
    my.onAppShow(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && my.onAppHide) {
    my.onAppHide(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = my.getLaunchOptionsSync && my.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!my.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-alipay" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(my, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, my[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(my).forEach(function (name) {
    if (hasOwn(my, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, my[name]));
    }
  });
}

my.createApp = createApp;
my.createPage = createPage;
my.createComponent = createComponent;
my.createSubpackageApp = createSubpackageApp;
my.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 103:
/*!********************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/iview/base/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function getCtx(selector) {
  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];
  var componentCtx = ctx.selectComponent(selector);

  if (!componentCtx) {
    console.error('????????????????????????????????????????????????????????????');
    return null;
  }

  return componentCtx;
}

function Toast(options) {var _options$selector =


  options.selector,selector = _options$selector === void 0 ? '#toast' : _options$selector;
  var ctx = getCtx(selector);
  ctx.handleShow(options);
}

Toast.hide = function () {var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#toast';
  var ctx = getCtx(selector);
  ctx.handleHide();
};

function Message(options) {var _options$selector2 =


  options.selector,selector = _options$selector2 === void 0 ? '#message' : _options$selector2;
  var ctx = getCtx(selector);
  ctx.handleShow(options);
}

module.exports = {
  $Toast: Toast,
  $Message: Message };

/***/ }),

/***/ 12:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 13:
/*!***************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/store/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 9));
var _index = _interopRequireDefault(__webpack_require__(/*! ../http/index.js */ 14));
var _api = _interopRequireDefault(__webpack_require__(/*! ../http/api.js */ 15));
var _stat = __webpack_require__(/*! ../utils/stat.js */ 16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_vuex.default);

var lock = false; //?????????

var store = new _vuex.default.Store({
  state: {
    showGuidance: false, //????????????????????????
    iPhoneX: false, //?????????iPhoneX??????
    sysInfo: {},
    loginInfo: {
      account: '',
      isNew: '',
      maidian: '',
      token: '',
      userid: '' },

    platform: '',
    headUrl: 'https://u.thsi.cn/avatar/default/12_108_108.png', //????????????
    verifyCodeTime: 60,
    timeStart: '',
    oldMarketMap: {
      "16": "hs",
      "17": "hs",
      "22": "hs",
      "32": "hs",
      "33": "hs",
      "176": "hk",
      "177": "hk",
      "178": "hk",
      "88": "usa",
      "169": "usa",
      "170": "usa",
      "185": "usa",
      "186": "usa",
      "129": "sb",
      "144": "sb",
      "145": "sb" },

    newMarketMap: {},
    scene: 0, // ?????????
    appFlag: false // ??????App???flag???
  },
  mutations: {
    setiPhoneX: function setiPhoneX(state, type) {
      state.iPhoneX = type;
    },
    setShowGuidance: function setShowGuidance(state, type) {
      state.showGuidance = type;
    },
    setSysInfo: function setSysInfo(state, obj) {
      state.sysInfo = obj;
    },
    setLoginInfo: function setLoginInfo(state, obj) {
      for (var item in obj) {
        state.loginInfo[item] = obj[item];
      }
    },
    setPlatform: function setPlatform(state, type) {
      state.platform = type;
    },
    setVerifyCodeTime: function setVerifyCodeTime(state, time) {
      state.verifyCodeTime = time;
    },
    setTimeStart: function setTimeStart(state, date) {
      state.timeStart = date;
    },
    setMarkMap: function setMarkMap(state, data) {
      state.newMarketMap = data;
    },
    setHeadUrl: function setHeadUrl(state, url) {
      //?????????????????????????????????????????????????????????????????????
      state.headUrl = url + '?ts=' + new Date().getTime();
    },
    setScene: function setScene(state, value) {
      state.scene = value;
    },
    setFlag: function setFlag(state, flag) {
      state.appFlag = flag;
    } },

  getters: {
    getLoginInfo: function getLoginInfo(state) {
      return state.loginInfo;
    } },

  actions: {
    getToken: function getToken(ctx, payload) {
      if (lock) {
        return;
      }
      lock = true;
      return new Promise(function (resolve, reject) {

        uni.login({
          success: function success(res) {
            uni.request({
              url: _api.default.getOpenidAndSessionKey,
              data: {
                code: res.code },

              method: 'POST',
              time: 3000,
              success: function success(res) {
                if (res.data.status_code == 0) {
                  //????????????,??????token???maidian ??????storage??????????????????????????????
                  var resData = {
                    token: res.data.result.token,
                    maidian: res.data.result.maidian };

                  if (res.data.result.account) {
                    resData.account = res.data.result.account;
                  }
                  if (res.data.result.userid) {
                    resData.userid = res.data.result.userid;
                  }
                  uni.setStorageSync('loginInfo', JSON.stringify(resData));
                  ctx.commit("setLoginInfo", resData);
                  resolve();
                } else {
                  if (payload.first) {
                    uni.showToast({
                      title: "??????????????????????????????????????????",
                      icon: 'none' });

                  }
                  reject();
                }
                lock = false;
              },
              fail: function fail(err) {
                lock = false;
                console.log(err);
                if (payload.first) {
                  uni.showToast({
                    title: "??????????????????????????????????????????",
                    icon: 'none' });

                }
                reject();
              } });

          },
          fail: function fail(err) {
            lock = false;
            console.log(err);
            uni.showToast({
              title: "??????????????????????????????????????????",
              icon: 'none' });

            reject();
          } });

      });
    },
    getMarketMap: function getMarketMap(ctx) {
      uni.request({
        url: _api.default.readPinYin,
        method: 'GET',
        time: 3000,
        success: function success(res) {
          if (res.data.length > 0) {
            ctx.commit('setMarkMap', Object.assign.apply(Object, [{}].concat(_toConsumableArray(res.data))));
          }
        } });

    },
    loginComplate: function loginComplate(ctx, payload) {
      if (lock) {
        return;
      }
      lock = true;
      uni.showLoading({
        title: '?????????...' });

      var that = this;
      uni.request({
        method: 'POST',
        url: _api.default.authorizeTel,
        time: 3000,
        data: {
          token: that.getters.getLoginInfo.token,
          iv: payload.data.iv,
          encryedData: payload.data.encryptedData },

        success: function success(res) {
          lock = false;
          uni.hideLoading();
          if (res.data.status_code == 0) {
            //????????????,??????account isNew
            var loginInfo = that.getters.getLoginInfo;
            loginInfo.account = res.data.result.account;
            loginInfo.isNew = res.data.result.isNew;
            if (res.data.result.userid) {
              loginInfo.userid = res.data.result.userid;
            }
            uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
            ctx.commit("setLoginInfo", loginInfo);
            (0, _stat.hxmClickStat)('yijianlogin', {
              is_new: res.data.result.isNew,
              user_id: res.data.result.userid });

            uni.showToast({
              title: '????????????',
              icon: 'success' });

          } else {
            uni.showToast({
              title: '??????????????????????????????',
              icon: 'none' });

          }
        },
        fail: function fail(err) {
          lock = false;
          console.log(err);
          uni.hideLoading();
          uni.showToast({
            title: '??????????????????????????????',
            icon: 'none' });

        } });

    },
    promiseLogin: function promiseLogin(ctx, payload) {
      var that = this;
      if (lock) {
        return;
      }
      lock = true;
      return new Promise(function (resolve, reject) {
        uni.showLoading({
          title: '?????????...' });

        uni.request({
          method: 'POST',
          url: _api.default.authorizeTel,
          time: 3000,
          data: {
            token: that.getters.getLoginInfo.token,
            iv: payload.data.iv,
            encryedData: payload.data.encryptedData },

          success: function success(res) {
            lock = false;
            uni.hideLoading();
            if (res.data.status_code == 0) {
              //????????????,??????account isNew
              var loginInfo = that.getters.getLoginInfo;
              loginInfo.account = res.data.result.account;
              loginInfo.isNew = res.data.result.isNew;
              if (res.data.result.userid) {
                loginInfo.userid = res.data.result.userid;
              }
              uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
              ctx.commit("setLoginInfo", loginInfo);
              uni.showToast({
                title: '????????????',
                icon: 'success' });

              resolve();
            } else {
              uni.showToast({
                title: '??????????????????????????????',
                icon: 'none' });

              reject();
            }
          },
          fail: function fail(err) {
            lock = false;
            console.log(err);
            uni.hideLoading();
            uni.showToast({
              title: '??????????????????????????????',
              icon: 'none' });

            reject();
          } });

      });
    },
    exitLogin: function exitLogin(ctx, payload) {
      if (lock) {
        return;
      }
      lock = true;
      uni.showLoading({
        title: '???????????????...' });

      var that = this;
      uni.request({
        method: 'POST',
        url: _api.default.loginOut,
        time: 3000,
        data: {
          token: that.getters.getLoginInfo.token },

        success: function success(res) {
          lock = false;
          uni.hideLoading();
          if (res.data.status_code == 0) {
            //????????????,??????account isNew
            var loginInfo = that.getters.getLoginInfo;
            loginInfo.account = '';
            loginInfo.isNew = '';
            uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
            ctx.commit("setLoginInfo", loginInfo);
            uni.showToast({
              title: '??????????????????',
              icon: 'success' });

          } else {
            uni.showToast({
              title: '????????????????????????????????????',
              icon: 'none' });

          }
        },
        fail: function fail(err) {
          lock = false;
          console.log(err);
          uni.hideLoading();
          uni.showToast({
            title: '????????????????????????????????????',
            icon: 'none' });

        } });

    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/http/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = 'https://eq.10jqka.com.cn';exports.default = _default;

/***/ }),

/***/ 15:
/*!************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/http/api.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var http = 'https://eq.10jqka.com.cn';
var khCSkvps = 'https://khtest.10jqka.com.cn';
var khKvps = 'https://kaihu.10jqka.com.cn';

var searchBlockInfoList = http + '/wechatApplication/search/searchBlockInfoList';
var smsSend = http + '/wechatApplication/alipay/login/smsSend';
var smsCheck = http + '/wechatApplication/alipay/login/smsCheck';
var searchBlockInfo = http + '/wechatApplication/search/searchBlockInfo';
var checkIsOptionalStock = http + '/wechatApplication/alipay/checkIsOptionalStock';
var deleteOptionalStock = http + '/wechatApplication/alipay/deleteOptionalStock';
var addOptionalStock = http + '/wechatApplication/alipay/addOptionalStock';
var searchIndex = http + '/wechatApplication/search/searchIndex';
var loginOut = http + '/wechatApplication/login/loginOut';
var searchOptionalStock = http + '/wechatApplication/alipay/searchOptionalStock';
var everyOneIsSearching = http + '/wechatApplication/alipay/everyOneIsSearching';
var intelligentSearch = http + '/wechatApplication/alipay/intelligentSearch';
var getOpenidAndSessionKey = http + '/wechatApplication/login/getOpenidAndSessionKey';
var readPinYin = http + '/wechatApplication/search/readPinYin';
var authorizeTel = http + '/wechatApplication/login/authorizeTel';

//?????????????????????????????????
var getIndexDialogIsShow = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexDialog_isShow';
var getIndexDialogImg = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexDialog_img';
var getIndexDialogGotoUrl = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexDialog_gotoUrl';
//?????????????????????????????????
var getIndexADIsShow = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexAD_isShow';
var getIndexADImg = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexAD_img';
var getIndexADGotoUrl = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexAD_gotoUrl';var _default =

{
  searchBlockInfoList: searchBlockInfoList,
  smsSend: smsSend,
  smsCheck: smsCheck,
  searchBlockInfo: searchBlockInfo,
  checkIsOptionalStock: checkIsOptionalStock,
  deleteOptionalStock: deleteOptionalStock,
  addOptionalStock: addOptionalStock,
  searchIndex: searchIndex,
  loginOut: loginOut,
  searchOptionalStock: searchOptionalStock,
  everyOneIsSearching: everyOneIsSearching,
  intelligentSearch: intelligentSearch,
  getOpenidAndSessionKey: getOpenidAndSessionKey,
  readPinYin: readPinYin,
  authorizeTel: authorizeTel,
  getIndexDialogIsShow: getIndexDialogIsShow,
  getIndexDialogImg: getIndexDialogImg,
  getIndexDialogGotoUrl: getIndexDialogGotoUrl,
  getIndexADIsShow: getIndexADIsShow,
  getIndexADImg: getIndexADImg,
  getIndexADGotoUrl: getIndexADGotoUrl };exports.default = _default;

/***/ }),

/***/ 16:
/*!**************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/utils/stat.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.hxmPageStat = hxmPageStat;exports.hxmClickStat = hxmClickStat;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var statPrefix = 'https://stat.10jqka.com.cn/q?';
var opentime = Math.floor(+new Date() / 1000);var

hxmStat = /*#__PURE__*/function () {
  function hxmStat(param, ext) {var _this = this;_classCallCheck(this, hxmStat);
    // ????????????????????????
    var statConf = {
      source_type: 'xiaochengxu',
      ld: 'mp',
      app_ver: '1.0.0',
      live_app: 'ali',
      opentime: opentime };

    uni.getSystemInfo({
      success: function success(res) {
        var platform = res.platform;
        var device = res.model;
        var operator = res.system;
        if (platform == 'ios') {
          statConf.platform = 'iphone';
        } else if (platform == 'android') {
          statConf.platform = 'gphone';
        } else {
          statConf.platform = 'pc';
        }
        statConf.device = device;
        statConf.operator = operator;
      } });


    var tmpObj = {};

    if (typeof param === 'undefined' || param === '') {
      return;
    } else if (['string', 'number'].includes(typeof param)) {
      tmpObj.id = param;
    } else if (typeof param === 'object') {
      if (!param.id) {
        return false;
      }
      tmpObj = _objectSpread({}, param);
    }

    setTimeout(function () {
      _this.statConf = typeof statConf === 'object' ? statConf : {};
      _this.ext = typeof ext === 'object' ? ext : {};

      var statInfoObj = _objectSpread(_objectSpread(_objectSpread({}, _this.statConf), tmpObj), _this.ext);
      _this.sendStat(statInfoObj);
    }, 200);
  }_createClass(hxmStat, [{ key: "sendStat", value: function sendStat(

    obj) {
      obj.ts = Math.floor(+new Date() / 1000);
      var statStr = _buildQuery(obj);
      statStr = statStr.replace(/%20/gi, '');
      uni.request({
        url: "".concat(statPrefix).concat(statStr),
        method: 'GET',
        time: 3000,
        success: function success(res) {} });

    } }]);return hxmStat;}();


//???????????????
function _buildQuery(obj, father) {
  var str = '';
  if (typeof obj === 'object') {
    var param = '';
    for (var i in obj) {
      if (father) {
        param = father + '[' + i + ']';
      } else {
        param = i;
      }
      str += _buildQuery(obj[i], param);
    }
    return father ? str : str.substr(0, str.length - 1);
  } else
  if (typeof obj === 'number' || typeof obj === 'string') {
    if (father) {
      return encodeURIComponent(father) + '=' + encodeURIComponent(obj) + '&';
    } else {
      return encodeURIComponent(obj);
    }
  } else {
    return '';
  }
}

/**
   * ?????????????????????
   * @param {String|Number|Object} param ??????id
   * @param {Object} ext ????????????
   */
//??????????????????
function hxmPageStat(param, ext) {
  new hxmStat(param, ext);
}

//??????????????????
function hxmClickStat(param, ext) {
  new hxmStat(param, ext);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!*****************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/filters/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var defaultValue = function defaultValue(v) {
  if (v === '' || v === undefined || v == '--' || v === null) {
    return '--';
  } else {
    return v ? v : '0.00';
  }
};

var price = function price(v) {
  if (v === '' || v === undefined || v == '--' || v === null) {
    return '--';
  } else {
    return Number(v).toFixed(2);
  }
};

var formatPrecent = function formatPrecent(v) {
  if (v === '' || v === undefined || v == '--' || v === null) {
    return '--';
  } else {
    if (v) {
      v = Number(v).toFixed(2);
      return v < 0 ? v + '%' : '+' + v + '%';
    } else {
      return '0.00%';
    }
  }
};

var formatNum = function formatNum(v) {
  if (v === '' || v === undefined || v == '--' || v === null) {
    return '--';
  } else {
    if (v) {
      v = Number(v).toFixed(2);
      return v < 0 ? v : '+' + v;
    } else {
      return '0.00';
    }
  }
};

var onlyPrecent = function onlyPrecent(v) {
  if (v === '' || v === undefined || v == '--' || v === null) {
    return '--';
  } else {
    v = Number(v).toFixed(2);
    return v ? v + '%' : '--';
  }
};var _default =

{
  defaultValue: defaultValue,
  formatPrecent: formatPrecent,
  formatNum: formatNum,
  onlyPrecent: onlyPrecent,
  price: price };exports.default = _default;

/***/ }),

/***/ 182:
/*!*******************************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/components/jyf-parser/libs/MpHtmlParser.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ??? html ??????????????????????????? rich-text ??? DOM ??????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                github?????????https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ???????????????https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                author???JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
var config = __webpack_require__(/*! ./config.js */ 183);
var blankChar = config.blankChar;
var CssHandler = __webpack_require__(/*! ./CssHandler.js */ 184);
var emoji; // emoji ????????? https://jin-yufeng.github.io/Parser/#/instructions?id=emoji
var MpHtmlParser = /*#__PURE__*/function () {"use strict";
  function MpHtmlParser(data) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};_classCallCheck(this, MpHtmlParser);
    this.CssHandler = new CssHandler(options.tagStyle);
    this.data = data;
    this.DOM = [];
    this._attrName = '';
    this._attrValue = '';
    this._attrs = {};
    this._domain = options.domain;
    this._protocol = this._domain && this._domain.includes("://") ? this._domain.split("://")[0] : "http";
    this._i = 0;
    this._start = 0;
    this._state = this.Text;
    this._STACK = [];
    this._tagName = '';
    this._audioNum = 0;
    this._imgNum = 0;
    this._videoNum = 0;
    this._useAnchor = options.useAnchor;
    this._pre = false;
  }_createClass(MpHtmlParser, [{ key: "parse", value: function parse()
    {
      if (emoji) this.data = emoji.parseEmoji(this.data);
      // ????????????
      if (config.highlight)
      this.data = this.data.replace(/<[pP][rR][eE]([\s\S]*?)>([\s\S]+?)<\/[pP][rR][eE][\s\S]*?>/g, function ($, $1, $2) {
        return "<pre" + $1 + '>' + config.highlight($2, $1) + "</pre>";
      });
      this.data = this.CssHandler.getStyle(this.data);
      for (var len = this.data.length; this._i < len; this._i++) {
        this._state(this.data[this._i]);}
      if (this._state == this.Text) this.setText();
      while (this._STACK.length) {this.popNode(this._STACK.pop());}



















      if (this.DOM.length) this.DOM[0].PoweredBy = "Parser";
      return this.DOM;
    } }, { key: "setAttr",
    // ????????????
    value: function setAttr() {
      if (config.trustAttrs[this._attrName]) {
        if (this._attrName == "src" && this._attrValue[0] == '/') {
          if (this._attrValue[1] == '/') this._attrValue = this._protocol + ':' + this._attrValue;else
          if (this._domain) this._attrValue = this._domain + this._attrValue;
        }
        this._attrs[this._attrName] = this._attrValue ? this._attrValue : this._attrName == "src" || this._attrName == "alt" ? '' : 'T';
      }
      this._attrValue = '';
      while (blankChar[this.data[this._i]]) {this._i++;}
      if (this.checkClose()) this.setNode();else
      this._state = this.AttrName;
    } }, { key: "setText",
    // ??????????????????
    value: function setText() {
      var text = this.getSelection();
      if (!text) return;
      if (!this._pre) {
        // ???????????????
        for (var tmp = [], i = text.length, has = false, c; c = text[--i];) {
          if (!blankChar[c] && (has = true) || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);}
        if (!has) return;
        text = tmp.join('');
      }
      // ????????????

      var entities = {
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'",
        nbsp: "\xA0",
        ensp: "\u2002",
        emsp: "\u2003",
        ndash: "???",
        mdash: "???",
        middot: "??",
        lsquo: "???",
        rsquo: "???",
        ldquo: "???",
        rdquo: "???",
        bull: "???",
        hellip: "???",
        permil: "???",
        copy: "??",
        reg: "??",
        trade: "???",
        times: "??",
        divide: "??",
        cent: "???",
        pound: "??",
        yen: "??",
        euro: "???",
        sect: "??" };


      var i = text.indexOf('&'),
      j,u,decode;
      while (i != -1) {
        j = text.indexOf(';', i + 2);
        if (j == -1) break;
        if (text[i + 1] == '#') {
          u = parseInt((text[i + 2] == 'x' ? '0' : '') + text.substring(i + 2, j));
          if (!isNaN(u)) text = text.substring(0, i) + String.fromCharCode(u) + text.substring(j + 1);
        } else {
          u = text.substring(i + 1, j);





          if (entities[u]) text = text.substring(0, i) + entities[u] + text.substring(j + 1);

        }
        i = text.indexOf('&', i + 1);
      }
      var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
      if (slibings.length && slibings[slibings.length - 1].type == "text") {
        slibings[slibings.length - 1].text += text;
        if (decode) slibings[slibings.length - 1].decode = true;
      } else
      slibings.push({
        type: "text",
        text: text,
        decode: decode });

    } }, { key: "setNode",
    // ??????????????????
    value: function setNode() {
      var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
      var node = {
        name: this._tagName.toLowerCase(),
        attrs: this._attrs };

      config.LabelHandler(node, this);
      this._attrs = {};
      if (this.data[this._i] == '>') {
        if (!config.selfClosingTags[this._tagName]) {
          if (config.ignoreTags[node.name]) {
            var j = this._i;
            // ???????????????????????????
            while (this._i < this.data.length) {
              (this._i = this.data.indexOf("</", this._i + 1)) == -1 ? this._i = this.data.length : null;
              this._i += 2;
              this._start = this._i;
              while (!blankChar[this.data[this._i]] && this.data[this._i] != '>' && this.data[this._i] != '/') {this._i++;}
              if (this.data.substring(this._start, this._i).toLowerCase() == node.name) {
                this._i = this.data.indexOf('>', this._i);
                if (this._i == -1) this._i = this.data.length;else
                this._start = this._i + 1;
                this._state = this.Text;
                // ?????? svg 
                if (node.name == "svg") {
                  var src = this.data.substring(j, this._i + 1);
                  if (!node.attrs.xmlns) src = " xmlns=\"http://www.w3.org/2000/svg\"" + src;
                  this._i = j;
                  while (this.data[j] != '<') {j--;}
                  src = this.data.substring(j, this._i) + src;
                  this._i = this._start - 1;
                  node.name = "img";
                  node.attrs = {
                    src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
                    ignore: 'T' };

                  slibings.push(node);
                }
                break;
              }
            }
            return;
          } else this._STACK.push(node);
          node.children = [];
        }
      } else this._i++;
      this._start = this._i + 1;
      this._state = this.Text;
      if (!config.ignoreTags[node.name]) {
        // ???????????????????????????
        if (node.name == "pre" || node.attrs.style && node.attrs.style.includes("white-space") && node.attrs.style.includes(
        "pre")) {
          this._pre = true;
          node.pre = true;
        }
        slibings.push(node);
      }
    } }, { key: "popNode",
    // ??????????????????
    value: function popNode(node) {
      // ?????????????????????
      if (config.blockTags[node.name]) node.name = 'div';else
      if (!config.trustTags[node.name]) node.name = 'span';
      // ???????????????
      if (node.pre) {
        this._pre = false;
        node.pre = undefined;
        for (var i = this._STACK.length; i--;) {
          if (this._STACK[i].pre)
          this._pre = true;}
      }
      // ????????????
      if (node.c) {
        if (node.name == "ul") {
          var floor = 1;
          for (var i = this._STACK.length; i--;) {
            if (this._STACK[i].name == "ul") floor++;}
          if (floor != 1)
          for (i = node.children.length; i--;) {
            node.children[i].floor = floor;}
        } else if (node.name == "ol") {var
          convert = function convert(num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', "II", "III", "IV", 'V', "VI", "VII", "VIII", "IX"],
              ten = ['X', "XX", "XXX", "XL", 'L', "LX", "LXX", "LXXX", "XC"],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          };
          for (var i = 0, num = 1, child; child = node.children[i++];) {
            if (child.name == "li") {
              child.type = "ol";
              child.num = convert(num++, node.attrs.type) + '.';
            }}
        }
      }
      // ?????????????????????
      if (node.name == "table") {var





        setBorder = function setBorder(elem) {
          if (elem.name == "th" || elem.name == "td") {
            if (node.attrs.border)
            elem.attrs.style = "border:" + node.attrs.border + "px solid gray;" + (elem.attrs.style || '');
            if (node.attrs.hasOwnProperty("cellpadding"))
            elem.attrs.style = "padding:" + node.attrs.cellpadding + "px;" + (elem.attrs.style || '');
            return;
          }
          if (elem.type == "text") return;
          for (var i = 0; i < (elem.children || []).length; i++) {
            setBorder(elem.children[i]);}
        };if (node.attrs.border) node.attrs.style = "border:" + node.attrs.border + "px solid gray;" + (node.attrs.style || '');if (node.attrs.hasOwnProperty("cellspacing")) node.attrs.style = "border-spacing:" + node.attrs.cellspacing + "px;" + (node.attrs.style || '');
        if (node.attrs.border || node.attrs.hasOwnProperty("cellpadding"))
        for (var i = 0; i < node.children.length; i++) {
          setBorder(node.children[i]);}
      }
      // ????????????????????????????????????????????????
      if (node.children.length == 1 && node.name == "div" && node.children[0].name == "div") {
        var child = node.children[0].attrs;
        node.attrs.style = node.attrs.style || '';
        child.style = child.style || '';
        if (!node.attrs.style.includes("padding") && (!node.attrs.style.includes("margin") || !child.style.includes(
        "margin")) && !node.attrs.style.includes("display") && !child.style.includes("display") && !node.attrs.id && !
        node.attrs.id && !node.attrs.class && !child.class) {
          if (child.style.includes("padding"))
          child.style = "box-sizing:border-box;" + child.style;
          node.attrs.style = node.attrs.style + ';' + child.style;
          node.attrs.id = (child.id || '') + (node.attrs.id || '');
          node.attrs.class = (child.class || '') + (node.attrs.class || '');
          node.children = node.children[0].children;
        } else {
          if (!node.attrs.style) node.attrs.style = undefined;
          if (!child.style) child.style = undefined;
        }
      }
      // ?????????????????????
      this.CssHandler.pop && this.CssHandler.pop(node);
    } }, { key: "checkClose",
    // ????????????
    value: function checkClose() {
      if (this.data[this._i] == '>' || this.data[this._i] == '/' && this.data[this._i + 1] == '>')
      return true;
      return false;
    } }, { key: "getSelection", value: function getSelection(
    trim) {
      var str = this._start == this._i ? '' : this.data.substring(this._start, this._i);
      while (trim && (blankChar[this.data[++this._i]] || (this._i--, false))) {;}
      this._start = this._i + 1;
      return str;
    } }, { key: "Text",
    // ?????????
    value: function Text(c) {
      if (c == '<') {
        var next = this.data[this._i + 1];
        if (next >= 'a' && next <= 'z' || next >= 'A' && next <= 'Z') {
          this.setText();
          this._state = this.TagName;
        } else if (next == '/') {
          this.setText();
          this._i++;
          next = this.data[this._i + 1];
          if (next >= 'a' && next <= 'z' || next >= 'A' && next <= 'Z') {
            this._start = this._i + 1;
            this._state = this.EndTag;
          } else
          this._state = this.Comment;
        } else if (next == '!') {
          this.setText();
          this._state = this.Comment;
        }
      }
    } }, { key: "Comment", value: function Comment()
    {
      if (this.data.substring(this._i + 1, this._i + 3) == "--" || this.data.substring(this._i + 1, this._i + 7) ==
      "[CDATA[") {
        this._i = this.data.indexOf("-->", this._i + 1);
        if (this._i == -1) return this._i = this.data.length;else
        this._i = this._i + 2;
      } else
      (this._i = this.data.indexOf('>', this._i + 1)) == -1 ? this._i = this.data.length : null;
      this._start = this._i + 1;
      this._state = this.Text;
    } }, { key: "TagName", value: function TagName(
    c) {
      if (blankChar[c]) {
        this._tagName = this.getSelection(true);
        if (this.checkClose()) this.setNode();else
        this._state = this.AttrName;
      } else if (this.checkClose()) {
        this._tagName = this.getSelection();
        this.setNode();
      }
    } }, { key: "AttrName", value: function AttrName(
    c) {
      if (blankChar[c]) {
        this._attrName = this.getSelection(true).toLowerCase();
        if (this.data[this._i] == '=') {
          while (blankChar[this.data[++this._i]]) {;}
          this._start = this._i--;
          this._state = this.AttrValue;
        } else this.setAttr();
      } else if (c == '=') {
        this._attrName = this.getSelection().toLowerCase();
        while (blankChar[this.data[++this._i]]) {;}
        this._start = this._i--;
        this._state = this.AttrValue;
      } else if (this.checkClose()) {
        this._attrName = this.getSelection().toLowerCase();
        this.setAttr();
      }
    } }, { key: "AttrValue", value: function AttrValue(
    c) {
      if (c == '"' || c == "'") {
        this._start++;
        if ((this._i = this.data.indexOf(c, this._i + 1)) == -1) return this._i = this.data.length;
      } else
      for (; !blankChar[this.data[this._i]] && this.data[this._i] != '>'; this._i++) {;}
      this._attrValue = this.getSelection();
      while (this._attrValue.includes("&quot;")) {this._attrValue = this._attrValue.replace("&quot;", '');}
      this.setAttr();
    } }, { key: "EndTag", value: function EndTag(
    c) {
      if (blankChar[c] || c == '>' || c == '/') {
        var name = this.getSelection().toLowerCase();
        var flag = false;
        for (var i = this._STACK.length; i--;) {
          if (this._STACK[i].name == name) {
            flag = true;
            break;
          }}
        if (flag) {
          var node;
          while (flag) {
            node = this._STACK.pop();
            if (node.name == name) flag = false;
            this.popNode(node);
          }
        } else if (name == 'p' || name == "br") {
          var slibings = this._STACK.length ? this._STACK[this._STACK.length - 1].children : this.DOM;
          slibings.push({
            name: name,
            attrs: {} });

        }
        this._i = this.data.indexOf('>', this._i);
        if (this._i == -1) this._i = this.data.length;else
        this._state = this.Text;
      }
    } }]);return MpHtmlParser;}();
;
module.exports = function (data, options) {return new MpHtmlParser(data, options).parse();};

/***/ }),

/***/ 183:
/*!*************************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/components/jyf-parser/libs/config.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/* ???????????? */
function makeMap(str) {var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var map = obj,
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}
// ???????????????????????????????????????????????????????????? 
var trustAttrs = makeMap(
"align,allowfullscreen,alt,app-id,appId,appid,apid,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,frameborder,height,href,id,ignore,loop,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,unitId,width,xmlns");

// ?????????????????????????????????????????? 
var trustTags = makeMap(
"a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,u,ul,video");




// ??????????????????????????? div
var blockTags = makeMap("address,article,aside,body,center,cite,footer,header,html,nav,pre,section");
// ??????????????????????????? svg ????????????????????????????????? 
var ignoreTags = makeMap(
"area,base,basefont,canvas,circle,command,ellipse,frame,head,input,isindex,keygen,line,link,map,meta,param,path,polygon,rect,script,source,svg,textarea,track,use,wbr" +

",embed,iframe");


// ????????? rich-text ?????????????????????????????????????????????????????????????????????????????? 
var richOnlyTags = makeMap("a,colgroup,fieldset,legend,sub,sup,table,tbody,td,tfoot,th,thead,tr");
// ???????????????
var selfClosingTags = makeMap(
"area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr");

// ????????????
var blankChar = makeMap(" ,\xA0,\t,\r,\n,\f");
// ?????????????????????
var userAgentStyles = {
  a: "color:#366092;word-break:break-all;padding:1.5px 0 1.5px 0",
  address: "font-style:italic",
  blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
  center: "text-align:center",
  cite: "font-style:italic",
  dd: "margin-left:40px",
  img: "max-width:100%",
  mark: "background-color:yellow",
  pre: "font-family:monospace;white-space:pre;overflow:scroll",
  s: "text-decoration:line-through",
  u: "text-decoration:underline" };

var screenWidth = uni.getSystemInfoSync().screenWidth;









{
  blockTags.caption = true;
  userAgentStyles.big = "display:inline;font-size:1.2em";
  userAgentStyles.small = "display:inline;font-size:0.8em";
}

function bubbling(Parser) {
  for (var i = Parser._STACK.length; i--;) {
    if (!richOnlyTags[Parser._STACK[i].name])
    Parser._STACK[i].c = 1;else
    return false;
  }
  return true;
}
module.exports = {
  // ??????????????????
  highlight: null,
  // ????????????????????????????????????????????????????????????????????????????????? bubbling(Parser)
  LabelHandler: function LabelHandler(node, Parser) {
    var attrs = node.attrs;
    attrs.style = Parser.CssHandler.match(node.name, attrs, node) + (attrs.style || '');
    switch (node.name) {
      case "div":
      case 'p':
        if (attrs.align) {
          attrs.style = "text-align:" + attrs.align + ';' + attrs.style;
          attrs.align = undefined;
        }
        break;
      case "img":
        if (attrs["data-src"]) {
          attrs.src = attrs.src || attrs["data-src"];
          attrs["data-src"] = undefined;
        }
        if (attrs.width && parseInt(attrs.width) > screenWidth)
        attrs.style += ";height:auto !important";
        if (attrs.src && !attrs.ignore) {
          if (bubbling(Parser)) attrs.i = (Parser._imgNum++).toString();else
          attrs.ignore = 'T';
        }
        break;
      case 'a':
      case "ad":




        bubbling(Parser);
        break;
      case "font":
        if (attrs.color) {
          attrs.style = "color:" + attrs.color + ';' + attrs.style;
          attrs.color = undefined;
        }
        if (attrs.face) {
          attrs.style = "font-family:" + attrs.face + ';' + attrs.style;
          attrs.face = undefined;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
          attrs.style = "font-size:" + map[size - 1] + ';' + attrs.style;
          attrs.size = undefined;
        }
        break;
      case "video":
      case "audio":
        if (attrs.id) Parser['_' + node.name + "Num"]++;else
        attrs.id = node.name + ++Parser['_' + node.name + "Num"];
        if (node.name == "video") {
          attrs.style = attrs.style || '';
          if (attrs.width) {
            attrs.style = "width:" + parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : "px") +
            ';' + attrs.style;
            attrs.width = undefined;
          }
          if (attrs.height) {
            attrs.style = "height:" + parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : "px") +
            ';' + attrs.style;
            attrs.height = undefined;
          }
          if (Parser._videoNum > 3) node.lazyLoad = true;
        }
        attrs.source = [];
        if (attrs.src) attrs.source.push(attrs.src);
        if (!attrs.controls && !attrs.autoplay)
        console.warn("???????????? controls ????????? " + node.name + " ?????????????????????????????????", node);
        bubbling(Parser);
        break;
      case "source":
        var parent = Parser._STACK[Parser._STACK.length - 1];
        if (parent && (parent.name == "video" || parent.name == "audio")) {
          parent.attrs.source.push(attrs.src);
          if (!parent.attrs.src) parent.attrs.src = attrs.src;
        }
        break;}

    // ?????? style
    var styles = attrs.style.toLowerCase().split(';'),
    compressed = {};
    attrs.style = "";
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length != 2) continue;
      var key = info[0].trim(),
      value = info[1].trim();
      // ????????????
      if (value.includes("url")) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          if (value[j] == '/') {
            if (value[j + 1] == '/') value = value.substring(0, j) + Parser._protocol + ':' + value.substring(j);else
            if (Parser._domain) value = value.substring(0, j) + Parser._domain + value.substring(j);
          }
        }
      }
      // ?????? rpx
      else if (value.includes("rpx"))
        value = value.replace(/[0-9.]*rpx/g, function ($) {
          return parseFloat($) * screenWidth / 750 + "px";
        });
      if (value.includes("-webkit") || value.includes("-moz") || value.includes("-ms") || value.includes("-o") || value.includes(
      "safe"))
      attrs.style += ';' + key + ':' + value;else
      if (!compressed[key] || value.includes("import") || !compressed[key].includes("import"))
      compressed[key] = value;
    }
    if (node.name == "img" && compressed.width && compressed.width.includes("%") && parseInt(compressed.width) >
    screenWidth)
    compressed.height = "auto !important";
    for (var key in compressed) {
      attrs.style += ';' + key + ':' + compressed[key];}
    attrs.style = attrs.style.substr(1);
    if (!attrs.style) attrs.style = undefined;
    if (Parser._useAnchor && attrs.id) bubbling(Parser);
  },
  trustAttrs: trustAttrs,
  trustTags: trustTags,
  blockTags: blockTags,
  ignoreTags: ignoreTags,
  selfClosingTags: selfClosingTags,
  blankChar: blankChar,
  userAgentStyles: userAgentStyles,
  screenWidth: screenWidth };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 184:
/*!*****************************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/components/jyf-parser/libs/CssHandler.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ??????????????? Css ????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                github?????????https://github.com/jin-yufeng/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ???????????????https://jin-yufeng.github.io/Parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                author???JinYufeng
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
var config = __webpack_require__(/*! ./config.js */ 183);var
CssHandler = /*#__PURE__*/function () {"use strict";
  function CssHandler() {var tagStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, CssHandler);
    this.styles = Object.assign({}, tagStyle);
  }_createClass(CssHandler, [{ key: "getStyle", value: function getStyle(
    data) {
      var style = '';
      data = data.replace(/<[sS][tT][yY][lL][eE][\s\S]*?>([\s\S]*?)<\/[sS][tT][yY][lL][eE][\s\S]*?>/g, function ($, $1) {
        style += $1;
        return '';
      });
      this.styles = new CssParser(style, this.styles).parse();
      return data;
    } }, { key: "match", value: function match(
    name, attrs) {
      var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
      if (attrs.class) {
        var classes = attrs.class.split(' ');
        for (var i = 0; i < classes.length; i++) {
          if (tmp = this.styles['.' + classes[i]])
          matched += tmp + ';';}
      }
      if (tmp = this.styles['#' + attrs.id])
      matched += tmp + ';';
      return matched;
    } }]);return CssHandler;}();

module.exports = CssHandler;var
CssParser = /*#__PURE__*/function () {"use strict";
  function CssParser(data, tagStyle) {_classCallCheck(this, CssParser);
    this.data = data;
    this.res = tagStyle;
    for (var item in config.userAgentStyles) {
      if (tagStyle[item]) tagStyle[item] = config.userAgentStyles[item] + ';' + tagStyle[item];else
      tagStyle[item] = config.userAgentStyles[item];
    }
    this._comma = false;
    this._floor = 0;
    this._i = 0;
    this._list = [];
    this._start = 0;
    this._state = this.Space;
  }_createClass(CssParser, [{ key: "parse", value: function parse()
    {
      for (; this._i < this.data.length; this._i++) {
        this._state(this.data[this._i]);}
      return this.res;
    } }, { key: "Space",
    // ?????????
    value: function Space(c) {
      if (c == '.' || c == '#' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
        this._start = this._i;
        this._state = this.StyleName;
      } else if (c == '/' && this.data[this._i + 1] == '*')
      this.Comment();else
      if (!config.blankChar[c] && c != ';')
      this._state = this.Ignore;
    } }, { key: "Comment", value: function Comment()
    {
      this._i = this.data.indexOf("*/", this._i) + 1;
      if (!this._i) this._i = this.data.length;
      this._state = this.Space;
    } }, { key: "Ignore", value: function Ignore(
    c) {
      if (c == '{') this._floor++;else
      if (c == '}' && ! --this._floor) {
        this._list = [];
        this._state = this.Space;
      }
    } }, { key: "StyleName", value: function StyleName(
    c) {
      if (config.blankChar[c]) {
        if (this._start != this._i)
        this._list.push(this.data.substring(this._start, this._i));
        this._state = this.NameSpace;
      } else if (c == '{') {
        this._list.push(this.data.substring(this._start, this._i));
        this._start = this._i + 1;
        this.Content();
      } else if (c == ',') {
        this._list.push(this.data.substring(this._start, this._i));
        this._start = this._i + 1;
        this._comma = true;
      } else if ((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9') && c != '.' && c != '#' && c != '-' &&
      c != '_')
      this._state = this.Ignore;
    } }, { key: "NameSpace", value: function NameSpace(
    c) {
      if (c == '{') {
        this._start = this._i + 1;
        this.Content();
      } else if (c == ',') {
        this._comma = true;
        this._start = this._i + 1;
        this._state = this.StyleName;
      } else if (!config.blankChar[c]) {
        if (this._comma) {
          this._state = this.StyleName;
          this._start = this._i--;
          this._comma = false;
        } else this._state = this.Ignore;
      }
    } }, { key: "Content", value: function Content()
    {
      this._i = this.data.indexOf('}', this._i);
      if (this._i == -1) this._i = this.data.length;
      var content = this.data.substring(this._start, this._i);
      for (var i = this._list.length; i--;) {
        this.res[this._list[i]] = (this.res[this._list[i]] || '') + content;}
      this._list = [];
      this._state = this.Space;
    } }]);return CssParser;}();

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 24:
/*!**************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/indexDialog.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var indexDialogConfig = {
  isShowIndexDialog: true, //????????????????????????
  isShowAdDialog: true //?????????????????????????????????
};var _default =


{
  indexDialogConfig: indexDialogConfig };exports.default = _default;

/***/ }),

/***/ 25:
/*!*******************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/tool.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var getTime = function getTime(time, type) {
  var date = time ? new Date(time * 1000) : new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var double_month = month < 10 ? '0' + month : month;
  var day = date.getDate();
  var double_day = day < 10 ? '0' + day : day;
  var hours = date.getHours();
  var double_hours = hours < 10 ? '0' + hours : hours;
  var minutes = date.getMinutes();
  var double_minutes = minutes < 10 ? '0' + minutes : minutes;
  var week = '';
  switch (date.getDay()) {
    case 1:
      week = '???';
      break;
    case 2:
      week = '???';
      break;
    case 3:
      week = '???';
      break;
    case 4:
      week = '???';
      break;
    case 5:
      week = '???';
      break;
    case 6:
      week = '???';
      break;
    case 0:
      week = '???';
      break;
    default:
      week = '';}

  if (type == 1) {
    return double_hours + ':' + double_minutes;
  } else {
    return year + '???' + month + '???' + day + '??? ??????' + week;
  }
};

var getMarkAndCode = function getMarkAndCode(id, code, map) {
  return map[id] + '_' + code + '_' + id;
};var _default =

{
  getTime: getTime,
  getMarkAndCode: getMarkAndCode };exports.default = _default;

/***/ }),

/***/ 26:
/*!*******************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/sort.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function swap(A, i, j) {
  var t = A[i];
  A[i] = A[j];
  A[j] = t;
}

/**
   *
   * @param {*} A  ??????
   * @param {*} p  ????????????
   * @param {*} r  ???????????? + 1
   * @param {*} key  ???????????????
   * @param {*} inverted  ????????????????????????????????????
   */
function divide(A, p, r, key, inverted) {
  var x = A[r - 1][key];
  var i = p - 1;

  for (var j = p; j < r - 1; j++) {
    if (inverted) {
      if (Number(A[j][key]) <= Number(x)) {
        i++;
        swap(A, i, j);
      }
    } else {
      if (Number(A[j][key]) >= Number(x)) {
        i++;
        swap(A, i, j);
      }
    }
  }

  swap(A, i + 1, r - 1);

  return i + 1;
}

/**
   * 
   * @param {*} A  ??????
   * @param {*} p  ????????????
   * @param {*} r  ???????????? + 1
   */
function qsort(A) {var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var r = arguments.length > 2 ? arguments[2] : undefined;var key = arguments.length > 3 ? arguments[3] : undefined;var inverted = arguments.length > 4 ? arguments[4] : undefined;
  r = r || A.length;

  if (p < r - 1) {
    var q = divide(A, p, r, key, inverted);
    qsort(A, p, q, key, inverted);
    qsort(A, q + 1, r, key, inverted);
  }
  return A;
}var _default =

qsort;exports.default = _default;

/***/ }),

/***/ 27:
/*!************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/quickSort.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var quickSort = function quickSort(arr, key, inverted) {

  if (arr.length <= 1) {return arr;}

  var pivotIndex = Math.floor(arr.length / 2);

  var pivot = arr.splice(pivotIndex, 1)[0];

  var privotValue = pivot[key];

  var left = [];

  var right = [];

  for (var i = 0; i < arr.length; i++) {

    if (arr[i][key] > privotValue && !inverted) {

      left.push(arr[i]);

    } else {

      right.push(arr[i]);

    }

  }

  return quickSort(left).concat([pivot], quickSort(right));

};var _default =

quickSort;exports.default = _default;

/***/ }),

/***/ 28:
/*!************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/checkData.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //??????????????????????????????

function checkData(dataArr, checkArr) {
  var result = {
    dataArr: [], //?????????????????????
    errArr: [] //?????????????????????
  };
  if (dataArr.length == 0 || checkArr.length == 0) {
    return result;
  }
  dataArr.forEach(function (items) {
    var num = 0; //???????????????????????????
    checkArr.forEach(function (item) {
      if (items[item] === undefined || items[item] === '--') {
        num += 1;
      }
    });
    num > 0 ? result.errArr.push(items) : result.dataArr.push(items);
  });
  return result;
}var _default =

checkData;exports.default = _default;

/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // ???????????????????????????
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // ???????????????????????????
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // ???????????? watch ??????????????????????????????
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // ??????????????????uni ??? uni-i18n ????????????????????????????????? uni????????? global ????????? getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // ?????????????????????
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // ????????????????????????uni-i18n ??? uni ????????????????????????????????? uni ????????? undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // ??????$vm????????????????????????????????????????????????????????????????????????props???default????????????t()????????????uni-goods-nav????????????app???????????????
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // ???????????????
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // ???????????????
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // ????????????????????????
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//??????????????????????????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"ths_one","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"ths_one","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"ths_one","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"ths_one","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // ????????????????????????
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // ????????????????????????
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 45:
/*!************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/wxapp_rsa.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var navigator2 = {
  appName: 'Netscape',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' };


var window2 = {
  ASN1: null,
  Base64: null,
  Hex: null,
  crypto: null,
  href: null };


var KJUR = null;

if (typeof YAHOO == "undefined" || !YAHOO) {
  var YAHOO = {};
}
YAHOO.namespace = function () {
  var b = arguments,
  g = null,
  e,c,f;
  for (e = 0; e < b.length; e = e + 1) {
    f = ("" + b[e]).split(".");
    g = YAHOO;
    for (c = f[0] == "YAHOO" ? 1 : 0; c < f.length; c = c + 1) {
      g[f[c]] = g[f[c]] || {};
      g = g[f[c]];
    }
  }
  return g;
};
YAHOO.log = function (d, a, c) {
  var b = YAHOO.widget.Logger;
  if (b && b.log) {
    return b.log(d, a, c);
  } else {
    return false;
  }
};
YAHOO.register = function (a, f, e) {
  var k = YAHOO.env.modules,
  c,j,h,g,d;
  if (!k[a]) {
    k[a] = {
      versions: [],
      builds: [] };

  }
  c = k[a];
  j = e.version;
  h = e.build;
  g = YAHOO.env.listeners;
  c.name = a;
  c.version = j;
  c.build = h;
  c.versions.push(j);
  c.builds.push(h);
  c.mainClass = f;
  for (d = 0; d < g.length; d = d + 1) {
    g[d](c);
  }
  if (f) {
    f.VERSION = j;
    f.BUILD = h;
  } else {
    YAHOO.log("mainClass is undefined for module " + a, "warn");
  }
};
YAHOO.env = YAHOO.env || {
  modules: [],
  listeners: [] };

YAHOO.env.getVersion = function (a) {
  return YAHOO.env.modules[a] || null;
};
YAHOO.env.parseUA = function (d) {
  var e = function e(i) {
    var j = 0;
    return parseFloat(i.replace(/\./g,
    function () {
      return j++ == 1 ? "" : ".";
    }));
  },
  h = navigator2,
  g = {
    ie: 0,
    opera: 0,
    gecko: 0,
    webkit: 0,
    chrome: 0,
    mobile: null,
    air: 0,
    ipad: 0,
    iphone: 0,
    ipod: 0,
    ios: null,
    android: 0,
    webos: 0,
    caja: h && h.cajaVersion,
    secure: false,
    os: null },

  c = d || navigator2 && navigator2.userAgent,
  f = window2 && window2.location,
  b = f && f.href,
  a;
  g.secure = b && b.toLowerCase().indexOf("https") === 0;
  if (c) {
    if (/windows|win32/i.test(c)) {
      g.os = "windows";
    } else {
      if (/macintosh/i.test(c)) {
        g.os = "macintosh";
      } else {
        if (/rhino/i.test(c)) {
          g.os = "rhino";
        }
      }
    }
    if (/KHTML/.test(c)) {
      g.webkit = 1;
    }
    a = c.match(/AppleWebKit\/([^\s]*)/);
    if (a && a[1]) {
      g.webkit = e(a[1]);
      if (/ Mobile\//.test(c)) {
        g.mobile = "Apple";
        a = c.match(/OS ([^\s]*)/);
        if (a && a[1]) {
          a = e(a[1].replace("_", "."));
        }
        g.ios = a;
        g.ipad = g.ipod = g.iphone = 0;
        a = c.match(/iPad|iPod|iPhone/);
        if (a && a[0]) {
          g[a[0].toLowerCase()] = g.ios;
        }
      } else {
        a = c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
        if (a) {
          g.mobile = a[0];
        }
        if (/webOS/.test(c)) {
          g.mobile = "WebOS";
          a = c.match(/webOS\/([^\s]*);/);
          if (a && a[1]) {
            g.webos = e(a[1]);
          }
        }
        if (/ Android/.test(c)) {
          g.mobile = "Android";
          a = c.match(/Android ([^\s]*);/);
          if (a && a[1]) {
            g.android = e(a[1]);
          }
        }
      }
      a = c.match(/Chrome\/([^\s]*)/);
      if (a && a[1]) {
        g.chrome = e(a[1]);
      } else {
        a = c.match(/AdobeAIR\/([^\s]*)/);
        if (a) {
          g.air = a[0];
        }
      }
    }
    if (!g.webkit) {
      a = c.match(/Opera[\s\/]([^\s]*)/);
      if (a && a[1]) {
        g.opera = e(a[1]);
        a = c.match(/Version\/([^\s]*)/);
        if (a && a[1]) {
          g.opera = e(a[1]);
        }
        a = c.match(/Opera Mini[^;]*/);
        if (a) {
          g.mobile = a[0];
        }
      } else {
        a = c.match(/MSIE\s([^;]*)/);
        if (a && a[1]) {
          g.ie = e(a[1]);
        } else {
          a = c.match(/Gecko\/([^\s]*)/);
          if (a) {
            g.gecko = 1;
            a = c.match(/rv:([^\s\)]*)/);
            if (a && a[1]) {
              g.gecko = e(a[1]);
            }
          }
        }
      }
    }
  }
  return g;
};
YAHOO.env.ua = YAHOO.env.parseUA();(function () {
  YAHOO.namespace("util", "widget", "example");
  if ("undefined" !== typeof YAHOO_config) {
    var b = YAHOO_config.listener,
    a = YAHOO.env.listeners,
    d = true,
    c;
    if (b) {
      for (c = 0; c < a.length; c++) {
        if (a[c] == b) {
          d = false;
          break;
        }
      }
      if (d) {
        a.push(b);
      }
    }
  }
})();
YAHOO.lang = YAHOO.lang || {};(function () {
  var f = YAHOO.lang,
  a = Object.prototype,
  c = "[object Array]",
  h = "[object Function]",
  i = "[object Object]",
  b = [],
  g = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;" },

  d = ["toString", "valueOf"],
  e = {
    isArray: function isArray(j) {
      return a.toString.apply(j) === c;
    },
    isBoolean: function isBoolean(j) {
      return typeof j === "boolean";
    },
    isFunction: function isFunction(j) {
      return typeof j === "function" || a.toString.apply(j) === h;
    },
    isNull: function isNull(j) {
      return j === null;
    },
    isNumber: function isNumber(j) {
      return typeof j === "number" && isFinite(j);
    },
    isObject: function isObject(j) {
      return j && (typeof j === "object" || f.isFunction(j)) || false;
    },
    isString: function isString(j) {
      return typeof j === "string";
    },
    isUndefined: function isUndefined(j) {
      return typeof j === "undefined";
    },
    _IEEnumFix: YAHOO.env.ua.ie ?
    function (l, k) {
      var j, n, m;
      for (j = 0; j < d.length; j = j + 1) {
        n = d[j];
        m = k[n];
        if (f.isFunction(m) && m != a[n]) {
          l[n] = m;
        }
      }
    } : function () {},
    escapeHTML: function escapeHTML(j) {
      return j.replace(/[&<>"'\/`]/g,
      function (k) {
        return g[k];
      });
    },
    extend: function extend(m, n, l) {
      if (!n || !m) {
        throw new Error("extend failed, please check that " + "all dependencies are included.");
      }
      var k = function k() {},
      j;
      k.prototype = n.prototype;
      m.prototype = new k();
      m.prototype.constructor = m;
      m.superclass = n.prototype;
      if (n.prototype.constructor == a.constructor) {
        n.prototype.constructor = n;
      }
      if (l) {
        for (j in l) {
          if (f.hasOwnProperty(l, j)) {
            m.prototype[j] = l[j];
          }
        }
        f._IEEnumFix(m.prototype, l);
      }
    },
    augmentObject: function augmentObject(n, m) {
      if (!m || !n) {
        throw new Error("Absorb failed, verify dependencies.");
      }
      var j = arguments,
      l,o,k = j[2];
      if (k && k !== true) {
        for (l = 2; l < j.length; l = l + 1) {
          n[j[l]] = m[j[l]];
        }
      } else {
        for (o in m) {
          if (k || !(o in n)) {
            n[o] = m[o];
          }
        }
        f._IEEnumFix(n, m);
      }
      return n;
    },
    augmentProto: function augmentProto(m, l) {
      if (!l || !m) {
        throw new Error("Augment failed, verify dependencies.");
      }
      var j = [m.prototype, l.prototype],
      k;
      for (k = 2; k < arguments.length; k = k + 1) {
        j.push(arguments[k]);
      }
      f.augmentObject.apply(this, j);
      return m;
    },
    dump: function dump(j, p) {
      var l,n,r = [],
      t = "{...}",
      k = "f(){...}",
      q = ", ",
      m = " => ";
      if (!f.isObject(j)) {
        return j + "";
      } else {
        if (j instanceof Date || "nodeType" in j && "tagName" in j) {
          return j;
        } else {
          if (f.isFunction(j)) {
            return k;
          }
        }
      }
      p = f.isNumber(p) ? p : 3;
      if (f.isArray(j)) {
        r.push("[");
        for (l = 0, n = j.length; l < n; l = l + 1) {
          if (f.isObject(j[l])) {
            r.push(p > 0 ? f.dump(j[l], p - 1) : t);
          } else {
            r.push(j[l]);
          }
          r.push(q);
        }
        if (r.length > 1) {
          r.pop();
        }
        r.push("]");
      } else {
        r.push("{");
        for (l in j) {
          if (f.hasOwnProperty(j, l)) {
            r.push(l + m);
            if (f.isObject(j[l])) {
              r.push(p > 0 ? f.dump(j[l], p - 1) : t);
            } else {
              r.push(j[l]);
            }
            r.push(q);
          }
        }
        if (r.length > 1) {
          r.pop();
        }
        r.push("}");
      }
      return r.join("");
    },
    substitute: function substitute(x, y, E, l) {
      var D,C,B,G,t,u,F = [],
      p,
      z = x.length,
      A = "dump",
      r = " ",
      q = "{",
      m = "}",
      n,
      w;
      for (;;) {
        D = x.lastIndexOf(q, z);
        if (D < 0) {
          break;
        }
        C = x.indexOf(m, D);
        if (D + 1 > C) {
          break;
        }
        p = x.substring(D + 1, C);
        G = p;
        u = null;
        B = G.indexOf(r);
        if (B > -1) {
          u = G.substring(B + 1);
          G = G.substring(0, B);
        }
        t = y[G];
        if (E) {
          t = E(G, t, u);
        }
        if (f.isObject(t)) {
          if (f.isArray(t)) {
            t = f.dump(t, parseInt(u, 10));
          } else {
            u = u || "";
            n = u.indexOf(A);
            if (n > -1) {
              u = u.substring(4);
            }
            w = t.toString();
            if (w === i || n > -1) {
              t = f.dump(t, parseInt(u, 10));
            } else {
              t = w;
            }
          }
        } else {
          if (!f.isString(t) && !f.isNumber(t)) {
            t = "~-" + F.length + "-~";
            F[F.length] = p;
          }
        }
        x = x.substring(0, D) + t + x.substring(C + 1);
        if (l === false) {
          z = D - 1;
        }
      }
      for (D = F.length - 1; D >= 0; D = D - 1) {
        x = x.replace(new RegExp("~-" + D + "-~"), "{" + F[D] + "}", "g");
      }
      return x;
    },
    trim: function trim(j) {
      try {
        return j.replace(/^\s+|\s+$/g, "");
      } catch (k) {
        return j;
      }
    },
    merge: function merge() {
      var n = {},
      k = arguments,
      j = k.length,
      m;
      for (m = 0; m < j; m = m + 1) {
        f.augmentObject(n, k[m], true);
      }
      return n;
    },
    later: function later(t, k, u, n, p) {
      t = t || 0;
      k = k || {};
      var l = u,
      s = n,
      q,j;
      if (f.isString(u)) {
        l = k[u];
      }
      if (!l) {
        throw new TypeError("method undefined");
      }
      if (!f.isUndefined(n) && !f.isArray(s)) {
        s = [n];
      }
      q = function q() {
        l.apply(k, s || b);
      };
      j = p ? setInterval(q, t) : setTimeout(q, t);
      return {
        interval: p,
        cancel: function cancel() {
          if (this.interval) {
            clearInterval(j);
          } else {
            clearTimeout(j);
          }
        } };

    },
    isValue: function isValue(j) {
      return f.isObject(j) || f.isString(j) || f.isNumber(j) || f.isBoolean(j);
    } };

  f.hasOwnProperty = a.hasOwnProperty ?
  function (j, k) {
    return j && j.hasOwnProperty && j.hasOwnProperty(k);
  } : function (j, k) {
    return !f.isUndefined(j[k]) && j.constructor.prototype[k] !== j[k];
  };
  e.augmentObject(f, e, true);
  YAHOO.util.Lang = f;
  f.augment = f.augmentProto;
  YAHOO.augment = f.augmentProto;
  YAHOO.extend = f.extend;
})();
YAHOO.register("yahoo", YAHOO, {
  version: "2.9.0",
  build: "2800" });


var CryptoJS = CryptoJS || function (e, g) {
  var a = {};
  var b = a.lib = {};
  var j = b.Base = function () {
    function n() {}
    return {
      extend: function extend(p) {
        n.prototype = this;
        var o = new n();
        if (p) {
          o.mixIn(p);
        }
        if (!o.hasOwnProperty("init")) {
          o.init = function () {
            o.$super.init.apply(this, arguments);
          };
        }
        o.init.prototype = o;
        o.$super = this;
        return o;
      },
      create: function create() {
        var o = this.extend();
        o.init.apply(o, arguments);
        return o;
      },
      init: function init() {},
      mixIn: function mixIn(p) {
        for (var o in p) {
          if (p.hasOwnProperty(o)) {
            this[o] = p[o];
          }
        }
        if (p.hasOwnProperty("toString")) {
          this.toString = p.toString;
        }
      },
      clone: function clone() {
        return this.init.prototype.extend(this);
      } };

  }();
  var l = b.WordArray = j.extend({
    init: function init(o, n) {
      o = this.words = o || [];
      if (n != g) {
        this.sigBytes = n;
      } else {
        this.sigBytes = o.length * 4;
      }
    },
    toString: function toString(n) {
      return (n || h).stringify(this);
    },
    concat: function concat(t) {
      var q = this.words;
      var p = t.words;
      var n = this.sigBytes;
      var s = t.sigBytes;
      this.clamp();
      if (n % 4) {
        for (var r = 0; r < s; r++) {
          var o = p[r >>> 2] >>> 24 - r % 4 * 8 & 255;
          q[n + r >>> 2] |= o << 24 - (n + r) % 4 * 8;
        }
      } else {
        for (var r = 0; r < s; r += 4) {
          q[n + r >>> 2] = p[r >>> 2];
        }
      }
      this.sigBytes += s;
      return this;
    },
    clamp: function clamp() {
      var o = this.words;
      var n = this.sigBytes;
      o[n >>> 2] &= 4294967295 << 32 - n % 4 * 8;
      o.length = e.ceil(n / 4);
    },
    clone: function clone() {
      var n = j.clone.call(this);
      n.words = this.words.slice(0);
      return n;
    },
    random: function random(p) {
      var o = [];
      for (var n = 0; n < p; n += 4) {
        o.push(e.random() * 4294967296 | 0);
      }
      return new l.init(o, p);
    } });

  var m = a.enc = {};
  var h = m.Hex = {
    stringify: function stringify(p) {
      var r = p.words;
      var o = p.sigBytes;
      var q = [];
      for (var n = 0; n < o; n++) {
        var s = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;
        q.push((s >>> 4).toString(16));
        q.push((s & 15).toString(16));
      }
      return q.join("");
    },
    parse: function parse(p) {
      var n = p.length;
      var q = [];
      for (var o = 0; o < n; o += 2) {
        q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << 24 - o % 8 * 4;
      }
      return new l.init(q, n / 2);
    } };

  var d = m.Latin1 = {
    stringify: function stringify(q) {
      var r = q.words;
      var p = q.sigBytes;
      var n = [];
      for (var o = 0; o < p; o++) {
        var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
        n.push(String.fromCharCode(s));
      }
      return n.join("");
    },
    parse: function parse(p) {
      var n = p.length;
      var q = [];
      for (var o = 0; o < n; o++) {
        q[o >>> 2] |= (p.charCodeAt(o) & 255) << 24 - o % 4 * 8;
      }
      return new l.init(q, n);
    } };

  var c = m.Utf8 = {
    stringify: function stringify(n) {
      try {
        return decodeURIComponent(escape(d.stringify(n)));
      } catch (o) {
        throw new Error("Malformed UTF-8 data");
      }
    },
    parse: function parse(n) {
      return d.parse(unescape(encodeURIComponent(n)));
    } };

  var i = b.BufferedBlockAlgorithm = j.extend({
    reset: function reset() {
      this._data = new l.init();
      this._nDataBytes = 0;
    },
    _append: function _append(n) {
      if (typeof n == "string") {
        n = c.parse(n);
      }
      this._data.concat(n);
      this._nDataBytes += n.sigBytes;
    },
    _process: function _process(w) {
      var q = this._data;
      var x = q.words;
      var n = q.sigBytes;
      var t = this.blockSize;
      var v = t * 4;
      var u = n / v;
      if (w) {
        u = e.ceil(u);
      } else {
        u = e.max((u | 0) - this._minBufferSize, 0);
      }
      var s = u * t;
      var r = e.min(s * 4, n);
      if (s) {
        for (var p = 0; p < s; p += t) {
          this._doProcessBlock(x, p);
        }
        var o = x.splice(0, s);
        q.sigBytes -= r;
      }
      return new l.init(o, r);
    },
    clone: function clone() {
      var n = j.clone.call(this);
      n._data = this._data.clone();
      return n;
    },
    _minBufferSize: 0 });

  var f = b.Hasher = i.extend({
    cfg: j.extend(),
    init: function init(n) {
      this.cfg = this.cfg.extend(n);
      this.reset();
    },
    reset: function reset() {
      i.reset.call(this);
      this._doReset();
    },
    update: function update(n) {
      this._append(n);
      this._process();
      return this;
    },
    finalize: function finalize(n) {
      if (n) {
        this._append(n);
      }
      var o = this._doFinalize();
      return o;
    },
    blockSize: 512 / 32,
    _createHelper: function _createHelper(n) {
      return function (p, o) {
        return new n.init(o).finalize(p);
      };
    },
    _createHmacHelper: function _createHmacHelper(n) {
      return function (p, o) {
        return new k.HMAC.init(n, o).finalize(p);
      };
    } });

  var k = a.algo = {};
  return a;
}(Math);

(function (g) {
  var a = CryptoJS,
  f = a.lib,
  e = f.Base,
  h = f.WordArray,
  a = a.x64 = {};
  a.Word = e.extend({
    init: function init(b, c) {
      this.high = b;
      this.low = c;
    } });

  a.WordArray = e.extend({
    init: function init(b, c) {
      b = this.words = b || [];
      this.sigBytes = c != g ? c : 8 * b.length;
    },
    toX32: function toX32() {
      for (var b = this.words,
      c = b.length,
      a = [], d = 0; d < c; d++) {
        var e = b[d];
        a.push(e.high);
        a.push(e.low);
      }
      return h.create(a, this.sigBytes);
    },
    clone: function clone() {
      for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++) {c[d] = c[d].clone();}
      return b;
    } });

})();

CryptoJS.lib.Cipher ||
function (u) {
  var g = CryptoJS,
  f = g.lib,
  k = f.Base,
  l = f.WordArray,
  q = f.BufferedBlockAlgorithm,
  r = g.enc.Base64,
  v = g.algo.EvpKDF,
  n = f.Cipher = q.extend({
    cfg: k.extend(),
    createEncryptor: function createEncryptor(a, b) {
      return this.create(this._ENC_XFORM_MODE, a, b);
    },
    createDecryptor: function createDecryptor(a, b) {
      return this.create(this._DEC_XFORM_MODE, a, b);
    },
    init: function init(a, b, c) {
      this.cfg = this.cfg.extend(c);
      this._xformMode = a;
      this._key = b;
      this.reset();
    },
    reset: function reset() {
      q.reset.call(this);
      this._doReset();
    },
    process: function process(a) {
      this._append(a);
      return this._process();
    },
    finalize: function finalize(a) {
      a && this._append(a);
      return this._doFinalize();
    },
    keySize: 4,
    ivSize: 4,
    _ENC_XFORM_MODE: 1,
    _DEC_XFORM_MODE: 2,
    _createHelper: function _createHelper(a) {
      return {
        encrypt: function encrypt(b, c, d) {
          return ("string" == typeof c ? s : j).encrypt(a, b, c, d);
        },
        decrypt: function decrypt(b, c, d) {
          return ("string" == typeof c ? s : j).decrypt(a, b, c, d);
        } };

    } });

  f.StreamCipher = n.extend({
    _doFinalize: function _doFinalize() {
      return this._process(!0);
    },
    blockSize: 1 });

  var m = g.mode = {},
  t = function t(a, b, c) {
    var d = this._iv;
    d ? this._iv = u : d = this._prevBlock;
    for (var e = 0; e < c; e++) {a[b + e] ^= d[e];}
  },
  h = (f.BlockCipherMode = k.extend({
    createEncryptor: function createEncryptor(a, b) {
      return this.Encryptor.create(a, b);
    },
    createDecryptor: function createDecryptor(a, b) {
      return this.Decryptor.create(a, b);
    },
    init: function init(a, b) {
      this._cipher = a;
      this._iv = b;
    } })).
  extend();
  h.Encryptor = h.extend({
    processBlock: function processBlock(a, b) {
      var c = this._cipher,
      d = c.blockSize;
      t.call(this, a, b, d);
      c.encryptBlock(a, b);
      this._prevBlock = a.slice(b, b + d);
    } });

  h.Decryptor = h.extend({
    processBlock: function processBlock(a, b) {
      var c = this._cipher,
      d = c.blockSize,
      e = a.slice(b, b + d);
      c.decryptBlock(a, b);
      t.call(this, a, b, d);
      this._prevBlock = e;
    } });

  m = m.CBC = h;
  h = (g.pad = {}).Pkcs7 = {
    pad: function pad(a, b) {
      for (var c = 4 * b,
      c = c - a.sigBytes % c,
      d = c << 24 | c << 16 | c << 8 | c,
      e = [], f = 0; f < c; f += 4) {e.push(d);}
      c = l.create(e, c);
      a.concat(c);
    },
    unpad: function unpad(a) {
      a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255;
    } };

  f.BlockCipher = n.extend({
    cfg: n.cfg.extend({
      mode: m,
      padding: h }),

    reset: function reset() {
      n.reset.call(this);
      var a = this.cfg,
      b = a.iv,
      a = a.mode;
      if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;else
      c = a.createDecryptor,
      this._minBufferSize = 1;
      this._mode = c.call(a, this, b && b.words);
    },
    _doProcessBlock: function _doProcessBlock(a, b) {
      this._mode.processBlock(a, b);
    },
    _doFinalize: function _doFinalize() {
      var a = this.cfg.padding;
      if (this._xformMode == this._ENC_XFORM_MODE) {
        a.pad(this._data, this.blockSize);
        var b = this._process(!0);
      } else b = this._process(!0),
      a.unpad(b);
      return b;
    },
    blockSize: 4 });

  var p = f.CipherParams = k.extend({
    init: function init(a) {
      this.mixIn(a);
    },
    toString: function toString(a) {
      return (a || this.formatter).stringify(this);
    } }),

  m = (g.format = {}).OpenSSL = {
    stringify: function stringify(a) {
      var b = a.ciphertext;
      a = a.salt;
      return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r);
    },
    parse: function parse(a) {
      a = r.parse(a);
      var b = a.words;
      if (1398893684 == b[0] && 1701076831 == b[1]) {
        var c = l.create(b.slice(2, 4));
        b.splice(0, 4);
        a.sigBytes -= 16;
      }
      return p.create({
        ciphertext: a,
        salt: c });

    } },

  j = f.SerializableCipher = k.extend({
    cfg: k.extend({
      format: m }),

    encrypt: function encrypt(a, b, c, d) {
      d = this.cfg.extend(d);
      var e = a.createEncryptor(c, d);
      b = e.finalize(b);
      e = e.cfg;
      return p.create({
        ciphertext: b,
        key: c,
        iv: e.iv,
        algorithm: a,
        mode: e.mode,
        padding: e.padding,
        blockSize: a.blockSize,
        formatter: d.format });

    },
    decrypt: function decrypt(a, b, c, d) {
      d = this.cfg.extend(d);
      b = this._parse(b, d.format);
      return a.createDecryptor(c, d).finalize(b.ciphertext);
    },
    _parse: function _parse(a, b) {
      return "string" == typeof a ? b.parse(a, this) : a;
    } }),

  g = (g.kdf = {}).OpenSSL = {
    execute: function execute(a, b, c, d) {
      d || (d = l.random(8));
      a = v.create({
        keySize: b + c }).
      compute(a, d);
      c = l.create(a.words.slice(b), 4 * c);
      a.sigBytes = 4 * b;
      return p.create({
        key: a,
        iv: c,
        salt: d });

    } },

  s = f.PasswordBasedCipher = j.extend({
    cfg: j.cfg.extend({
      kdf: g }),

    encrypt: function encrypt(a, b, c, d) {
      d = this.cfg.extend(d);
      c = d.kdf.execute(c, a.keySize, a.ivSize);
      d.iv = c.iv;
      a = j.encrypt.call(this, a, b, c.key, d);
      a.mixIn(c);
      return a;
    },
    decrypt: function decrypt(a, b, c, d) {
      d = this.cfg.extend(d);
      b = this._parse(b, d.format);
      c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
      d.iv = c.iv;
      return j.decrypt.call(this, a, b, c.key, d);
    } });

}();

(function () {
  for (var q = CryptoJS,
  x = q.lib.BlockCipher,
  r = q.algo,
  j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++) {g[k] = 128 > k ? k << 1 : k << 1 ^ 283;}
  for (var n = 0,
  l = 0,
  k = 0; 256 > k; k++) {
    var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4,
    f = f >>> 8 ^ f & 255 ^ 99;
    j[n] = f;
    y[f] = n;
    var t = g[n],
    D = g[t],
    E = g[D],
    b = 257 * g[f] ^ 16843008 * f;
    z[n] = b << 24 | b >>> 8;
    A[n] = b << 16 | b >>> 16;
    B[n] = b << 8 | b >>> 24;
    C[n] = b;
    b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;
    s[f] = b << 24 | b >>> 8;
    u[f] = b << 16 | b >>> 16;
    v[f] = b << 8 | b >>> 24;
    w[f] = b;
    n ? (n = t ^ g[g[g[E ^ t]]], l ^= g[g[l]]) : n = l = 1;
  }
  var F = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
  r = r.AES = x.extend({
    _doReset: function _doReset() {
      for (var c = this._key,
      e = c.words,
      a = c.sigBytes / 4,
      c = 4 * ((this._nRounds = a + 6) + 1), b = this._keySchedule = [], h = 0; h < c; h++) {if (h < a) b[h] = e[h];else
        {
          var d = b[h - 1];
          h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24, d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255], d ^= F[h / a | 0] << 24);
          b[h] = b[h - a] ^ d;
        }}
      e = this._invKeySchedule = [];
      for (a = 0; a < c; a++) {h = c - a,
        d = a % 4 ? b[h] : b[h - 4],
        e[a] = 4 > a || 4 >= h ? d : s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>> 8 & 255]] ^ w[j[d & 255]];}
    },
    encryptBlock: function encryptBlock(c, e) {
      this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j);
    },
    decryptBlock: function decryptBlock(c, e) {
      var a = c[e + 1];
      c[e + 1] = c[e + 3];
      c[e + 3] = a;
      this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);
      a = c[e + 1];
      c[e + 1] = c[e + 3];
      c[e + 3] = a;
    },
    _doCryptBlock: function _doCryptBlock(c, e, a, b, h, d, j, m) {
      for (var n = this._nRounds,
      f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++) {var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++],
        r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++],
        s = b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++],
        p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++],
        f = q,
        g = r,
        k = s;}
      q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];
      r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];
      s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];
      p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];
      c[e] = q;
      c[e + 1] = r;
      c[e + 2] = s;
      c[e + 3] = p;
    },
    keySize: 8 });

  q.AES = x._createHelper(r);
})();

(function () {
  function j(b, c) {
    var a = (this._lBlock >>> b ^ this._rBlock) & c;
    this._rBlock ^= a;
    this._lBlock ^= a << b;
  }
  function l(b, c) {
    var a = (this._rBlock >>> b ^ this._lBlock) & c;
    this._lBlock ^= a;
    this._rBlock ^= a << b;
  }
  var h = CryptoJS,
  e = h.lib,
  n = e.WordArray,
  e = e.BlockCipher,
  g = h.algo,
  q = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
  p = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
  r = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
  s = [{
    "0": 8421888,
    268435456: 32768,
    536870912: 8421378,
    805306368: 2,
    1073741824: 512,
    1342177280: 8421890,
    1610612736: 8389122,
    1879048192: 8388608,
    2147483648: 514,
    2415919104: 8389120,
    2684354560: 33280,
    2952790016: 8421376,
    3221225472: 32770,
    3489660928: 8388610,
    3758096384: 0,
    4026531840: 33282,
    134217728: 0,
    402653184: 8421890,
    671088640: 33282,
    939524096: 32768,
    1207959552: 8421888,
    1476395008: 512,
    1744830464: 8421378,
    2013265920: 2,
    2281701376: 8389120,
    2550136832: 33280,
    2818572288: 8421376,
    3087007744: 8389122,
    3355443200: 8388610,
    3623878656: 32770,
    3892314112: 514,
    4160749568: 8388608,
    1: 32768,
    268435457: 2,
    536870913: 8421888,
    805306369: 8388608,
    1073741825: 8421378,
    1342177281: 33280,
    1610612737: 512,
    1879048193: 8389122,
    2147483649: 8421890,
    2415919105: 8421376,
    2684354561: 8388610,
    2952790017: 33282,
    3221225473: 514,
    3489660929: 8389120,
    3758096385: 32770,
    4026531841: 0,
    134217729: 8421890,
    402653185: 8421376,
    671088641: 8388608,
    939524097: 512,
    1207959553: 32768,
    1476395009: 8388610,
    1744830465: 2,
    2013265921: 33282,
    2281701377: 32770,
    2550136833: 8389122,
    2818572289: 514,
    3087007745: 8421888,
    3355443201: 8389120,
    3623878657: 0,
    3892314113: 33280,
    4160749569: 8421378 },

  {
    "0": 1074282512,
    16777216: 16384,
    33554432: 524288,
    50331648: 1074266128,
    67108864: 1073741840,
    83886080: 1074282496,
    100663296: 1073758208,
    117440512: 16,
    134217728: 540672,
    150994944: 1073758224,
    167772160: 1073741824,
    184549376: 540688,
    201326592: 524304,
    218103808: 0,
    234881024: 16400,
    251658240: 1074266112,
    8388608: 1073758208,
    25165824: 540688,
    41943040: 16,
    58720256: 1073758224,
    75497472: 1074282512,
    92274688: 1073741824,
    109051904: 524288,
    125829120: 1074266128,
    142606336: 524304,
    159383552: 0,
    176160768: 16384,
    192937984: 1074266112,
    209715200: 1073741840,
    226492416: 540672,
    243269632: 1074282496,
    260046848: 16400,
    268435456: 0,
    285212672: 1074266128,
    301989888: 1073758224,
    318767104: 1074282496,
    335544320: 1074266112,
    352321536: 16,
    369098752: 540688,
    385875968: 16384,
    402653184: 16400,
    419430400: 524288,
    436207616: 524304,
    452984832: 1073741840,
    469762048: 540672,
    486539264: 1073758208,
    503316480: 1073741824,
    520093696: 1074282512,
    276824064: 540688,
    293601280: 524288,
    310378496: 1074266112,
    327155712: 16384,
    343932928: 1073758208,
    360710144: 1074282512,
    377487360: 16,
    394264576: 1073741824,
    411041792: 1074282496,
    427819008: 1073741840,
    444596224: 1073758224,
    461373440: 524304,
    478150656: 0,
    494927872: 16400,
    511705088: 1074266128,
    528482304: 540672 },

  {
    "0": 260,
    1048576: 0,
    2097152: 67109120,
    3145728: 65796,
    4194304: 65540,
    5242880: 67108868,
    6291456: 67174660,
    7340032: 67174400,
    8388608: 67108864,
    9437184: 67174656,
    10485760: 65792,
    11534336: 67174404,
    12582912: 67109124,
    13631488: 65536,
    14680064: 4,
    15728640: 256,
    524288: 67174656,
    1572864: 67174404,
    2621440: 0,
    3670016: 67109120,
    4718592: 67108868,
    5767168: 65536,
    6815744: 65540,
    7864320: 260,
    8912896: 4,
    9961472: 256,
    11010048: 67174400,
    12058624: 65796,
    13107200: 65792,
    14155776: 67109124,
    15204352: 67174660,
    16252928: 67108864,
    16777216: 67174656,
    17825792: 65540,
    18874368: 65536,
    19922944: 67109120,
    20971520: 256,
    22020096: 67174660,
    23068672: 67108868,
    24117248: 0,
    25165824: 67109124,
    26214400: 67108864,
    27262976: 4,
    28311552: 65792,
    29360128: 67174400,
    30408704: 260,
    31457280: 65796,
    32505856: 67174404,
    17301504: 67108864,
    18350080: 260,
    19398656: 67174656,
    20447232: 0,
    21495808: 65540,
    22544384: 67109120,
    23592960: 256,
    24641536: 67174404,
    25690112: 65536,
    26738688: 67174660,
    27787264: 65796,
    28835840: 67108868,
    29884416: 67109124,
    30932992: 67174400,
    31981568: 4,
    33030144: 65792 },

  {
    "0": 2151682048,
    65536: 2147487808,
    131072: 4198464,
    196608: 2151677952,
    262144: 0,
    327680: 4198400,
    393216: 2147483712,
    458752: 4194368,
    524288: 2147483648,
    589824: 4194304,
    655360: 64,
    720896: 2147487744,
    786432: 2151678016,
    851968: 4160,
    917504: 4096,
    983040: 2151682112,
    32768: 2147487808,
    98304: 64,
    163840: 2151678016,
    229376: 2147487744,
    294912: 4198400,
    360448: 2151682112,
    425984: 0,
    491520: 2151677952,
    557056: 4096,
    622592: 2151682048,
    688128: 4194304,
    753664: 4160,
    819200: 2147483648,
    884736: 4194368,
    950272: 4198464,
    1015808: 2147483712,
    1048576: 4194368,
    1114112: 4198400,
    1179648: 2147483712,
    1245184: 0,
    1310720: 4160,
    1376256: 2151678016,
    1441792: 2151682048,
    1507328: 2147487808,
    1572864: 2151682112,
    1638400: 2147483648,
    1703936: 2151677952,
    1769472: 4198464,
    1835008: 2147487744,
    1900544: 4194304,
    1966080: 64,
    2031616: 4096,
    1081344: 2151677952,
    1146880: 2151682112,
    1212416: 0,
    1277952: 4198400,
    1343488: 4194368,
    1409024: 2147483648,
    1474560: 2147487808,
    1540096: 64,
    1605632: 2147483712,
    1671168: 4096,
    1736704: 2147487744,
    1802240: 2151678016,
    1867776: 4160,
    1933312: 2151682048,
    1998848: 4194304,
    2064384: 4198464 },

  {
    "0": 128,
    4096: 17039360,
    8192: 262144,
    12288: 536870912,
    16384: 537133184,
    20480: 16777344,
    24576: 553648256,
    28672: 262272,
    32768: 16777216,
    36864: 537133056,
    40960: 536871040,
    45056: 553910400,
    49152: 553910272,
    53248: 0,
    57344: 17039488,
    61440: 553648128,
    2048: 17039488,
    6144: 553648256,
    10240: 128,
    14336: 17039360,
    18432: 262144,
    22528: 537133184,
    26624: 553910272,
    30720: 536870912,
    34816: 537133056,
    38912: 0,
    43008: 553910400,
    47104: 16777344,
    51200: 536871040,
    55296: 553648128,
    59392: 16777216,
    63488: 262272,
    65536: 262144,
    69632: 128,
    73728: 536870912,
    77824: 553648256,
    81920: 16777344,
    86016: 553910272,
    90112: 537133184,
    94208: 16777216,
    98304: 553910400,
    102400: 553648128,
    106496: 17039360,
    110592: 537133056,
    114688: 262272,
    118784: 536871040,
    122880: 0,
    126976: 17039488,
    67584: 553648256,
    71680: 16777216,
    75776: 17039360,
    79872: 537133184,
    83968: 536870912,
    88064: 17039488,
    92160: 128,
    96256: 553910272,
    100352: 262272,
    104448: 553910400,
    108544: 0,
    112640: 553648128,
    116736: 16777344,
    120832: 262144,
    124928: 537133056,
    129024: 536871040 },

  {
    "0": 268435464,
    256: 8192,
    512: 270532608,
    768: 270540808,
    1024: 268443648,
    1280: 2097152,
    1536: 2097160,
    1792: 268435456,
    2048: 0,
    2304: 268443656,
    2560: 2105344,
    2816: 8,
    3072: 270532616,
    3328: 2105352,
    3584: 8200,
    3840: 270540800,
    128: 270532608,
    384: 270540808,
    640: 8,
    896: 2097152,
    1152: 2105352,
    1408: 268435464,
    1664: 268443648,
    1920: 8200,
    2176: 2097160,
    2432: 8192,
    2688: 268443656,
    2944: 270532616,
    3200: 0,
    3456: 270540800,
    3712: 2105344,
    3968: 268435456,
    4096: 268443648,
    4352: 270532616,
    4608: 270540808,
    4864: 8200,
    5120: 2097152,
    5376: 268435456,
    5632: 268435464,
    5888: 2105344,
    6144: 2105352,
    6400: 0,
    6656: 8,
    6912: 270532608,
    7168: 8192,
    7424: 268443656,
    7680: 270540800,
    7936: 2097160,
    4224: 8,
    4480: 2105344,
    4736: 2097152,
    4992: 268435464,
    5248: 268443648,
    5504: 8200,
    5760: 270540808,
    6016: 270532608,
    6272: 270540800,
    6528: 270532616,
    6784: 8192,
    7040: 2105352,
    7296: 2097160,
    7552: 0,
    7808: 268435456,
    8064: 268443656 },

  {
    "0": 1048576,
    16: 33555457,
    32: 1024,
    48: 1049601,
    64: 34604033,
    80: 0,
    96: 1,
    112: 34603009,
    128: 33555456,
    144: 1048577,
    160: 33554433,
    176: 34604032,
    192: 34603008,
    208: 1025,
    224: 1049600,
    240: 33554432,
    8: 34603009,
    24: 0,
    40: 33555457,
    56: 34604032,
    72: 1048576,
    88: 33554433,
    104: 33554432,
    120: 1025,
    136: 1049601,
    152: 33555456,
    168: 34603008,
    184: 1048577,
    200: 1024,
    216: 34604033,
    232: 1,
    248: 1049600,
    256: 33554432,
    272: 1048576,
    288: 33555457,
    304: 34603009,
    320: 1048577,
    336: 33555456,
    352: 34604032,
    368: 1049601,
    384: 1025,
    400: 34604033,
    416: 1049600,
    432: 1,
    448: 0,
    464: 34603008,
    480: 33554433,
    496: 1024,
    264: 1049600,
    280: 33555457,
    296: 34603009,
    312: 1,
    328: 33554432,
    344: 1048576,
    360: 1025,
    376: 34604032,
    392: 33554433,
    408: 34603008,
    424: 0,
    440: 34604033,
    456: 1049601,
    472: 1024,
    488: 33555456,
    504: 1048577 },

  {
    "0": 134219808,
    1: 131072,
    2: 134217728,
    3: 32,
    4: 131104,
    5: 134350880,
    6: 134350848,
    7: 2048,
    8: 134348800,
    9: 134219776,
    10: 133120,
    11: 134348832,
    12: 2080,
    13: 0,
    14: 134217760,
    15: 133152,
    2147483648: 2048,
    2147483649: 134350880,
    2147483650: 134219808,
    2147483651: 134217728,
    2147483652: 134348800,
    2147483653: 133120,
    2147483654: 133152,
    2147483655: 32,
    2147483656: 134217760,
    2147483657: 2080,
    2147483658: 131104,
    2147483659: 134350848,
    2147483660: 0,
    2147483661: 134348832,
    2147483662: 134219776,
    2147483663: 131072,
    16: 133152,
    17: 134350848,
    18: 32,
    19: 2048,
    20: 134219776,
    21: 134217760,
    22: 134348832,
    23: 131072,
    24: 0,
    25: 131104,
    26: 134348800,
    27: 134219808,
    28: 134350880,
    29: 133120,
    30: 2080,
    31: 134217728,
    2147483664: 131072,
    2147483665: 2048,
    2147483666: 134348832,
    2147483667: 133152,
    2147483668: 32,
    2147483669: 134348800,
    2147483670: 134217728,
    2147483671: 134219808,
    2147483672: 134350880,
    2147483673: 134217760,
    2147483674: 134219776,
    2147483675: 0,
    2147483676: 133120,
    2147483677: 2080,
    2147483678: 131104,
    2147483679: 134350848 }],

  t = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
  m = g.DES = e.extend({
    _doReset: function _doReset() {
      for (var b = this._key.words,
      c = [], a = 0; 56 > a; a++) {
        var f = q[a] - 1;
        c[a] = b[f >>> 5] >>> 31 - f % 32 & 1;
      }
      b = this._subKeys = [];
      for (f = 0; 16 > f; f++) {
        for (var d = b[f] = [], e = r[f], a = 0; 24 > a; a++) {d[a / 6 | 0] |= c[(p[a] - 1 + e) % 28] << 31 - a % 6,
          d[4 + (a / 6 | 0)] |= c[28 + (p[a + 24] - 1 + e) % 28] << 31 - a % 6;}
        d[0] = d[0] << 1 | d[0] >>> 31;
        for (a = 1; 7 > a; a++) {d[a] >>>= 4 * (a - 1) + 3;}
        d[7] = d[7] << 5 | d[7] >>> 27;
      }
      c = this._invSubKeys = [];
      for (a = 0; 16 > a; a++) {c[a] = b[15 - a];}
    },
    encryptBlock: function encryptBlock(b, c) {
      this._doCryptBlock(b, c, this._subKeys);
    },
    decryptBlock: function decryptBlock(b, c) {
      this._doCryptBlock(b, c, this._invSubKeys);
    },
    _doCryptBlock: function _doCryptBlock(b, c, a) {
      this._lBlock = b[c];
      this._rBlock = b[c + 1];
      j.call(this, 4, 252645135);
      j.call(this, 16, 65535);
      l.call(this, 2, 858993459);
      l.call(this, 8, 16711935);
      j.call(this, 1, 1431655765);
      for (var f = 0; 16 > f; f++) {
        for (var d = a[f], e = this._lBlock, h = this._rBlock, g = 0, k = 0; 8 > k; k++) {g |= s[k][((h ^ d[k]) & t[k]) >>> 0];}
        this._lBlock = h;
        this._rBlock = e ^ g;
      }
      a = this._lBlock;
      this._lBlock = this._rBlock;
      this._rBlock = a;
      j.call(this, 1, 1431655765);
      l.call(this, 8, 16711935);
      l.call(this, 2, 858993459);
      j.call(this, 16, 65535);
      j.call(this, 4, 252645135);
      b[c] = this._lBlock;
      b[c + 1] = this._rBlock;
    },
    keySize: 2,
    ivSize: 2,
    blockSize: 2 });

  h.DES = e._createHelper(m);
  g = g.TripleDES = e.extend({
    _doReset: function _doReset() {
      var b = this._key.words;
      this._des1 = m.createEncryptor(n.create(b.slice(0, 2)));
      this._des2 = m.createEncryptor(n.create(b.slice(2, 4)));
      this._des3 = m.createEncryptor(n.create(b.slice(4, 6)));
    },
    encryptBlock: function encryptBlock(b, c) {
      this._des1.encryptBlock(b, c);
      this._des2.decryptBlock(b, c);
      this._des3.encryptBlock(b, c);
    },
    decryptBlock: function decryptBlock(b, c) {
      this._des3.decryptBlock(b, c);
      this._des2.encryptBlock(b, c);
      this._des1.decryptBlock(b, c);
    },
    keySize: 6,
    ivSize: 2,
    blockSize: 2 });

  h.TripleDES = e._createHelper(g);
})();

(function () {
  var h = CryptoJS,
  j = h.lib.WordArray;
  h.enc.Base64 = {
    stringify: function stringify(b) {
      var e = b.words,
      f = b.sigBytes,
      c = this._map;
      b.clamp();
      b = [];
      for (var a = 0; a < f; a += 3) {for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++) {b.push(c.charAt(d >>> 6 * (3 - g) & 63));}}
      if (e = c.charAt(64)) for (; b.length % 4;) {b.push(e);}
      return b.join("");
    },
    parse: function parse(b) {
      var e = b.length,
      f = this._map,
      c = f.charAt(64);
      c && (c = b.indexOf(c), -1 != c && (e = c));
      for (var c = [], a = 0, d = 0; d < e; d++) {if (d % 4) {
          var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),
          h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
          c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
          a++;
        }}
      return j.create(c, a);
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };

})();

(function (E) {
  function h(a, f, g, j, p, h, k) {
    a = a + (f & g | ~f & j) + p + k;
    return (a << h | a >>> 32 - h) + f;
  }
  function k(a, f, g, j, p, h, k) {
    a = a + (f & j | g & ~j) + p + k;
    return (a << h | a >>> 32 - h) + f;
  }
  function l(a, f, g, j, h, k, l) {
    a = a + (f ^ g ^ j) + h + l;
    return (a << k | a >>> 32 - k) + f;
  }
  function n(a, f, g, j, h, k, l) {
    a = a + (g ^ (f | ~j)) + h + l;
    return (a << k | a >>> 32 - k) + f;
  }
  for (var r = CryptoJS,
  q = r.lib,
  F = q.WordArray,
  s = q.Hasher,
  q = r.algo,
  a = [], t = 0; 64 > t; t++) {a[t] = 4294967296 * E.abs(E.sin(t + 1)) | 0;}
  q = q.MD5 = s.extend({
    _doReset: function _doReset() {
      this._hash = new F.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    _doProcessBlock: function _doProcessBlock(m, f) {
      for (var g = 0; 16 > g; g++) {
        var j = f + g,
        p = m[j];
        m[j] = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360;
      }
      var g = this._hash.words,
      j = m[f + 0],
      p = m[f + 1],
      q = m[f + 2],
      r = m[f + 3],
      s = m[f + 4],
      t = m[f + 5],
      u = m[f + 6],
      v = m[f + 7],
      w = m[f + 8],
      x = m[f + 9],
      y = m[f + 10],
      z = m[f + 11],
      A = m[f + 12],
      B = m[f + 13],
      C = m[f + 14],
      D = m[f + 15],
      b = g[0],
      c = g[1],
      d = g[2],
      e = g[3],
      b = h(b, c, d, e, j, 7, a[0]),
      e = h(e, b, c, d, p, 12, a[1]),
      d = h(d, e, b, c, q, 17, a[2]),
      c = h(c, d, e, b, r, 22, a[3]),
      b = h(b, c, d, e, s, 7, a[4]),
      e = h(e, b, c, d, t, 12, a[5]),
      d = h(d, e, b, c, u, 17, a[6]),
      c = h(c, d, e, b, v, 22, a[7]),
      b = h(b, c, d, e, w, 7, a[8]),
      e = h(e, b, c, d, x, 12, a[9]),
      d = h(d, e, b, c, y, 17, a[10]),
      c = h(c, d, e, b, z, 22, a[11]),
      b = h(b, c, d, e, A, 7, a[12]),
      e = h(e, b, c, d, B, 12, a[13]),
      d = h(d, e, b, c, C, 17, a[14]),
      c = h(c, d, e, b, D, 22, a[15]),
      b = k(b, c, d, e, p, 5, a[16]),
      e = k(e, b, c, d, u, 9, a[17]),
      d = k(d, e, b, c, z, 14, a[18]),
      c = k(c, d, e, b, j, 20, a[19]),
      b = k(b, c, d, e, t, 5, a[20]),
      e = k(e, b, c, d, y, 9, a[21]),
      d = k(d, e, b, c, D, 14, a[22]),
      c = k(c, d, e, b, s, 20, a[23]),
      b = k(b, c, d, e, x, 5, a[24]),
      e = k(e, b, c, d, C, 9, a[25]),
      d = k(d, e, b, c, r, 14, a[26]),
      c = k(c, d, e, b, w, 20, a[27]),
      b = k(b, c, d, e, B, 5, a[28]),
      e = k(e, b, c, d, q, 9, a[29]),
      d = k(d, e, b, c, v, 14, a[30]),
      c = k(c, d, e, b, A, 20, a[31]),
      b = l(b, c, d, e, t, 4, a[32]),
      e = l(e, b, c, d, w, 11, a[33]),
      d = l(d, e, b, c, z, 16, a[34]),
      c = l(c, d, e, b, C, 23, a[35]),
      b = l(b, c, d, e, p, 4, a[36]),
      e = l(e, b, c, d, s, 11, a[37]),
      d = l(d, e, b, c, v, 16, a[38]),
      c = l(c, d, e, b, y, 23, a[39]),
      b = l(b, c, d, e, B, 4, a[40]),
      e = l(e, b, c, d, j, 11, a[41]),
      d = l(d, e, b, c, r, 16, a[42]),
      c = l(c, d, e, b, u, 23, a[43]),
      b = l(b, c, d, e, x, 4, a[44]),
      e = l(e, b, c, d, A, 11, a[45]),
      d = l(d, e, b, c, D, 16, a[46]),
      c = l(c, d, e, b, q, 23, a[47]),
      b = n(b, c, d, e, j, 6, a[48]),
      e = n(e, b, c, d, v, 10, a[49]),
      d = n(d, e, b, c, C, 15, a[50]),
      c = n(c, d, e, b, t, 21, a[51]),
      b = n(b, c, d, e, A, 6, a[52]),
      e = n(e, b, c, d, r, 10, a[53]),
      d = n(d, e, b, c, y, 15, a[54]),
      c = n(c, d, e, b, p, 21, a[55]),
      b = n(b, c, d, e, w, 6, a[56]),
      e = n(e, b, c, d, D, 10, a[57]),
      d = n(d, e, b, c, u, 15, a[58]),
      c = n(c, d, e, b, B, 21, a[59]),
      b = n(b, c, d, e, s, 6, a[60]),
      e = n(e, b, c, d, z, 10, a[61]),
      d = n(d, e, b, c, q, 15, a[62]),
      c = n(c, d, e, b, x, 21, a[63]);
      g[0] = g[0] + b | 0;
      g[1] = g[1] + c | 0;
      g[2] = g[2] + d | 0;
      g[3] = g[3] + e | 0;
    },
    _doFinalize: function _doFinalize() {
      var a = this._data,
      f = a.words,
      g = 8 * this._nDataBytes,
      j = 8 * a.sigBytes;
      f[j >>> 5] |= 128 << 24 - j % 32;
      var h = E.floor(g / 4294967296);
      f[(j + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
      f[(j + 64 >>> 9 << 4) + 14] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
      a.sigBytes = 4 * (f.length + 1);
      this._process();
      a = this._hash;
      f = a.words;
      for (g = 0; 4 > g; g++) {j = f[g],
        f[g] = (j << 8 | j >>> 24) & 16711935 | (j << 24 | j >>> 8) & 4278255360;}
      return a;
    },
    clone: function clone() {
      var a = s.clone.call(this);
      a._hash = this._hash.clone();
      return a;
    } });

  r.MD5 = s._createHelper(q);
  r.HmacMD5 = s._createHmacHelper(q);
})(Math);

(function () {
  var k = CryptoJS,
  b = k.lib,
  m = b.WordArray,
  l = b.Hasher,
  d = [],
  b = k.algo.SHA1 = l.extend({
    _doReset: function _doReset() {
      this._hash = new m.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    },
    _doProcessBlock: function _doProcessBlock(n, p) {
      for (var a = this._hash.words,
      e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {
        if (16 > c) d[c] = n[p + c] | 0;else
        {
          var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16];
          d[c] = g << 1 | g >>> 31;
        }
        g = (e << 5 | e >>> 27) + b + d[c];
        g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^ j) - 899497514);
        b = j;
        j = h;
        h = f << 30 | f >>> 2;
        f = e;
        e = g;
      }
      a[0] = a[0] + e | 0;
      a[1] = a[1] + f | 0;
      a[2] = a[2] + h | 0;
      a[3] = a[3] + j | 0;
      a[4] = a[4] + b | 0;
    },
    _doFinalize: function _doFinalize() {
      var b = this._data,
      d = b.words,
      a = 8 * this._nDataBytes,
      e = 8 * b.sigBytes;
      d[e >>> 5] |= 128 << 24 - e % 32;
      d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296);
      d[(e + 64 >>> 9 << 4) + 15] = a;
      b.sigBytes = 4 * d.length;
      this._process();
      return this._hash;
    },
    clone: function clone() {
      var b = l.clone.call(this);
      b._hash = this._hash.clone();
      return b;
    } });

  k.SHA1 = l._createHelper(b);
  k.HmacSHA1 = l._createHmacHelper(b);
})();

(function (k) {
  for (var g = CryptoJS,
  h = g.lib,
  v = h.WordArray,
  j = h.Hasher,
  h = g.algo,
  s = [], t = [], u = function u(q) {
    return 4294967296 * (q - (q | 0)) | 0;
  },
  l = 2, b = 0; 64 > b;) {
    var d;
    a: {
      d = l;
      for (var w = k.sqrt(d), r = 2; r <= w; r++) {if (!(d % r)) {
          d = !1;
          break a;
        }}
      d = !0;
    }
    d && (8 > b && (s[b] = u(k.pow(l, 0.5))), t[b] = u(k.pow(l, 1 / 3)), b++);
    l++;
  }
  var n = [],
  h = h.SHA256 = j.extend({
    _doReset: function _doReset() {
      this._hash = new v.init(s.slice(0));
    },
    _doProcessBlock: function _doProcessBlock(q, h) {
      for (var a = this._hash.words,
      c = a[0], d = a[1], b = a[2], k = a[3], f = a[4], g = a[5], j = a[6], l = a[7], e = 0; 64 > e; e++) {
        if (16 > e) n[e] = q[h + e] | 0;else
        {
          var m = n[e - 15],
          p = n[e - 2];
          n[e] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + n[e - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[e - 16];
        }
        m = l + ((f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)) + (f & g ^ ~f & j) + t[e] + n[e];
        p = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & d ^ c & b ^ d & b);
        l = j;
        j = g;
        g = f;
        f = k + m | 0;
        k = b;
        b = d;
        d = c;
        c = m + p | 0;
      }
      a[0] = a[0] + c | 0;
      a[1] = a[1] + d | 0;
      a[2] = a[2] + b | 0;
      a[3] = a[3] + k | 0;
      a[4] = a[4] + f | 0;
      a[5] = a[5] + g | 0;
      a[6] = a[6] + j | 0;
      a[7] = a[7] + l | 0;
    },
    _doFinalize: function _doFinalize() {
      var d = this._data,
      b = d.words,
      a = 8 * this._nDataBytes,
      c = 8 * d.sigBytes;
      b[c >>> 5] |= 128 << 24 - c % 32;
      b[(c + 64 >>> 9 << 4) + 14] = k.floor(a / 4294967296);
      b[(c + 64 >>> 9 << 4) + 15] = a;
      d.sigBytes = 4 * b.length;
      this._process();
      return this._hash;
    },
    clone: function clone() {
      var b = j.clone.call(this);
      b._hash = this._hash.clone();
      return b;
    } });

  g.SHA256 = j._createHelper(h);
  g.HmacSHA256 = j._createHmacHelper(h);
})(Math);

(function () {
  var b = CryptoJS,
  d = b.lib.WordArray,
  a = b.algo,
  c = a.SHA256,
  a = a.SHA224 = c.extend({
    _doReset: function _doReset() {
      this._hash = new d.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
    },
    _doFinalize: function _doFinalize() {
      var a = c._doFinalize.call(this);
      a.sigBytes -= 4;
      return a;
    } });

  b.SHA224 = c._createHelper(a);
  b.HmacSHA224 = c._createHmacHelper(a);
})();

(function () {
  function a() {
    return d.create.apply(d, arguments);
  }
  for (var n = CryptoJS,
  r = n.lib.Hasher,
  e = n.x64,
  d = e.Word,
  T = e.WordArray,
  e = n.algo,
  ea = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)], v = [], w = 0; 80 > w; w++) {v[w] = a();}
  e = e.SHA512 = r.extend({
    _doReset: function _doReset() {
      this._hash = new T.init([new d.init(1779033703, 4089235720), new d.init(3144134277, 2227873595), new d.init(1013904242, 4271175723), new d.init(2773480762, 1595750129), new d.init(1359893119, 2917565137), new d.init(2600822924, 725511199), new d.init(528734635, 4215389547), new d.init(1541459225, 327033209)]);
    },
    _doProcessBlock: function _doProcessBlock(a, d) {
      for (var f = this._hash.words,
      F = f[0], e = f[1], n = f[2], r = f[3], G = f[4], H = f[5], I = f[6], f = f[7], w = F.high, J = F.low, X = e.high, K = e.low, Y = n.high, L = n.low, Z = r.high, M = r.low, $ = G.high, N = G.low, aa = H.high, O = H.low, ba = I.high, P = I.low, ca = f.high, Q = f.low, k = w, g = J, z = X, x = K, A = Y, y = L, U = Z, B = M, l = $, h = N, R = aa, C = O, S = ba, D = P, V = ca, E = Q, m = 0; 80 > m; m++) {
        var s = v[m];
        if (16 > m) var j = s.high = a[d + 2 * m] | 0,
        b = s.low = a[d + 2 * m + 1] | 0;else
        {
          var j = v[m - 15],
          b = j.high,
          p = j.low,
          j = (b >>> 1 | p << 31) ^ (b >>> 8 | p << 24) ^ b >>> 7,
          p = (p >>> 1 | b << 31) ^ (p >>> 8 | b << 24) ^ (p >>> 7 | b << 25),
          u = v[m - 2],
          b = u.high,
          c = u.low,
          u = (b >>> 19 | c << 13) ^ (b << 3 | c >>> 29) ^ b >>> 6,
          c = (c >>> 19 | b << 13) ^ (c << 3 | b >>> 29) ^ (c >>> 6 | b << 26),
          b = v[m - 7],
          W = b.high,
          t = v[m - 16],
          q = t.high,
          t = t.low,
          b = p + b.low,
          j = j + W + (b >>> 0 < p >>> 0 ? 1 : 0),
          b = b + c,
          j = j + u + (b >>> 0 < c >>> 0 ? 1 : 0),
          b = b + t,
          j = j + q + (b >>> 0 < t >>> 0 ? 1 : 0);
          s.high = j;
          s.low = b;
        }
        var W = l & R ^ ~l & S,
        t = h & C ^ ~h & D,
        s = k & z ^ k & A ^ z & A,
        T = g & x ^ g & y ^ x & y,
        p = (k >>> 28 | g << 4) ^ (k << 30 | g >>> 2) ^ (k << 25 | g >>> 7),
        u = (g >>> 28 | k << 4) ^ (g << 30 | k >>> 2) ^ (g << 25 | k >>> 7),
        c = ea[m],
        fa = c.high,
        da = c.low,
        c = E + ((h >>> 14 | l << 18) ^ (h >>> 18 | l << 14) ^ (h << 23 | l >>> 9)),
        q = V + ((l >>> 14 | h << 18) ^ (l >>> 18 | h << 14) ^ (l << 23 | h >>> 9)) + (c >>> 0 < E >>> 0 ? 1 : 0),
        c = c + t,
        q = q + W + (c >>> 0 < t >>> 0 ? 1 : 0),
        c = c + da,
        q = q + fa + (c >>> 0 < da >>> 0 ? 1 : 0),
        c = c + b,
        q = q + j + (c >>> 0 < b >>> 0 ? 1 : 0),
        b = u + T,
        s = p + s + (b >>> 0 < u >>> 0 ? 1 : 0),
        V = S,
        E = D,
        S = R,
        D = C,
        R = l,
        C = h,
        h = B + c | 0,
        l = U + q + (h >>> 0 < B >>> 0 ? 1 : 0) | 0,
        U = A,
        B = y,
        A = z,
        y = x,
        z = k,
        x = g,
        g = c + b | 0,
        k = q + s + (g >>> 0 < c >>> 0 ? 1 : 0) | 0;
      }
      J = F.low = J + g;
      F.high = w + k + (J >>> 0 < g >>> 0 ? 1 : 0);
      K = e.low = K + x;
      e.high = X + z + (K >>> 0 < x >>> 0 ? 1 : 0);
      L = n.low = L + y;
      n.high = Y + A + (L >>> 0 < y >>> 0 ? 1 : 0);
      M = r.low = M + B;
      r.high = Z + U + (M >>> 0 < B >>> 0 ? 1 : 0);
      N = G.low = N + h;
      G.high = $ + l + (N >>> 0 < h >>> 0 ? 1 : 0);
      O = H.low = O + C;
      H.high = aa + R + (O >>> 0 < C >>> 0 ? 1 : 0);
      P = I.low = P + D;
      I.high = ba + S + (P >>> 0 < D >>> 0 ? 1 : 0);
      Q = f.low = Q + E;
      f.high = ca + V + (Q >>> 0 < E >>> 0 ? 1 : 0);
    },
    _doFinalize: function _doFinalize() {
      var a = this._data,
      d = a.words,
      f = 8 * this._nDataBytes,
      e = 8 * a.sigBytes;
      d[e >>> 5] |= 128 << 24 - e % 32;
      d[(e + 128 >>> 10 << 5) + 30] = Math.floor(f / 4294967296);
      d[(e + 128 >>> 10 << 5) + 31] = f;
      a.sigBytes = 4 * d.length;
      this._process();
      return this._hash.toX32();
    },
    clone: function clone() {
      var a = r.clone.call(this);
      a._hash = this._hash.clone();
      return a;
    },
    blockSize: 32 });

  n.SHA512 = r._createHelper(e);
  n.HmacSHA512 = r._createHmacHelper(e);
})();

(function () {
  var c = CryptoJS,
  a = c.x64,
  b = a.Word,
  e = a.WordArray,
  a = c.algo,
  d = a.SHA512,
  a = a.SHA384 = d.extend({
    _doReset: function _doReset() {
      this._hash = new e.init([new b.init(3418070365, 3238371032), new b.init(1654270250, 914150663), new b.init(2438529370, 812702999), new b.init(355462360, 4144912697), new b.init(1731405415, 4290775857), new b.init(2394180231, 1750603025), new b.init(3675008525, 1694076839), new b.init(1203062813, 3204075428)]);
    },
    _doFinalize: function _doFinalize() {
      var a = d._doFinalize.call(this);
      a.sigBytes -= 16;
      return a;
    } });

  c.SHA384 = d._createHelper(a);
  c.HmacSHA384 = d._createHmacHelper(a);
})();

(function () {
  var q = CryptoJS,
  d = q.lib,
  n = d.WordArray,
  p = d.Hasher,
  d = q.algo,
  x = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
  y = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
  z = n.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
  A = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
  B = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
  C = n.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
  d = d.RIPEMD160 = p.extend({
    _doReset: function _doReset() {
      this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    },
    _doProcessBlock: function _doProcessBlock(e, v) {
      for (var b = 0; 16 > b; b++) {
        var c = v + b,
        f = e[c];
        e[c] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
      }
      var c = this._hash.words,
      f = B.words,
      d = C.words,
      n = x.words,
      q = y.words,
      p = z.words,
      w = A.words,
      t,g,h,j,r,u,k,l,m,s;
      u = t = c[0];
      k = g = c[1];
      l = h = c[2];
      m = j = c[3];
      s = r = c[4];
      for (var a, b = 0; 80 > b; b += 1) {a = t + e[v + n[b]] | 0,
        a = 16 > b ? a + ((g ^ h ^ j) + f[0]) : 32 > b ? a + ((g & h | ~g & j) + f[1]) : 48 > b ? a + (((g | ~h) ^ j) + f[2]) : 64 > b ? a + ((g & j | h & ~j) + f[3]) : a + ((g ^ (h | ~j)) + f[4]),
        a |= 0,
        a = a << p[b] | a >>> 32 - p[b],
        a = a + r | 0,
        t = r,
        r = j,
        j = h << 10 | h >>> 22,
        h = g,
        g = a,
        a = u + e[v + q[b]] | 0,
        a = 16 > b ? a + ((k ^ (l | ~m)) + d[0]) : 32 > b ? a + ((k & m | l & ~m) + d[1]) : 48 > b ? a + (((k | ~l) ^ m) + d[2]) : 64 > b ? a + ((k & l | ~k & m) + d[3]) : a + ((k ^ l ^ m) + d[4]),
        a |= 0,
        a = a << w[b] | a >>> 32 - w[b],
        a = a + s | 0,
        u = s,
        s = m,
        m = l << 10 | l >>> 22,
        l = k,
        k = a;}
      a = c[1] + h + m | 0;
      c[1] = c[2] + j + s | 0;
      c[2] = c[3] + r + u | 0;
      c[3] = c[4] + t + k | 0;
      c[4] = c[0] + g + l | 0;
      c[0] = a;
    },
    _doFinalize: function _doFinalize() {
      var e = this._data,
      d = e.words,
      b = 8 * this._nDataBytes,
      c = 8 * e.sigBytes;
      d[c >>> 5] |= 128 << 24 - c % 32;
      d[(c + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
      e.sigBytes = 4 * (d.length + 1);
      this._process();
      e = this._hash;
      d = e.words;
      for (b = 0; 5 > b; b++) {c = d[b],
        d[b] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;}
      return e;
    },
    clone: function clone() {
      var d = p.clone.call(this);
      d._hash = this._hash.clone();
      return d;
    } });

  q.RIPEMD160 = p._createHelper(d);
  q.HmacRIPEMD160 = p._createHmacHelper(d);
})(Math);

/*
          CryptoJS v3.1.2 hmac.js
          code.google.com/p/crypto-js
          (c) 2009-2013 by Jeff Mott. All rights reserved.
          code.google.com/p/crypto-js/wiki/License
          */
(function () {
  var c = CryptoJS,
  k = c.enc.Utf8;
  c.algo.HMAC = c.lib.Base.extend({
    init: function init(a, b) {
      a = this._hasher = new a.init();
      "string" == typeof b && (b = k.parse(b));
      var c = a.blockSize,
      e = 4 * c;
      b.sigBytes > e && (b = a.finalize(b));
      b.clamp();
      for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, j = g.words, d = 0; d < c; d++) {h[d] ^= 1549556828,
        j[d] ^= 909522486;}
      f.sigBytes = g.sigBytes = e;
      this.reset();
    },
    reset: function reset() {
      var a = this._hasher;
      a.reset();
      a.update(this._iKey);
    },
    update: function update(a) {
      this._hasher.update(a);
      return this;
    },
    finalize: function finalize(a) {
      var b = this._hasher;
      a = b.finalize(a);
      b.reset();
      return b.finalize(this._oKey.clone().concat(a));
    } });

})();

/*
      CryptoJS v3.1.2 pbkdf2-min.js
      code.google.com/p/crypto-js
      (c) 2009-2013 by Jeff Mott. All rights reserved.
      code.google.com/p/crypto-js/wiki/License
      */
(function () {
  var b = CryptoJS,
  a = b.lib,
  d = a.Base,
  m = a.WordArray,
  a = b.algo,
  q = a.HMAC,
  l = a.PBKDF2 = d.extend({
    cfg: d.extend({
      keySize: 4,
      hasher: a.SHA1,
      iterations: 1 }),

    init: function init(a) {
      this.cfg = this.cfg.extend(a);
    },
    compute: function compute(a, b) {
      for (var c = this.cfg,
      f = q.create(c.hasher, a), g = m.create(), d = m.create([1]), l = g.words, r = d.words, n = c.keySize, c = c.iterations; l.length < n;) {
        var h = f.update(b).finalize(d);
        f.reset();
        for (var j = h.words,
        s = j.length,
        k = h,
        p = 1; p < c; p++) {
          k = f.finalize(k);
          f.reset();
          for (var t = k.words,
          e = 0; e < s; e++) {j[e] ^= t[e];}
        }
        g.concat(h);
        r[0]++;
      }
      g.sigBytes = 4 * n;
      return g;
    } });

  b.PBKDF2 = function (a, b, c) {
    return l.create(c).compute(a, b);
  };
})();

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
       */
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(d) {
  var b;
  var e;
  var a = "";
  for (b = 0; b + 3 <= d.length; b += 3) {
    e = parseInt(d.substring(b, b + 3), 16);
    a += b64map.charAt(e >> 6) + b64map.charAt(e & 63);
  }
  if (b + 1 == d.length) {
    e = parseInt(d.substring(b, b + 1), 16);
    a += b64map.charAt(e << 2);
  } else {
    if (b + 2 == d.length) {
      e = parseInt(d.substring(b, b + 2), 16);
      a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4);
    }
  }
  if (b64pad) {
    while ((a.length & 3) > 0) {
      a += b64pad;
    }
  }
  return a;
}
function b64tohex(f) {
  var d = "";
  var e;
  var b = 0;
  var c;
  var a;
  for (e = 0; e < f.length; ++e) {
    if (f.charAt(e) == b64pad) {
      break;
    }
    a = b64map.indexOf(f.charAt(e));
    if (a < 0) {
      continue;
    }
    if (b == 0) {
      d += int2char(a >> 2);
      c = a & 3;
      b = 1;
    } else {
      if (b == 1) {
        d += int2char(c << 2 | a >> 4);
        c = a & 15;
        b = 2;
      } else {
        if (b == 2) {
          d += int2char(c);
          d += int2char(a >> 2);
          c = a & 3;
          b = 3;
        } else {
          d += int2char(c << 2 | a >> 4);
          d += int2char(a & 15);
          b = 0;
        }
      }
    }
  }
  if (b == 1) {
    d += int2char(c << 2);
  }
  return d;
}
function b64toBA(e) {
  var d = b64tohex(e);
  var c;
  var b = new Array();
  for (c = 0; 2 * c < d.length; ++c) {
    b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16);
  }
  return b;
};
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
    */
var dbits;
var canary = 244837814094590;
var j_lm = (canary & 16777215) == 15715070;
function BigInteger(e, d, f) {
  if (e != null) {
    if ("number" == typeof e) {
      this.fromNumber(e, d, f);
    } else {
      if (d == null && "string" != typeof e) {
        this.fromString(e, 256);
      } else {
        this.fromString(e, d);
      }
    }
  }
}
function nbi() {
  return new BigInteger(null);
}
function am1(f, a, b, e, h, g) {
  while (--g >= 0) {
    var d = a * this[f++] + b[e] + h;
    h = Math.floor(d / 67108864);
    b[e++] = d & 67108863;
  }
  return h;
}
function am2(f, q, r, e, o, a) {
  var k = q & 32767,
  p = q >> 15;
  while (--a >= 0) {
    var d = this[f] & 32767;
    var g = this[f++] >> 15;
    var b = p * d + g * k;
    d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
    o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
    r[e++] = d & 1073741823;
  }
  return o;
}
function am3(f, q, r, e, o, a) {
  var k = q & 16383,
  p = q >> 14;
  while (--a >= 0) {
    var d = this[f] & 16383;
    var g = this[f++] >> 14;
    var b = p * d + g * k;
    d = k * d + ((b & 16383) << 14) + r[e] + o;
    o = (d >> 28) + (b >> 14) + p * g;
    r[e++] = d & 268435455;
  }
  return o;
}
if (j_lm && navigator2.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = am2;
  dbits = 30;
} else {
  if (j_lm && navigator2.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function int2char(a) {
  return BI_RM.charAt(a);
}
function intAt(b, a) {
  var d = BI_RC[b.charCodeAt(a)];
  return d == null ? -1 : d;
}
function bnpCopyTo(b) {
  for (var a = this.t - 1; a >= 0; --a) {
    b[a] = this[a];
  }
  b.t = this.t;
  b.s = this.s;
}
function bnpFromInt(a) {
  this.t = 1;
  this.s = a < 0 ? -1 : 0;
  if (a > 0) {
    this[0] = a;
  } else {
    if (a < -1) {
      this[0] = a + this.DV;
    } else {
      this.t = 0;
    }
  }
}
function nbv(a) {
  var b = nbi();
  b.fromInt(a);
  return b;
}
function bnpFromString(h, c) {
  var e;
  if (c == 16) {
    e = 4;
  } else {
    if (c == 8) {
      e = 3;
    } else {
      if (c == 256) {
        e = 8;
      } else {
        if (c == 2) {
          e = 1;
        } else {
          if (c == 32) {
            e = 5;
          } else {
            if (c == 4) {
              e = 2;
            } else {
              this.fromRadix(h, c);
              return;
            }
          }
        }
      }
    }
  }
  this.t = 0;
  this.s = 0;
  var g = h.length,
  d = false,
  f = 0;
  while (--g >= 0) {
    var a = e == 8 ? h[g] & 255 : intAt(h, g);
    if (a < 0) {
      if (h.charAt(g) == "-") {
        d = true;
      }
      continue;
    }
    d = false;
    if (f == 0) {
      this[this.t++] = a;
    } else {
      if (f + e > this.DB) {
        this[this.t - 1] |= (a & (1 << this.DB - f) - 1) << f;
        this[this.t++] = a >> this.DB - f;
      } else {
        this[this.t - 1] |= a << f;
      }
    }
    f += e;
    if (f >= this.DB) {
      f -= this.DB;
    }
  }
  if (e == 8 && (h[0] & 128) != 0) {
    this.s = -1;
    if (f > 0) {
      this[this.t - 1] |= (1 << this.DB - f) - 1 << f;
    }
  }
  this.clamp();
  if (d) {
    BigInteger.ZERO.subTo(this, this);
  }
}
function bnpClamp() {
  var a = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == a) {--this.t;
  }
}
function bnToString(c) {
  if (this.s < 0) {
    return "-" + this.negate().toString(c);
  }
  var e;
  if (c == 16) {
    e = 4;
  } else {
    if (c == 8) {
      e = 3;
    } else {
      if (c == 2) {
        e = 1;
      } else {
        if (c == 32) {
          e = 5;
        } else {
          if (c == 4) {
            e = 2;
          } else {
            return this.toRadix(c);
          }
        }
      }
    }
  }
  var g = (1 << e) - 1,
  l,
  a = false,
  h = "",
  f = this.t;
  var j = this.DB - f * this.DB % e;
  if (f-- > 0) {
    if (j < this.DB && (l = this[f] >> j) > 0) {
      a = true;
      h = int2char(l);
    }
    while (f >= 0) {
      if (j < e) {
        l = (this[f] & (1 << j) - 1) << e - j;
        l |= this[--f] >> (j += this.DB - e);
      } else {
        l = this[f] >> (j -= e) & g;
        if (j <= 0) {
          j += this.DB;--f;
        }
      }
      if (l > 0) {
        a = true;
      }
      if (a) {
        h += int2char(l);
      }
    }
  }
  return a ? h : "0";
}
function bnNegate() {
  var a = nbi();
  BigInteger.ZERO.subTo(this, a);
  return a;
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}
function bnCompareTo(b) {
  var d = this.s - b.s;
  if (d != 0) {
    return d;
  }
  var c = this.t;
  d = c - b.t;
  if (d != 0) {
    return this.s < 0 ? -d : d;
  }
  while (--c >= 0) {
    if ((d = this[c] - b[c]) != 0) {
      return d;
    }
  }
  return 0;
}
function nbits(a) {
  var c = 1,
  b;
  if ((b = a >>> 16) != 0) {
    a = b;
    c += 16;
  }
  if ((b = a >> 8) != 0) {
    a = b;
    c += 8;
  }
  if ((b = a >> 4) != 0) {
    a = b;
    c += 4;
  }
  if ((b = a >> 2) != 0) {
    a = b;
    c += 2;
  }
  if ((b = a >> 1) != 0) {
    a = b;
    c += 1;
  }
  return c;
}
function bnBitLength() {
  if (this.t <= 0) {
    return 0;
  }
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}
function bnpDLShiftTo(c, b) {
  var a;
  for (a = this.t - 1; a >= 0; --a) {
    b[a + c] = this[a];
  }
  for (a = c - 1; a >= 0; --a) {
    b[a] = 0;
  }
  b.t = this.t + c;
  b.s = this.s;
}
function bnpDRShiftTo(c, b) {
  for (var a = c; a < this.t; ++a) {
    b[a - c] = this[a];
  }
  b.t = Math.max(this.t - c, 0);
  b.s = this.s;
}
function bnpLShiftTo(j, e) {
  var b = j % this.DB;
  var a = this.DB - b;
  var g = (1 << a) - 1;
  var f = Math.floor(j / this.DB),
  h = this.s << b & this.DM,
  d;
  for (d = this.t - 1; d >= 0; --d) {
    e[d + f + 1] = this[d] >> a | h;
    h = (this[d] & g) << b;
  }
  for (d = f - 1; d >= 0; --d) {
    e[d] = 0;
  }
  e[f] = h;
  e.t = this.t + f + 1;
  e.s = this.s;
  e.clamp();
}
function bnpRShiftTo(g, d) {
  d.s = this.s;
  var e = Math.floor(g / this.DB);
  if (e >= this.t) {
    d.t = 0;
    return;
  }
  var b = g % this.DB;
  var a = this.DB - b;
  var f = (1 << b) - 1;
  d[0] = this[e] >> b;
  for (var c = e + 1; c < this.t; ++c) {
    d[c - e - 1] |= (this[c] & f) << a;
    d[c - e] = this[c] >> b;
  }
  if (b > 0) {
    d[this.t - e - 1] |= (this.s & f) << a;
  }
  d.t = this.t - e;
  d.clamp();
}
function bnpSubTo(d, f) {
  var e = 0,
  g = 0,
  b = Math.min(d.t, this.t);
  while (e < b) {
    g += this[e] - d[e];
    f[e++] = g & this.DM;
    g >>= this.DB;
  }
  if (d.t < this.t) {
    g -= d.s;
    while (e < this.t) {
      g += this[e];
      f[e++] = g & this.DM;
      g >>= this.DB;
    }
    g += this.s;
  } else {
    g += this.s;
    while (e < d.t) {
      g -= d[e];
      f[e++] = g & this.DM;
      g >>= this.DB;
    }
    g -= d.s;
  }
  f.s = g < 0 ? -1 : 0;
  if (g < -1) {
    f[e++] = this.DV + g;
  } else {
    if (g > 0) {
      f[e++] = g;
    }
  }
  f.t = e;
  f.clamp();
}
function bnpMultiplyTo(c, e) {
  var b = this.abs(),
  f = c.abs();
  var d = b.t;
  e.t = d + f.t;
  while (--d >= 0) {
    e[d] = 0;
  }
  for (d = 0; d < f.t; ++d) {
    e[d + b.t] = b.am(0, f[d], e, d, 0, b.t);
  }
  e.s = 0;
  e.clamp();
  if (this.s != c.s) {
    BigInteger.ZERO.subTo(e, e);
  }
}
function bnpSquareTo(d) {
  var a = this.abs();
  var b = d.t = 2 * a.t;
  while (--b >= 0) {
    d[b] = 0;
  }
  for (b = 0; b < a.t - 1; ++b) {
    var e = a.am(b, a[b], d, 2 * b, 0, 1);
    if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
      d[b + a.t] -= a.DV;
      d[b + a.t + 1] = 1;
    }
  }
  if (d.t > 0) {
    d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1);
  }
  d.s = 0;
  d.clamp();
}
function bnpDivRemTo(n, h, g) {
  var w = n.abs();
  if (w.t <= 0) {
    return;
  }
  var k = this.abs();
  if (k.t < w.t) {
    if (h != null) {
      h.fromInt(0);
    }
    if (g != null) {
      this.copyTo(g);
    }
    return;
  }
  if (g == null) {
    g = nbi();
  }
  var d = nbi(),
  a = this.s,
  l = n.s;
  var v = this.DB - nbits(w[w.t - 1]);
  if (v > 0) {
    w.lShiftTo(v, d);
    k.lShiftTo(v, g);
  } else {
    w.copyTo(d);
    k.copyTo(g);
  }
  var p = d.t;
  var b = d[p - 1];
  if (b == 0) {
    return;
  }
  var o = b * (1 << this.F1) + (p > 1 ? d[p - 2] >> this.F2 : 0);
  var A = this.FV / o,
  z = (1 << this.F1) / o,
  x = 1 << this.F2;
  var u = g.t,
  s = u - p,
  f = h == null ? nbi() : h;
  d.dlShiftTo(s, f);
  if (g.compareTo(f) >= 0) {
    g[g.t++] = 1;
    g.subTo(f, g);
  }
  BigInteger.ONE.dlShiftTo(p, f);
  f.subTo(d, d);
  while (d.t < p) {
    d[d.t++] = 0;
  }
  while (--s >= 0) {
    var c = g[--u] == b ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z);
    if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
      d.dlShiftTo(s, f);
      g.subTo(f, g);
      while (g[u] < --c) {
        g.subTo(f, g);
      }
    }
  }
  if (h != null) {
    g.drShiftTo(p, h);
    if (a != l) {
      BigInteger.ZERO.subTo(h, h);
    }
  }
  g.t = p;
  g.clamp();
  if (v > 0) {
    g.rShiftTo(v, g);
  }
  if (a < 0) {
    BigInteger.ZERO.subTo(g, g);
  }
}
function bnMod(b) {
  var c = nbi();
  this.abs().divRemTo(b, null, c);
  if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
    b.subTo(c, c);
  }
  return c;
}
function Classic(a) {
  this.m = a;
}
function cConvert(a) {
  if (a.s < 0 || a.compareTo(this.m) >= 0) {
    return a.mod(this.m);
  } else {
    return a;
  }
}
function cRevert(a) {
  return a;
}
function cReduce(a) {
  a.divRemTo(this.m, null, a);
}
function cMulTo(a, c, b) {
  a.multiplyTo(c, b);
  this.reduce(b);
}
function cSqrTo(a, b) {
  a.squareTo(b);
  this.reduce(b);
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
  if (this.t < 1) {
    return 0;
  }
  var a = this[0];
  if ((a & 1) == 0) {
    return 0;
  }
  var b = a & 3;
  b = b * (2 - (a & 15) * b) & 15;
  b = b * (2 - (a & 255) * b) & 255;
  b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
  b = b * (2 - a * b % this.DV) % this.DV;
  return b > 0 ? this.DV - b : -b;
}
function Montgomery(a) {
  this.m = a;
  this.mp = a.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << a.DB - 15) - 1;
  this.mt2 = 2 * a.t;
}
function montConvert(a) {
  var b = nbi();
  a.abs().dlShiftTo(this.m.t, b);
  b.divRemTo(this.m, null, b);
  if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
    this.m.subTo(b, b);
  }
  return b;
}
function montRevert(a) {
  var b = nbi();
  a.copyTo(b);
  this.reduce(b);
  return b;
}
function montReduce(a) {
  while (a.t <= this.mt2) {
    a[a.t++] = 0;
  }
  for (var c = 0; c < this.m.t; ++c) {
    var b = a[c] & 32767;
    var d = b * this.mpl + ((b * this.mph + (a[c] >> 15) * this.mpl & this.um) << 15) & a.DM;
    b = c + this.m.t;
    a[b] += this.m.am(0, d, a, c, 0, this.m.t);
    while (a[b] >= a.DV) {
      a[b] -= a.DV;
      a[++b]++;
    }
  }
  a.clamp();
  a.drShiftTo(this.m.t, a);
  if (a.compareTo(this.m) >= 0) {
    a.subTo(this.m, a);
  }
}
function montSqrTo(a, b) {
  a.squareTo(b);
  this.reduce(b);
}
function montMulTo(a, c, b) {
  a.multiplyTo(c, b);
  this.reduce(b);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
  return (this.t > 0 ? this[0] & 1 : this.s) == 0;
}
function bnpExp(h, j) {
  if (h > 4294967295 || h < 1) {
    return BigInteger.ONE;
  }
  var f = nbi(),
  a = nbi(),
  d = j.convert(this),
  c = nbits(h) - 1;
  d.copyTo(f);
  while (--c >= 0) {
    j.sqrTo(f, a);
    if ((h & 1 << c) > 0) {
      j.mulTo(a, d, f);
    } else {
      var b = f;
      f = a;
      a = b;
    }
  }
  return j.revert(f);
}
function bnModPowInt(b, a) {
  var c;
  if (b < 256 || a.isEven()) {
    c = new Classic(a);
  } else {
    c = new Montgomery(a);
  }
  return this.exp(b, c);
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                          */
function bnClone() {
  var a = nbi();
  this.copyTo(a);
  return a;
}
function bnIntValue() {
  if (this.s < 0) {
    if (this.t == 1) {
      return this[0] - this.DV;
    } else {
      if (this.t == 0) {
        return -1;
      }
    }
  } else {
    if (this.t == 1) {
      return this[0];
    } else {
      if (this.t == 0) {
        return 0;
      }
    }
  }
  return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
}
function bnByteValue() {
  return this.t == 0 ? this.s : this[0] << 24 >> 24;
}
function bnShortValue() {
  return this.t == 0 ? this.s : this[0] << 16 >> 16;
}
function bnpChunkSize(a) {
  return Math.floor(Math.LN2 * this.DB / Math.log(a));
}
function bnSigNum() {
  if (this.s < 0) {
    return -1;
  } else {
    if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
function bnpToRadix(c) {
  if (c == null) {
    c = 10;
  }
  if (this.signum() == 0 || c < 2 || c > 36) {
    return "0";
  }
  var f = this.chunkSize(c);
  var e = Math.pow(c, f);
  var i = nbv(e),
  j = nbi(),
  h = nbi(),
  g = "";
  this.divRemTo(i, j, h);
  while (j.signum() > 0) {
    g = (e + h.intValue()).toString(c).substr(1) + g;
    j.divRemTo(i, j, h);
  }
  return h.intValue().toString(c) + g;
}
function bnpFromRadix(m, h) {
  this.fromInt(0);
  if (h == null) {
    h = 10;
  }
  var f = this.chunkSize(h);
  var g = Math.pow(h, f),
  e = false,
  a = 0,
  l = 0;
  for (var c = 0; c < m.length; ++c) {
    var k = intAt(m, c);
    if (k < 0) {
      if (m.charAt(c) == "-" && this.signum() == 0) {
        e = true;
      }
      continue;
    }
    l = h * l + k;
    if (++a >= f) {
      this.dMultiply(g);
      this.dAddOffset(l, 0);
      a = 0;
      l = 0;
    }
  }
  if (a > 0) {
    this.dMultiply(Math.pow(h, a));
    this.dAddOffset(l, 0);
  }
  if (e) {
    BigInteger.ZERO.subTo(this, this);
  }
}
function bnpFromNumber(f, e, h) {
  if ("number" == typeof e) {
    if (f < 2) {
      this.fromInt(1);
    } else {
      this.fromNumber(f, h);
      if (!this.testBit(f - 1)) {
        this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this);
      }
      if (this.isEven()) {
        this.dAddOffset(1, 0);
      }
      while (!this.isProbablePrime(e)) {
        this.dAddOffset(2, 0);
        if (this.bitLength() > f) {
          this.subTo(BigInteger.ONE.shiftLeft(f - 1), this);
        }
      }
    }
  } else {
    var d = new Array(),
    g = f & 7;
    d.length = (f >> 3) + 1;
    e.nextBytes(d);
    if (g > 0) {
      d[0] &= (1 << g) - 1;
    } else {
      d[0] = 0;
    }
    this.fromString(d, 256);
  }
}
function bnToByteArray() {
  var b = this.t,
  c = new Array();
  c[0] = this.s;
  var e = this.DB - b * this.DB % 8,
  f,
  a = 0;
  if (b-- > 0) {
    if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) {
      c[a++] = f | this.s << this.DB - e;
    }
    while (b >= 0) {
      if (e < 8) {
        f = (this[b] & (1 << e) - 1) << 8 - e;
        f |= this[--b] >> (e += this.DB - 8);
      } else {
        f = this[b] >> (e -= 8) & 255;
        if (e <= 0) {
          e += this.DB;--b;
        }
      }
      if ((f & 128) != 0) {
        f |= -256;
      }
      if (a == 0 && (this.s & 128) != (f & 128)) {++a;
      }
      if (a > 0 || f != this.s) {
        c[a++] = f;
      }
    }
  }
  return c;
}
function bnEquals(b) {
  return this.compareTo(b) == 0;
}
function bnMin(b) {
  return this.compareTo(b) < 0 ? this : b;
}
function bnMax(b) {
  return this.compareTo(b) > 0 ? this : b;
}
function bnpBitwiseTo(c, h, e) {
  var d,g,b = Math.min(c.t, this.t);
  for (d = 0; d < b; ++d) {
    e[d] = h(this[d], c[d]);
  }
  if (c.t < this.t) {
    g = c.s & this.DM;
    for (d = b; d < this.t; ++d) {
      e[d] = h(this[d], g);
    }
    e.t = this.t;
  } else {
    g = this.s & this.DM;
    for (d = b; d < c.t; ++d) {
      e[d] = h(g, c[d]);
    }
    e.t = c.t;
  }
  e.s = h(this.s, c.s);
  e.clamp();
}
function op_and(a, b) {
  return a & b;
}
function bnAnd(b) {
  var c = nbi();
  this.bitwiseTo(b, op_and, c);
  return c;
}
function op_or(a, b) {
  return a | b;
}
function bnOr(b) {
  var c = nbi();
  this.bitwiseTo(b, op_or, c);
  return c;
}
function op_xor(a, b) {
  return a ^ b;
}
function bnXor(b) {
  var c = nbi();
  this.bitwiseTo(b, op_xor, c);
  return c;
}
function op_andnot(a, b) {
  return a & ~b;
}
function bnAndNot(b) {
  var c = nbi();
  this.bitwiseTo(b, op_andnot, c);
  return c;
}
function bnNot() {
  var b = nbi();
  for (var a = 0; a < this.t; ++a) {
    b[a] = this.DM & ~this[a];
  }
  b.t = this.t;
  b.s = ~this.s;
  return b;
}
function bnShiftLeft(b) {
  var a = nbi();
  if (b < 0) {
    this.rShiftTo(-b, a);
  } else {
    this.lShiftTo(b, a);
  }
  return a;
}
function bnShiftRight(b) {
  var a = nbi();
  if (b < 0) {
    this.lShiftTo(-b, a);
  } else {
    this.rShiftTo(b, a);
  }
  return a;
}
function lbit(a) {
  if (a == 0) {
    return -1;
  }
  var b = 0;
  if ((a & 65535) == 0) {
    a >>= 16;
    b += 16;
  }
  if ((a & 255) == 0) {
    a >>= 8;
    b += 8;
  }
  if ((a & 15) == 0) {
    a >>= 4;
    b += 4;
  }
  if ((a & 3) == 0) {
    a >>= 2;
    b += 2;
  }
  if ((a & 1) == 0) {++b;
  }
  return b;
}
function bnGetLowestSetBit() {
  for (var a = 0; a < this.t; ++a) {
    if (this[a] != 0) {
      return a * this.DB + lbit(this[a]);
    }
  }
  if (this.s < 0) {
    return this.t * this.DB;
  }
  return -1;
}
function cbit(a) {
  var b = 0;
  while (a != 0) {
    a &= a - 1;++b;
  }
  return b;
}
function bnBitCount() {
  var c = 0,
  a = this.s & this.DM;
  for (var b = 0; b < this.t; ++b) {
    c += cbit(this[b] ^ a);
  }
  return c;
}
function bnTestBit(b) {
  var a = Math.floor(b / this.DB);
  if (a >= this.t) {
    return this.s != 0;
  }
  return (this[a] & 1 << b % this.DB) != 0;
}
function bnpChangeBit(c, b) {
  var a = BigInteger.ONE.shiftLeft(c);
  this.bitwiseTo(a, b, a);
  return a;
}
function bnSetBit(a) {
  return this.changeBit(a, op_or);
}
function bnClearBit(a) {
  return this.changeBit(a, op_andnot);
}
function bnFlipBit(a) {
  return this.changeBit(a, op_xor);
}
function bnpAddTo(d, f) {
  var e = 0,
  g = 0,
  b = Math.min(d.t, this.t);
  while (e < b) {
    g += this[e] + d[e];
    f[e++] = g & this.DM;
    g >>= this.DB;
  }
  if (d.t < this.t) {
    g += d.s;
    while (e < this.t) {
      g += this[e];
      f[e++] = g & this.DM;
      g >>= this.DB;
    }
    g += this.s;
  } else {
    g += this.s;
    while (e < d.t) {
      g += d[e];
      f[e++] = g & this.DM;
      g >>= this.DB;
    }
    g += d.s;
  }
  f.s = g < 0 ? -1 : 0;
  if (g > 0) {
    f[e++] = g;
  } else {
    if (g < -1) {
      f[e++] = this.DV + g;
    }
  }
  f.t = e;
  f.clamp();
}
function bnAdd(b) {
  var c = nbi();
  this.addTo(b, c);
  return c;
}
function bnSubtract(b) {
  var c = nbi();
  this.subTo(b, c);
  return c;
}
function bnMultiply(b) {
  var c = nbi();
  this.multiplyTo(b, c);
  return c;
}
function bnSquare() {
  var a = nbi();
  this.squareTo(a);
  return a;
}
function bnDivide(b) {
  var c = nbi();
  this.divRemTo(b, c, null);
  return c;
}
function bnRemainder(b) {
  var c = nbi();
  this.divRemTo(b, null, c);
  return c;
}
function bnDivideAndRemainder(b) {
  var d = nbi(),
  c = nbi();
  this.divRemTo(b, d, c);
  return new Array(d, c);
}
function bnpDMultiply(a) {
  this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);++this.t;
  this.clamp();
}
function bnpDAddOffset(b, a) {
  if (b == 0) {
    return;
  }
  while (this.t <= a) {
    this[this.t++] = 0;
  }
  this[a] += b;
  while (this[a] >= this.DV) {
    this[a] -= this.DV;
    if (++a >= this.t) {
      this[this.t++] = 0;
    }++this[a];
  }
}
function NullExp() {}
function nNop(a) {
  return a;
}
function nMulTo(a, c, b) {
  a.multiplyTo(c, b);
}
function nSqrTo(a, b) {
  a.squareTo(b);
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(a) {
  return this.exp(a, new NullExp());
}
function bnpMultiplyLowerTo(b, f, e) {
  var d = Math.min(this.t + b.t, f);
  e.s = 0;
  e.t = d;
  while (d > 0) {
    e[--d] = 0;
  }
  var c;
  for (c = e.t - this.t; d < c; ++d) {
    e[d + this.t] = this.am(0, b[d], e, d, 0, this.t);
  }
  for (c = Math.min(b.t, f); d < c; ++d) {
    this.am(0, b[d], e, d, 0, f - d);
  }
  e.clamp();
}
function bnpMultiplyUpperTo(b, e, d) {--e;
  var c = d.t = this.t + b.t - e;
  d.s = 0;
  while (--c >= 0) {
    d[c] = 0;
  }
  for (c = Math.max(e - this.t, 0); c < b.t; ++c) {
    d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e);
  }
  d.clamp();
  d.drShiftTo(1, d);
}
function Barrett(a) {
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
  this.mu = this.r2.divide(a);
  this.m = a;
}
function barrettConvert(a) {
  if (a.s < 0 || a.t > 2 * this.m.t) {
    return a.mod(this.m);
  } else {
    if (a.compareTo(this.m) < 0) {
      return a;
    } else {
      var b = nbi();
      a.copyTo(b);
      this.reduce(b);
      return b;
    }
  }
}
function barrettRevert(a) {
  return a;
}
function barrettReduce(a) {
  a.drShiftTo(this.m.t - 1, this.r2);
  if (a.t > this.m.t + 1) {
    a.t = this.m.t + 1;
    a.clamp();
  }
  this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
  this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
  while (a.compareTo(this.r2) < 0) {
    a.dAddOffset(1, this.m.t + 1);
  }
  a.subTo(this.r2, a);
  while (a.compareTo(this.m) >= 0) {
    a.subTo(this.m, a);
  }
}
function barrettSqrTo(a, b) {
  a.squareTo(b);
  this.reduce(b);
}
function barrettMulTo(a, c, b) {
  a.multiplyTo(c, b);
  this.reduce(b);
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(q, f) {
  var o = q.bitLength(),
  h,
  b = nbv(1),
  v;
  if (o <= 0) {
    return b;
  } else {
    if (o < 18) {
      h = 1;
    } else {
      if (o < 48) {
        h = 3;
      } else {
        if (o < 144) {
          h = 4;
        } else {
          if (o < 768) {
            h = 5;
          } else {
            h = 6;
          }
        }
      }
    }
  }
  if (o < 8) {
    v = new Classic(f);
  } else {
    if (f.isEven()) {
      v = new Barrett(f);
    } else {
      v = new Montgomery(f);
    }
  }
  var p = new Array(),
  d = 3,
  s = h - 1,
  a = (1 << h) - 1;
  p[1] = v.convert(this);
  if (h > 1) {
    var A = nbi();
    v.sqrTo(p[1], A);
    while (d <= a) {
      p[d] = nbi();
      v.mulTo(A, p[d - 2], p[d]);
      d += 2;
    }
  }
  var l = q.t - 1,
  x,u = true,
  c = nbi(),
  y;
  o = nbits(q[l]) - 1;
  while (l >= 0) {
    if (o >= s) {
      x = q[l] >> o - s & a;
    } else {
      x = (q[l] & (1 << o + 1) - 1) << s - o;
      if (l > 0) {
        x |= q[l - 1] >> this.DB + o - s;
      }
    }
    d = h;
    while ((x & 1) == 0) {
      x >>= 1;--d;
    }
    if ((o -= d) < 0) {
      o += this.DB;--l;
    }
    if (u) {
      p[x].copyTo(b);
      u = false;
    } else {
      while (d > 1) {
        v.sqrTo(b, c);
        v.sqrTo(c, b);
        d -= 2;
      }
      if (d > 0) {
        v.sqrTo(b, c);
      } else {
        y = b;
        b = c;
        c = y;
      }
      v.mulTo(c, p[x], b);
    }
    while (l >= 0 && (q[l] & 1 << o) == 0) {
      v.sqrTo(b, c);
      y = b;
      b = c;
      c = y;
      if (--o < 0) {
        o = this.DB - 1;--l;
      }
    }
  }
  return v.revert(b);
}
function bnGCD(c) {
  var b = this.s < 0 ? this.negate() : this.clone();
  var h = c.s < 0 ? c.negate() : c.clone();
  if (b.compareTo(h) < 0) {
    var e = b;
    b = h;
    h = e;
  }
  var d = b.getLowestSetBit(),
  f = h.getLowestSetBit();
  if (f < 0) {
    return b;
  }
  if (d < f) {
    f = d;
  }
  if (f > 0) {
    b.rShiftTo(f, b);
    h.rShiftTo(f, h);
  }
  while (b.signum() > 0) {
    if ((d = b.getLowestSetBit()) > 0) {
      b.rShiftTo(d, b);
    }
    if ((d = h.getLowestSetBit()) > 0) {
      h.rShiftTo(d, h);
    }
    if (b.compareTo(h) >= 0) {
      b.subTo(h, b);
      b.rShiftTo(1, b);
    } else {
      h.subTo(b, h);
      h.rShiftTo(1, h);
    }
  }
  if (f > 0) {
    h.lShiftTo(f, h);
  }
  return h;
}
function bnpModInt(e) {
  if (e <= 0) {
    return 0;
  }
  var c = this.DV % e,
  b = this.s < 0 ? e - 1 : 0;
  if (this.t > 0) {
    if (c == 0) {
      b = this[0] % e;
    } else {
      for (var a = this.t - 1; a >= 0; --a) {
        b = (c * b + this[a]) % e;
      }
    }
  }
  return b;
}
function bnModInverse(f) {
  var j = f.isEven();
  if (this.isEven() && j || f.signum() == 0) {
    return BigInteger.ZERO;
  }
  var i = f.clone(),
  h = this.clone();
  var g = nbv(1),
  e = nbv(0),
  l = nbv(0),
  k = nbv(1);
  while (i.signum() != 0) {
    while (i.isEven()) {
      i.rShiftTo(1, i);
      if (j) {
        if (!g.isEven() || !e.isEven()) {
          g.addTo(this, g);
          e.subTo(f, e);
        }
        g.rShiftTo(1, g);
      } else {
        if (!e.isEven()) {
          e.subTo(f, e);
        }
      }
      e.rShiftTo(1, e);
    }
    while (h.isEven()) {
      h.rShiftTo(1, h);
      if (j) {
        if (!l.isEven() || !k.isEven()) {
          l.addTo(this, l);
          k.subTo(f, k);
        }
        l.rShiftTo(1, l);
      } else {
        if (!k.isEven()) {
          k.subTo(f, k);
        }
      }
      k.rShiftTo(1, k);
    }
    if (i.compareTo(h) >= 0) {
      i.subTo(h, i);
      if (j) {
        g.subTo(l, g);
      }
      e.subTo(k, e);
    } else {
      h.subTo(i, h);
      if (j) {
        l.subTo(g, l);
      }
      k.subTo(e, k);
    }
  }
  if (h.compareTo(BigInteger.ONE) != 0) {
    return BigInteger.ZERO;
  }
  if (k.compareTo(f) >= 0) {
    return k.subtract(f);
  }
  if (k.signum() < 0) {
    k.addTo(f, k);
  } else {
    return k;
  }
  if (k.signum() < 0) {
    return k.add(f);
  } else {
    return k;
  }
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
  var d,b = this.abs();
  if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) {
    for (d = 0; d < lowprimes.length; ++d) {
      if (b[0] == lowprimes[d]) {
        return true;
      }
    }
    return false;
  }
  if (b.isEven()) {
    return false;
  }
  d = 1;
  while (d < lowprimes.length) {
    var a = lowprimes[d],
    c = d + 1;
    while (c < lowprimes.length && a < lplim) {
      a *= lowprimes[c++];
    }
    a = b.modInt(a);
    while (d < c) {
      if (a % lowprimes[d++] == 0) {
        return false;
      }
    }
  }
  return b.millerRabin(e);
}
function bnpMillerRabin(f) {
  var g = this.subtract(BigInteger.ONE);
  var c = g.getLowestSetBit();
  if (c <= 0) {
    return false;
  }
  var h = g.shiftRight(c);
  f = f + 1 >> 1;
  if (f > lowprimes.length) {
    f = lowprimes.length;
  }
  var b = nbi();
  for (var e = 0; e < f; ++e) {
    b.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
    var l = b.modPow(h, this);
    if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) {
      var d = 1;
      while (d++ < c && l.compareTo(g) != 0) {
        l = l.modPowInt(2, this);
        if (l.compareTo(BigInteger.ONE) == 0) {
          return false;
        }
      }
      if (l.compareTo(g) != 0) {
        return false;
      }
    }
  }
  return true;
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                         */
function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}
function ARC4init(d) {
  var c, a, b;
  for (c = 0; c < 256; ++c) {
    this.S[c] = c;
  }
  a = 0;
  for (c = 0; c < 256; ++c) {
    a = a + this.S[c] + d[c % d.length] & 255;
    b = this.S[c];
    this.S[c] = this.S[a];
    this.S[a] = b;
  }
  this.i = 0;
  this.j = 0;
}
function ARC4next() {
  var a;
  this.i = this.i + 1 & 255;
  this.j = this.j + this.S[this.i] & 255;
  a = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = a;
  return this.S[a + this.S[this.i] & 255];
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
  return new Arcfour();
}
var rng_psize = 256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                      */
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(a) {
  rng_pool[rng_pptr++] ^= a & 255;
  rng_pool[rng_pptr++] ^= a >> 8 & 255;
  rng_pool[rng_pptr++] ^= a >> 16 & 255;
  rng_pool[rng_pptr++] ^= a >> 24 & 255;
  if (rng_pptr >= rng_psize) {
    rng_pptr -= rng_psize;
  }
}
function rng_seed_time() {
  rng_seed_int(new Date().getTime());
}
if (rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if (window2.crypto && window2.crypto.getRandomValues) {
    var ua = new Uint8Array(32);
    window2.crypto.getRandomValues(ua);
    for (t = 0; t < 32; ++t) {
      rng_pool[rng_pptr++] = ua[t];
    }
  }
  if (navigator2.appName == "Netscape" && navigator2.appVersion < "5" && window2.crypto && window2.crypto.random) {
    var z = window2.crypto.random(32);
    for (t = 0; t < z.length; ++t) {
      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
    }
  }
  while (rng_pptr < rng_psize) {
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
  }
  rng_pptr = 0;
  rng_seed_time();
}
function rng_get_byte() {
  if (rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  return rng_state.next();
}
function rng_get_bytes(b) {
  var a;
  for (a = 0; a < b.length; ++a) {
    b[a] = rng_get_byte();
  }
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                   */
function parseBigInt(b, a) {
  return new BigInteger(b, a);
}
function linebrk(c, d) {
  var a = "";
  var b = 0;
  while (b + d < c.length) {
    a += c.substring(b, b + d) + "\n";
    b += d;
  }
  return a + c.substring(b, c.length);
}
function byte2Hex(a) {
  if (a < 16) {
    return "0" + a.toString(16);
  } else {
    return a.toString(16);
  }
}
function pkcs1pad2(e, h) {
  if (h < e.length + 11) {
    console.log("Message too long for RSA");
    return null;
  }
  var g = new Array();
  var d = e.length - 1;
  while (d >= 0 && h > 0) {
    var f = e.charCodeAt(d--);
    if (f < 128) {
      g[--h] = f;
    } else {
      if (f > 127 && f < 2048) {
        g[--h] = f & 63 | 128;
        g[--h] = f >> 6 | 192;
      } else {
        g[--h] = f & 63 | 128;
        g[--h] = f >> 6 & 63 | 128;
        g[--h] = f >> 12 | 224;
      }
    }
  }
  g[--h] = 0;
  var b = new SecureRandom();
  var a = new Array();
  while (h > 2) {
    a[0] = 0;
    while (a[0] == 0) {
      b.nextBytes(a);
    }
    g[--h] = a[0];
  }
  g[--h] = 2;
  g[--h] = 0;
  return new BigInteger(g);
}
function oaep_mgf1_arr(c, a, e) {
  var b = "",
  d = 0;
  while (b.length < a) {
    b += e(String.fromCharCode.apply(String, c.concat([(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255])));
    d += 1;
  }
  return b;
}
function oaep_pad(q, a, f, l) {
  var c = KJUR.crypto.MessageDigest;
  var o = KJUR.crypto.Util;
  var b = null;
  if (!f) {
    f = "sha1";
  }
  if (typeof f === "string") {
    b = c.getCanonicalAlgName(f);
    l = c.getHashLength(b);
    f = function f(i) {
      return hextorstr(o.hashString(i, b));
    };
  }
  if (q.length + 2 * l + 2 > a) {
    throw "Message too long for RSA";
  }
  var k = "",
  e;
  for (e = 0; e < a - q.length - 2 * l - 2; e += 1) {
    k += "\x00";
  }
  var h = f("") + k + "\x01" + q;
  var g = new Array(l);
  new SecureRandom().nextBytes(g);
  var j = oaep_mgf1_arr(g, h.length, f);
  var p = [];
  for (e = 0; e < h.length; e += 1) {
    p[e] = h.charCodeAt(e) ^ j.charCodeAt(e);
  }
  var m = oaep_mgf1_arr(p, g.length, f);
  var d = [0];
  for (e = 0; e < g.length; e += 1) {
    d[e + 1] = g[e] ^ m.charCodeAt(e);
  }
  return new BigInteger(d.concat(p));
}
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}
function RSASetPublic(b, a) {
  this.isPublic = true;
  this.isPrivate = false;
  if (typeof b !== "string") {
    this.n = b;
    this.e = a;
  } else {
    if (b != null && a != null && b.length > 0 && a.length > 0) {
      this.n = parseBigInt(b, 16);
      this.e = parseInt(a, 16);
    } else {
      throw "Invalid RSA public key";
    }
  }
}
function RSADoPublic(a) {
  return a.modPowInt(this.e, this.n);
}
function RSAEncrypt(d) {
  var a = pkcs1pad2(d, this.n.bitLength() + 7 >> 3);
  if (a == null) {
    return null;
  }
  var e = this.doPublic(a);
  if (e == null) {
    return null;
  }
  var b = e.toString(16);
  if ((b.length & 1) == 0) {
    return b;
  } else {
    return "0" + b;
  }
}
function RSAEncryptOAEP(f, e, b) {
  var a = oaep_pad(f, this.n.bitLength() + 7 >> 3, e, b);
  if (a == null) {
    return null;
  }
  var g = this.doPublic(a);
  if (g == null) {
    return null;
  }
  var d = g.toString(16);
  if ((d.length & 1) == 0) {
    return d;
  } else {
    return "0" + d;
  }
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;
RSAKey.prototype.type = "RSA";
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                */
function pkcs1unpad2(g, j) {
  var a = g.toByteArray();
  var f = 0;
  while (f < a.length && a[f] == 0) {++f;
  }
  if (a.length - f != j - 1 || a[f] != 2) {
    return null;
  }++f;
  while (a[f] != 0) {
    if (++f >= a.length) {
      return null;
    }
  }
  var e = "";
  while (++f < a.length) {
    var h = a[f] & 255;
    if (h < 128) {
      e += String.fromCharCode(h);
    } else {
      if (h > 191 && h < 224) {
        e += String.fromCharCode((h & 31) << 6 | a[f + 1] & 63);++f;
      } else {
        e += String.fromCharCode((h & 15) << 12 | (a[f + 1] & 63) << 6 | a[f + 2] & 63);
        f += 2;
      }
    }
  }
  return e;
}
function oaep_mgf1_str(c, a, e) {
  var b = "",
  d = 0;
  while (b.length < a) {
    b += e(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]));
    d += 1;
  }
  return b;
}
function oaep_unpad(o, b, g, p) {
  var e = KJUR.crypto.MessageDigest;
  var r = KJUR.crypto.Util;
  var c = null;
  if (!g) {
    g = "sha1";
  }
  if (typeof g === "string") {
    c = e.getCanonicalAlgName(g);
    p = e.getHashLength(c);
    g = function g(d) {
      return hextorstr(r.hashString(d, c));
    };
  }
  o = o.toByteArray();
  var h;
  for (h = 0; h < o.length; h += 1) {
    o[h] &= 255;
  }
  while (o.length < b) {
    o.unshift(0);
  }
  o = String.fromCharCode.apply(String, o);
  if (o.length < 2 * p + 2) {
    throw "Cipher too short";
  }
  var f = o.substr(1, p);
  var s = o.substr(p + 1);
  var q = oaep_mgf1_str(s, p, g);
  var k = [],
  h;
  for (h = 0; h < f.length; h += 1) {
    k[h] = f.charCodeAt(h) ^ q.charCodeAt(h);
  }
  var l = oaep_mgf1_str(String.fromCharCode.apply(String, k), o.length - p, g);
  var j = [];
  for (h = 0; h < s.length; h += 1) {
    j[h] = s.charCodeAt(h) ^ l.charCodeAt(h);
  }
  j = String.fromCharCode.apply(String, j);
  if (j.substr(0, p) !== g("")) {
    throw "Hash mismatch";
  }
  j = j.substr(p);
  var a = j.indexOf("\x01");
  var m = a != -1 ? j.substr(0, a).lastIndexOf("\x00") : -1;
  if (m + 1 != a) {
    throw "Malformed data";
  }
  return j.substr(a + 1);
}
function RSASetPrivate(c, a, b) {
  this.isPrivate = true;
  if (typeof c !== "string") {
    this.n = c;
    this.e = a;
    this.d = b;
  } else {
    if (c != null && a != null && c.length > 0 && a.length > 0) {
      this.n = parseBigInt(c, 16);
      this.e = parseInt(a, 16);
      this.d = parseBigInt(b, 16);
    } else {
      alert("Invalid RSA private key");
    }
  }
}
function RSASetPrivateEx(g, d, e, c, b, a, h, f) {
  this.isPrivate = true;
  this.isPublic = false;
  if (g == null) {
    throw "RSASetPrivateEx N == null";
  }
  if (d == null) {
    throw "RSASetPrivateEx E == null";
  }
  if (g.length == 0) {
    throw "RSASetPrivateEx N.length == 0";
  }
  if (d.length == 0) {
    throw "RSASetPrivateEx E.length == 0";
  }
  if (g != null && d != null && g.length > 0 && d.length > 0) {
    this.n = parseBigInt(g, 16);
    this.e = parseInt(d, 16);
    this.d = parseBigInt(e, 16);
    this.p = parseBigInt(c, 16);
    this.q = parseBigInt(b, 16);
    this.dmp1 = parseBigInt(a, 16);
    this.dmq1 = parseBigInt(h, 16);
    this.coeff = parseBigInt(f, 16);
  } else {
    alert("Invalid RSA private key in RSASetPrivateEx");
  }
}
function RSAGenerate(b, i) {
  var a = new SecureRandom();
  var f = b >> 1;
  this.e = parseInt(i, 16);
  var c = new BigInteger(i, 16);
  for (;;) {
    for (;;) {
      this.p = new BigInteger(b - f, 1, a);
      if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
        break;
      }
    }
    for (;;) {
      this.q = new BigInteger(f, 1, a);
      if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
        break;
      }
    }
    if (this.p.compareTo(this.q) <= 0) {
      var h = this.p;
      this.p = this.q;
      this.q = h;
    }
    var g = this.p.subtract(BigInteger.ONE);
    var d = this.q.subtract(BigInteger.ONE);
    var e = g.multiply(d);
    if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {
      this.n = this.p.multiply(this.q);
      this.d = c.modInverse(e);
      this.dmp1 = this.d.mod(g);
      this.dmq1 = this.d.mod(d);
      this.coeff = this.q.modInverse(this.p);
      break;
    }
  }
  this.isPrivate = true;
}
function RSADoPrivate(a) {
  if (this.p == null || this.q == null) {
    return a.modPow(this.d, this.n);
  }
  var c = a.mod(this.p).modPow(this.dmp1, this.p);
  var b = a.mod(this.q).modPow(this.dmq1, this.q);
  while (c.compareTo(b) < 0) {
    c = c.add(this.p);
  }
  return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b);
}
function RSADecrypt(b) {
  var d = parseBigInt(b, 16);
  var a = this.doPrivate(d);
  if (a == null) {
    return null;
  }
  return pkcs1unpad2(a, this.n.bitLength() + 7 >> 3);
}
function RSADecryptOAEP(e, d, b) {
  var f = parseBigInt(e, 16);
  var a = this.doPrivate(f);
  if (a == null) {
    return null;
  }
  return oaep_unpad(a, this.n.bitLength() + 7 >> 3, d, b);
}
RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.decryptOAEP = RSADecryptOAEP;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                */
function ECFieldElementFp(b, a) {
  this.x = a;
  this.q = b;
}
function feFpEquals(a) {
  if (a == this) {
    return true;
  }
  return this.q.equals(a.q) && this.x.equals(a.x);
}
function feFpToBigInteger() {
  return this.x;
}
function feFpNegate() {
  return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
}
function feFpAdd(a) {
  return new ECFieldElementFp(this.q, this.x.add(a.toBigInteger()).mod(this.q));
}
function feFpSubtract(a) {
  return new ECFieldElementFp(this.q, this.x.subtract(a.toBigInteger()).mod(this.q));
}
function feFpMultiply(a) {
  return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger()).mod(this.q));
}
function feFpSquare() {
  return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
}
function feFpDivide(a) {
  return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q));
}
ECFieldElementFp.prototype.equals = feFpEquals;
ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;
ECFieldElementFp.prototype.negate = feFpNegate;
ECFieldElementFp.prototype.add = feFpAdd;
ECFieldElementFp.prototype.subtract = feFpSubtract;
ECFieldElementFp.prototype.multiply = feFpMultiply;
ECFieldElementFp.prototype.square = feFpSquare;
ECFieldElementFp.prototype.divide = feFpDivide;
function ECPointFp(c, a, d, b) {
  this.curve = c;
  this.x = a;
  this.y = d;
  if (b == null) {
    this.z = BigInteger.ONE;
  } else {
    this.z = b;
  }
  this.zinv = null;
}
function pointFpGetX() {
  if (this.zinv == null) {
    this.zinv = this.z.modInverse(this.curve.q);
  }
  return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}
function pointFpGetY() {
  if (this.zinv == null) {
    this.zinv = this.z.modInverse(this.curve.q);
  }
  return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}
function pointFpEquals(a) {
  if (a == this) {
    return true;
  }
  if (this.isInfinity()) {
    return a.isInfinity();
  }
  if (a.isInfinity()) {
    return this.isInfinity();
  }
  var c, b;
  c = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);
  if (!c.equals(BigInteger.ZERO)) {
    return false;
  }
  b = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
  return b.equals(BigInteger.ZERO);
}
function pointFpIsInfinity() {
  if (this.x == null && this.y == null) {
    return true;
  }
  return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
}
function pointFpNegate() {
  return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
}
function pointFpAdd(l) {
  if (this.isInfinity()) {
    return l;
  }
  if (l.isInfinity()) {
    return this;
  }
  var p = l.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l.z)).mod(this.curve.q);
  var o = l.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l.z)).mod(this.curve.q);
  if (BigInteger.ZERO.equals(o)) {
    if (BigInteger.ZERO.equals(p)) {
      return this.twice();
    }
    return this.curve.getInfinity();
  }
  var j = new BigInteger("3");
  var e = this.x.toBigInteger();
  var n = this.y.toBigInteger();
  var c = l.x.toBigInteger();
  var k = l.y.toBigInteger();
  var m = o.square();
  var i = m.multiply(o);
  var d = e.multiply(m);
  var g = p.square().multiply(this.z);
  var a = g.subtract(d.shiftLeft(1)).multiply(l.z).subtract(i).multiply(o).mod(this.curve.q);
  var h = d.multiply(j).multiply(p).subtract(n.multiply(i)).subtract(g.multiply(p)).multiply(l.z).add(p.multiply(i)).mod(this.curve.q);
  var f = i.multiply(this.z).multiply(l.z).mod(this.curve.q);
  return new ECPointFp(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(h), f);
}
function pointFpTwice() {
  if (this.isInfinity()) {
    return this;
  }
  if (this.y.toBigInteger().signum() == 0) {
    return this.curve.getInfinity();
  }
  var g = new BigInteger("3");
  var c = this.x.toBigInteger();
  var h = this.y.toBigInteger();
  var e = h.multiply(this.z);
  var j = e.multiply(h).mod(this.curve.q);
  var i = this.curve.a.toBigInteger();
  var k = c.square().multiply(g);
  if (!BigInteger.ZERO.equals(i)) {
    k = k.add(this.z.square().multiply(i));
  }
  k = k.mod(this.curve.q);
  var b = k.square().subtract(c.shiftLeft(3).multiply(j)).shiftLeft(1).multiply(e).mod(this.curve.q);
  var f = k.multiply(g).multiply(c).subtract(j.shiftLeft(1)).shiftLeft(2).multiply(j).subtract(k.square().multiply(k)).mod(this.curve.q);
  var d = e.square().multiply(e).shiftLeft(3).mod(this.curve.q);
  return new ECPointFp(this.curve, this.curve.fromBigInteger(b), this.curve.fromBigInteger(f), d);
}
function pointFpMultiply(b) {
  if (this.isInfinity()) {
    return this;
  }
  if (b.signum() == 0) {
    return this.curve.getInfinity();
  }
  var g = b;
  var f = g.multiply(new BigInteger("3"));
  var l = this.negate();
  var d = this;
  var c;
  for (c = f.bitLength() - 2; c > 0; --c) {
    d = d.twice();
    var a = f.testBit(c);
    var j = g.testBit(c);
    if (a != j) {
      d = d.add(a ? this : l);
    }
  }
  return d;
}
function pointFpMultiplyTwo(c, a, b) {
  var d;
  if (c.bitLength() > b.bitLength()) {
    d = c.bitLength() - 1;
  } else {
    d = b.bitLength() - 1;
  }
  var f = this.curve.getInfinity();
  var e = this.add(a);
  while (d >= 0) {
    f = f.twice();
    if (c.testBit(d)) {
      if (b.testBit(d)) {
        f = f.add(e);
      } else {
        f = f.add(this);
      }
    } else {
      if (b.testBit(d)) {
        f = f.add(a);
      }
    }--d;
  }
  return f;
}
ECPointFp.prototype.getX = pointFpGetX;
ECPointFp.prototype.getY = pointFpGetY;
ECPointFp.prototype.equals = pointFpEquals;
ECPointFp.prototype.isInfinity = pointFpIsInfinity;
ECPointFp.prototype.negate = pointFpNegate;
ECPointFp.prototype.add = pointFpAdd;
ECPointFp.prototype.twice = pointFpTwice;
ECPointFp.prototype.multiply = pointFpMultiply;
ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;
function ECCurveFp(e, d, c) {
  this.q = e;
  this.a = this.fromBigInteger(d);
  this.b = this.fromBigInteger(c);
  this.infinity = new ECPointFp(this, null, null);
}
function curveFpGetQ() {
  return this.q;
}
function curveFpGetA() {
  return this.a;
}
function curveFpGetB() {
  return this.b;
}
function curveFpEquals(a) {
  if (a == this) {
    return true;
  }
  return this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b);
}
function curveFpGetInfinity() {
  return this.infinity;
}
function curveFpFromBigInteger(a) {
  return new ECFieldElementFp(this.q, a);
}
function curveFpDecodePointHex(d) {
  switch (parseInt(d.substr(0, 2), 16)) {
    case 0:
      return this.infinity;
    case 2:
    case 3:
      return null;
    case 4:
    case 6:
    case 7:
      var a = (d.length - 2) / 2;
      var c = d.substr(2, a);
      var b = d.substr(a + 2, a);
      return new ECPointFp(this, this.fromBigInteger(new BigInteger(c, 16)), this.fromBigInteger(new BigInteger(b, 16)));
    default:
      return null;}

}
ECCurveFp.prototype.getQ = curveFpGetQ;
ECCurveFp.prototype.getA = curveFpGetA;
ECCurveFp.prototype.getB = curveFpGetB;
ECCurveFp.prototype.equals = curveFpEquals;
ECCurveFp.prototype.getInfinity = curveFpGetInfinity;
ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;
ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
                                                             */
ECFieldElementFp.prototype.getByteLength = function () {
  return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
};
ECPointFp.prototype.getEncoded = function (c) {
  var d = function d(h, f) {
    var g = h.toByteArrayUnsigned();
    if (f < g.length) {
      g = g.slice(g.length - f);
    } else {
      while (f > g.length) {
        g.unshift(0);
      }
    }
    return g;
  };
  var a = this.getX().toBigInteger();
  var e = this.getY().toBigInteger();
  var b = d(a, 32);
  if (c) {
    if (e.isEven()) {
      b.unshift(2);
    } else {
      b.unshift(3);
    }
  } else {
    b.unshift(4);
    b = b.concat(d(e, 32));
  }
  return b;
};
ECPointFp.decodeFrom = function (g, c) {
  var f = c[0];
  var e = c.length - 1;
  var d = c.slice(1, 1 + e / 2);
  var b = c.slice(1 + e / 2, 1 + e);
  d.unshift(0);
  b.unshift(0);
  var a = new BigInteger(d);
  var h = new BigInteger(b);
  return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h));
};
ECPointFp.decodeFromHex = function (g, c) {
  var f = c.substr(0, 2);
  var e = c.length - 2;
  var d = c.substr(2, e / 2);
  var b = c.substr(2 + e / 2, e / 2);
  var a = new BigInteger(d, 16);
  var h = new BigInteger(b, 16);
  return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h));
};
ECPointFp.prototype.add2D = function (c) {
  if (this.isInfinity()) {
    return c;
  }
  if (c.isInfinity()) {
    return this;
  }
  if (this.x.equals(c.x)) {
    if (this.y.equals(c.y)) {
      return this.twice();
    }
    return this.curve.getInfinity();
  }
  var g = c.x.subtract(this.x);
  var e = c.y.subtract(this.y);
  var a = e.divide(g);
  var d = a.square().subtract(this.x).subtract(c.x);
  var f = a.multiply(this.x.subtract(d)).subtract(this.y);
  return new ECPointFp(this.curve, d, f);
};
ECPointFp.prototype.twice2D = function () {
  if (this.isInfinity()) {
    return this;
  }
  if (this.y.toBigInteger().signum() == 0) {
    return this.curve.getInfinity();
  }
  var b = this.curve.fromBigInteger(BigInteger.valueOf(2));
  var e = this.curve.fromBigInteger(BigInteger.valueOf(3));
  var a = this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(b));
  var c = a.square().subtract(this.x.multiply(b));
  var d = a.multiply(this.x.subtract(c)).subtract(this.y);
  return new ECPointFp(this.curve, c, d);
};
ECPointFp.prototype.multiply2D = function (b) {
  if (this.isInfinity()) {
    return this;
  }
  if (b.signum() == 0) {
    return this.curve.getInfinity();
  }
  var g = b;
  var f = g.multiply(new BigInteger("3"));
  var l = this.negate();
  var d = this;
  var c;
  for (c = f.bitLength() - 2; c > 0; --c) {
    d = d.twice();
    var a = f.testBit(c);
    var j = g.testBit(c);
    if (a != j) {
      d = d.add2D(a ? this : l);
    }
  }
  return d;
};
ECPointFp.prototype.isOnCurve = function () {
  var d = this.getX().toBigInteger();
  var i = this.getY().toBigInteger();
  var f = this.curve.getA().toBigInteger();
  var c = this.curve.getB().toBigInteger();
  var h = this.curve.getQ();
  var e = i.multiply(i).mod(h);
  var g = d.multiply(d).multiply(d).add(f.multiply(d)).add(c).mod(h);
  return e.equals(g);
};
ECPointFp.prototype.toString = function () {
  return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")";
};
ECPointFp.prototype.validate = function () {
  var c = this.curve.getQ();
  if (this.isInfinity()) {
    throw new Error("Point is at infinity.");
  }
  var a = this.getX().toBigInteger();
  var b = this.getY().toBigInteger();
  if (a.compareTo(BigInteger.ONE) < 0 || a.compareTo(c.subtract(BigInteger.ONE)) > 0) {
    throw new Error("x coordinate out of bounds");
  }
  if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(c.subtract(BigInteger.ONE)) > 0) {
    throw new Error("y coordinate out of bounds");
  }
  if (!this.isOnCurve()) {
    throw new Error("Point is not on the curve.");
  }
  if (this.multiply(c).isInfinity()) {
    throw new Error("Point is not a scalar multiple of G.");
  }
  return true;
};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
    */
var jsonParse = function () {
  var e = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
  var j = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
  var i = '(?:"' + j + '*")';
  var d = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e + "|" + i + ")", "g");
  var k = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
  var g = {
    '"': '"',
    "/": "/",
    "\\": "\\",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t" };

  function h(l, m, n) {
    return m ? g[m] : String.fromCharCode(parseInt(n, 16));
  }
  var c = new String("");
  var a = "\\";
  var f = {
    "{": Object,
    "[": Array };

  var b = Object.hasOwnProperty;
  return function (u, q) {
    var p = u.match(d);
    var x;
    var v = p[0];
    var l = false;
    if ("{" === v) {
      x = {};
    } else {
      if ("[" === v) {
        x = [];
      } else {
        x = [];
        l = true;
      }
    }
    var t;
    var r = [x];
    for (var o = 1 - l,
    m = p.length; o < m; ++o) {
      v = p[o];
      var w;
      switch (v.charCodeAt(0)) {
        default:
          w = r[0];
          w[t || w.length] = +v;
          t = void 0;
          break;
        case 34:
          v = v.substring(1, v.length - 1);
          if (v.indexOf(a) !== -1) {
            v = v.replace(k, h);
          }
          w = r[0];
          if (!t) {
            if (w instanceof Array) {
              t = w.length;
            } else {
              t = v || c;
              break;
            }
          }
          w[t] = v;
          t = void 0;
          break;
        case 91:
          w = r[0];
          r.unshift(w[t || w.length] = []);
          t = void 0;
          break;
        case 93:
          r.shift();
          break;
        case 102:
          w = r[0];
          w[t || w.length] = false;
          t = void 0;
          break;
        case 110:
          w = r[0];
          w[t || w.length] = null;
          t = void 0;
          break;
        case 116:
          w = r[0];
          w[t || w.length] = true;
          t = void 0;
          break;
        case 123:
          w = r[0];
          r.unshift(w[t || w.length] = {});
          t = void 0;
          break;
        case 125:
          r.shift();
          break;}

    }
    if (l) {
      if (r.length !== 1) {
        throw new Error();
      }
      x = x[0];
    } else {
      if (r.length) {
        throw new Error();
      }
    }
    if (q) {
      var s = function s(C, B) {
        var D = C[B];
        if (D && typeof D === "object") {
          var n = null;
          for (var z in D) {
            if (b.call(D, z) && D !== C) {
              var y = s(D, z);
              if (y !== void 0) {
                D[z] = y;
              } else {
                if (!n) {
                  n = [];
                }
                n.push(z);
              }
            }
          }
          if (n) {
            for (var A = n.length; --A >= 0;) {
              delete D[n[A]];
            }
          }
        }
        return q.call(C, B, D);
      };
      x = s({
        "": x },

      "");
    }
    return x;
  };
}();
/*! asn1-1.0.12.js (c) 2013-2016 Kenji Urushima | kjur.github.com/jsrsasign/license
      */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
KJUR.asn1.ASN1Util = new
function () {
  this.integerToByteHex = function (a) {
    var b = a.toString(16);
    if (b.length % 2 == 1) {
      b = "0" + b;
    }
    return b;
  };
  this.bigIntToMinTwosComplementsHex = function (j) {
    var f = j.toString(16);
    if (f.substr(0, 1) != "-") {
      if (f.length % 2 == 1) {
        f = "0" + f;
      } else {
        if (!f.match(/^[0-7]/)) {
          f = "00" + f;
        }
      }
    } else {
      var a = f.substr(1);
      var e = a.length;
      if (e % 2 == 1) {
        e += 1;
      } else {
        if (!f.match(/^[0-7]/)) {
          e += 2;
        }
      }
      var g = "";
      for (var d = 0; d < e; d++) {
        g += "f";
      }
      var c = new BigInteger(g, 16);
      var b = c.xor(j).add(BigInteger.ONE);
      f = b.toString(16).replace(/^-/, "");
    }
    return f;
  };
  this.getPEMStringFromHex = function (a, b) {
    var c = hextob64(a);
    var d = c.replace(/(.{64})/g, "$1\r\n");
    d = d.replace(/\r\n$/, "");
    return "-----BEGIN " + b + "-----\r\n" + d + "\r\n-----END " + b + "-----\r\n";
  };
  this.newObject = function (b) {
    var g = KJUR.asn1;
    var k = Object.keys(b);
    if (k.length != 1) {
      throw "key of param shall be only one.";
    }
    var j = k[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + j + ":") == -1) {
      throw "undefined key: " + j;
    }
    if (j == "bool") {
      return new g.DERBoolean(b[j]);
    }
    if (j == "int") {
      return new g.DERInteger(b[j]);
    }
    if (j == "bitstr") {
      return new g.DERBitString(b[j]);
    }
    if (j == "octstr") {
      return new g.DEROctetString(b[j]);
    }
    if (j == "null") {
      return new g.DERNull(b[j]);
    }
    if (j == "oid") {
      return new g.DERObjectIdentifier(b[j]);
    }
    if (j == "enum") {
      return new g.DEREnumerated(b[j]);
    }
    if (j == "utf8str") {
      return new g.DERUTF8String(b[j]);
    }
    if (j == "numstr") {
      return new g.DERNumericString(b[j]);
    }
    if (j == "prnstr") {
      return new g.DERPrintableString(b[j]);
    }
    if (j == "telstr") {
      return new g.DERTeletexString(b[j]);
    }
    if (j == "ia5str") {
      return new g.DERIA5String(b[j]);
    }
    if (j == "utctime") {
      return new g.DERUTCTime(b[j]);
    }
    if (j == "gentime") {
      return new g.DERGeneralizedTime(b[j]);
    }
    if (j == "seq") {
      var m = b[j];
      var h = [];
      for (var e = 0; e < m.length; e++) {
        var l = g.ASN1Util.newObject(m[e]);
        h.push(l);
      }
      return new g.DERSequence({
        array: h });

    }
    if (j == "set") {
      var m = b[j];
      var h = [];
      for (var e = 0; e < m.length; e++) {
        var l = g.ASN1Util.newObject(m[e]);
        h.push(l);
      }
      return new g.DERSet({
        array: h });

    }
    if (j == "tag") {
      var c = b[j];
      if (Object.prototype.toString.call(c) === "[object Array]" && c.length == 3) {
        var d = g.ASN1Util.newObject(c[2]);
        return new g.DERTaggedObject({
          tag: c[0],
          explicit: c[1],
          obj: d });

      } else {
        var f = {};
        if (c.explicit !== undefined) {
          f.explicit = c.explicit;
        }
        if (c.tag !== undefined) {
          f.tag = c.tag;
        }
        if (c.obj === undefined) {
          throw "obj shall be specified for 'tag'.";
        }
        f.obj = g.ASN1Util.newObject(c.obj);
        return new g.DERTaggedObject(f);
      }
    }
  };
  this.jsonToASN1HEX = function (b) {
    var a = this.newObject(b);
    return a.getEncodedHex();
  };
}();
KJUR.asn1.ASN1Util.oidHexToInt = function (a) {
  var j = "";
  var k = parseInt(a.substr(0, 2), 16);
  var d = Math.floor(k / 40);
  var c = k % 40;
  var j = d + "." + c;
  var e = "";
  for (var f = 2; f < a.length; f += 2) {
    var g = parseInt(a.substr(f, 2), 16);
    var h = ("00000000" + g.toString(2)).slice(-8);
    e = e + h.substr(1, 7);
    if (h.substr(0, 1) == "0") {
      var b = new BigInteger(e, 2);
      j = j + "." + b.toString(10);
      e = "";
    }
  }
  return j;
};
KJUR.asn1.ASN1Util.oidIntToHex = function (f) {
  var e = function e(a) {
    var k = a.toString(16);
    if (k.length == 1) {
      k = "0" + k;
    }
    return k;
  };
  var d = function d(o) {
    var n = "";
    var k = new BigInteger(o, 10);
    var a = k.toString(2);
    var l = 7 - a.length % 7;
    if (l == 7) {
      l = 0;
    }
    var q = "";
    for (var m = 0; m < l; m++) {
      q += "0";
    }
    a = q + a;
    for (var m = 0; m < a.length - 1; m += 7) {
      var p = a.substr(m, 7);
      if (m != a.length - 7) {
        p = "1" + p;
      }
      n += e(parseInt(p, 2));
    }
    return n;
  };
  if (!f.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + f;
  }
  var g = "";
  var b = f.split(".");
  var j = parseInt(b[0]) * 40 + parseInt(b[1]);
  g += e(j);
  b.splice(0, 2);
  for (var c = 0; c < b.length; c++) {
    g += d(b[c]);
  }
  return g;
};
KJUR.asn1.ASN1Object = function () {
  var c = true;
  var b = null;
  var d = "00";
  var e = "00";
  var a = "";
  this.getLengthHexFromValue = function () {
    if (typeof this.hV == "undefined" || this.hV == null) {
      throw "this.hV is null or undefined.";
    }
    if (this.hV.length % 2 == 1) {
      throw "value hex must be even length: n=" + a.length + ",v=" + this.hV;
    }
    var i = this.hV.length / 2;
    var h = i.toString(16);
    if (h.length % 2 == 1) {
      h = "0" + h;
    }
    if (i < 128) {
      return h;
    } else {
      var g = h.length / 2;
      if (g > 15) {
        throw "ASN.1 length too long to represent by 8x: n = " + i.toString(16);
      }
      var f = 128 + g;
      return f.toString(16) + h;
    }
  };
  this.getEncodedHex = function () {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
    }
    return this.hTLV;
  };
  this.getValueHex = function () {
    this.getEncodedHex();
    return this.hV;
  };
  this.getFreshValueHex = function () {
    return "";
  };
};
KJUR.asn1.DERAbstractString = function (c) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  var b = null;
  var a = null;
  this.getString = function () {
    return this.s;
  };
  this.setString = function (d) {
    this.hTLV = null;
    this.isModified = true;
    this.s = d;
    this.hV = stohex(this.s);
  };
  this.setStringHex = function (d) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = d;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof c != "undefined") {
    if (typeof c == "string") {
      this.setString(c);
    } else {
      if (typeof c.str != "undefined") {
        this.setString(c.str);
      } else {
        if (typeof c.hex != "undefined") {
          this.setStringHex(c.hex);
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function (c) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  var b = null;
  var a = null;
  this.localDateToUTC = function (f) {
    utc = f.getTime() + f.getTimezoneOffset() * 60000;
    var e = new Date(utc);
    return e;
  };
  this.formatDate = function (m, o, e) {
    var g = this.zeroPadding;
    var n = this.localDateToUTC(m);
    var p = String(n.getFullYear());
    if (o == "utc") {
      p = p.substr(2, 2);
    }
    var l = g(String(n.getMonth() + 1), 2);
    var q = g(String(n.getDate()), 2);
    var h = g(String(n.getHours()), 2);
    var i = g(String(n.getMinutes()), 2);
    var j = g(String(n.getSeconds()), 2);
    var r = p + l + q + h + i + j;
    if (e === true) {
      var f = n.getMilliseconds();
      if (f != 0) {
        var k = g(String(f), 3);
        k = k.replace(/[0]+$/, "");
        r = r + "." + k;
      }
    }
    return r + "Z";
  };
  this.zeroPadding = function (e, d) {
    if (e.length >= d) {
      return e;
    }
    return new Array(d - e.length + 1).join("0") + e;
  };
  this.getString = function () {
    return this.s;
  };
  this.setString = function (d) {
    this.hTLV = null;
    this.isModified = true;
    this.s = d;
    this.hV = stohex(d);
  };
  this.setByDateValue = function (h, j, e, d, f, g) {
    var i = new Date(Date.UTC(h, j - 1, e, d, f, g, 0));
    this.setByDate(i);
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function (b) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  var a = null;
  this.setByASN1ObjectArray = function (c) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = c;
  };
  this.appendASN1Object = function (c) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(c);
  };
  this.asn1Array = new Array();
  if (typeof b != "undefined") {
    if (typeof b.array != "undefined") {
      this.asn1Array = b.array;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBoolean = function () {
  KJUR.asn1.DERBoolean.superclass.constructor.call(this);
  this.hT = "01";
  this.hTLV = "0101ff";
};
YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
KJUR.asn1.DERInteger = function (a) {
  KJUR.asn1.DERInteger.superclass.constructor.call(this);
  this.hT = "02";
  this.setByBigInteger = function (b) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);
  };
  this.setByInteger = function (c) {
    var b = new BigInteger(String(c), 10);
    this.setByBigInteger(b);
  };
  this.setValueHex = function (b) {
    this.hV = b;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof a != "undefined") {
    if (typeof a.bigint != "undefined") {
      this.setByBigInteger(a.bigint);
    } else {
      if (typeof a["int"] != "undefined") {
        this.setByInteger(a["int"]);
      } else {
        if (typeof a == "number") {
          this.setByInteger(a);
        } else {
          if (typeof a.hex != "undefined") {
            this.setValueHex(a.hex);
          }
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function (b) {
  if (b !== undefined && typeof b.obj !== "undefined") {
    var a = KJUR.asn1.ASN1Util.newObject(b.obj);
    b.hex = "00" + a.getEncodedHex();
  }
  KJUR.asn1.DERBitString.superclass.constructor.call(this);
  this.hT = "03";
  this.setHexValueIncludingUnusedBits = function (c) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = c;
  };
  this.setUnusedBitsAndHexValue = function (c, e) {
    if (c < 0 || 7 < c) {
      throw "unused bits shall be from 0 to 7: u = " + c;
    }
    var d = "0" + c;
    this.hTLV = null;
    this.isModified = true;
    this.hV = d + e;
  };
  this.setByBinaryString = function (e) {
    e = e.replace(/0+$/, "");
    var f = 8 - e.length % 8;
    if (f == 8) {
      f = 0;
    }
    for (var g = 0; g <= f; g++) {
      e += "0";
    }
    var j = "";
    for (var g = 0; g < e.length - 1; g += 8) {
      var d = e.substr(g, 8);
      var c = parseInt(d, 2).toString(16);
      if (c.length == 1) {
        c = "0" + c;
      }
      j += c;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = "0" + f + j;
  };
  this.setByBooleanArray = function (e) {
    var d = "";
    for (var c = 0; c < e.length; c++) {
      if (e[c] == true) {
        d += "1";
      } else {
        d += "0";
      }
    }
    this.setByBinaryString(d);
  };
  this.newFalseArray = function (e) {
    var c = new Array(e);
    for (var d = 0; d < e; d++) {
      c[d] = false;
    }
    return c;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof b != "undefined") {
    if (typeof b == "string" && b.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(b);
    } else {
      if (typeof b.hex != "undefined") {
        this.setHexValueIncludingUnusedBits(b.hex);
      } else {
        if (typeof b.bin != "undefined") {
          this.setByBinaryString(b.bin);
        } else {
          if (typeof b.array != "undefined") {
            this.setByBooleanArray(b.array);
          }
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function (b) {
  if (b !== undefined && typeof b.obj !== "undefined") {
    var a = KJUR.asn1.ASN1Util.newObject(b.obj);
    b.hex = a.getEncodedHex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, b);
  this.hT = "04";
};
YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function () {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function (c) {
  var b = function b(d) {
    var e = d.toString(16);
    if (e.length == 1) {
      e = "0" + e;
    }
    return e;
  };
  var a = function a(k) {
    var j = "";
    var e = new BigInteger(k, 10);
    var d = e.toString(2);
    var f = 7 - d.length % 7;
    if (f == 7) {
      f = 0;
    }
    var m = "";
    for (var g = 0; g < f; g++) {
      m += "0";
    }
    d = m + d;
    for (var g = 0; g < d.length - 1; g += 7) {
      var l = d.substr(g, 7);
      if (g != d.length - 7) {
        l = "1" + l;
      }
      j += b(parseInt(l, 2));
    }
    return j;
  };
  KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
  this.hT = "06";
  this.setValueHex = function (d) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = d;
  };
  this.setValueOidString = function (f) {
    if (!f.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + f;
    }
    var g = "";
    var d = f.split(".");
    var j = parseInt(d[0]) * 40 + parseInt(d[1]);
    g += b(j);
    d.splice(0, 2);
    for (var e = 0; e < d.length; e++) {
      g += a(d[e]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = g;
  };
  this.setValueName = function (e) {
    var d = KJUR.asn1.x509.OID.name2oid(e);
    if (d !== "") {
      this.setValueOidString(d);
    } else {
      throw "DERObjectIdentifier oidName undefined: " + e;
    }
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (c !== undefined) {
    if (typeof c === "string") {
      if (c.match(/^[0-2].[0-9.]+$/)) {
        this.setValueOidString(c);
      } else {
        this.setValueName(c);
      }
    } else {
      if (c.oid !== undefined) {
        this.setValueOidString(c.oid);
      } else {
        if (c.hex !== undefined) {
          this.setValueHex(c.hex);
        } else {
          if (c.name !== undefined) {
            this.setValueName(c.name);
          }
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DEREnumerated = function (a) {
  KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
  this.hT = "0a";
  this.setByBigInteger = function (b) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);
  };
  this.setByInteger = function (c) {
    var b = new BigInteger(String(c), 10);
    this.setByBigInteger(b);
  };
  this.setValueHex = function (b) {
    this.hV = b;
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof a != "undefined") {
    if (typeof a["int"] != "undefined") {
      this.setByInteger(a["int"]);
    } else {
      if (typeof a == "number") {
        this.setByInteger(a);
      } else {
        if (typeof a.hex != "undefined") {
          this.setValueHex(a.hex);
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function (a) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);
  this.hT = "0c";
};
YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function (a) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);
  this.hT = "12";
};
YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function (a) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);
  this.hT = "13";
};
YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function (a) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);
  this.hT = "14";
};
YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function (a) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);
  this.hT = "16";
};
YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function (a) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);
  this.hT = "17";
  this.setByDate = function (b) {
    this.hTLV = null;
    this.isModified = true;
    this.date = b;
    this.s = this.formatDate(this.date, "utc");
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function () {
    if (typeof this.date == "undefined" && typeof this.s == "undefined") {
      this.date = new Date();
      this.s = this.formatDate(this.date, "utc");
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (a !== undefined) {
    if (a.str !== undefined) {
      this.setString(a.str);
    } else {
      if (typeof a == "string" && a.match(/^[0-9]{12}Z$/)) {
        this.setString(a);
      } else {
        if (a.hex !== undefined) {
          this.setStringHex(a.hex);
        } else {
          if (a.date !== undefined) {
            this.setByDate(a.date);
          }
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function (a) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);
  this.hT = "18";
  this.withMillis = false;
  this.setByDate = function (b) {
    this.hTLV = null;
    this.isModified = true;
    this.date = b;
    this.s = this.formatDate(this.date, "gen", this.withMillis);
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function () {
    if (this.date === undefined && this.s === undefined) {
      this.date = new Date();
      this.s = this.formatDate(this.date, "gen", this.withMillis);
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (a !== undefined) {
    if (a.str !== undefined) {
      this.setString(a.str);
    } else {
      if (typeof a == "string" && a.match(/^[0-9]{14}Z$/)) {
        this.setString(a);
      } else {
        if (a.hex !== undefined) {
          this.setStringHex(a.hex);
        } else {
          if (a.date !== undefined) {
            this.setByDate(a.date);
          }
        }
      }
    }
    if (a.millis === true) {
      this.withMillis = true;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function (a) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, a);
  this.hT = "30";
  this.getFreshValueHex = function () {
    var c = "";
    for (var b = 0; b < this.asn1Array.length; b++) {
      var d = this.asn1Array[b];
      c += d.getEncodedHex();
    }
    this.hV = c;
    return this.hV;
  };
};
YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function (a) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, a);
  this.hT = "31";
  this.sortFlag = true;
  this.getFreshValueHex = function () {
    var b = new Array();
    for (var c = 0; c < this.asn1Array.length; c++) {
      var d = this.asn1Array[c];
      b.push(d.getEncodedHex());
    }
    if (this.sortFlag == true) {
      b.sort();
    }
    this.hV = b.join("");
    return this.hV;
  };
  if (typeof a != "undefined") {
    if (typeof a.sortflag != "undefined" && a.sortflag == false) {
      this.sortFlag = false;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function (a) {
  KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
  this.hT = "a0";
  this.hV = "";
  this.isExplicit = true;
  this.asn1Object = null;
  this.setASN1Object = function (b, c, d) {
    this.hT = c;
    this.isExplicit = b;
    this.asn1Object = d;
    if (this.isExplicit) {
      this.hV = this.asn1Object.getEncodedHex();
      this.hTLV = null;
      this.isModified = true;
    } else {
      this.hV = null;
      this.hTLV = d.getEncodedHex();
      this.hTLV = this.hTLV.replace(/^../, c);
      this.isModified = false;
    }
  };
  this.getFreshValueHex = function () {
    return this.hV;
  };
  if (typeof a != "undefined") {
    if (typeof a.tag != "undefined") {
      this.hT = a.tag;
    }
    if (typeof a.explicit != "undefined") {
      this.isExplicit = a.explicit;
    }
    if (typeof a.obj != "undefined") {
      this.asn1Object = a.obj;
      this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
/*! asn1hex-1.1.9.js (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
                                                                     */
var ASN1HEX = new
function () {}();
ASN1HEX.getByteLengthOfL_AtObj = function (b, c) {
  if (b.substring(c + 2, c + 3) != "8") {
    return 1;
  }
  var a = parseInt(b.substring(c + 3, c + 4));
  if (a == 0) {
    return -1;
  }
  if (0 < a && a < 10) {
    return a + 1;
  }
  return -2;
};
ASN1HEX.getHexOfL_AtObj = function (b, c) {
  var a = ASN1HEX.getByteLengthOfL_AtObj(b, c);
  if (a < 1) {
    return "";
  }
  return b.substring(c + 2, c + 2 + a * 2);
};
ASN1HEX.getIntOfL_AtObj = function (c, d) {
  var b = ASN1HEX.getHexOfL_AtObj(c, d);
  if (b == "") {
    return -1;
  }
  var a;
  if (parseInt(b.substring(0, 1)) < 8) {
    a = new BigInteger(b, 16);
  } else {
    a = new BigInteger(b.substring(2), 16);
  }
  return a.intValue();
};
ASN1HEX.getStartPosOfV_AtObj = function (b, c) {
  var a = ASN1HEX.getByteLengthOfL_AtObj(b, c);
  if (a < 0) {
    return a;
  }
  return c + (a + 1) * 2;
};
ASN1HEX.getHexOfV_AtObj = function (c, d) {
  var b = ASN1HEX.getStartPosOfV_AtObj(c, d);
  var a = ASN1HEX.getIntOfL_AtObj(c, d);
  return c.substring(b, b + a * 2);
};
ASN1HEX.getHexOfTLV_AtObj = function (c, e) {
  var b = c.substr(e, 2);
  var d = ASN1HEX.getHexOfL_AtObj(c, e);
  var a = ASN1HEX.getHexOfV_AtObj(c, e);
  return b + d + a;
};
ASN1HEX.getPosOfNextSibling_AtObj = function (c, d) {
  var b = ASN1HEX.getStartPosOfV_AtObj(c, d);
  var a = ASN1HEX.getIntOfL_AtObj(c, d);
  return b + a * 2;
};
ASN1HEX.getPosArrayOfChildren_AtObj = function (f, j) {
  var c = new Array();
  var i = ASN1HEX.getStartPosOfV_AtObj(f, j);
  if (f.substr(j, 2) == "03") {
    c.push(i + 2);
  } else {
    c.push(i);
  }
  var b = ASN1HEX.getIntOfL_AtObj(f, j);
  var g = i;
  var d = 0;
  while (1) {
    var e = ASN1HEX.getPosOfNextSibling_AtObj(f, g);
    if (e == null || e - i >= b * 2) {
      break;
    }
    if (d >= 200) {
      break;
    }
    c.push(e);
    g = e;
    d++;
  }
  return c;
};
ASN1HEX.getNthChildIndex_AtObj = function (d, b, e) {
  var c = ASN1HEX.getPosArrayOfChildren_AtObj(d, b);
  return c[e];
};
ASN1HEX.getDecendantIndexByNthList = function (e, d, c) {
  if (c.length == 0) {
    return d;
  }
  var f = c.shift();
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(e, d);
  return ASN1HEX.getDecendantIndexByNthList(e, b[f], c);
};
ASN1HEX.getDecendantHexTLVByNthList = function (d, c, b) {
  var a = ASN1HEX.getDecendantIndexByNthList(d, c, b);
  return ASN1HEX.getHexOfTLV_AtObj(d, a);
};
ASN1HEX.getDecendantHexVByNthList = function (d, c, b) {
  var a = ASN1HEX.getDecendantIndexByNthList(d, c, b);
  return ASN1HEX.getHexOfV_AtObj(d, a);
};
ASN1HEX.getVbyList = function (d, c, b, e) {
  var a = ASN1HEX.getDecendantIndexByNthList(d, c, b);
  if (a === undefined) {
    throw "can't find nthList object";
  }
  if (e !== undefined) {
    if (d.substr(a, 2) != e) {
      throw "checking tag doesn't match: " + d.substr(a, 2) + "!=" + e;
    }
  }
  return ASN1HEX.getHexOfV_AtObj(d, a);
};
ASN1HEX.hextooidstr = function (e) {
  var h = function h(b, a) {
    if (b.length >= a) {
      return b;
    }
    return new Array(a - b.length + 1).join("0") + b;
  };
  var l = [];
  var o = e.substr(0, 2);
  var f = parseInt(o, 16);
  l[0] = new String(Math.floor(f / 40));
  l[1] = new String(f % 40);
  var m = e.substr(2);
  var k = [];
  for (var g = 0; g < m.length / 2; g++) {
    k.push(parseInt(m.substr(g * 2, 2), 16));
  }
  var j = [];
  var d = "";
  for (var g = 0; g < k.length; g++) {
    if (k[g] & 128) {
      d = d + h((k[g] & 127).toString(2), 7);
    } else {
      d = d + h((k[g] & 127).toString(2), 7);
      j.push(new String(parseInt(d, 2)));
      d = "";
    }
  }
  var n = l.join(".");
  if (j.length > 0) {
    n = n + "." + j.join(".");
  }
  return n;
};
ASN1HEX.dump = function (q, c, k, g) {
  var e = q;
  if (q instanceof KJUR.asn1.ASN1Object) {
    e = q.getEncodedHex();
  }
  var o = function o(x, i) {
    if (x.length <= i * 2) {
      return x;
    } else {
      var v = x.substr(0, i) + "..(total " + x.length / 2 + "bytes).." + x.substr(x.length - i, i);
      return v;
    }
  };
  if (c === undefined) {
    c = {
      ommit_long_octet: 32 };

  }
  if (k === undefined) {
    k = 0;
  }
  if (g === undefined) {
    g = "";
  }
  var t = c.ommit_long_octet;
  if (e.substr(k, 2) == "01") {
    var h = ASN1HEX.getHexOfV_AtObj(e, k);
    if (h == "00") {
      return g + "BOOLEAN FALSE\n";
    } else {
      return g + "BOOLEAN TRUE\n";
    }
  }
  if (e.substr(k, 2) == "02") {
    var h = ASN1HEX.getHexOfV_AtObj(e, k);
    return g + "INTEGER " + o(h, t) + "\n";
  }
  if (e.substr(k, 2) == "03") {
    var h = ASN1HEX.getHexOfV_AtObj(e, k);
    return g + "BITSTRING " + o(h, t) + "\n";
  }
  if (e.substr(k, 2) == "04") {
    var h = ASN1HEX.getHexOfV_AtObj(e, k);
    if (ASN1HEX.isASN1HEX(h)) {
      var j = g + "OCTETSTRING, encapsulates\n";
      j = j + ASN1HEX.dump(h, c, 0, g + "  ");
      return j;
    } else {
      return g + "OCTETSTRING " + o(h, t) + "\n";
    }
  }
  if (e.substr(k, 2) == "05") {
    return g + "NULL\n";
  }
  if (e.substr(k, 2) == "06") {
    var l = ASN1HEX.getHexOfV_AtObj(e, k);
    var a = KJUR.asn1.ASN1Util.oidHexToInt(l);
    var n = KJUR.asn1.x509.OID.oid2name(a);
    var b = a.replace(/\./g, " ");
    if (n != "") {
      return g + "ObjectIdentifier " + n + " (" + b + ")\n";
    } else {
      return g + "ObjectIdentifier (" + b + ")\n";
    }
  }
  if (e.substr(k, 2) == "0c") {
    return g + "UTF8String '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n";
  }
  if (e.substr(k, 2) == "13") {
    return g + "PrintableString '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n";
  }
  if (e.substr(k, 2) == "14") {
    return g + "TeletexString '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n";
  }
  if (e.substr(k, 2) == "16") {
    return g + "IA5String '" + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "'\n";
  }
  if (e.substr(k, 2) == "17") {
    return g + "UTCTime " + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "\n";
  }
  if (e.substr(k, 2) == "18") {
    return g + "GeneralizedTime " + hextoutf8(ASN1HEX.getHexOfV_AtObj(e, k)) + "\n";
  }
  if (e.substr(k, 2) == "30") {
    if (e.substr(k, 4) == "3000") {
      return g + "SEQUENCE {}\n";
    }
    var j = g + "SEQUENCE\n";
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, k);
    var f = c;
    if ((d.length == 2 || d.length == 3) && e.substr(d[0], 2) == "06" && e.substr(d[d.length - 1], 2) == "04") {
      var u = ASN1HEX.getHexOfV_AtObj(e, d[0]);
      var a = KJUR.asn1.ASN1Util.oidHexToInt(u);
      var n = KJUR.asn1.x509.OID.oid2name(a);
      var p = JSON.parse(JSON.stringify(c));
      p.x509ExtName = n;
      f = p;
    }
    for (var r = 0; r < d.length; r++) {
      j = j + ASN1HEX.dump(e, f, d[r], g + "  ");
    }
    return j;
  }
  if (e.substr(k, 2) == "31") {
    var j = g + "SET\n";
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, k);
    for (var r = 0; r < d.length; r++) {
      j = j + ASN1HEX.dump(e, c, d[r], g + "  ");
    }
    return j;
  }
  var w = parseInt(e.substr(k, 2), 16);
  if ((w & 128) != 0) {
    var m = w & 31;
    if ((w & 32) != 0) {
      var j = g + "[" + m + "]\n";
      var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, k);
      for (var r = 0; r < d.length; r++) {
        j = j + ASN1HEX.dump(e, c, d[r], g + "  ");
      }
      return j;
    } else {
      var h = ASN1HEX.getHexOfV_AtObj(e, k);
      if (h.substr(0, 8) == "68747470") {
        h = hextoutf8(h);
      }
      if (c.x509ExtName === "subjectAltName" && m == 2) {
        h = hextoutf8(h);
      }
      var j = g + "[" + m + "] " + h + "\n";
      return j;
    }
  }
  return g + "UNKNOWN(" + e.substr(k, 2) + ") " + ASN1HEX.getHexOfV_AtObj(e, k) + "\n";
};
ASN1HEX.isASN1HEX = function (d) {
  if (d.length % 2 == 1) {
    return false;
  }
  var c = ASN1HEX.getIntOfL_AtObj(d, 0);
  var b = d.substr(0, 2);
  var e = ASN1HEX.getHexOfL_AtObj(d, 0);
  var a = d.length - b.length - e.length;
  if (a == c * 2) {
    return true;
  }
  return false;
};
ASN1HEX.pemToHex = function (b, d) {
  if (b.indexOf("-----BEGIN ") == -1) {
    throw "can't find PEM header: " + d;
  }
  if (d !== undefined) {
    b = b.replace("-----BEGIN " + d + "-----", "");
    b = b.replace("-----END " + d + "-----", "");
  } else {
    b = b.replace(/-----BEGIN [^-]+-----/, "");
    b = b.replace(/-----END [^-]+-----/, "");
  }
  var c = b.replace(/\s+/g, "");
  var a = b64tohex(c);
  return a;
};
/*! asn1x509-1.0.22.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.x509 == "undefined" || !KJUR.asn1.x509) {
  KJUR.asn1.x509 = {};
}
KJUR.asn1.x509.Certificate = function (g) {
  KJUR.asn1.x509.Certificate.superclass.constructor.call(this);
  var b = null;
  var d = null;
  var f = null;
  var c = null;
  var a = null;
  var e = null;
  this.setRsaPrvKeyByPEMandPass = function (i, k) {
    var h = PKCS5PKEY.getDecryptedKeyHex(i, k);
    var j = new RSAKey();
    j.readPrivateKeyFromASN1HexString(h);
    this.prvKey = j;
  };
  this.sign = function () {
    this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
    var i = new KJUR.crypto.Signature({
      alg: this.asn1SignatureAlg.nameAlg });

    i.init(this.prvKey);
    i.updateHex(this.asn1TBSCert.getEncodedHex());
    this.hexSig = i.sign();
    this.asn1Sig = new KJUR.asn1.DERBitString({
      hex: "00" + this.hexSig });

    var h = new KJUR.asn1.DERSequence({
      array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig] });

    this.hTLV = h.getEncodedHex();
    this.isModified = false;
  };
  this.setSignatureHex = function (h) {
    this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
    this.hexSig = h;
    this.asn1Sig = new KJUR.asn1.DERBitString({
      hex: "00" + this.hexSig });

    var i = new KJUR.asn1.DERSequence({
      array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig] });

    this.hTLV = i.getEncodedHex();
    this.isModified = false;
  };
  this.getEncodedHex = function () {
    if (this.isModified == false && this.hTLV != null) {
      return this.hTLV;
    }
    throw "not signed yet";
  };
  this.getPEMString = function () {
    var j = this.getEncodedHex();
    var h = CryptoJS.enc.Hex.parse(j);
    var i = CryptoJS.enc.Base64.stringify(h);
    var k = i.replace(/(.{64})/g, "$1\r\n");
    return "-----BEGIN CERTIFICATE-----\r\n" + k + "\r\n-----END CERTIFICATE-----\r\n";
  };
  if (g !== undefined) {
    if (g.tbscertobj !== undefined) {
      this.asn1TBSCert = g.tbscertobj;
    }
    if (g.prvkeyobj !== undefined) {
      this.prvKey = g.prvkeyobj;
    } else {
      if (g.rsaprvkey !== undefined) {
        this.prvKey = g.rsaprvkey;
      } else {
        if (g.rsaprvpem !== undefined && g.rsaprvpas !== undefined) {
          this.setRsaPrvKeyByPEMandPass(g.rsaprvpem, g.rsaprvpas);
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.Certificate, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.TBSCertificate = function (a) {
  KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);
  this._initialize = function () {
    this.asn1Array = new Array();
    this.asn1Version = new KJUR.asn1.DERTaggedObject({
      obj: new KJUR.asn1.DERInteger({
        "int": 2 }) });


    this.asn1SerialNumber = null;
    this.asn1SignatureAlg = null;
    this.asn1Issuer = null;
    this.asn1NotBefore = null;
    this.asn1NotAfter = null;
    this.asn1Subject = null;
    this.asn1SubjPKey = null;
    this.extensionsArray = new Array();
  };
  this.setSerialNumberByParam = function (b) {
    this.asn1SerialNumber = new KJUR.asn1.DERInteger(b);
  };
  this.setSignatureAlgByParam = function (b) {
    this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(b);
  };
  this.setIssuerByParam = function (b) {
    this.asn1Issuer = new KJUR.asn1.x509.X500Name(b);
  };
  this.setNotBeforeByParam = function (b) {
    this.asn1NotBefore = new KJUR.asn1.x509.Time(b);
  };
  this.setNotAfterByParam = function (b) {
    this.asn1NotAfter = new KJUR.asn1.x509.Time(b);
  };
  this.setSubjectByParam = function (b) {
    this.asn1Subject = new KJUR.asn1.x509.X500Name(b);
  };
  this.setSubjectPublicKeyByParam = function (b) {
    this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b);
  };
  this.setSubjectPublicKeyByGetKey = function (c) {
    var b = KEYUTIL.getKey(c);
    this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b);
  };
  this.appendExtension = function (b) {
    this.extensionsArray.push(b);
  };
  this.appendExtensionByName = function (c, b) {
    KJUR.asn1.x509.Extension.appendByNameToArray(c, b, this.extensionsArray);
  };
  this.getEncodedHex = function () {
    if (this.asn1NotBefore == null || this.asn1NotAfter == null) {
      throw "notBefore and/or notAfter not set";
    }
    var c = new KJUR.asn1.DERSequence({
      array: [this.asn1NotBefore, this.asn1NotAfter] });

    this.asn1Array = new Array();
    this.asn1Array.push(this.asn1Version);
    this.asn1Array.push(this.asn1SerialNumber);
    this.asn1Array.push(this.asn1SignatureAlg);
    this.asn1Array.push(this.asn1Issuer);
    this.asn1Array.push(c);
    this.asn1Array.push(this.asn1Subject);
    this.asn1Array.push(this.asn1SubjPKey);
    if (this.extensionsArray.length > 0) {
      var d = new KJUR.asn1.DERSequence({
        array: this.extensionsArray });

      var b = new KJUR.asn1.DERTaggedObject({
        explicit: true,
        tag: "a3",
        obj: d });

      this.asn1Array.push(b);
    }
    var e = new KJUR.asn1.DERSequence({
      array: this.asn1Array });

    this.hTLV = e.getEncodedHex();
    this.isModified = false;
    return this.hTLV;
  };
  this._initialize();
};
YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Extension = function (b) {
  KJUR.asn1.x509.Extension.superclass.constructor.call(this);
  var a = null;
  this.getEncodedHex = function () {
    var f = new KJUR.asn1.DERObjectIdentifier({
      oid: this.oid });

    var e = new KJUR.asn1.DEROctetString({
      hex: this.getExtnValueHex() });

    var d = new Array();
    d.push(f);
    if (this.critical) {
      d.push(new KJUR.asn1.DERBoolean());
    }
    d.push(e);
    var c = new KJUR.asn1.DERSequence({
      array: d });

    return c.getEncodedHex();
  };
  this.critical = false;
  if (typeof b != "undefined") {
    if (typeof b.critical != "undefined") {
      this.critical = b.critical;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.Extension, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Extension.appendByNameToArray = function (e, c, b) {
  if (e.toLowerCase() == "basicconstraints") {
    var d = new KJUR.asn1.x509.BasicConstraints(c);
    b.push(d);
  } else {
    if (e.toLowerCase() == "keyusage") {
      var d = new KJUR.asn1.x509.KeyUsage(c);
      b.push(d);
    } else {
      if (e.toLowerCase() == "crldistributionpoints") {
        var d = new KJUR.asn1.x509.CRLDistributionPoints(c);
        b.push(d);
      } else {
        if (e.toLowerCase() == "extkeyusage") {
          var d = new KJUR.asn1.x509.ExtKeyUsage(c);
          b.push(d);
        } else {
          if (e.toLowerCase() == "authoritykeyidentifier") {
            var d = new KJUR.asn1.x509.AuthorityKeyIdentifier(c);
            b.push(d);
          } else {
            if (e.toLowerCase() == "authorityinfoaccess") {
              var d = new KJUR.asn1.x509.AuthorityInfoAccess(c);
              b.push(d);
            } else {
              if (e.toLowerCase() == "subjectaltname") {
                var d = new KJUR.asn1.x509.SubjectAltName(c);
                b.push(d);
              } else {
                if (e.toLowerCase() == "issueraltname") {
                  var d = new KJUR.asn1.x509.IssuerAltName(c);
                  b.push(d);
                } else {
                  throw "unsupported extension name: " + e;
                }
              }
            }
          }
        }
      }
    }
  }
};
KJUR.asn1.x509.KeyUsage = function (a) {
  KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this, a);
  this.getExtnValueHex = function () {
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.oid = "2.5.29.15";
  if (typeof a != "undefined") {
    if (typeof a.bin != "undefined") {
      this.asn1ExtnValue = new KJUR.asn1.DERBitString(a);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.KeyUsage, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.BasicConstraints = function (c) {
  KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this, c);
  var a = false;
  var b = -1;
  this.getExtnValueHex = function () {
    var e = new Array();
    if (this.cA) {
      e.push(new KJUR.asn1.DERBoolean());
    }
    if (this.pathLen > -1) {
      e.push(new KJUR.asn1.DERInteger({
        "int": this.pathLen }));

    }
    var d = new KJUR.asn1.DERSequence({
      array: e });

    this.asn1ExtnValue = d;
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.oid = "2.5.29.19";
  this.cA = false;
  this.pathLen = -1;
  if (typeof c != "undefined") {
    if (typeof c.cA != "undefined") {
      this.cA = c.cA;
    }
    if (typeof c.pathLen != "undefined") {
      this.pathLen = c.pathLen;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRLDistributionPoints = function (a) {
  KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, a);
  this.getExtnValueHex = function () {
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.setByDPArray = function (b) {
    this.asn1ExtnValue = new KJUR.asn1.DERSequence({
      array: b });

  };
  this.setByOneURI = function (e) {
    var b = new KJUR.asn1.x509.GeneralNames([{
      uri: e }]);

    var d = new KJUR.asn1.x509.DistributionPointName(b);
    var c = new KJUR.asn1.x509.DistributionPoint({
      dpobj: d });

    this.setByDPArray([c]);
  };
  this.oid = "2.5.29.31";
  if (typeof a != "undefined") {
    if (typeof a.array != "undefined") {
      this.setByDPArray(a.array);
    } else {
      if (typeof a.uri != "undefined") {
        this.setByOneURI(a.uri);
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.CRLDistributionPoints, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.ExtKeyUsage = function (a) {
  KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, a);
  this.setPurposeArray = function (b) {
    this.asn1ExtnValue = new KJUR.asn1.DERSequence();
    for (var c = 0; c < b.length; c++) {
      var d = new KJUR.asn1.DERObjectIdentifier(b[c]);
      this.asn1ExtnValue.appendASN1Object(d);
    }
  };
  this.getExtnValueHex = function () {
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.oid = "2.5.29.37";
  if (typeof a != "undefined") {
    if (typeof a.array != "undefined") {
      this.setPurposeArray(a.array);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.ExtKeyUsage, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AuthorityKeyIdentifier = function (a) {
  KJUR.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, a);
  this.asn1KID = null;
  this.asn1CertIssuer = null;
  this.asn1CertSN = null;
  this.getExtnValueHex = function () {
    var c = new Array();
    if (this.asn1KID) {
      c.push(new KJUR.asn1.DERTaggedObject({
        explicit: false,
        tag: "80",
        obj: this.asn1KID }));

    }
    if (this.asn1CertIssuer) {
      c.push(new KJUR.asn1.DERTaggedObject({
        explicit: false,
        tag: "a1",
        obj: this.asn1CertIssuer }));

    }
    if (this.asn1CertSN) {
      c.push(new KJUR.asn1.DERTaggedObject({
        explicit: false,
        tag: "82",
        obj: this.asn1CertSN }));

    }
    var b = new KJUR.asn1.DERSequence({
      array: c });

    this.asn1ExtnValue = b;
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.setKIDByParam = function (b) {
    this.asn1KID = new KJUR.asn1.DEROctetString(b);
  };
  this.setCertIssuerByParam = function (b) {
    this.asn1CertIssuer = new KJUR.asn1.x509.X500Name(b);
  };
  this.setCertSNByParam = function (b) {
    this.asn1CertSN = new KJUR.asn1.DERInteger(b);
  };
  this.oid = "2.5.29.35";
  if (typeof a != "undefined") {
    if (typeof a.kid != "undefined") {
      this.setKIDByParam(a.kid);
    }
    if (typeof a.issuer != "undefined") {
      this.setCertIssuerByParam(a.issuer);
    }
    if (typeof a.sn != "undefined") {
      this.setCertSNByParam(a.sn);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.AuthorityKeyIdentifier, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.AuthorityInfoAccess = function (a) {
  KJUR.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, a);
  this.setAccessDescriptionArray = function (c) {
    var g = new Array();
    for (var b = 0; b < c.length; b++) {
      var e = new KJUR.asn1.DERObjectIdentifier(c[b].accessMethod);
      var d = new KJUR.asn1.x509.GeneralName(c[b].accessLocation);
      var f = new KJUR.asn1.DERSequence({
        array: [e, d] });

      g.push(f);
    }
    this.asn1ExtnValue = new KJUR.asn1.DERSequence({
      array: g });

  };
  this.getExtnValueHex = function () {
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.oid = "1.3.6.1.5.5.7.1.1";
  if (typeof a != "undefined") {
    if (typeof a.array != "undefined") {
      this.setAccessDescriptionArray(a.array);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.AuthorityInfoAccess, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.SubjectAltName = function (a) {
  KJUR.asn1.x509.SubjectAltName.superclass.constructor.call(this, a);
  this.setNameArray = function (b) {
    this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b);
  };
  this.getExtnValueHex = function () {
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.oid = "2.5.29.17";
  if (a !== undefined) {
    if (a.array !== undefined) {
      this.setNameArray(a.array);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.SubjectAltName, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.IssuerAltName = function (a) {
  KJUR.asn1.x509.IssuerAltName.superclass.constructor.call(this, a);
  this.setNameArray = function (b) {
    this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b);
  };
  this.getExtnValueHex = function () {
    return this.asn1ExtnValue.getEncodedHex();
  };
  this.oid = "2.5.29.18";
  if (a !== undefined) {
    if (a.array !== undefined) {
      this.setNameArray(a.array);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.IssuerAltName, KJUR.asn1.x509.Extension);
KJUR.asn1.x509.CRL = function (f) {
  KJUR.asn1.x509.CRL.superclass.constructor.call(this);
  var a = null;
  var c = null;
  var e = null;
  var b = null;
  var d = null;
  this.setRsaPrvKeyByPEMandPass = function (h, j) {
    var g = PKCS5PKEY.getDecryptedKeyHex(h, j);
    var i = new RSAKey();
    i.readPrivateKeyFromASN1HexString(g);
    this.rsaPrvKey = i;
  };
  this.sign = function () {
    this.asn1SignatureAlg = this.asn1TBSCertList.asn1SignatureAlg;
    sig = new KJUR.crypto.Signature({
      alg: "SHA1withRSA",
      prov: "cryptojs/jsrsa" });

    sig.initSign(this.rsaPrvKey);
    sig.updateHex(this.asn1TBSCertList.getEncodedHex());
    this.hexSig = sig.sign();
    this.asn1Sig = new KJUR.asn1.DERBitString({
      hex: "00" + this.hexSig });

    var g = new KJUR.asn1.DERSequence({
      array: [this.asn1TBSCertList, this.asn1SignatureAlg, this.asn1Sig] });

    this.hTLV = g.getEncodedHex();
    this.isModified = false;
  };
  this.getEncodedHex = function () {
    if (this.isModified == false && this.hTLV != null) {
      return this.hTLV;
    }
    throw "not signed yet";
  };
  this.getPEMString = function () {
    var i = this.getEncodedHex();
    var g = CryptoJS.enc.Hex.parse(i);
    var h = CryptoJS.enc.Base64.stringify(g);
    var j = h.replace(/(.{64})/g, "$1\r\n");
    return "-----BEGIN X509 CRL-----\r\n" + j + "\r\n-----END X509 CRL-----\r\n";
  };
  if (typeof f != "undefined") {
    if (typeof f.tbsobj != "undefined") {
      this.asn1TBSCertList = f.tbsobj;
    }
    if (typeof f.rsaprvkey != "undefined") {
      this.rsaPrvKey = f.rsaprvkey;
    }
    if (typeof f.rsaprvpem != "undefined" && typeof f.rsaprvpas != "undefined") {
      this.setRsaPrvKeyByPEMandPass(f.rsaprvpem, f.rsaprvpas);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.CRL, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.TBSCertList = function (b) {
  KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);
  var a = null;
  this.setSignatureAlgByParam = function (c) {
    this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(c);
  };
  this.setIssuerByParam = function (c) {
    this.asn1Issuer = new KJUR.asn1.x509.X500Name(c);
  };
  this.setThisUpdateByParam = function (c) {
    this.asn1ThisUpdate = new KJUR.asn1.x509.Time(c);
  };
  this.setNextUpdateByParam = function (c) {
    this.asn1NextUpdate = new KJUR.asn1.x509.Time(c);
  };
  this.addRevokedCert = function (c, d) {
    var f = {};
    if (c != undefined && c != null) {
      f.sn = c;
    }
    if (d != undefined && d != null) {
      f.time = d;
    }
    var e = new KJUR.asn1.x509.CRLEntry(f);
    this.aRevokedCert.push(e);
  };
  this.getEncodedHex = function () {
    this.asn1Array = new Array();
    if (this.asn1Version != null) {
      this.asn1Array.push(this.asn1Version);
    }
    this.asn1Array.push(this.asn1SignatureAlg);
    this.asn1Array.push(this.asn1Issuer);
    this.asn1Array.push(this.asn1ThisUpdate);
    if (this.asn1NextUpdate != null) {
      this.asn1Array.push(this.asn1NextUpdate);
    }
    if (this.aRevokedCert.length > 0) {
      var c = new KJUR.asn1.DERSequence({
        array: this.aRevokedCert });

      this.asn1Array.push(c);
    }
    var d = new KJUR.asn1.DERSequence({
      array: this.asn1Array });

    this.hTLV = d.getEncodedHex();
    this.isModified = false;
    return this.hTLV;
  };
  this._initialize = function () {
    this.asn1Version = null;
    this.asn1SignatureAlg = null;
    this.asn1Issuer = null;
    this.asn1ThisUpdate = null;
    this.asn1NextUpdate = null;
    this.aRevokedCert = new Array();
  };
  this._initialize();
};
YAHOO.lang.extend(KJUR.asn1.x509.TBSCertList, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.CRLEntry = function (c) {
  KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);
  var b = null;
  var a = null;
  this.setCertSerial = function (d) {
    this.sn = new KJUR.asn1.DERInteger(d);
  };
  this.setRevocationDate = function (d) {
    this.time = new KJUR.asn1.x509.Time(d);
  };
  this.getEncodedHex = function () {
    var d = new KJUR.asn1.DERSequence({
      array: [this.sn, this.time] });

    this.TLV = d.getEncodedHex();
    return this.TLV;
  };
  if (typeof c != "undefined") {
    if (typeof c.time != "undefined") {
      this.setRevocationDate(c.time);
    }
    if (typeof c.sn != "undefined") {
      this.setCertSerial(c.sn);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.X500Name = function (b) {
  KJUR.asn1.x509.X500Name.superclass.constructor.call(this);
  this.asn1Array = new Array();
  this.setByString = function (c) {
    var d = c.split("/");
    d.shift();
    for (var e = 0; e < d.length; e++) {
      this.asn1Array.push(new KJUR.asn1.x509.RDN({
        str: d[e] }));

    }
  };
  this.setByLdapString = function (c) {
    var d = KJUR.asn1.x509.X500Name.ldapToOneline(c);
    this.setByString(d);
  };
  this.setByObject = function (e) {
    for (var c in e) {
      if (e.hasOwnProperty(c)) {
        var d = new KJUR.asn1.x509.RDN({
          str: c + "=" + e[c] });

        this.asn1Array ? this.asn1Array.push(d) : this.asn1Array = [d];
      }
    }
  };
  this.getEncodedHex = function () {
    if (typeof this.hTLV == "string") {
      return this.hTLV;
    }
    var c = new KJUR.asn1.DERSequence({
      array: this.asn1Array });

    this.hTLV = c.getEncodedHex();
    return this.hTLV;
  };
  if (b !== undefined) {
    if (b.str !== undefined) {
      this.setByString(b.str);
    } else {
      if (b.ldapstr !== undefined) {
        this.setByLdapString(b.ldapstr);
      } else {
        if (typeof b === "object") {
          this.setByObject(b);
        }
      }
    }
    if (b.certissuer !== undefined) {
      var a = new X509();
      a.hex = ASN1HEX.pemToHex(b.certissuer);
      this.hTLV = a.getIssuerHex();
    }
    if (b.certsubject !== undefined) {
      var a = new X509();
      a.hex = ASN1HEX.pemToHex(b.certsubject);
      this.hTLV = a.getSubjectHex();
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.X500Name, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.X500Name.onelineToLDAP = function (d) {
  if (d.substr(0, 1) !== "/") {
    throw "malformed input";
  }
  var b = "";
  d = d.substr(1);
  var c = d.split("/");
  c.reverse();
  c = c.map(function (a) {
    return a.replace(/,/, "\\,");
  });
  return c.join(",");
};
KJUR.asn1.x509.X500Name.ldapToOneline = function (g) {
  var c = g.split(",");
  var e = false;
  var b = [];
  for (var f = 0; c.length > 0; f++) {
    var h = c.shift();
    if (e === true) {
      var d = b.pop();
      var j = (d + "," + h).replace(/\\,/g, ",");
      b.push(j);
      e = false;
    } else {
      b.push(h);
    }
    if (h.substr(-1, 1) === "\\") {
      e = true;
    }
  }
  b = b.map(function (a) {
    return a.replace("/", "\\/");
  });
  b.reverse();
  return "/" + b.join("/");
};
KJUR.asn1.x509.RDN = function (a) {
  KJUR.asn1.x509.RDN.superclass.constructor.call(this);
  this.asn1Array = new Array();
  this.addByString = function (b) {
    this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({
      str: b }));

  };
  this.addByMultiValuedString = function (d) {
    var b = KJUR.asn1.x509.RDN.parseString(d);
    for (var c = 0; c < b.length; c++) {
      this.addByString(b[c]);
    }
  };
  this.getEncodedHex = function () {
    var b = new KJUR.asn1.DERSet({
      array: this.asn1Array });

    this.TLV = b.getEncodedHex();
    return this.TLV;
  };
  if (typeof a != "undefined") {
    if (typeof a.str != "undefined") {
      this.addByMultiValuedString(a.str);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.RDN, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.RDN.parseString = function (m) {
  var j = m.split(/\+/);
  var h = false;
  var c = [];
  for (var g = 0; j.length > 0; g++) {
    var k = j.shift();
    if (h === true) {
      var f = c.pop();
      var d = (f + "+" + k).replace(/\\\+/g, "+");
      c.push(d);
      h = false;
    } else {
      c.push(k);
    }
    if (k.substr(-1, 1) === "\\") {
      h = true;
    }
  }
  var l = false;
  var b = [];
  for (var g = 0; c.length > 0; g++) {
    var k = c.shift();
    if (l === true) {
      var e = b.pop();
      if (k.match(/"$/)) {
        var d = (e + "+" + k).replace(/^([^=]+)="(.*)"$/, "$1=$2");
        b.push(d);
        l = false;
      } else {
        b.push(e + "+" + k);
      }
    } else {
      b.push(k);
    }
    if (k.match(/^[^=]+="/)) {
      l = true;
    }
  }
  return b;
};
KJUR.asn1.x509.AttributeTypeAndValue = function (b) {
  KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
  var d = null;
  var c = null;
  var a = "utf8";
  this.setByString = function (f) {
    var e = f.match(/^([^=]+)=(.+)$/);
    if (e) {
      this.setByAttrTypeAndValueStr(e[1], e[2]);
    } else {
      throw "malformed attrTypeAndValueStr: " + f;
    }
  };
  this.setByAttrTypeAndValueStr = function (g, f) {
    this.typeObj = KJUR.asn1.x509.OID.atype2obj(g);
    var e = a;
    if (g == "C") {
      e = "prn";
    }
    this.valueObj = this.getValueObj(e, f);
  };
  this.getValueObj = function (f, e) {
    if (f == "utf8") {
      return new KJUR.asn1.DERUTF8String({
        str: e });

    }
    if (f == "prn") {
      return new KJUR.asn1.DERPrintableString({
        str: e });

    }
    if (f == "tel") {
      return new KJUR.asn1.DERTeletexString({
        str: e });

    }
    if (f == "ia5") {
      return new KJUR.asn1.DERIA5String({
        str: e });

    }
    throw "unsupported directory string type: type=" + f + " value=" + e;
  };
  this.getEncodedHex = function () {
    var e = new KJUR.asn1.DERSequence({
      array: [this.typeObj, this.valueObj] });

    this.TLV = e.getEncodedHex();
    return this.TLV;
  };
  if (typeof b != "undefined") {
    if (typeof b.str != "undefined") {
      this.setByString(b.str);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.SubjectPublicKeyInfo = function (d) {
  KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
  var b = null;
  var c = null;
  var a = null;
  this.setRSAKey = function (e) {
    if (!RSAKey.prototype.isPrototypeOf(e)) {
      throw "argument is not RSAKey instance";
    }
    this.rsaKey = e;
    var g = new KJUR.asn1.DERInteger({
      bigint: e.n });

    var f = new KJUR.asn1.DERInteger({
      "int": e.e });

    var i = new KJUR.asn1.DERSequence({
      array: [g, f] });

    var h = i.getEncodedHex();
    this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
      name: "rsaEncryption" });

    this.asn1SubjPKey = new KJUR.asn1.DERBitString({
      hex: "00" + h });

  };
  this.setRSAPEM = function (g) {
    if (g.match(/-----BEGIN PUBLIC KEY-----/)) {
      var n = g;
      n = n.replace(/^-----[^-]+-----/, "");
      n = n.replace(/-----[^-]+-----\s*$/, "");
      var m = n.replace(/\s+/g, "");
      var f = CryptoJS.enc.Base64.parse(m);
      var i = CryptoJS.enc.Hex.stringify(f);
      var k = RSAKey.getHexValueArrayOfChildrenFromHex(i);
      var h = k[1];
      var l = h.substr(2);
      var e = RSAKey.getHexValueArrayOfChildrenFromHex(l);
      var j = new RSAKey();
      j.setPublic(e[0], e[1]);
      this.setRSAKey(j);
    } else {
      throw "key not supported";
    }
  };
  this.getASN1Object = function () {
    if (this.asn1AlgId == null || this.asn1SubjPKey == null) {
      throw "algId and/or subjPubKey not set";
    }
    var e = new KJUR.asn1.DERSequence({
      array: [this.asn1AlgId, this.asn1SubjPKey] });

    return e;
  };
  this.getEncodedHex = function () {
    var e = this.getASN1Object();
    this.hTLV = e.getEncodedHex();
    return this.hTLV;
  };
  this._setRSAKey = function (e) {
    var g = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": {
          bigint: e.n } },


      {
        "int": {
          "int": e.e } }] });



    var f = g.getEncodedHex();
    this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
      name: "rsaEncryption" });

    this.asn1SubjPKey = new KJUR.asn1.DERBitString({
      hex: "00" + f });

  };
  this._setEC = function (e) {
    var f = new KJUR.asn1.DERObjectIdentifier({
      name: e.curveName });

    this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
      name: "ecPublicKey",
      asn1params: f });

    this.asn1SubjPKey = new KJUR.asn1.DERBitString({
      hex: "00" + e.pubKeyHex });

  };
  this._setDSA = function (e) {
    var f = new KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": {
          bigint: e.p } },


      {
        "int": {
          bigint: e.q } },


      {
        "int": {
          bigint: e.g } }] });



    this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
      name: "dsa",
      asn1params: f });

    var g = new KJUR.asn1.DERInteger({
      bigint: e.y });

    this.asn1SubjPKey = new KJUR.asn1.DERBitString({
      hex: "00" + g.getEncodedHex() });

  };
  if (typeof d != "undefined") {
    if (typeof RSAKey != "undefined" && d instanceof RSAKey) {
      this._setRSAKey(d);
    } else {
      if (typeof KJUR.crypto.ECDSA != "undefined" && d instanceof KJUR.crypto.ECDSA) {
        this._setEC(d);
      } else {
        if (typeof KJUR.crypto.DSA != "undefined" && d instanceof KJUR.crypto.DSA) {
          this._setDSA(d);
        } else {
          if (typeof d.rsakey != "undefined") {
            this.setRSAKey(d.rsakey);
          } else {
            if (typeof d.rsapem != "undefined") {
              this.setRSAPEM(d.rsapem);
            }
          }
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.Time = function (c) {
  KJUR.asn1.x509.Time.superclass.constructor.call(this);
  var b = null;
  var a = null;
  this.setTimeParams = function (d) {
    this.timeParams = d;
  };
  this.getEncodedHex = function () {
    var d = null;
    if (this.timeParams != null) {
      if (this.type == "utc") {
        d = new KJUR.asn1.DERUTCTime(this.timeParams);
      } else {
        d = new KJUR.asn1.DERGeneralizedTime(this.timeParams);
      }
    } else {
      if (this.type == "utc") {
        d = new KJUR.asn1.DERUTCTime();
      } else {
        d = new KJUR.asn1.DERGeneralizedTime();
      }
    }
    this.TLV = d.getEncodedHex();
    return this.TLV;
  };
  this.type = "utc";
  if (typeof c != "undefined") {
    if (typeof c.type != "undefined") {
      this.type = c.type;
    } else {
      if (typeof c.str != "undefined") {
        if (c.str.match(/^[0-9]{12}Z$/)) {
          this.type = "utc";
        }
        if (c.str.match(/^[0-9]{14}Z$/)) {
          this.type = "gen";
        }
      }
    }
    this.timeParams = c;
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.Time, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.AlgorithmIdentifier = function (b) {
  KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);
  this.nameAlg = null;
  this.asn1Alg = null;
  this.asn1Params = null;
  this.paramEmpty = false;
  this.getEncodedHex = function () {
    if (this.nameAlg === null && this.asn1Alg === null) {
      throw "algorithm not specified";
    }
    if (this.nameAlg !== null && this.asn1Alg === null) {
      this.asn1Alg = KJUR.asn1.x509.OID.name2obj(this.nameAlg);
    }
    var c = [this.asn1Alg];
    if (this.asn1Params !== null) {
      c.push(this.asn1Params);
    }
    var d = new KJUR.asn1.DERSequence({
      array: c });

    this.hTLV = d.getEncodedHex();
    return this.hTLV;
  };
  if (b !== undefined) {
    if (b.name !== undefined) {
      this.nameAlg = b.name;
    }
    if (b.asn1params !== undefined) {
      this.asn1Params = b.asn1params;
    }
    if (b.paramempty !== undefined) {
      this.paramEmpty = b.paramempty;
    }
  }
  if (this.asn1Params === null && this.paramEmpty === false && this.nameAlg !== null) {
    var a = this.nameAlg.toLowerCase();
    if (a.substr(-7, 7) !== "withdsa" && a.substr(-9, 9) !== "withecdsa") {
      this.asn1Params = new KJUR.asn1.DERNull();
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.GeneralName = function (d) {
  KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);
  var c = null;
  var b = null;
  var a = {
    rfc822: "81",
    dns: "82",
    dn: "a4",
    uri: "86" };

  this.explicit = false;
  this.setByParam = function (k) {
    var j = null;
    var g = null;
    if (k === undefined) {
      return;
    }
    if (k.rfc822 !== undefined) {
      this.type = "rfc822";
      g = new KJUR.asn1.DERIA5String({
        str: k[this.type] });

    }
    if (k.dns !== undefined) {
      this.type = "dns";
      g = new KJUR.asn1.DERIA5String({
        str: k[this.type] });

    }
    if (k.uri !== undefined) {
      this.type = "uri";
      g = new KJUR.asn1.DERIA5String({
        str: k[this.type] });

    }
    if (k.dn !== undefined) {
      this.type = "dn";
      g = new KJUR.asn1.x509.X500Name({
        str: k.dn });

    }
    if (k.ldapdn !== undefined) {
      this.type = "dn";
      g = new KJUR.asn1.x509.X500Name({
        ldapstr: k.ldapdn });

    }
    if (k.certissuer !== undefined) {
      this.type = "dn";
      this.explicit = true;
      var h = k.certissuer;
      var f = null;
      if (h.match(/^[0-9A-Fa-f]+$/)) {
        f == h;
      }
      if (h.indexOf("-----BEGIN ") != -1) {
        f = ASN1HEX.pemToHex(h);
      }
      if (f == null) {
        throw "certissuer param not cert";
      }
      var e = new X509();
      e.hex = f;
      var i = e.getIssuerHex();
      g = new KJUR.asn1.ASN1Object();
      g.hTLV = i;
    }
    if (k.certsubj !== undefined) {
      this.type = "dn";
      this.explicit = true;
      var h = k.certsubj;
      var f = null;
      if (h.match(/^[0-9A-Fa-f]+$/)) {
        f == h;
      }
      if (h.indexOf("-----BEGIN ") != -1) {
        f = ASN1HEX.pemToHex(h);
      }
      if (f == null) {
        throw "certsubj param not cert";
      }
      var e = new X509();
      e.hex = f;
      var i = e.getSubjectHex();
      g = new KJUR.asn1.ASN1Object();
      g.hTLV = i;
    }
    if (this.type == null) {
      throw "unsupported type in params=" + k;
    }
    this.asn1Obj = new KJUR.asn1.DERTaggedObject({
      explicit: this.explicit,
      tag: a[this.type],
      obj: g });

  };
  this.getEncodedHex = function () {
    return this.asn1Obj.getEncodedHex();
  };
  if (d !== undefined) {
    this.setByParam(d);
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.GeneralName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.GeneralNames = function (b) {
  KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);
  var a = null;
  this.setByParamArray = function (e) {
    for (var c = 0; c < e.length; c++) {
      var d = new KJUR.asn1.x509.GeneralName(e[c]);
      this.asn1Array.push(d);
    }
  };
  this.getEncodedHex = function () {
    var c = new KJUR.asn1.DERSequence({
      array: this.asn1Array });

    return c.getEncodedHex();
  };
  this.asn1Array = new Array();
  if (typeof b != "undefined") {
    this.setByParamArray(b);
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.DistributionPointName = function (b) {
  KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);
  var e = null;
  var c = null;
  var a = null;
  var d = null;
  this.getEncodedHex = function () {
    if (this.type != "full") {
      throw "currently type shall be 'full': " + this.type;
    }
    this.asn1Obj = new KJUR.asn1.DERTaggedObject({
      explicit: false,
      tag: this.tag,
      obj: this.asn1V });

    this.hTLV = this.asn1Obj.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b != "undefined") {
    if (KJUR.asn1.x509.GeneralNames.prototype.isPrototypeOf(b)) {
      this.type = "full";
      this.tag = "a0";
      this.asn1V = b;
    } else {
      throw "This class supports GeneralNames only as argument";
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.DistributionPoint = function (b) {
  KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);
  var a = null;
  this.getEncodedHex = function () {
    var c = new KJUR.asn1.DERSequence();
    if (this.asn1DP != null) {
      var d = new KJUR.asn1.DERTaggedObject({
        explicit: true,
        tag: "a0",
        obj: this.asn1DP });

      c.appendASN1Object(d);
    }
    this.hTLV = c.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b != "undefined") {
    if (typeof b.dpobj != "undefined") {
      this.asn1DP = b.dpobj;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.x509.DistributionPoint, KJUR.asn1.ASN1Object);
KJUR.asn1.x509.OID = new
function (a) {
  this.atype2oidList = {
    CN: "2.5.4.3",
    L: "2.5.4.7",
    ST: "2.5.4.8",
    O: "2.5.4.10",
    OU: "2.5.4.11",
    C: "2.5.4.6",
    STREET: "2.5.4.9",
    DC: "0.9.2342.19200300.100.1.25",
    UID: "0.9.2342.19200300.100.1.1",
    SN: "2.5.4.4",
    DN: "2.5.4.49",
    E: "1.2.840.113549.1.9.1",
    businessCategory: "2.5.4.15",
    postalCode: "2.5.4.17",
    jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
    jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
    jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3" };

  this.name2oidList = {
    sha1: "1.3.14.3.2.26",
    sha256: "2.16.840.1.101.3.4.2.1",
    sha384: "2.16.840.1.101.3.4.2.2",
    sha512: "2.16.840.1.101.3.4.2.3",
    sha224: "2.16.840.1.101.3.4.2.4",
    md5: "1.2.840.113549.2.5",
    md2: "1.3.14.7.2.2.1",
    ripemd160: "1.3.36.3.2.1",
    MD2withRSA: "1.2.840.113549.1.1.2",
    MD4withRSA: "1.2.840.113549.1.1.3",
    MD5withRSA: "1.2.840.113549.1.1.4",
    SHA1withRSA: "1.2.840.113549.1.1.5",
    SHA224withRSA: "1.2.840.113549.1.1.14",
    SHA256withRSA: "1.2.840.113549.1.1.11",
    SHA384withRSA: "1.2.840.113549.1.1.12",
    SHA512withRSA: "1.2.840.113549.1.1.13",
    SHA1withECDSA: "1.2.840.10045.4.1",
    SHA224withECDSA: "1.2.840.10045.4.3.1",
    SHA256withECDSA: "1.2.840.10045.4.3.2",
    SHA384withECDSA: "1.2.840.10045.4.3.3",
    SHA512withECDSA: "1.2.840.10045.4.3.4",
    dsa: "1.2.840.10040.4.1",
    SHA1withDSA: "1.2.840.10040.4.3",
    SHA224withDSA: "2.16.840.1.101.3.4.3.1",
    SHA256withDSA: "2.16.840.1.101.3.4.3.2",
    rsaEncryption: "1.2.840.113549.1.1.1",
    commonName: "2.5.4.3",
    localityName: "2.5.4.7",
    stateOrProvinceName: "2.5.4.8",
    organizationName: "2.5.4.10",
    organizationalUnitName: "2.5.4.11",
    countryName: "2.5.4.6",
    streetAddress: "2.5.4.9",
    domainComponent: "0.9.2342.19200300.100.1.25",
    userId: "0.9.2342.19200300.100.1.1",
    surname: "2.5.4.4",
    distinguishedName: "2.5.4.49",
    emailAddress: "1.2.840.113549.1.9.1",
    businessCategory: "2.5.4.15",
    postalCode: "2.5.4.17",
    jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
    jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
    jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3",
    subjectKeyIdentifier: "2.5.29.14",
    keyUsage: "2.5.29.15",
    subjectAltName: "2.5.29.17",
    issuerAltName: "2.5.29.18",
    basicConstraints: "2.5.29.19",
    nameConstraints: "2.5.29.30",
    cRLDistributionPoints: "2.5.29.31",
    certificatePolicies: "2.5.29.32",
    authorityKeyIdentifier: "2.5.29.35",
    policyConstraints: "2.5.29.36",
    extKeyUsage: "2.5.29.37",
    authorityInfoAccess: "1.3.6.1.5.5.7.1.1",
    ocsp: "1.3.6.1.5.5.7.48.1",
    caIssuers: "1.3.6.1.5.5.7.48.2",
    anyExtendedKeyUsage: "2.5.29.37.0",
    serverAuth: "1.3.6.1.5.5.7.3.1",
    clientAuth: "1.3.6.1.5.5.7.3.2",
    codeSigning: "1.3.6.1.5.5.7.3.3",
    emailProtection: "1.3.6.1.5.5.7.3.4",
    timeStamping: "1.3.6.1.5.5.7.3.8",
    ocspSigning: "1.3.6.1.5.5.7.3.9",
    ecPublicKey: "1.2.840.10045.2.1",
    secp256r1: "1.2.840.10045.3.1.7",
    secp256k1: "1.3.132.0.10",
    secp384r1: "1.3.132.0.34",
    pkcs5PBES2: "1.2.840.113549.1.5.13",
    pkcs5PBKDF2: "1.2.840.113549.1.5.12",
    "des-EDE3-CBC": "1.2.840.113549.3.7",
    data: "1.2.840.113549.1.7.1",
    "signed-data": "1.2.840.113549.1.7.2",
    "enveloped-data": "1.2.840.113549.1.7.3",
    "digested-data": "1.2.840.113549.1.7.5",
    "encrypted-data": "1.2.840.113549.1.7.6",
    "authenticated-data": "1.2.840.113549.1.9.16.1.2",
    tstinfo: "1.2.840.113549.1.9.16.1.4",
    extensionRequest: "1.2.840.113549.1.9.14" };

  this.objCache = {};
  this.name2obj = function (b) {
    if (typeof this.objCache[b] != "undefined") {
      return this.objCache[b];
    }
    if (typeof this.name2oidList[b] == "undefined") {
      throw "Name of ObjectIdentifier not defined: " + b;
    }
    var c = this.name2oidList[b];
    var d = new KJUR.asn1.DERObjectIdentifier({
      oid: c });

    this.objCache[b] = d;
    return d;
  };
  this.atype2obj = function (b) {
    if (typeof this.objCache[b] != "undefined") {
      return this.objCache[b];
    }
    if (typeof this.atype2oidList[b] == "undefined") {
      throw "AttributeType name undefined: " + b;
    }
    var c = this.atype2oidList[b];
    var d = new KJUR.asn1.DERObjectIdentifier({
      oid: c });

    this.objCache[b] = d;
    return d;
  };
}();
KJUR.asn1.x509.OID.oid2name = function (b) {
  var c = KJUR.asn1.x509.OID.name2oidList;
  for (var a in c) {
    if (c[a] == b) {
      return a;
    }
  }
  return "";
};
KJUR.asn1.x509.OID.oid2atype = function (b) {
  var c = KJUR.asn1.x509.OID.atype2oidList;
  for (var a in c) {
    if (c[a] == b) {
      return a;
    }
  }
  return b;
};
KJUR.asn1.x509.OID.name2oid = function (a) {
  var b = KJUR.asn1.x509.OID.name2oidList;
  if (b[a] === undefined) {
    return "";
  }
  return b[a];
};
KJUR.asn1.x509.X509Util = new
function () {
  this.getPKCS8PubKeyPEMfromRSAKey = function (i) {
    var h = null;
    var f = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(i.n);
    var j = KJUR.asn1.ASN1Util.integerToByteHex(i.e);
    var a = new KJUR.asn1.DERInteger({
      hex: f });

    var g = new KJUR.asn1.DERInteger({
      hex: j });

    var l = new KJUR.asn1.DERSequence({
      array: [a, g] });

    var c = l.getEncodedHex();
    var d = new KJUR.asn1.x509.AlgorithmIdentifier({
      name: "rsaEncryption" });

    var b = new KJUR.asn1.DERBitString({
      hex: "00" + c });

    var k = new KJUR.asn1.DERSequence({
      array: [d, b] });

    var e = k.getEncodedHex();
    var h = KJUR.asn1.ASN1Util.getPEMStringFromHex(e, "PUBLIC KEY");
    return h;
  };
}();
KJUR.asn1.x509.X509Util.newCertPEM = function (f) {
  var c = KJUR.asn1.x509;
  var e = new c.TBSCertificate();
  if (f.serial !== undefined) {
    e.setSerialNumberByParam(f.serial);
  } else {
    throw "serial number undefined.";
  }
  if (typeof f.sigalg.name === "string") {
    e.setSignatureAlgByParam(f.sigalg);
  } else {
    throw "unproper signature algorithm name";
  }
  if (f.issuer !== undefined) {
    e.setIssuerByParam(f.issuer);
  } else {
    throw "issuer name undefined.";
  }
  if (f.notbefore !== undefined) {
    e.setNotBeforeByParam(f.notbefore);
  } else {
    throw "notbefore undefined.";
  }
  if (f.notafter !== undefined) {
    e.setNotAfterByParam(f.notafter);
  } else {
    throw "notafter undefined.";
  }
  if (f.subject !== undefined) {
    e.setSubjectByParam(f.subject);
  } else {
    throw "subject name undefined.";
  }
  if (f.sbjpubkey !== undefined) {
    e.setSubjectPublicKeyByGetKey(f.sbjpubkey);
  } else {
    throw "subject public key undefined.";
  }
  if (f.ext !== undefined && f.ext.length !== undefined) {
    for (var b = 0; b < f.ext.length; b++) {
      for (key in f.ext[b]) {
        e.appendExtensionByName(key, f.ext[b][key]);
      }
    }
  }
  if (f.cakey === undefined && f.sighex === undefined) {
    throw "param cakey and sighex undefined.";
  }
  var d = null;
  var a = null;
  if (f.cakey) {
    if (f.cakey.isPrivate === true) {
      d = f.cakey;
    } else {
      d = KEYUTIL.getKey.apply(null, f.cakey);
    }
    a = new c.Certificate({
      tbscertobj: e,
      prvkeyobj: d });

    a.sign();
  }
  if (f.sighex) {
    a = new c.Certificate({
      tbscertobj: e });

    a.setSignatureHex(f.sighex);
  }
  return a.getPEMString();
};
/*! asn1cms-1.0.3.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.cms == "undefined" || !KJUR.asn1.cms) {
  KJUR.asn1.cms = {};
}
KJUR.asn1.cms.Attribute = function (b) {
  KJUR.asn1.cms.Attribute.superclass.constructor.call(this);
  var a = [];
  this.getEncodedHex = function () {
    var f, e, c;
    f = new KJUR.asn1.DERObjectIdentifier({
      oid: this.attrTypeOid });

    e = new KJUR.asn1.DERSet({
      array: this.valueList });

    try {
      e.getEncodedHex();
    } catch (d) {
      throw "fail valueSet.getEncodedHex in Attribute(1)/" + d;
    }
    c = new KJUR.asn1.DERSequence({
      array: [f, e] });

    try {
      this.hTLV = c.getEncodedHex();
    } catch (d) {
      throw "failed seq.getEncodedHex in Attribute(2)/" + d;
    }
    return this.hTLV;
  };
};
YAHOO.lang.extend(KJUR.asn1.cms.Attribute, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.ContentType = function (b) {
  KJUR.asn1.cms.ContentType.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.3";
  var a = null;
  if (typeof b != "undefined") {
    var a = new KJUR.asn1.DERObjectIdentifier(b);
    this.valueList = [a];
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.ContentType, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.MessageDigest = function (e) {
  KJUR.asn1.cms.MessageDigest.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.4";
  if (typeof e != "undefined") {
    if (e.eciObj instanceof KJUR.asn1.cms.EncapsulatedContentInfo && typeof e.hashAlg == "string") {
      var b = e.eciObj.eContentValueHex;
      var a = e.hashAlg;
      var c = KJUR.crypto.Util.hashHex(b, a);
      var d = new KJUR.asn1.DEROctetString({
        hex: c });

      d.getEncodedHex();
      this.valueList = [d];
    } else {
      var d = new KJUR.asn1.DEROctetString(e);
      d.getEncodedHex();
      this.valueList = [d];
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.MessageDigest, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningTime = function (c) {
  KJUR.asn1.cms.SigningTime.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.5";
  if (typeof c != "undefined") {
    var a = new KJUR.asn1.x509.Time(c);
    try {
      a.getEncodedHex();
    } catch (b) {
      throw "SigningTime.getEncodedHex() failed/" + b;
    }
    this.valueList = [a];
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.SigningTime, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningCertificate = function (d) {
  KJUR.asn1.cms.SigningCertificate.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.16.2.12";
  var a = KJUR.asn1;
  var c = KJUR.asn1.cms;
  var b = KJUR.crypto;
  this.setCerts = function (l) {
    var j = [];
    for (var h = 0; h < l.length; h++) {
      var f = ASN1HEX.pemToHex(l[h]);
      var e = b.Util.hashHex(f, "sha1");
      var m = new a.DEROctetString({
        hex: e });

      m.getEncodedHex();
      var k = new c.IssuerAndSerialNumber({
        cert: l[h] });

      k.getEncodedHex();
      var n = new a.DERSequence({
        array: [m, k] });

      n.getEncodedHex();
      j.push(n);
    }
    var g = new a.DERSequence({
      array: j });

    g.getEncodedHex();
    this.valueList = [g];
  };
  if (typeof d != "undefined") {
    if (typeof d.array == "object") {
      this.setCerts(d.array);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificate, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.SigningCertificateV2 = function (e) {
  KJUR.asn1.cms.SigningCertificateV2.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.16.2.47";
  var b = KJUR.asn1;
  var f = KJUR.asn1.x509;
  var d = KJUR.asn1.cms;
  var c = KJUR.crypto;
  this.setCerts = function (p, h) {
    var n = [];
    for (var l = 0; l < p.length; l++) {
      var j = ASN1HEX.pemToHex(p[l]);
      var r = [];
      if (h != "sha256") {
        r.push(new f.AlgorithmIdentifier({
          name: h }));

      }
      var g = c.Util.hashHex(j, h);
      var q = new b.DEROctetString({
        hex: g });

      q.getEncodedHex();
      r.push(q);
      var m = new d.IssuerAndSerialNumber({
        cert: p[l] });

      m.getEncodedHex();
      r.push(m);
      var o = new b.DERSequence({
        array: r });

      o.getEncodedHex();
      n.push(o);
    }
    var k = new b.DERSequence({
      array: n });

    k.getEncodedHex();
    this.valueList = [k];
  };
  if (typeof e != "undefined") {
    if (typeof e.array == "object") {
      var a = "sha256";
      if (typeof e.hashAlg == "string") {
        a = e.hashAlg;
      }
      this.setCerts(e.array, a);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificateV2, KJUR.asn1.cms.Attribute);
KJUR.asn1.cms.IssuerAndSerialNumber = function (c) {
  KJUR.asn1.cms.IssuerAndSerialNumber.superclass.constructor.call(this);
  var e = null;
  var b = null;
  var a = KJUR.asn1;
  var d = a.x509;
  this.setByCertPEM = function (i) {
    var g = ASN1HEX.pemToHex(i);
    var f = new X509();
    f.hex = g;
    var j = f.getIssuerHex();
    this.dIssuer = new d.X500Name();
    this.dIssuer.hTLV = j;
    var h = f.getSerialNumberHex();
    this.dSerial = new a.DERInteger({
      hex: h });

  };
  this.getEncodedHex = function () {
    var f = new KJUR.asn1.DERSequence({
      array: [this.dIssuer, this.dSerial] });

    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c != "undefined") {
    if (typeof c == "string" && c.indexOf("-----BEGIN ") != -1) {
      this.setByCertPEM(c);
    }
    if (c.issuer && c.serial) {
      if (c.issuer instanceof KJUR.asn1.x509.X500Name) {
        this.dIssuer = c.issuer;
      } else {
        this.dIssuer = new KJUR.asn1.x509.X500Name(c.issuer);
      }
      if (c.serial instanceof KJUR.asn1.DERInteger) {
        this.dSerial = c.serial;
      } else {
        this.dSerial = new KJUR.asn1.DERInteger(c.serial);
      }
    }
    if (typeof c.cert == "string") {
      this.setByCertPEM(c.cert);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.IssuerAndSerialNumber, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.AttributeList = function (a) {
  KJUR.asn1.cms.AttributeList.superclass.constructor.call(this);
  this.list = new Array();
  this.sortFlag = true;
  this.add = function (b) {
    if (b instanceof KJUR.asn1.cms.Attribute) {
      this.list.push(b);
    }
  };
  this.length = function () {
    return this.list.length;
  };
  this.clear = function () {
    this.list = new Array();
    this.hTLV = null;
    this.hV = null;
  };
  this.getEncodedHex = function () {
    if (typeof this.hTLV == "string") {
      return this.hTLV;
    }
    var b = new KJUR.asn1.DERSet({
      array: this.list,
      sortflag: this.sortFlag });

    this.hTLV = b.getEncodedHex();
    return this.hTLV;
  };
  if (typeof a != "undefined") {
    if (typeof a.sortflag != "undefined" && a.sortflag == false) {
      this.sortFlag = false;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.AttributeList, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignerInfo = function (c) {
  KJUR.asn1.cms.SignerInfo.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.cms;
  var d = KJUR.asn1.x509;
  this.dCMSVersion = new a.DERInteger({
    "int": 1 });

  this.dSignerIdentifier = null;
  this.dDigestAlgorithm = null;
  this.dSignedAttrs = new b.AttributeList();
  this.dSigAlg = null;
  this.dSig = null;
  this.dUnsignedAttrs = new b.AttributeList();
  this.setSignerIdentifier = function (f) {
    if (typeof f == "string" && f.indexOf("CERTIFICATE") != -1 && f.indexOf("BEGIN") != -1 && f.indexOf("END") != -1) {
      var e = f;
      this.dSignerIdentifier = new b.IssuerAndSerialNumber({
        cert: f });

    }
  };
  this.setForContentAndHash = function (e) {
    if (typeof e != "undefined") {
      if (e.eciObj instanceof KJUR.asn1.cms.EncapsulatedContentInfo) {
        this.dSignedAttrs.add(new b.ContentType({
          oid: "1.2.840.113549.1.7.1" }));

        this.dSignedAttrs.add(new b.MessageDigest({
          eciObj: e.eciObj,
          hashAlg: e.hashAlg }));

      }
      if (typeof e.sdObj != "undefined" && e.sdObj instanceof KJUR.asn1.cms.SignedData) {
        if (e.sdObj.digestAlgNameList.join(":").indexOf(e.hashAlg) == -1) {
          e.sdObj.digestAlgNameList.push(e.hashAlg);
        }
      }
      if (typeof e.hashAlg == "string") {
        this.dDigestAlgorithm = new d.AlgorithmIdentifier({
          name: e.hashAlg });

      }
    }
  };
  this.sign = function (j, f) {
    this.dSigAlg = new d.AlgorithmIdentifier({
      name: f });

    var g = this.dSignedAttrs.getEncodedHex();
    var e = KEYUTIL.getKey(j);
    var i = new KJUR.crypto.Signature({
      alg: f });

    i.init(e);
    i.updateHex(g);
    var h = i.sign();
    this.dSig = new a.DEROctetString({
      hex: h });

  };
  this.addUnsigned = function (e) {
    this.hTLV = null;
    this.dUnsignedAttrs.hTLV = null;
    this.dUnsignedAttrs.add(e);
  };
  this.getEncodedHex = function () {
    if (this.dSignedAttrs instanceof KJUR.asn1.cms.AttributeList && this.dSignedAttrs.length() == 0) {
      throw "SignedAttrs length = 0 (empty)";
    }
    var e = new a.DERTaggedObject({
      obj: this.dSignedAttrs,
      tag: "a0",
      explicit: false });

    var h = null;
    if (this.dUnsignedAttrs.length() > 0) {
      h = new a.DERTaggedObject({
        obj: this.dUnsignedAttrs,
        tag: "a1",
        explicit: false });

    }
    var g = [this.dCMSVersion, this.dSignerIdentifier, this.dDigestAlgorithm, e, this.dSigAlg, this.dSig];
    if (h != null) {
      g.push(h);
    }
    var f = new a.DERSequence({
      array: g });

    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
};
YAHOO.lang.extend(KJUR.asn1.cms.SignerInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.EncapsulatedContentInfo = function (c) {
  KJUR.asn1.cms.EncapsulatedContentInfo.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.cms;
  var d = KJUR.asn1.x509;
  this.dEContentType = new a.DERObjectIdentifier({
    name: "data" });

  this.dEContent = null;
  this.isDetached = false;
  this.eContentValueHex = null;
  this.setContentType = function (e) {
    if (e.match(/^[0-2][.][0-9.]+$/)) {
      this.dEContentType = new a.DERObjectIdentifier({
        oid: e });

    } else {
      this.dEContentType = new a.DERObjectIdentifier({
        name: e });

    }
  };
  this.setContentValue = function (e) {
    if (typeof e != "undefined") {
      if (typeof e.hex == "string") {
        this.eContentValueHex = e.hex;
      } else {
        if (typeof e.str == "string") {
          this.eContentValueHex = utf8tohex(e.str);
        }
      }
    }
  };
  this.setContentValueHex = function (e) {
    this.eContentValueHex = e;
  };
  this.setContentValueStr = function (e) {
    this.eContentValueHex = utf8tohex(e);
  };
  this.getEncodedHex = function () {
    if (typeof this.eContentValueHex != "string") {
      throw "eContentValue not yet set";
    }
    var g = new a.DEROctetString({
      hex: this.eContentValueHex });

    this.dEContent = new a.DERTaggedObject({
      obj: g,
      tag: "a0",
      explicit: true });

    var e = [this.dEContentType];
    if (!this.isDetached) {
      e.push(this.dEContent);
    }
    var f = new a.DERSequence({
      array: e });

    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
};
YAHOO.lang.extend(KJUR.asn1.cms.EncapsulatedContentInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.ContentInfo = function (c) {
  KJUR.asn1.cms.ContentInfo.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.cms;
  var d = KJUR.asn1.x509;
  this.dContentType = null;
  this.dContent = null;
  this.setContentType = function (e) {
    if (typeof e == "string") {
      this.dContentType = d.OID.name2obj(e);
    }
  };
  this.getEncodedHex = function () {
    var f = new a.DERTaggedObject({
      obj: this.dContent,
      tag: "a0",
      explicit: true });

    var e = new a.DERSequence({
      array: [this.dContentType, f] });

    this.hTLV = e.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c != "undefined") {
    if (c.type) {
      this.setContentType(c.type);
    }
    if (c.obj && c.obj instanceof a.ASN1Object) {
      this.dContent = c.obj;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cms.ContentInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.SignedData = function (c) {
  KJUR.asn1.cms.SignedData.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.cms;
  var d = KJUR.asn1.x509;
  this.dCMSVersion = new a.DERInteger({
    "int": 1 });

  this.dDigestAlgs = null;
  this.digestAlgNameList = [];
  this.dEncapContentInfo = new b.EncapsulatedContentInfo();
  this.dCerts = null;
  this.certificateList = [];
  this.crlList = [];
  this.signerInfoList = [new b.SignerInfo()];
  this.addCertificatesByPEM = function (e) {
    var f = ASN1HEX.pemToHex(e);
    var g = new a.ASN1Object();
    g.hTLV = f;
    this.certificateList.push(g);
  };
  this.getEncodedHex = function () {
    if (typeof this.hTLV == "string") {
      return this.hTLV;
    }
    if (this.dDigestAlgs == null) {
      var k = [];
      for (var j = 0; j < this.digestAlgNameList.length; j++) {
        var h = this.digestAlgNameList[j];
        var m = new d.AlgorithmIdentifier({
          name: h });

        k.push(m);
      }
      this.dDigestAlgs = new a.DERSet({
        array: k });

    }
    var e = [this.dCMSVersion, this.dDigestAlgs, this.dEncapContentInfo];
    if (this.dCerts == null) {
      if (this.certificateList.length > 0) {
        var l = new a.DERSet({
          array: this.certificateList });

        this.dCerts = new a.DERTaggedObject({
          obj: l,
          tag: "a0",
          explicit: false });

      }
    }
    if (this.dCerts != null) {
      e.push(this.dCerts);
    }
    var g = new a.DERSet({
      array: this.signerInfoList });

    e.push(g);
    var f = new a.DERSequence({
      array: e });

    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
  this.getContentInfo = function () {
    this.getEncodedHex();
    var e = new b.ContentInfo({
      type: "signed-data",
      obj: this });

    return e;
  };
  this.getContentInfoEncodedHex = function () {
    var e = this.getContentInfo();
    var f = e.getEncodedHex();
    return f;
  };
  this.getPEM = function () {
    var e = this.getContentInfoEncodedHex();
    var f = a.ASN1Util.getPEMStringFromHex(e, "CMS");
    return f;
  };
};
YAHOO.lang.extend(KJUR.asn1.cms.SignedData, KJUR.asn1.ASN1Object);
KJUR.asn1.cms.CMSUtil = new
function () {}();
KJUR.asn1.cms.CMSUtil.newSignedData = function (a) {
  var h = KJUR.asn1.cms;
  var g = KJUR.asn1.cades;
  var f = new h.SignedData();
  f.dEncapContentInfo.setContentValue(a.content);
  if (typeof a.certs == "object") {
    for (var b = 0; b < a.certs.length; b++) {
      f.addCertificatesByPEM(a.certs[b]);
    }
  }
  f.signerInfoList = [];
  for (var b = 0; b < a.signerInfos.length; b++) {
    var d = a.signerInfos[b];
    var c = new h.SignerInfo();
    c.setSignerIdentifier(d.signerCert);
    c.setForContentAndHash({
      sdObj: f,
      eciObj: f.dEncapContentInfo,
      hashAlg: d.hashAlg });

    for (attrName in d.sAttr) {
      var j = d.sAttr[attrName];
      if (attrName == "SigningTime") {
        var e = new h.SigningTime(j);
        c.dSignedAttrs.add(e);
      }
      if (attrName == "SigningCertificate") {
        var e = new h.SigningCertificate(j);
        c.dSignedAttrs.add(e);
      }
      if (attrName == "SigningCertificateV2") {
        var e = new h.SigningCertificateV2(j);
        c.dSignedAttrs.add(e);
      }
      if (attrName == "SignaturePolicyIdentifier") {
        var e = new g.SignaturePolicyIdentifier(j);
        c.dSignedAttrs.add(e);
      }
    }
    c.sign(d.signerPrvKey, d.sigAlg);
    f.signerInfoList.push(c);
  }
  return f;
};
/*! asn1tsp-1.0.1.js (c) 2014 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.tsp == "undefined" || !KJUR.asn1.tsp) {
  KJUR.asn1.tsp = {};
}
KJUR.asn1.tsp.Accuracy = function (b) {
  KJUR.asn1.tsp.Accuracy.superclass.constructor.call(this);
  var a = KJUR.asn1;
  this.seconds = null;
  this.millis = null;
  this.micros = null;
  this.getEncodedHex = function () {
    var e = null;
    var g = null;
    var i = null;
    var c = [];
    if (this.seconds != null) {
      e = new a.DERInteger({
        "int": this.seconds });

      c.push(e);
    }
    if (this.millis != null) {
      var h = new a.DERInteger({
        "int": this.millis });

      g = new a.DERTaggedObject({
        obj: h,
        tag: "80",
        explicit: false });

      c.push(g);
    }
    if (this.micros != null) {
      var f = new a.DERInteger({
        "int": this.micros });

      i = new a.DERTaggedObject({
        obj: f,
        tag: "81",
        explicit: false });

      c.push(i);
    }
    var d = new a.DERSequence({
      array: c });

    this.hTLV = d.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b != "undefined") {
    if (typeof b.seconds == "number") {
      this.seconds = b.seconds;
    }
    if (typeof b.millis == "number") {
      this.millis = b.millis;
    }
    if (typeof b.micros == "number") {
      this.micros = b.micros;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.Accuracy, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.MessageImprint = function (b) {
  KJUR.asn1.tsp.MessageImprint.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var c = KJUR.asn1.x509;
  this.dHashAlg = null;
  this.dHashValue = null;
  this.getEncodedHex = function () {
    if (typeof this.hTLV == "string") {
      return this.hTLV;
    }
    var d = new a.DERSequence({
      array: [this.dHashAlg, this.dHashValue] });

    return d.getEncodedHex();
  };
  if (typeof b != "undefined") {
    if (typeof b.hashAlg == "string") {
      this.dHashAlg = new c.AlgorithmIdentifier({
        name: b.hashAlg });

    }
    if (typeof b.hashValue == "string") {
      this.dHashValue = new a.DEROctetString({
        hex: b.hashValue });

    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.MessageImprint, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TimeStampReq = function (c) {
  KJUR.asn1.tsp.TimeStampReq.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.tsp;
  this.dVersion = new a.DERInteger({
    "int": 1 });

  this.dMessageImprint = null;
  this.dPolicy = null;
  this.dNonce = null;
  this.certReq = true;
  this.setMessageImprint = function (d) {
    if (d instanceof KJUR.asn1.tsp.MessageImprint) {
      this.dMessageImprint = d;
      return;
    }
    if (typeof d == "object") {
      this.dMessageImprint = new b.MessageImprint(d);
    }
  };
  this.getEncodedHex = function () {
    if (this.dMessageImprint == null) {
      throw "messageImprint shall be specified";
    }
    var d = [this.dVersion, this.dMessageImprint];
    if (this.dPolicy != null) {
      d.push(this.dPolicy);
    }
    if (this.dNonce != null) {
      d.push(this.dNonce);
    }
    if (this.certReq) {
      d.push(new a.DERBoolean());
    }
    var e = new a.DERSequence({
      array: d });

    this.hTLV = e.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c != "undefined") {
    if (typeof c.mi == "object") {
      this.setMessageImprint(c.mi);
    }
    if (typeof c.policy == "object") {
      this.dPolicy = new a.DERObjectIdentifier(c.policy);
    }
    if (typeof c.nonce == "object") {
      this.dNonce = new a.DERInteger(c.nonce);
    }
    if (typeof c.certreq == "boolean") {
      this.certReq = c.certreq;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampReq, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TSTInfo = function (c) {
  KJUR.asn1.tsp.TSTInfo.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var d = KJUR.asn1.x509;
  var b = KJUR.asn1.tsp;
  this.dVersion = new a.DERInteger({
    "int": 1 });

  this.dPolicy = null;
  this.dMessageImprint = null;
  this.dSerialNumber = null;
  this.dGenTime = null;
  this.dAccuracy = null;
  this.dOrdering = null;
  this.dNonce = null;
  this.dTsa = null;
  this.getEncodedHex = function () {
    var e = [this.dVersion];
    if (this.dPolicy == null) {
      throw "policy shall be specified.";
    }
    e.push(this.dPolicy);
    if (this.dMessageImprint == null) {
      throw "messageImprint shall be specified.";
    }
    e.push(this.dMessageImprint);
    if (this.dSerialNumber == null) {
      throw "serialNumber shall be specified.";
    }
    e.push(this.dSerialNumber);
    if (this.dGenTime == null) {
      throw "genTime shall be specified.";
    }
    e.push(this.dGenTime);
    if (this.dAccuracy != null) {
      e.push(this.dAccuracy);
    }
    if (this.dOrdering != null) {
      e.push(this.dOrdering);
    }
    if (this.dNonce != null) {
      e.push(this.dNonce);
    }
    if (this.dTsa != null) {
      e.push(this.dTsa);
    }
    var f = new a.DERSequence({
      array: e });

    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c != "undefined") {
    if (typeof c.policy == "string") {
      if (!c.policy.match(/^[0-9.]+$/)) {
        throw "policy shall be oid like 0.1.4.134";
      }
      this.dPolicy = new a.DERObjectIdentifier({
        oid: c.policy });

    }
    if (typeof c.messageImprint != "undefined") {
      this.dMessageImprint = new b.MessageImprint(c.messageImprint);
    }
    if (typeof c.serialNumber != "undefined") {
      this.dSerialNumber = new a.DERInteger(c.serialNumber);
    }
    if (typeof c.genTime != "undefined") {
      this.dGenTime = new a.DERGeneralizedTime(c.genTime);
    }
    if (typeof c.accuracy != "undefind") {
      this.dAccuracy = new b.Accuracy(c.accuracy);
    }
    if (typeof c.ordering != "undefined" && c.ordering == true) {
      this.dOrdering = new a.DERBoolean();
    }
    if (typeof c.nonce != "undefined") {
      this.dNonce = new a.DERInteger(c.nonce);
    }
    if (typeof c.tsa != "undefined") {
      this.dTsa = new d.X500Name(c.tsa);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.TSTInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.TimeStampResp = function (c) {
  KJUR.asn1.tsp.TimeStampResp.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.tsp;
  this.dStatus = null;
  this.dTST = null;
  this.getEncodedHex = function () {
    if (this.dStatus == null) {
      throw "status shall be specified";
    }
    var d = [this.dStatus];
    if (this.dTST != null) {
      d.push(this.dTST);
    }
    var e = new a.DERSequence({
      array: d });

    this.hTLV = e.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c != "undefined") {
    if (typeof c.status == "object") {
      this.dStatus = new b.PKIStatusInfo(c.status);
    }
    if (typeof c.tst != "undefined" && c.tst instanceof KJUR.asn1.ASN1Object) {
      this.dTST = c.tst.getContentInfo();
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampResp, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatusInfo = function (c) {
  KJUR.asn1.tsp.PKIStatusInfo.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.tsp;
  this.dStatus = null;
  this.dStatusString = null;
  this.dFailureInfo = null;
  this.getEncodedHex = function () {
    if (this.dStatus == null) {
      throw "status shall be specified";
    }
    var d = [this.dStatus];
    if (this.dStatusString != null) {
      d.push(this.dStatusString);
    }
    if (this.dFailureInfo != null) {
      d.push(this.dFailureInfo);
    }
    var e = new a.DERSequence({
      array: d });

    this.hTLV = e.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c != "undefined") {
    if (typeof c.status == "object") {
      this.dStatus = new b.PKIStatus(c.status);
    }
    if (typeof c.statstr == "object") {
      this.dStatusString = new b.PKIFreeText({
        array: c.statstr });

    }
    if (typeof c.failinfo == "object") {
      this.dFailureInfo = new b.PKIFailureInfo(c.failinfo);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatusInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatus = function (e) {
  KJUR.asn1.tsp.PKIStatus.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.tsp;
  var d = null;
  this.getEncodedHex = function () {
    this.hTLV = this.dStatus.getEncodedHex();
    return this.hTLV;
  };
  if (typeof e != "undefined") {
    if (typeof e.name != "undefined") {
      var c = b.PKIStatus.valueList;
      if (typeof c[e.name] == "undefined") {
        throw "name undefined: " + e.name;
      }
      this.dStatus = new a.DERInteger({
        "int": c[e.name] });

    } else {
      this.dStatus = new a.DERInteger(e);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatus, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIStatus.valueList = {
  granted: 0,
  grantedWithMods: 1,
  rejection: 2,
  waiting: 3,
  revocationWarning: 4,
  revocationNotification: 5 };

KJUR.asn1.tsp.PKIFreeText = function (b) {
  KJUR.asn1.tsp.PKIFreeText.superclass.constructor.call(this);
  var a = KJUR.asn1;
  this.textList = [];
  this.getEncodedHex = function () {
    var c = [];
    for (var e = 0; e < this.textList.length; e++) {
      c.push(new a.DERUTF8String({
        str: this.textList[e] }));

    }
    var d = new a.DERSequence({
      array: c });

    this.hTLV = d.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b != "undefined") {
    if (typeof b.array == "object") {
      this.textList = b.array;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIFreeText, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIFailureInfo = function (d) {
  KJUR.asn1.tsp.PKIFailureInfo.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.tsp;
  this.value = null;
  this.getEncodedHex = function () {
    if (this.value == null) {
      throw "value shall be specified";
    }
    var e = new Number(this.value).toString(2);
    var f = new a.DERBitString();
    f.setByBinaryString(e);
    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
  if (typeof d != "undefined") {
    if (typeof d.name == "string") {
      var c = b.PKIFailureInfo.valueList;
      if (typeof c[d.name] == "undefined") {
        throw "name undefined: " + d.name;
      }
      this.value = c[d.name];
    } else {
      if (typeof d["int"] == "number") {
        this.value = d["int"];
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.PKIFailureInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.tsp.PKIFailureInfo.valueList = {
  badAlg: 0,
  badRequest: 2,
  badDataFormat: 5,
  timeNotAvailable: 14,
  unacceptedPolicy: 15,
  unacceptedExtension: 16,
  addInfoNotAvailable: 17,
  systemFailure: 25 };

KJUR.asn1.tsp.AbstractTSAAdapter = function (a) {
  this.getTSTHex = function (c, b) {
    throw "not implemented yet";
  };
};
KJUR.asn1.tsp.SimpleTSAAdapter = function (a) {
  KJUR.asn1.tsp.SimpleTSAAdapter.superclass.constructor.call(this);
  this.params = null;
  this.serial = 0;
  this.getTSTHex = function (c, b) {
    var e = KJUR.crypto.Util.hashHex(c, b);
    this.params.tstInfo.messageImprint = {
      hashAlg: b,
      hashValue: e };

    this.params.tstInfo.serialNumber = {
      "int": this.serial++ };

    var d = Math.floor(Math.random() * 1000000000);
    this.params.tstInfo.nonce = {
      "int": d };

    var f = KJUR.asn1.tsp.TSPUtil.newTimeStampToken(this.params);
    return f.getContentInfoEncodedHex();
  };
  if (typeof a != "undefined") {
    this.params = a;
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.SimpleTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);
KJUR.asn1.tsp.FixedTSAAdapter = function (a) {
  KJUR.asn1.tsp.FixedTSAAdapter.superclass.constructor.call(this);
  this.params = null;
  this.getTSTHex = function (c, b) {
    var d = KJUR.crypto.Util.hashHex(c, b);
    this.params.tstInfo.messageImprint = {
      hashAlg: b,
      hashValue: d };

    var e = KJUR.asn1.tsp.TSPUtil.newTimeStampToken(this.params);
    return e.getContentInfoEncodedHex();
  };
  if (typeof a != "undefined") {
    this.params = a;
  }
};
YAHOO.lang.extend(KJUR.asn1.tsp.FixedTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);
KJUR.asn1.tsp.TSPUtil = new
function () {}();
KJUR.asn1.tsp.TSPUtil.newTimeStampToken = function (b) {
  var j = KJUR.asn1.cms;
  var a = KJUR.asn1.tsp;
  var g = new j.SignedData();
  var e = new a.TSTInfo(b.tstInfo);
  var f = e.getEncodedHex();
  g.dEncapContentInfo.setContentValue({
    hex: f });

  g.dEncapContentInfo.setContentType("tstinfo");
  if (typeof b.certs == "object") {
    for (var c = 0; c < b.certs.length; c++) {
      g.addCertificatesByPEM(b.certs[c]);
    }
  }
  var d = g.signerInfoList[0];
  d.setSignerIdentifier(b.signerCert);
  d.setForContentAndHash({
    sdObj: g,
    eciObj: g.dEncapContentInfo,
    hashAlg: b.hashAlg });

  var h = new j.SigningCertificate({
    array: [b.signerCert] });

  d.dSignedAttrs.add(h);
  d.sign(b.signerPrvKey, b.sigAlg);
  return g;
};
KJUR.asn1.tsp.TSPUtil.parseTimeStampReq = function (d) {
  var f = {};
  f.certreq = false;
  var h = ASN1HEX.getPosArrayOfChildren_AtObj(d, 0);
  if (h.length < 2) {
    throw "TimeStampReq must have at least 2 items";
  }
  var c = ASN1HEX.getHexOfTLV_AtObj(d, h[1]);
  f.mi = KJUR.asn1.tsp.TSPUtil.parseMessageImprint(c);
  for (var e = 2; e < h.length; e++) {
    var b = h[e];
    var a = d.substr(b, 2);
    if (a == "06") {
      var g = ASN1HEX.getHexOfV_AtObj(d, b);
      f.policy = ASN1HEX.hextooidstr(g);
    }
    if (a == "02") {
      f.nonce = ASN1HEX.getHexOfV_AtObj(d, b);
    }
    if (a == "01") {
      f.certreq = true;
    }
  }
  return f;
};
KJUR.asn1.tsp.TSPUtil.parseMessageImprint = function (c) {
  var h = {};
  if (c.substr(0, 2) != "30") {
    throw "head of messageImprint hex shall be '30'";
  }
  var a = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
  var i = ASN1HEX.getDecendantIndexByNthList(c, 0, [0, 0]);
  var d = ASN1HEX.getHexOfV_AtObj(c, i);
  var e = ASN1HEX.hextooidstr(d);
  var g = KJUR.asn1.x509.OID.oid2name(e);
  if (g == "") {
    throw "hashAlg name undefined: " + e;
  }
  var b = g;
  var f = ASN1HEX.getDecendantIndexByNthList(c, 0, [1]);
  h.hashAlg = b;
  h.hashValue = ASN1HEX.getHexOfV_AtObj(c, f);
  return h;
};
/*! asn1cades-1.0.1.js (c) 2014-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.cades == "undefined" || !KJUR.asn1.cades) {
  KJUR.asn1.cades = {};
}
KJUR.asn1.cades.SignaturePolicyIdentifier = function (e) {
  KJUR.asn1.cades.SignaturePolicyIdentifier.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.16.2.15";
  var b = KJUR.asn1;
  var d = KJUR.asn1.cades;
  if (typeof e != "undefined") {
    if (typeof e.oid == "string" && typeof e.hash == "object") {
      var f = new b.DERObjectIdentifier({
        oid: e.oid });

      var a = new d.OtherHashAlgAndValue(e.hash);
      var c = new b.DERSequence({
        array: [f, a] });

      this.valueList = [c];
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyIdentifier, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.OtherHashAlgAndValue = function (b) {
  KJUR.asn1.cades.OtherHashAlgAndValue.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var c = KJUR.asn1.x509;
  this.dAlg = null;
  this.dHash = null;
  this.getEncodedHex = function () {
    var d = new a.DERSequence({
      array: [this.dAlg, this.dHash] });

    this.hTLV = d.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b != "undefined") {
    if (typeof b.alg == "string" && typeof b.hash == "string") {
      this.dAlg = new c.AlgorithmIdentifier({
        name: b.alg });

      this.dHash = new a.DEROctetString({
        hex: b.hash });

    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cades.OtherHashAlgAndValue, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.SignatureTimeStamp = function (c) {
  KJUR.asn1.cades.SignatureTimeStamp.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.16.2.14";
  this.tstHex = null;
  var a = KJUR.asn1;
  if (typeof c != "undefined") {
    if (typeof c.res != "undefined") {
      if (typeof c.res == "string" && c.res.match(/^[0-9A-Fa-f]+$/)) {} else {
        if (c.res instanceof KJUR.asn1.ASN1Object) {} else {
          throw "res param shall be ASN1Object or hex string";
        }
      }
    }
    if (typeof c.tst != "undefined") {
      if (typeof c.tst == "string" && c.tst.match(/^[0-9A-Fa-f]+$/)) {
        var b = new a.ASN1Object();
        this.tstHex = c.tst;
        b.hTLV = this.tstHex;
        b.getEncodedHex();
        this.valueList = [b];
      } else {
        if (c.tst instanceof KJUR.asn1.ASN1Object) {} else {
          throw "tst param shall be ASN1Object or hex string";
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cades.SignatureTimeStamp, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.CompleteCertificateRefs = function (c) {
  KJUR.asn1.cades.CompleteCertificateRefs.superclass.constructor.call(this);
  this.attrTypeOid = "1.2.840.113549.1.9.16.2.21";
  var a = KJUR.asn1;
  var b = KJUR.asn1.cades;
  this.setByArray = function (d) {
    this.valueList = [];
    for (var e = 0; e < d.length; e++) {
      var f = new b.OtherCertID(d[e]);
      this.valueList.push(f);
    }
  };
  if (typeof c != "undefined") {
    if (typeof c == "object" && typeof c.length == "number") {
      this.setByArray(c);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cades.CompleteCertificateRefs, KJUR.asn1.cms.Attribute);
KJUR.asn1.cades.OtherCertID = function (d) {
  KJUR.asn1.cades.OtherCertID.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var c = KJUR.asn1.cms;
  var b = KJUR.asn1.cades;
  this.hasIssuerSerial = true;
  this.dOtherCertHash = null;
  this.dIssuerSerial = null;
  this.setByCertPEM = function (e) {
    this.dOtherCertHash = new b.OtherHash(e);
    if (this.hasIssuerSerial) {
      this.dIssuerSerial = new c.IssuerAndSerialNumber(e);
    }
  };
  this.getEncodedHex = function () {
    if (this.hTLV != null) {
      return this.hTLV;
    }
    if (this.dOtherCertHash == null) {
      throw "otherCertHash not set";
    }
    var e = [this.dOtherCertHash];
    if (this.dIssuerSerial != null) {
      e.push(this.dIssuerSerial);
    }
    var f = new a.DERSequence({
      array: e });

    this.hTLV = f.getEncodedHex();
    return this.hTLV;
  };
  if (typeof d != "undefined") {
    if (typeof d == "string" && d.indexOf("-----BEGIN ") != -1) {
      this.setByCertPEM(d);
    }
    if (typeof d == "object") {
      if (d.hasis === false) {
        this.hasIssuerSerial = false;
      }
      if (typeof d.cert == "string") {
        this.setByCertPEM(d.cert);
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cades.OtherCertID, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.OtherHash = function (c) {
  KJUR.asn1.cades.OtherHash.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var b = KJUR.asn1.cades;
  this.alg = "sha256";
  this.dOtherHash = null;
  this.setByCertPEM = function (d) {
    if (d.indexOf("-----BEGIN ") == -1) {
      throw "certPEM not to seem PEM format";
    }
    var e = ASN1HEX.pemToHex(d);
    var f = KJUR.crypto.Util.hashHex(e, this.alg);
    this.dOtherHash = new b.OtherHashAlgAndValue({
      alg: this.alg,
      hash: f });

  };
  this.getEncodedHex = function () {
    if (this.dOtherHash == null) {
      throw "OtherHash not set";
    }
    return this.dOtherHash.getEncodedHex();
  };
  if (typeof c != "undefined") {
    if (typeof c == "string") {
      if (c.indexOf("-----BEGIN ") != -1) {
        this.setByCertPEM(c);
      } else {
        if (c.match(/^[0-9A-Fa-f]+$/)) {
          this.dOtherHash = new a.DEROctetString({
            hex: c });

        } else {
          throw "unsupported string value for params";
        }
      }
    } else {
      if (typeof c == "object") {
        if (typeof c.cert == "string") {
          if (typeof c.alg == "string") {
            this.alg = c.alg;
          }
          this.setByCertPEM(c.cert);
        } else {
          this.dOtherHash = new b.OtherHashAlgAndValue(c);
        }
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.cades.OtherHash, KJUR.asn1.ASN1Object);
KJUR.asn1.cades.CAdESUtil = new
function () {}();
KJUR.asn1.cades.CAdESUtil.addSigTS = function (c, b, a) {};
KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function (d) {
  var q = KJUR.asn1;
  var p = KJUR.asn1.cms;
  var c = KJUR.asn1.cades.CAdESUtil;
  var a = {};
  if (ASN1HEX.getDecendantHexTLVByNthList(d, 0, [0]) != "06092a864886f70d010702") {
    throw "hex is not CMS SignedData";
  }
  var s = ASN1HEX.getDecendantIndexByNthList(d, 0, [1, 0]);
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(d, s);
  if (b.length < 4) {
    throw "num of SignedData elem shall be 4 at least";
  }
  var f = b.shift();
  a.version = ASN1HEX.getHexOfTLV_AtObj(d, f);
  var l = b.shift();
  a.algs = ASN1HEX.getHexOfTLV_AtObj(d, l);
  var m = b.shift();
  a.encapcontent = ASN1HEX.getHexOfTLV_AtObj(d, m);
  a.certs = null;
  a.revs = null;
  a.si = [];
  var n = b.shift();
  if (d.substr(n, 2) == "a0") {
    a.certs = ASN1HEX.getHexOfTLV_AtObj(d, n);
    n = b.shift();
  }
  if (d.substr(n, 2) == "a1") {
    a.revs = ASN1HEX.getHexOfTLV_AtObj(d, n);
    n = b.shift();
  }
  var k = n;
  if (d.substr(k, 2) != "31") {
    throw "Can't find signerInfos";
  }
  var j = ASN1HEX.getPosArrayOfChildren_AtObj(d, k);
  for (var h = 0; h < j.length; h++) {
    var o = j[h];
    var e = c.parseSignerInfoForAddingUnsigned(d, o, h);
    a.si[h] = e;
  }
  var g = null;
  a.obj = new p.SignedData();
  g = new q.ASN1Object();
  g.hTLV = a.version;
  a.obj.dCMSVersion = g;
  g = new q.ASN1Object();
  g.hTLV = a.algs;
  a.obj.dDigestAlgs = g;
  g = new q.ASN1Object();
  g.hTLV = a.encapcontent;
  a.obj.dEncapContentInfo = g;
  g = new q.ASN1Object();
  g.hTLV = a.certs;
  a.obj.dCerts = g;
  a.obj.signerInfoList = [];
  for (var h = 0; h < a.si.length; h++) {
    a.obj.signerInfoList.push(a.si[h].obj);
  }
  return a;
};
KJUR.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function (d, k, a) {
  var m = KJUR.asn1;
  var l = KJUR.asn1.cms;
  var b = {};
  var e = ASN1HEX.getPosArrayOfChildren_AtObj(d, k);
  if (e.length != 6) {
    throw "not supported items for SignerInfo (!=6)";
  }
  var f = e.shift();
  b.version = ASN1HEX.getHexOfTLV_AtObj(d, f);
  var n = e.shift();
  b.si = ASN1HEX.getHexOfTLV_AtObj(d, n);
  var h = e.shift();
  b.digalg = ASN1HEX.getHexOfTLV_AtObj(d, h);
  var c = e.shift();
  b.sattrs = ASN1HEX.getHexOfTLV_AtObj(d, c);
  var i = e.shift();
  b.sigalg = ASN1HEX.getHexOfTLV_AtObj(d, i);
  var j = e.shift();
  b.sig = ASN1HEX.getHexOfTLV_AtObj(d, j);
  b.sigval = ASN1HEX.getHexOfV_AtObj(d, j);
  var g = null;
  b.obj = new l.SignerInfo();
  g = new m.ASN1Object();
  g.hTLV = b.version;
  b.obj.dCMSVersion = g;
  g = new m.ASN1Object();
  g.hTLV = b.si;
  b.obj.dSignerIdentifier = g;
  g = new m.ASN1Object();
  g.hTLV = b.digalg;
  b.obj.dDigestAlgorithm = g;
  g = new m.ASN1Object();
  g.hTLV = b.sattrs;
  b.obj.dSignedAttrs = g;
  g = new m.ASN1Object();
  g.hTLV = b.sigalg;
  b.obj.dSigAlg = g;
  g = new m.ASN1Object();
  g.hTLV = b.sig;
  b.obj.dSig = g;
  b.obj.dUnsignedAttrs = new l.AttributeList();
  return b;
};
/*! asn1csr-1.0.3.js (c) 2015-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR.asn1.csr == "undefined" || !KJUR.asn1.csr) {
  KJUR.asn1.csr = {};
}
KJUR.asn1.csr.CertificationRequest = function (f) {
  KJUR.asn1.csr.CertificationRequest.superclass.constructor.call(this);
  var b = null;
  var d = null;
  var e = null;
  var c = null;
  var a = null;
  this.sign = function (i, h) {
    if (this.prvKey == null) {
      this.prvKey = h;
    }
    this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier({
      name: i });

    sig = new KJUR.crypto.Signature({
      alg: i });

    sig.initSign(this.prvKey);
    sig.updateHex(this.asn1CSRInfo.getEncodedHex());
    this.hexSig = sig.sign();
    this.asn1Sig = new KJUR.asn1.DERBitString({
      hex: "00" + this.hexSig });

    var g = new KJUR.asn1.DERSequence({
      array: [this.asn1CSRInfo, this.asn1SignatureAlg, this.asn1Sig] });

    this.hTLV = g.getEncodedHex();
    this.isModified = false;
  };
  this.getPEMString = function () {
    var g = KJUR.asn1.ASN1Util.getPEMStringFromHex(this.getEncodedHex(), "CERTIFICATE REQUEST");
    return g;
  };
  this.getEncodedHex = function () {
    if (this.isModified == false && this.hTLV != null) {
      return this.hTLV;
    }
    throw "not signed yet";
  };
  if (typeof f != "undefined") {
    if (typeof f.csrinfo != "undefined") {
      this.asn1CSRInfo = f.csrinfo;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.CertificationRequestInfo = function (a) {
  KJUR.asn1.csr.CertificationRequestInfo.superclass.constructor.call(this);
  this._initialize = function () {
    this.asn1Array = new Array();
    this.asn1Version = new KJUR.asn1.DERInteger({
      "int": 0 });

    this.asn1Subject = null;
    this.asn1SubjPKey = null;
    this.extensionsArray = new Array();
  };
  this.setSubjectByParam = function (b) {
    this.asn1Subject = new KJUR.asn1.x509.X500Name(b);
  };
  this.setSubjectPublicKeyByGetKey = function (c) {
    var b = KEYUTIL.getKey(c);
    this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b);
  };
  this.appendExtensionByName = function (c, b) {
    KJUR.asn1.x509.Extension.appendByNameToArray(c, b, this.extensionsArray);
  };
  this.getEncodedHex = function () {
    this.asn1Array = new Array();
    this.asn1Array.push(this.asn1Version);
    this.asn1Array.push(this.asn1Subject);
    this.asn1Array.push(this.asn1SubjPKey);
    if (this.extensionsArray.length > 0) {
      var e = new KJUR.asn1.DERSequence({
        array: this.extensionsArray });

      var d = new KJUR.asn1.DERSet({
        array: [e] });

      var c = new KJUR.asn1.DERSequence({
        array: [new KJUR.asn1.DERObjectIdentifier({
          oid: "1.2.840.113549.1.9.14" }),
        d] });

      var b = new KJUR.asn1.DERTaggedObject({
        explicit: true,
        tag: "a0",
        obj: c });

      this.asn1Array.push(b);
    } else {
      var b = new KJUR.asn1.DERTaggedObject({
        explicit: false,
        tag: "a0",
        obj: new KJUR.asn1.DERNull() });

      this.asn1Array.push(b);
    }
    var f = new KJUR.asn1.DERSequence({
      array: this.asn1Array });

    this.hTLV = f.getEncodedHex();
    this.isModified = false;
    return this.hTLV;
  };
  this._initialize();
};
YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequestInfo, KJUR.asn1.ASN1Object);
KJUR.asn1.csr.CSRUtil = new
function () {}();
KJUR.asn1.csr.CSRUtil.newCSRPEM = function (g) {
  var d = KJUR.asn1.csr;
  if (g.subject === undefined) {
    throw "parameter subject undefined";
  }
  if (g.sbjpubkey === undefined) {
    throw "parameter sbjpubkey undefined";
  }
  if (g.sigalg === undefined) {
    throw "parameter sigalg undefined";
  }
  if (g.sbjprvkey === undefined) {
    throw "parameter sbjpubkey undefined";
  }
  var b = new d.CertificationRequestInfo();
  b.setSubjectByParam(g.subject);
  b.setSubjectPublicKeyByGetKey(g.sbjpubkey);
  if (g.ext !== undefined && g.ext.length !== undefined) {
    for (var c = 0; c < g.ext.length; c++) {
      for (key in g.ext[c]) {
        b.appendExtensionByName(key, g.ext[c][key]);
      }
    }
  }
  var e = new d.CertificationRequest({
    csrinfo: b });

  var a = KEYUTIL.getKey(g.sbjprvkey);
  e.sign(g.sigalg, a);
  var f = e.getPEMString();
  return f;
};
KJUR.asn1.csr.CSRUtil.getInfo = function (b) {
  var a = {};
  a.subject = {};
  a.pubkey = {};
  if (b.indexOf("-----BEGIN CERTIFICATE REQUEST") == -1) {
    throw "argument is not PEM file";
  }
  var c = ASN1HEX.pemToHex(b, "CERTIFICATE REQUEST");
  a.subject.hex = ASN1HEX.getDecendantHexTLVByNthList(c, 0, [0, 1]);
  a.subject.name = X509.hex2dn(a.subject.hex);
  a.pubkey.hex = ASN1HEX.getDecendantHexTLVByNthList(c, 0, [0, 2]);
  a.pubkey.obj = KEYUTIL.getKey(a.pubkey.hex, null, "pkcs8pub");
  return a;
};
/*! asn1ocsp-1.0.1.js (c) 2016 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
  KJUR.asn1 = {};
}
if (typeof KJUR.asn1.ocsp == "undefined" || !KJUR.asn1.ocsp) {
  KJUR.asn1.ocsp = {};
}
KJUR.asn1.ocsp.DEFAULT_HASH = "sha1";
KJUR.asn1.ocsp.CertID = function (c) {
  KJUR.asn1.ocsp.CertID.superclass.constructor.call(this);
  var a = KJUR.asn1;
  var e = KJUR.asn1.x509;
  this.dHashAlg = null;
  this.dIssuerNameHash = null;
  this.dIssuerKeyHash = null;
  this.dSerialNumber = null;
  this.setByValue = function (i, h, f, g) {
    if (g === undefined) {
      g = KJUR.asn1.ocsp.DEFAULT_HASH;
    }
    this.dHashAlg = new e.AlgorithmIdentifier({
      name: g });

    this.dIssuerNameHash = new a.DEROctetString({
      hex: i });

    this.dIssuerKeyHash = new a.DEROctetString({
      hex: h });

    this.dSerialNumber = new a.DERInteger({
      hex: f });

  };
  this.setByCert = function (m, i, k) {
    if (k === undefined) {
      k = KJUR.asn1.ocsp.DEFAULT_HASH;
    }
    var f = new X509();
    f.readCertPEM(i);
    var n = new X509();
    n.readCertPEM(m);
    var o = X509.getPublicKeyInfoPropOfCertPEM(m);
    var l = o.keyhex;
    var g = f.getSerialNumberHex();
    var h = KJUR.crypto.Util.hashHex(n.getSubjectHex(), k);
    var j = KJUR.crypto.Util.hashHex(l, k);
    this.setByValue(h, j, g, k);
    this.hoge = f.getSerialNumberHex();
  };
  this.getEncodedHex = function () {
    if (this.dHashAlg === null && this.dIssuerNameHash === null && this.dIssuerKeyHash === null && this.dSerialNumber === null) {
      throw "not yet set values";
    }
    var f = [this.dHashAlg, this.dIssuerNameHash, this.dIssuerKeyHash, this.dSerialNumber];
    var g = new a.DERSequence({
      array: f });

    this.hTLV = g.getEncodedHex();
    return this.hTLV;
  };
  if (typeof c !== "undefined") {
    var b = c;
    if (typeof b.issuerCert !== "undefined" && typeof b.subjectCert !== "undefined") {
      var d = KJUR.asn1.ocsp.DEFAULT_HASH;
      if (typeof b.alg === "undefined") {
        d = undefined;
      }
      this.setByCert(b.issuerCert, b.subjectCert, d);
    } else {
      if (typeof b.namehash !== "undefined" && typeof b.keyhash !== "undefined" && typeof b.serial !== "undefined") {
        var d = KJUR.asn1.ocsp.DEFAULT_HASH;
        if (typeof b.alg === "undefined") {
          d = undefined;
        }
        this.setByValue(b.namehash, b.keyhash, b.serial, d);
      } else {
        throw "invalid constructor arguments";
      }
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.CertID, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.Request = function (b) {
  KJUR.asn1.ocsp.Request.superclass.constructor.call(this);
  this.dReqCert = null;
  this.dExt = null;
  this.getEncodedHex = function () {
    var c = [];
    if (this.dReqCert === null) {
      throw "reqCert not set";
    }
    c.push(this.dReqCert);
    var d = new KJUR.asn1.DERSequence({
      array: c });

    this.hTLV = d.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b !== "undefined") {
    var a = new KJUR.asn1.ocsp.CertID(b);
    this.dReqCert = a;
  }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.Request, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.TBSRequest = function (a) {
  KJUR.asn1.ocsp.TBSRequest.superclass.constructor.call(this);
  this.version = 0;
  this.dRequestorName = null;
  this.dRequestList = [];
  this.dRequestExt = null;
  this.setRequestListByParam = function (d) {
    var b = [];
    for (var c = 0; c < d.length; c++) {
      var e = new KJUR.asn1.ocsp.Request(d[0]);
      b.push(e);
    }
    this.dRequestList = b;
  };
  this.getEncodedHex = function () {
    var b = [];
    if (this.version !== 0) {
      throw "not supported version: " + this.version;
    }
    if (this.dRequestorName !== null) {
      throw "requestorName not supported";
    }
    var d = new KJUR.asn1.DERSequence({
      array: this.dRequestList });

    b.push(d);
    if (this.dRequestExt !== null) {
      throw "requestExtensions not supported";
    }
    var c = new KJUR.asn1.DERSequence({
      array: b });

    this.hTLV = c.getEncodedHex();
    return this.hTLV;
  };
  if (typeof a !== "undefined") {
    if (typeof a.reqList !== "undefined") {
      this.setRequestListByParam(a.reqList);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.TBSRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.OCSPRequest = function (b) {
  KJUR.asn1.ocsp.OCSPRequest.superclass.constructor.call(this);
  this.dTbsRequest = null;
  this.dOptionalSignature = null;
  this.getEncodedHex = function () {
    var c = [];
    if (this.dTbsRequest !== null) {
      c.push(this.dTbsRequest);
    } else {
      throw "tbsRequest not set";
    }
    if (this.dOptionalSignature !== null) {
      throw "optionalSignature not supported";
    }
    var d = new KJUR.asn1.DERSequence({
      array: c });

    this.hTLV = d.getEncodedHex();
    return this.hTLV;
  };
  if (typeof b !== "undefined") {
    if (typeof b.reqList !== "undefined") {
      var a = new KJUR.asn1.ocsp.TBSRequest(b);
      this.dTbsRequest = a;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPRequest, KJUR.asn1.ASN1Object);
KJUR.asn1.ocsp.OCSPUtil = {};
KJUR.asn1.ocsp.OCSPUtil.getRequestHex = function (a, b, e) {
  if (e === undefined) {
    e = KJUR.asn1.ocsp.DEFAULT_HASH;
  }
  var d = {
    alg: e,
    issuerCert: a,
    subjectCert: b };

  var c = new KJUR.asn1.ocsp.OCSPRequest({
    reqList: [d] });

  return c.getEncodedHex();
};
KJUR.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function (f) {
  var a = {};
  try {
    var b = ASN1HEX.getVbyList(f, 0, [0], "0a");
    a.responseStatus = parseInt(b, 16);
  } catch (d) {}
  if (a.responseStatus !== 0) {
    return a;
  }
  try {
    var e = ASN1HEX.getDecendantIndexByNthList(f, 0, [1, 0, 1, 0, 0, 2, 0, 1]);
    if (f.substr(e, 2) === "80") {
      a.certStatus = "good";
    } else {
      if (f.substr(e, 2) === "a1") {
        a.certStatus = "revoked";
        a.revocationTime = hextoutf8(ASN1HEX.getDecendantHexVByNthList(f, e, [0]));
      } else {
        if (f.substr(e, 2) === "82") {
          a.certStatus = "unknown";
        }
      }
    }
  } catch (d) {}
  try {
    var c = ASN1HEX.getDecendantIndexByNthList(f, 0, [1, 0, 1, 0, 0, 2, 0, 2]);
    a.thisUpdate = hextoutf8(ASN1HEX.getHexOfV_AtObj(f, c));
  } catch (d) {}
  try {
    var g = ASN1HEX.getDecendantIndexByNthList(f, 0, [1, 0, 1, 0, 0, 2, 0, 3]);
    if (f.substr(g, 2) === "a0") {
      a.nextUpdate = hextoutf8(ASN1HEX.getDecendantHexVByNthList(f, g, [0]));
    }
  } catch (d) {}
  return a;
};
/*! base64x-1.1.8 (c) 2012-2016 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
var KJUR;
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.lang == "undefined" || !KJUR.lang) {
  KJUR.lang = {};
}
KJUR.lang.String = function () {};
function Base64x() {}
function stoBA(d) {
  var b = new Array();
  for (var c = 0; c < d.length; c++) {
    b[c] = d.charCodeAt(c);
  }
  return b;
}
function BAtos(b) {
  var d = "";
  for (var c = 0; c < b.length; c++) {
    d = d + String.fromCharCode(b[c]);
  }
  return d;
}
function BAtohex(b) {
  var e = "";
  for (var d = 0; d < b.length; d++) {
    var c = b[d].toString(16);
    if (c.length == 1) {
      c = "0" + c;
    }
    e = e + c;
  }
  return e;
}
function stohex(a) {
  return BAtohex(stoBA(a));
}
function stob64(a) {
  return hex2b64(stohex(a));
}
function stob64u(a) {
  return b64tob64u(hex2b64(stohex(a)));
}
function b64utos(a) {
  return BAtos(b64toBA(b64utob64(a)));
}
function b64tob64u(a) {
  a = a.replace(/\=/g, "");
  a = a.replace(/\+/g, "-");
  a = a.replace(/\//g, "_");
  return a;
}
function b64utob64(a) {
  if (a.length % 4 == 2) {
    a = a + "==";
  } else {
    if (a.length % 4 == 3) {
      a = a + "=";
    }
  }
  a = a.replace(/-/g, "+");
  a = a.replace(/_/g, "/");
  return a;
}
function hextob64u(a) {
  if (a.length % 2 == 1) {
    a = "0" + a;
  }
  return b64tob64u(hex2b64(a));
}
function b64utohex(a) {
  return b64tohex(b64utob64(a));
}
var utf8tob64u, b64utoutf8;
if (typeof Buffer === "function") {
  utf8tob64u = function utf8tob64u(a) {
    return b64tob64u(new Buffer(a, "utf8").toString("base64"));
  };
  b64utoutf8 = function b64utoutf8(a) {
    return new Buffer(b64utob64(a), "base64").toString("utf8");
  };
} else {
  utf8tob64u = function utf8tob64u(a) {
    return hextob64u(uricmptohex(encodeURIComponentAll(a)));
  };
  b64utoutf8 = function b64utoutf8(a) {
    return decodeURIComponent(hextouricmp(b64utohex(a)));
  };
}
function utf8tob64(a) {
  return hex2b64(uricmptohex(encodeURIComponentAll(a)));
}
function b64toutf8(a) {
  return decodeURIComponent(hextouricmp(b64tohex(a)));
}
function utf8tohex(a) {
  return uricmptohex(encodeURIComponentAll(a));
}
function hextoutf8(a) {
  return decodeURIComponent(hextouricmp(a));
}
function hextorstr(c) {
  var b = "";
  for (var a = 0; a < c.length - 1; a += 2) {
    b += String.fromCharCode(parseInt(c.substr(a, 2), 16));
  }
  return b;
}
function rstrtohex(c) {
  var a = "";
  for (var b = 0; b < c.length; b++) {
    a += ("0" + c.charCodeAt(b).toString(16)).slice(-2);
  }
  return a;
}
function hextob64(a) {
  return hex2b64(a);
}
function hextob64nl(b) {
  var a = hextob64(b);
  var c = a.replace(/(.{64})/g, "$1\r\n");
  c = c.replace(/\r\n$/, "");
  return c;
}
function b64nltohex(b) {
  var a = b.replace(/[^0-9A-Za-z\/+=]*/g, "");
  var c = b64tohex(a);
  return c;
}
function hextoArrayBuffer(d) {
  if (d.length % 2 != 0) {
    throw "input is not even length";
  }
  if (d.match(/^[0-9A-Fa-f]+$/) == null) {
    throw "input is not hexadecimal";
  }
  var b = new ArrayBuffer(d.length / 2);
  var a = new DataView(b);
  for (var c = 0; c < d.length / 2; c++) {
    a.setUint8(c, parseInt(d.substr(c * 2, 2), 16));
  }
  return b;
}
function ArrayBuffertohex(b) {
  var d = "";
  var a = new DataView(b);
  for (var c = 0; c < b.byteLength; c++) {
    d += ("00" + a.getUint8(c).toString(16)).slice(-2);
  }
  return d;
}
function uricmptohex(a) {
  return a.replace(/%/g, "");
}
function hextouricmp(a) {
  return a.replace(/(..)/g, "%$1");
}
function encodeURIComponentAll(a) {
  var d = encodeURIComponent(a);
  var b = "";
  for (var c = 0; c < d.length; c++) {
    if (d[c] == "%") {
      b = b + d.substr(c, 3);
      c = c + 2;
    } else {
      b = b + "%" + stohex(d[c]);
    }
  }
  return b;
}
function newline_toUnix(a) {
  a = a.replace(/\r\n/mg, "\n");
  return a;
}
function newline_toDos(a) {
  a = a.replace(/\r\n/mg, "\n");
  a = a.replace(/\n/mg, "\r\n");
  return a;
}
KJUR.lang.String.isInteger = function (a) {
  if (a.match(/^[0-9]+$/)) {
    return true;
  } else {
    if (a.match(/^-[0-9]+$/)) {
      return true;
    } else {
      return false;
    }
  }
};
KJUR.lang.String.isHex = function (a) {
  if (a.length % 2 == 0 && (a.match(/^[0-9a-f]+$/) || a.match(/^[0-9A-F]+$/))) {
    return true;
  } else {
    return false;
  }
};
KJUR.lang.String.isBase64 = function (a) {
  a = a.replace(/\s+/g, "");
  if (a.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a.length % 4 == 0) {
    return true;
  } else {
    return false;
  }
};
KJUR.lang.String.isBase64URL = function (a) {
  if (a.match(/[+/ = ] /)) {
    return false;
  }
  a = b64utob64(a);
  return KJUR.lang.String.isBase64(a);
};
KJUR.lang.String.isIntegerArray = function (a) {
  a = a.replace(/\s+/g, "");
  if (a.match(/^\[[0-9,]+\]$/)) {
    return true;
  } else {
    return false;
  }
};
function intarystrtohex(b) {
  b = b.replace(/^\s*\[\s*/, "");
  b = b.replace(/\s*\]\s*$/, "");
  b = b.replace(/\s*/g, "");
  try {
    var c = b.split(/,/).map(function (g, e, h) {
      var f = parseInt(g);
      if (f < 0 || 255 < f) {
        throw "integer not in range 0-255";
      }
      var d = ("00" + f.toString(16)).slice(-2);
      return d;
    }).join("");
    return c;
  } catch (a) {
    throw "malformed integer array string: " + a;
  }
}
var strdiffidx = function strdiffidx(c, a) {
  var d = c.length;
  if (c.length > a.length) {
    d = a.length;
  }
  for (var b = 0; b < d; b++) {
    if (c.charCodeAt(b) != a.charCodeAt(b)) {
      return b;
    }
  }
  if (c.length != a.length) {
    return d;
  }
  return -1;
};
/*! crypto-1.1.12.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.Util = new
function () {
  this.DIGESTINFOHEAD = {
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    ripemd160: "3021300906052b2403020105000414" };

  this.DEFAULTPROVIDER = {
    md5: "cryptojs",
    sha1: "cryptojs",
    sha224: "cryptojs",
    sha256: "cryptojs",
    sha384: "cryptojs",
    sha512: "cryptojs",
    ripemd160: "cryptojs",
    hmacmd5: "cryptojs",
    hmacsha1: "cryptojs",
    hmacsha224: "cryptojs",
    hmacsha256: "cryptojs",
    hmacsha384: "cryptojs",
    hmacsha512: "cryptojs",
    hmacripemd160: "cryptojs",
    MD5withRSA: "cryptojs/jsrsa",
    SHA1withRSA: "cryptojs/jsrsa",
    SHA224withRSA: "cryptojs/jsrsa",
    SHA256withRSA: "cryptojs/jsrsa",
    SHA384withRSA: "cryptojs/jsrsa",
    SHA512withRSA: "cryptojs/jsrsa",
    RIPEMD160withRSA: "cryptojs/jsrsa",
    MD5withECDSA: "cryptojs/jsrsa",
    SHA1withECDSA: "cryptojs/jsrsa",
    SHA224withECDSA: "cryptojs/jsrsa",
    SHA256withECDSA: "cryptojs/jsrsa",
    SHA384withECDSA: "cryptojs/jsrsa",
    SHA512withECDSA: "cryptojs/jsrsa",
    RIPEMD160withECDSA: "cryptojs/jsrsa",
    SHA1withDSA: "cryptojs/jsrsa",
    SHA224withDSA: "cryptojs/jsrsa",
    SHA256withDSA: "cryptojs/jsrsa",
    MD5withRSAandMGF1: "cryptojs/jsrsa",
    SHA1withRSAandMGF1: "cryptojs/jsrsa",
    SHA224withRSAandMGF1: "cryptojs/jsrsa",
    SHA256withRSAandMGF1: "cryptojs/jsrsa",
    SHA384withRSAandMGF1: "cryptojs/jsrsa",
    SHA512withRSAandMGF1: "cryptojs/jsrsa",
    RIPEMD160withRSAandMGF1: "cryptojs/jsrsa" };

  this.CRYPTOJSMESSAGEDIGESTNAME = {
    md5: CryptoJS.algo.MD5,
    sha1: CryptoJS.algo.SHA1,
    sha224: CryptoJS.algo.SHA224,
    sha256: CryptoJS.algo.SHA256,
    sha384: CryptoJS.algo.SHA384,
    sha512: CryptoJS.algo.SHA512,
    ripemd160: CryptoJS.algo.RIPEMD160 };

  this.getDigestInfoHex = function (a, b) {
    if (typeof this.DIGESTINFOHEAD[b] == "undefined") {
      throw "alg not supported in Util.DIGESTINFOHEAD: " + b;
    }
    return this.DIGESTINFOHEAD[b] + a;
  };
  this.getPaddedDigestInfoHex = function (h, a, j) {
    var c = this.getDigestInfoHex(h, a);
    var d = j / 4;
    if (c.length + 22 > d) {
      throw "key is too short for SigAlg: keylen=" + j + "," + a;
    }
    var b = "0001";
    var k = "00" + c;
    var g = "";
    var l = d - b.length - k.length;
    for (var f = 0; f < l; f += 2) {
      g += "ff";
    }
    var e = b + g + k;
    return e;
  };
  this.hashString = function (a, c) {
    var b = new KJUR.crypto.MessageDigest({
      alg: c });

    return b.digestString(a);
  };
  this.hashHex = function (b, c) {
    var a = new KJUR.crypto.MessageDigest({
      alg: c });

    return a.digestHex(b);
  };
  this.sha1 = function (a) {
    var b = new KJUR.crypto.MessageDigest({
      alg: "sha1",
      prov: "cryptojs" });

    return b.digestString(a);
  };
  this.sha256 = function (a) {
    var b = new KJUR.crypto.MessageDigest({
      alg: "sha256",
      prov: "cryptojs" });

    return b.digestString(a);
  };
  this.sha256Hex = function (a) {
    var b = new KJUR.crypto.MessageDigest({
      alg: "sha256",
      prov: "cryptojs" });

    return b.digestHex(a);
  };
  this.sha512 = function (a) {
    var b = new KJUR.crypto.MessageDigest({
      alg: "sha512",
      prov: "cryptojs" });

    return b.digestString(a);
  };
  this.sha512Hex = function (a) {
    var b = new KJUR.crypto.MessageDigest({
      alg: "sha512",
      prov: "cryptojs" });

    return b.digestHex(a);
  };
}();
KJUR.crypto.Util.md5 = function (a) {
  var b = new KJUR.crypto.MessageDigest({
    alg: "md5",
    prov: "cryptojs" });

  return b.digestString(a);
};
KJUR.crypto.Util.ripemd160 = function (a) {
  var b = new KJUR.crypto.MessageDigest({
    alg: "ripemd160",
    prov: "cryptojs" });

  return b.digestString(a);
};
KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom();
KJUR.crypto.Util.getRandomHexOfNbytes = function (b) {
  var a = new Array(b);
  KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);
  return BAtohex(a);
};
KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function (a) {
  return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a), 16);
};
KJUR.crypto.Util.getRandomHexOfNbits = function (d) {
  var c = d % 8;
  var a = (d - c) / 8;
  var b = new Array(a + 1);
  KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);
  b[0] = (255 << c & 255 ^ 255) & b[0];
  return BAtohex(b);
};
KJUR.crypto.Util.getRandomBigIntegerOfNbits = function (a) {
  return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a), 16);
};
KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function (b) {
  var a = b.bitLength();
  while (1) {
    var c = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);
    if (b.compareTo(c) != -1) {
      return c;
    }
  }
};
KJUR.crypto.Util.getRandomBigIntegerMinToMax = function (e, b) {
  var c = e.compareTo(b);
  if (c == 1) {
    throw "biMin is greater than biMax";
  }
  if (c == 0) {
    return e;
  }
  var a = b.subtract(e);
  var d = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);
  return d.add(e);
};
KJUR.crypto.MessageDigest = function (c) {
  var b = null;
  var a = null;
  var d = null;
  this.setAlgAndProvider = function (g, f) {
    g = KJUR.crypto.MessageDigest.getCanonicalAlgName(g);
    if (g !== null && f === undefined) {
      f = KJUR.crypto.Util.DEFAULTPROVIDER[g];
    }
    if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && f == "cryptojs") {
      try {
        this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create();
      } catch (e) {
        throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e;
      }
      this.updateString = function (h) {
        this.md.update(h);
      };
      this.updateHex = function (h) {
        var i = CryptoJS.enc.Hex.parse(h);
        this.md.update(i);
      };
      this.digest = function () {
        var h = this.md.finalize();
        return h.toString(CryptoJS.enc.Hex);
      };
      this.digestString = function (h) {
        this.updateString(h);
        return this.digest();
      };
      this.digestHex = function (h) {
        this.updateHex(h);
        return this.digest();
      };
    }
    if (":sha256:".indexOf(g) != -1 && f == "sjcl") {
      try {
        this.md = new sjcl.hash.sha256();
      } catch (e) {
        throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e;
      }
      this.updateString = function (h) {
        this.md.update(h);
      };
      this.updateHex = function (i) {
        var h = sjcl.codec.hex.toBits(i);
        this.md.update(h);
      };
      this.digest = function () {
        var h = this.md.finalize();
        return sjcl.codec.hex.fromBits(h);
      };
      this.digestString = function (h) {
        this.updateString(h);
        return this.digest();
      };
      this.digestHex = function (h) {
        this.updateHex(h);
        return this.digest();
      };
    }
  };
  this.updateString = function (e) {
    throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.updateHex = function (e) {
    throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.digest = function () {
    throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.digestString = function (e) {
    throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  this.digestHex = function (e) {
    throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
  };
  if (c !== undefined) {
    if (c.alg !== undefined) {
      this.algName = c.alg;
      if (c.prov === undefined) {
        this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
      }
      this.setAlgAndProvider(this.algName, this.provName);
    }
  }
};
KJUR.crypto.MessageDigest.getCanonicalAlgName = function (a) {
  if (typeof a === "string") {
    a = a.toLowerCase();
    a = a.replace(/-/, "");
  }
  return a;
};
KJUR.crypto.MessageDigest.getHashLength = function (c) {
  var b = KJUR.crypto.MessageDigest;
  var a = b.getCanonicalAlgName(c);
  if (b.HASHLENGTH[a] === undefined) {
    throw "not supported algorithm: " + c;
  }
  return b.HASHLENGTH[a];
};
KJUR.crypto.MessageDigest.HASHLENGTH = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  ripemd160: 20 };

KJUR.crypto.Mac = function (d) {
  var f = null;
  var c = null;
  var a = null;
  var e = null;
  var b = null;
  this.setAlgAndProvider = function (k, i) {
    k = k.toLowerCase();
    if (k == null) {
      k = "hmacsha1";
    }
    k = k.toLowerCase();
    if (k.substr(0, 4) != "hmac") {
      throw "setAlgAndProvider unsupported HMAC alg: " + k;
    }
    if (i === undefined) {
      i = KJUR.crypto.Util.DEFAULTPROVIDER[k];
    }
    this.algProv = k + "/" + i;
    var g = k.substr(4);
    if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && i == "cryptojs") {
      try {
        var j = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];
        this.mac = CryptoJS.algo.HMAC.create(j, this.pass);
      } catch (h) {
        throw "setAlgAndProvider hash alg set fail hashAlg=" + g + "/" + h;
      }
      this.updateString = function (l) {
        this.mac.update(l);
      };
      this.updateHex = function (l) {
        var m = CryptoJS.enc.Hex.parse(l);
        this.mac.update(m);
      };
      this.doFinal = function () {
        var l = this.mac.finalize();
        return l.toString(CryptoJS.enc.Hex);
      };
      this.doFinalString = function (l) {
        this.updateString(l);
        return this.doFinal();
      };
      this.doFinalHex = function (l) {
        this.updateHex(l);
        return this.doFinal();
      };
    }
  };
  this.updateString = function (g) {
    throw "updateString(str) not supported for this alg/prov: " + this.algProv;
  };
  this.updateHex = function (g) {
    throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;
  };
  this.doFinal = function () {
    throw "digest() not supported for this alg/prov: " + this.algProv;
  };
  this.doFinalString = function (g) {
    throw "digestString(str) not supported for this alg/prov: " + this.algProv;
  };
  this.doFinalHex = function (g) {
    throw "digestHex(hex) not supported for this alg/prov: " + this.algProv;
  };
  this.setPassword = function (h) {
    if (typeof h == "string") {
      var g = h;
      if (h.length % 2 == 1 || !h.match(/^[0-9A-Fa-f]+$/)) {
        g = rstrtohex(h);
      }
      this.pass = CryptoJS.enc.Hex.parse(g);
      return;
    }
    if (typeof h != "object") {
      throw "KJUR.crypto.Mac unsupported password type: " + h;
    }
    var g = null;
    if (h.hex !== undefined) {
      if (h.hex.length % 2 != 0 || !h.hex.match(/^[0-9A-Fa-f]+$/)) {
        throw "Mac: wrong hex password: " + h.hex;
      }
      g = h.hex;
    }
    if (h.utf8 !== undefined) {
      g = utf8tohex(h.utf8);
    }
    if (h.rstr !== undefined) {
      g = rstrtohex(h.rstr);
    }
    if (h.b64 !== undefined) {
      g = b64tohex(h.b64);
    }
    if (h.b64u !== undefined) {
      g = b64utohex(h.b64u);
    }
    if (g == null) {
      throw "KJUR.crypto.Mac unsupported password type: " + h;
    }
    this.pass = CryptoJS.enc.Hex.parse(g);
  };
  if (d !== undefined) {
    if (d.pass !== undefined) {
      this.setPassword(d.pass);
    }
    if (d.alg !== undefined) {
      this.algName = d.alg;
      if (d.prov === undefined) {
        this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
      }
      this.setAlgAndProvider(this.algName, this.provName);
    }
  }
};
KJUR.crypto.Signature = function (o) {
  var q = null;
  var n = null;
  var r = null;
  var c = null;
  var l = null;
  var d = null;
  var k = null;
  var h = null;
  var p = null;
  var e = null;
  var b = -1;
  var g = null;
  var j = null;
  var a = null;
  var i = null;
  var f = null;
  this._setAlgNames = function () {
    var s = this.algName.match(/^(.+)with(.+)$/);
    if (s) {
      this.mdAlgName = s[1].toLowerCase();
      this.pubkeyAlgName = s[2].toLowerCase();
    }
  };
  this._zeroPaddingOfSignature = function (x, w) {
    var v = "";
    var t = w / 4 - x.length;
    for (var u = 0; u < t; u++) {
      v = v + "0";
    }
    return v + x;
  };
  this.setAlgAndProvider = function (u, t) {
    this._setAlgNames();
    if (t != "cryptojs/jsrsa") {
      throw "provider not supported: " + t;
    }
    if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
      try {
        this.md = new KJUR.crypto.MessageDigest({
          alg: this.mdAlgName });

      } catch (s) {
        throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s;
      }
      this.init = function (w, x) {
        var y = null;
        try {
          if (x === undefined) {
            y = KEYUTIL.getKey(w);
          } else {
            y = KEYUTIL.getKey(w, x);
          }
        } catch (v) {
          throw "init failed:" + v;
        }
        if (y.isPrivate === true) {
          this.prvKey = y;
          this.state = "SIGN";
        } else {
          if (y.isPublic === true) {
            this.pubKey = y;
            this.state = "VERIFY";
          } else {
            throw "init failed.:" + y;
          }
        }
      };
      this.initSign = function (v) {
        if (typeof v.ecprvhex == "string" && typeof v.eccurvename == "string") {
          this.ecprvhex = v.ecprvhex;
          this.eccurvename = v.eccurvename;
        } else {
          this.prvKey = v;
        }
        this.state = "SIGN";
      };
      this.initVerifyByPublicKey = function (v) {
        if (typeof v.ecpubhex == "string" && typeof v.eccurvename == "string") {
          this.ecpubhex = v.ecpubhex;
          this.eccurvename = v.eccurvename;
        } else {
          if (v instanceof KJUR.crypto.ECDSA) {
            this.pubKey = v;
          } else {
            if (v instanceof RSAKey) {
              this.pubKey = v;
            }
          }
        }
        this.state = "VERIFY";
      };
      this.initVerifyByCertificatePEM = function (v) {
        var w = new X509();
        w.readCertPEM(v);
        this.pubKey = w.subjectPublicKeyRSA;
        this.state = "VERIFY";
      };
      this.updateString = function (v) {
        this.md.updateString(v);
      };
      this.updateHex = function (v) {
        this.md.updateHex(v);
      };
      this.sign = function () {
        this.sHashHex = this.md.digest();
        if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") {
          var v = new KJUR.crypto.ECDSA({
            curve: this.eccurvename });

          this.hSign = v.signHex(this.sHashHex, this.ecprvhex);
        } else {
          if (this.prvKey instanceof RSAKey && this.pubkeyAlgName == "rsaandmgf1") {
            this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
          } else {
            if (this.prvKey instanceof RSAKey && this.pubkeyAlgName == "rsa") {
              this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
            } else {
              if (this.prvKey instanceof KJUR.crypto.ECDSA) {
                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
              } else {
                if (this.prvKey instanceof KJUR.crypto.DSA) {
                  this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
                } else {
                  throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
                }
              }
            }
          }
        }
        return this.hSign;
      };
      this.signString = function (v) {
        this.updateString(v);
        return this.sign();
      };
      this.signHex = function (v) {
        this.updateHex(v);
        return this.sign();
      };
      this.verify = function (v) {
        this.sHashHex = this.md.digest();
        if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") {
          var w = new KJUR.crypto.ECDSA({
            curve: this.eccurvename });

          return w.verifyHex(this.sHashHex, v, this.ecpubhex);
        } else {
          if (this.pubKey instanceof RSAKey && this.pubkeyAlgName == "rsaandmgf1") {
            return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen);
          } else {
            if (this.pubKey instanceof RSAKey && this.pubkeyAlgName == "rsa") {
              return this.pubKey.verifyWithMessageHash(this.sHashHex, v);
            } else {
              if (this.pubKey instanceof KJUR.crypto.ECDSA) {
                return this.pubKey.verifyWithMessageHash(this.sHashHex, v);
              } else {
                if (this.pubKey instanceof KJUR.crypto.DSA) {
                  return this.pubKey.verifyWithMessageHash(this.sHashHex, v);
                } else {
                  throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
                }
              }
            }
          }
        }
      };
    }
  };
  this.init = function (s, t) {
    throw "init(key, pass) not supported for this alg:prov=" + this.algProvName;
  };
  this.initVerifyByPublicKey = function (s) {
    throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName;
  };
  this.initVerifyByCertificatePEM = function (s) {
    throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName;
  };
  this.initSign = function (s) {
    throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName;
  };
  this.updateString = function (s) {
    throw "updateString(str) not supported for this alg:prov=" + this.algProvName;
  };
  this.updateHex = function (s) {
    throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;
  };
  this.sign = function () {
    throw "sign() not supported for this alg:prov=" + this.algProvName;
  };
  this.signString = function (s) {
    throw "digestString(str) not supported for this alg:prov=" + this.algProvName;
  };
  this.signHex = function (s) {
    throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;
  };
  this.verify = function (s) {
    throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;
  };
  this.initParams = o;
  if (o !== undefined) {
    if (o.alg !== undefined) {
      this.algName = o.alg;
      if (o.prov === undefined) {
        this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
      } else {
        this.provName = o.prov;
      }
      this.algProvName = this.algName + ":" + this.provName;
      this.setAlgAndProvider(this.algName, this.provName);
      this._setAlgNames();
    }
    if (o.psssaltlen !== undefined) {
      this.pssSaltLen = o.psssaltlen;
    }
    if (o.prvkeypem !== undefined) {
      if (o.prvkeypas !== undefined) {
        throw "both prvkeypem and prvkeypas parameters not supported";
      } else {
        try {
          var q = new RSAKey();
          q.readPrivateKeyFromPEMString(o.prvkeypem);
          this.initSign(q);
        } catch (m) {
          throw "fatal error to load pem private key: " + m;
        }
      }
    }
  }
};
KJUR.crypto.Cipher = function (a) {};
KJUR.crypto.Cipher.encrypt = function (e, f, d) {
  if (f instanceof RSAKey && f.isPublic) {
    var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
    if (c === "RSA") {
      return f.encrypt(e);
    }
    if (c === "RSAOAEP") {
      return f.encryptOAEP(e, "sha1");
    }
    var b = c.match(/^RSAOAEP(\d+)$/);
    if (b !== null) {
      return f.encryptOAEP(e, "sha" + b[1]);
    }
    throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + d;
  } else {
    throw "Cipher.encrypt: unsupported key or algorithm";
  }
};
KJUR.crypto.Cipher.decrypt = function (e, f, d) {
  if (f instanceof RSAKey && f.isPrivate) {
    var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
    if (c === "RSA") {
      return f.decrypt(e);
    }
    if (c === "RSAOAEP") {
      return f.decryptOAEP(e, "sha1");
    }
    var b = c.match(/^RSAOAEP(\d+)$/);
    if (b !== null) {
      return f.decryptOAEP(e, "sha" + b[1]);
    }
    throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + d;
  } else {
    throw "Cipher.decrypt: unsupported key or algorithm";
  }
};
KJUR.crypto.Cipher.getAlgByKeyAndName = function (b, a) {
  if (b instanceof RSAKey) {
    if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a) != -1) {
      return a;
    }
    if (a === null || a === undefined) {
      return "RSA";
    }
    throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + a;
  }
  throw "getAlgByKeyAndName: not supported algorithm name: " + a;
};
KJUR.crypto.OID = new
function () {
  this.oidhex2name = {
    "2a864886f70d010101": "rsaEncryption",
    "2a8648ce3d0201": "ecPublicKey",
    "2a8648ce380401": "dsa",
    "2a8648ce3d030107": "secp256r1",
    "2b8104001f": "secp192k1",
    "2b81040021": "secp224r1",
    "2b8104000a": "secp256k1",
    "2b81040023": "secp521r1",
    "2b81040022": "secp384r1",
    "2a8648ce380403": "SHA1withDSA",
    "608648016503040301": "SHA224withDSA",
    "608648016503040302": "SHA256withDSA" };

}();
/*! ecdsa-modified-1.1.0.js (c) Stephan Thomas, Kenji Urushima | github.com/bitcoinjs/bitcoinjs-lib/blob/master/LICENSE
      */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.ECDSA = function (h) {
  var e = "secp256r1";
  var g = null;
  var b = null;
  var f = null;
  var a = new SecureRandom();
  var d = null;
  this.type = "EC";
  this.isPrivate = false;
  this.isPublic = false;
  function c(s, o, r, n) {
    var j = Math.max(o.bitLength(), n.bitLength());
    var t = s.add2D(r);
    var q = s.curve.getInfinity();
    for (var p = j - 1; p >= 0; --p) {
      q = q.twice2D();
      q.z = BigInteger.ONE;
      if (o.testBit(p)) {
        if (n.testBit(p)) {
          q = q.add2D(t);
        } else {
          q = q.add2D(s);
        }
      } else {
        if (n.testBit(p)) {
          q = q.add2D(r);
        }
      }
    }
    return q;
  }
  this.getBigRandom = function (i) {
    return new BigInteger(i.bitLength(), a).mod(i.subtract(BigInteger.ONE)).add(BigInteger.ONE);
  };
  this.setNamedCurve = function (i) {
    this.ecparams = KJUR.crypto.ECParameterDB.getByName(i);
    this.prvKeyHex = null;
    this.pubKeyHex = null;
    this.curveName = i;
  };
  this.setPrivateKeyHex = function (i) {
    this.isPrivate = true;
    this.prvKeyHex = i;
  };
  this.setPublicKeyHex = function (i) {
    this.isPublic = true;
    this.pubKeyHex = i;
  };
  this.getPublicKeyXYHex = function () {
    var k = this.pubKeyHex;
    if (k.substr(0, 2) !== "04") {
      throw "this method supports uncompressed format(04) only";
    }
    var j = this.ecparams.keylen / 4;
    if (k.length !== 2 + j * 2) {
      throw "malformed public key hex length";
    }
    var i = {};
    i.x = k.substr(2, j);
    i.y = k.substr(2 + j);
    return i;
  };
  this.getShortNISTPCurveName = function () {
    var i = this.curveName;
    if (i === "secp256r1" || i === "NIST P-256" || i === "P-256" || i === "prime256v1") {
      return "P-256";
    }
    if (i === "secp384r1" || i === "NIST P-384" || i === "P-384") {
      return "P-384";
    }
    return null;
  };
  this.generateKeyPairHex = function () {
    var k = this.ecparams.n;
    var n = this.getBigRandom(k);
    var l = this.ecparams.G.multiply(n);
    var q = l.getX().toBigInteger();
    var o = l.getY().toBigInteger();
    var i = this.ecparams.keylen / 4;
    var m = ("0000000000" + n.toString(16)).slice(-i);
    var r = ("0000000000" + q.toString(16)).slice(-i);
    var p = ("0000000000" + o.toString(16)).slice(-i);
    var j = "04" + r + p;
    this.setPrivateKeyHex(m);
    this.setPublicKeyHex(j);
    return {
      ecprvhex: m,
      ecpubhex: j };

  };
  this.signWithMessageHash = function (i) {
    return this.signHex(i, this.prvKeyHex);
  };
  this.signHex = function (o, j) {
    var t = new BigInteger(j, 16);
    var l = this.ecparams.n;
    var q = new BigInteger(o, 16);
    do {
      var m = this.getBigRandom(l);
      var u = this.ecparams.G;
      var p = u.multiply(m);
      var i = p.getX().toBigInteger().mod(l);
    } while (i.compareTo(BigInteger.ZERO) <= 0);
    var v = m.modInverse(l).multiply(q.add(t.multiply(i))).mod(l);
    return KJUR.crypto.ECDSA.biRSSigToASN1Sig(i, v);
  };
  this.sign = function (m, u) {
    var q = u;
    var j = this.ecparams.n;
    var p = BigInteger.fromByteArrayUnsigned(m);
    do {
      var l = this.getBigRandom(j);
      var t = this.ecparams.G;
      var o = t.multiply(l);
      var i = o.getX().toBigInteger().mod(j);
    } while (i.compareTo(BigInteger.ZERO) <= 0);
    var v = l.modInverse(j).multiply(p.add(q.multiply(i))).mod(j);
    return this.serializeSig(i, v);
  };
  this.verifyWithMessageHash = function (j, i) {
    return this.verifyHex(j, i, this.pubKeyHex);
  };
  this.verifyHex = function (m, i, p) {
    var l, j;
    var o = KJUR.crypto.ECDSA.parseSigHex(i);
    l = o.r;
    j = o.s;
    var k;
    k = ECPointFp.decodeFromHex(this.ecparams.curve, p);
    var n = new BigInteger(m, 16);
    return this.verifyRaw(n, l, j, k);
  };
  this.verify = function (o, p, j) {
    var l, i;
    if (Bitcoin.Util.isArray(p)) {
      var n = this.parseSig(p);
      l = n.r;
      i = n.s;
    } else {
      if ("object" === typeof p && p.r && p.s) {
        l = p.r;
        i = p.s;
      } else {
        throw "Invalid value for signature";
      }
    }
    var k;
    if (j instanceof ECPointFp) {
      k = j;
    } else {
      if (Bitcoin.Util.isArray(j)) {
        k = ECPointFp.decodeFrom(this.ecparams.curve, j);
      } else {
        throw "Invalid format for pubkey value, must be byte array or ECPointFp";
      }
    }
    var m = BigInteger.fromByteArrayUnsigned(o);
    return this.verifyRaw(m, l, i, k);
  };
  this.verifyRaw = function (o, i, w, m) {
    var l = this.ecparams.n;
    var u = this.ecparams.G;
    if (i.compareTo(BigInteger.ONE) < 0 || i.compareTo(l) >= 0) {
      return false;
    }
    if (w.compareTo(BigInteger.ONE) < 0 || w.compareTo(l) >= 0) {
      return false;
    }
    var p = w.modInverse(l);
    var k = o.multiply(p).mod(l);
    var j = i.multiply(p).mod(l);
    var q = u.multiply(k).add(m.multiply(j));
    var t = q.getX().toBigInteger().mod(l);
    return t.equals(i);
  };
  this.serializeSig = function (k, j) {
    var l = k.toByteArraySigned();
    var i = j.toByteArraySigned();
    var m = [];
    m.push(2);
    m.push(l.length);
    m = m.concat(l);
    m.push(2);
    m.push(i.length);
    m = m.concat(i);
    m.unshift(m.length);
    m.unshift(48);
    return m;
  };
  this.parseSig = function (n) {
    var m;
    if (n[0] != 48) {
      throw new Error("Signature not a valid DERSequence");
    }
    m = 2;
    if (n[m] != 2) {
      throw new Error("First element in signature must be a DERInteger");
    }
    var l = n.slice(m + 2, m + 2 + n[m + 1]);
    m += 2 + n[m + 1];
    if (n[m] != 2) {
      throw new Error("Second element in signature must be a DERInteger");
    }
    var i = n.slice(m + 2, m + 2 + n[m + 1]);
    m += 2 + n[m + 1];
    var k = BigInteger.fromByteArrayUnsigned(l);
    var j = BigInteger.fromByteArrayUnsigned(i);
    return {
      r: k,
      s: j };

  };
  this.parseSigCompact = function (m) {
    if (m.length !== 65) {
      throw "Signature has the wrong length";
    }
    var j = m[0] - 27;
    if (j < 0 || j > 7) {
      throw "Invalid signature type";
    }
    var o = this.ecparams.n;
    var l = BigInteger.fromByteArrayUnsigned(m.slice(1, 33)).mod(o);
    var k = BigInteger.fromByteArrayUnsigned(m.slice(33, 65)).mod(o);
    return {
      r: l,
      s: k,
      i: j };

  };
  this.readPKCS5PrvKeyHex = function (l) {
    var n = ASN1HEX;
    var m = KJUR.crypto.ECDSA.getName;
    var p = n.getVbyList;
    if (n.isASN1HEX(l) === false) {
      throw "not ASN.1 hex string";
    }
    var i, k, o;
    try {
      i = p(l, 0, [2, 0], "06");
      k = p(l, 0, [1], "04");
      try {
        o = p(l, 0, [3, 0], "03").substr(2);
      } catch (j) {}
    } catch (j) {
      throw "malformed PKCS#1/5 plain ECC private key";
    }
    this.curveName = m(i);
    if (this.curveName === undefined) {
      throw "unsupported curve name";
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(o);
    this.setPrivateKeyHex(k);
    this.isPublic = false;
  };
  this.readPKCS8PrvKeyHex = function (l) {
    var q = ASN1HEX;
    var i = KJUR.crypto.ECDSA.getName;
    var n = q.getVbyList;
    if (q.isASN1HEX(l) === false) {
      throw "not ASN.1 hex string";
    }
    var j, p, m, k;
    try {
      j = n(l, 0, [1, 0], "06");
      p = n(l, 0, [1, 1], "06");
      m = n(l, 0, [2, 0, 1], "04");
      try {
        k = n(l, 0, [2, 0, 2, 0], "03").substr(2);
      } catch (o) {}
    } catch (o) {
      throw "malformed PKCS#8 plain ECC private key";
    }
    this.curveName = i(p);
    if (this.curveName === undefined) {
      throw "unsupported curve name";
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(k);
    this.setPrivateKeyHex(m);
    this.isPublic = false;
  };
  this.readPKCS8PubKeyHex = function (l) {
    var n = ASN1HEX;
    var m = KJUR.crypto.ECDSA.getName;
    var p = n.getVbyList;
    if (n.isASN1HEX(l) === false) {
      throw "not ASN.1 hex string";
    }
    var k, i, o;
    try {
      k = p(l, 0, [0, 0], "06");
      i = p(l, 0, [0, 1], "06");
      o = p(l, 0, [1], "03").substr(2);
    } catch (j) {
      throw "malformed PKCS#8 ECC public key";
    }
    this.curveName = m(i);
    if (this.curveName === null) {
      throw "unsupported curve name";
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(o);
  };
  this.readCertPubKeyHex = function (k, p) {
    if (p !== 5) {
      p = 6;
    }
    var m = ASN1HEX;
    var l = KJUR.crypto.ECDSA.getName;
    var o = m.getVbyList;
    if (m.isASN1HEX(k) === false) {
      throw "not ASN.1 hex string";
    }
    var i, n;
    try {
      i = o(k, 0, [0, p, 0, 1], "06");
      n = o(k, 0, [0, p, 1], "03").substr(2);
    } catch (j) {
      throw "malformed X.509 certificate ECC public key";
    }
    this.curveName = l(i);
    if (this.curveName === null) {
      throw "unsupported curve name";
    }
    this.setNamedCurve(this.curveName);
    this.setPublicKeyHex(n);
  };
  if (h !== undefined) {
    if (h.curve !== undefined) {
      this.curveName = h.curve;
    }
  }
  if (this.curveName === undefined) {
    this.curveName = e;
  }
  this.setNamedCurve(this.curveName);
  if (h !== undefined) {
    if (h.prv !== undefined) {
      this.setPrivateKeyHex(h.prv);
    }
    if (h.pub !== undefined) {
      this.setPublicKeyHex(h.pub);
    }
  }
};
KJUR.crypto.ECDSA.parseSigHex = function (a) {
  var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
  var d = new BigInteger(b.r, 16);
  var c = new BigInteger(b.s, 16);
  return {
    r: d,
    s: c };

};
KJUR.crypto.ECDSA.parseSigHexInHexRS = function (c) {
  if (c.substr(0, 2) != "30") {
    throw "signature is not a ASN.1 sequence";
  }
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
  if (b.length != 2) {
    throw "number of signature ASN.1 sequence elements seem wrong";
  }
  var g = b[0];
  var f = b[1];
  if (c.substr(g, 2) != "02") {
    throw "1st item of sequene of signature is not ASN.1 integer";
  }
  if (c.substr(f, 2) != "02") {
    throw "2nd item of sequene of signature is not ASN.1 integer";
  }
  var e = ASN1HEX.getHexOfV_AtObj(c, g);
  var d = ASN1HEX.getHexOfV_AtObj(c, f);
  return {
    r: e,
    s: d };

};
KJUR.crypto.ECDSA.asn1SigToConcatSig = function (c) {
  var d = KJUR.crypto.ECDSA.parseSigHexInHexRS(c);
  var b = d.r;
  var a = d.s;
  if (b.substr(0, 2) == "00" && b.length / 2 * 8 % (16 * 8) == 8) {
    b = b.substr(2);
  }
  if (a.substr(0, 2) == "00" && a.length / 2 * 8 % (16 * 8) == 8) {
    a = a.substr(2);
  }
  if (b.length / 2 * 8 % (16 * 8) != 0) {
    throw "unknown ECDSA sig r length error";
  }
  if (a.length / 2 * 8 % (16 * 8) != 0) {
    throw "unknown ECDSA sig s length error";
  }
  return b + a;
};
KJUR.crypto.ECDSA.concatSigToASN1Sig = function (a) {
  if (a.length / 2 * 8 % (16 * 8) != 0) {
    throw "unknown ECDSA concatinated r-s sig  length error";
  }
  var c = a.substr(0, a.length / 2);
  var b = a.substr(a.length / 2);
  return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c, b);
};
KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function (b, a) {
  var d = new BigInteger(b, 16);
  var c = new BigInteger(a, 16);
  return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d, c);
};
KJUR.crypto.ECDSA.biRSSigToASN1Sig = function (e, c) {
  var b = new KJUR.asn1.DERInteger({
    bigint: e });

  var a = new KJUR.asn1.DERInteger({
    bigint: c });

  var d = new KJUR.asn1.DERSequence({
    array: [b, a] });

  return d.getEncodedHex();
};
KJUR.crypto.ECDSA.getName = function (a) {
  if (a === "2a8648ce3d030107") {
    return "secp256r1";
  }
  if (a === "2b8104000a") {
    return "secp256k1";
  }
  if (a === "2b81040022") {
    return "secp384r1";
  }
  if ("|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a) !== -1) {
    return "secp256r1";
  }
  if ("|secp256k1|".indexOf(a) !== -1) {
    return "secp256k1";
  }
  if ("|secp384r1|NIST P-384|P-384|".indexOf(a) !== -1) {
    return "secp384r1";
  }
  return null;
};
/*! ecparam-1.0.0.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.ECParameterDB = new
function () {
  var b = {};
  var c = {};
  function a(d) {
    return new BigInteger(d, 16);
  }
  this.getByName = function (e) {
    var d = e;
    if (typeof c[d] != "undefined") {
      d = c[e];
    }
    if (typeof b[d] != "undefined") {
      return b[d];
    }
    throw "unregistered EC curve name: " + d;
  };
  this.regist = function (A, l, o, g, m, e, j, f, k, u, d, x) {
    b[A] = {};
    var s = a(o);
    var z = a(g);
    var y = a(m);
    var t = a(e);
    var w = a(j);
    var r = new ECCurveFp(s, z, y);
    var q = r.decodePointHex("04" + f + k);
    b[A]["name"] = A;
    b[A]["keylen"] = l;
    b[A]["curve"] = r;
    b[A]["G"] = q;
    b[A]["n"] = t;
    b[A]["h"] = w;
    b[A]["oid"] = d;
    b[A]["info"] = x;
    for (var v = 0; v < u.length; v++) {
      c[u[v]] = A;
    }
  };
}();
KJUR.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field");
KJUR.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []);
KJUR.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []);
KJUR.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []);
KJUR.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []);
KJUR.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]);
KJUR.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]);
KJUR.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]);
/*! dsa-2.1.0.js (c) 2016-2017 Kenji Urushimma | kjur.github.com/jsrsasign/license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
  KJUR.crypto = {};
}
KJUR.crypto.DSA = function () {
  this.p = null;
  this.q = null;
  this.g = null;
  this.y = null;
  this.x = null;
  this.type = "DSA";
  this.isPrivate = false;
  this.isPublic = false;
  this.setPrivate = function (d, c, b, e, a) {
    this.isPrivate = true;
    this.p = d;
    this.q = c;
    this.g = b;
    this.y = e;
    this.x = a;
  };
  this.setPrivateHex = function (d, b, f, i, j) {
    var c, a, e, g, h;
    c = new BigInteger(d, 16);
    a = new BigInteger(b, 16);
    e = new BigInteger(f, 16);
    if (typeof i === "string" && i.length > 1) {
      g = new BigInteger(i, 16);
    } else {
      g = null;
    }
    h = new BigInteger(j, 16);
    this.setPrivate(c, a, e, g, h);
  };
  this.setPublic = function (c, b, a, d) {
    this.isPublic = true;
    this.p = c;
    this.q = b;
    this.g = a;
    this.y = d;
    this.x = null;
  };
  this.setPublicHex = function (f, e, d, g) {
    var b, a, h, c;
    b = new BigInteger(f, 16);
    a = new BigInteger(e, 16);
    h = new BigInteger(d, 16);
    c = new BigInteger(g, 16);
    this.setPublic(b, a, h, c);
  };
  this.signWithMessageHash = function (d) {
    var c = this.p;
    var b = this.q;
    var f = this.g;
    var i = this.y;
    var j = this.x;
    var e = KJUR.crypto.Util.getRandomBigIntegerMinToMax(BigInteger.ONE.add(BigInteger.ONE), b.subtract(BigInteger.ONE));
    var l = d.substr(0, b.bitLength() / 4);
    var h = new BigInteger(l, 16);
    var a = f.modPow(e, c).mod(b);
    var n = e.modInverse(b).multiply(h.add(j.multiply(a))).mod(b);
    var m = KJUR.asn1.ASN1Util.jsonToASN1HEX({
      seq: [{
        "int": {
          bigint: a } },


      {
        "int": {
          bigint: n } }] });



    return m;
  };
  this.verifyWithMessageHash = function (h, f) {
    var d = this.p;
    var b = this.q;
    var j = this.g;
    var l = this.y;
    var i = this.parseASN1Signature(f);
    var a = i[0];
    var t = i[1];
    var o = h.substr(0, b.bitLength() / 4);
    var k = new BigInteger(o, 16);
    if (BigInteger.ZERO.compareTo(a) > 0 || a.compareTo(b) > 0) {
      throw "invalid DSA signature";
    }
    if (BigInteger.ZERO.compareTo(t) > 0 || t.compareTo(b) > 0) {
      throw "invalid DSA signature";
    }
    var m = t.modInverse(b);
    var e = k.multiply(m).mod(b);
    var c = a.multiply(m).mod(b);
    var n = j.modPow(e, d).multiply(l.modPow(c, d)).mod(d).mod(b);
    return n.compareTo(a) == 0;
  };
  this.parseASN1Signature = function (a) {
    try {
      var d = new BigInteger(ASN1HEX.getVbyList(a, 0, [0], "02"), 16);
      var c = new BigInteger(ASN1HEX.getVbyList(a, 0, [1], "02"), 16);
      return [d, c];
    } catch (b) {
      throw "malformed ASN.1 DSA signature";
    }
  };
  this.readPKCS5PrvKeyHex = function (c) {
    var b, a, f, g, i;
    var j = ASN1HEX;
    var d = j.getVbyList;
    if (j.isASN1HEX(c) === false) {
      throw "not ASN.1 hex string";
    }
    try {
      b = d(c, 0, [1], "02");
      a = d(c, 0, [2], "02");
      f = d(c, 0, [3], "02");
      g = d(c, 0, [4], "02");
      i = d(c, 0, [5], "02");
    } catch (e) {
      console.log("EXCEPTION:" + e);
      throw "malformed PKCS#1/5 plain DSA private key";
    }
    this.setPrivateHex(b, a, f, g, i);
  };
  this.readPKCS8PrvKeyHex = function (d) {
    var f, c, b, g;
    var e = ASN1HEX;
    var i = e.getVbyList;
    if (e.isASN1HEX(d) === false) {
      throw "not ASN.1 hex string";
    }
    try {
      f = i(d, 0, [1, 1, 0], "02");
      c = i(d, 0, [1, 1, 1], "02");
      b = i(d, 0, [1, 1, 2], "02");
      g = i(d, 0, [2, 0], "02");
    } catch (a) {
      console.log("EXCEPTION:" + a);
      throw "malformed PKCS#8 plain DSA private key";
    }
    this.setPrivateHex(f, c, b, null, g);
  };
  this.readPKCS8PubKeyHex = function (d) {
    var f, c, b, g;
    var e = ASN1HEX;
    var i = e.getVbyList;
    if (e.isASN1HEX(d) === false) {
      throw "not ASN.1 hex string";
    }
    try {
      f = i(d, 0, [0, 1, 0], "02");
      c = i(d, 0, [0, 1, 1], "02");
      b = i(d, 0, [0, 1, 2], "02");
      g = i(d, 0, [1, 0], "02");
    } catch (a) {
      console.log("EXCEPTION:" + a);
      throw "malformed PKCS#8 DSA public key";
    }
    this.setPublicHex(f, c, b, g);
  };
  this.readCertPubKeyHex = function (c, f) {
    if (f !== 5) {
      f = 6;
    }
    var b, a, g, i;
    var j = ASN1HEX;
    var d = j.getVbyList;
    if (j.isASN1HEX(c) === false) {
      throw "not ASN.1 hex string";
    }
    try {
      b = d(c, 0, [0, f, 0, 1, 0], "02");
      a = d(c, 0, [0, f, 0, 1, 1], "02");
      g = d(c, 0, [0, f, 0, 1, 2], "02");
      i = d(c, 0, [0, f, 1, 0], "02");
    } catch (e) {
      console.log("EXCEPTION:" + e);
      throw "malformed X.509 certificate DSA public key";
    }
    this.setPublicHex(b, a, g, i);
  };
};
/*! pkcs5pkey-1.1.0.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
var PKCS5PKEY = function () {
  var c = function c(o, q, p) {
    return j(CryptoJS.AES, o, q, p);
  };
  var d = function d(o, q, p) {
    return j(CryptoJS.TripleDES, o, q, p);
  };
  var j = function j(r, w, t, p) {
    var q = CryptoJS.enc.Hex.parse(w);
    var v = CryptoJS.enc.Hex.parse(t);
    var o = CryptoJS.enc.Hex.parse(p);
    var s = {};
    s.key = v;
    s.iv = o;
    s.ciphertext = q;
    var u = r.decrypt(s, v, {
      iv: o });

    return CryptoJS.enc.Hex.stringify(u);
  };
  var k = function k(o, q, p) {
    return e(CryptoJS.AES, o, q, p);
  };
  var n = function n(o, q, p) {
    return e(CryptoJS.TripleDES, o, q, p);
  };
  var e = function e(t, y, w, q) {
    var s = CryptoJS.enc.Hex.parse(y);
    var x = CryptoJS.enc.Hex.parse(w);
    var p = CryptoJS.enc.Hex.parse(q);
    var o = {};
    var v = t.encrypt(s, x, {
      iv: p });

    var r = CryptoJS.enc.Hex.parse(v.toString());
    var u = CryptoJS.enc.Base64.stringify(r);
    return u;
  };
  var g = {
    "AES-256-CBC": {
      proc: c,
      eproc: k,
      keylen: 32,
      ivlen: 16 },

    "AES-192-CBC": {
      proc: c,
      eproc: k,
      keylen: 24,
      ivlen: 16 },

    "AES-128-CBC": {
      proc: c,
      eproc: k,
      keylen: 16,
      ivlen: 16 },

    "DES-EDE3-CBC": {
      proc: d,
      eproc: n,
      keylen: 24,
      ivlen: 8 } };


  var b = function b(o) {
    return g[o]["proc"];
  };
  var l = function l(o) {
    var q = CryptoJS.lib.WordArray.random(o);
    var p = CryptoJS.enc.Hex.stringify(q);
    return p;
  };
  var m = function m(u) {
    var v = {};
    var p = u.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
    if (p) {
      v.cipher = p[1];
      v.ivsalt = p[2];
    }
    var o = u.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
    if (o) {
      v.type = o[1];
    }
    var t = -1;
    var w = 0;
    if (u.indexOf("\r\n\r\n") != -1) {
      t = u.indexOf("\r\n\r\n");
      w = 2;
    }
    if (u.indexOf("\n\n") != -1) {
      t = u.indexOf("\n\n");
      w = 1;
    }
    var r = u.indexOf("-----END");
    if (t != -1 && r != -1) {
      var q = u.substring(t + w * 2, r - w);
      q = q.replace(/\s+/g, "");
      v.data = q;
    }
    return v;
  };
  var i = function i(p, x, o) {
    var u = o.substring(0, 16);
    var s = CryptoJS.enc.Hex.parse(u);
    var q = CryptoJS.enc.Utf8.parse(x);
    var t = g[p]["keylen"] + g[p]["ivlen"];
    var w = "";
    var v = null;
    for (;;) {
      var r = CryptoJS.algo.MD5.create();
      if (v != null) {
        r.update(v);
      }
      r.update(q);
      r.update(s);
      v = r.finalize();
      w = w + CryptoJS.enc.Hex.stringify(v);
      if (w.length >= t * 2) {
        break;
      }
    }
    var y = {};
    y.keyhex = w.substr(0, g[p]["keylen"] * 2);
    y.ivhex = w.substr(g[p]["keylen"] * 2, g[p]["ivlen"] * 2);
    return y;
  };
  var a = function a(o, u, q, v) {
    var r = CryptoJS.enc.Base64.parse(o);
    var p = CryptoJS.enc.Hex.stringify(r);
    var t = g[u]["proc"];
    var s = t(p, q, v);
    return s;
  };
  var f = function f(o, r, p, t) {
    var q = g[r]["eproc"];
    var s = q(o, p, t);
    return s;
  };
  return {
    version: "1.0.5",
    getHexFromPEM: function getHexFromPEM(o, p) {
      return ASN1HEX.pemToHex(o, p);
    },
    getDecryptedKeyHexByKeyIV: function getDecryptedKeyHexByKeyIV(p, s, r, q) {
      var o = b(s);
      return o(p, r, q);
    },
    parsePKCS5PEM: function parsePKCS5PEM(o) {
      return m(o);
    },
    getKeyAndUnusedIvByPasscodeAndIvsalt: function getKeyAndUnusedIvByPasscodeAndIvsalt(p, o, q) {
      return i(p, o, q);
    },
    decryptKeyB64: function decryptKeyB64(o, q, p, r) {
      return a(o, q, p, r);
    },
    getDecryptedKeyHex: function getDecryptedKeyHex(x, w) {
      var p = m(x);
      var s = p.type;
      var q = p.cipher;
      var o = p.ivsalt;
      var r = p.data;
      var v = i(q, w, o);
      var u = v.keyhex;
      var t = a(r, q, u, o);
      return t;
    },
    getRSAKeyFromEncryptedPKCS5PEM: function getRSAKeyFromEncryptedPKCS5PEM(q, p) {
      var r = this.getDecryptedKeyHex(q, p);
      var o = new RSAKey();
      o.readPrivateKeyFromASN1HexString(r);
      return o;
    },
    getEncryptedPKCS5PEMFromPrvKeyHex: function getEncryptedPKCS5PEMFromPrvKeyHex(r, y, s, q) {
      if (typeof s == "undefined" || s == null) {
        s = "AES-256-CBC";
      }
      if (typeof g[s] == "undefined") {
        throw "PKCS5PKEY unsupported algorithm: " + s;
      }
      if (typeof q == "undefined" || q == null) {
        var u = g[s]["ivlen"];
        var t = l(u);
        q = t.toUpperCase();
      }
      var x = i(s, y, q);
      var w = x.keyhex;
      var v = f(r, s, w, q);
      var p = v.replace(/(.{64})/g, "$1\r\n");
      var o = "-----BEGIN RSA PRIVATE KEY-----\r\n";
      o += "Proc-Type: 4,ENCRYPTED\r\n";
      o += "DEK-Info: " + s + "," + q + "\r\n";
      o += "\r\n";
      o += p;
      o += "\r\n-----END RSA PRIVATE KEY-----\r\n";
      return o;
    },
    getEncryptedPKCS5PEMFromRSAKey: function getEncryptedPKCS5PEMFromRSAKey(C, D, o, s) {
      var A = new KJUR.asn1.DERInteger({
        "int": 0 });

      var v = new KJUR.asn1.DERInteger({
        bigint: C.n });

      var z = new KJUR.asn1.DERInteger({
        "int": C.e });

      var B = new KJUR.asn1.DERInteger({
        bigint: C.d });

      var t = new KJUR.asn1.DERInteger({
        bigint: C.p });

      var r = new KJUR.asn1.DERInteger({
        bigint: C.q });

      var y = new KJUR.asn1.DERInteger({
        bigint: C.dmp1 });

      var u = new KJUR.asn1.DERInteger({
        bigint: C.dmq1 });

      var x = new KJUR.asn1.DERInteger({
        bigint: C.coeff });

      var E = new KJUR.asn1.DERSequence({
        array: [A, v, z, B, t, r, y, u, x] });

      var w = E.getEncodedHex();
      return this.getEncryptedPKCS5PEMFromPrvKeyHex(w, D, o, s);
    },
    newEncryptedPKCS5PEM: function newEncryptedPKCS5PEM(o, p, s, t) {
      if (typeof p == "undefined" || p == null) {
        p = 1024;
      }
      if (typeof s == "undefined" || s == null) {
        s = "10001";
      }
      var q = new RSAKey();
      q.generate(p, s);
      var r = null;
      if (typeof t == "undefined" || t == null) {
        r = this.getEncryptedPKCS5PEMFromRSAKey(pkey, o);
      } else {
        r = this.getEncryptedPKCS5PEMFromRSAKey(pkey, o, t);
      }
      return r;
    },
    getRSAKeyFromPlainPKCS8PEM: function getRSAKeyFromPlainPKCS8PEM(q) {
      if (q.match(/ENCRYPTED/)) {
        throw "pem shall be not ENCRYPTED";
      }
      var p = ASN1HEX.pemToHex(q, "PRIVATE KEY");
      var o = this.getRSAKeyFromPlainPKCS8Hex(p);
      return o;
    },
    getRSAKeyFromPlainPKCS8Hex: function getRSAKeyFromPlainPKCS8Hex(p) {
      var o = new RSAKey();
      o.readPKCS8PrvKeyHex(p);
      return o;
    },
    parseHexOfEncryptedPKCS8: function parseHexOfEncryptedPKCS8(v) {
      var r = {};
      var q = ASN1HEX.getPosArrayOfChildren_AtObj(v, 0);
      if (q.length != 2) {
        throw "malformed format: SEQUENCE(0).items != 2: " + q.length;
      }
      r.ciphertext = ASN1HEX.getHexOfV_AtObj(v, q[1]);
      var x = ASN1HEX.getPosArrayOfChildren_AtObj(v, q[0]);
      if (x.length != 2) {
        throw "malformed format: SEQUENCE(0.0).items != 2: " + x.length;
      }
      if (ASN1HEX.getHexOfV_AtObj(v, x[0]) != "2a864886f70d01050d") {
        throw "this only supports pkcs5PBES2";
      }
      var o = ASN1HEX.getPosArrayOfChildren_AtObj(v, x[1]);
      if (x.length != 2) {
        throw "malformed format: SEQUENCE(0.0.1).items != 2: " + o.length;
      }
      var p = ASN1HEX.getPosArrayOfChildren_AtObj(v, o[1]);
      if (p.length != 2) {
        throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + p.length;
      }
      if (ASN1HEX.getHexOfV_AtObj(v, p[0]) != "2a864886f70d0307") {
        throw "this only supports TripleDES";
      }
      r.encryptionSchemeAlg = "TripleDES";
      r.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(v, p[1]);
      var s = ASN1HEX.getPosArrayOfChildren_AtObj(v, o[0]);
      if (s.length != 2) {
        throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + s.length;
      }
      if (ASN1HEX.getHexOfV_AtObj(v, s[0]) != "2a864886f70d01050c") {
        throw "this only supports pkcs5PBKDF2";
      }
      var w = ASN1HEX.getPosArrayOfChildren_AtObj(v, s[1]);
      if (w.length < 2) {
        throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + w.length;
      }
      r.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(v, w[0]);
      var t = ASN1HEX.getHexOfV_AtObj(v, w[1]);
      try {
        r.pbkdf2Iter = parseInt(t, 16);
      } catch (u) {
        throw "malformed format pbkdf2Iter: " + t;
      }
      return r;
    },
    getPBKDF2KeyHexFromParam: function getPBKDF2KeyHexFromParam(t, o) {
      var s = CryptoJS.enc.Hex.parse(t.pbkdf2Salt);
      var p = t.pbkdf2Iter;
      var r = CryptoJS.PBKDF2(o, s, {
        keySize: 192 / 32,
        iterations: p });

      var q = CryptoJS.enc.Hex.stringify(r);
      return q;
    },
    getPlainPKCS8HexFromEncryptedPKCS8PEM: function getPlainPKCS8HexFromEncryptedPKCS8PEM(w, x) {
      var q = ASN1HEX.pemToHex(w, "ENCRYPTED PRIVATE KEY");
      var o = this.parseHexOfEncryptedPKCS8(q);
      var t = PKCS5PKEY.getPBKDF2KeyHexFromParam(o, x);
      var u = {};
      u.ciphertext = CryptoJS.enc.Hex.parse(o.ciphertext);
      var s = CryptoJS.enc.Hex.parse(t);
      var r = CryptoJS.enc.Hex.parse(o.encryptionSchemeIV);
      var v = CryptoJS.TripleDES.decrypt(u, s, {
        iv: r });

      var p = CryptoJS.enc.Hex.stringify(v);
      return p;
    },
    getRSAKeyFromEncryptedPKCS8PEM: function getRSAKeyFromEncryptedPKCS8PEM(r, q) {
      var p = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(r, q);
      var o = this.getRSAKeyFromPlainPKCS8Hex(p);
      return o;
    },
    getKeyFromEncryptedPKCS8PEM: function getKeyFromEncryptedPKCS8PEM(r, p) {
      var o = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(r, p);
      var q = this.getKeyFromPlainPrivatePKCS8Hex(o);
      return q;
    },
    parsePlainPrivatePKCS8Hex: function parsePlainPrivatePKCS8Hex(r) {
      var p = {};
      p.algparam = null;
      if (r.substr(0, 2) != "30") {
        throw "malformed plain PKCS8 private key(code:001)";
      }
      var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
      if (q.length != 3) {
        throw "malformed plain PKCS8 private key(code:002)";
      }
      if (r.substr(q[1], 2) != "30") {
        throw "malformed PKCS8 private key(code:003)";
      }
      var o = ASN1HEX.getPosArrayOfChildren_AtObj(r, q[1]);
      if (o.length != 2) {
        throw "malformed PKCS8 private key(code:004)";
      }
      if (r.substr(o[0], 2) != "06") {
        throw "malformed PKCS8 private key(code:005)";
      }
      p.algoid = ASN1HEX.getHexOfV_AtObj(r, o[0]);
      if (r.substr(o[1], 2) == "06") {
        p.algparam = ASN1HEX.getHexOfV_AtObj(r, o[1]);
      }
      if (r.substr(q[2], 2) != "04") {
        throw "malformed PKCS8 private key(code:006)";
      }
      p.keyidx = ASN1HEX.getStartPosOfV_AtObj(r, q[2]);
      return p;
    },
    getKeyFromPlainPrivatePKCS8PEM: function getKeyFromPlainPrivatePKCS8PEM(p) {
      var o = ASN1HEX.pemToHex(p, "PRIVATE KEY");
      var q = this.getKeyFromPlainPrivatePKCS8Hex(o);
      return q;
    },
    getKeyFromPlainPrivatePKCS8Hex: function getKeyFromPlainPrivatePKCS8Hex(o) {
      var p = this.parsePlainPrivatePKCS8Hex(o);
      var q;
      if (p.algoid == "2a864886f70d010101") {
        q = new RSAKey();
      } else {
        if (p.algoid == "2a8648ce380401") {
          q = new KJUR.crypto.DSA();
        } else {
          if (p.algoid == "2a8648ce3d0201") {
            q = new KJUR.crypto.ECDSA();
          } else {
            throw "unsupported private key algorithm";
          }
        }
      }
      q.readPKCS8PrvKeyHex(o);
      return q;
    },
    getRSAKeyFromPublicPKCS8PEM: function getRSAKeyFromPublicPKCS8PEM(p) {
      var q = ASN1HEX.pemToHex(p, "PUBLIC KEY");
      var o = this.getRSAKeyFromPublicPKCS8Hex(q);
      return o;
    },
    getKeyFromPublicPKCS8PEM: function getKeyFromPublicPKCS8PEM(p) {
      var q = ASN1HEX.pemToHex(p, "PUBLIC KEY");
      var o = this.getKeyFromPublicPKCS8Hex(q);
      return o;
    },
    getKeyFromPublicPKCS8Hex: function getKeyFromPublicPKCS8Hex(o) {
      var p;
      var q = ASN1HEX.getVbyList(h, 0, [0, 0], "06");
      if (q === "2a864886f70d010101") {
        p = new RSAKey();
      } else {
        if (q === "2a8648ce380401") {
          p = new KJUR.crypto.DSA();
        } else {
          if (q === "2a8648ce3d0201") {
            p = new KJUR.crypto.ECDSA();
          } else {
            throw "unsupported PKCS#8 public key hex";
          }
        }
      }
      p.readPKCS8PubKeyHex(h);
      return p;
    },
    parsePublicRawRSAKeyHex: function parsePublicRawRSAKeyHex(q) {
      var o = {};
      if (q.substr(0, 2) != "30") {
        throw "malformed RSA key(code:001)";
      }
      var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
      if (p.length != 2) {
        throw "malformed RSA key(code:002)";
      }
      if (q.substr(p[0], 2) != "02") {
        throw "malformed RSA key(code:003)";
      }
      o.n = ASN1HEX.getHexOfV_AtObj(q, p[0]);
      if (q.substr(p[1], 2) != "02") {
        throw "malformed RSA key(code:004)";
      }
      o.e = ASN1HEX.getHexOfV_AtObj(q, p[1]);
      return o;
    },
    parsePrivateRawRSAKeyHexAtObj: function parsePrivateRawRSAKeyHexAtObj(p, r) {
      var q = r.keyidx;
      if (p.substr(q, 2) != "30") {
        throw "malformed RSA private key(code:001)";
      }
      var o = ASN1HEX.getPosArrayOfChildren_AtObj(p, q);
      if (o.length != 9) {
        throw "malformed RSA private key(code:002)";
      }
      r.key = {};
      r.key.n = ASN1HEX.getHexOfV_AtObj(p, o[1]);
      r.key.e = ASN1HEX.getHexOfV_AtObj(p, o[2]);
      r.key.d = ASN1HEX.getHexOfV_AtObj(p, o[3]);
      r.key.p = ASN1HEX.getHexOfV_AtObj(p, o[4]);
      r.key.q = ASN1HEX.getHexOfV_AtObj(p, o[5]);
      r.key.dp = ASN1HEX.getHexOfV_AtObj(p, o[6]);
      r.key.dq = ASN1HEX.getHexOfV_AtObj(p, o[7]);
      r.key.co = ASN1HEX.getHexOfV_AtObj(p, o[8]);
    },
    parsePrivateRawECKeyHexAtObj: function parsePrivateRawECKeyHexAtObj(p, r) {
      var q = r.keyidx;
      if (p.substr(q, 2) != "30") {
        throw "malformed ECC private key(code:001)";
      }
      var o = ASN1HEX.getPosArrayOfChildren_AtObj(p, q);
      if (o.length != 3) {
        throw "malformed ECC private key(code:002)";
      }
      if (p.substr(o[1], 2) != "04") {
        throw "malformed ECC private key(code:003)";
      }
      r.key = ASN1HEX.getHexOfV_AtObj(p, o[1]);
    },
    parsePublicPKCS8Hex: function parsePublicPKCS8Hex(r) {
      var p = {};
      p.algparam = null;
      var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
      if (q.length != 2) {
        throw "outer DERSequence shall have 2 elements: " + q.length;
      }
      var s = q[0];
      if (r.substr(s, 2) != "30") {
        throw "malformed PKCS8 public key(code:001)";
      }
      var o = ASN1HEX.getPosArrayOfChildren_AtObj(r, s);
      if (o.length != 2) {
        throw "malformed PKCS8 public key(code:002)";
      }
      if (r.substr(o[0], 2) != "06") {
        throw "malformed PKCS8 public key(code:003)";
      }
      p.algoid = ASN1HEX.getHexOfV_AtObj(r, o[0]);
      if (r.substr(o[1], 2) == "06") {
        p.algparam = ASN1HEX.getHexOfV_AtObj(r, o[1]);
      }
      if (r.substr(q[1], 2) != "03") {
        throw "malformed PKCS8 public key(code:004)";
      }
      p.key = ASN1HEX.getHexOfV_AtObj(r, q[1]).substr(2);
      return p;
    },
    getRSAKeyFromPublicPKCS8Hex: function getRSAKeyFromPublicPKCS8Hex(o) {
      var p = new RSAKey();
      p.readPKCS8PubKeyHex(o);
      return p;
    } };

}();
/*! keyutil-1.0.15.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
      */
var KEYUTIL = function () {
  var d = function d(p, r, q) {
    return k(CryptoJS.AES, p, r, q);
  };
  var e = function e(p, r, q) {
    return k(CryptoJS.TripleDES, p, r, q);
  };
  var a = function a(p, r, q) {
    return k(CryptoJS.DES, p, r, q);
  };
  var k = function k(s, x, u, q) {
    var r = CryptoJS.enc.Hex.parse(x);
    var w = CryptoJS.enc.Hex.parse(u);
    var p = CryptoJS.enc.Hex.parse(q);
    var t = {};
    t.key = w;
    t.iv = p;
    t.ciphertext = r;
    var v = s.decrypt(t, w, {
      iv: p });

    return CryptoJS.enc.Hex.stringify(v);
  };
  var l = function l(p, r, q) {
    return g(CryptoJS.AES, p, r, q);
  };
  var o = function o(p, r, q) {
    return g(CryptoJS.TripleDES, p, r, q);
  };
  var f = function f(p, r, q) {
    return g(CryptoJS.DES, p, r, q);
  };
  var g = function g(t, y, v, q) {
    var s = CryptoJS.enc.Hex.parse(y);
    var x = CryptoJS.enc.Hex.parse(v);
    var p = CryptoJS.enc.Hex.parse(q);
    var w = t.encrypt(s, x, {
      iv: p });

    var r = CryptoJS.enc.Hex.parse(w.toString());
    var u = CryptoJS.enc.Base64.stringify(r);
    return u;
  };
  var i = {
    "AES-256-CBC": {
      proc: d,
      eproc: l,
      keylen: 32,
      ivlen: 16 },

    "AES-192-CBC": {
      proc: d,
      eproc: l,
      keylen: 24,
      ivlen: 16 },

    "AES-128-CBC": {
      proc: d,
      eproc: l,
      keylen: 16,
      ivlen: 16 },

    "DES-EDE3-CBC": {
      proc: e,
      eproc: o,
      keylen: 24,
      ivlen: 8 },

    "DES-CBC": {
      proc: a,
      eproc: f,
      keylen: 8,
      ivlen: 8 } };


  var c = function c(p) {
    return i[p]["proc"];
  };
  var m = function m(p) {
    var r = CryptoJS.lib.WordArray.random(p);
    var q = CryptoJS.enc.Hex.stringify(r);
    return q;
  };
  var n = function n(v) {
    var w = {};
    var q = v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
    if (q) {
      w.cipher = q[1];
      w.ivsalt = q[2];
    }
    var p = v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
    if (p) {
      w.type = p[1];
    }
    var u = -1;
    var x = 0;
    if (v.indexOf("\r\n\r\n") != -1) {
      u = v.indexOf("\r\n\r\n");
      x = 2;
    }
    if (v.indexOf("\n\n") != -1) {
      u = v.indexOf("\n\n");
      x = 1;
    }
    var t = v.indexOf("-----END");
    if (u != -1 && t != -1) {
      var r = v.substring(u + x * 2, t - x);
      r = r.replace(/\s+/g, "");
      w.data = r;
    }
    return w;
  };
  var j = function j(q, y, p) {
    var v = p.substring(0, 16);
    var t = CryptoJS.enc.Hex.parse(v);
    var r = CryptoJS.enc.Utf8.parse(y);
    var u = i[q]["keylen"] + i[q]["ivlen"];
    var x = "";
    var w = null;
    for (;;) {
      var s = CryptoJS.algo.MD5.create();
      if (w != null) {
        s.update(w);
      }
      s.update(r);
      s.update(t);
      w = s.finalize();
      x = x + CryptoJS.enc.Hex.stringify(w);
      if (x.length >= u * 2) {
        break;
      }
    }
    var z = {};
    z.keyhex = x.substr(0, i[q]["keylen"] * 2);
    z.ivhex = x.substr(i[q]["keylen"] * 2, i[q]["ivlen"] * 2);
    return z;
  };
  var b = function b(p, v, r, w) {
    var s = CryptoJS.enc.Base64.parse(p);
    var q = CryptoJS.enc.Hex.stringify(s);
    var u = i[v]["proc"];
    var t = u(q, r, w);
    return t;
  };
  var h = function h(p, s, q, u) {
    var r = i[s]["eproc"];
    var t = r(p, q, u);
    return t;
  };
  return {
    version: "1.0.0",
    getHexFromPEM: function getHexFromPEM(p, q) {
      return ASN1HEX.pemToHex(p, q);
    },
    getDecryptedKeyHexByKeyIV: function getDecryptedKeyHexByKeyIV(q, t, s, r) {
      var p = c(t);
      return p(q, s, r);
    },
    parsePKCS5PEM: function parsePKCS5PEM(p) {
      return n(p);
    },
    getKeyAndUnusedIvByPasscodeAndIvsalt: function getKeyAndUnusedIvByPasscodeAndIvsalt(q, p, r) {
      return j(q, p, r);
    },
    decryptKeyB64: function decryptKeyB64(p, r, q, s) {
      return b(p, r, q, s);
    },
    getDecryptedKeyHex: function getDecryptedKeyHex(y, x) {
      var q = n(y);
      var t = q.type;
      var r = q.cipher;
      var p = q.ivsalt;
      var s = q.data;
      var w = j(r, x, p);
      var v = w.keyhex;
      var u = b(s, r, v, p);
      return u;
    },
    getRSAKeyFromEncryptedPKCS5PEM: function getRSAKeyFromEncryptedPKCS5PEM(r, q) {
      var s = this.getDecryptedKeyHex(r, q);
      var p = new RSAKey();
      p.readPrivateKeyFromASN1HexString(s);
      return p;
    },
    getEncryptedPKCS5PEMFromPrvKeyHex: function getEncryptedPKCS5PEMFromPrvKeyHex(x, s, A, t, r) {
      var p = "";
      if (typeof t == "undefined" || t == null) {
        t = "AES-256-CBC";
      }
      if (typeof i[t] == "undefined") {
        throw "KEYUTIL unsupported algorithm: " + t;
      }
      if (typeof r == "undefined" || r == null) {
        var v = i[t]["ivlen"];
        var u = m(v);
        r = u.toUpperCase();
      }
      var z = j(t, A, r);
      var y = z.keyhex;
      var w = h(s, t, y, r);
      var q = w.replace(/(.{64})/g, "$1\r\n");
      var p = "-----BEGIN " + x + " PRIVATE KEY-----\r\n";
      p += "Proc-Type: 4,ENCRYPTED\r\n";
      p += "DEK-Info: " + t + "," + r + "\r\n";
      p += "\r\n";
      p += q;
      p += "\r\n-----END " + x + " PRIVATE KEY-----\r\n";
      return p;
    },
    getEncryptedPKCS5PEMFromRSAKey: function getEncryptedPKCS5PEMFromRSAKey(D, E, r, t) {
      var B = new KJUR.asn1.DERInteger({
        "int": 0 });

      var w = new KJUR.asn1.DERInteger({
        bigint: D.n });

      var A = new KJUR.asn1.DERInteger({
        "int": D.e });

      var C = new KJUR.asn1.DERInteger({
        bigint: D.d });

      var u = new KJUR.asn1.DERInteger({
        bigint: D.p });

      var s = new KJUR.asn1.DERInteger({
        bigint: D.q });

      var z = new KJUR.asn1.DERInteger({
        bigint: D.dmp1 });

      var v = new KJUR.asn1.DERInteger({
        bigint: D.dmq1 });

      var y = new KJUR.asn1.DERInteger({
        bigint: D.coeff });

      var F = new KJUR.asn1.DERSequence({
        array: [B, w, A, C, u, s, z, v, y] });

      var x = F.getEncodedHex();
      return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", x, E, r, t);
    },
    newEncryptedPKCS5PEM: function newEncryptedPKCS5PEM(p, q, t, u) {
      if (typeof q == "undefined" || q == null) {
        q = 1024;
      }
      if (typeof t == "undefined" || t == null) {
        t = "10001";
      }
      var r = new RSAKey();
      r.generate(q, t);
      var s = null;
      if (typeof u == "undefined" || u == null) {
        s = this.getEncryptedPKCS5PEMFromRSAKey(r, p);
      } else {
        s = this.getEncryptedPKCS5PEMFromRSAKey(r, p, u);
      }
      return s;
    },
    getRSAKeyFromPlainPKCS8PEM: function getRSAKeyFromPlainPKCS8PEM(r) {
      if (r.match(/ENCRYPTED/)) {
        throw "pem shall be not ENCRYPTED";
      }
      var q = ASN1HEX.pemToHex(r, "PRIVATE KEY");
      var p = this.getRSAKeyFromPlainPKCS8Hex(q);
      return p;
    },
    getRSAKeyFromPlainPKCS8Hex: function getRSAKeyFromPlainPKCS8Hex(q) {
      var p = new RSAKey();
      p.readPKCS8PrvKeyHex(q);
      return p;
    },
    parseHexOfEncryptedPKCS8: function parseHexOfEncryptedPKCS8(w) {
      var s = {};
      var r = ASN1HEX.getPosArrayOfChildren_AtObj(w, 0);
      if (r.length != 2) {
        throw "malformed format: SEQUENCE(0).items != 2: " + r.length;
      }
      s.ciphertext = ASN1HEX.getHexOfV_AtObj(w, r[1]);
      var y = ASN1HEX.getPosArrayOfChildren_AtObj(w, r[0]);
      if (y.length != 2) {
        throw "malformed format: SEQUENCE(0.0).items != 2: " + y.length;
      }
      if (ASN1HEX.getHexOfV_AtObj(w, y[0]) != "2a864886f70d01050d") {
        throw "this only supports pkcs5PBES2";
      }
      var p = ASN1HEX.getPosArrayOfChildren_AtObj(w, y[1]);
      if (y.length != 2) {
        throw "malformed format: SEQUENCE(0.0.1).items != 2: " + p.length;
      }
      var q = ASN1HEX.getPosArrayOfChildren_AtObj(w, p[1]);
      if (q.length != 2) {
        throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + q.length;
      }
      if (ASN1HEX.getHexOfV_AtObj(w, q[0]) != "2a864886f70d0307") {
        throw "this only supports TripleDES";
      }
      s.encryptionSchemeAlg = "TripleDES";
      s.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(w, q[1]);
      var t = ASN1HEX.getPosArrayOfChildren_AtObj(w, p[0]);
      if (t.length != 2) {
        throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + t.length;
      }
      if (ASN1HEX.getHexOfV_AtObj(w, t[0]) != "2a864886f70d01050c") {
        throw "this only supports pkcs5PBKDF2";
      }
      var x = ASN1HEX.getPosArrayOfChildren_AtObj(w, t[1]);
      if (x.length < 2) {
        throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + x.length;
      }
      s.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(w, x[0]);
      var u = ASN1HEX.getHexOfV_AtObj(w, x[1]);
      try {
        s.pbkdf2Iter = parseInt(u, 16);
      } catch (v) {
        throw "malformed format pbkdf2Iter: " + u;
      }
      return s;
    },
    getPBKDF2KeyHexFromParam: function getPBKDF2KeyHexFromParam(u, p) {
      var t = CryptoJS.enc.Hex.parse(u.pbkdf2Salt);
      var q = u.pbkdf2Iter;
      var s = CryptoJS.PBKDF2(p, t, {
        keySize: 192 / 32,
        iterations: q });

      var r = CryptoJS.enc.Hex.stringify(s);
      return r;
    },
    getPlainPKCS8HexFromEncryptedPKCS8PEM: function getPlainPKCS8HexFromEncryptedPKCS8PEM(x, y) {
      var r = ASN1HEX.pemToHex(x, "ENCRYPTED PRIVATE KEY");
      var p = this.parseHexOfEncryptedPKCS8(r);
      var u = KEYUTIL.getPBKDF2KeyHexFromParam(p, y);
      var v = {};
      v.ciphertext = CryptoJS.enc.Hex.parse(p.ciphertext);
      var t = CryptoJS.enc.Hex.parse(u);
      var s = CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);
      var w = CryptoJS.TripleDES.decrypt(v, t, {
        iv: s });

      var q = CryptoJS.enc.Hex.stringify(w);
      return q;
    },
    getRSAKeyFromEncryptedPKCS8PEM: function getRSAKeyFromEncryptedPKCS8PEM(s, r) {
      var q = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(s, r);
      var p = this.getRSAKeyFromPlainPKCS8Hex(q);
      return p;
    },
    getKeyFromEncryptedPKCS8PEM: function getKeyFromEncryptedPKCS8PEM(s, q) {
      var p = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(s, q);
      var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
      return r;
    },
    parsePlainPrivatePKCS8Hex: function parsePlainPrivatePKCS8Hex(s) {
      var q = {};
      q.algparam = null;
      if (s.substr(0, 2) != "30") {
        throw "malformed plain PKCS8 private key(code:001)";
      }
      var r = ASN1HEX.getPosArrayOfChildren_AtObj(s, 0);
      if (r.length != 3) {
        throw "malformed plain PKCS8 private key(code:002)";
      }
      if (s.substr(r[1], 2) != "30") {
        throw "malformed PKCS8 private key(code:003)";
      }
      var p = ASN1HEX.getPosArrayOfChildren_AtObj(s, r[1]);
      if (p.length != 2) {
        throw "malformed PKCS8 private key(code:004)";
      }
      if (s.substr(p[0], 2) != "06") {
        throw "malformed PKCS8 private key(code:005)";
      }
      q.algoid = ASN1HEX.getHexOfV_AtObj(s, p[0]);
      if (s.substr(p[1], 2) == "06") {
        q.algparam = ASN1HEX.getHexOfV_AtObj(s, p[1]);
      }
      if (s.substr(r[2], 2) != "04") {
        throw "malformed PKCS8 private key(code:006)";
      }
      q.keyidx = ASN1HEX.getStartPosOfV_AtObj(s, r[2]);
      return q;
    },
    getKeyFromPlainPrivatePKCS8PEM: function getKeyFromPlainPrivatePKCS8PEM(q) {
      var p = ASN1HEX.pemToHex(q, "PRIVATE KEY");
      var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
      return r;
    },
    getKeyFromPlainPrivatePKCS8Hex: function getKeyFromPlainPrivatePKCS8Hex(p) {
      var q = this.parsePlainPrivatePKCS8Hex(p);
      var r;
      if (q.algoid == "2a864886f70d010101") {
        r = new RSAKey();
      } else {
        if (q.algoid == "2a8648ce380401") {
          r = new KJUR.crypto.DSA();
        } else {
          if (q.algoid == "2a8648ce3d0201") {
            r = new KJUR.crypto.ECDSA();
          } else {
            throw "unsupported private key algorithm";
          }
        }
      }
      r.readPKCS8PrvKeyHex(p);
      return r;
    },
    getRSAKeyFromPublicPKCS8PEM: function getRSAKeyFromPublicPKCS8PEM(q) {
      var r = ASN1HEX.pemToHex(q, "PUBLIC KEY");
      var p = this.getRSAKeyFromPublicPKCS8Hex(r);
      return p;
    },
    getKeyFromPublicPKCS8PEM: function getKeyFromPublicPKCS8PEM(q) {
      var r = ASN1HEX.pemToHex(q, "PUBLIC KEY");
      var p = this.getKeyFromPublicPKCS8Hex(r);
      return p;
    },
    getKeyFromPublicPKCS8Hex: function getKeyFromPublicPKCS8Hex(q) {
      var p;
      var r = ASN1HEX.getVbyList(q, 0, [0, 0], "06");
      if (r === "2a864886f70d010101") {
        p = new RSAKey();
      } else {
        if (r === "2a8648ce380401") {
          p = new KJUR.crypto.DSA();
        } else {
          if (r === "2a8648ce3d0201") {
            p = new KJUR.crypto.ECDSA();
          } else {
            throw "unsupported PKCS#8 public key hex";
          }
        }
      }
      p.readPKCS8PubKeyHex(q);
      return p;
    },
    parsePublicRawRSAKeyHex: function parsePublicRawRSAKeyHex(r) {
      var p = {};
      if (r.substr(0, 2) != "30") {
        throw "malformed RSA key(code:001)";
      }
      var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
      if (q.length != 2) {
        throw "malformed RSA key(code:002)";
      }
      if (r.substr(q[0], 2) != "02") {
        throw "malformed RSA key(code:003)";
      }
      p.n = ASN1HEX.getHexOfV_AtObj(r, q[0]);
      if (r.substr(q[1], 2) != "02") {
        throw "malformed RSA key(code:004)";
      }
      p.e = ASN1HEX.getHexOfV_AtObj(r, q[1]);
      return p;
    },
    parsePrivateRawRSAKeyHexAtObj: function parsePrivateRawRSAKeyHexAtObj(q, u) {
      var t = ASN1HEX;
      var r = t.getHexOfV_AtObj;
      var s = t.getDecendantIndexByNthList(q, 0, [2, 0]);
      var p = t.getPosArrayOfChildren_AtObj(q, s);
      if (p.length !== 9) {
        throw "malformed PKCS#8 plain RSA private key";
      }
      u.key = {};
      u.key.n = r(q, p[1]);
      u.key.e = r(q, p[2]);
      u.key.d = r(q, p[3]);
      u.key.p = r(q, p[4]);
      u.key.q = r(q, p[5]);
      u.key.dp = r(q, p[6]);
      u.key.dq = r(q, p[7]);
      u.key.co = r(q, p[8]);
    },
    parsePrivateRawECKeyHexAtObj: function parsePrivateRawECKeyHexAtObj(p, t) {
      var s = ASN1HEX;
      var q = t.keyidx;
      var r = new KJUR.crypto.ECDSA();
      r.readPKCS8PrvKeyHex(p);
      t.key = r.prvKeyHex;
      t.pubkey = r.pubKeyHex;
    },
    parsePublicPKCS8Hex: function parsePublicPKCS8Hex(s) {
      var q = {};
      q.algparam = null;
      var r = ASN1HEX.getPosArrayOfChildren_AtObj(s, 0);
      if (r.length != 2) {
        throw "outer DERSequence shall have 2 elements: " + r.length;
      }
      var t = r[0];
      if (s.substr(t, 2) != "30") {
        throw "malformed PKCS8 public key(code:001)";
      }
      var p = ASN1HEX.getPosArrayOfChildren_AtObj(s, t);
      if (p.length != 2) {
        throw "malformed PKCS8 public key(code:002)";
      }
      if (s.substr(p[0], 2) != "06") {
        throw "malformed PKCS8 public key(code:003)";
      }
      q.algoid = ASN1HEX.getHexOfV_AtObj(s, p[0]);
      if (s.substr(p[1], 2) == "06") {
        q.algparam = ASN1HEX.getHexOfV_AtObj(s, p[1]);
      } else {
        if (s.substr(p[1], 2) == "30") {
          q.algparam = {};
          q.algparam.p = ASN1HEX.getVbyList(s, p[1], [0], "02");
          q.algparam.q = ASN1HEX.getVbyList(s, p[1], [1], "02");
          q.algparam.g = ASN1HEX.getVbyList(s, p[1], [2], "02");
        }
      }
      if (s.substr(r[1], 2) != "03") {
        throw "malformed PKCS8 public key(code:004)";
      }
      q.key = ASN1HEX.getHexOfV_AtObj(s, r[1]).substr(2);
      return q;
    },
    getRSAKeyFromPublicPKCS8Hex: function getRSAKeyFromPublicPKCS8Hex(p) {
      var q = new RSAKey();
      q.readPKCS8PubKeyHex(p);
      return q;
    } };

}();
KEYUTIL.getKey = function (i, f, j) {
  if (typeof RSAKey != "undefined" && i instanceof RSAKey) {
    return i;
  }
  if (typeof KJUR.crypto.ECDSA != "undefined" && i instanceof KJUR.crypto.ECDSA) {
    return i;
  }
  if (typeof KJUR.crypto.DSA != "undefined" && i instanceof KJUR.crypto.DSA) {
    return i;
  }
  if (i.curve !== undefined && i.xy !== undefined && i.d === undefined) {
    return new KJUR.crypto.ECDSA({
      pub: i.xy,
      curve: i.curve });

  }
  if (i.curve !== undefined && i.d !== undefined) {
    return new KJUR.crypto.ECDSA({
      prv: i.d,
      curve: i.curve });

  }
  if (i.kty === undefined && i.n !== undefined && i.e !== undefined && i.d === undefined) {
    var D = new RSAKey();
    D.setPublic(i.n, i.e);
    return D;
  }
  if (i.kty === undefined && i.n !== undefined && i.e !== undefined && i.d !== undefined && i.p !== undefined && i.q !== undefined && i.dp !== undefined && i.dq !== undefined && i.co !== undefined && i.qi === undefined) {
    var D = new RSAKey();
    D.setPrivateEx(i.n, i.e, i.d, i.p, i.q, i.dp, i.dq, i.co);
    return D;
  }
  if (i.kty === undefined && i.n !== undefined && i.e !== undefined && i.d !== undefined && i.p === undefined) {
    var D = new RSAKey();
    D.setPrivate(i.n, i.e, i.d);
    return D;
  }
  if (i.p !== undefined && i.q !== undefined && i.g !== undefined && i.y !== undefined && i.x === undefined) {
    var D = new KJUR.crypto.DSA();
    D.setPublic(i.p, i.q, i.g, i.y);
    return D;
  }
  if (i.p !== undefined && i.q !== undefined && i.g !== undefined && i.y !== undefined && i.x !== undefined) {
    var D = new KJUR.crypto.DSA();
    D.setPrivate(i.p, i.q, i.g, i.y, i.x);
    return D;
  }
  if (i.kty === "RSA" && i.n !== undefined && i.e !== undefined && i.d === undefined) {
    var D = new RSAKey();
    D.setPublic(b64utohex(i.n), b64utohex(i.e));
    return D;
  }
  if (i.kty === "RSA" && i.n !== undefined && i.e !== undefined && i.d !== undefined && i.p !== undefined && i.q !== undefined && i.dp !== undefined && i.dq !== undefined && i.qi !== undefined) {

    var D = new RSAKey();
    D.setPrivateEx(b64utohex(i.n), b64utohex(i.e), b64utohex(i.d), b64utohex(i.p), b64utohex(i.q), b64utohex(i.dp), b64utohex(i.dq), b64utohex(i.qi));
    return D;
  }
  if (i.kty === "RSA" && i.n !== undefined && i.e !== undefined && i.d !== undefined) {

    var D = new RSAKey();
    D.setPrivate(b64utohex(i.n), b64utohex(i.e), b64utohex(i.d));
    return D;
  }
  if (i.kty === "EC" && i.crv !== undefined && i.x !== undefined && i.y !== undefined && i.d === undefined) {
    var e = new KJUR.crypto.ECDSA({
      curve: i.crv });

    var n = e.ecparams.keylen / 4;
    var t = ("0000000000" + b64utohex(i.x)).slice(-n);
    var r = ("0000000000" + b64utohex(i.y)).slice(-n);
    var o = "04" + t + r;
    e.setPublicKeyHex(o);
    return e;
  }
  if (i.kty === "EC" && i.crv !== undefined && i.x !== undefined && i.y !== undefined && i.d !== undefined) {
    var e = new KJUR.crypto.ECDSA({
      curve: i.crv });

    var n = e.ecparams.keylen / 4;
    var t = ("0000000000" + b64utohex(i.x)).slice(-n);
    var r = ("0000000000" + b64utohex(i.y)).slice(-n);
    var o = "04" + t + r;
    var b = ("0000000000" + b64utohex(i.d)).slice(-n);
    e.setPublicKeyHex(o);
    e.setPrivateKeyHex(b);
    return e;
  }
  if (j === "pkcs5prv") {

    var A = i,
    w = ASN1HEX,
    C,D;
    C = w.getPosArrayOfChildren_AtObj(A, 0);

    if (C.length === 9) {
      D = new RSAKey();
      D.readPrivateKeyFromASN1HexString(i);
    } else {
      if (C.length === 6) {
        D = new KJUR.crypto.DSA();
        D.readPKCS5PrvKeyHex(A);
      } else {
        if (C.length > 2 && A.substr(C[1], 2) === "04") {
          D = new KJUR.crypto.ECDSA();
          D.readPKCS5PrvKeyHex(A);
        } else {
          throw "unsupported PKCS#1/5 hexadecimal key";
        }
      }
    }

    return D;
  }
  if (j === "pkcs8prv") {
    var D = KEYUTIL.getKeyFromPlainPrivatePKCS8Hex(i);
    return D;
  }
  if (j === "pkcs8pub") {
    return KEYUTIL.getKeyFromPublicPKCS8Hex(i);
  }
  if (j === "x509pub") {
    return X509.getPublicKeyFromCertHex(i);
  }
  if (i.indexOf("-END CERTIFICATE-", 0) != -1 || i.indexOf("-END X509 CERTIFICATE-", 0) != -1 || i.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
    return X509.getPublicKeyFromCertPEM(i);
  }
  if (i.indexOf("-END PUBLIC KEY-") != -1) {
    return KEYUTIL.getKeyFromPublicPKCS8PEM(i);
  }
  if (i.indexOf("-END RSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") == -1) {
    var k = ASN1HEX.pemToHex(i, "RSA PRIVATE KEY");
    return KEYUTIL.getKey(k, null, "pkcs5prv");
  }
  if (i.indexOf("-END DSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") == -1) {
    var z = ASN1HEX.pemToHex(i, "DSA PRIVATE KEY");
    var v = ASN1HEX.getVbyList(z, 0, [1], "02");
    var u = ASN1HEX.getVbyList(z, 0, [2], "02");
    var B = ASN1HEX.getVbyList(z, 0, [3], "02");
    var l = ASN1HEX.getVbyList(z, 0, [4], "02");
    var m = ASN1HEX.getVbyList(z, 0, [5], "02");
    var D = new KJUR.crypto.DSA();
    D.setPrivate(new BigInteger(v, 16), new BigInteger(u, 16), new BigInteger(B, 16), new BigInteger(l, 16), new BigInteger(m, 16));
    return D;
  }
  if (i.indexOf("-END PRIVATE KEY-") != -1) {
    return KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(i);
  }
  if (i.indexOf("-END RSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") != -1) {
    return KEYUTIL.getRSAKeyFromEncryptedPKCS5PEM(i, f);
  }
  if (i.indexOf("-END EC PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") != -1) {
    var z = KEYUTIL.getDecryptedKeyHex(i, f);
    var D = ASN1HEX.getVbyList(z, 0, [1], "04");
    var d = ASN1HEX.getVbyList(z, 0, [2, 0], "06");
    var s = ASN1HEX.getVbyList(z, 0, [3, 0], "03").substr(2);
    var c = "";
    if (KJUR.crypto.OID.oidhex2name[d] !== undefined) {
      c = KJUR.crypto.OID.oidhex2name[d];
    } else {
      throw "undefined OID(hex) in KJUR.crypto.OID: " + d;
    }
    var e = new KJUR.crypto.ECDSA({
      curve: c });

    e.setPublicKeyHex(s);
    e.setPrivateKeyHex(D);
    e.isPublic = false;
    return e;
  }
  if (i.indexOf("-END DSA PRIVATE KEY-") != -1 && i.indexOf("4,ENCRYPTED") != -1) {
    var z = KEYUTIL.getDecryptedKeyHex(i, f);
    var v = ASN1HEX.getVbyList(z, 0, [1], "02");
    var u = ASN1HEX.getVbyList(z, 0, [2], "02");
    var B = ASN1HEX.getVbyList(z, 0, [3], "02");
    var l = ASN1HEX.getVbyList(z, 0, [4], "02");
    var m = ASN1HEX.getVbyList(z, 0, [5], "02");
    var D = new KJUR.crypto.DSA();
    D.setPrivate(new BigInteger(v, 16), new BigInteger(u, 16), new BigInteger(B, 16), new BigInteger(l, 16), new BigInteger(m, 16));
    return D;
  }
  if (i.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
    return KEYUTIL.getKeyFromEncryptedPKCS8PEM(i, f);
  }
  throw "not supported argument";
};
KEYUTIL.generateKeypair = function (a, c) {
  if (a == "RSA") {
    var b = c;
    var h = new RSAKey();
    h.generate(b, "10001");
    h.isPrivate = true;
    h.isPublic = true;
    var f = new RSAKey();
    var e = h.n.toString(16);
    var i = h.e.toString(16);
    f.setPublic(e, i);
    f.isPrivate = false;
    f.isPublic = true;
    var k = {};
    k.prvKeyObj = h;
    k.pubKeyObj = f;
    return k;
  } else {
    if (a == "EC") {
      var d = c;
      var g = new KJUR.crypto.ECDSA({
        curve: d });

      var j = g.generateKeyPairHex();
      var h = new KJUR.crypto.ECDSA({
        curve: d });

      h.setPublicKeyHex(j.ecpubhex);
      h.setPrivateKeyHex(j.ecprvhex);
      h.isPrivate = true;
      h.isPublic = false;
      var f = new KJUR.crypto.ECDSA({
        curve: d });

      f.setPublicKeyHex(j.ecpubhex);
      f.isPrivate = false;
      f.isPublic = true;
      var k = {};
      k.prvKeyObj = h;
      k.pubKeyObj = f;
      return k;
    } else {
      throw "unknown algorithm: " + a;
    }
  }
};
KEYUTIL.getPEM = function (a, r, o, g, j) {
  var v = KJUR.asn1;
  var u = KJUR.crypto;
  function p(s) {
    var w = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 0 },

      {
        "int": {
          bigint: s.n } },


      {
        "int": s.e },

      {
        "int": {
          bigint: s.d } },


      {
        "int": {
          bigint: s.p } },


      {
        "int": {
          bigint: s.q } },


      {
        "int": {
          bigint: s.dmp1 } },


      {
        "int": {
          bigint: s.dmq1 } },


      {
        "int": {
          bigint: s.coeff } }] });



    return w;
  }
  function q(w) {
    var s = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 1 },

      {
        octstr: {
          hex: w.prvKeyHex } },


      {
        tag: ["a0", true, {
          oid: {
            name: w.curveName } }] },



      {
        tag: ["a1", true, {
          bitstr: {
            hex: "00" + w.pubKeyHex } }] }] });




    return s;
  }
  function n(s) {
    var w = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 0 },

      {
        "int": {
          bigint: s.p } },


      {
        "int": {
          bigint: s.q } },


      {
        "int": {
          bigint: s.g } },


      {
        "int": {
          bigint: s.y } },


      {
        "int": {
          bigint: s.x } }] });



    return w;
  }
  if ((typeof RSAKey != "undefined" && a instanceof RSAKey || typeof u.DSA != "undefined" && a instanceof u.DSA || typeof u.ECDSA != "undefined" && a instanceof u.ECDSA) && a.isPublic == true && (r === undefined || r == "PKCS8PUB")) {
    var t = new KJUR.asn1.x509.SubjectPublicKeyInfo(a);
    var m = t.getEncodedHex();
    return v.ASN1Util.getPEMStringFromHex(m, "PUBLIC KEY");
  }
  if (r == "PKCS1PRV" && typeof RSAKey != "undefined" && a instanceof RSAKey && (o === undefined || o == null) && a.isPrivate == true) {
    var t = p(a);
    var m = t.getEncodedHex();
    return v.ASN1Util.getPEMStringFromHex(m, "RSA PRIVATE KEY");
  }
  if (r == "PKCS1PRV" && typeof RSAKey != "undefined" && a instanceof KJUR.crypto.ECDSA && (o === undefined || o == null) && a.isPrivate == true) {
    var f = new KJUR.asn1.DERObjectIdentifier({
      name: a.curveName });

    var l = f.getEncodedHex();
    var e = q(a);
    var k = e.getEncodedHex();
    var i = "";
    i += v.ASN1Util.getPEMStringFromHex(l, "EC PARAMETERS");
    i += v.ASN1Util.getPEMStringFromHex(k, "EC PRIVATE KEY");
    return i;
  }
  if (r == "PKCS1PRV" && typeof KJUR.crypto.DSA != "undefined" && a instanceof KJUR.crypto.DSA && (o === undefined || o == null) && a.isPrivate == true) {
    var t = n(a);
    var m = t.getEncodedHex();
    return v.ASN1Util.getPEMStringFromHex(m, "DSA PRIVATE KEY");
  }
  if (r == "PKCS5PRV" && typeof RSAKey != "undefined" && a instanceof RSAKey && o !== undefined && o != null && a.isPrivate == true) {
    var t = p(a);
    var m = t.getEncodedHex();
    if (g === undefined) {
      g = "DES-EDE3-CBC";
    }
    return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", m, o, g);
  }
  if (r == "PKCS5PRV" && typeof KJUR.crypto.ECDSA != "undefined" && a instanceof KJUR.crypto.ECDSA && o !== undefined && o != null && a.isPrivate == true) {
    var t = q(a);
    var m = t.getEncodedHex();
    if (g === undefined) {
      g = "DES-EDE3-CBC";
    }
    return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", m, o, g);
  }
  if (r == "PKCS5PRV" && typeof KJUR.crypto.DSA != "undefined" && a instanceof KJUR.crypto.DSA && o !== undefined && o != null && a.isPrivate == true) {
    var t = n(a);
    var m = t.getEncodedHex();
    if (g === undefined) {
      g = "DES-EDE3-CBC";
    }
    return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", m, o, g);
  }
  var h = function h(w, s) {
    var y = b(w, s);
    var x = new KJUR.asn1.ASN1Util.newObject({
      seq: [{
        seq: [{
          oid: {
            name: "pkcs5PBES2" } },


        {
          seq: [{
            seq: [{
              oid: {
                name: "pkcs5PBKDF2" } },


            {
              seq: [{
                octstr: {
                  hex: y.pbkdf2Salt } },


              {
                "int": y.pbkdf2Iter }] }] },



          {
            seq: [{
              oid: {
                name: "des-EDE3-CBC" } },


            {
              octstr: {
                hex: y.encryptionSchemeIV } }] }] }] },





      {
        octstr: {
          hex: y.ciphertext } }] });



    return x.getEncodedHex();
  };
  var b = function b(D, E) {
    var x = 100;
    var C = CryptoJS.lib.WordArray.random(8);
    var B = "DES-EDE3-CBC";
    var s = CryptoJS.lib.WordArray.random(8);
    var y = CryptoJS.PBKDF2(E, C, {
      keySize: 192 / 32,
      iterations: x });

    var z = CryptoJS.enc.Hex.parse(D);
    var A = CryptoJS.TripleDES.encrypt(z, y, {
      iv: s }) +
    "";
    var w = {};
    w.ciphertext = A;
    w.pbkdf2Salt = CryptoJS.enc.Hex.stringify(C);
    w.pbkdf2Iter = x;
    w.encryptionSchemeAlg = B;
    w.encryptionSchemeIV = CryptoJS.enc.Hex.stringify(s);
    return w;
  };
  if (r == "PKCS8PRV" && typeof RSAKey != "undefined" && a instanceof RSAKey && a.isPrivate == true) {
    var d = p(a);
    var c = d.getEncodedHex();
    var t = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 0 },

      {
        seq: [{
          oid: {
            name: "rsaEncryption" } },


        {
          "null": true }] },


      {
        octstr: {
          hex: c } }] });



    var m = t.getEncodedHex();
    if (o === undefined || o == null) {
      return v.ASN1Util.getPEMStringFromHex(m, "PRIVATE KEY");
    } else {
      var k = h(m, o);
      return v.ASN1Util.getPEMStringFromHex(k, "ENCRYPTED PRIVATE KEY");
    }
  }
  if (r == "PKCS8PRV" && typeof KJUR.crypto.ECDSA != "undefined" && a instanceof KJUR.crypto.ECDSA && a.isPrivate == true) {
    var d = new KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 1 },

      {
        octstr: {
          hex: a.prvKeyHex } },


      {
        tag: ["a1", true, {
          bitstr: {
            hex: "00" + a.pubKeyHex } }] }] });




    var c = d.getEncodedHex();
    var t = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 0 },

      {
        seq: [{
          oid: {
            name: "ecPublicKey" } },


        {
          oid: {
            name: a.curveName } }] },



      {
        octstr: {
          hex: c } }] });



    var m = t.getEncodedHex();
    if (o === undefined || o == null) {
      return v.ASN1Util.getPEMStringFromHex(m, "PRIVATE KEY");
    } else {
      var k = h(m, o);
      return v.ASN1Util.getPEMStringFromHex(k, "ENCRYPTED PRIVATE KEY");
    }
  }
  if (r == "PKCS8PRV" && typeof KJUR.crypto.DSA != "undefined" && a instanceof KJUR.crypto.DSA && a.isPrivate == true) {
    var d = new KJUR.asn1.DERInteger({
      bigint: a.x });

    var c = d.getEncodedHex();
    var t = KJUR.asn1.ASN1Util.newObject({
      seq: [{
        "int": 0 },

      {
        seq: [{
          oid: {
            name: "dsa" } },


        {
          seq: [{
            "int": {
              bigint: a.p } },


          {
            "int": {
              bigint: a.q } },


          {
            "int": {
              bigint: a.g } }] }] },




      {
        octstr: {
          hex: c } }] });



    var m = t.getEncodedHex();
    if (o === undefined || o == null) {
      return v.ASN1Util.getPEMStringFromHex(m, "PRIVATE KEY");
    } else {
      var k = h(m, o);
      return v.ASN1Util.getPEMStringFromHex(k, "ENCRYPTED PRIVATE KEY");
    }
  }
  throw "unsupported object nor format";
};
KEYUTIL.getKeyFromCSRPEM = function (b) {
  var a = ASN1HEX.pemToHex(b, "CERTIFICATE REQUEST");
  var c = KEYUTIL.getKeyFromCSRHex(a);
  return c;
};
KEYUTIL.getKeyFromCSRHex = function (a) {
  var c = KEYUTIL.parseCSRHex(a);
  var b = KEYUTIL.getKey(c.p8pubkeyhex, null, "pkcs8pub");
  return b;
};
KEYUTIL.parseCSRHex = function (c) {
  var b = {};
  var e = c;
  if (e.substr(0, 2) != "30") {
    throw "malformed CSR(code:001)";
  }
  var d = ASN1HEX.getPosArrayOfChildren_AtObj(e, 0);
  if (d.length < 1) {
    throw "malformed CSR(code:002)";
  }
  if (e.substr(d[0], 2) != "30") {
    throw "malformed CSR(code:003)";
  }
  var a = ASN1HEX.getPosArrayOfChildren_AtObj(e, d[0]);
  if (a.length < 3) {
    throw "malformed CSR(code:004)";
  }
  b.p8pubkeyhex = ASN1HEX.getHexOfTLV_AtObj(e, a[2]);
  return b;
};
KEYUTIL.getJWKFromKey = function (d) {
  var b = {};
  if (d instanceof RSAKey && d.isPrivate) {
    b.kty = "RSA";
    b.n = hextob64u(d.n.toString(16));
    b.e = hextob64u(d.e.toString(16));
    b.d = hextob64u(d.d.toString(16));
    b.p = hextob64u(d.p.toString(16));
    b.q = hextob64u(d.q.toString(16));
    b.dp = hextob64u(d.dmp1.toString(16));
    b.dq = hextob64u(d.dmq1.toString(16));
    b.qi = hextob64u(d.coeff.toString(16));
    return b;
  } else {
    if (d instanceof RSAKey && d.isPublic) {
      b.kty = "RSA";
      b.n = hextob64u(d.n.toString(16));
      b.e = hextob64u(d.e.toString(16));
      return b;
    } else {
      if (d instanceof KJUR.crypto.ECDSA && d.isPrivate) {
        var a = d.getShortNISTPCurveName();
        if (a !== "P-256" && a !== "P-384") {
          throw "unsupported curve name for JWT: " + a;
        }
        var c = d.getPublicKeyXYHex();
        b.kty = "EC";
        b.crv = a;
        b.x = hextob64u(c.x);
        b.y = hextob64u(c.y);
        b.d = hextob64u(d.prvKeyHex);
        return b;
      } else {
        if (d instanceof KJUR.crypto.ECDSA && d.isPublic) {
          var a = d.getShortNISTPCurveName();
          if (a !== "P-256" && a !== "P-384") {
            throw "unsupported curve name for JWT: " + a;
          }
          var c = d.getPublicKeyXYHex();
          b.kty = "EC";
          b.crv = a;
          b.x = hextob64u(c.x);
          b.y = hextob64u(c.y);
          return b;
        }
      }
    }
  }
  throw "not supported key object";
};
/*! rsapem-1.2.0.js (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
RSAKey.pemToBase64 = function (b) {
  var a = b;
  a = a.replace("-----BEGIN RSA PRIVATE KEY-----", "");
  a = a.replace("-----END RSA PRIVATE KEY-----", "");
  a = a.replace(/[ \n]+/g, "");
  return a;
};
RSAKey.getPosArrayOfChildrenFromHex = function (g) {
  var j = new Array();
  var i = ASN1HEX.getStartPosOfV_AtObj(g, 0);
  var b = ASN1HEX.getPosOfNextSibling_AtObj(g, i);
  var e = ASN1HEX.getPosOfNextSibling_AtObj(g, b);
  var f = ASN1HEX.getPosOfNextSibling_AtObj(g, e);
  var l = ASN1HEX.getPosOfNextSibling_AtObj(g, f);
  var k = ASN1HEX.getPosOfNextSibling_AtObj(g, l);
  var d = ASN1HEX.getPosOfNextSibling_AtObj(g, k);
  var c = ASN1HEX.getPosOfNextSibling_AtObj(g, d);
  var h = ASN1HEX.getPosOfNextSibling_AtObj(g, c);
  j.push(i, b, e, f, l, k, d, c, h);
  return j;
};
RSAKey.getHexValueArrayOfChildrenFromHex = function (f) {
  var l = RSAKey.getPosArrayOfChildrenFromHex(f);
  var e = ASN1HEX.getHexOfV_AtObj(f, l[0]);
  var j = ASN1HEX.getHexOfV_AtObj(f, l[1]);
  var b = ASN1HEX.getHexOfV_AtObj(f, l[2]);
  var c = ASN1HEX.getHexOfV_AtObj(f, l[3]);
  var h = ASN1HEX.getHexOfV_AtObj(f, l[4]);
  var g = ASN1HEX.getHexOfV_AtObj(f, l[5]);
  var m = ASN1HEX.getHexOfV_AtObj(f, l[6]);
  var k = ASN1HEX.getHexOfV_AtObj(f, l[7]);
  var d = ASN1HEX.getHexOfV_AtObj(f, l[8]);
  var i = new Array();
  i.push(e, j, b, c, h, g, m, k, d);
  return i;
};
RSAKey.prototype.readPrivateKeyFromPEMString = function (e) {
  var c = RSAKey.pemToBase64(e);
  var d = b64tohex(c);
  var b = RSAKey.getHexValueArrayOfChildrenFromHex(d);
  this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);
};
RSAKey.prototype.readPrivateKeyFromASN1HexString = function (a) {
  this.readPKCS5PrvKeyHex(a);
};
RSAKey.prototype.readPKCS5PrvKeyHex = function (c) {
  var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);
  this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);
};
RSAKey.prototype.readPKCS8PrvKeyHex = function (e) {
  var c, j, l, b, a, f, d, k;
  var m = ASN1HEX;
  var g = m.getVbyList;
  if (m.isASN1HEX(e) === false) {
    throw "not ASN.1 hex string";
  }
  try {
    c = g(e, 0, [2, 0, 1], "02");
    j = g(e, 0, [2, 0, 2], "02");
    l = g(e, 0, [2, 0, 3], "02");
    b = g(e, 0, [2, 0, 4], "02");
    a = g(e, 0, [2, 0, 5], "02");
    f = g(e, 0, [2, 0, 6], "02");
    d = g(e, 0, [2, 0, 7], "02");
    k = g(e, 0, [2, 0, 8], "02");
  } catch (i) {
    throw "malformed PKCS#8 plain RSA private key";
  }
  this.setPrivateEx(c, j, l, b, a, f, d, k);
};
RSAKey.prototype.readPKCS5PubKeyHex = function (b) {
  if (ASN1HEX.isASN1HEX(b) === false) {
    throw "keyHex is not ASN.1 hex string";
  }
  var a = ASN1HEX.getPosArrayOfChildren_AtObj(b, 0);
  if (a.length !== 2 || b.substr(a[0], 2) !== "02" || b.substr(a[1], 2) !== "02") {
    throw "wrong hex for PKCS#5 public key";
  }
  var d = ASN1HEX.getHexOfV_AtObj(b, a[0]);
  var c = ASN1HEX.getHexOfV_AtObj(b, a[1]);
  this.setPublic(d, c);
};
RSAKey.prototype.readPKCS8PubKeyHex = function (b) {
  if (ASN1HEX.isASN1HEX(b) === false) {
    throw "not ASN.1 hex string";
  }
  if (ASN1HEX.getDecendantHexTLVByNthList(b, 0, [0, 0]) !== "06092a864886f70d010101") {
    throw "not PKCS8 RSA public key";
  }
  var a = ASN1HEX.getDecendantHexTLVByNthList(b, 0, [1, 0]);
  this.readPKCS5PubKeyHex(a);
};
RSAKey.prototype.readCertPubKeyHex = function (b, c) {
  if (c !== 5) {
    c = 6;
  }
  if (ASN1HEX.isASN1HEX(b) === false) {
    throw "not ASN.1 hex string";
  }
  var a = ASN1HEX.getDecendantHexTLVByNthList(b, 0, [0, c]);
  this.readPKCS8PubKeyHex(a);
};
/*! rsasign-1.2.7.js (c) 2012 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
var _RE_HEXDECONLY = new RegExp("");
_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");
function _rsasign_getHexPaddedDigestInfoForString(d, e, a) {
  var b = function b(f) {
    return KJUR.crypto.Util.hashString(f, a);
  };
  var c = b(d);
  return KJUR.crypto.Util.getPaddedDigestInfoHex(c, a, e);
}
function _zeroPaddingOfSignature(e, d) {
  var c = "";
  var a = d / 4 - e.length;
  for (var b = 0; b < a; b++) {
    c = c + "0";
  }
  return c + e;
}
function _rsasign_signString(d, a) {

  var b = function b(e) {
    return KJUR.crypto.Util.hashString(e, a);
  };
  var c = b(d);
  return this.signWithMessageHash(c, a);
}
function _rsasign_signWithMessageHash(e, c) {
  var f = KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, this.n.bitLength());
  var b = parseBigInt(f, 16);
  var d = this.doPrivate(b);
  var a = d.toString(16);
  return _zeroPaddingOfSignature(a, this.n.bitLength());
}
function _rsasign_signStringWithSHA1(a) {
  return _rsasign_signString.call(this, a, "sha1");
}
function _rsasign_signStringWithSHA256(a) {
  return _rsasign_signString.call(this, a, "sha256");
}
function pss_mgf1_str(c, a, e) {
  var b = "",
  d = 0;
  while (b.length < a) {
    b += hextorstr(e(rstrtohex(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]))));
    d += 1;
  }
  return b;
}
function _rsasign_signStringPSS(e, a, d) {
  var c = function c(f) {
    return KJUR.crypto.Util.hashHex(f, a);
  };
  var b = c(rstrtohex(e));
  if (d === undefined) {
    d = -1;
  }
  return this.signWithMessageHashPSS(b, a, d);
}
function _rsasign_signWithMessageHashPSS(l, a, k) {
  var b = hextorstr(l);
  var g = b.length;
  var m = this.n.bitLength() - 1;
  var c = Math.ceil(m / 8);
  var d;
  var o = function o(i) {
    return KJUR.crypto.Util.hashHex(i, a);
  };
  if (k === -1 || k === undefined) {
    k = g;
  } else {
    if (k === -2) {
      k = c - g - 2;
    } else {
      if (k < -2) {
        throw "invalid salt length";
      }
    }
  }
  if (c < g + k + 2) {
    throw "data too long";
  }
  var f = "";
  if (k > 0) {
    f = new Array(k);
    new SecureRandom().nextBytes(f);
    f = String.fromCharCode.apply(String, f);
  }
  var n = hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + b + f)));
  var j = [];
  for (d = 0; d < c - k - g - 2; d += 1) {
    j[d] = 0;
  }
  var e = String.fromCharCode.apply(String, j) + "\x01" + f;
  var h = pss_mgf1_str(n, e.length, o);
  var q = [];
  for (d = 0; d < e.length; d += 1) {
    q[d] = e.charCodeAt(d) ^ h.charCodeAt(d);
  }
  var p = 65280 >> 8 * c - m & 255;
  q[0] &= ~p;
  for (d = 0; d < g; d++) {
    q.push(n.charCodeAt(d));
  }
  q.push(188);
  return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16), this.n.bitLength());
}
function _rsasign_getDecryptSignatureBI(a, d, c) {
  var b = new RSAKey();
  b.setPublic(d, c);
  var e = b.doPublic(a);
  return e;
}
function _rsasign_getHexDigestInfoFromSig(a, c, b) {
  var e = _rsasign_getDecryptSignatureBI(a, c, b);
  var d = e.toString(16).replace(/^1f+00/, "");
  return d;
}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f) {
  for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {
    var d = KJUR.crypto.Util.DIGESTINFOHEAD[e];
    var b = d.length;
    if (f.substring(0, b) == d) {
      var c = [e, f.substring(b)];
      return c;
    }
  }
  return [];
}
function _rsasign_verifySignatureWithArgs(f, b, g, j) {
  var e = _rsasign_getHexDigestInfoFromSig(b, g, j);
  var h = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
  if (h.length == 0) {
    return false;
  }
  var d = h[0];
  var i = h[1];
  var a = function a(k) {
    return KJUR.crypto.Util.hashString(k, d);
  };
  var c = a(f);
  return i == c;
}
function _rsasign_verifyHexSignatureForMessage(c, b) {
  var d = parseBigInt(c, 16);
  var a = _rsasign_verifySignatureWithArgs(b, d, this.n.toString(16), this.e.toString(16));
  return a;
}
function _rsasign_verifyString(f, j) {
  j = j.replace(_RE_HEXDECONLY, "");
  j = j.replace(/[ \n]+/g, "");
  var b = parseBigInt(j, 16);
  if (b.bitLength() > this.n.bitLength()) {
    return 0;
  }
  var i = this.doPublic(b);
  var e = i.toString(16).replace(/^1f+00/, "");
  var g = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
  if (g.length == 0) {
    return false;
  }
  var d = g[0];
  var h = g[1];
  var a = function a(k) {
    return KJUR.crypto.Util.hashString(k, d);
  };
  var c = a(f);
  return h == c;
}
function _rsasign_verifyWithMessageHash(e, a) {
  a = a.replace(_RE_HEXDECONLY, "");
  a = a.replace(/[ \n]+/g, "");
  var b = parseBigInt(a, 16);
  if (b.bitLength() > this.n.bitLength()) {
    return 0;
  }
  var h = this.doPublic(b);
  var g = h.toString(16).replace(/^1f+00/, "");
  var c = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g);
  if (c.length == 0) {
    return false;
  }
  var d = c[0];
  var f = c[1];
  return f == e;
}
function _rsasign_verifyStringPSS(c, b, a, f) {
  var e = function e(g) {
    return KJUR.crypto.Util.hashHex(g, a);
  };
  var d = e(rstrtohex(c));
  if (f === undefined) {
    f = -1;
  }
  return this.verifyWithMessageHashPSS(d, b, a, f);
}
function _rsasign_verifyWithMessageHashPSS(f, s, l, c) {
  var k = new BigInteger(s, 16);
  if (k.bitLength() > this.n.bitLength()) {
    return false;
  }
  var r = function r(i) {
    return KJUR.crypto.Util.hashHex(i, l);
  };
  var j = hextorstr(f);
  var h = j.length;
  var g = this.n.bitLength() - 1;
  var m = Math.ceil(g / 8);
  var q;
  if (c === -1 || c === undefined) {
    c = h;
  } else {
    if (c === -2) {
      c = m - h - 2;
    } else {
      if (c < -2) {
        throw "invalid salt length";
      }
    }
  }
  if (m < h + c + 2) {
    throw "data too long";
  }
  var a = this.doPublic(k).toByteArray();
  for (q = 0; q < a.length; q += 1) {
    a[q] &= 255;
  }
  while (a.length < m) {
    a.unshift(0);
  }
  if (a[m - 1] !== 188) {
    throw "encoded message does not end in 0xbc";
  }
  a = String.fromCharCode.apply(String, a);
  var d = a.substr(0, m - h - 1);
  var e = a.substr(d.length, h);
  var p = 65280 >> 8 * m - g & 255;
  if ((d.charCodeAt(0) & p) !== 0) {
    throw "bits beyond keysize not zero";
  }
  var n = pss_mgf1_str(e, d.length, r);
  var o = [];
  for (q = 0; q < d.length; q += 1) {
    o[q] = d.charCodeAt(q) ^ n.charCodeAt(q);
  }
  o[0] &= ~p;
  var b = m - h - c - 2;
  for (q = 0; q < b; q += 1) {
    if (o[q] !== 0) {
      throw "leftmost octets not zero";
    }
  }
  if (o[b] !== 1) {
    throw "0x01 marker not found";
  }
  return e === hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + j + String.fromCharCode.apply(String, o.slice(-c)))));
}
RSAKey.prototype.signWithMessageHash = _rsasign_signWithMessageHash;
RSAKey.prototype.signString = _rsasign_signString;
RSAKey.prototype.signStringWithSHA1 = _rsasign_signStringWithSHA1;
RSAKey.prototype.signStringWithSHA256 = _rsasign_signStringWithSHA256;
RSAKey.prototype.sign = _rsasign_signString;
RSAKey.prototype.signWithSHA1 = _rsasign_signStringWithSHA1;
RSAKey.prototype.signWithSHA256 = _rsasign_signStringWithSHA256;
RSAKey.prototype.signWithMessageHashPSS = _rsasign_signWithMessageHashPSS;
RSAKey.prototype.signStringPSS = _rsasign_signStringPSS;
RSAKey.prototype.signPSS = _rsasign_signStringPSS;
RSAKey.SALT_LEN_HLEN = -1;
RSAKey.SALT_LEN_MAX = -2;
RSAKey.prototype.verifyWithMessageHash = _rsasign_verifyWithMessageHash;
RSAKey.prototype.verifyString = _rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForMessage = _rsasign_verifyHexSignatureForMessage;
RSAKey.prototype.verify = _rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForByteArrayMessage = _rsasign_verifyHexSignatureForMessage;
RSAKey.prototype.verifyWithMessageHashPSS = _rsasign_verifyWithMessageHashPSS;
RSAKey.prototype.verifyStringPSS = _rsasign_verifyStringPSS;
RSAKey.prototype.verifyPSS = _rsasign_verifyStringPSS;
RSAKey.SALT_LEN_RECOVER = -2;
/*! x509-1.1.12.js (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
                               */
function X509() {
  this.subjectPublicKeyRSA = null;
  this.subjectPublicKeyRSA_hN = null;
  this.subjectPublicKeyRSA_hE = null;
  this.hex = null;
  this.getSerialNumberHex = function () {
    return ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 1]);
  };
  this.getSignatureAlgorithmField = function () {
    var b = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 2, 0]);
    var a = KJUR.asn1.ASN1Util.oidHexToInt(b);
    var c = KJUR.asn1.x509.OID.oid2name(a);
    return c;
  };
  this.getIssuerHex = function () {
    return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 3]);
  };
  this.getIssuerString = function () {
    return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 3]));
  };
  this.getSubjectHex = function () {
    return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 5]);
  };
  this.getSubjectString = function () {
    return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 5]));
  };
  this.getNotBefore = function () {
    var a = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 4, 0]);
    a = a.replace(/(..)/g, "%$1");
    a = decodeURIComponent(a);
    return a;
  };
  this.getNotAfter = function () {
    var a = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 4, 1]);
    a = a.replace(/(..)/g, "%$1");
    a = decodeURIComponent(a);
    return a;
  };
  this.readCertPEM = function (c) {
    var e = ASN1HEX.pemToHex(c);
    var b = X509.getPublicKeyHexArrayFromCertHex(e);
    var d = new RSAKey();
    d.setPublic(b[0], b[1]);
    this.subjectPublicKeyRSA = d;
    this.subjectPublicKeyRSA_hN = b[0];
    this.subjectPublicKeyRSA_hE = b[1];
    this.hex = e;
  };
  this.readCertPEMWithoutRSAInit = function (c) {
    var d = ASN1HEX.pemToHex(c);
    var b = X509.getPublicKeyHexArrayFromCertHex(d);
    if (typeof this.subjectPublicKeyRSA.setPublic === "function") {
      this.subjectPublicKeyRSA.setPublic(b[0], b[1]);
    }
    this.subjectPublicKeyRSA_hN = b[0];
    this.subjectPublicKeyRSA_hE = b[1];
    this.hex = d;
  };
  this.getInfo = function () {
    var p = "Basic Fields\n";
    p += "  serial number: " + this.getSerialNumberHex() + "\n";
    p += "  signature algorithm: " + this.getSignatureAlgorithmField() + "\n";
    p += "  issuer: " + this.getIssuerString() + "\n";
    p += "  notBefore: " + this.getNotBefore() + "\n";
    p += "  notAfter: " + this.getNotAfter() + "\n";
    p += "  subject: " + this.getSubjectString() + "\n";
    p += "  subject public key info: \n";
    var j = X509.getSubjectPublicKeyInfoPosFromCertHex(this.hex);
    var d = ASN1HEX.getHexOfTLV_AtObj(this.hex, j);
    var n = KEYUTIL.getKey(d, null, "pkcs8pub");
    if (n instanceof RSAKey) {
      p += "    key algorithm: RSA\n";
      p += "    n=" + n.n.toString(16).substr(0, 16) + "...\n";
      p += "    e=" + n.e.toString(16) + "\n";
    }
    p += "X509v3 Extensions:\n";
    var m = X509.getV3ExtInfoListOfCertHex(this.hex);
    for (var e = 0; e < m.length; e++) {
      var b = m[e];
      var o = KJUR.asn1.x509.OID.oid2name(b.oid);
      if (o === "") {
        o = b.oid;
      }
      var k = "";
      if (b.critical === true) {
        k = "CRITICAL";
      }
      p += "  " + o + " " + k + ":\n";
      if (o === "basicConstraints") {
        var g = X509.getExtBasicConstraints(this.hex);
        if (g.cA === undefined) {
          p += "    {}\n";
        } else {
          p += "    cA=true";
          if (g.pathLen !== undefined) {
            p += ", pathLen=" + g.pathLen;
          }
          p += "\n";
        }
      } else {
        if (o === "keyUsage") {
          p += "    " + X509.getExtKeyUsageString(this.hex) + "\n";
        } else {
          if (o === "subjectKeyIdentifier") {
            p += "    " + X509.getExtSubjectKeyIdentifier(this.hex) + "\n";
          } else {
            if (o === "authorityKeyIdentifier") {
              var a = X509.getExtAuthorityKeyIdentifier(this.hex);
              if (a.kid !== undefined) {
                p += "    kid=" + a.kid + "\n";
              }
            } else {
              if (o === "extKeyUsage") {
                var h = X509.getExtExtKeyUsageName(this.hex);
                p += "    " + h.join(", ") + "\n";
              } else {
                if (o === "subjectAltName") {
                  var f = X509.getExtSubjectAltName(this.hex);
                  p += "    " + f.join(", ") + "\n";
                } else {
                  if (o === "cRLDistributionPoints") {
                    var l = X509.getExtCRLDistributionPointsURI(this.hex);
                    p += "    " + l + "\n";
                  } else {
                    if (o === "authorityInfoAccess") {
                      var c = X509.getExtAIAInfo(this.hex);
                      if (c.ocsp !== undefined) {
                        p += "    ocsp: " + c.ocsp.join(",") + "\n";
                      }
                      if (c.caissuer !== undefined) {
                        p += "    caissuer: " + c.caissuer.join(",") + "\n";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    p += "signature algorithm: " + X509.getSignatureAlgorithmName(this.hex) + "\n";
    p += "signature: " + X509.getSignatureValueHex(this.hex).substr(0, 16) + "...\n";
    return p;
  };
}
X509.pemToBase64 = function (a) {
  var b = a;
  b = b.replace("-----BEGIN CERTIFICATE-----", "");
  b = b.replace("-----END CERTIFICATE-----", "");
  b = b.replace(/[ \n]+/g, "");
  return b;
};
X509.pemToHex = function (a) {
  return ASN1HEX.pemToHex(a);
};
X509.getSubjectPublicKeyPosFromCertHex = function (f) {
  var e = X509.getSubjectPublicKeyInfoPosFromCertHex(f);
  if (e == -1) {
    return -1;
  }
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, e);
  if (b.length != 2) {
    return -1;
  }
  var d = b[1];
  if (f.substring(d, d + 2) != "03") {
    return -1;
  }
  var c = ASN1HEX.getStartPosOfV_AtObj(f, d);
  if (f.substring(c, c + 2) != "00") {
    return -1;
  }
  return c + 2;
};
X509.getSubjectPublicKeyInfoPosFromCertHex = function (d) {
  var c = ASN1HEX.getStartPosOfV_AtObj(d, 0);
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(d, c);
  if (b.length < 1) {
    return -1;
  }
  if (d.substring(b[0], b[0] + 10) == "a003020102") {
    if (b.length < 6) {
      return -1;
    }
    return b[6];
  } else {
    if (b.length < 5) {
      return -1;
    }
    return b[5];
  }
};
X509.getPublicKeyHexArrayFromCertHex = function (f) {
  var e = X509.getSubjectPublicKeyPosFromCertHex(f);
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, e);
  if (b.length != 2) {
    return [];
  }
  var d = ASN1HEX.getHexOfV_AtObj(f, b[0]);
  var c = ASN1HEX.getHexOfV_AtObj(f, b[1]);
  if (d != null && c != null) {
    return [d, c];
  } else {
    return [];
  }
};
X509.getHexTbsCertificateFromCert = function (b) {
  var a = ASN1HEX.getStartPosOfV_AtObj(b, 0);
  return a;
};
X509.getPublicKeyHexArrayFromCertPEM = function (c) {
  var d = ASN1HEX.pemToHex(c);
  var b = X509.getPublicKeyHexArrayFromCertHex(d);
  return b;
};
X509.hex2dn = function (f, b) {
  if (b === undefined) {
    b = 0;
  }
  if (f.substr(b, 2) !== "30") {
    throw "malformed DN";
  }
  var c = new Array();
  var d = ASN1HEX.getPosArrayOfChildren_AtObj(f, b);
  for (var e = 0; e < d.length; e++) {
    c.push(X509.hex2rdn(f, d[e]));
  }
  c = c.map(function (a) {
    return a.replace("/", "\\/");
  });
  return "/" + c.join("/");
};
X509.hex2rdn = function (f, b) {
  if (b === undefined) {
    b = 0;
  }
  if (f.substr(b, 2) !== "31") {
    throw "malformed RDN";
  }
  var c = new Array();
  var d = ASN1HEX.getPosArrayOfChildren_AtObj(f, b);
  for (var e = 0; e < d.length; e++) {
    c.push(X509.hex2attrTypeValue(f, d[e]));
  }
  c = c.map(function (a) {
    return a.replace("+", "\\+");
  });
  return c.join("+");
};
X509.hex2attrTypeValue = function (g, b) {
  if (b === undefined) {
    b = 0;
  }
  if (g.substr(b, 2) !== "30") {
    throw "malformed attribute type and value";
  }
  var c = ASN1HEX.getPosArrayOfChildren_AtObj(g, b);
  if (c.length !== 2 || g.substr(c[0], 2) !== "06") {
    "malformed attribute type and value";
  }
  var d = ASN1HEX.getHexOfV_AtObj(g, c[0]);
  var h = KJUR.asn1.ASN1Util.oidHexToInt(d);
  var f = KJUR.asn1.x509.OID.oid2atype(h);
  var a = ASN1HEX.getHexOfV_AtObj(g, c[1]);
  var e = hextorstr(a);
  return f + "=" + e;
};
X509.getPublicKeyFromCertHex = function (c) {
  var a, e, b;
  var g = 6;
  var d = ASN1HEX;
  var f = d.getVbyList;
  b = d.getDecendantHexTLVByNthList(c, 0, [0, 0]);
  if (b !== "a003020102") {
    g = 5;
  }
  e = f(c, 0, [0, g, 0, 0], "06");
  if (e === "2a864886f70d010101") {
    a = new RSAKey();
  } else {
    if (e === "2a8648ce380401") {
      a = new KJUR.crypto.DSA();
    } else {
      if (e === "2a8648ce3d0201") {
        a = new KJUR.crypto.ECDSA();
      } else {
        throw "unsupported public key in X.509 cert";
      }
    }
  }
  a.readCertPubKeyHex(c, g);
  return a;
};
X509.getPublicKeyFromCertPEM = function (a) {
  var c = ASN1HEX;
  var b = c.pemToHex(a);
  return X509.getPublicKeyFromCertHex(b);
};
X509.getPublicKeyInfoPropOfCertPEM = function (e) {
  var i = {};
  i.algparam = null;
  var f = ASN1HEX.pemToHex(e);
  var d = ASN1HEX.getPosArrayOfChildren_AtObj(f, 0);
  if (d.length != 3) {
    throw "malformed X.509 certificate PEM (code:001)";
  }
  if (f.substr(d[0], 2) != "30") {
    throw "malformed X.509 certificate PEM (code:002)";
  }
  var c = ASN1HEX.getPosArrayOfChildren_AtObj(f, d[0]);
  var g = 6;
  if (f.substr(c[0], 2) !== "a0") {
    g = 5;
  }
  if (c.length < g + 1) {
    throw "malformed X.509 certificate PEM (code:003)";
  }
  var a = ASN1HEX.getPosArrayOfChildren_AtObj(f, c[g]);
  if (a.length != 2) {
    throw "malformed X.509 certificate PEM (code:004)";
  }
  var h = ASN1HEX.getPosArrayOfChildren_AtObj(f, a[0]);
  if (h.length != 2) {
    throw "malformed X.509 certificate PEM (code:005)";
  }
  i.algoid = ASN1HEX.getHexOfV_AtObj(f, h[0]);
  if (f.substr(h[1], 2) == "06") {
    i.algparam = ASN1HEX.getHexOfV_AtObj(f, h[1]);
  } else {
    if (f.substr(h[1], 2) == "30") {
      i.algparam = ASN1HEX.getHexOfTLV_AtObj(f, h[1]);
    }
  }
  if (f.substr(a[1], 2) != "03") {
    throw "malformed X.509 certificate PEM (code:006)";
  }
  var b = ASN1HEX.getHexOfV_AtObj(f, a[1]);
  i.keyhex = b.substr(2);
  return i;
};
X509.getPublicKeyInfoPosOfCertHEX = function (c) {
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
  if (b.length != 3) {
    throw "malformed X.509 certificate PEM (code:001)";
  }
  if (c.substr(b[0], 2) != "30") {
    throw "malformed X.509 certificate PEM (code:002)";
  }
  var a = ASN1HEX.getPosArrayOfChildren_AtObj(c, b[0]);
  if (a.length < 7) {
    throw "malformed X.509 certificate PEM (code:003)";
  }
  return a[6];
};
X509.getV3ExtInfoListOfCertHex = function (g) {
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(g, 0);
  if (b.length != 3) {
    throw "malformed X.509 certificate PEM (code:001)";
  }
  if (g.substr(b[0], 2) != "30") {
    throw "malformed X.509 certificate PEM (code:002)";
  }
  var a = ASN1HEX.getPosArrayOfChildren_AtObj(g, b[0]);
  if (a.length < 8) {
    throw "malformed X.509 certificate PEM (code:003)";
  }
  if (g.substr(a[7], 2) != "a3") {
    throw "malformed X.509 certificate PEM (code:004)";
  }
  var h = ASN1HEX.getPosArrayOfChildren_AtObj(g, a[7]);
  if (h.length != 1) {
    throw "malformed X.509 certificate PEM (code:005)";
  }
  if (g.substr(h[0], 2) != "30") {
    throw "malformed X.509 certificate PEM (code:006)";
  }
  var f = ASN1HEX.getPosArrayOfChildren_AtObj(g, h[0]);
  var e = f.length;
  var d = new Array(e);
  for (var c = 0; c < e; c++) {
    d[c] = X509.getV3ExtItemInfo_AtObj(g, f[c]);
  }
  return d;
};
X509.getV3ExtItemInfo_AtObj = function (f, g) {
  var e = {};
  e.posTLV = g;
  var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, g);
  if (b.length != 2 && b.length != 3) {
    throw "malformed X.509v3 Ext (code:001)";
  }
  if (f.substr(b[0], 2) != "06") {
    throw "malformed X.509v3 Ext (code:002)";
  }
  var d = ASN1HEX.getHexOfV_AtObj(f, b[0]);
  e.oid = ASN1HEX.hextooidstr(d);
  e.critical = false;
  if (b.length == 3) {
    e.critical = true;
  }
  var c = b[b.length - 1];
  if (f.substr(c, 2) != "04") {
    throw "malformed X.509v3 Ext (code:003)";
  }
  e.posV = ASN1HEX.getStartPosOfV_AtObj(f, c);
  return e;
};
X509.getHexOfTLV_V3ExtValue = function (b, a) {
  var c = X509.getPosOfTLV_V3ExtValue(b, a);
  if (c == -1) {
    return null;
  }
  return ASN1HEX.getHexOfTLV_AtObj(b, c);
};
X509.getHexOfV_V3ExtValue = function (b, a) {
  var c = X509.getPosOfTLV_V3ExtValue(b, a);
  if (c == -1) {
    return null;
  }
  return ASN1HEX.getHexOfV_AtObj(b, c);
};
X509.getPosOfTLV_V3ExtValue = function (f, b) {
  var d = b;
  if (!b.match(/^[0-9.]+$/)) {
    d = KJUR.asn1.x509.OID.name2oid(b);
  }
  if (d == "") {
    return -1;
  }
  var c = X509.getV3ExtInfoListOfCertHex(f);
  for (var a = 0; a < c.length; a++) {
    var e = c[a];
    if (e.oid == d) {
      return e.posV;
    }
  }
  return -1;
};
X509.getExtBasicConstraints = function (d) {
  var a = X509.getHexOfV_V3ExtValue(d, "basicConstraints");
  if (a === null) {
    return null;
  }
  if (a === "") {
    return {};
  }
  if (a === "0101ff") {
    return {
      cA: true };

  }
  if (a.substr(0, 8) === "0101ff02") {
    var c = ASN1HEX.getHexOfV_AtObj(a, 6);
    var b = parseInt(c, 16);
    return {
      cA: true,
      pathLen: b };

  }
  throw "unknown error";
};
X509.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"];
X509.getExtKeyUsageBin = function (d) {
  var b = X509.getHexOfV_V3ExtValue(d, "keyUsage");
  if (b == "") {
    return "";
  }
  if (b.length % 2 != 0 || b.length <= 2) {
    throw "malformed key usage value";
  }
  var a = parseInt(b.substr(0, 2));
  var c = parseInt(b.substr(2), 16).toString(2);
  return c.substr(0, c.length - a);
};
X509.getExtKeyUsageString = function (e) {
  var d = X509.getExtKeyUsageBin(e);
  var b = new Array();
  for (var c = 0; c < d.length; c++) {
    if (d.substr(c, 1) == "1") {
      b.push(X509.KEYUSAGE_NAME[c]);
    }
  }
  return b.join(",");
};
X509.getExtSubjectKeyIdentifier = function (b) {
  var a = X509.getHexOfV_V3ExtValue(b, "subjectKeyIdentifier");
  return a;
};
X509.getExtAuthorityKeyIdentifier = function (f) {
  var b = {};
  var e = X509.getHexOfTLV_V3ExtValue(f, "authorityKeyIdentifier");
  if (e === null) {
    return null;
  }
  var c = ASN1HEX.getPosArrayOfChildren_AtObj(e, 0);
  for (var d = 0; d < c.length; d++) {
    if (e.substr(c[d], 2) === "80") {
      b.kid = ASN1HEX.getHexOfV_AtObj(e, c[d]);
    }
  }
  return b;
};
X509.getExtExtKeyUsageName = function (k) {
  var b = new Array();
  var f = X509.getHexOfTLV_V3ExtValue(k, "extKeyUsage");
  if (f === null) {
    return null;
  }
  var c = ASN1HEX.getPosArrayOfChildren_AtObj(f, 0);
  for (var e = 0; e < c.length; e++) {
    var j = ASN1HEX.getHexOfV_AtObj(f, c[e]);
    var g = KJUR.asn1.ASN1Util.oidHexToInt(j);
    var d = KJUR.asn1.x509.OID.oid2name(g);
    b.push(d);
  }
  return b;
};
X509.getExtSubjectAltName = function (g) {
  var b = new Array();
  var f = X509.getHexOfTLV_V3ExtValue(g, "subjectAltName");
  var c = ASN1HEX.getPosArrayOfChildren_AtObj(f, 0);
  for (var e = 0; e < c.length; e++) {
    if (f.substr(c[e], 2) === "82") {
      var d = hextoutf8(ASN1HEX.getHexOfV_AtObj(f, c[e]));
      b.push(d);
    }
  }
  return b;
};
X509.getExtCRLDistributionPointsURI = function (n) {
  var p = new Array();
  var k = X509.getHexOfTLV_V3ExtValue(n, "cRLDistributionPoints");
  var o = ASN1HEX.getPosArrayOfChildren_AtObj(k, 0);
  for (var g = 0; g < o.length; g++) {
    var l = ASN1HEX.getHexOfTLV_AtObj(k, o[g]);
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(l, 0);
    for (var e = 0; e < b.length; e++) {
      if (l.substr(b[e], 2) === "a0") {
        var f = ASN1HEX.getHexOfV_AtObj(l, b[e]);
        if (f.substr(0, 2) === "a0") {
          var c = ASN1HEX.getHexOfV_AtObj(f, 0);
          if (c.substr(0, 2) === "86") {
            var m = ASN1HEX.getHexOfV_AtObj(c, 0);
            var d = hextoutf8(m);
            p.push(d);
          }
        }
      }
    }
  }
  return p;
};
X509.getExtAIAInfo = function (g) {
  var j = {};
  j.ocsp = [];
  j.caissuer = [];
  var h = X509.getPosOfTLV_V3ExtValue(g, "authorityInfoAccess");
  if (h == -1) {
    return null;
  }
  if (g.substr(h, 2) != "30") {
    throw "malformed AIA Extn Value";
  }
  var d = ASN1HEX.getPosArrayOfChildren_AtObj(g, h);
  for (var c = 0; c < d.length; c++) {
    var a = d[c];
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(g, a);
    if (b.length != 2) {
      throw "malformed AccessDescription of AIA Extn";
    }
    var e = b[0];
    var f = b[1];
    if (ASN1HEX.getHexOfV_AtObj(g, e) == "2b06010505073001") {
      if (g.substr(f, 2) == "86") {
        j.ocsp.push(hextoutf8(ASN1HEX.getHexOfV_AtObj(g, f)));
      }
    }
    if (ASN1HEX.getHexOfV_AtObj(g, e) == "2b06010505073002") {
      if (g.substr(f, 2) == "86") {
        j.caissuer.push(hextoutf8(ASN1HEX.getHexOfV_AtObj(g, f)));
      }
    }
  }
  return j;
};
X509.getSignatureAlgorithmName = function (d) {
  var b = ASN1HEX.getDecendantHexVByNthList(d, 0, [1, 0]);
  var a = KJUR.asn1.ASN1Util.oidHexToInt(b);
  var c = KJUR.asn1.x509.OID.oid2name(a);
  return c;
};
X509.getSignatureValueHex = function (b) {
  var a = ASN1HEX.getDecendantHexVByNthList(b, 0, [2]);
  if (a.substr(0, 2) !== "00") {
    throw "can't get signature value";
  }
  return a.substr(2);
};
X509.getSerialNumberHex = function (a) {
  return ASN1HEX.getDecendantHexVByNthList(a, 0, [0, 1]);
};
X509.verifySignature = function (f, c) {
  var d = X509.getSignatureAlgorithmName(f);
  var a = X509.getSignatureValueHex(f);
  var b = ASN1HEX.getDecendantHexTLVByNthList(f, 0, [0]);
  var e = new KJUR.crypto.Signature({
    alg: d });

  e.init(c);
  e.updateHex(b);
  return e.verify(a);
};
/*! jws-3.3.5 (c) 2013-2016 Kenji Urushima | kjur.github.com/jsrsasign/license
    */
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.jws == "undefined" || !KJUR.jws) {
  KJUR.jws = {};
}
KJUR.jws.JWS = function () {
  var a = KJUR.jws.JWS;
  this.parseJWS = function (e, h) {
    if (this.parsedJWS !== undefined && (h || this.parsedJWS.sigvalH !== undefined)) {
      return;
    }
    var g = e.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);
    if (g == null) {
      throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
    }
    var i = g[1];
    var c = g[2];
    var j = g[3];
    var l = i + "." + c;
    this.parsedJWS = {};
    this.parsedJWS.headB64U = i;
    this.parsedJWS.payloadB64U = c;
    this.parsedJWS.sigvalB64U = j;
    this.parsedJWS.si = l;
    if (!h) {
      var f = b64utohex(j);
      var d = parseBigInt(f, 16);
      this.parsedJWS.sigvalH = f;
      this.parsedJWS.sigvalBI = d;
    }
    var b = b64utoutf8(i);
    var k = b64utoutf8(c);
    this.parsedJWS.headS = b;
    this.parsedJWS.payloadS = k;
    if (!a.isSafeJSONString(b, this.parsedJWS, "headP")) {
      throw "malformed JSON string for JWS Head: " + b;
    }
  };
};
KJUR.jws.JWS.sign = function (a, i, c, m, l) {
  var k = KJUR.jws.JWS;
  var q, e, j;
  if (typeof i != "string" && typeof i != "object") {
    throw "spHeader must be JSON string or object: " + i;
  }
  if (typeof i == "object") {
    e = i;
    q = JSON.stringify(e);
  }
  if (typeof i == "string") {
    q = i;
    if (!k.isSafeJSONString(q)) {
      throw "JWS Head is not safe JSON string: " + q;
    }
    e = k.readSafeJSONString(q);
  }
  j = c;
  if (typeof c == "object") {
    j = JSON.stringify(c);
  }
  if ((a == "" || a == null) && e.alg !== undefined) {
    a = e.alg;
  }
  if (a != "" && a != null && e.alg === undefined) {
    e.alg = a;
    q = JSON.stringify(e);
  }
  if (a !== e.alg) {
    throw "alg and sHeader.alg doesn't match: " + a + "!=" + e.alg;
  }
  var d = null;
  if (k.jwsalg2sigalg[a] === undefined) {
    throw "unsupported alg name: " + a;
  } else {
    d = k.jwsalg2sigalg[a];
  }
  var b = utf8tob64u(q);
  var g = utf8tob64u(j);
  var o = b + "." + g;
  var n = "";
  if (d.substr(0, 4) == "Hmac") {
    if (m === undefined) {
      throw "mac key shall be specified for HS* alg";
    }
    var h = new KJUR.crypto.Mac({
      alg: d,
      prov: "cryptojs",
      pass: m });

    h.updateString(o);
    n = h.doFinal();
  } else {
    if (d.indexOf("withECDSA") != -1) {
      var p = new KJUR.crypto.Signature({
        alg: d });

      p.init(m, l);
      p.updateString(o);
      hASN1Sig = p.sign();
      n = KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig);
    } else {
      if (d != "none") {
        var p = new KJUR.crypto.Signature({
          alg: d });

        p.init(m, l);
        p.updateString(o);
        n = p.sign();
      }
    }
  }
  var f = hextob64u(n);
  return o + "." + f;
};
KJUR.jws.JWS.verify = function (p, t, j) {
  var m = KJUR.jws.JWS;
  var q = p.split(".");
  var d = q[0];
  var l = q[1];
  var b = d + "." + l;
  var r = b64utohex(q[2]);
  var i = m.readSafeJSONString(b64utoutf8(q[0]));
  var h = null;
  var s = null;
  if (i.alg === undefined) {
    throw "algorithm not specified in header";
  } else {
    h = i.alg;
    s = h.substr(0, 2);
  }
  if (j != null && Object.prototype.toString.call(j) === "[object Array]" && j.length > 0) {
    var c = ":" + j.join(":") + ":";
    if (c.indexOf(":" + h + ":") == -1) {
      throw "algorithm '" + h + "' not accepted in the list";
    }
  }
  if (h != "none" && t === null) {
    throw "key shall be specified to verify.";
  }
  if (typeof t == "string" && t.indexOf("-----BEGIN ") != -1) {
    t = KEYUTIL.getKey(t);
  }
  if (s == "RS" || s == "PS") {
    if (!(t instanceof RSAKey)) {
      throw "key shall be a RSAKey obj for RS* and PS* algs";
    }
  }
  if (s == "ES") {
    if (!(t instanceof KJUR.crypto.ECDSA)) {
      throw "key shall be a ECDSA obj for ES* algs";
    }
  }
  if (h == "none") {}
  var n = null;
  if (m.jwsalg2sigalg[i.alg] === undefined) {
    throw "unsupported alg name: " + h;
  } else {
    n = m.jwsalg2sigalg[h];
  }
  if (n == "none") {
    throw "not supported";
  } else {
    if (n.substr(0, 4) == "Hmac") {
      var k = null;
      if (t === undefined) {
        throw "hexadecimal key shall be specified for HMAC";
      }
      var g = new KJUR.crypto.Mac({
        alg: n,
        pass: t });

      g.updateString(b);
      k = g.doFinal();
      return r == k;
    } else {
      if (n.indexOf("withECDSA") != -1) {
        var f = null;
        try {
          f = KJUR.crypto.ECDSA.concatSigToASN1Sig(r);
        } catch (o) {
          return false;
        }
        var e = new KJUR.crypto.Signature({
          alg: n });

        e.init(t);
        e.updateString(b);
        return e.verify(f);
      } else {
        var e = new KJUR.crypto.Signature({
          alg: n });

        e.init(t);
        e.updateString(b);
        return e.verify(r);
      }
    }
  }
};
KJUR.jws.JWS.parse = function (g) {
  var c = g.split(".");
  var b = {};
  var f, e, d;
  if (c.length != 2 && c.length != 3) {
    throw "malformed sJWS: wrong number of '.' splitted elements";
  }
  f = c[0];
  e = c[1];
  if (c.length == 3) {
    d = c[2];
  }
  b.headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f));
  b.payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e));
  b.headerPP = JSON.stringify(b.headerObj, null, "  ");
  if (b.payloadObj == null) {
    b.payloadPP = b64utoutf8(e);
  } else {
    b.payloadPP = JSON.stringify(b.payloadObj, null, "  ");
  }
  if (d !== undefined) {
    b.sigHex = b64utohex(d);
  }
  return b;
};
KJUR.jws.JWS.verifyJWT = function (d, j, l) {
  var h = KJUR.jws.JWS;
  var i = d.split(".");
  var c = i[0];
  var g = i[1];
  var m = c + "." + g;
  var k = b64utohex(i[2]);
  var f = h.readSafeJSONString(b64utoutf8(c));
  var e = h.readSafeJSONString(b64utoutf8(g));
  if (f.alg === undefined) {
    return false;
  }
  if (l.alg === undefined) {
    throw "acceptField.alg shall be specified";
  }
  if (!h.inArray(f.alg, l.alg)) {
    return false;
  }
  if (e.iss !== undefined && typeof l.iss === "object") {
    if (!h.inArray(e.iss, l.iss)) {
      return false;
    }
  }
  if (e.sub !== undefined && typeof l.sub === "object") {
    if (!h.inArray(e.sub, l.sub)) {
      return false;
    }
  }
  if (e.aud !== undefined && typeof l.aud === "object") {
    if (typeof e.aud == "string") {
      if (!h.inArray(e.aud, l.aud)) {
        return false;
      }
    } else {
      if (typeof e.aud == "object") {
        if (!h.includedArray(e.aud, l.aud)) {
          return false;
        }
      }
    }
  }
  var b = KJUR.jws.IntDate.getNow();
  if (l.verifyAt !== undefined && typeof l.verifyAt === "number") {
    b = l.verifyAt;
  }
  if (l.gracePeriod === undefined || typeof l.gracePeriod !== "number") {
    l.gracePeriod = 0;
  }
  if (e.exp !== undefined && typeof e.exp == "number") {
    if (e.exp + l.gracePeriod < b) {
      return false;
    }
  }
  if (e.nbf !== undefined && typeof e.nbf == "number") {
    if (b < e.nbf - l.gracePeriod) {
      return false;
    }
  }
  if (e.iat !== undefined && typeof e.iat == "number") {
    if (b < e.iat - l.gracePeriod) {
      return false;
    }
  }
  if (e.jti !== undefined && l.jti !== undefined) {
    if (e.jti !== l.jti) {
      return false;
    }
  }
  if (!KJUR.jws.JWS.verify(d, j, l.alg)) {
    return false;
  }
  return true;
};
KJUR.jws.JWS.includedArray = function (b, a) {
  var d = KJUR.jws.JWS.inArray;
  if (b === null) {
    return false;
  }
  if (typeof b !== "object") {
    return false;
  }
  if (typeof b.length !== "number") {
    return false;
  }
  for (var c = 0; c < b.length; c++) {
    if (!d(b[c], a)) {
      return false;
    }
  }
  return true;
};
KJUR.jws.JWS.inArray = function (d, b) {
  if (b === null) {
    return false;
  }
  if (typeof b !== "object") {
    return false;
  }
  if (typeof b.length !== "number") {
    return false;
  }
  for (var c = 0; c < b.length; c++) {
    if (b[c] == d) {
      return true;
    }
  }
  return false;
};
KJUR.jws.JWS.jwsalg2sigalg = {
  HS256: "HmacSHA256",
  HS384: "HmacSHA384",
  HS512: "HmacSHA512",
  RS256: "SHA256withRSA",
  RS384: "SHA384withRSA",
  RS512: "SHA512withRSA",
  ES256: "SHA256withECDSA",
  ES384: "SHA384withECDSA",
  PS256: "SHA256withRSAandMGF1",
  PS384: "SHA384withRSAandMGF1",
  PS512: "SHA512withRSAandMGF1",
  none: "none" };

KJUR.jws.JWS.isSafeJSONString = function (c, b, d) {
  var e = null;
  try {
    e = jsonParse(c);
    if (typeof e != "object") {
      return 0;
    }
    if (e.constructor === Array) {
      return 0;
    }
    if (b) {
      b[d] = e;
    }
    return 1;
  } catch (a) {
    return 0;
  }
};
KJUR.jws.JWS.readSafeJSONString = function (b) {
  var c = null;
  try {
    c = jsonParse(b);
    if (typeof c != "object") {
      return null;
    }
    if (c.constructor === Array) {
      return null;
    }
    return c;
  } catch (a) {
    return null;
  }
};
KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function (b) {
  var a = b.match(/^[^.]+\.[^.]+\.([^.]+)$/);
  if (a == null) {
    throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
  }
  return a[1];
};
KJUR.jws.JWS.getJWKthumbprint = function (d) {
  if (d.kty !== "RSA" && d.kty !== "EC" && d.kty !== "oct") {
    throw "unsupported algorithm for JWK Thumprint";
  }
  var a = "{";
  if (d.kty === "RSA") {
    if (typeof d.n != "string" || typeof d.e != "string") {
      throw "wrong n and e value for RSA key";
    }
    a += '"e":"' + d.e + '",';
    a += '"kty":"' + d.kty + '",';
    a += '"n":"' + d.n + '"}';
  } else {
    if (d.kty === "EC") {
      if (typeof d.crv != "string" || typeof d.x != "string" || typeof d.y != "string") {
        throw "wrong crv, x and y value for EC key";
      }
      a += '"crv":"' + d.crv + '",';
      a += '"kty":"' + d.kty + '",';
      a += '"x":"' + d.x + '",';
      a += '"y":"' + d.y + '"}';
    } else {
      if (d.kty === "oct") {
        if (typeof d.k != "string") {
          throw "wrong k value for oct(symmetric) key";
        }
        a += '"kty":"' + d.kty + '",';
        a += '"k":"' + d.k + '"}';
      }
    }
  }
  var b = rstrtohex(a);
  var c = KJUR.crypto.Util.hashHex(b, "sha256");
  var e = hextob64u(c);
  return e;
};
KJUR.jws.IntDate = {};
KJUR.jws.IntDate.get = function (a) {
  if (a == "now") {
    return KJUR.jws.IntDate.getNow();
  } else {
    if (a == "now + 1hour") {
      return KJUR.jws.IntDate.getNow() + 60 * 60;
    } else {
      if (a == "now + 1day") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24;
      } else {
        if (a == "now + 1month") {
          return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 30;
        } else {
          if (a == "now + 1year") {
            return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 365;
          } else {
            if (a.match(/Z$/)) {
              return KJUR.jws.IntDate.getZulu(a);
            } else {
              if (a.match(/^[0-9]+$/)) {
                return parseInt(a);
              }
            }
          }
        }
      }
    }
  }
  throw "unsupported format: " + a;
};
KJUR.jws.IntDate.getZulu = function (k) {
  var b = k.match(/(\d+)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)Z/);
  if (b) {
    var a = b[1];
    var i = parseInt(a);
    if (a.length == 4) {} else {
      if (a.length == 2) {
        if (50 <= i && i < 100) {
          i = 1900 + i;
        } else {
          if (0 <= i && i < 50) {
            i = 2000 + i;
          } else {
            throw "malformed year string for UTCTime";
          }
        }
      } else {
        throw "malformed year string";
      }
    }
    var g = parseInt(b[2]) - 1;
    var j = parseInt(b[3]);
    var c = parseInt(b[4]);
    var e = parseInt(b[5]);
    var f = parseInt(b[6]);
    var h = new Date(Date.UTC(i, g, j, c, e, f));
    return ~~(h / 1000);
  }
  throw "unsupported format: " + k;
};
KJUR.jws.IntDate.getNow = function () {
  var a = ~~(new Date() / 1000);
  return a;
};
KJUR.jws.IntDate.intDate2UTCString = function (a) {
  var b = new Date(a * 1000);
  return b.toUTCString();
};
KJUR.jws.IntDate.intDate2Zulu = function (e) {
  var i = new Date(e * 1000);
  var h = ("0000" + i.getUTCFullYear()).slice(-4);
  var g = ("00" + (i.getUTCMonth() + 1)).slice(-2);
  var b = ("00" + i.getUTCDate()).slice(-2);
  var a = ("00" + i.getUTCHours()).slice(-2);
  var c = ("00" + i.getUTCMinutes()).slice(-2);
  var f = ("00" + i.getUTCSeconds()).slice(-2);
  return h + g + b + a + c + f + "Z";
};
if (typeof KJUR == "undefined" || !KJUR) {
  KJUR = {};
}
if (typeof KJUR.jws == "undefined" || !KJUR.jws) {
  KJUR.jws = {};
}
KJUR.jws.JWSJS = function () {
  var b = KJUR.jws.JWS;
  var a = KJUR.jws.JWS;
  this.aHeader = [];
  this.sPayload = "";
  this.aSignature = [];
  this.init = function () {
    this.aHeader = [];
    this.sPayload = undefined;
    this.aSignature = [];
  };
  this.initWithJWS = function (d) {
    this.init();
    var c = d.split(".");
    if (c.length != 3) {
      throw "malformed input JWS";
    }
    this.aHeader.push(c[0]);
    this.sPayload = c[1];
    this.aSignature.push(c[2]);
  };
  this.addSignature = function (c, f, k, i) {
    if (this.sPayload === undefined || this.sPayload === null) {
      throw "there's no JSON-JS signature to add.";
    }
    var j = this.aHeader.length;
    if (this.aHeader.length != this.aSignature.length) {
      throw "aHeader.length != aSignature.length";
    }
    try {
      var d = KJUR.jws.JWS.sign(c, f, this.sPayload, k, i);
      var h = d.split(".");
      var l = h[0];
      var e = h[2];
      this.aHeader.push(h[0]);
      this.aSignature.push(h[2]);
    } catch (g) {
      if (this.aHeader.length > j) {
        this.aHeader.pop();
      }
      if (this.aSignature.length > j) {
        this.aSignature.pop();
      }
      throw "addSignature failed: " + g;
    }
  };
  this.addSignatureByHeaderKey = function (f, c) {
    var e = b64utoutf8(this.sPayload);
    var d = new KJUR.jws.JWS();
    var g = d.generateJWSByP1PrvKey(f, e, c);
    this.aHeader.push(d.parsedJWS.headB64U);
    this.aSignature.push(d.parsedJWS.sigvalB64U);
  };
  this.addSignatureByHeaderPayloadKey = function (f, e, c) {
    var d = new KJUR.jws.JWS();
    var g = d.generateJWSByP1PrvKey(f, e, c);
    this.aHeader.push(d.parsedJWS.headB64U);
    this.sPayload = d.parsedJWS.payloadB64U;
    this.aSignature.push(d.parsedJWS.sigvalB64U);
  };
  this.verifyAll = function (f) {
    if (this.aHeader.length !== f.length || this.aSignature.length !== f.length) {
      return false;
    }
    for (var e = 0; e < f.length; e++) {
      var d = f[e];
      if (d.length !== 2) {
        return false;
      }
      var c = this.verifyNth(e, d[0], d[1]);
      if (c === false) {
        return false;
      }
    }
    return true;
  };
  this.verifyNth = function (d, h, e) {
    if (this.aHeader.length <= d || this.aSignature.length <= d) {
      return false;
    }
    var f = this.aHeader[d];
    var i = this.aSignature[d];
    var j = f + "." + this.sPayload + "." + i;
    var c = false;
    try {
      c = a.verify(j, h, e);
    } catch (g) {
      return false;
    }
    return c;
  };
  this.verifyWithCerts = function (d) {
    if (this.aHeader.length != d.length) {
      throw "num headers does not match with num certs";
    }
    if (this.aSignature.length != d.length) {
      throw "num signatures does not match with num certs";
    }
    var l = this.sPayload;
    var h = "";
    for (var e = 0; e < d.length; e++) {
      var f = d[e];
      var g = this.aHeader[e];
      var n = this.aSignature[e];
      var c = g + "." + l + "." + n;
      var k = new KJUR.jws.JWS();
      try {
        var m = k.verifyJWSByPemX509Cert(c, f);
        if (m != 1) {
          h += e + 1 + "th signature unmatch. ";
        }
      } catch (j) {
        h += e + 1 + "th signature fail(" + j + "). ";
      }
    }
    if (h == "") {
      return 1;
    } else {
      throw h;
    }
  };
  this.readJWSJS = function (e) {
    if (typeof e === "string") {
      var d = b.readSafeJSONString(e);
      if (d == null) {
        throw "argument is not safe JSON object string";
      }
      this.aHeader = d.headers;
      this.sPayload = d.payload;
      this.aSignature = d.signatures;
    } else {
      try {
        if (e.headers.length > 0) {
          this.aHeader = e.headers;
        } else {
          throw "malformed header";
        }
        if (typeof e.payload === "string") {
          this.sPayload = e.payload;
        } else {
          throw "malformed signatures";
        }
        if (e.signatures.length > 0) {
          this.signatures = e.signatures;
        } else {
          throw "malformed signatures";
        }
      } catch (c) {
        throw "malformed JWS-JS JSON object: " + c;
      }
    }
  };
  this.getJSON = function () {
    return {
      headers: this.aHeader,
      payload: this.sPayload,
      signatures: this.aSignature };

  };
  this.isEmpty = function () {
    if (this.aHeader.length == 0) {
      return 1;
    }
    return 0;
  };
};var _default =
{
  RSAKey: RSAKey,
  KEYUTIL: KEYUTIL,
  hex2b64: hex2b64,
  b64tohex: b64tohex };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 46).Buffer))

/***/ }),

/***/ 46:
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 47)
var ieee754 = __webpack_require__(/*! ieee754 */ 48)
var isArray = __webpack_require__(/*! isarray */ 49)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 47:
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 48:
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 49:
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 5:
/*!***********************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/pages.json ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 66:
/*!***************************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/static/lib/formatSearch.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function formatSearch(arr, text, keyArr) {
  arr.forEach(function (item) {
    keyArr.forEach(function (items) {
      var old_value = item[items];
      item[items + '_new'] = format(old_value, text);
    });
  });
  return arr;
}

function format(val, keyword) {
  // if(/\*/.test(keyword)) {
  // 	keyword = keyword.replace(/\*/ig,'{xxx}')
  // }
  // const Reg = new RegExp(keyword, 'ig');
  if (val) {
    return val.replace(keyword, "<span style=\"color: #409EFF;\">".concat(keyword, "</span>"));
  }
}

function deepCopy(target) {
  var copyed_objs = []; //???????????????????????????????????????????????????????????????????????????????????????????????? 
  function _deepCopy(target) {
    if (typeof target !== 'object' || !target) {
      return target;
    }
    for (var i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    var obj = {};
    if (Array.isArray(target)) {
      obj = []; //??????target?????????????????? 
    }
    copyed_objs.push({
      target: target,
      copyTarget: obj });

    Object.keys(target).forEach(function (key) {
      if (obj[key]) {
        return;
      }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(target);
}var _default =

formatSearch;exports.default = _default;

/***/ }),

/***/ 67:
/*!*********************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/utils/html-parser.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * HTML5 Parser By Sam Blowes
                                                                                                      *
                                                                                                      * Designed for HTML5 documents
                                                                                                      *
                                                                                                      * Original code by John Resig (ejohn.org)
                                                                                                      * http://ejohn.org/blog/pure-javascript-html-parser/
                                                                                                      * Original code by Erik Arvidsson, Mozilla Public License
                                                                                                      * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
                                                                                                      *
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      * License
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      *
                                                                                                      * This code is triple licensed using Apache Software License 2.0,
                                                                                                      * Mozilla Public License or GNU Public License
                                                                                                      *
                                                                                                      * ////////////////////////////////////////////////////////////////////////////
                                                                                                      *
                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License"); you may not
                                                                                                      * use this file except in compliance with the License.  You may obtain a copy
                                                                                                      * of the License at http://www.apache.org/licenses/LICENSE-2.0
                                                                                                      *
                                                                                                      * ////////////////////////////////////////////////////////////////////////////
                                                                                                      *
                                                                                                      * The contents of this file are subject to the Mozilla Public License
                                                                                                      * Version 1.1 (the "License"); you may not use this file except in
                                                                                                      * compliance with the License. You may obtain a copy of the License at
                                                                                                      * http://www.mozilla.org/MPL/
                                                                                                      *
                                                                                                      * Software distributed under the License is distributed on an "AS IS"
                                                                                                      * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
                                                                                                      * License for the specific language governing rights and limitations
                                                                                                      * under the License.
                                                                                                      *
                                                                                                      * The Original Code is Simple HTML Parser.
                                                                                                      *
                                                                                                      * The Initial Developer of the Original Code is Erik Arvidsson.
                                                                                                      * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
                                                                                                      * Reserved.
                                                                                                      *
                                                                                                      * ////////////////////////////////////////////////////////////////////////////
                                                                                                      *
                                                                                                      * This program is free software; you can redistribute it and/or
                                                                                                      * modify it under the terms of the GNU General Public License
                                                                                                      * as published by the Free Software Foundation; either version 2
                                                                                                      * of the License, or (at your option) any later version.
                                                                                                      *
                                                                                                      * This program is distributed in the hope that it will be useful,
                                                                                                      * but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                      * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                                                                                                      * GNU General Public License for more details.
                                                                                                      *
                                                                                                      * You should have received a copy of the GNU General Public License
                                                                                                      * along with this program; if not, write to the Free Software
                                                                                                      * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
                                                                                                      *
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      * Usage
                                                                                                      * ----------------------------------------------------------------------------
                                                                                                      *
                                                                                                      * // Use like so:
                                                                                                      * HTMLParser(htmlString, {
                                                                                                      *     start: function(tag, attrs, unary) {},
                                                                                                      *     end: function(tag) {},
                                                                                                      *     chars: function(text) {},
                                                                                                      *     comment: function(text) {}
                                                                                                      * });
                                                                                                      *
                                                                                                      * // or to get an XML string:
                                                                                                      * HTMLtoXML(htmlString);
                                                                                                      *
                                                                                                      * // or to get an XML DOM Document
                                                                                                      * HTMLtoDOM(htmlString);
                                                                                                      *
                                                                                                      * // or to inject into an existing document/DOM node
                                                                                                      * HTMLtoDOM(htmlString, document);
                                                                                                      * HTMLtoDOM(htmlString, document.body);
                                                                                                      *
                                                                                                      */
// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'); // Block Elements - HTML 5
// fixed by xxx ??? ins ??????????????????????????????

var block = makeMap('a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5

var inline = makeMap('abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'); // Elements that you can, intentionally, leave open
// (and which close themselves)

var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'); // Attributes that have their values filled in disabled="disabled"

var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'); // Special Elements (can contain anything)

var special = makeMap('script,style');
function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var stack = [];
  var last = html;

  stack.last = function () {
    return this[this.length - 1];
  };

  while (html) {
    chars = true; // Make sure we're not in a script or style element

    if (!stack.last() || !special[stack.last()]) {
      // Comment
      if (html.indexOf('<!--') == 0) {
        index = html.indexOf('-->');

        if (index >= 0) {
          if (handler.comment) {
            handler.comment(html.substring(4, index));
          }

          html = html.substring(index + 3);
          chars = false;
        } // end tag

      } else if (html.indexOf('</') == 0) {
        match = html.match(endTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(endTag, parseEndTag);
          chars = false;
        } // start tag

      } else if (html.indexOf('<') == 0) {
        match = html.match(startTag);

        if (match) {
          html = html.substring(match[0].length);
          match[0].replace(startTag, parseStartTag);
          chars = false;
        }
      }

      if (chars) {
        index = html.indexOf('<');
        var text = index < 0 ? html : html.substring(0, index);
        html = index < 0 ? '' : html.substring(index);

        if (handler.chars) {
          handler.chars(text);
        }
      }
    } else {
      html = html.replace(new RegExp('([\\s\\S]*?)<\/' + stack.last() + '[^>]*>'), function (all, text) {
        text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2');

        if (handler.chars) {
          handler.chars(text);
        }

        return '';
      });
      parseEndTag('', stack.last());
    }

    if (html == last) {
      throw 'Parse Error: ' + html;
    }

    last = html;
  } // Clean up any remaining tags


  parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() == tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) {
      stack.push(tagName);
    }

    if (handler.start) {
      var attrs = [];
      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : '';
        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') // "
        });

      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) {
      var pos = 0;
    } // Find the closest opened tag of the same type
    else {
        for (var pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos] == tagName) {
            break;
          }
        }
      }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(stack[i]);
        }
      } // Remove the open elements from the stack


      stack.length = pos;
    }
  }
}

function makeMap(str) {
  var obj = {};
  var items = str.split(',');

  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }

  return obj;
}

function removeDOCTYPE(html) {
  return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*>\n/, '').replace(/<!DOCTYPE.*>\n/, '');
}

function parseAttrs(attrs) {
  return attrs.reduce(function (pre, attr) {
    var value = attr.value;
    var name = attr.name;

    if (pre[name]) {
      pre[name] = pre[name] + " " + value;
    } else {
      pre[name] = value;
    }

    return pre;
  }, {});
}

function parseHtml(html) {
  html = removeDOCTYPE(html);
  var stacks = [];
  var results = {
    node: 'root',
    children: [] };

  HTMLParser(html, {
    start: function start(tag, attrs, unary) {
      var node = {
        name: tag };


      if (attrs.length !== 0) {
        node.attrs = parseAttrs(attrs);
      }

      if (unary) {
        var parent = stacks[0] || results;

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      } else {
        stacks.unshift(node);
      }
    },
    end: function end(tag) {
      var node = stacks.shift();
      if (node.name !== tag) console.error('invalid state: mismatch end tag');

      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    chars: function chars(text) {
      var node = {
        type: 'text',
        text: text };


      if (stacks.length === 0) {
        results.children.push(node);
      } else {
        var parent = stacks[0];

        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(node);
      }
    },
    comment: function comment(text) {
      var node = {
        node: 'comment',
        text: text };

      var parent = stacks[0];

      if (!parent.children) {
        parent.children = [];
      }

      parent.children.push(node);
    } });

  return results.children;
}var _default =

parseHtml;exports.default = _default;

/***/ }),

/***/ 9:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('?????? log end ??????');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 90:
/*!**************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/utils/util.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Fly = __webpack_require__(/*! ./fly.js */ 91);

var fly = new Fly();

var moment = __webpack_require__(/*! ./moment.js */ 92);

var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

var _timeAgo = function _timeAgo(dateTimeStamp) {
  var result;
  var thisDate = moment(dateTimeStamp);
  var nowDate = moment();

  if (thisDate.format('YYYY') !== nowDate.format('YYYY')) {
    // ?????????
    result = thisDate.format('YYYY-MM-DD');
  } else if (thisDate.format('MM') !== nowDate.format('MM')) {
    // ?????????
    result = thisDate.format('MM-DD');
  } else if (thisDate.format('DD') !== nowDate.format('DD')) {
    if (thisDate.format('DD') === nowDate.subtract(1, 'days').format('DD')) {
      // ??????
      result = '?????? ' + thisDate.format('HH:mm');
    } else {
      result = thisDate.format('MM-DD');
    }
  } else if (parseInt(nowDate.format('H')) !== parseInt(thisDate.format('H'))) {
    if (parseInt(thisDate.format('H')) < parseInt(nowDate.format('H'))) {
      // ????????????
      result = thisDate.fromNow().replace(/\s/g, '').replace('an', 1).replace('hoursago', '?????????').replace('hourago', '?????????').replace('minutesago', '?????????').replace('minuteago', '?????????');
    } else {
      result = thisDate.format('HH:mm');
    }
  } else if (parseInt(nowDate.format('m')) - parseInt(thisDate.format('m')) >= 3) {
    result = parseInt(nowDate.format('m')) - parseInt(thisDate.format('m')) + '?????????';
  } else {
    result = '??????';
  }

  return result;
}; // const _timeAgo = dateTimeStamp => {
//   // ??????????????????
//   let result = ''
//   let minute = 1000 * 60 //???????????????????????????????????????????????????????????????
//   let hour = minute * 60
//   let day = hour * 24
//   let week = day * 7
//   let halfamonth = day * 15
//   let month = day * 30
//   let now = new Date().getTime() //????????????????????????
//   let diffValue = now - dateTimeStamp //?????????
//   if (diffValue < 0) {
//     return result
//   }
//   let minC = diffValue / minute //?????????????????????????????????????????????
//   let hourC = diffValue / hour
//   let dayC = diffValue / day
//   let weekC = diffValue / week
//   let monthC = diffValue / month
//   if (monthC >= 1 && monthC <= 3) {
//     result = parseInt(monthC) + '??????'
//   } else if (weekC >= 1 && weekC <= 3) {
//     result = parseInt(weekC) + '??????'
//   } else if (dayC >= 1 && dayC <= 6) {
//     result = parseInt(dayC) + '??????'
//   } else if (hourC >= 1 && hourC <= 23) {
//     result = parseInt(hourC) + '?????????'
//   } else if (minC >= 1 && minC <= 59) {
//     result = parseInt(minC) + '?????????'
//   } else if (diffValue >= 0 && diffValue <= minute) {
//     result = '??????'
//   } else {
//     let datetime = new Date()
//     datetime.setTime(dateTimeStamp)
//     let Nyear = datetime.getFullYear()
//     let Nmonth =
//       datetime.getMonth() + 1 < 10
//         ? '0' + (datetime.getMonth() + 1)
//         : datetime.getMonth() + 1
//     let Ndate =
//       datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
//     let Nhour =
//       datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
//     let Nminute =
//       datetime.getMinutes() < 10
//         ? '0' + datetime.getMinutes()
//         : datetime.getMinutes()
//     let Nsecond =
//       datetime.getSeconds() < 10
//         ? '0' + datetime.getSeconds()
//         : datetime.getSeconds()
//     result = Nyear + '-' + Nmonth + '-' + Ndate
//   }
//   return result
// }


var _get = function _get(opt) {
  // get????????????
  return new Promise(function (resolve, reject) {
    fly.get(opt.url, opt.data || {}, {
      headers: Object.assign({}, opt.headers || {}) }).
    then(function (_ref)

    {var data = _ref.data;
      resolve(data);
    }).catch(function (e) {
      reject(e);
    });
  });
};
/**
    * ??????date????????????
    * @param {Object} date date??????
    */


var _getDateInfo = function _getDateInfo(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    min: date.getMinutes(),
    sec: date.getSeconds() };

};

var _isFromApp = function _isFromApp(scene) {
  var fromApp = [1036, 1069];
  return fromApp.indexOf(scene) >= 0;
};

module.exports = {
  formatTime: formatTime,
  _timeAgo: _timeAgo,
  _get: _get,
  _isFromApp: _isFromApp };

/***/ }),

/***/ 91:
/*!*************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/utils/fly.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {!function (e, t) {
  if (true) module.exports = t();else { var r, n; }
}(this, function () {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        i: r,
        l: !1,
        exports: {} };

      return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }

    var n = {};
    return t.m = e, t.c = n, t.i = function (e) {
      return e;
    }, t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: r });

    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 11);
  }([function (e, t, n) {
    "use strict";

    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    };
    e.exports = {
      type: function type(e) {
        return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
      },
      isObject: function isObject(e, t) {
        return t ? "object" === this.type(e) : e && "object" === (void 0 === e ? "undefined" : r(e));
      },
      isFormData: function isFormData(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      },
      trim: function trim(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
      },
      encode: function encode(e) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      },
      formatParams: function formatParams(e) {
        function t(e, r) {
          var a = s.encode,
          i = s.type(e);
          if ("array" == i) e.forEach(function (e, n) {
            t(e, r + "%5B%5D");
          });else if ("object" == i) for (var u in e) {r ? t(e[u], r + "%5B" + a(u) + "%5D") : t(e[u], a(u));} else o || (n += "&"), o = !1, n += r + "=" + a(e);
        }

        var n = "",
        o = !0,
        s = this;
        return "object" != (void 0 === e ? "undefined" : r(e)) ? e : (t(e, ""), n);
      },
      merge: function merge(e, t) {
        for (var n in t) {e.hasOwnProperty(n) ? this.isObject(t[n], 1) && this.isObject(e[n], 1) && this.merge(e[n], t[n]) : e[n] = t[n];}

        return e;
      } };

  }, function (e, t, n) {
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    function o(e) {
      return function () {
        function t() {
          r(this, t), this.requestHeaders = {}, this.readyState = 0, this.timeout = 0, this.responseURL = "", this.responseHeaders = {};
        }

        return a(t, [{
          key: "_call",
          value: function value(e) {
            this[e] && this[e].apply(this, [].splice.call(arguments, 1));
          } },
        {
          key: "_changeReadyState",
          value: function value(e) {
            this.readyState = e, this._call("onreadystatechange");
          } },
        {
          key: "open",
          value: function value(e, t) {
            if (this.method = e, t) {
              if (t = i.trim(t), 0 !== t.indexOf("http") && u) {
                var n = document.createElement("a");
                n.href = t, t = n.href;
              }
            } else t = location.href;

            this.responseURL = t, this._changeReadyState(1);
          } },
        {
          key: "send",
          value: function value(t) {
            var n = this;

            if (t = t || null, u) {
              var r = document.cookie;
              r && (this.requestHeaders.cookie = r);
            }

            var o = this;

            if (e) {
              var a = {
                method: o.method,
                url: o.responseURL,
                headers: o.requestHeaders || {},
                body: t };

              i.merge(a, o._options || {}), "GET" === a.method && (a.body = null), o._changeReadyState(3);
              var c;
              o.timeout = o.timeout || 0, o.timeout > 0 && (c = setTimeout(function () {
                3 === o.readyState && (n._call("onloadend"), o._changeReadyState(0), o._call("ontimeout"));
              }, o.timeout)), a.timeout = o.timeout, e(a, function (e) {
                function t(t) {
                  var n = e[t];
                  return delete e[t], n;
                }

                if (3 === o.readyState) {
                  clearTimeout(c), o.status = t("statusCode") - 0;
                  var n = t("responseText"),
                  r = t("statusMessage");

                  if (o.status) {
                    var a = t("headers"),
                    i = {};

                    for (var f in a) {
                      var l = a[f],
                      p = f.toLowerCase();
                      "object" === (void 0 === l ? "undefined" : s(l)) ? i[p] = l : (i[p] = i[p] || [], i[p].push(l));
                    }

                    var d = i["set-cookie"];
                    u && d && d.forEach(function (e) {
                      document.cookie = e.replace(/;\s*httpOnly/gi, "");
                    }), o.responseHeaders = i, o.statusText = r || "", o.response = o.responseText = n, o._response = e, o._changeReadyState(4), o._call("onload");
                  } else o.statusText = n, o._call("onerror", {
                    msg: r });


                  o._call("onloadend");
                }
              });
            } else console.error("Ajax require adapter");
          } },
        {
          key: "setRequestHeader",
          value: function value(e, t) {
            this.requestHeaders[i.trim(e)] = t;
          } },
        {
          key: "getResponseHeader",
          value: function value(e) {
            return (this.responseHeaders[e.toLowerCase()] || "").toString() || null;
          } },
        {
          key: "getAllResponseHeaders",
          value: function value() {
            var e = "";

            for (var t in this.responseHeaders) {e += t + ":" + this.getResponseHeader(t) + "\r\n";}

            return e || null;
          } },
        {
          key: "abort",
          value: function value(e) {
            this._changeReadyState(0), this._call("onerror", {
              msg: e }),
            this._call("onloadend");
          } }],
        [{
          key: "setAdapter",
          value: function value(t) {
            e = t;
          } }]),
        t;
      }();
    }

    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    },
    a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
    i = n(0),
    u = "undefined" != typeof document;

    e.exports = o;
  }, function (e, t, n) {
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
    s = n(0),
    a = "undefined" != typeof document,
    i = function () {
      function e(t) {
        function n(e) {
          function t() {
            e.p = n = r = null;
          }

          var n, r;
          s.merge(e, {
            lock: function lock() {
              n || (e.p = new Promise(function (e, t) {
                n = e, r = t;
              }));
            },
            unlock: function unlock() {
              n && (n(), t());
            },
            clear: function clear() {
              r && (r("cancel"), t());
            } });

        }

        r(this, e), this.engine = t || XMLHttpRequest, this.default = this;
        var o = this.interceptors = {
          response: {
            use: function use(e, t) {
              this.handler = e, this.onerror = t;
            } },

          request: {
            use: function use(e) {
              this.handler = e;
            } } },


        a = o.request;
        n(o.response), n(a), this.config = {
          method: "GET",
          baseURL: "",
          headers: {},
          timeout: 0,
          params: {},
          parseJson: !0,
          withCredentials: !1 };

      }

      return o(e, [{
        key: "request",
        value: function value(e, t, n) {
          var r = this,
          o = new this.engine(),
          i = "Content-Type",
          u = i.toLowerCase(),
          c = this.interceptors,
          f = c.request,
          l = c.response,
          p = f.handler,
          d = new Promise(function (c, d) {
            function h(e) {
              return e && e.then && e.catch;
            }

            function m(e, t) {
              e ? e.then(function () {
                t();
              }) : t();
            }

            function y(n) {
              function r(e, t, r) {
                m(l.p, function () {
                  if (e) {
                    r && (t.request = n);
                    var o = e.call(l, t, Promise);
                    t = void 0 === o ? t : o;
                  }

                  h(t) || (t = Promise[0 === r ? "resolve" : "reject"](t)), t.then(function (e) {
                    c(e);
                  }).catch(function (e) {
                    d(e);
                  });
                });
              }

              function f(e) {
                e.engine = o, r(l.onerror, e, -1);
              }

              function p(e, t) {
                this.message = e, this.status = t;
              }

              t = n.body, e = s.trim(n.url);
              var y = s.trim(n.baseURL || "");

              if (e || !a || y || (e = location.href), 0 !== e.indexOf("http")) {
                var v = "/" === e[0];

                if (!y && a) {
                  var g = location.pathname.split("/");
                  g.pop(), y = location.protocol + "//" + location.host + (v ? "" : g.join("/"));
                }

                if ("/" !== y[y.length - 1] && (y += "/"), e = y + (v ? e.substr(1) : e), a) {
                  var b = document.createElement("a");
                  b.href = e, e = b.href;
                }
              }

              var x = s.trim(n.responseType || ""),
              w = "GET" === n.method,
              j = s.type(t),
              S = n.params || {};
              w && "object" === j && (S = s.merge(t, S)), S = s.formatParams(S);
              var k = [];
              S && k.push(S), w && t && "string" === j && k.push(t), k.length > 0 && (e += (-1 === e.indexOf("?") ? "?" : "&") + k.join("&")), o.open(n.method, e);

              try {
                o.withCredentials = !!n.withCredentials, o.timeout = n.timeout || 0, "stream" !== x && (o.responseType = x);
              } catch (e) {}

              var R = n.headers[i] || n.headers[u],
              T = "application/x-www-form-urlencoded";
              s.trim((R || "").toLowerCase()) === T ? t = s.formatParams(t) : s.isFormData(t) || -1 === ["object", "array"].indexOf(s.type(t)) || (T = "application/json;charset=utf-8", t = JSON.stringify(t)), R || (n.headers[i] = T);

              for (var _ in n.headers) {if (_ === i && s.isFormData(t)) delete n.headers[_];else try {
                  o.setRequestHeader(_, n.headers[_]);
                } catch (e) {}}

              o.onload = function () {
                var e = o.response || o.responseText;
                e && n.parseJson && -1 !== (o.getResponseHeader(i) || "").indexOf("json") && !s.isObject(e) && (e = JSON.parse(e));
                var t = o.responseHeaders;

                if (!t) {
                  t = {};
                  var a = (o.getAllResponseHeaders() || "").split("\r\n");
                  a.pop(), a.forEach(function (e) {
                    if (e) {
                      var n = e.split(":")[0];
                      t[n] = o.getResponseHeader(n);
                    }
                  });
                }

                var u = o.status,
                c = o.statusText,
                d = {
                  data: e,
                  headers: t,
                  status: u,
                  statusText: c };

                if (s.merge(d, o._response), u >= 200 && u < 300 || 304 === u) d.engine = o, d.request = n, r(l.handler, d, 0);else {
                  var h = new p(c, u);
                  h.response = d, f(h);
                }
              }, o.onerror = function (e) {
                f(new p(e.msg || "Network Error", 0));
              }, o.ontimeout = function () {
                f(new p("timeout [ " + o.timeout + "ms ]", 1));
              }, o._options = n, setTimeout(function () {
                o.send(w ? null : t);
              }, 0);
            }

            s.isObject(e) && (n = e, e = n.url), n = n || {}, n.headers = n.headers || {}, m(f.p, function () {
              s.merge(n, r.config);
              var o = n.headers;
              o[i] = o[i] || o[u] || "", delete o[u], n.body = t || n.body, e = s.trim(e || ""), n.method = n.method.toUpperCase(), n.url = e;
              var a = n;
              p && (a = p.call(f, n, Promise) || n), h(a) || (a = Promise.resolve(a)), a.then(function (e) {
                e === n ? y(e) : c(e);
              }, function (e) {
                d(e);
              });
            });
          });
          return d.engine = o, d;
        } },
      {
        key: "all",
        value: function value(e) {
          return Promise.all(e);
        } },
      {
        key: "spread",
        value: function value(e) {
          return function (t) {
            return e.apply(null, t);
          };
        } }]),
      e;
    }();

    i.default = i, ["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
      i.prototype[e] = function (t, n, r) {
        return this.request(t, n, s.merge({
          method: e },
        r));
      };
    }), ["lock", "unlock", "clear"].forEach(function (e) {
      i.prototype[e] = function () {
        this.interceptors.request[e]();
      };
    }), e.exports = i;
  },,,, function (e, t, n) {
    "use strict";

    e.exports = function (e, t) {
      var n = {
        method: e.method,
        url: e.url,
        dataType: e.dataType || void 0,
        header: e.headers,
        data: e.body || {},
        success: function success(e) {
          t({
            statusCode: e.statusCode,
            responseText: e.data,
            headers: e.header,
            statusMessage: e.errMsg });

        },
        fail: function fail(e) {
          t({
            statusCode: e.statusCode || 0,
            statusMessage: e.errMsg });

        } };

      uni.request(n);
    };
  },,,,, function (e, t, n) {
    "use strict";

    var r = n(2),
    o = n(1),
    s = n(6),
    a = o(s);

    e.exports = function (e) {
      return new r(e || a);
    };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 92:
/*!****************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/utils/moment.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {!function (e, t) {
   true ? module.exports = t() : undefined;
}(this, function () {
  "use strict";

  var e, i;

  function c() {
    return e.apply(null, arguments);
  }

  function o(e) {
    return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e);
  }

  function u(e) {
    return null != e && "[object Object]" === Object.prototype.toString.call(e);
  }

  function l(e) {
    return void 0 === e;
  }

  function d(e) {
    return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e);
  }

  function h(e) {
    return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e);
  }

  function f(e, t) {
    var n,
    s = [];

    for (n = 0; n < e.length; ++n) {s.push(t(e[n], n));}

    return s;
  }

  function m(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }

  function _(e, t) {
    for (var n in t) {m(t, n) && (e[n] = t[n]);}

    return m(t, "toString") && (e.toString = t.toString), m(t, "valueOf") && (e.valueOf = t.valueOf), e;
  }

  function y(e, t, n, s) {
    return Ot(e, t, n, s, !0).utc();
  }

  function g(e) {
    return null == e._pf && (e._pf = {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1,
      parsedDateParts: [],
      meridiem: null,
      rfc2822: !1,
      weekdayMismatch: !1 }),
    e._pf;
  }

  function p(e) {
    if (null == e._isValid) {
      var t = g(e),
      n = i.call(t.parsedDateParts, function (e) {
        return null != e;
      }),
      s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
      if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return s;
      e._isValid = s;
    }

    return e._isValid;
  }

  function v(e) {
    var t = y(NaN);
    return null != e ? _(g(t), e) : g(t).userInvalidated = !0, t;
  }

  i = Array.prototype.some ? Array.prototype.some : function (e) {
    for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++) {if (s in t && e.call(this, t[s], s, t)) return !0;}

    return !1;
  };
  var r = c.momentProperties = [];

  function w(e, t) {
    var n, s, i;
    if (l(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), l(t._i) || (e._i = t._i), l(t._f) || (e._f = t._f), l(t._l) || (e._l = t._l), l(t._strict) || (e._strict = t._strict), l(t._tzm) || (e._tzm = t._tzm), l(t._isUTC) || (e._isUTC = t._isUTC), l(t._offset) || (e._offset = t._offset), l(t._pf) || (e._pf = g(t)), l(t._locale) || (e._locale = t._locale), 0 < r.length) for (n = 0; n < r.length; n++) {l(i = t[s = r[n]]) || (e[s] = i);}
    return e;
  }

  var t = !1;

  function M(e) {
    w(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === t && (t = !0, c.updateOffset(this), t = !1);
  }

  function S(e) {
    return e instanceof M || null != e && null != e._isAMomentObject;
  }

  function D(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }

  function k(e) {
    var t = +e,
    n = 0;
    return 0 !== t && isFinite(t) && (n = D(t)), n;
  }

  function a(e, t, n) {
    var s,
    i = Math.min(e.length, t.length),
    r = Math.abs(e.length - t.length),
    a = 0;

    for (s = 0; s < i; s++) {(n && e[s] !== t[s] || !n && k(e[s]) !== k(t[s])) && a++;}

    return a + r;
  }

  function Y(e) {
    !1 === c.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
  }

  function n(i, r) {
    var a = !0;
    return _(function () {
      if (null != c.deprecationHandler && c.deprecationHandler(null, i), a) {
        for (var e, t = [], n = 0; n < arguments.length; n++) {
          if (e = "", "object" == typeof arguments[n]) {
            for (var s in e += "\n[" + n + "] ", arguments[0]) {e += s + ": " + arguments[0][s] + ", ";}

            e = e.slice(0, -2);
          } else e = arguments[n];

          t.push(e);
        }

        Y(i + "\nArguments: " + Array.prototype.slice.call(t).join("") + "\n" + new Error().stack), a = !1;
      }

      return r.apply(this, arguments);
    }, r);
  }

  var s,
  O = {};

  function T(e, t) {
    null != c.deprecationHandler && c.deprecationHandler(e, t), O[e] || (Y(t), O[e] = !0);
  }

  function x(e) {
    return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e);
  }

  function b(e, t) {
    var n,
    s = _({}, e);

    for (n in t) {m(t, n) && (u(e[n]) && u(t[n]) ? (s[n] = {}, _(s[n], e[n]), _(s[n], t[n])) : null != t[n] ? s[n] = t[n] : delete s[n]);}

    for (n in e) {m(e, n) && !m(t, n) && u(e[n]) && (s[n] = _({}, s[n]));}

    return s;
  }

  function P(e) {
    null != e && this.set(e);
  }

  c.suppressDeprecationWarnings = !1, c.deprecationHandler = null, s = Object.keys ? Object.keys : function (e) {
    var t,
    n = [];

    for (t in e) {m(e, t) && n.push(t);}

    return n;
  };
  var W = {};

  function H(e, t) {
    var n = e.toLowerCase();
    W[n] = W[n + "s"] = W[t] = e;
  }

  function R(e) {
    return "string" == typeof e ? W[e] || W[e.toLowerCase()] : void 0;
  }

  function C(e) {
    var t,
    n,
    s = {};

    for (n in e) {m(e, n) && (t = R(n)) && (s[t] = e[n]);}

    return s;
  }

  var F = {};

  function L(e, t) {
    F[e] = t;
  }

  function U(e, t, n) {
    var s = "" + Math.abs(e),
    i = t - s.length;
    return (0 <= e ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + s;
  }

  var N = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
  G = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
  V = {},
  E = {};

  function I(e, t, n, s) {
    var i = s;
    "string" == typeof s && (i = function i() {
      return this[s]();
    }), e && (E[e] = i), t && (E[t[0]] = function () {
      return U(i.apply(this, arguments), t[1], t[2]);
    }), n && (E[n] = function () {
      return this.localeData().ordinal(i.apply(this, arguments), e);
    });
  }

  function A(e, t) {
    return e.isValid() ? (t = j(t, e.localeData()), V[t] = V[t] || function (s) {
      var e,
      i,
      t,
      r = s.match(N);

      for (e = 0, i = r.length; e < i; e++) {E[r[e]] ? r[e] = E[r[e]] : r[e] = (t = r[e]).match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");}

      return function (e) {
        var t,
        n = "";

        for (t = 0; t < i; t++) {n += x(r[t]) ? r[t].call(e, s) : r[t];}

        return n;
      };
    }(t), V[t](e)) : e.localeData().invalidDate();
  }

  function j(e, t) {
    var n = 5;

    function s(e) {
      return t.longDateFormat(e) || e;
    }

    for (G.lastIndex = 0; 0 <= n && G.test(e);) {e = e.replace(G, s), G.lastIndex = 0, n -= 1;}

    return e;
  }

  var Z = /\d/,
  z = /\d\d/,
  $ = /\d{3}/,
  q = /\d{4}/,
  J = /[+-]?\d{6}/,
  B = /\d\d?/,
  Q = /\d\d\d\d?/,
  X = /\d\d\d\d\d\d?/,
  K = /\d{1,3}/,
  ee = /\d{1,4}/,
  te = /[+-]?\d{1,6}/,
  ne = /\d+/,
  se = /[+-]?\d+/,
  ie = /Z|[+-]\d\d:?\d\d/gi,
  re = /Z|[+-]\d\d(?::?\d\d)?/gi,
  ae = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
  oe = {};

  function ue(e, n, s) {
    oe[e] = x(n) ? n : function (e, t) {
      return e && s ? s : n;
    };
  }

  function le(e, t) {
    return m(oe, e) ? oe[e](t._strict, t._locale) : new RegExp(de(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, n, s, i) {
      return t || n || s || i;
    })));
  }

  function de(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  var he = {};

  function ce(e, n) {
    var t,
    s = n;

    for ("string" == typeof e && (e = [e]), d(n) && (s = function s(e, t) {
      t[n] = k(e);
    }), t = 0; t < e.length; t++) {he[e[t]] = s;}
  }

  function fe(e, i) {
    ce(e, function (e, t, n, s) {
      n._w = n._w || {}, i(e, n._w, n, s);
    });
  }

  var me = 0,
  _e = 1,
  ye = 2,
  ge = 3,
  pe = 4,
  ve = 5,
  we = 6,
  Me = 7,
  Se = 8;

  function De(e) {
    return ke(e) ? 366 : 365;
  }

  function ke(e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
  }

  I("Y", 0, 0, function () {
    var e = this.year();
    return e <= 9999 ? "" + e : "+" + e;
  }), I(0, ["YY", 2], 0, function () {
    return this.year() % 100;
  }), I(0, ["YYYY", 4], 0, "year"), I(0, ["YYYYY", 5], 0, "year"), I(0, ["YYYYYY", 6, !0], 0, "year"), H("year", "y"), L("year", 1), ue("Y", se), ue("YY", B, z), ue("YYYY", ee, q), ue("YYYYY", te, J), ue("YYYYYY", te, J), ce(["YYYYY", "YYYYYY"], me), ce("YYYY", function (e, t) {
    t[me] = 2 === e.length ? c.parseTwoDigitYear(e) : k(e);
  }), ce("YY", function (e, t) {
    t[me] = c.parseTwoDigitYear(e);
  }), ce("Y", function (e, t) {
    t[me] = parseInt(e, 10);
  }), c.parseTwoDigitYear = function (e) {
    return k(e) + (68 < k(e) ? 1900 : 2e3);
  };
  var Ye,
  Oe = Te("FullYear", !0);

  function Te(t, n) {
    return function (e) {
      return null != e ? (be(this, t, e), c.updateOffset(this, n), this) : xe(this, t);
    };
  }

  function xe(e, t) {
    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }

  function be(e, t, n) {
    e.isValid() && !isNaN(n) && ("FullYear" === t && ke(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), Pe(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
  }

  function Pe(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;
    var n,
    s = (t % (n = 12) + n) % n;
    return e += (t - s) / 12, 1 === s ? ke(e) ? 29 : 28 : 31 - s % 7 % 2;
  }

  Ye = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) {
    var t;

    for (t = 0; t < this.length; ++t) {if (this[t] === e) return t;}

    return -1;
  }, I("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }), I("MMM", 0, 0, function (e) {
    return this.localeData().monthsShort(this, e);
  }), I("MMMM", 0, 0, function (e) {
    return this.localeData().months(this, e);
  }), H("month", "M"), L("month", 8), ue("M", B), ue("MM", B, z), ue("MMM", function (e, t) {
    return t.monthsShortRegex(e);
  }), ue("MMMM", function (e, t) {
    return t.monthsRegex(e);
  }), ce(["M", "MM"], function (e, t) {
    t[_e] = k(e) - 1;
  }), ce(["MMM", "MMMM"], function (e, t, n, s) {
    var i = n._locale.monthsParse(e, s, n._strict);

    null != i ? t[_e] = i : g(n).invalidMonth = e;
  });
  var We = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
  He = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
  var Re = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

  function Ce(e, t) {
    var n;
    if (!e.isValid()) return e;
    if ("string" == typeof t) if (/^\d+$/.test(t)) t = k(t);else if (!d(t = e.localeData().monthsParse(t))) return e;
    return n = Math.min(e.date(), Pe(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e;
  }

  function Fe(e) {
    return null != e ? (Ce(this, e), c.updateOffset(this, !0), this) : xe(this, "Month");
  }

  var Le = ae;
  var Ue = ae;

  function Ne() {
    function e(e, t) {
      return t.length - e.length;
    }

    var t,
    n,
    s = [],
    i = [],
    r = [];

    for (t = 0; t < 12; t++) {n = y([2e3, t]), s.push(this.monthsShort(n, "")), i.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, ""));}

    for (s.sort(e), i.sort(e), r.sort(e), t = 0; t < 12; t++) {s[t] = de(s[t]), i[t] = de(i[t]);}

    for (t = 0; t < 24; t++) {r[t] = de(r[t]);}

    this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i");
  }

  function Ge(e) {
    var t = new Date(Date.UTC.apply(null, arguments));
    return e < 100 && 0 <= e && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e), t;
  }

  function Ve(e, t, n) {
    var s = 7 + t - n;
    return -((7 + Ge(e, 0, s).getUTCDay() - t) % 7) + s - 1;
  }

  function Ee(e, t, n, s, i) {
    var r,
    a,
    o = 1 + 7 * (t - 1) + (7 + n - s) % 7 + Ve(e, s, i);
    return a = o <= 0 ? De(r = e - 1) + o : o > De(e) ? (r = e + 1, o - De(e)) : (r = e, o), {
      year: r,
      dayOfYear: a };

  }

  function Ie(e, t, n) {
    var s,
    i,
    r = Ve(e.year(), t, n),
    a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
    return a < 1 ? s = a + Ae(i = e.year() - 1, t, n) : a > Ae(e.year(), t, n) ? (s = a - Ae(e.year(), t, n), i = e.year() + 1) : (i = e.year(), s = a), {
      week: s,
      year: i };

  }

  function Ae(e, t, n) {
    var s = Ve(e, t, n),
    i = Ve(e + 1, t, n);
    return (De(e) - s + i) / 7;
  }

  I("w", ["ww", 2], "wo", "week"), I("W", ["WW", 2], "Wo", "isoWeek"), H("week", "w"), H("isoWeek", "W"), L("week", 5), L("isoWeek", 5), ue("w", B), ue("ww", B, z), ue("W", B), ue("WW", B, z), fe(["w", "ww", "W", "WW"], function (e, t, n, s) {
    t[s.substr(0, 1)] = k(e);
  });
  I("d", 0, "do", "day"), I("dd", 0, 0, function (e) {
    return this.localeData().weekdaysMin(this, e);
  }), I("ddd", 0, 0, function (e) {
    return this.localeData().weekdaysShort(this, e);
  }), I("dddd", 0, 0, function (e) {
    return this.localeData().weekdays(this, e);
  }), I("e", 0, 0, "weekday"), I("E", 0, 0, "isoWeekday"), H("day", "d"), H("weekday", "e"), H("isoWeekday", "E"), L("day", 11), L("weekday", 11), L("isoWeekday", 11), ue("d", B), ue("e", B), ue("E", B), ue("dd", function (e, t) {
    return t.weekdaysMinRegex(e);
  }), ue("ddd", function (e, t) {
    return t.weekdaysShortRegex(e);
  }), ue("dddd", function (e, t) {
    return t.weekdaysRegex(e);
  }), fe(["dd", "ddd", "dddd"], function (e, t, n, s) {
    var i = n._locale.weekdaysParse(e, s, n._strict);

    null != i ? t.d = i : g(n).invalidWeekday = e;
  }), fe(["d", "e", "E"], function (e, t, n, s) {
    t[s] = k(e);
  });
  var je = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
  var Ze = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
  var ze = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
  var $e = ae;
  var qe = ae;
  var Je = ae;

  function Be() {
    function e(e, t) {
      return t.length - e.length;
    }

    var t,
    n,
    s,
    i,
    r,
    a = [],
    o = [],
    u = [],
    l = [];

    for (t = 0; t < 7; t++) {n = y([2e3, 1]).day(t), s = this.weekdaysMin(n, ""), i = this.weekdaysShort(n, ""), r = this.weekdays(n, ""), a.push(s), o.push(i), u.push(r), l.push(s), l.push(i), l.push(r);}

    for (a.sort(e), o.sort(e), u.sort(e), l.sort(e), t = 0; t < 7; t++) {o[t] = de(o[t]), u[t] = de(u[t]), l[t] = de(l[t]);}

    this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i");
  }

  function Qe() {
    return this.hours() % 12 || 12;
  }

  function Xe(e, t) {
    I(e, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
  }

  function Ke(e, t) {
    return t._meridiemParse;
  }

  I("H", ["HH", 2], 0, "hour"), I("h", ["hh", 2], 0, Qe), I("k", ["kk", 2], 0, function () {
    return this.hours() || 24;
  }), I("hmm", 0, 0, function () {
    return "" + Qe.apply(this) + U(this.minutes(), 2);
  }), I("hmmss", 0, 0, function () {
    return "" + Qe.apply(this) + U(this.minutes(), 2) + U(this.seconds(), 2);
  }), I("Hmm", 0, 0, function () {
    return "" + this.hours() + U(this.minutes(), 2);
  }), I("Hmmss", 0, 0, function () {
    return "" + this.hours() + U(this.minutes(), 2) + U(this.seconds(), 2);
  }), Xe("a", !0), Xe("A", !1), H("hour", "h"), L("hour", 13), ue("a", Ke), ue("A", Ke), ue("H", B), ue("h", B), ue("k", B), ue("HH", B, z), ue("hh", B, z), ue("kk", B, z), ue("hmm", Q), ue("hmmss", X), ue("Hmm", Q), ue("Hmmss", X), ce(["H", "HH"], ge), ce(["k", "kk"], function (e, t, n) {
    var s = k(e);
    t[ge] = 24 === s ? 0 : s;
  }), ce(["a", "A"], function (e, t, n) {
    n._isPm = n._locale.isPM(e), n._meridiem = e;
  }), ce(["h", "hh"], function (e, t, n) {
    t[ge] = k(e), g(n).bigHour = !0;
  }), ce("hmm", function (e, t, n) {
    var s = e.length - 2;
    t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s)), g(n).bigHour = !0;
  }), ce("hmmss", function (e, t, n) {
    var s = e.length - 4,
    i = e.length - 2;
    t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s, 2)), t[ve] = k(e.substr(i)), g(n).bigHour = !0;
  }), ce("Hmm", function (e, t, n) {
    var s = e.length - 2;
    t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s));
  }), ce("Hmmss", function (e, t, n) {
    var s = e.length - 4,
    i = e.length - 2;
    t[ge] = k(e.substr(0, s)), t[pe] = k(e.substr(s, 2)), t[ve] = k(e.substr(i));
  });
  var et,
  tt = Te("Hours", !0),
  nt = {
    calendar: {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L" },

    longDateFormat: {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A" },

    invalidDate: "Invalid date",
    ordinal: "%d",
    dayOfMonthOrdinalParse: /\d{1,2}/,
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years" },

    months: He,
    monthsShort: Re,
    week: {
      dow: 0,
      doy: 6 },

    weekdays: je,
    weekdaysMin: ze,
    weekdaysShort: Ze,
    meridiemParse: /[ap]\.?m?\.?/i },

  st = {},
  it = {};

  function rt(e) {
    return e ? e.toLowerCase().replace("_", "-") : e;
  }

  function at(e) {
    var t = null;
    if (!st[e] && "undefined" != typeof module && module && module.exports) try {
      t = et._abbr, !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), ot(t);
    } catch (e) {}
    return st[e];
  }

  function ot(e, t) {
    var n;
    return e && ((n = l(t) ? lt(e) : ut(e, t)) ? et = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), et._abbr;
  }

  function ut(e, t) {
    if (null === t) return delete st[e], null;
    var n,
    s = nt;
    if (t.abbr = e, null != st[e]) T("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), s = st[e]._config;else if (null != t.parentLocale) if (null != st[t.parentLocale]) s = st[t.parentLocale]._config;else {
      if (null == (n = at(t.parentLocale))) return it[t.parentLocale] || (it[t.parentLocale] = []), it[t.parentLocale].push({
        name: e,
        config: t }),
      null;
      s = n._config;
    }
    return st[e] = new P(b(s, t)), it[e] && it[e].forEach(function (e) {
      ut(e.name, e.config);
    }), ot(e), st[e];
  }

  function lt(e) {
    var t;
    if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return et;

    if (!o(e)) {
      if (t = at(e)) return t;
      e = [e];
    }

    return function (e) {
      for (var t, n, s, i, r = 0; r < e.length;) {
        for (t = (i = rt(e[r]).split("-")).length, n = (n = rt(e[r + 1])) ? n.split("-") : null; 0 < t;) {
          if (s = at(i.slice(0, t).join("-"))) return s;
          if (n && n.length >= t && a(i, n, !0) >= t - 1) break;
          t--;
        }

        r++;
      }

      return et;
    }(e);
  }

  function dt(e) {
    var t,
    n = e._a;
    return n && -2 === g(e).overflow && (t = n[_e] < 0 || 11 < n[_e] ? _e : n[ye] < 1 || n[ye] > Pe(n[me], n[_e]) ? ye : n[ge] < 0 || 24 < n[ge] || 24 === n[ge] && (0 !== n[pe] || 0 !== n[ve] || 0 !== n[we]) ? ge : n[pe] < 0 || 59 < n[pe] ? pe : n[ve] < 0 || 59 < n[ve] ? ve : n[we] < 0 || 999 < n[we] ? we : -1, g(e)._overflowDayOfYear && (t < me || ye < t) && (t = ye), g(e)._overflowWeeks && -1 === t && (t = Me), g(e)._overflowWeekday && -1 === t && (t = Se), g(e).overflow = t), e;
  }

  function ht(e, t, n) {
    return null != e ? e : null != t ? t : n;
  }

  function ct(e) {
    var t,
    n,
    s,
    i,
    r,
    a = [];

    if (!e._d) {
      var o, u;

      for (o = e, u = new Date(c.now()), s = o._useUTC ? [u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate()] : [u.getFullYear(), u.getMonth(), u.getDate()], e._w && null == e._a[ye] && null == e._a[_e] && function (e) {
        var t, n, s, i, r, a, o, u;
        if (null != (t = e._w).GG || null != t.W || null != t.E) r = 1, a = 4, n = ht(t.GG, e._a[me], Ie(Tt(), 1, 4).year), s = ht(t.W, 1), ((i = ht(t.E, 1)) < 1 || 7 < i) && (u = !0);else {
          r = e._locale._week.dow, a = e._locale._week.doy;
          var l = Ie(Tt(), r, a);
          n = ht(t.gg, e._a[me], l.year), s = ht(t.w, l.week), null != t.d ? ((i = t.d) < 0 || 6 < i) && (u = !0) : null != t.e ? (i = t.e + r, (t.e < 0 || 6 < t.e) && (u = !0)) : i = r;
        }
        s < 1 || s > Ae(n, r, a) ? g(e)._overflowWeeks = !0 : null != u ? g(e)._overflowWeekday = !0 : (o = Ee(n, s, i, r, a), e._a[me] = o.year, e._dayOfYear = o.dayOfYear);
      }(e), null != e._dayOfYear && (r = ht(e._a[me], s[me]), (e._dayOfYear > De(r) || 0 === e._dayOfYear) && (g(e)._overflowDayOfYear = !0), n = Ge(r, 0, e._dayOfYear), e._a[_e] = n.getUTCMonth(), e._a[ye] = n.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) {e._a[t] = a[t] = s[t];}

      for (; t < 7; t++) {e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];}

      24 === e._a[ge] && 0 === e._a[pe] && 0 === e._a[ve] && 0 === e._a[we] && (e._nextDay = !0, e._a[ge] = 0), e._d = (e._useUTC ? Ge : function (e, t, n, s, i, r, a) {
        var o = new Date(e, t, n, s, i, r, a);
        return e < 100 && 0 <= e && isFinite(o.getFullYear()) && o.setFullYear(e), o;
      }).apply(null, a), i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[ge] = 24), e._w && void 0 !== e._w.d && e._w.d !== i && (g(e).weekdayMismatch = !0);
    }
  }

  var ft = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  mt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  _t = /Z|[+-]\d\d(?::?\d\d)?/,
  yt = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
  gt = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
  pt = /^\/?Date\((\-?\d+)/i;

  function vt(e) {
    var t,
    n,
    s,
    i,
    r,
    a,
    o = e._i,
    u = ft.exec(o) || mt.exec(o);

    if (u) {
      for (g(e).iso = !0, t = 0, n = yt.length; t < n; t++) {if (yt[t][1].exec(u[1])) {
          i = yt[t][0], s = !1 !== yt[t][2];
          break;
        }}

      if (null == i) return void (e._isValid = !1);

      if (u[3]) {
        for (t = 0, n = gt.length; t < n; t++) {if (gt[t][1].exec(u[3])) {
            r = (u[2] || " ") + gt[t][0];
            break;
          }}

        if (null == r) return void (e._isValid = !1);
      }

      if (!s && null != r) return void (e._isValid = !1);

      if (u[4]) {
        if (!_t.exec(u[4])) return void (e._isValid = !1);
        a = "Z";
      }

      e._f = i + (r || "") + (a || ""), kt(e);
    } else e._isValid = !1;
  }

  var wt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

  function Mt(e, t, n, s, i, r) {
    var a = [function (e) {
      var t = parseInt(e, 10);
      {
        if (t <= 49) return 2e3 + t;
        if (t <= 999) return 1900 + t;
      }
      return t;
    }(e), Re.indexOf(t), parseInt(n, 10), parseInt(s, 10), parseInt(i, 10)];
    return r && a.push(parseInt(r, 10)), a;
  }

  var St = {
    UT: 0,
    GMT: 0,
    EDT: -240,
    EST: -300,
    CDT: -300,
    CST: -360,
    MDT: -360,
    MST: -420,
    PDT: -420,
    PST: -480 };


  function Dt(e) {
    var t,
    n,
    s,
    i = wt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));

    if (i) {
      var r = Mt(i[4], i[3], i[2], i[5], i[6], i[7]);
      if (t = i[1], n = r, s = e, t && Ze.indexOf(t) !== new Date(n[0], n[1], n[2]).getDay() && (g(s).weekdayMismatch = !0, !(s._isValid = !1))) return;
      e._a = r, e._tzm = function (e, t, n) {
        if (e) return St[e];
        if (t) return 0;
        var s = parseInt(n, 10),
        i = s % 100;
        return (s - i) / 100 * 60 + i;
      }(i[8], i[9], i[10]), e._d = Ge.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), g(e).rfc2822 = !0;
    } else e._isValid = !1;
  }

  function kt(e) {
    if (e._f !== c.ISO_8601) {
      if (e._f !== c.RFC_2822) {
        e._a = [], g(e).empty = !0;
        var t,
        n,
        s,
        i,
        r,
        a,
        o,
        u,
        l = "" + e._i,
        d = l.length,
        h = 0;

        for (s = j(e._f, e._locale).match(N) || [], t = 0; t < s.length; t++) {i = s[t], (n = (l.match(le(i, e)) || [])[0]) && (0 < (r = l.substr(0, l.indexOf(n))).length && g(e).unusedInput.push(r), l = l.slice(l.indexOf(n) + n.length), h += n.length), E[i] ? (n ? g(e).empty = !1 : g(e).unusedTokens.push(i), a = i, u = e, null != (o = n) && m(he, a) && he[a](o, u._a, u, a)) : e._strict && !n && g(e).unusedTokens.push(i);}

        g(e).charsLeftOver = d - h, 0 < l.length && g(e).unusedInput.push(l), e._a[ge] <= 12 && !0 === g(e).bigHour && 0 < e._a[ge] && (g(e).bigHour = void 0), g(e).parsedDateParts = e._a.slice(0), g(e).meridiem = e._meridiem, e._a[ge] = function (e, t, n) {
          var s;
          if (null == n) return t;
          return null != e.meridiemHour ? e.meridiemHour(t, n) : (null != e.isPM && ((s = e.isPM(n)) && t < 12 && (t += 12), s || 12 !== t || (t = 0)), t);
        }(e._locale, e._a[ge], e._meridiem), ct(e), dt(e);
      } else Dt(e);
    } else vt(e);
  }

  function Yt(e) {
    var t,
    n,
    s,
    i,
    r = e._i,
    a = e._f;
    return e._locale = e._locale || lt(e._l), null === r || void 0 === a && "" === r ? v({
      nullInput: !0 }) : (
    "string" == typeof r && (e._i = r = e._locale.preparse(r)), S(r) ? new M(dt(r)) : (h(r) ? e._d = r : o(a) ? function (e) {
      var t, n, s, i, r;
      if (0 === e._f.length) return g(e).invalidFormat = !0, e._d = new Date(NaN);

      for (i = 0; i < e._f.length; i++) {r = 0, t = w({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[i], kt(t), p(t) && (r += g(t).charsLeftOver, r += 10 * g(t).unusedTokens.length, g(t).score = r, (null == s || r < s) && (s = r, n = t));}

      _(e, n || t);
    }(e) : a ? kt(e) : l(n = (t = e)._i) ? t._d = new Date(c.now()) : h(n) ? t._d = new Date(n.valueOf()) : "string" == typeof n ? (s = t, null === (i = pt.exec(s._i)) ? (vt(s), !1 === s._isValid && (delete s._isValid, Dt(s), !1 === s._isValid && (delete s._isValid, c.createFromInputFallback(s)))) : s._d = new Date(+i[1])) : o(n) ? (t._a = f(n.slice(0), function (e) {
      return parseInt(e, 10);
    }), ct(t)) : u(n) ? function (e) {
      if (!e._d) {
        var t = C(e._i);
        e._a = f([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function (e) {
          return e && parseInt(e, 10);
        }), ct(e);
      }
    }(t) : d(n) ? t._d = new Date(n) : c.createFromInputFallback(t), p(e) || (e._d = null), e));
  }

  function Ot(e, t, n, s, i) {
    var r,
    a = {};
    return !0 !== n && !1 !== n || (s = n, n = void 0), (u(e) && function (e) {
      if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
      var t;

      for (t in e) {if (e.hasOwnProperty(t)) return !1;}

      return !0;
    }(e) || o(e) && 0 === e.length) && (e = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, a._l = n, a._i = e, a._f = t, a._strict = s, (r = new M(dt(Yt(a))))._nextDay && (r.add(1, "d"), r._nextDay = void 0), r;
  }

  function Tt(e, t, n, s) {
    return Ot(e, t, n, s, !1);
  }

  c.createFromInputFallback = n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
  }), c.ISO_8601 = function () {}, c.RFC_2822 = function () {};
  var xt = n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var e = Tt.apply(null, arguments);
    return this.isValid() && e.isValid() ? e < this ? this : e : v();
  }),
  bt = n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var e = Tt.apply(null, arguments);
    return this.isValid() && e.isValid() ? this < e ? this : e : v();
  });

  function Pt(e, t) {
    var n, s;
    if (1 === t.length && o(t[0]) && (t = t[0]), !t.length) return Tt();

    for (n = t[0], s = 1; s < t.length; ++s) {t[s].isValid() && !t[s][e](n) || (n = t[s]);}

    return n;
  }

  var Wt = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

  function Ht(e) {
    var t = C(e),
    n = t.year || 0,
    s = t.quarter || 0,
    i = t.month || 0,
    r = t.week || t.isoWeek || 0,
    a = t.day || 0,
    o = t.hour || 0,
    u = t.minute || 0,
    l = t.second || 0,
    d = t.millisecond || 0;
    this._isValid = function (e) {
      for (var t in e) {if (-1 === Ye.call(Wt, t) || null != e[t] && isNaN(e[t])) return !1;}

      for (var n = !1, s = 0; s < Wt.length; ++s) {if (e[Wt[s]]) {
          if (n) return !1;
          parseFloat(e[Wt[s]]) !== k(e[Wt[s]]) && (n = !0);
        }}

      return !0;
    }(t), this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60, this._days = +a + 7 * r, this._months = +i + 3 * s + 12 * n, this._data = {}, this._locale = lt(), this._bubble();
  }

  function Rt(e) {
    return e instanceof Ht;
  }

  function Ct(e) {
    return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
  }

  function Ft(e, n) {
    I(e, 0, 0, function () {
      var e = this.utcOffset(),
      t = "+";
      return e < 0 && (e = -e, t = "-"), t + U(~~(e / 60), 2) + n + U(~~e % 60, 2);
    });
  }

  Ft("Z", ":"), Ft("ZZ", ""), ue("Z", re), ue("ZZ", re), ce(["Z", "ZZ"], function (e, t, n) {
    n._useUTC = !0, n._tzm = Ut(re, e);
  });
  var Lt = /([\+\-]|\d\d)/gi;

  function Ut(e, t) {
    var n = (t || "").match(e);
    if (null === n) return null;
    var s = ((n[n.length - 1] || []) + "").match(Lt) || ["-", 0, 0],
    i = 60 * s[1] + k(s[2]);
    return 0 === i ? 0 : "+" === s[0] ? i : -i;
  }

  function Nt(e, t) {
    var n, s;
    return t._isUTC ? (n = t.clone(), s = (S(e) || h(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + s), c.updateOffset(n, !1), n) : Tt(e).local();
  }

  function Gt(e) {
    return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
  }

  function Vt() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }

  c.updateOffset = function () {};

  var Et = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
  It = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function At(e, t) {
    var n,
    s,
    i,
    r = e,
    a = null;
    return Rt(e) ? r = {
      ms: e._milliseconds,
      d: e._days,
      M: e._months } :
    d(e) ? (r = {}, t ? r[t] = e : r.milliseconds = e) : (a = Et.exec(e)) ? (n = "-" === a[1] ? -1 : 1, r = {
      y: 0,
      d: k(a[ye]) * n,
      h: k(a[ge]) * n,
      m: k(a[pe]) * n,
      s: k(a[ve]) * n,
      ms: k(Ct(1e3 * a[we])) * n }) :
    (a = It.exec(e)) ? (n = "-" === a[1] ? -1 : 1, r = {
      y: jt(a[2], n),
      M: jt(a[3], n),
      w: jt(a[4], n),
      d: jt(a[5], n),
      h: jt(a[6], n),
      m: jt(a[7], n),
      s: jt(a[8], n) }) :
    null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (i = function (e, t) {
      var n;
      if (!e.isValid() || !t.isValid()) return {
        milliseconds: 0,
        months: 0 };

      t = Nt(t, e), e.isBefore(t) ? n = Zt(e, t) : ((n = Zt(t, e)).milliseconds = -n.milliseconds, n.months = -n.months);
      return n;
    }(Tt(r.from), Tt(r.to)), (r = {}).ms = i.milliseconds, r.M = i.months), s = new Ht(r), Rt(e) && m(e, "_locale") && (s._locale = e._locale), s;
  }

  function jt(e, t) {
    var n = e && parseFloat(e.replace(",", "."));
    return (isNaN(n) ? 0 : n) * t;
  }

  function Zt(e, t) {
    var n = {
      milliseconds: 0,
      months: 0 };

    return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, n.milliseconds = +t - +e.clone().add(n.months, "M"), n;
  }

  function zt(s, i) {
    return function (e, t) {
      var n;
      return null === t || isNaN(+t) || (T(i, "moment()." + i + "(period, number) is deprecated. Please use moment()." + i + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n = e, e = t, t = n), $t(this, At(e = "string" == typeof e ? +e : e, t), s), this;
    };
  }

  function $t(e, t, n, s) {
    var i = t._milliseconds,
    r = Ct(t._days),
    a = Ct(t._months);
    e.isValid() && (s = null == s || s, a && Ce(e, xe(e, "Month") + a * n), r && be(e, "Date", xe(e, "Date") + r * n), i && e._d.setTime(e._d.valueOf() + i * n), s && c.updateOffset(e, r || a));
  }

  At.fn = Ht.prototype, At.invalid = function () {
    return At(NaN);
  };
  var qt = zt(1, "add"),
  Jt = zt(-1, "subtract");

  function Bt(e, t) {
    var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
    s = e.clone().add(n, "months");
    return -(n + (t - s < 0 ? (t - s) / (s - e.clone().add(n - 1, "months")) : (t - s) / (e.clone().add(n + 1, "months") - s))) || 0;
  }

  function Qt(e) {
    var t;
    return void 0 === e ? this._locale._abbr : (null != (t = lt(e)) && (this._locale = t), this);
  }

  c.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", c.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  var Xt = n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
    return void 0 === e ? this.localeData() : this.locale(e);
  });

  function Kt() {
    return this._locale;
  }

  function en(e, t) {
    I(0, [e, e.length], 0, t);
  }

  function tn(e, t, n, s, i) {
    var r;
    return null == e ? Ie(this, s, i).year : ((r = Ae(e, s, i)) < t && (t = r), function (e, t, n, s, i) {
      var r = Ee(e, t, n, s, i),
      a = Ge(r.year, 0, r.dayOfYear);
      return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
    }.call(this, e, t, n, s, i));
  }

  I(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }), I(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
  }), en("gggg", "weekYear"), en("ggggg", "weekYear"), en("GGGG", "isoWeekYear"), en("GGGGG", "isoWeekYear"), H("weekYear", "gg"), H("isoWeekYear", "GG"), L("weekYear", 1), L("isoWeekYear", 1), ue("G", se), ue("g", se), ue("GG", B, z), ue("gg", B, z), ue("GGGG", ee, q), ue("gggg", ee, q), ue("GGGGG", te, J), ue("ggggg", te, J), fe(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
    t[s.substr(0, 2)] = k(e);
  }), fe(["gg", "GG"], function (e, t, n, s) {
    t[s] = c.parseTwoDigitYear(e);
  }), I("Q", 0, "Qo", "quarter"), H("quarter", "Q"), L("quarter", 7), ue("Q", Z), ce("Q", function (e, t) {
    t[_e] = 3 * (k(e) - 1);
  }), I("D", ["DD", 2], "Do", "date"), H("date", "D"), L("date", 9), ue("D", B), ue("DD", B, z), ue("Do", function (e, t) {
    return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
  }), ce(["D", "DD"], ye), ce("Do", function (e, t) {
    t[ye] = k(e.match(B)[0]);
  });
  var nn = Te("Date", !0);
  I("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), H("dayOfYear", "DDD"), L("dayOfYear", 4), ue("DDD", K), ue("DDDD", $), ce(["DDD", "DDDD"], function (e, t, n) {
    n._dayOfYear = k(e);
  }), I("m", ["mm", 2], 0, "minute"), H("minute", "m"), L("minute", 14), ue("m", B), ue("mm", B, z), ce(["m", "mm"], pe);
  var sn = Te("Minutes", !1);
  I("s", ["ss", 2], 0, "second"), H("second", "s"), L("second", 15), ue("s", B), ue("ss", B, z), ce(["s", "ss"], ve);
  var rn,
  an = Te("Seconds", !1);

  for (I("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), I(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
  }), I(0, ["SSS", 3], 0, "millisecond"), I(0, ["SSSS", 4], 0, function () {
    return 10 * this.millisecond();
  }), I(0, ["SSSSS", 5], 0, function () {
    return 100 * this.millisecond();
  }), I(0, ["SSSSSS", 6], 0, function () {
    return 1e3 * this.millisecond();
  }), I(0, ["SSSSSSS", 7], 0, function () {
    return 1e4 * this.millisecond();
  }), I(0, ["SSSSSSSS", 8], 0, function () {
    return 1e5 * this.millisecond();
  }), I(0, ["SSSSSSSSS", 9], 0, function () {
    return 1e6 * this.millisecond();
  }), H("millisecond", "ms"), L("millisecond", 16), ue("S", K, Z), ue("SS", K, z), ue("SSS", K, $), rn = "SSSS"; rn.length <= 9; rn += "S") {ue(rn, ne);}

  function on(e, t) {
    t[we] = k(1e3 * ("0." + e));
  }

  for (rn = "S"; rn.length <= 9; rn += "S") {ce(rn, on);}

  var un = Te("Milliseconds", !1);
  I("z", 0, 0, "zoneAbbr"), I("zz", 0, 0, "zoneName");
  var ln = M.prototype;

  function dn(e) {
    return e;
  }

  ln.add = qt, ln.calendar = function (e, t) {
    var n = e || Tt(),
    s = Nt(n, this).startOf("day"),
    i = c.calendarFormat(this, s) || "sameElse",
    r = t && (x(t[i]) ? t[i].call(this, n) : t[i]);
    return this.format(r || this.localeData().calendar(i, this, Tt(n)));
  }, ln.clone = function () {
    return new M(this);
  }, ln.diff = function (e, t, n) {
    var s, i, r;
    if (!this.isValid()) return NaN;
    if (!(s = Nt(e, this)).isValid()) return NaN;

    switch (i = 6e4 * (s.utcOffset() - this.utcOffset()), t = R(t)) {
      case "year":
        r = Bt(this, s) / 12;
        break;

      case "month":
        r = Bt(this, s);
        break;

      case "quarter":
        r = Bt(this, s) / 3;
        break;

      case "second":
        r = (this - s) / 1e3;
        break;

      case "minute":
        r = (this - s) / 6e4;
        break;

      case "hour":
        r = (this - s) / 36e5;
        break;

      case "day":
        r = (this - s - i) / 864e5;
        break;

      case "week":
        r = (this - s - i) / 6048e5;
        break;

      default:
        r = this - s;}


    return n ? r : D(r);
  }, ln.endOf = function (e) {
    return void 0 === (e = R(e)) || "millisecond" === e ? this : ("date" === e && (e = "day"), this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"));
  }, ln.format = function (e) {
    e || (e = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);
    var t = A(this, e);
    return this.localeData().postformat(t);
  }, ln.from = function (e, t) {
    return this.isValid() && (S(e) && e.isValid() || Tt(e).isValid()) ? At({
      to: this,
      from: e }).
    locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
  }, ln.fromNow = function (e) {
    return this.from(Tt(), e);
  }, ln.to = function (e, t) {
    return this.isValid() && (S(e) && e.isValid() || Tt(e).isValid()) ? At({
      from: this,
      to: e }).
    locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
  }, ln.toNow = function (e) {
    return this.to(Tt(), e);
  }, ln.get = function (e) {
    return x(this[e = R(e)]) ? this[e]() : this;
  }, ln.invalidAt = function () {
    return g(this).overflow;
  }, ln.isAfter = function (e, t) {
    var n = S(e) ? e : Tt(e);
    return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = R(t) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf());
  }, ln.isBefore = function (e, t) {
    var n = S(e) ? e : Tt(e);
    return !(!this.isValid() || !n.isValid()) && ("millisecond" === (t = R(t) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf());
  }, ln.isBetween = function (e, t, n, s) {
    var i = S(e) ? e : Tt(e),
    r = S(t) ? t : Tt(t);
    return !!(this.isValid() && i.isValid() && r.isValid()) && ("(" === (s = s || "()")[0] ? this.isAfter(i, n) : !this.isBefore(i, n)) && (")" === s[1] ? this.isBefore(r, n) : !this.isAfter(r, n));
  }, ln.isSame = function (e, t) {
    var n,
    s = S(e) ? e : Tt(e);
    return !(!this.isValid() || !s.isValid()) && ("millisecond" === (t = R(t) || "millisecond") ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()));
  }, ln.isSameOrAfter = function (e, t) {
    return this.isSame(e, t) || this.isAfter(e, t);
  }, ln.isSameOrBefore = function (e, t) {
    return this.isSame(e, t) || this.isBefore(e, t);
  }, ln.isValid = function () {
    return p(this);
  }, ln.lang = Xt, ln.locale = Qt, ln.localeData = Kt, ln.max = bt, ln.min = xt, ln.parsingFlags = function () {
    return _({}, g(this));
  }, ln.set = function (e, t) {
    if ("object" == typeof e) for (var n = function (e) {
      var t = [];

      for (var n in e) {t.push({
          unit: n,
          priority: F[n] });}


      return t.sort(function (e, t) {
        return e.priority - t.priority;
      }), t;
    }(e = C(e)), s = 0; s < n.length; s++) {this[n[s].unit](e[n[s].unit]);} else if (x(this[e = R(e)])) return this[e](t);
    return this;
  }, ln.startOf = function (e) {
    switch (e = R(e)) {
      case "year":
        this.month(0);

      case "quarter":
      case "month":
        this.date(1);

      case "week":
      case "isoWeek":
      case "day":
      case "date":
        this.hours(0);

      case "hour":
        this.minutes(0);

      case "minute":
        this.seconds(0);

      case "second":
        this.milliseconds(0);}


    return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), this;
  }, ln.subtract = Jt, ln.toArray = function () {
    var e = this;
    return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
  }, ln.toObject = function () {
    var e = this;
    return {
      years: e.year(),
      months: e.month(),
      date: e.date(),
      hours: e.hours(),
      minutes: e.minutes(),
      seconds: e.seconds(),
      milliseconds: e.milliseconds() };

  }, ln.toDate = function () {
    return new Date(this.valueOf());
  }, ln.toISOString = function (e) {
    if (!this.isValid()) return null;
    var t = !0 !== e,
    n = t ? this.clone().utc() : this;
    return n.year() < 0 || 9999 < n.year() ? A(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : x(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", A(n, "Z")) : A(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
  }, ln.inspect = function () {
    if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
    var e = "moment",
    t = "";
    this.isLocal() || (e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", t = "Z");
    var n = "[" + e + '("]',
    s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
    i = t + '[")]';
    return this.format(n + s + "-MM-DD[T]HH:mm:ss.SSS" + i);
  }, ln.toJSON = function () {
    return this.isValid() ? this.toISOString() : null;
  }, ln.toString = function () {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }, ln.unix = function () {
    return Math.floor(this.valueOf() / 1e3);
  }, ln.valueOf = function () {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }, ln.creationData = function () {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict };

  }, ln.year = Oe, ln.isLeapYear = function () {
    return ke(this.year());
  }, ln.weekYear = function (e) {
    return tn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }, ln.isoWeekYear = function (e) {
    return tn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
  }, ln.quarter = ln.quarters = function (e) {
    return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
  }, ln.month = Fe, ln.daysInMonth = function () {
    return Pe(this.year(), this.month());
  }, ln.week = ln.weeks = function (e) {
    var t = this.localeData().week(this);
    return null == e ? t : this.add(7 * (e - t), "d");
  }, ln.isoWeek = ln.isoWeeks = function (e) {
    var t = Ie(this, 1, 4).week;
    return null == e ? t : this.add(7 * (e - t), "d");
  }, ln.weeksInYear = function () {
    var e = this.localeData()._week;

    return Ae(this.year(), e.dow, e.doy);
  }, ln.isoWeeksInYear = function () {
    return Ae(this.year(), 1, 4);
  }, ln.date = nn, ln.day = ln.days = function (e) {
    if (!this.isValid()) return null != e ? this : NaN;
    var t,
    n,
    s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != e ? (t = e, n = this.localeData(), e = "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = n.weekdaysParse(t)) ? t : null : parseInt(t, 10), this.add(e - s, "d")) : s;
  }, ln.weekday = function (e) {
    if (!this.isValid()) return null != e ? this : NaN;
    var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == e ? t : this.add(e - t, "d");
  }, ln.isoWeekday = function (e) {
    if (!this.isValid()) return null != e ? this : NaN;
    if (null == e) return this.day() || 7;
    var t,
    n,
    s = (t = e, n = this.localeData(), "string" == typeof t ? n.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t);
    return this.day(this.day() % 7 ? s : s - 7);
  }, ln.dayOfYear = function (e) {
    var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return null == e ? t : this.add(e - t, "d");
  }, ln.hour = ln.hours = tt, ln.minute = ln.minutes = sn, ln.second = ln.seconds = an, ln.millisecond = ln.milliseconds = un, ln.utcOffset = function (e, t, n) {
    var s,
    i = this._offset || 0;
    if (!this.isValid()) return null != e ? this : NaN;
    if (null == e) return this._isUTC ? i : Gt(this);

    if ("string" == typeof e) {
      if (null === (e = Ut(re, e))) return this;
    } else Math.abs(e) < 16 && !n && (e *= 60);

    return !this._isUTC && t && (s = Gt(this)), this._offset = e, this._isUTC = !0, null != s && this.add(s, "m"), i !== e && (!t || this._changeInProgress ? $t(this, At(e - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, c.updateOffset(this, !0), this._changeInProgress = null)), this;
  }, ln.utc = function (e) {
    return this.utcOffset(0, e);
  }, ln.local = function (e) {
    return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(Gt(this), "m")), this;
  }, ln.parseZone = function () {
    if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);else if ("string" == typeof this._i) {
      var e = Ut(ie, this._i);
      null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
    }
    return this;
  }, ln.hasAlignedHourOffset = function (e) {
    return !!this.isValid() && (e = e ? Tt(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0);
  }, ln.isDST = function () {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }, ln.isLocal = function () {
    return !!this.isValid() && !this._isUTC;
  }, ln.isUtcOffset = function () {
    return !!this.isValid() && this._isUTC;
  }, ln.isUtc = Vt, ln.isUTC = Vt, ln.zoneAbbr = function () {
    return this._isUTC ? "UTC" : "";
  }, ln.zoneName = function () {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }, ln.dates = n("dates accessor is deprecated. Use date instead.", nn), ln.months = n("months accessor is deprecated. Use month instead", Fe), ln.years = n("years accessor is deprecated. Use year instead", Oe), ln.zone = n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function (e, t) {
    return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
  }), ln.isDSTShifted = n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function () {
    if (!l(this._isDSTShifted)) return this._isDSTShifted;
    var e = {};

    if (w(e, this), (e = Yt(e))._a) {
      var t = e._isUTC ? y(e._a) : Tt(e._a);
      this._isDSTShifted = this.isValid() && 0 < a(e._a, t.toArray());
    } else this._isDSTShifted = !1;

    return this._isDSTShifted;
  });
  var hn = P.prototype;

  function cn(e, t, n, s) {
    var i = lt(),
    r = y().set(s, t);
    return i[n](r, e);
  }

  function fn(e, t, n) {
    if (d(e) && (t = e, e = void 0), e = e || "", null != t) return cn(e, t, n, "month");
    var s,
    i = [];

    for (s = 0; s < 12; s++) {i[s] = cn(e, s, n, "month");}

    return i;
  }

  function mn(e, t, n, s) {
    t = ("boolean" == typeof e ? d(t) && (n = t, t = void 0) : (t = e, e = !1, d(n = t) && (n = t, t = void 0)), t || "");
    var i,
    r = lt(),
    a = e ? r._week.dow : 0;
    if (null != n) return cn(t, (n + a) % 7, s, "day");
    var o = [];

    for (i = 0; i < 7; i++) {o[i] = cn(t, (i + a) % 7, s, "day");}

    return o;
  }

  hn.calendar = function (e, t, n) {
    var s = this._calendar[e] || this._calendar.sameElse;
    return x(s) ? s.call(t, n) : s;
  }, hn.longDateFormat = function (e) {
    var t = this._longDateFormat[e],
    n = this._longDateFormat[e.toUpperCase()];

    return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function (e) {
      return e.slice(1);
    }), this._longDateFormat[e]);
  }, hn.invalidDate = function () {
    return this._invalidDate;
  }, hn.ordinal = function (e) {
    return this._ordinal.replace("%d", e);
  }, hn.preparse = dn, hn.postformat = dn, hn.relativeTime = function (e, t, n, s) {
    var i = this._relativeTime[n];
    return x(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
  }, hn.pastFuture = function (e, t) {
    var n = this._relativeTime[0 < e ? "future" : "past"];
    return x(n) ? n(t) : n.replace(/%s/i, t);
  }, hn.set = function (e) {
    var t, n;

    for (n in e) {x(t = e[n]) ? this[n] = t : this["_" + n] = t;}

    this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
  }, hn.months = function (e, t) {
    return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || We).test(t) ? "format" : "standalone"][e.month()] : o(this._months) ? this._months : this._months.standalone;
  }, hn.monthsShort = function (e, t) {
    return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[We.test(t) ? "format" : "standalone"][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  }, hn.monthsParse = function (e, t, n) {
    var s, i, r;
    if (this._monthsParseExact) return function (e, t, n) {
      var s,
      i,
      r,
      a = e.toLocaleLowerCase();
      if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0; s < 12; ++s) {r = y([2e3, s]), this._shortMonthsParse[s] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[s] = this.months(r, "").toLocaleLowerCase();}
      return n ? "MMM" === t ? -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : null : "MMM" === t ? -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = Ye.call(this._longMonthsParse, a)) ? i : -1 !== (i = Ye.call(this._shortMonthsParse, a)) ? i : null;
    }.call(this, e, t, n);

    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; s < 12; s++) {
      if (i = y([2e3, s]), n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), n || this._monthsParse[s] || (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[s] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[s].test(e)) return s;
      if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
      if (!n && this._monthsParse[s].test(e)) return s;
    }
  }, hn.monthsRegex = function (e) {
    return this._monthsParseExact ? (m(this, "_monthsRegex") || Ne.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (m(this, "_monthsRegex") || (this._monthsRegex = Ue), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
  }, hn.monthsShortRegex = function (e) {
    return this._monthsParseExact ? (m(this, "_monthsRegex") || Ne.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (m(this, "_monthsShortRegex") || (this._monthsShortRegex = Le), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }, hn.week = function (e) {
    return Ie(e, this._week.dow, this._week.doy).week;
  }, hn.firstDayOfYear = function () {
    return this._week.doy;
  }, hn.firstDayOfWeek = function () {
    return this._week.dow;
  }, hn.weekdays = function (e, t) {
    return e ? o(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : o(this._weekdays) ? this._weekdays : this._weekdays.standalone;
  }, hn.weekdaysMin = function (e) {
    return e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
  }, hn.weekdaysShort = function (e) {
    return e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
  }, hn.weekdaysParse = function (e, t, n) {
    var s, i, r;
    if (this._weekdaysParseExact) return function (e, t, n) {
      var s,
      i,
      r,
      a = e.toLocaleLowerCase();
      if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0; s < 7; ++s) {r = y([2e3, 1]).day(s), this._minWeekdaysParse[s] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[s] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[s] = this.weekdays(r, "").toLocaleLowerCase();}
      return n ? "dddd" === t ? -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : "dddd" === t ? -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : "ddd" === t ? -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = Ye.call(this._minWeekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._weekdaysParse, a)) ? i : -1 !== (i = Ye.call(this._shortWeekdaysParse, a)) ? i : null;
    }.call(this, e, t, n);

    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; s < 7; s++) {
      if (i = y([2e3, 1]).day(s), n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(i, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[s] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[s] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === t && this._fullWeekdaysParse[s].test(e)) return s;
      if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
      if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
      if (!n && this._weekdaysParse[s].test(e)) return s;
    }
  }, hn.weekdaysRegex = function (e) {
    return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Be.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (m(this, "_weekdaysRegex") || (this._weekdaysRegex = $e), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }, hn.weekdaysShortRegex = function (e) {
    return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Be.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (m(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qe), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }, hn.weekdaysMinRegex = function (e) {
    return this._weekdaysParseExact ? (m(this, "_weekdaysRegex") || Be.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (m(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Je), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }, hn.isPM = function (e) {
    return "p" === (e + "").toLowerCase().charAt(0);
  }, hn.meridiem = function (e, t, n) {
    return 11 < e ? n ? "pm" : "PM" : n ? "am" : "AM";
  }, ot("en", {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(e) {
      var t = e % 10;
      return e + (1 === k(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th");
    } }),
  c.lang = n("moment.lang is deprecated. Use moment.locale instead.", ot), c.langData = n("moment.langData is deprecated. Use moment.localeData instead.", lt);
  var _n = Math.abs;

  function yn(e, t, n, s) {
    var i = At(t, n);
    return e._milliseconds += s * i._milliseconds, e._days += s * i._days, e._months += s * i._months, e._bubble();
  }

  function gn(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
  }

  function pn(e) {
    return 4800 * e / 146097;
  }

  function vn(e) {
    return 146097 * e / 4800;
  }

  function wn(e) {
    return function () {
      return this.as(e);
    };
  }

  var Mn = wn("ms"),
  Sn = wn("s"),
  Dn = wn("m"),
  kn = wn("h"),
  Yn = wn("d"),
  On = wn("w"),
  Tn = wn("M"),
  xn = wn("y");

  function bn(e) {
    return function () {
      return this.isValid() ? this._data[e] : NaN;
    };
  }

  var Pn = bn("milliseconds"),
  Wn = bn("seconds"),
  Hn = bn("minutes"),
  Rn = bn("hours"),
  Cn = bn("days"),
  Fn = bn("months"),
  Ln = bn("years");
  var Un = Math.round,
  Nn = {
    ss: 44,
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    M: 11 };

  var Gn = Math.abs;

  function Vn(e) {
    return (0 < e) - (e < 0) || +e;
  }

  function En() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var e,
    t,
    n = Gn(this._milliseconds) / 1e3,
    s = Gn(this._days),
    i = Gn(this._months);
    t = D((e = D(n / 60)) / 60), n %= 60, e %= 60;
    var r = D(i / 12),
    a = i %= 12,
    o = s,
    u = t,
    l = e,
    d = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
    h = this.asSeconds();
    if (!h) return "P0D";

    var c = h < 0 ? "-" : "",
    f = Vn(this._months) !== Vn(h) ? "-" : "",
    m = Vn(this._days) !== Vn(h) ? "-" : "",
    _ = Vn(this._milliseconds) !== Vn(h) ? "-" : "";

    return c + "P" + (r ? f + r + "Y" : "") + (a ? f + a + "M" : "") + (o ? m + o + "D" : "") + (u || l || d ? "T" : "") + (u ? _ + u + "H" : "") + (l ? _ + l + "M" : "") + (d ? _ + d + "S" : "");
  }

  var In = Ht.prototype;
  return In.isValid = function () {
    return this._isValid;
  }, In.abs = function () {
    var e = this._data;
    return this._milliseconds = _n(this._milliseconds), this._days = _n(this._days), this._months = _n(this._months), e.milliseconds = _n(e.milliseconds), e.seconds = _n(e.seconds), e.minutes = _n(e.minutes), e.hours = _n(e.hours), e.months = _n(e.months), e.years = _n(e.years), this;
  }, In.add = function (e, t) {
    return yn(this, e, t, 1);
  }, In.subtract = function (e, t) {
    return yn(this, e, t, -1);
  }, In.as = function (e) {
    if (!this.isValid()) return NaN;
    var t,
    n,
    s = this._milliseconds;
    if ("month" === (e = R(e)) || "year" === e) return t = this._days + s / 864e5, n = this._months + pn(t), "month" === e ? n : n / 12;

    switch (t = this._days + Math.round(vn(this._months)), e) {
      case "week":
        return t / 7 + s / 6048e5;

      case "day":
        return t + s / 864e5;

      case "hour":
        return 24 * t + s / 36e5;

      case "minute":
        return 1440 * t + s / 6e4;

      case "second":
        return 86400 * t + s / 1e3;

      case "millisecond":
        return Math.floor(864e5 * t) + s;

      default:
        throw new Error("Unknown unit " + e);}

  }, In.asMilliseconds = Mn, In.asSeconds = Sn, In.asMinutes = Dn, In.asHours = kn, In.asDays = Yn, In.asWeeks = On, In.asMonths = Tn, In.asYears = xn, In.valueOf = function () {
    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * k(this._months / 12) : NaN;
  }, In._bubble = function () {
    var e,
    t,
    n,
    s,
    i,
    r = this._milliseconds,
    a = this._days,
    o = this._months,
    u = this._data;
    return 0 <= r && 0 <= a && 0 <= o || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * gn(vn(o) + a), o = a = 0), u.milliseconds = r % 1e3, e = D(r / 1e3), u.seconds = e % 60, t = D(e / 60), u.minutes = t % 60, n = D(t / 60), u.hours = n % 24, o += i = D(pn(a += D(n / 24))), a -= gn(vn(i)), s = D(o / 12), o %= 12, u.days = a, u.months = o, u.years = s, this;
  }, In.clone = function () {
    return At(this);
  }, In.get = function (e) {
    return e = R(e), this.isValid() ? this[e + "s"]() : NaN;
  }, In.milliseconds = Pn, In.seconds = Wn, In.minutes = Hn, In.hours = Rn, In.days = Cn, In.weeks = function () {
    return D(this.days() / 7);
  }, In.months = Fn, In.years = Ln, In.humanize = function (e) {
    if (!this.isValid()) return this.localeData().invalidDate();
    var t,
    n,
    s,
    i,
    r,
    a,
    o,
    u,
    l,
    d,
    h,
    c = this.localeData(),
    f = (n = !e, s = c, i = At(t = this).abs(), r = Un(i.as("s")), a = Un(i.as("m")), o = Un(i.as("h")), u = Un(i.as("d")), l = Un(i.as("M")), d = Un(i.as("y")), (h = r <= Nn.ss && ["s", r] || r < Nn.s && ["ss", r] || a <= 1 && ["m"] || a < Nn.m && ["mm", a] || o <= 1 && ["h"] || o < Nn.h && ["hh", o] || u <= 1 && ["d"] || u < Nn.d && ["dd", u] || l <= 1 && ["M"] || l < Nn.M && ["MM", l] || d <= 1 && ["y"] || ["yy", d])[2] = n, h[3] = 0 < +t, h[4] = s, function (e, t, n, s, i) {
      return i.relativeTime(t || 1, !!n, e, s);
    }.apply(null, h));
    return e && (f = c.pastFuture(+this, f)), c.postformat(f);
  }, In.toISOString = En, In.toString = En, In.toJSON = En, In.locale = Qt, In.localeData = Kt, In.toIsoString = n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", En), In.lang = Xt, I("X", 0, 0, "unix"), I("x", 0, 0, "valueOf"), ue("x", se), ue("X", /[+-]?\d+(\.\d{1,3})?/), ce("X", function (e, t, n) {
    n._d = new Date(1e3 * parseFloat(e, 10));
  }), ce("x", function (e, t, n) {
    n._d = new Date(k(e));
  }), c.version = "2.23.0", e = Tt, c.fn = ln, c.min = function () {
    return Pt("isBefore", [].slice.call(arguments, 0));
  }, c.max = function () {
    return Pt("isAfter", [].slice.call(arguments, 0));
  }, c.now = function () {
    return Date.now ? Date.now() : +new Date();
  }, c.utc = y, c.unix = function (e) {
    return Tt(1e3 * e);
  }, c.months = function (e, t) {
    return fn(e, t, "months");
  }, c.isDate = h, c.locale = ot, c.invalid = v, c.duration = At, c.isMoment = S, c.weekdays = function (e, t, n) {
    return mn(e, t, n, "weekdays");
  }, c.parseZone = function () {
    return Tt.apply(null, arguments).parseZone();
  }, c.localeData = lt, c.isDuration = Rt, c.monthsShort = function (e, t) {
    return fn(e, t, "monthsShort");
  }, c.weekdaysMin = function (e, t, n) {
    return mn(e, t, n, "weekdaysMin");
  }, c.defineLocale = ut, c.updateLocale = function (e, t) {
    if (null != t) {
      var n,
      s,
      i = nt;
      null != (s = at(e)) && (i = s._config), (n = new P(t = b(i, t))).parentLocale = st[e], st[e] = n, ot(e);
    } else null != st[e] && (null != st[e].parentLocale ? st[e] = st[e].parentLocale : null != st[e] && delete st[e]);

    return st[e];
  }, c.locales = function () {
    return s(st);
  }, c.weekdaysShort = function (e, t, n) {
    return mn(e, t, n, "weekdaysShort");
  }, c.normalizeUnits = R, c.relativeTimeRounding = function (e) {
    return void 0 === e ? Un : "function" == typeof e && (Un = e, !0);
  }, c.relativeTimeThreshold = function (e, t) {
    return void 0 !== Nn[e] && (void 0 === t ? Nn[e] : (Nn[e] = t, "s" === e && (Nn.ss = t - 1), !0));
  }, c.calendarFormat = function (e, t) {
    var n = e.diff(t, "days", !0);
    return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse";
  }, c.prototype = ln, c.HTML5_FMT = {
    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
    DATE: "YYYY-MM-DD",
    TIME: "HH:mm",
    TIME_SECONDS: "HH:mm:ss",
    TIME_MS: "HH:mm:ss.SSS",
    WEEK: "GGGG-[W]WW",
    MONTH: "YYYY-MM" },
  c;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 93)(module)))

/***/ }),

/***/ 93:
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 94:
/*!*************************************************************************!*\
  !*** C:/Users/viruser.v-desktop/Desktop/thsAliMp/thsAliMp/utils/url.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * ??????????????????
 * @param {String} version ??????
 */
var getReqUrl = function getReqUrl(version) {return "https://news.10jqka.com.cn/wxapp/config/v".concat(version || '1.1.0');};
/**
                                                                                                                               * ????????????
                                                                                                                               * @param {Number} page ??????
                                                                                                                               * @param {String} url ???????????????
                                                                                                                               * @return {String} 
                                                                                                                               */


var newsList = function newsList(page, url) {
  if (url.match('http:')) {
    url = url.replace('http:', 'https:');
  }

  return url.replace('@page@', page);
}; // const newsList = (page) => (
//   `https://news.10jqka.com.cn/wxapp/v2/headline/index_${page || 1}.json`
// )

/**
 * ??????????????????????????????
 * @param {String} seq ??????seq
 */


var newsArticle = function newsArticle(seq) {return (// `http://yapi.demo.qunar.com/mock/34349/ths/article?seq=${seq}`
    "https://news.10jqka.com.cn/wxapp/article/".concat(seq, ".json"));};

module.exports = {
  getReqUrl: getReqUrl,
  newsList: newsList,
  newsArticle: newsArticle };

/***/ })

}]);