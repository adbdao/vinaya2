(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }
    
    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
},{"hyphenate-style-name":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;

var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
},{}],4:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],5:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ("'production'" !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],6:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("'production'" !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
},{"./emptyFunction":4}],7:[function(require,module,exports){
'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createPrefixer;

var _getBrowserInformation = require('../utils/getBrowserInformation');

var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

var _getPrefixedKeyframes = require('../utils/getPrefixedKeyframes');

var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

var _capitalizeString = require('../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
    return style;
  };

  return function () {
    /**
    * Instantiante a new prefixer
    * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
    * @param {string} keepUnprefixed - keeps unprefixed properties and values
    */
    function Prefixer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Prefixer);

      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;

      if (this._userAgent) {
        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      }

      // Checks if the userAgent was resolved correctly
      if (this._browserInfo && this._browserInfo.cssPrefix) {
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
      } else {
        this._useFallback = true;
        return false;
      }

      var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
      if (prefixData) {
        this._requiresPrefix = {};

        for (var property in prefixData) {
          if (prefixData[property] >= this._browserInfo.browserVersion) {
            this._requiresPrefix[property] = true;
          }
        }

        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._useFallback = true;
      }

      this._metaData = {
        browserVersion: this._browserInfo.browserVersion,
        browserName: this._browserInfo.browserName,
        cssPrefix: this._browserInfo.cssPrefix,
        jsPrefix: this._browserInfo.jsPrefix,
        keepUnprefixed: this._keepUnprefixed,
        requiresPrefix: this._requiresPrefix
      };
    }

    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(style) {
        // use static prefixer as fallback if userAgent can not be resolved
        if (this._useFallback) {
          return fallback(style);
        }

        // only add prefixes if needed
        if (!this._hasPropsRequiringPrefix) {
          return style;
        }

        return this._prefixStyle(style);
      }
    }, {
      key: '_prefixStyle',
      value: function _prefixStyle(style) {
        for (var property in style) {
          var value = style[property];

          // handle nested objects
          if ((0, _isObject2.default)(value)) {
            style[property] = this.prefix(value
            // handle array values
            );
          } else if (Array.isArray(value)) {
            var combinedValue = [];

            for (var i = 0, len = value.length; i < len; ++i) {
              var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
              (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
            }

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            if (combinedValue.length > 0) {
              style[property] = combinedValue;
            }
          } else {
            var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData

            // only modify the value if it was touched
            // by any plugin to prevent unnecessary mutations
            );if (_processedValue) {
              style[property] = _processedValue;
            }

            // add prefixes to properties
            if (this._requiresPrefix.hasOwnProperty(property)) {
              style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!this._keepUnprefixed) {
                delete style[property];
              }
            }
          }
        }

        return style;
      }

      /**
      * Returns a prefixed version of the style object using all vendor prefixes
      * @param {Object} styles - Style object that gets prefixed properties added
      * @returns {Object} - Style object with prefixed properties and values
      */

    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return fallback(styles);
      }
    }]);

    return Prefixer;
  }();
}
module.exports = exports['default'];
},{"../utils/addNewValuesOnly":34,"../utils/capitalizeString":35,"../utils/getBrowserInformation":36,"../utils/getPrefixedKeyframes":37,"../utils/isObject":39,"../utils/prefixValue":41}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  plugins: [],
  prefixMap: { "chrome": { "appearance": 62, "userSelect": 53, "textEmphasisPosition": 62, "textEmphasis": 62, "textEmphasisStyle": 62, "textEmphasisColor": 62, "boxDecorationBreak": 62, "clipPath": 54, "maskImage": 62, "maskMode": 62, "maskRepeat": 62, "maskPosition": 62, "maskClip": 62, "maskOrigin": 62, "maskSize": 62, "maskComposite": 62, "mask": 62, "maskBorderSource": 62, "maskBorderMode": 62, "maskBorderSlice": 62, "maskBorderWidth": 62, "maskBorderOutset": 62, "maskBorderRepeat": 62, "maskBorder": 62, "maskType": 62, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 11, "userSelect": 11, "backdropFilter": 11, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 11, "clipPath": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textDecorationStyle": 11, "textDecorationSkip": 11, "textDecorationLine": 11, "textDecorationColor": 11, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 11, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 56, "userSelect": 56, "textAlignLast": 48, "tabSize": 56, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 47, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 47, "textEmphasis": 47, "textEmphasisStyle": 47, "textEmphasisColor": 47, "boxDecorationBreak": 47, "clipPath": 41, "maskImage": 47, "maskMode": 47, "maskRepeat": 47, "maskPosition": 47, "maskClip": 47, "maskOrigin": 47, "maskSize": 47, "maskComposite": 47, "mask": 47, "maskBorderSource": 47, "maskBorderMode": 47, "maskBorderSlice": 47, "maskBorderWidth": 47, "maskBorderOutset": 47, "maskBorderRepeat": 47, "maskBorder": 47, "maskType": 47, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 16, "wrapFlow": 16, "wrapThrough": 16, "wrapMargin": 16, "scrollSnapType": 16, "scrollSnapPointsX": 16, "scrollSnapPointsY": 16, "scrollSnapDestination": 16, "scrollSnapCoordinate": 16, "hyphens": 16, "flowInto": 16, "flowFrom": 16, "breakBefore": 16, "breakAfter": 16, "breakInside": 16, "regionFragment": 16, "gridTemplateColumns": 16, "gridTemplateRows": 16, "gridTemplateAreas": 16, "gridTemplate": 16, "gridAutoColumns": 16, "gridAutoRows": 16, "gridAutoFlow": 16, "grid": 16, "gridRowStart": 16, "gridColumnStart": 16, "gridRowEnd": 16, "gridRow": 16, "gridColumn": 16, "gridColumnEnd": 16, "gridColumnGap": 16, "gridRowGap": 16, "gridArea": 16, "gridGap": 16 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 11, "userSelect": 11, "backdropFilter": 11, "fontKerning": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "boxDecorationBreak": 11, "clipPath": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "textDecorationStyle": 11, "textDecorationSkip": 11, "textDecorationLine": 11, "textDecorationColor": 11, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 11, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 56, "userSelect": 4.4, "fontKerning": 4.4, "textEmphasisPosition": 56, "textEmphasis": 56, "textEmphasisStyle": 56, "textEmphasisColor": 56, "boxDecorationBreak": 56, "clipPath": 4.4, "maskImage": 56, "maskMode": 56, "maskRepeat": 56, "maskPosition": 56, "maskClip": 56, "maskOrigin": 56, "maskSize": 56, "maskComposite": 56, "mask": 56, "maskBorderSource": 56, "maskBorderMode": 56, "maskBorderSlice": 56, "maskBorderWidth": 56, "maskBorderOutset": 56, "maskBorderRepeat": 56, "maskBorder": 56, "maskType": 56, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 56, "breakBefore": 56, "breakInside": 56, "columnCount": 56, "columnFill": 56, "columnGap": 56, "columnRule": 56, "columnRuleColor": 56, "columnRuleStyle": 56, "columnRuleWidth": 56, "columns": 56, "columnSpan": 56, "columnWidth": 56 }, "and_chr": { "appearance": 59, "textEmphasisPosition": 59, "textEmphasis": 59, "textEmphasisStyle": 59, "textEmphasisColor": 59, "boxDecorationBreak": 59, "maskImage": 59, "maskMode": 59, "maskRepeat": 59, "maskPosition": 59, "maskClip": 59, "maskOrigin": 59, "maskSize": 59, "maskComposite": 59, "mask": 59, "maskBorderSource": 59, "maskBorderMode": 59, "maskBorderSlice": 59, "maskBorderWidth": 59, "maskBorderOutset": 59, "maskBorderRepeat": 59, "maskBorder": 59, "maskType": 59 }, "and_uc": { "flex": 11.4, "flexBasis": 11.4, "flexDirection": 11.4, "flexGrow": 11.4, "flexFlow": 11.4, "flexShrink": 11.4, "flexWrap": 11.4, "alignContent": 11.4, "alignItems": 11.4, "alignSelf": 11.4, "justifyContent": 11.4, "order": 11.4, "transform": 11.4, "transformOrigin": 11.4, "transformOriginX": 11.4, "transformOriginY": 11.4, "backfaceVisibility": 11.4, "perspective": 11.4, "perspectiveOrigin": 11.4, "transformStyle": 11.4, "transformOriginZ": 11.4, "animation": 11.4, "animationDelay": 11.4, "animationDirection": 11.4, "animationFillMode": 11.4, "animationDuration": 11.4, "animationIterationCount": 11.4, "animationName": 11.4, "animationPlayState": 11.4, "animationTimingFunction": 11.4, "appearance": 11.4, "userSelect": 11.4, "textEmphasisPosition": 11.4, "textEmphasis": 11.4, "textEmphasisStyle": 11.4, "textEmphasisColor": 11.4, "clipPath": 11.4, "maskImage": 11.4, "maskMode": 11.4, "maskRepeat": 11.4, "maskPosition": 11.4, "maskClip": 11.4, "maskOrigin": 11.4, "maskSize": 11.4, "maskComposite": 11.4, "mask": 11.4, "maskBorderSource": 11.4, "maskBorderMode": 11.4, "maskBorderSlice": 11.4, "maskBorderWidth": 11.4, "maskBorderOutset": 11.4, "maskBorderRepeat": 11.4, "maskBorder": 11.4, "maskType": 11.4, "textSizeAdjust": 11.4, "filter": 11.4, "hyphens": 11.4, "fontFeatureSettings": 11.4, "breakAfter": 11.4, "breakBefore": 11.4, "breakInside": 11.4, "columnCount": 11.4, "columnFill": 11.4, "columnGap": 11.4, "columnRule": 11.4, "columnRuleColor": 11.4, "columnRuleStyle": 11.4, "columnRuleWidth": 11.4, "columns": 11.4, "columnSpan": 11.4, "columnWidth": 11.4 }, "op_mini": {} }
};
module.exports = exports["default"];
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = require('./plugins/crossFade');

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = require('./plugins/filter');

var _filter2 = _interopRequireDefault(_filter);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = require('./plugins/imageSet');

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

var _static = require('../static');

var _static2 = _interopRequireDefault(_static);

var _dynamicData = require('./dynamicData');

var _dynamicData2 = _interopRequireDefault(_dynamicData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

var Prefixer = (0, _createPrefixer2.default)({
  prefixMap: _dynamicData2.default.prefixMap,
  plugins: plugins
}, _static2.default);
exports.default = Prefixer;
module.exports = exports['default'];
},{"../static":22,"./createPrefixer":8,"./dynamicData":9,"./plugins/crossFade":11,"./plugins/cursor":12,"./plugins/filter":13,"./plugins/flex":14,"./plugins/flexboxOld":15,"./plugins/gradient":16,"./plugins/imageSet":17,"./plugins/position":18,"./plugins/sizing":19,"./plugins/transition":20}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function crossFade(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
    return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grabValues = {
  grab: true,
  grabbing: true
};


var zoomValues = {
  'zoom-in': true,
  'zoom-out': true
};

function cursor(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable browser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }

  if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
    return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  flex: true,
  'inline-flex': true
};
function flex(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
};


var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
var properties = Object.keys(alternativeProps).concat(otherProps);

function flexboxOld(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    delete requiresPrefix[property];

    if (!keepUnprefixed && !Array.isArray(style[property])) {
      delete style[property];
    }
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
function gradient(property, value, style, _ref) {
  var browserName = _ref.browserName,
      browserVersion = _ref.browserVersion,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSet(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
    return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function position(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};

var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true

  // TODO: chrome & opera support it
};function sizing(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // This might change in the future
  // Keep an eye on it
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];
},{"../../utils/getPrefixedValue":38}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = require('css-in-js-utils/lib/hyphenateProperty');

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var requiresPrefixDashCased = void 0;

function transition(property, value, style, _ref) {
  var cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed,
      requiresPrefix = _ref.requiresPrefix;

  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    // memoize the prefix array for later use
    if (!requiresPrefixDashCased) {
      requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
        return (0, _hyphenateProperty2.default)(prop);
      });
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    requiresPrefixDashCased.forEach(function (prop) {
      multipleValues.forEach(function (val, index) {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
        }
      });
    });

    return multipleValues.join(',');
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/hyphenateProperty":2}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPrefixer;

var _prefixProperty = require('../utils/prefixProperty');

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPrefixer(_ref) {
  var prefixMap = _ref.prefixMap,
      plugins = _ref.plugins;

  function prefixAll(style) {
    for (var property in style) {
      var value = style[property];

      // handle nested objects
      if ((0, _isObject2.default)(value)) {
        style[property] = prefixAll(value
        // handle array values
        );
      } else if (Array.isArray(value)) {
        var combinedValue = [];

        for (var i = 0, len = value.length; i < len; ++i) {
          var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
          (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue;
        }
      } else {
        var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        );if (_processedValue) {
          style[property] = _processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
    }

    return style;
  }

  return prefixAll;
}
module.exports = exports['default'];
},{"../utils/addNewValuesOnly":34,"../utils/isObject":39,"../utils/prefixProperty":40,"../utils/prefixValue":41}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _staticData = require('./staticData');

var _staticData2 = _interopRequireDefault(_staticData);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _crossFade = require('./plugins/crossFade');

var _crossFade2 = _interopRequireDefault(_crossFade);

var _filter = require('./plugins/filter');

var _filter2 = _interopRequireDefault(_filter);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _imageSet = require('./plugins/imageSet');

var _imageSet2 = _interopRequireDefault(_imageSet);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

exports.default = (0, _createPrefixer2.default)({
  prefixMap: _staticData2.default.prefixMap,
  plugins: plugins
});
module.exports = exports['default'];
},{"./createPrefixer":21,"./plugins/crossFade":23,"./plugins/cursor":24,"./plugins/filter":25,"./plugins/flex":26,"./plugins/flexboxOld":27,"./plugins/gradient":28,"./plugins/imageSet":29,"./plugins/position":30,"./plugins/sizing":31,"./plugins/transition":32,"./staticData":33}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];
},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];
},{"css-in-js-utils/lib/isPrefixedValue":3}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];
},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
},{}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateProperty = require('css-in-js-utils/lib/hyphenateProperty');

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

var _isPrefixedValue = require('css-in-js-utils/lib/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _capitalizeString = require('../../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap
    // if the property is already prefixed
    );var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];
},{"../../utils/capitalizeString":35,"css-in-js-utils/lib/hyphenateProperty":2,"css-in-js-utils/lib/isPrefixedValue":3}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit", "Moz"];
var wms = ["Webkit", "ms"];
var wmms = ["Webkit", "Moz", "ms"];

exports.default = {
  plugins: [],
  prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
};
module.exports = exports["default"];
},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addNewValuesOnly;
function addIfNew(list, value) {
  if (list.indexOf(value) === -1) {
    list.push(value);
  }
}

function addNewValuesOnly(list, values) {
  if (Array.isArray(values)) {
    for (var i = 0, len = values.length; i < len; ++i) {
      addIfNew(list, values[i]);
    }
  } else {
    addIfNew(list, values);
  }
}
module.exports = exports["default"];
},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];
},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBrowserInformation;

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixByBrowser = {
  chrome: 'Webkit',
  safari: 'Webkit',
  ios: 'Webkit',
  android: 'Webkit',
  phantom: 'Webkit',
  opera: 'Webkit',
  webos: 'Webkit',
  blackberry: 'Webkit',
  bada: 'Webkit',
  tizen: 'Webkit',
  chromium: 'Webkit',
  vivaldi: 'Webkit',
  firefox: 'Moz',
  seamoney: 'Moz',
  sailfish: 'Moz',
  msie: 'ms',
  msedge: 'ms'
};


var browserByCanIuseAlias = {
  chrome: 'chrome',
  chromium: 'chrome',
  safari: 'safari',
  firfox: 'firefox',
  msedge: 'edge',
  opera: 'opera',
  vivaldi: 'opera',
  msie: 'ie'
};

function getBrowserName(browserInfo) {
  if (browserInfo.firefox) {
    return 'firefox';
  }

  if (browserInfo.mobile || browserInfo.tablet) {
    if (browserInfo.ios) {
      return 'ios_saf';
    } else if (browserInfo.android) {
      return 'android';
    } else if (browserInfo.opera) {
      return 'op_mini';
    }
  }

  for (var browser in browserByCanIuseAlias) {
    if (browserInfo.hasOwnProperty(browser)) {
      return browserByCanIuseAlias[browser];
    }
  }
}

/**
 * Uses bowser to get default browser browserInformation such as version and name
 * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
 * @param {string} userAgent - userAgent that gets evaluated
 */
function getBrowserInformation(userAgent) {
  var browserInfo = _bowser2.default._detect(userAgent);

  if (browserInfo.yandexbrowser) {
    browserInfo = _bowser2.default._detect(userAgent.replace(/YaBrowser\/[0-9.]*/, ''));
  }

  for (var browser in prefixByBrowser) {
    if (browserInfo.hasOwnProperty(browser)) {
      var prefix = prefixByBrowser[browser];

      browserInfo.jsPrefix = prefix;
      browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
      break;
    }
  }

  browserInfo.browserName = getBrowserName(browserInfo

  // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
  );if (browserInfo.version) {
    browserInfo.browserVersion = parseFloat(browserInfo.version);
  } else {
    browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
  }

  browserInfo.osVersion = parseFloat(browserInfo.osversion

  // iOS forces all browsers to use Safari under the hood
  // as the Safari version seems to match the iOS version
  // we just explicitely use the osversion instead
  // https://github.com/rofrischmann/inline-style-prefixer/issues/72
  );if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
    browserInfo.browserName = 'and_chr';
  }

  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
    browserInfo.browserVersion = browserInfo.osVersion;
  }

  // Samsung browser are basically build on Chrome > 44
  // https://github.com/rofrischmann/inline-style-prefixer/issues/102
  if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
    browserInfo.browserName = 'and_chr';
    browserInfo.browserVersion = 44;
  }

  return browserInfo;
}
module.exports = exports['default'];
},{"bowser":1}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedKeyframes;
function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
  var prefixedKeyframes = 'keyframes';

  if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
    return cssPrefix + prefixedKeyframes;
  }
  return prefixedKeyframes;
}
module.exports = exports['default'];
},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPrefixedValue;
function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
  if (keepUnprefixed) {
    return [prefixedValue, value];
  }
  return prefixedValue;
}
module.exports = exports["default"];
},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(value) {
  return value instanceof Object && !Array.isArray(value);
}
module.exports = exports["default"];
},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = require('./capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];
},{"./capitalizeString":35}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    );if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];
},{}],42:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx'), require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'react', 'react-dom'], factory) :
	(factory((global.mobxReact = global.mobxReact || {}),global.mobx,global.React,global.ReactDOM));
}(this, (function (exports,mobx,React,ReactDOM) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

var empty = {};

var empty_1 = empty.unstable_batchedUpdates;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var EventEmitter = function () {
  function EventEmitter() {
    classCallCheck(this, EventEmitter);
    this.listeners = [];
  }

  createClass(EventEmitter, [{
    key: "on",
    value: function on(cb) {
      var _this = this;

      this.listeners.push(cb);
      return function () {
        var index = _this.listeners.indexOf(cb);
        if (index !== -1) _this.listeners.splice(index, 1);
      };
    }
  }, {
    key: "emit",
    value: function emit(data) {
      this.listeners.forEach(function (fn) {
        return fn(data);
      });
    }
  }]);
  return EventEmitter;
}();

// Copied from React.PropTypes
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }

    return mobx.untracked(function () {
      componentName = componentName || '<<anonymous>>';
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        if (isRequired) {
          var actual = props[propName] === null ? 'null' : 'undefined';
          return new Error('The ' + location + ' `' + propFullName + '` is marked as required ' + 'in `' + componentName + '`, but its value is `' + actual + '`.');
        }
        return null;
      } else {
        return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
      }
    });
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

// Copied from React.PropTypes
function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Copied from React.PropTypes
function getPropType(propValue) {
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// Copied from React.PropTypes
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    return mobx.untracked(function () {
      if (allowNativeType) {
        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
      }
      var mobxChecker = void 0;
      switch (mobxType) {
        case 'Array':
          mobxChecker = mobx.isObservableArray;break;
        case 'Object':
          mobxChecker = mobx.isObservableObject;break;
        case 'Map':
          mobxChecker = mobx.isObservableMap;break;
        default:
          throw new Error('Unexpected mobxType: ' + mobxType);
      }
      var propValue = props[propName];
      if (!mobxChecker(propValue)) {
        var preciseType = getPreciseType(propValue);
        var nativeTypeExpectationMessage = allowNativeType ? ' or javascript `' + mobxType.toLowerCase() + '`' : '';
        return new Error('Invalid prop `' + propFullName + '` of type `' + preciseType + '` supplied to' + ' `' + componentName + '`, expected `mobx.Observable' + mobxType + '`' + nativeTypeExpectationMessage + '.');
      }
      return null;
    });
  });
}

function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }

    return mobx.untracked(function () {
      if (typeof typeChecker !== 'function') {
        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has ' + 'invalid PropType notation.');
      }
      var error = createObservableTypeCheckerCreator(allowNativeType, 'Array')(props, propName, componentName);
      if (error instanceof Error) return error;
      var propValue = props[propName];
      for (var i = 0; i < propValue.length; i++) {
        error = typeChecker.apply(undefined, [propValue, i, componentName, location, propFullName + '[' + i + ']'].concat(rest));
        if (error instanceof Error) return error;
      }
      return null;
    });
  });
}

var observableArray = createObservableTypeCheckerCreator(false, 'Array');
var observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
var observableMap = createObservableTypeCheckerCreator(false, 'Map');
var observableObject = createObservableTypeCheckerCreator(false, 'Object');
var arrayOrObservableArray = createObservableTypeCheckerCreator(true, 'Array');
var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
var objectOrObservableObject = createObservableTypeCheckerCreator(true, 'Object');



var propTypes = Object.freeze({
	observableArray: observableArray,
	observableArrayOf: observableArrayOf,
	observableMap: observableMap,
	observableObject: observableObject,
	arrayOrObservableArray: arrayOrObservableArray,
	arrayOrObservableArrayOf: arrayOrObservableArrayOf,
	objectOrObservableObject: objectOrObservableObject
});

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

var index = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

function isStateless(component) {
  return !component.prototype.render;
}

var injectorContextTypes = {
  mobxStores: objectOrObservableObject
};
Object.seal(injectorContextTypes);

var proxiedInjectorProps = {
  contextTypes: {
    get: function get$$1() {
      return injectorContextTypes;
    },
    set: function set$$1(_) {
      console.warn("Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`");
    },
    configurable: true,
    enumerable: false
  },
  isMobxInjector: {
    value: true,
    writable: true,
    configurable: true,
    enumerable: true
  }
};

/**
 * Store Injection
 */
function createStoreInjector(grabStoresFn, component, injectNames) {
  var _class, _temp2;

  var displayName = "inject-" + (component.displayName || component.name || component.constructor && component.constructor.name || "Unknown");
  if (injectNames) displayName += "-with-" + injectNames;

  var Injector = (_temp2 = _class = function (_Component) {
    inherits(Injector, _Component);

    function Injector() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Injector);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Injector.__proto__ || Object.getPrototypeOf(Injector)).call.apply(_ref, [this].concat(args))), _this), _this.storeRef = function (instance) {
        _this.wrappedInstance = instance;
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Injector, [{
      key: 'render',
      value: function render() {
        // Optimization: it might be more efficient to apply the mapper function *outside* the render method
        // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
        // See this test: 'using a custom injector is not too reactive' in inject.js
        var newProps = {};
        for (var key in this.props) {
          if (this.props.hasOwnProperty(key)) {
            newProps[key] = this.props[key];
          }
        }var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};
        for (var _key2 in additionalProps) {
          newProps[_key2] = additionalProps[_key2];
        }

        if (!isStateless(component)) {
          newProps.ref = this.storeRef;
        }

        return React__default.createElement(component, newProps);
      }
    }]);
    return Injector;
  }(React.Component), _class.displayName = displayName, _temp2);

  // Static fields from component should be visible on the generated Injector

  index(Injector, component);

  Injector.wrappedComponent = component;
  Object.defineProperties(Injector, proxiedInjectorProps);

  return Injector;
}

function grabStoresByName(storeNames) {
  return function (baseStores, nextProps) {
    storeNames.forEach(function (storeName) {
      if (storeName in nextProps) // prefer props over stores
        return;
      if (!(storeName in baseStores)) throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
      nextProps[storeName] = baseStores[storeName];
    });
    return nextProps;
  };
}

/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */
function inject() /* fn(stores, nextProps) or ...storeNames */{
  var grabStoresFn = void 0;
  if (typeof arguments[0] === "function") {
    grabStoresFn = arguments[0];
    return function (componentClass) {
      var injected = createStoreInjector(grabStoresFn, componentClass);
      injected.isMobxInjector = false; // supress warning
      // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
      // see #111
      injected = observer(injected);
      injected.isMobxInjector = true; // restore warning
      return injected;
    };
  } else {
    var storeNames = [];
    for (var i = 0; i < arguments.length; i++) {
      storeNames[i] = arguments[i];
    }grabStoresFn = grabStoresByName(storeNames);
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, componentClass, storeNames.join("-"));
    };
  }
}

/**
 * dev tool support
 */
var isDevtoolsEnabled = false;

var isUsingStaticRendering = false;

var warnedAboutObserverInjectDeprecation = false;

// WeakMap<Node, Object>;
var componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
var renderReporter = new EventEmitter();

function findDOMNode(component) {
  if (ReactDOM__default) {
    try {
      return ReactDOM__default.findDOMNode(component);
    } catch (e) {
      // findDOMNode will throw in react-test-renderer, see:
      // See https://github.com/mobxjs/mobx-react/issues/216
      // Is there a better heuristic?
      return null;
    }
  }
  return null;
}

function reportRendering(component) {
  var node = findDOMNode(component);
  if (node && componentByNodeRegistery) componentByNodeRegistery.set(node, component);

  renderReporter.emit({
    event: 'render',
    renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
    totalTime: Date.now() - component.__$mobRenderStart,
    component: component,
    node: node
  });
}

function trackComponents() {
  if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
  if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
}

function useStaticRendering(useStaticRendering) {
  isUsingStaticRendering = useStaticRendering;
}

/**
 * Errors reporter
 */

var errorsReporter = new EventEmitter();

/**
 * Utilities
 */

function patch(target, funcName) {
  var runMixinFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var base = target[funcName];
  var mixinFunc = reactiveMixin[funcName];
  var f = !base ? mixinFunc : runMixinFirst === true ? function () {
    mixinFunc.apply(this, arguments);
    base.apply(this, arguments);
  } : function () {
    base.apply(this, arguments);
    mixinFunc.apply(this, arguments);
  };

  // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
  // ...but that breaks react-hot-loader, see #231...
  target[funcName] = f;
}

function isObjectShallowModified(prev, next) {
  if (null == prev || null == next || (typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== "object" || (typeof next === 'undefined' ? 'undefined' : _typeof(next)) !== "object") {
    return prev !== next;
  }
  var keys = Object.keys(prev);
  if (keys.length !== Object.keys(next).length) {
    return true;
  }
  var key = void 0;
  for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
    if (next[key] !== prev[key]) {
      return true;
    }
  }
  return false;
}

/**
 * ReactiveMixin
 */
var reactiveMixin = {
  componentWillMount: function componentWillMount() {
    var _this = this;

    if (isUsingStaticRendering === true) return;
    // Generate friendly name for debugging
    var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
    var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;

    /**
     * If props are shallowly modified, react will render anyway,
     * so atom.reportChanged() should not result in yet another re-render
     */
    var skipRender = false;
    /**
     * forceUpdate will re-assign this.props. We don't want that to cause a loop,
     * so detect these changes
     */
    var isForcingUpdate = false;

    function makePropertyObservableReference(propName) {
      var valueHolder = this[propName];
      var atom = new mobx.Atom("reactive " + propName);
      Object.defineProperty(this, propName, {
        configurable: true, enumerable: true,
        get: function get$$1() {
          atom.reportObserved();
          return valueHolder;
        },
        set: function set$$1(v) {
          if (!isForcingUpdate && isObjectShallowModified(valueHolder, v)) {
            valueHolder = v;
            skipRender = true;
            atom.reportChanged();
            skipRender = false;
          } else {
            valueHolder = v;
          }
        }
      });
    }

    // make this.props an observable reference, see #124
    makePropertyObservableReference.call(this, "props");
    // make state an observable reference
    makePropertyObservableReference.call(this, "state");

    // wire up reactive render
    var baseRender = this.render.bind(this);
    var reaction = null;
    var isRenderingPending = false;

    var initialRender = function initialRender() {
      reaction = new mobx.Reaction(initialName + '#' + rootNodeID + '.render()', function () {
        if (!isRenderingPending) {
          // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
          // This unidiomatic React usage but React will correctly warn about this so we continue as usual
          // See #85 / Pull #44
          isRenderingPending = true;
          if (typeof _this.componentWillReact === "function") _this.componentWillReact(); // TODO: wrap in action?
          if (_this.__$mobxIsUnmounted !== true) {
            // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
            // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
            // However, people also claim this migth happen during unit tests..
            var hasError = true;
            try {
              isForcingUpdate = true;
              if (!skipRender) React__default.Component.prototype.forceUpdate.call(_this);
              hasError = false;
            } finally {
              isForcingUpdate = false;
              if (hasError) reaction.dispose();
            }
          }
        }
      });
      reactiveRender.$mobx = reaction;
      _this.render = reactiveRender;
      return reactiveRender();
    };

    var reactiveRender = function reactiveRender() {
      isRenderingPending = false;
      var exception = undefined;
      var rendering = undefined;
      reaction.track(function () {
        if (isDevtoolsEnabled) {
          _this.__$mobRenderStart = Date.now();
        }
        try {
          rendering = mobx.extras.allowStateChanges(false, baseRender);
        } catch (e) {
          exception = e;
        }
        if (isDevtoolsEnabled) {
          _this.__$mobRenderEnd = Date.now();
        }
      });
      if (exception) {
        errorsReporter.emit(exception);
        throw exception;
      }
      return rendering;
    };

    this.render = initialRender;
  },

  componentWillUnmount: function componentWillUnmount() {
    if (isUsingStaticRendering === true) return;
    this.render.$mobx && this.render.$mobx.dispose();
    this.__$mobxIsUnmounted = true;
    if (isDevtoolsEnabled) {
      var node = findDOMNode(this);
      if (node && componentByNodeRegistery) {
        componentByNodeRegistery.delete(node);
      }
      renderReporter.emit({
        event: 'destroy',
        component: this,
        node: node
      });
    }
  },

  componentDidMount: function componentDidMount() {
    if (isDevtoolsEnabled) {
      reportRendering(this);
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (isDevtoolsEnabled) {
      reportRendering(this);
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (isUsingStaticRendering) {
      console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
    }
    // update on any state changes (as is the default)
    if (this.state !== nextState) {
      return true;
    }
    // update if props are shallowly not equal, inspired by PureRenderMixin
    // we could return just 'false' here, and avoid the `skipRender` checks etc
    // however, it is nicer if lifecycle events are triggered like usually,
    // so we return true here if props are shallowly modified.
    return isObjectShallowModified(this.props, nextProps);
  }
};

/**
 * Observer function / decorator
 */
function observer(arg1, arg2) {
  if (typeof arg1 === "string") {
    throw new Error("Store names should be provided as array");
  }
  if (Array.isArray(arg1)) {
    // component needs stores
    if (!warnedAboutObserverInjectDeprecation) {
      warnedAboutObserverInjectDeprecation = true;
      console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
    }
    if (!arg2) {
      // invoked as decorator
      return function (componentClass) {
        return observer(arg1, componentClass);
      };
    } else {
      return inject.apply(null, arg1)(observer(arg2));
    }
  }
  var componentClass = arg1;

  if (componentClass.isMobxInjector === true) {
    console.warn('Mobx observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
  }

  // Stateless function component:
  // If it is function but doesn't seem to be a react class constructor,
  // wrap it to a react class automatically
  if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !React__default.Component.isPrototypeOf(componentClass)) {
    var _class, _temp;

    return observer((_temp = _class = function (_Component) {
      inherits(_class, _Component);

      function _class() {
        classCallCheck(this, _class);
        return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      createClass(_class, [{
        key: 'render',
        value: function render() {
          return componentClass.call(this, this.props, this.context);
        }
      }]);
      return _class;
    }(React.Component), _class.displayName = componentClass.displayName || componentClass.name, _class.contextTypes = componentClass.contextTypes, _class.propTypes = componentClass.propTypes, _class.defaultProps = componentClass.defaultProps, _temp));
  }

  if (!componentClass) {
    throw new Error("Please pass a valid component to 'observer'");
  }

  var target = componentClass.prototype || componentClass;
  mixinLifecycleEvents(target);
  componentClass.isMobXReactObserver = true;
  return componentClass;
}

function mixinLifecycleEvents(target) {
  patch(target, "componentWillMount", true);
  ["componentDidMount", "componentWillUnmount", "componentDidUpdate"].forEach(function (funcName) {
    patch(target, funcName);
  });
  if (!target.shouldComponentUpdate) {
    target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
  }
}

// TODO: support injection somehow as well?
var Observer = observer(function (_ref) {
  var children = _ref.children;
  return children();
});

Observer.propTypes = {
  children: function children(propValue, key, componentName, location, propFullName) {
    if (typeof propValue[key] !== 'function') return new Error('Invalid prop `' + propFullName + '` of type `' + _typeof(propValue[key]) + '` supplied to' + ' `' + componentName + '`, expected `function`.');
  }
};

var _class;
var _temp;

var specialReactKeys = { children: true, key: true, ref: true };

var Provider = (_temp = _class = function (_Component) {
  inherits(Provider, _Component);

  function Provider() {
    classCallCheck(this, Provider);
    return possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
  }

  createClass(Provider, [{
    key: 'render',
    value: function render() {
      return React__default.Children.only(this.props.children);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var stores = {};
      // inherit stores
      var baseStores = this.context.mobxStores;
      if (baseStores) for (var key in baseStores) {
        stores[key] = baseStores[key];
      }
      // add own stores
      for (var _key in this.props) {
        if (!specialReactKeys[_key] && _key !== "suppressChangedStoreWarning") stores[_key] = this.props[_key];
      }return {
        mobxStores: stores
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Maybe this warning is too aggressive?
      if (Object.keys(nextProps).length !== Object.keys(this.props).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
      if (!nextProps.suppressChangedStoreWarning) for (var key in nextProps) {
        if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
      }
    }
  }]);
  return Provider;
}(React.Component), _class.contextTypes = {
  mobxStores: objectOrObservableObject
}, _class.childContextTypes = {
  mobxStores: objectOrObservableObject.isRequired
}, _temp);

var TARGET_LIB_NAME = void 0;
TARGET_LIB_NAME = 'mobx-react';
if (!mobx) throw new Error(TARGET_LIB_NAME + ' requires the MobX package');
if (!React__default) throw new Error(TARGET_LIB_NAME + ' requires React to be available');

if ("browser" === 'browser' && typeof ReactDOM.unstable_batchedUpdates === "function") mobx.extras.setReactionScheduler(ReactDOM.unstable_batchedUpdates);
if ("browser" === 'native' && typeof empty_1 === "function") mobx.extras.setReactionScheduler(empty_1);

var onError = function onError(fn) {
  return errorsReporter.on(fn);
};

/* DevTool support */
if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ? 'undefined' : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === 'object') {
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(exports, mobx);
}

exports.propTypes = propTypes;
exports.PropTypes = propTypes;
exports.onError = onError;
exports['default'] = exports;
exports.observer = observer;
exports.Observer = Observer;
exports.renderReporter = renderReporter;
exports.componentByNodeRegistery = componentByNodeRegistery;
exports.trackComponents = trackComponents;
exports.useStaticRendering = useStaticRendering;
exports.Provider = Provider;
exports.inject = inject;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"mobx":43,"react":"react","react-dom":"react-dom"}],43:[function(require,module,exports){
(function (global){
/** MobX - (c) Michel Weststrate 2015, 2016 - MIT Licensed */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Anything that can be used to _store_ state is an Atom in mobx. Atoms have two important jobs
 *
 * 1) detect when they are being _used_ and report this (using reportObserved). This allows mobx to make the connection between running functions and the data they used
 * 2) they should notify mobx whenever they have _changed_. This way mobx can re-run any functions (derivations) that are using this atom.
 */
var BaseAtom = (function () {
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function BaseAtom(name) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        this.name = name;
        this.isPendingUnobservation = true; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = exports.IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {
        // noop
    };
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     */
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    BaseAtom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}());
var Atom = (function (_super) {
    __extends(Atom, _super);
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) { name = "Atom@" + getNextId(); }
        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.onBecomeObservedHandler = onBecomeObservedHandler;
        _this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        _this.isPendingUnobservation = false; // for effective unobserving.
        _this.isBeingTracked = false;
        return _this;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
        // return doesn't really give useful info, because it can be as well calling computed which calls atom (no reactions)
        // also it could not trigger when calculating reaction dependent on Atom because Atom's value was cached by computed called by given reaction.
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom));
var isAtom = createInstanceofPredicate("Atom", BaseAtom);

function hasInterceptors(interceptable) {
    return (interceptable.interceptors && interceptable.interceptors.length > 0);
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors)
            for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd(prevU);
    }
}

function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}

function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length)
        return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change)
        spyReport(objectAssign({}, change, END_EVENT));
    else
        spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1)
            globalState.spyListeners.splice(idx, 1);
    });
}

function iteratorSymbol() {
    return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    // returning an array for entries(), values() etc for maps was a mis-interpretation of the specs..,
    // yet it is quite convenient to be able to use the response both as array directly and as iterator
    // it is suboptimal, but alas...
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
// Detects bug in safari 9.1.1 (or iOS 9 safari mobile). See #364
var safariPrototypeSetterInheritanceBug = (function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function () { v = true; } });
    Object.create(p)["0"] = 1;
    return v === false;
})();
/**
 * This array buffer contains two lists of properties, so that all arrays
 * can recycle their property definitions, which significantly improves performance of creating
 * properties on the fly.
 */
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
// Typescript workaround to make sure ObservableArray extends Array
var StubArray = (function () {
    function StubArray() {
    }
    return StubArray;
}());
function inherit(ctor, proto) {
    if (typeof Object["setPrototypeOf"] !== "undefined") {
        Object["setPrototypeOf"](ctor.prototype, proto);
    }
    else if (typeof ctor.prototype.__proto__ !== "undefined") {
        ctor.prototype.__proto__ = proto;
    }
    else {
        ctor["prototype"] = proto;
    }
}
inherit(StubArray, Array.prototype);
var ObservableArrayAdministration = (function () {
    function ObservableArrayAdministration(name, enhancer, array, owned) {
        this.array = array;
        this.owned = owned;
        this.values = [];
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || ("ObservableArray@" + getNextId()));
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function (values) {
        if (this.dehancer !== undefined)
            return values.map(this.dehancer);
        return values;
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined; // No Array.fill everywhere...
            this.spliceWithArray(currentLength, 0, newItems);
        }
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    // adds / removes the necessary numeric properties to this object
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
            reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(function (v) { return _this.enhancer(v, undefined); });
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta); // create or remove new entries
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        }
        else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy)
            spyReportStart(change);
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    return ObservableArrayAdministration;
}());
var ObservableArray = (function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, enhancer, name, owned) {
        if (name === void 0) { name = "ObservableArray@" + getNextId(); }
        if (owned === void 0) { owned = false; }
        var _this = _super.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, _this, owned);
        addHiddenFinalProp(_this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            _this.spliceWithArray(0, 0, initialValues);
        }
        if (safariPrototypeSetterInheritanceBug) {
            // Seems that Safari won't use numeric prototype setter untill any * numeric property is
            // defined on the instance. After that it works fine, even if this property is deleted.
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
        return _this;
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.peek(), arrays.map(function (a) { return isObservableArray(a) ? a.peek() : a; }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    /**
     * Converts this array back to a (shallow) javascript structure.
     * For a deep clone use mobx.toJS
     */
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        this.$mobx.atom.reportObserved();
        return this.$mobx.dehanceValues(this.$mobx.values);
    };
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        var idx = this.findIndex.apply(this, arguments);
        return idx === -1 ? undefined : this.get(idx);
    };
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    ObservableArray.prototype.findIndex = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        var items = this.peek(), l = items.length;
        for (var i = fromIndex; i < l; i++)
            if (predicate.call(thisArg, items[i], i, this))
                return i;
        return -1;
    };
    /*
        functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
        since these functions alter the inner structure of the array, the have side effects.
        Because the have side effects, they should not be used in computed function,
        and for that reason the do not call dependencyState.notifyObserved
        */
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.dehanceValues(this.$mobx.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        }
        else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    // See #734, in case property accessors are unreliable...
    ObservableArray.prototype.get = function (index) {
        var impl = this.$mobx;
        if (impl) {
            if (index < impl.values.length) {
                impl.atom.reportObserved();
                return impl.dehanceValue(impl.values[index]);
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    };
    // See #734, in case property accessors are unreliable...
    ObservableArray.prototype.set = function (index, newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        if (index < values.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: this,
                    index: index, newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else {
            // out of bounds
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
        }
    };
    return ObservableArray;
}(StubArray));
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function () {
        return this.$mobx.getArrayLength();
    },
    set: function (newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
/**
 * Wrap function from prototype
 */
[
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toString",
    "toLocaleString"
].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        return baseFunc.apply(this.peek(), arguments);
    });
});
/**
 * We don't want those to show up in `for (const key in ar)` ...
 */
makeNonEnumerable(ObservableArray.prototype, [
    "constructor",
    "intercept",
    "observe",
    "clear",
    "concat",
    "get",
    "replace",
    "toJS",
    "toJSON",
    "peek",
    "find",
    "findIndex",
    "splice",
    "spliceWithArray",
    "push",
    "pop",
    "set",
    "shift",
    "unshift",
    "reverse",
    "sort",
    "remove",
    "move",
    "toString",
    "toLocaleString"
]);
// See #364
var ENTRY_0 = createArrayEntryDescriptor(0);
function createArrayEntryDescriptor(index) {
    return {
        enumerable: false,
        configurable: false,
        get: function () {
            // TODO: Check `this`?, see #752?
            return this.get(index);
        },
        set: function (value) {
            this.set(index, value);
        }
    };
}
function createArrayBufferItem(index) {
    Object.defineProperty(ObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
        createArrayBufferItem(index);
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}

var UNCHANGED = {};
var ObservableValue = (function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy) {
        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
        if (notifySpy === void 0) { notifySpy = true; }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.hasUnreportedChange = false;
        _this.dehancer = undefined;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled()) {
            // only notify spy if this is a stand-alone observable
            spyReport({ type: "create", object: _this, newValue: _this.value });
        }
        return _this;
    }
    ObservableValue.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change)
                return UNCHANGED;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue
            ? newValue
            : UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue, oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.dehanceValue(this.value);
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    return ObservableValue;
}(BaseAtom));
ObservableValue.prototype[primitiveSymbol()] = ObservableValue.prototype.valueOf;
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);

var messages = {
    "m001": "It is not allowed to assign new values to @action fields",
    "m002": "`runInAction` expects a function",
    "m003": "`runInAction` expects a function without arguments",
    "m004": "autorun expects a function",
    "m005": "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m006": "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m007": "reaction only accepts 2 or 3 arguments. If migrating from MobX 2, please provide an options object",
    "m008": "wrapping reaction expression in `asReference` is no longer supported, use options object instead",
    "m009": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.",
    "m010": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'",
    "m011": "First argument to `computed` should be an expression. If using computed as decorator, don't pass it arguments",
    "m012": "computed takes one or two arguments if used as function",
    "m013": "[mobx.expr] 'expr' should only be used inside other reactive functions.",
    "m014": "extendObservable expected 2 or more arguments",
    "m015": "extendObservable expects an object as first argument",
    "m016": "extendObservable should not be used on maps, use map.merge instead",
    "m017": "all arguments of extendObservable should be objects",
    "m018": "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540",
    "m019": "[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.",
    "m020": "modifiers can only be used for individual object properties",
    "m021": "observable expects zero or one arguments",
    "m022": "@observable can not be used on getters, use @computed instead",
    "m023": "Using `transaction` is deprecated, use `runInAction` or `(@)action` instead.",
    "m024": "whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested its value.",
    "m025": "whyRun can only be used on reactions and computed values",
    "m026": "`action` can only be invoked on functions",
    "m028": "It is not allowed to set `useStrict` when a derivation is running",
    "m029": "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row",
    "m030a": "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ",
    "m030b": "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ",
    "m031": "Computed values are not allowed to not cause side effects by changing observables that are already being observed. Tried to modify: ",
    "m032": "* This computation is suspended (not in use by any reaction) and won't run automatically.\n	Didn't expect this computation to be suspended at this point?\n	  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n	  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).",
    "m033": "`observe` doesn't support the fire immediately property for observable maps.",
    "m034": "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead",
    "m035": "Cannot make the designated object observable; it is not extensible",
    "m036": "It is not possible to get index atoms from arrays",
    "m037": "Hi there! I'm sorry you have just run into an exception.\nIf your debugger ends up here, know that some reaction (like the render() of an observer component, autorun or reaction)\nthrew an exception and that mobx caught it, to avoid that it brings the rest of your application down.\nThe original cause of the exception (the code that caused this reaction to run (again)), is still in the stack.\n\nHowever, more interesting is the actual stack trace of the error itself.\nHopefully the error is an instanceof Error, because in that case you can inspect the original stack of the error from where it was thrown.\nSee `error.stack` property, or press the very subtle \"(...)\" link you see near the console.error message that probably brought you here.\nThat stack is more interesting than the stack of this console.error itself.\n\nIf the exception you see is an exception you created yourself, make sure to use `throw new Error(\"Oops\")` instead of `throw \"Oops\"`,\nbecause the javascript environment will only preserve the original stack trace in the first form.\n\nYou can also make sure the debugger pauses the next time this very same exception is thrown by enabling \"Pause on caught exception\".\n(Note that it might pause on many other, unrelated exception as well).\n\nIf that all doesn't help you out, feel free to open an issue https://github.com/mobxjs/mobx/issues!\n",
    "m038": "Missing items in this list?\n    1. Check whether all used values are properly marked as observable (use isObservable to verify)\n    2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n"
};
function getMessage(id) {
    return messages[id];
}

function createAction(actionName, fn) {
    invariant(typeof fn === "function", getMessage("m026"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function () {
        return executeAction(actionName, fn, this, arguments);
    };
    res.originalFn = fn;
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    }
    finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy) {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy)
        spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function useStrict(strict) {
    invariant(globalState.trackingDerivation === null, getMessage("m028"));
    globalState.strictMode = strict;
    globalState.allowStateChanges = !strict;
}
function isStrictModeEnabled() {
    return globalState.strictMode;
}
function allowStateChanges(allowStateChanges, func) {
    // TODO: deprecate / refactor this function in next major
    // Currently only used by `@observer`
    // Proposed change: remove first param, rename to `forbidStateChanges`,
    // require error callback instead of the hardcoded error message now used
    // Use `inAction` instead of allowStateChanges in derivation.ts to check strictMode
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}

/**
 * Construcs a decorator, that normalizes the differences between
 * TypeScript and Babel. Mainly caused by the fact that legacy-decorator cannot assign
 * values during instance creation to properties that have a getter setter.
 *
 * - Sigh -
 *
 * Also takes care of the difference between @decorator field and @decorator(args) field, and different forms of values.
 * For performance (cpu and mem) reasons the properties are always defined on the prototype (at least initially).
 * This means that these properties despite being enumerable might not show up in Object.keys() (but they will show up in for...in loops).
 */
function createClassPropertyDecorator(
    /**
     * This function is invoked once, when the property is added to a new instance.
     * When this happens is not strictly determined due to differences in TS and Babel:
     * Typescript: Usually when constructing the new instance
     * Babel, sometimes Typescript: during the first get / set
     * Both: when calling `runLazyInitializers(instance)`
     */
    onInitialize, get, set, enumerable, 
    /**
     * Can this decorator invoked with arguments? e.g. @decorator(args)
     */
    allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        if (argLen === void 0) { argLen = 0; }
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            // typescript (except for getter / setters)
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function () {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true)
                        typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    }
                    else {
                        set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                // Typescript target is ES3, so it won't define property for us
                // or using Reflect.decorate polyfill, which will return no descriptor
                // (see https://github.com/mobxjs/mobx/issues/333)
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        }
        else {
            // babel and typescript getter / setter props
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", (target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice()) || [] // support inheritance
                );
            }
            var value_1 = descriptor.value, initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, (initializer_1 ? initializer_1.call(instance) : value_1), customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function () {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    return get.call(this, key);
                },
                set: function (v) {
                    if (this.__mobxDidRunLazyInitializers !== true)
                        runLazyInitializers(this);
                    set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        /** If custom arguments are allowed, we should return a function that returns a decorator */
        return function () {
            /** Direct invocation: @decorator bla */
            if (quacksLikeADecorator(arguments))
                return classPropertyDecorator.apply(null, arguments);
            /** Indirect invocation: @decorator(args) bla */
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) { return classPropertyDecorator(target, key, descriptor, outerArgs, argLen); };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps"))
        addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true)
        return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) { return initializer(instance); });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}

var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = (args && args.length === 1) ? args[0] : (value.name || key || "<unnamed action>");
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, true);
var boundActionDecorator = createClassPropertyDecorator(function (target, key, value) {
    defineBoundAction(target, key, value);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, false);
var action = function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
};
action.bound = function boundAction(arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
        var action_1 = createAction("<not yet bound action>", arg1);
        action_1.autoBind = true;
        return action_1;
    }
    return boundActionDecorator.apply(null, arguments);
};
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            // TypeScript @action method() { }. Defined on proto before being decorated
            // Don't use the field decorator if we are just decorating a method
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        // bound instance methods
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", getMessage("m002"));
    invariant(fn.length === 0, getMessage("m003"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction(target, propertyName, fn) {
    var res = function () {
        return executeAction(propertyName, fn, target, arguments);
    };
    res.isMobxAction = true;
    addHiddenProp(target, propertyName, res);
}

function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    }
    else {
        name = arg1.name || ("Autorun@" + getNextId());
        view = arg1;
        scope = arg2;
    }
    invariant(typeof view === "function", getMessage("m004"));
    invariant(isAction(view) === false, getMessage("m005"));
    if (scope)
        view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    }
    else {
        name = ("When@" + getNextId());
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    }
    else {
        name = arg1.name || ("AutorunAsync@" + getNextId());
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, getMessage("m006"));
    if (delay === void 0)
        delay = 1;
    if (scope)
        func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed)
                    r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() { func(r); }
    r.schedule();
    return r.getDisposer();
}
function reaction(expression, effect, arg3) {
    if (arguments.length > 3) {
        fail(getMessage("m007"));
    }
    if (isModifierDescriptor(expression)) {
        fail(getMessage("m008"));
    }
    var opts;
    if (typeof arg3 === "object") {
        opts = arg3;
    }
    else {
        opts = {};
    }
    opts.name = opts.name || expression.name || effect.name || ("Reaction@" + getNextId());
    opts.fireImmediately = arg3 === true || opts.fireImmediately === true;
    opts.delay = opts.delay || 0;
    opts.compareStructural = opts.compareStructural || opts.struct || false;
    effect = action(opts.name, opts.context ? effect.bind(opts.context) : effect);
    if (opts.context) {
        expression = expression.bind(opts.context);
    }
    var firstTime = true;
    var isScheduled = false;
    var nextValue;
    var r = new Reaction(opts.name, function () {
        if (firstTime || opts.delay < 1) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, opts.delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var v = expression(r);
            changed = valueDidChange(opts.compareStructural, nextValue, v);
            nextValue = v;
        });
        if (firstTime && opts.fireImmediately)
            effect(nextValue, r);
        if (!firstTime && changed === true)
            effect(nextValue, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}

/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember result of the computation for duration of a batch, or being observed
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
var ComputedValue = (function () {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `compareStructural` property indicates whether the return values should be compared structurally.
     * Normally, a computed value will not notify an upstream observer if a newly produced value is strictly equal to the previously produced value.
     * However, enabling compareStructural can be convenient if you always produce an new aggregated object and don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    function ComputedValue(derivation, scope, compareStructural, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.compareStructural = compareStructural;
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = null; // during tracking it's an array with new observed observers
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = undefined;
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter)
            this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        clearObserving(this);
        this.value = undefined;
    };
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        if (globalState.inBatch === 0) {
            // just for small optimization, can be droped for simplicity
            // computed called outside of any mobx stuff. batch observing shuold be enough, don't need tracking
            // because it will never be called again inside this batch
            startBatch();
            if (shouldCompute(this))
                this.value = this.computeValue(false);
            endBatch();
        }
        else {
            reportObserved(this);
            if (shouldCompute(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result))
            throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res))
            throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this.scope,
                type: "compute",
                fn: this.derivation
            });
        }
        var oldValue = this.value;
        var newValue = this.value = this.computeValue(true);
        return isCaughtException(newValue) || valueDidChange(this.compareStructural, newValue, oldValue);
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        }
        else {
            try {
                res = this.derivation.call(this.scope);
            }
            catch (e) {
                res = new CaughtException(e);
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };
    
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    
    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        var observers = unique(getObservers(this).map(function (dep) { return dep.name; }));
        return ("\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n" +
            (this.dependenciesState === exports.IDerivationState.NOT_TRACKING ? getMessage("m032") :
                " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this.isComputing && isTracking) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n"));
    };
    return ComputedValue;
}());
ComputedValue.prototype[primitiveSymbol()] = ComputedValue.prototype.valueOf;
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);

var ObservableObjectAdministration = (function () {
    function ObservableObjectAdministration(target, name) {
        this.target = target;
        this.name = name;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    /**
        * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
        * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
        * for callback details
        */
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}());
function asObservableObject(target, name) {
    if (isObservableObject(target))
        return target.$mobx;
    invariant(Object.isExtensible(target), getMessage("m035"));
    if (!isPlainObject(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name)
        name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function defineObservablePropertyFromDescriptor(adm, propName, descriptor, defaultEnhancer) {
    if (adm.values[propName]) {
        // already observable property
        invariant("value" in descriptor, "The property " + propName + " in " + adm.name + " is already observable, cannot redefine it as computed property");
        adm.target[propName] = descriptor.value; // the property setter will make 'value' reactive if needed.
        return;
    }
    // not yet observable property
    if ("value" in descriptor) {
        // not a computed value
        if (isModifierDescriptor(descriptor.value)) {
            // x : ref(someValue)
            var modifierDescriptor = descriptor.value;
            defineObservableProperty(adm, propName, modifierDescriptor.initialValue, modifierDescriptor.enhancer);
        }
        else if (isAction(descriptor.value) && descriptor.value.autoBind === true) {
            defineBoundAction(adm.target, propName, descriptor.value.originalFn);
        }
        else if (isComputedValue(descriptor.value)) {
            // x: computed(someExpr)
            defineComputedPropertyFromComputedValue(adm, propName, descriptor.value);
        }
        else {
            // x: someValue
            defineObservableProperty(adm, propName, descriptor.value, defaultEnhancer);
        }
    }
    else {
        // get x() { return 3 } set x(v) { }
        defineComputedProperty(adm, propName, descriptor.get, descriptor.set, false, true);
    }
}
function defineObservableProperty(adm, propName, newValue, enhancer) {
    assertPropertyConfigurable(adm.target, propName);
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            object: adm.target,
            name: propName,
            type: "add",
            newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    var observable = adm.values[propName] = new ObservableValue(newValue, enhancer, adm.name + "." + propName, false);
    newValue = observable.value; // observableValue might have changed it
    Object.defineProperty(adm.target, propName, generateObservablePropConfig(propName));
    notifyPropertyAddition(adm, adm.target, propName, newValue);
}
function defineComputedProperty(adm, propName, getter, setter, compareStructural, asInstanceProperty) {
    if (asInstanceProperty)
        assertPropertyConfigurable(adm.target, propName);
    adm.values[propName] = new ComputedValue(getter, adm.target, compareStructural, adm.name + "." + propName, setter);
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
    }
}
function defineComputedPropertyFromComputedValue(adm, propName, computedValue) {
    var name = adm.name + "." + propName;
    computedValue.name = name;
    if (!computedValue.scope)
        computedValue.scope = adm.target;
    adm.values[propName] = computedValue;
    Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            setPropertyValue(this, propName, v);
        }
    });
}
function generateComputedPropConfig(propName) {
    return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function () {
            return this.$mobx.values[propName].get();
        },
        set: function (v) {
            return this.$mobx.values[propName].set(v);
        }
    });
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    // intercept
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change)
            return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    // notify spy & observers
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify)
            notifyListeners(adm, change);
        if (notifySpy)
            spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy)
        spyReportStart(change);
    if (notify)
        notifyListeners(adm, change);
    if (notifySpy)
        spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}

/**
    * Returns true if the provided value is reactive.
    * @param value object, function or array
    * @param propertyName if propertyName is specified, checkes whether value.propertyName is reactive.
    */
function isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value))
            throw new Error(getMessage("m019"));
        else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    // For first check, see #701
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}

function createDecoratorForEnhancer(enhancer) {
    invariant(!!enhancer, ":(");
    return createClassPropertyDecorator(function (target, name, baseValue, _, baseDescriptor) {
        assertPropertyConfigurable(target, name);
        invariant(!baseDescriptor || !baseDescriptor.get, getMessage("m022"));
        var adm = asObservableObject(target, undefined);
        defineObservableProperty(adm, name, baseValue, enhancer);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined)
            return undefined;
        return observable.get();
    }, function (name, value) {
        setPropertyValue(this, name, value);
    }, true, false);
}

function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, deepEnhancer, properties);
}
function extendShallowObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, referenceEnhancer, properties);
}
function extendObservableHelper(target, defaultEnhancer, properties) {
    invariant(arguments.length >= 2, getMessage("m014"));
    invariant(typeof target === "object", getMessage("m015"));
    invariant(!(isObservableMap(target)), getMessage("m016"));
    properties.forEach(function (propSet) {
        invariant(typeof propSet === "object", getMessage("m017"));
        invariant(!isObservable(propSet), getMessage("m018"));
    });
    var adm = asObservableObject(target);
    var definedProps = {};
    // Note could be optimised if properties.length === 1
    for (var i = properties.length - 1; i >= 0; i--) {
        var propSet = properties[i];
        for (var key in propSet)
            if (definedProps[key] !== true && hasOwnProperty(propSet, key)) {
                definedProps[key] = true;
                if (target === propSet && !isPropertyConfigurable(target, key))
                    continue; // see #111, skip non-configurable or non-writable props for `observable(object)`.
                var descriptor = Object.getOwnPropertyDescriptor(propSet, key);
                defineObservablePropertyFromDescriptor(adm, key, descriptor, defaultEnhancer);
            }
    }
    return target;
}

var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var deepStructDecorator = createDecoratorForEnhancer(deepStructEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
/**
 * Turns an object, array or function into a reactive structure.
 * @param value the value which should become observable.
 */
function createObservable(v) {
    if (v === void 0) { v = undefined; }
    // @observable someProp;
    if (typeof arguments[1] === "string")
        return deepDecorator.apply(null, arguments);
    invariant(arguments.length <= 1, getMessage("m021"));
    invariant(!isModifierDescriptor(v), getMessage("m020"));
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    var res = deepEnhancer(v, undefined, undefined);
    // this value could be converted to a new observable data structure, return it
    if (res !== v)
        return res;
    // otherwise, just box it
    return observable.box(v);
}
var IObservableFactories = (function () {
    function IObservableFactories() {
    }
    IObservableFactories.prototype.box = function (value, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        return new ObservableValue(value, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowBox = function (value, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowBox");
        return new ObservableValue(value, referenceEnhancer, name);
    };
    IObservableFactories.prototype.array = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        return new ObservableArray(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowArray = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowArray");
        return new ObservableArray(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.map = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        return new ObservableMap(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowMap = function (initialValues, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowMap");
        return new ObservableMap(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.object = function (props, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("object");
        var res = {};
        // convert to observable object
        asObservableObject(res, name);
        // add properties
        extendObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.shallowObject = function (props, name) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("shallowObject");
        var res = {};
        asObservableObject(res, name);
        extendShallowObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.ref = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(referenceEnhancer, arguments[0]);
        }
        else {
            return refDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.shallow = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(shallowEnhancer, arguments[0]);
        }
        else {
            return shallowDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.deep = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(deepEnhancer, arguments[0]);
        }
        else {
            return deepDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.struct = function () {
        if (arguments.length < 2) {
            // although ref creates actually a modifier descriptor, the type of the resultig properties
            // of the object is `T` in the end, when the descriptors are interpreted
            return createModifierDescriptor(deepStructEnhancer, arguments[0]);
        }
        else {
            return deepStructDecorator.apply(null, arguments);
        }
    };
    return IObservableFactories;
}());
var observable = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
// ES6 class methods aren't enumerable, can't use Object.keys
Object.getOwnPropertyNames(IObservableFactories.prototype)
    .filter(function (name) { return name !== "constructor"; })
    .forEach(function (name) { return observable[name] = IObservableFactories.prototype[name]; });
observable.deep.struct = observable.struct;
observable.ref.struct = function () {
    if (arguments.length < 2) {
        return createModifierDescriptor(refStructEnhancer, arguments[0]);
    }
    else {
        return refStructDecorator.apply(null, arguments);
    }
};
function incorrectlyUsedAsDecorator(methodName) {
    fail("Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

function isModifierDescriptor(thing) {
    return typeof thing === "object" && thing !== null && thing.isMobxModifierDescriptor === true;
}
function createModifierDescriptor(enhancer, initialValue) {
    invariant(!isModifierDescriptor(initialValue), "Modifiers cannot be nested");
    return {
        isMobxModifierDescriptor: true,
        initialValue: initialValue,
        enhancer: enhancer
    };
}
function deepEnhancer(v, _, name) {
    if (isModifierDescriptor(v))
        fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return observable.array(v, name);
    if (isPlainObject(v))
        return observable.object(v, name);
    if (isES6Map(v))
        return observable.map(v, name);
    return v;
}
function shallowEnhancer(v, _, name) {
    if (isModifierDescriptor(v))
        fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (v === undefined || v === null)
        return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v))
        return v;
    if (Array.isArray(v))
        return observable.shallowArray(v, name);
    if (isPlainObject(v))
        return observable.shallowObject(v, name);
    if (isES6Map(v))
        return observable.shallowMap(v, name);
    return fail("The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer(newValue) {
    // never turn into an observable
    return newValue;
}
function deepStructEnhancer(v, oldValue, name) {
    // don't confuse structurally compare enhancer with ref enhancer! The latter is probably
    // more suited for immutable objects
    if (deepEqual(v, oldValue))
        return oldValue;
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return new ObservableArray(v, deepStructEnhancer, name);
    if (isES6Map(v))
        return new ObservableMap(v, deepStructEnhancer, name);
    if (isPlainObject(v)) {
        var res = {};
        asObservableObject(res, name);
        extendObservableHelper(res, deepStructEnhancer, [v]);
        return res;
    }
    return v;
}
function refStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue))
        return oldValue;
    return v;
}

/**
 * @deprecated
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * Deprecated to simplify api; transactions offer no real benefit above actions.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    deprecated(getMessage("m023"));
    return runInTransaction.apply(undefined, arguments);
}
function runInTransaction(action, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    return executeAction("", action);
}

var ObservableMapMarker = {};
var ObservableMap = (function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer; }
        if (name === void 0) { name = "ObservableMap@" + getNextId(); }
        this.enhancer = enhancer;
        this.name = name;
        this.$mobx = ObservableMapMarker;
        this._data = Object.create(null);
        this._hasMap = Object.create(null); // hasMap, not hashMap >-).
        this._keys = new ObservableArray(undefined, referenceEnhancer, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this.dehancer = undefined;
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key))
            return false;
        key = "" + key;
        if (this._hasMap[key])
            return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy)
                spyReportStart(change);
            runInTransaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable$$1 = _this._data[key];
                observable$$1.setNewValue(undefined);
                _this._data[key] = undefined;
            });
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = this._hasMap[key] = new ObservableValue(value, referenceEnhancer, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable$$1 = this._data[name];
        newValue = observable$$1.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable$$1.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy)
                spyReportStart(change);
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        runInTransaction(function () {
            var observable$$1 = _this._data[name] = new ObservableValue(newValue, _this.enhancer, _this.name + "." + name, false);
            newValue = observable$$1.value; // value might have been changed
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name,
            newValue: newValue
        } : null;
        if (notifySpy)
            spyReportStart(change);
        if (notify)
            notifyListeners(this, change);
        if (notifySpy)
            spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key))
            return this.dehanceValue(this._data[key].get());
        return this.dehanceValue(undefined);
    };
    ObservableMap.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) { return [key, _this.get(key)]; }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) { return callback.call(thisArg, _this.get(key), key, _this); });
    };
    /** Merge another object into this object, returns this. */
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        runInTransaction(function () {
            if (isPlainObject(other))
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
            else if (Array.isArray(other))
                other.forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return _this.set(key, value);
                });
            else if (isES6Map(other))
                other.forEach(function (value, key) { return _this.set(key, value); });
            else if (other !== null && other !== undefined)
                fail("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        runInTransaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        runInTransaction(function () {
            _this.clear();
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a shallow non observable object clone of this map.
     * Note that the values migth still be observable. For a deep clone use mobx.toJS.
     */
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) { return res[key] = _this.get(key); });
        return res;
    };
    ObservableMap.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined)
            return false;
        if (typeof key === "string" || typeof key === "number" || typeof key === "boolean")
            return true;
        return false;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key))
            throw new Error("[mobx.map] Invalid key: '" + key + "', only strings, numbers and booleans are accepted as key in observable maps.");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) { return key + ": " + ("" + _this.get(key)); }).join(", ") + " }]";
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, getMessage("m033"));
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}());
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues) {
    deprecated("`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead");
    return observable.map(initialValues);
}
/* 'var' fixes small-build issue */
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);

var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getGlobal() {
    return global;
}
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message, thing) {
    invariant(false, message, thing);
    throw "X"; // unreachable
}
function invariant(check, message, thing) {
    if (!check)
        throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */
function once(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function () { };
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) { limit = 100; }
    if (separator === void 0) { separator = " - "; }
    if (!things)
        return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source)
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
    }
    return res;
}
function valueDidChange(compareStructural, oldValue, newValue) {
    if (typeof oldValue === 'number' && isNaN(oldValue)) {
        return typeof newValue !== 'number' || !isNaN(newValue);
    }
    return compareStructural
        ? !deepEqual(oldValue, newValue)
        : oldValue !== newValue;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj)
        res.push(key);
    return res;
}
/**
 * Naive deepEqual. Doesn't check for prototype, non-enumerable or out-of-range properties on arrays.
 * If you have such a case, you probably should use this function but something fancier :).
 */
function deepEqual(a, b) {
    if (a === null && b === null)
        return true;
    if (a === undefined && b === undefined)
        return true;
    if (typeof a !== "object")
        return a === b;
    var aIsArray = isArrayLike(a);
    var aIsMap = isMapLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    }
    else if (aIsMap !== isMapLike(b)) {
        return false;
    }
    else if (aIsArray) {
        if (a.length !== b.length)
            return false;
        for (var i = a.length - 1; i >= 0; i--)
            if (!deepEqual(a[i], b[i]))
                return false;
        return true;
    }
    else if (aIsMap) {
        if (a.size !== b.size)
            return false;
        var equals_1 = true;
        a.forEach(function (value, key) {
            equals_1 = equals_1 && deepEqual(b.get(key), value);
        });
        return equals_1;
    }
    else if (typeof a === "object" && typeof b === "object") {
        if (a === null || b === null)
            return false;
        if (isMapLike(a) && isMapLike(b)) {
            if (a.size !== b.size)
                return false;
            // Freaking inefficient.... Create PR if you run into this :) Much appreciated!
            return deepEqual(observable.shallowMap(a).entries(), observable.shallowMap(b).entries());
        }
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
            return false;
        for (var prop in a) {
            if (!(prop in b))
                return false;
            if (!deepEqual(a[prop], b[prop]))
                return false;
        }
        return true;
    }
    return false;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
function isMapLike(x) {
    return isES6Map(x) || isObservableMap(x);
}
function isES6Map(thing) {
    if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map)
        return true;
    return false;
}
function primitiveSymbol() {
    return (typeof Symbol === "function" && Symbol.toPrimitive) || "@@toPrimitive";
}
function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? ("" + value) : value;
}

/**
 * These values will persist if global state is reset
 */
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = (function () {
    function MobXGlobals() {
        /**
         * MobXGlobals version.
         * MobX compatiblity with other versions loaded in memory as long as this version matches.
         * It indicates that the global state still stores similar information
         */
        this.version = 5;
        /**
         * Currently running derivation
         */
        this.trackingDerivation = null;
        /**
         * Are we running a computation currently? (not a reaction)
         */
        this.computationDepth = 0;
        /**
         * Each time a derivation is tracked, it is assigned a unique run-id
         */
        this.runId = 0;
        /**
         * 'guid' for general purpose. Will be persisted amongst resets.
         */
        this.mobxGuid = 0;
        /**
         * Are we in a batch block? (and how many of them)
         */
        this.inBatch = 0;
        /**
         * Observables that don't have observers anymore, and are about to be
         * suspended, unless somebody else accesses it in the same batch
         *
         * @type {IObservable[]}
         */
        this.pendingUnobservations = [];
        /**
         * List of scheduled, not yet executed, reactions.
         */
        this.pendingReactions = [];
        /**
         * Are we currently processing reactions?
         */
        this.isRunningReactions = false;
        /**
         * Is it allowed to change observables at this point?
         * In general, MobX doesn't allow that when running computations and React.render.
         * To ensure that those functions stay pure.
         */
        this.allowStateChanges = true;
        /**
         * If strict mode is enabled, state changes are by default not allowed
         */
        this.strictMode = false;
        /**
         * Used by createTransformer to detect that the global state has been reset.
         */
        this.resetId = 0;
        /**
         * Spy callbacks
         */
        this.spyListeners = [];
        /**
         * Globally attached error handlers that react specifically to errors in reactions
         */
        this.globalReactionErrorHandlers = [];
    }
    return MobXGlobals;
}());
var globalState = new MobXGlobals();
function shareGlobalState() {
    var global = getGlobal();
    var ownState = globalState;
    /**
     * Backward compatibility check
     */
    if (global.__mobservableTrackingStack || global.__mobservableViewStack)
        throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== ownState.version)
        throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal)
        globalState = global.__mobxGlobal;
    else
        global.__mobxGlobal = ownState;
}
function getGlobalState() {
    return globalState;
}

/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState[key] = defaultGlobals[key];
    globalState.allowStateChanges = !globalState.strictMode;
}

function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function addObserver(observable, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState)
        observable.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didnt add node");
}
function removeObserver(observable, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    if (observable.observers.length === 1) {
        // deleting last observer
        observable.observers.length = 0;
        queueForUnobservation(observable);
    }
    else {
        // deleting from _observersIndexes is straight forward, to delete from _observers, let's swap `node` with last element
        var list = observable.observers;
        var map = observable.observersIndexes;
        var filler = list.pop(); // get last element, which should fill the place of `node`, so the array doesnt have holes
        if (filler !== node) {
            var index = map[node.__mapid] || 0; // getting index of `node`. this is the only place we actually use map.
            if (index) {
                map[filler.__mapid] = index;
            }
            else {
                delete map[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map[node.__mapid];
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, shuold only queue for unobservation unobserved observables");
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        // the batch is actually about to finish, all unobserving should happen here.
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable = list[i];
            observable.isPendingUnobservation = false;
            if (observable.observers.length === 0) {
                observable.onBecomeUnobserved();
                // NOTE: onBecomeUnobserved might push to `pendingUnobservations`
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    }
    else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged(observable) {
    // invariantLOS(observable, "changed start");
    if (observable.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable.lowestObserverState = exports.IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE)
            d.onBecomeStale();
        d.dependenciesState = exports.IDerivationState.STALE;
    }
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed(observable) {
    // invariantLOS(observable, "confirmed start");
    if (observable.lowestObserverState === exports.IDerivationState.STALE)
        return;
    observable.lowestObserverState = exports.IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === exports.IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = exports.IDerivationState.STALE;
        else if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE)
            observable.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
    }
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged(observable) {
    // invariantLOS(observable, "maybe start");
    if (observable.lowestObserverState !== exports.IDerivationState.UP_TO_DATE)
        return;
    observable.lowestObserverState = exports.IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
            d.dependenciesState = exports.IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
    // invariantLOS(observable, "maybe end");
}

(function (IDerivationState) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // shallow dependency changed
    // will need to recompute when it's needed
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(exports.IDerivationState || (exports.IDerivationState = {}));
var CaughtException = (function () {
    function CaughtException(cause) {
        this.cause = cause;
        // Empty
    }
    return CaughtException;
}());
function isCaughtException(e) {
    return e instanceof CaughtException;
}
/**
 * Finds out wether any dependency of derivation actually changed
 * If dependenciesState is 1 it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over dependencies in the same order they were reported and stoping on first change
 * all recalculations are called only for ComputedValues that will be tracked anyway by derivation.
 * That is because we assume that if first x dependencies of derivation doesn't change
 * than derivation shuold run the same way up until accessing x-th dependency.
 */
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case exports.IDerivationState.UP_TO_DATE: return false;
        case exports.IDerivationState.NOT_TRACKING:
        case exports.IDerivationState.STALE: return true;
        case exports.IDerivationState.POSSIBLY_STALE: {
            var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue(obj)) {
                    try {
                        obj.get();
                    }
                    catch (e) {
                        // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                    // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                    // and `derivation` is an observer of `obj`
                    if (derivation.dependenciesState === exports.IDerivationState.STALE) {
                        untrackedEnd(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            return false;
        }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers$$1 = atom.observers.length > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState.computationDepth > 0 && hasObservers$$1)
        fail(getMessage("m031") + atom.name);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState.allowStateChanges && hasObservers$$1)
        fail(getMessage(globalState.strictMode ? "m030a" : "m030b") + atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction(derivation, f, context) {
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    try {
        result = f.call(context);
    }
    catch (e) {
        result = new CaughtException(e);
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    var lowestNewObservingDerivationState = exports.IDerivationState.UP_TO_DATE;
    derivation.newObserving = null; // newObserving shouldn't be needed outside tracking
    // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurence, change to 1 and keep it
    //   1: extra occurence, drop it
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
        // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
    // Some new observed derivations might become stale during this derivation computation
    // so say had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== exports.IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--)
        removeObserver(obs[i], derivation);
    derivation.dependenciesState = exports.IDerivationState.NOT_TRACKING;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === exports.IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = exports.IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = exports.IDerivationState.UP_TO_DATE;
}

var Reaction = (function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) { name = "Reaction@" + getNextId(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    // onInvalidate didn't trigger track right away..
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving(this);
        }
        if (isCaughtException(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this;
        var messageToUser = getMessage("m037");
        console.error(message || messageToUser /* latter will not be true, make sure uglify doesn't remove */, error);
        /** If debugging brough you here, please, read the above message :-). Tnx! */
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                message: message,
                error: error,
                object: this
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this); // if disposed while running, clean up later. Maybe not optimal, but rare case
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        r.onError = registerErrorHandler;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
        return ("\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this._isRunning) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n");
    };
    return Reaction;
}());
function registerErrorHandler(handler) {
    invariant(this && this.$mobx && isReaction(this.$mobx), "Invalid `this`");
    invariant(!this.$mobx.errorHandler, "Only one onErrorHandler can be registered");
    this.$mobx.errorHandler = handler;
}
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState.inBatch > 0 || globalState.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations."
                + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0); // clear reactions
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}

function asReference(value) {
    deprecated("asReference is deprecated, use observable.ref instead");
    return observable.ref(value);
}
function asStructure(value) {
    deprecated("asStructure is deprecated. Use observable.struct, computed.struct or reaction options instead.");
    return observable.struct(value);
}
function asFlat(value) {
    deprecated("asFlat is deprecated, use observable.shallow instead");
    return observable.shallow(value);
}
function asMap(data) {
    deprecated("asMap is deprecated, use observable.map or observable.shallowMap instead");
    return observable.map(data || {});
}

function createComputedDecorator(compareStructural) {
    return createClassPropertyDecorator(function (target, name, _, __, originalDescriptor) {
        invariant(typeof originalDescriptor !== "undefined", getMessage("m009"));
        invariant(typeof originalDescriptor.get === "function", getMessage("m010"));
        var adm = asObservableObject(target, "");
        defineComputedProperty(adm, name, originalDescriptor.get, originalDescriptor.set, compareStructural, false);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined)
            return undefined;
        return observable.get();
    }, function (name, value) {
        this.$mobx.values[name].set(value);
    }, false, false);
}
var computedDecorator = createComputedDecorator(false);
var computedStructDecorator = createComputedDecorator(true);
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed = (function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        return computedDecorator.apply(null, arguments);
    }
    invariant(typeof arg1 === "function", getMessage("m011"));
    invariant(arguments.length < 3, getMessage("m012"));
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.setter = typeof arg2 === "function" ? arg2 : opts.setter;
    return new ComputedValue(arg1, opts.context, opts.compareStructural || opts.struct || false, opts.name || arg1.name || "", opts.setter);
});
computed.struct = computedStructDecorator;

function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, getMessage("m036"));
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return getAtom(anyThing._keys);
            var observable = anyThing._data[property] || anyThing._hasMap[property];
            invariant(!!observable, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        runLazyInitializers(thing);
        if (isObservableObject(thing)) {
            if (!property)
                return fail("please specify a property");
            var observable = thing.$mobx.values[property];
            invariant(!!observable, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            // disposer function
            return thing.$mobx;
        }
    }
    return fail("Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined)
        return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
        return thing;
    if (isObservableMap(thing))
        return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    runLazyInitializers(thing);
    if (thing.$mobx)
        return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom(thing, property);
    else if (isObservableObject(thing) || isObservableMap(thing))
        named = getAdministration(thing);
    else
        named = getAtom(thing); // valid for arrays as well
    return named.name;
}

function isComputed(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false)
            return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}

function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}

function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}

/**
    * expr can be used to create temporarily views inside views.
    * This can be improved to improve performance if a value changes often, but usually doesn't affect the outcome of an expression.
    *
    * In the following example the expression prevents that a component is rerender _each time_ the selection changes;
    * instead it will only rerenders when the current todo is (de)selected.
    *
    * reactiveComponent((props) => {
    *     const todo = props.todo;
    *     const isSelected = mobx.expr(() => props.viewState.selection === todo);
    *     return <div className={isSelected ? "todo todo-selected" : "todo"}>{todo.title}</div>
    * });
    *
    */
function expr(expr, scope) {
    if (!isComputingDerivation())
        console.warn(getMessage("m013"));
    // optimization: would be more efficient if the expr itself wouldn't be evaluated first on the next change, but just a 'changed' signal would be fired
    return computed(expr, { context: scope }).get();
}

// internal overload
function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) { detectCycles = true; }
    if (__alreadySeen === void 0) { __alreadySeen = []; }
    // optimization: using ES6 map would be more efficient!
    // optimization: lift this function outside toJS, this makes recursion expensive
    function cache(value) {
        if (detectCycles)
            __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null)
            __alreadySeen = [];
        if (detectCycles && source !== null && typeof source === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++)
                if (__alreadySeen[i][0] === source)
                    return __alreadySeen[i][1];
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++)
                res[i] = toAdd[i];
            return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source)
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
            return res_1;
        }
        if (isObservableValue(source))
            return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}

function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    // Memoizes: object id -> reactive view that applies transformer to the object
    var objectCache = {};
    // If the resetId changes, we will clear the object cache, see #163
    // This construction is used to avoid leaking refs to the objectCache directly
    var resetId = globalState.resetId;
    // Local transformer class specifically for this transformer
    var Transformer = (function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            var _this = _super.call(this, function () { return transformer(sourceObject); }, undefined, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined) || this;
            _this.sourceIdentifier = sourceIdentifier;
            _this.sourceObject = sourceObject;
            return _this;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup)
                onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue));
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer)
            return reactiveTransformer.get();
        // Not in cache; create a reactive view
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
function getMemoizationId(object) {
    if (typeof object === 'string' || typeof object === 'number')
        return object;
    if (object === null || typeof object !== "object")
        throw new Error("[mobx] transform expected some kind of object or primitive value, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}

function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing)
                return log(getMessage("m024"));
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing))
        return log(thing.whyRun());
    else if (isReaction(thing))
        return log(thing.whyRun());
    return fail(getMessage("m025"));
}

function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node))
        result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}

function interceptReads(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
    }
    else if (isObservableObject(thing)) {
        if (typeof propOrHandler !== "string")
            return fail("InterceptReads can only be used with a specific property, not with an object in general");
        target = getAdministration(thing, propOrHandler);
    }
    else {
        return fail("Expected observable map, object or array as first array");
    }
    if (target.dehancer !== undefined)
        return fail("An intercept reader was already established");
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function () {
        target.dehancer = undefined;
    };
}

/**
 * (c) Michel Weststrate 2015 - 2016
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
var extras = {
    allowStateChanges: allowStateChanges,
    deepEqual: deepEqual,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getAdministration: getAdministration,
    getGlobalState: getGlobalState,
    getObserverTree: getObserverTree,
    interceptReads: interceptReads,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    onReactionError: onReactionError,
    reserveArrayBuffer: reserveArrayBuffer,
    resetGlobalState: resetGlobalState,
    shareGlobalState: shareGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    setReactionScheduler: setReactionScheduler
};
var _exports = (typeof exports !== 'undefined'
    ? exports
    : typeof module !== 'undefined' && typeof module.exports !== 'undefined'
        ? module.exports
        : {} /* what to do here, throw? */);
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({ spy: spy, extras: extras });
}
// TODO: remove in 4.0, temporarily incompatibility fix for mobx-react@4.1.0 which accidentally uses default exports
_exports['default'] = _exports;

exports.extras = extras;
exports.Reaction = Reaction;
exports.untracked = untracked;
exports.Atom = Atom;
exports.BaseAtom = BaseAtom;
exports.useStrict = useStrict;
exports.isStrictModeEnabled = isStrictModeEnabled;
exports.spy = spy;
exports.asReference = asReference;
exports.asFlat = asFlat;
exports.asStructure = asStructure;
exports.asMap = asMap;
exports.isModifierDescriptor = isModifierDescriptor;
exports.isObservableObject = isObservableObject;
exports.isBoxedObservable = isObservableValue;
exports.isObservableArray = isObservableArray;
exports.ObservableMap = ObservableMap;
exports.isObservableMap = isObservableMap;
exports.map = map;
exports.transaction = transaction;
exports.observable = observable;
exports.IObservableFactories = IObservableFactories;
exports.computed = computed;
exports.isObservable = isObservable;
exports.isComputed = isComputed;
exports.extendObservable = extendObservable;
exports.extendShallowObservable = extendShallowObservable;
exports.observe = observe;
exports.intercept = intercept;
exports.autorun = autorun;
exports.autorunAsync = autorunAsync;
exports.when = when;
exports.reaction = reaction;
exports.action = action;
exports.isAction = isAction;
exports.runInAction = runInAction;
exports.expr = expr;
exports.toJS = toJS;
exports.createTransformer = createTransformer;
exports.whyRun = whyRun;
exports.isArrayLike = isArrayLike;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if ("'production'" !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if ("'production'" !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

},{"./lib/ReactPropTypesSecret":48,"fbjs/lib/invariant":5,"fbjs/lib/warning":6}],45:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":48,"fbjs/lib/emptyFunction":4,"fbjs/lib/invariant":5}],46:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if ("'production'" !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("'production'" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      "'production'" !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      "'production'" !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./checkPropTypes":44,"./lib/ReactPropTypesSecret":48,"fbjs/lib/emptyFunction":4,"fbjs/lib/invariant":5,"fbjs/lib/warning":6}],47:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if ("'production'" !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

},{"./factoryWithThrowingShims":45,"./factoryWithTypeCheckers":46}],48:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],49:[function(require,module,exports){
var SplitPane = require('./lib/SplitPane');

module.exports = SplitPane;

},{"./lib/SplitPane":52}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

var Pane = function (_React$Component) {
    _inherits(Pane, _React$Component);

    function Pane(props) {
        _classCallCheck(this, Pane);

        var _this = _possibleConstructorReturn(this, (Pane.__proto__ || Object.getPrototypeOf(Pane)).call(this, props));

        _this.state = { size: _this.props.size };
        return _this;
    }

    _createClass(Pane, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                prefixer = _props.prefixer,
                split = _props.split,
                styleProps = _props.style;
            var size = this.state.size;

            var classes = ['Pane', split, className];

            var style = _extends({}, styleProps || {}, {
                flex: 1,
                position: 'relative',
                outline: 'none'
            });

            if (size !== undefined) {
                if (split === 'vertical') {
                    style.width = size;
                } else {
                    style.height = size;
                    style.display = 'flex';
                }
                style.flex = 'none';
            }

            return _react2.default.createElement('div', { className: classes.join(' '), style: prefixer.prefix(style) }, children);
        }
    }]);

    return Pane;
}(_react2.default.Component);

Pane.propTypes = {
    className: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node.isRequired,
    prefixer: _propTypes2.default.instanceOf(_inlineStylePrefixer2.default).isRequired,
    size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    split: _propTypes2.default.oneOf(['vertical', 'horizontal']),
    style: _reactStyleProptype2.default
};

Pane.defaultProps = {
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT })
};

exports.default = Pane;
module.exports = exports['default'];

},{"inline-style-prefixer":10,"prop-types":47,"react":"react","react-style-proptype":54}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

var Resizer = function (_React$Component) {
    _inherits(Resizer, _React$Component);

    function Resizer() {
        _classCallCheck(this, Resizer);

        return _possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
    }

    _createClass(Resizer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                _onClick = _props.onClick,
                _onDoubleClick = _props.onDoubleClick,
                _onMouseDown = _props.onMouseDown,
                _onTouchEnd = _props.onTouchEnd,
                _onTouchStart = _props.onTouchStart,
                prefixer = _props.prefixer,
                resizerClassName = _props.resizerClassName,
                split = _props.split,
                style = _props.style;

            var classes = [resizerClassName, split, className];

            return _react2.default.createElement('span', {
                className: classes.join(' '),
                style: prefixer.prefix(style) || {},
                onMouseDown: function onMouseDown(event) {
                    return _onMouseDown(event);
                },
                onTouchStart: function onTouchStart(event) {
                    event.preventDefault();
                    _onTouchStart(event);
                },
                onTouchEnd: function onTouchEnd(event) {
                    event.preventDefault();
                    _onTouchEnd(event);
                },
                onClick: function onClick(event) {
                    if (_onClick) {
                        event.preventDefault();
                        _onClick(event);
                    }
                },
                onDoubleClick: function onDoubleClick(event) {
                    if (_onDoubleClick) {
                        event.preventDefault();
                        _onDoubleClick(event);
                    }
                }
            });
        }
    }]);

    return Resizer;
}(_react2.default.Component);

Resizer.propTypes = {
    className: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func,
    onDoubleClick: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func.isRequired,
    onTouchStart: _propTypes2.default.func.isRequired,
    onTouchEnd: _propTypes2.default.func.isRequired,
    prefixer: _propTypes2.default.instanceOf(_inlineStylePrefixer2.default).isRequired,
    split: _propTypes2.default.oneOf(['vertical', 'horizontal']),
    style: _reactStyleProptype2.default,
    resizerClassName: _propTypes2.default.string.isRequired
};

Resizer.defaultProps = {
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
    resizerClassName: 'Resizer'
};

exports.default = Resizer;
module.exports = exports['default'];

},{"inline-style-prefixer":10,"prop-types":47,"react":"react","react-style-proptype":54}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

function unFocus(document, window) {
    if (document.selection) {
        document.selection.empty();
    } else {
        try {
            window.getSelection().removeAllRanges();
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
}

var SplitPane = function (_React$Component) {
    _inherits(SplitPane, _React$Component);

    function SplitPane() {
        _classCallCheck(this, SplitPane);

        var _this = _possibleConstructorReturn(this, (SplitPane.__proto__ || Object.getPrototypeOf(SplitPane)).call(this));

        _this.onMouseDown = _this.onMouseDown.bind(_this);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onMouseMove = _this.onMouseMove.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onMouseUp = _this.onMouseUp.bind(_this);

        _this.state = {
            active: false,
            resized: false
        };
        return _this;
    }

    _createClass(SplitPane, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setSize(this.props, this.state);
            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('touchmove', this.onTouchMove);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setSize(props, this.state);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('touchmove', this.onTouchMove);
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
            this.onTouchStart(eventWithTouches);
        }
    }, {
        key: 'onTouchStart',
        value: function onTouchStart(event) {
            var _props = this.props,
                allowResize = _props.allowResize,
                onDragStarted = _props.onDragStarted,
                split = _props.split;

            if (allowResize) {
                unFocus(document, window);
                var position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
                if (typeof onDragStarted === 'function') {
                    onDragStarted();
                }
                this.setState({
                    active: true,
                    position: position
                });
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            var eventWithTouches = _extends({}, event, { touches: [{ clientX: event.clientX, clientY: event.clientY }] });
            this.onTouchMove(eventWithTouches);
        }
    }, {
        key: 'onTouchMove',
        value: function onTouchMove(event) {
            var _props2 = this.props,
                allowResize = _props2.allowResize,
                maxSize = _props2.maxSize,
                minSize = _props2.minSize,
                onChange = _props2.onChange,
                split = _props2.split;
            var _state = this.state,
                active = _state.active,
                position = _state.position;

            if (allowResize && active) {
                unFocus(document, window);
                var isPrimaryFirst = this.props.primary === 'first';
                var ref = isPrimaryFirst ? this.pane1 : this.pane2;
                if (ref) {
                    var node = _reactDom2.default.findDOMNode(ref);

                    if (node.getBoundingClientRect) {
                        var width = node.getBoundingClientRect().width;
                        var height = node.getBoundingClientRect().height;
                        var current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
                        var size = split === 'vertical' ? width : height;
                        var newPosition = isPrimaryFirst ? position - current : current - position;

                        var newMaxSize = maxSize;
                        if (maxSize !== undefined && maxSize <= 0) {
                            var splPane = this.splitPane;
                            if (split === 'vertical') {
                                newMaxSize = splPane.getBoundingClientRect().width + maxSize;
                            } else {
                                newMaxSize = splPane.getBoundingClientRect().height + maxSize;
                            }
                        }

                        var newSize = size - newPosition;

                        if (newSize < minSize) {
                            newSize = minSize;
                        } else if (maxSize !== undefined && newSize > newMaxSize) {
                            newSize = newMaxSize;
                        } else {
                            this.setState({
                                position: current,
                                resized: true
                            });
                        }

                        if (onChange) onChange(newSize);
                        this.setState({ draggedSize: newSize });
                        ref.setState({ size: newSize });
                    }
                }
            }
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            var _props3 = this.props,
                allowResize = _props3.allowResize,
                onDragFinished = _props3.onDragFinished;
            var _state2 = this.state,
                active = _state2.active,
                draggedSize = _state2.draggedSize;

            if (allowResize && active) {
                if (typeof onDragFinished === 'function') {
                    onDragFinished(draggedSize);
                }
                this.setState({ active: false });
            }
        }
    }, {
        key: 'setSize',
        value: function setSize(props, state) {
            var primary = this.props.primary;

            var ref = primary === 'first' ? this.pane1 : this.pane2;
            var newSize = void 0;
            if (ref) {
                newSize = props.size || state && state.draggedSize || props.defaultSize || props.minSize;
                ref.setState({
                    size: newSize
                });
                if (props.size !== state.draggedSize) {
                    this.setState({
                        draggedSize: newSize
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props4 = this.props,
                allowResize = _props4.allowResize,
                children = _props4.children,
                className = _props4.className,
                defaultSize = _props4.defaultSize,
                minSize = _props4.minSize,
                onResizerClick = _props4.onResizerClick,
                onResizerDoubleClick = _props4.onResizerDoubleClick,
                paneStyle = _props4.paneStyle,
                pane1StyleProps = _props4.pane1Style,
                pane2StyleProps = _props4.pane2Style,
                primary = _props4.primary,
                prefixer = _props4.prefixer,
                resizerClassName = _props4.resizerClassName,
                resizerStyle = _props4.resizerStyle,
                size = _props4.size,
                split = _props4.split,
                styleProps = _props4.style;

            var disabledClass = allowResize ? '' : 'disabled';

            var style = _extends({}, styleProps || {}, {
                display: 'flex',
                flex: 1,
                height: '100%',
                position: 'absolute',
                outline: 'none',
                overflow: 'hidden',
                MozUserSelect: 'text',
                WebkitUserSelect: 'text',
                msUserSelect: 'text',
                userSelect: 'text'
            });

            if (split === 'vertical') {
                _extends(style, {
                    flexDirection: 'row',
                    left: 0,
                    right: 0
                });
            } else {
                _extends(style, {
                    bottom: 0,
                    flexDirection: 'column',
                    minHeight: '100%',
                    top: 0,
                    width: '100%'
                });
            }

            var classes = ['SplitPane', className, split, disabledClass];
            var pane1Style = prefixer.prefix(_extends({}, paneStyle || {}, pane1StyleProps || {}));
            var pane2Style = prefixer.prefix(_extends({}, paneStyle || {}, pane2StyleProps || {}));

            return _react2.default.createElement('div', {
                className: classes.join(' '),
                ref: function ref(node) {
                    _this2.splitPane = node;
                },
                style: prefixer.prefix(style)
            }, _react2.default.createElement(_Pane2.default, {
                className: 'Pane1',
                key: 'pane1',
                ref: function ref(node) {
                    _this2.pane1 = node;
                },
                size: primary === 'first' ? size || defaultSize || minSize : undefined,
                split: split,
                style: pane1Style
            }, children[0]), _react2.default.createElement(_Resizer2.default, {
                className: disabledClass,
                onClick: onResizerClick,
                onDoubleClick: onResizerDoubleClick,
                onMouseDown: this.onMouseDown,
                onTouchStart: this.onTouchStart,
                onTouchEnd: this.onMouseUp,
                key: 'resizer',
                ref: function ref(node) {
                    _this2.resizer = node;
                },
                resizerClassName: resizerClassName,
                split: split,
                style: resizerStyle || {}
            }), _react2.default.createElement(_Pane2.default, {
                className: 'Pane2',
                key: 'pane2',
                ref: function ref(node) {
                    _this2.pane2 = node;
                },
                size: primary === 'second' ? size || defaultSize || minSize : undefined,
                split: split,
                style: pane2Style
            }, children[1]));
        }
    }]);

    return SplitPane;
}(_react2.default.Component);

SplitPane.propTypes = {
    allowResize: _propTypes2.default.bool,
    children: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired,
    className: _propTypes2.default.string,
    primary: _propTypes2.default.oneOf(['first', 'second']),
    minSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    maxSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    // eslint-disable-next-line react/no-unused-prop-types
    defaultSize: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    split: _propTypes2.default.oneOf(['vertical', 'horizontal']),
    onDragStarted: _propTypes2.default.func,
    onDragFinished: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onResizerClick: _propTypes2.default.func,
    onResizerDoubleClick: _propTypes2.default.func,
    prefixer: _propTypes2.default.instanceOf(_inlineStylePrefixer2.default).isRequired,
    style: _reactStyleProptype2.default,
    resizerStyle: _reactStyleProptype2.default,
    paneStyle: _reactStyleProptype2.default,
    pane1Style: _reactStyleProptype2.default,
    pane2Style: _reactStyleProptype2.default,
    resizerClassName: _propTypes2.default.string
};

SplitPane.defaultProps = {
    allowResize: true,
    minSize: 50,
    prefixer: new _inlineStylePrefixer2.default({ userAgent: USER_AGENT }),
    primary: 'first',
    split: 'vertical'
};

exports.default = SplitPane;
module.exports = exports['default'];

},{"./Pane":50,"./Resizer":51,"inline-style-prefixer":10,"prop-types":47,"react":"react","react-dom":"react-dom","react-style-proptype":54}],53:[function(require,module,exports){
// GENERATED DO NOT EDIT
module.exports = [
  "alignContent",
  "MozAlignContent",
  "WebkitAlignContent",
  "MSAlignContent",
  "OAlignContent",
  "alignItems",
  "MozAlignItems",
  "WebkitAlignItems",
  "MSAlignItems",
  "OAlignItems",
  "alignSelf",
  "MozAlignSelf",
  "WebkitAlignSelf",
  "MSAlignSelf",
  "OAlignSelf",
  "all",
  "MozAll",
  "WebkitAll",
  "MSAll",
  "OAll",
  "animation",
  "MozAnimation",
  "WebkitAnimation",
  "MSAnimation",
  "OAnimation",
  "animationDelay",
  "MozAnimationDelay",
  "WebkitAnimationDelay",
  "MSAnimationDelay",
  "OAnimationDelay",
  "animationDirection",
  "MozAnimationDirection",
  "WebkitAnimationDirection",
  "MSAnimationDirection",
  "OAnimationDirection",
  "animationDuration",
  "MozAnimationDuration",
  "WebkitAnimationDuration",
  "MSAnimationDuration",
  "OAnimationDuration",
  "animationFillMode",
  "MozAnimationFillMode",
  "WebkitAnimationFillMode",
  "MSAnimationFillMode",
  "OAnimationFillMode",
  "animationIterationCount",
  "MozAnimationIterationCount",
  "WebkitAnimationIterationCount",
  "MSAnimationIterationCount",
  "OAnimationIterationCount",
  "animationName",
  "MozAnimationName",
  "WebkitAnimationName",
  "MSAnimationName",
  "OAnimationName",
  "animationPlayState",
  "MozAnimationPlayState",
  "WebkitAnimationPlayState",
  "MSAnimationPlayState",
  "OAnimationPlayState",
  "animationTimingFunction",
  "MozAnimationTimingFunction",
  "WebkitAnimationTimingFunction",
  "MSAnimationTimingFunction",
  "OAnimationTimingFunction",
  "backfaceVisibility",
  "MozBackfaceVisibility",
  "WebkitBackfaceVisibility",
  "MSBackfaceVisibility",
  "OBackfaceVisibility",
  "background",
  "MozBackground",
  "WebkitBackground",
  "MSBackground",
  "OBackground",
  "backgroundAttachment",
  "MozBackgroundAttachment",
  "WebkitBackgroundAttachment",
  "MSBackgroundAttachment",
  "OBackgroundAttachment",
  "backgroundBlendMode",
  "MozBackgroundBlendMode",
  "WebkitBackgroundBlendMode",
  "MSBackgroundBlendMode",
  "OBackgroundBlendMode",
  "backgroundClip",
  "MozBackgroundClip",
  "WebkitBackgroundClip",
  "MSBackgroundClip",
  "OBackgroundClip",
  "backgroundColor",
  "MozBackgroundColor",
  "WebkitBackgroundColor",
  "MSBackgroundColor",
  "OBackgroundColor",
  "backgroundImage",
  "MozBackgroundImage",
  "WebkitBackgroundImage",
  "MSBackgroundImage",
  "OBackgroundImage",
  "backgroundOrigin",
  "MozBackgroundOrigin",
  "WebkitBackgroundOrigin",
  "MSBackgroundOrigin",
  "OBackgroundOrigin",
  "backgroundPosition",
  "MozBackgroundPosition",
  "WebkitBackgroundPosition",
  "MSBackgroundPosition",
  "OBackgroundPosition",
  "backgroundRepeat",
  "MozBackgroundRepeat",
  "WebkitBackgroundRepeat",
  "MSBackgroundRepeat",
  "OBackgroundRepeat",
  "backgroundSize",
  "MozBackgroundSize",
  "WebkitBackgroundSize",
  "MSBackgroundSize",
  "OBackgroundSize",
  "blockSize",
  "MozBlockSize",
  "WebkitBlockSize",
  "MSBlockSize",
  "OBlockSize",
  "border",
  "MozBorder",
  "WebkitBorder",
  "MSBorder",
  "OBorder",
  "borderBlockEnd",
  "MozBorderBlockEnd",
  "WebkitBorderBlockEnd",
  "MSBorderBlockEnd",
  "OBorderBlockEnd",
  "borderBlockEndColor",
  "MozBorderBlockEndColor",
  "WebkitBorderBlockEndColor",
  "MSBorderBlockEndColor",
  "OBorderBlockEndColor",
  "borderBlockEndStyle",
  "MozBorderBlockEndStyle",
  "WebkitBorderBlockEndStyle",
  "MSBorderBlockEndStyle",
  "OBorderBlockEndStyle",
  "borderBlockEndWidth",
  "MozBorderBlockEndWidth",
  "WebkitBorderBlockEndWidth",
  "MSBorderBlockEndWidth",
  "OBorderBlockEndWidth",
  "borderBlockStart",
  "MozBorderBlockStart",
  "WebkitBorderBlockStart",
  "MSBorderBlockStart",
  "OBorderBlockStart",
  "borderBlockStartColor",
  "MozBorderBlockStartColor",
  "WebkitBorderBlockStartColor",
  "MSBorderBlockStartColor",
  "OBorderBlockStartColor",
  "borderBlockStartStyle",
  "MozBorderBlockStartStyle",
  "WebkitBorderBlockStartStyle",
  "MSBorderBlockStartStyle",
  "OBorderBlockStartStyle",
  "borderBlockStartWidth",
  "MozBorderBlockStartWidth",
  "WebkitBorderBlockStartWidth",
  "MSBorderBlockStartWidth",
  "OBorderBlockStartWidth",
  "borderBottom",
  "MozBorderBottom",
  "WebkitBorderBottom",
  "MSBorderBottom",
  "OBorderBottom",
  "borderBottomColor",
  "MozBorderBottomColor",
  "WebkitBorderBottomColor",
  "MSBorderBottomColor",
  "OBorderBottomColor",
  "borderBottomLeftRadius",
  "MozBorderBottomLeftRadius",
  "WebkitBorderBottomLeftRadius",
  "MSBorderBottomLeftRadius",
  "OBorderBottomLeftRadius",
  "borderBottomRightRadius",
  "MozBorderBottomRightRadius",
  "WebkitBorderBottomRightRadius",
  "MSBorderBottomRightRadius",
  "OBorderBottomRightRadius",
  "borderBottomStyle",
  "MozBorderBottomStyle",
  "WebkitBorderBottomStyle",
  "MSBorderBottomStyle",
  "OBorderBottomStyle",
  "borderBottomWidth",
  "MozBorderBottomWidth",
  "WebkitBorderBottomWidth",
  "MSBorderBottomWidth",
  "OBorderBottomWidth",
  "borderCollapse",
  "MozBorderCollapse",
  "WebkitBorderCollapse",
  "MSBorderCollapse",
  "OBorderCollapse",
  "borderColor",
  "MozBorderColor",
  "WebkitBorderColor",
  "MSBorderColor",
  "OBorderColor",
  "borderImage",
  "MozBorderImage",
  "WebkitBorderImage",
  "MSBorderImage",
  "OBorderImage",
  "borderImageOutset",
  "MozBorderImageOutset",
  "WebkitBorderImageOutset",
  "MSBorderImageOutset",
  "OBorderImageOutset",
  "borderImageRepeat",
  "MozBorderImageRepeat",
  "WebkitBorderImageRepeat",
  "MSBorderImageRepeat",
  "OBorderImageRepeat",
  "borderImageSlice",
  "MozBorderImageSlice",
  "WebkitBorderImageSlice",
  "MSBorderImageSlice",
  "OBorderImageSlice",
  "borderImageSource",
  "MozBorderImageSource",
  "WebkitBorderImageSource",
  "MSBorderImageSource",
  "OBorderImageSource",
  "borderImageWidth",
  "MozBorderImageWidth",
  "WebkitBorderImageWidth",
  "MSBorderImageWidth",
  "OBorderImageWidth",
  "borderInlineEnd",
  "MozBorderInlineEnd",
  "WebkitBorderInlineEnd",
  "MSBorderInlineEnd",
  "OBorderInlineEnd",
  "borderInlineEndColor",
  "MozBorderInlineEndColor",
  "WebkitBorderInlineEndColor",
  "MSBorderInlineEndColor",
  "OBorderInlineEndColor",
  "borderInlineEndStyle",
  "MozBorderInlineEndStyle",
  "WebkitBorderInlineEndStyle",
  "MSBorderInlineEndStyle",
  "OBorderInlineEndStyle",
  "borderInlineEndWidth",
  "MozBorderInlineEndWidth",
  "WebkitBorderInlineEndWidth",
  "MSBorderInlineEndWidth",
  "OBorderInlineEndWidth",
  "borderInlineStart",
  "MozBorderInlineStart",
  "WebkitBorderInlineStart",
  "MSBorderInlineStart",
  "OBorderInlineStart",
  "borderInlineStartColor",
  "MozBorderInlineStartColor",
  "WebkitBorderInlineStartColor",
  "MSBorderInlineStartColor",
  "OBorderInlineStartColor",
  "borderInlineStartStyle",
  "MozBorderInlineStartStyle",
  "WebkitBorderInlineStartStyle",
  "MSBorderInlineStartStyle",
  "OBorderInlineStartStyle",
  "borderInlineStartWidth",
  "MozBorderInlineStartWidth",
  "WebkitBorderInlineStartWidth",
  "MSBorderInlineStartWidth",
  "OBorderInlineStartWidth",
  "borderLeft",
  "MozBorderLeft",
  "WebkitBorderLeft",
  "MSBorderLeft",
  "OBorderLeft",
  "borderLeftColor",
  "MozBorderLeftColor",
  "WebkitBorderLeftColor",
  "MSBorderLeftColor",
  "OBorderLeftColor",
  "borderLeftStyle",
  "MozBorderLeftStyle",
  "WebkitBorderLeftStyle",
  "MSBorderLeftStyle",
  "OBorderLeftStyle",
  "borderLeftWidth",
  "MozBorderLeftWidth",
  "WebkitBorderLeftWidth",
  "MSBorderLeftWidth",
  "OBorderLeftWidth",
  "borderRadius",
  "MozBorderRadius",
  "WebkitBorderRadius",
  "MSBorderRadius",
  "OBorderRadius",
  "borderRight",
  "MozBorderRight",
  "WebkitBorderRight",
  "MSBorderRight",
  "OBorderRight",
  "borderRightColor",
  "MozBorderRightColor",
  "WebkitBorderRightColor",
  "MSBorderRightColor",
  "OBorderRightColor",
  "borderRightStyle",
  "MozBorderRightStyle",
  "WebkitBorderRightStyle",
  "MSBorderRightStyle",
  "OBorderRightStyle",
  "borderRightWidth",
  "MozBorderRightWidth",
  "WebkitBorderRightWidth",
  "MSBorderRightWidth",
  "OBorderRightWidth",
  "borderSpacing",
  "MozBorderSpacing",
  "WebkitBorderSpacing",
  "MSBorderSpacing",
  "OBorderSpacing",
  "borderStyle",
  "MozBorderStyle",
  "WebkitBorderStyle",
  "MSBorderStyle",
  "OBorderStyle",
  "borderTop",
  "MozBorderTop",
  "WebkitBorderTop",
  "MSBorderTop",
  "OBorderTop",
  "borderTopColor",
  "MozBorderTopColor",
  "WebkitBorderTopColor",
  "MSBorderTopColor",
  "OBorderTopColor",
  "borderTopLeftRadius",
  "MozBorderTopLeftRadius",
  "WebkitBorderTopLeftRadius",
  "MSBorderTopLeftRadius",
  "OBorderTopLeftRadius",
  "borderTopRightRadius",
  "MozBorderTopRightRadius",
  "WebkitBorderTopRightRadius",
  "MSBorderTopRightRadius",
  "OBorderTopRightRadius",
  "borderTopStyle",
  "MozBorderTopStyle",
  "WebkitBorderTopStyle",
  "MSBorderTopStyle",
  "OBorderTopStyle",
  "borderTopWidth",
  "MozBorderTopWidth",
  "WebkitBorderTopWidth",
  "MSBorderTopWidth",
  "OBorderTopWidth",
  "borderWidth",
  "MozBorderWidth",
  "WebkitBorderWidth",
  "MSBorderWidth",
  "OBorderWidth",
  "bottom",
  "MozBottom",
  "WebkitBottom",
  "MSBottom",
  "OBottom",
  "boxDecorationBreak",
  "MozBoxDecorationBreak",
  "WebkitBoxDecorationBreak",
  "MSBoxDecorationBreak",
  "OBoxDecorationBreak",
  "boxShadow",
  "MozBoxShadow",
  "WebkitBoxShadow",
  "MSBoxShadow",
  "OBoxShadow",
  "boxSizing",
  "MozBoxSizing",
  "WebkitBoxSizing",
  "MSBoxSizing",
  "OBoxSizing",
  "breakAfter",
  "MozBreakAfter",
  "WebkitBreakAfter",
  "MSBreakAfter",
  "OBreakAfter",
  "breakBefore",
  "MozBreakBefore",
  "WebkitBreakBefore",
  "MSBreakBefore",
  "OBreakBefore",
  "breakInside",
  "MozBreakInside",
  "WebkitBreakInside",
  "MSBreakInside",
  "OBreakInside",
  "captionSide",
  "MozCaptionSide",
  "WebkitCaptionSide",
  "MSCaptionSide",
  "OCaptionSide",
  "caretColor",
  "MozCaretColor",
  "WebkitCaretColor",
  "MSCaretColor",
  "OCaretColor",
  "ch",
  "MozCh",
  "WebkitCh",
  "MSCh",
  "OCh",
  "clear",
  "MozClear",
  "WebkitClear",
  "MSClear",
  "OClear",
  "clip",
  "MozClip",
  "WebkitClip",
  "MSClip",
  "OClip",
  "clipPath",
  "MozClipPath",
  "WebkitClipPath",
  "MSClipPath",
  "OClipPath",
  "cm",
  "MozCm",
  "WebkitCm",
  "MSCm",
  "OCm",
  "color",
  "MozColor",
  "WebkitColor",
  "MSColor",
  "OColor",
  "columnCount",
  "MozColumnCount",
  "WebkitColumnCount",
  "MSColumnCount",
  "OColumnCount",
  "columnFill",
  "MozColumnFill",
  "WebkitColumnFill",
  "MSColumnFill",
  "OColumnFill",
  "columnGap",
  "MozColumnGap",
  "WebkitColumnGap",
  "MSColumnGap",
  "OColumnGap",
  "columnRule",
  "MozColumnRule",
  "WebkitColumnRule",
  "MSColumnRule",
  "OColumnRule",
  "columnRuleColor",
  "MozColumnRuleColor",
  "WebkitColumnRuleColor",
  "MSColumnRuleColor",
  "OColumnRuleColor",
  "columnRuleStyle",
  "MozColumnRuleStyle",
  "WebkitColumnRuleStyle",
  "MSColumnRuleStyle",
  "OColumnRuleStyle",
  "columnRuleWidth",
  "MozColumnRuleWidth",
  "WebkitColumnRuleWidth",
  "MSColumnRuleWidth",
  "OColumnRuleWidth",
  "columnSpan",
  "MozColumnSpan",
  "WebkitColumnSpan",
  "MSColumnSpan",
  "OColumnSpan",
  "columnWidth",
  "MozColumnWidth",
  "WebkitColumnWidth",
  "MSColumnWidth",
  "OColumnWidth",
  "columns",
  "MozColumns",
  "WebkitColumns",
  "MSColumns",
  "OColumns",
  "content",
  "MozContent",
  "WebkitContent",
  "MSContent",
  "OContent",
  "counterIncrement",
  "MozCounterIncrement",
  "WebkitCounterIncrement",
  "MSCounterIncrement",
  "OCounterIncrement",
  "counterReset",
  "MozCounterReset",
  "WebkitCounterReset",
  "MSCounterReset",
  "OCounterReset",
  "cursor",
  "MozCursor",
  "WebkitCursor",
  "MSCursor",
  "OCursor",
  "deg",
  "MozDeg",
  "WebkitDeg",
  "MSDeg",
  "ODeg",
  "direction",
  "MozDirection",
  "WebkitDirection",
  "MSDirection",
  "ODirection",
  "display",
  "MozDisplay",
  "WebkitDisplay",
  "MSDisplay",
  "ODisplay",
  "dpcm",
  "MozDpcm",
  "WebkitDpcm",
  "MSDpcm",
  "ODpcm",
  "dpi",
  "MozDpi",
  "WebkitDpi",
  "MSDpi",
  "ODpi",
  "dppx",
  "MozDppx",
  "WebkitDppx",
  "MSDppx",
  "ODppx",
  "em",
  "MozEm",
  "WebkitEm",
  "MSEm",
  "OEm",
  "emptyCells",
  "MozEmptyCells",
  "WebkitEmptyCells",
  "MSEmptyCells",
  "OEmptyCells",
  "ex",
  "MozEx",
  "WebkitEx",
  "MSEx",
  "OEx",
  "filter",
  "MozFilter",
  "WebkitFilter",
  "MSFilter",
  "OFilter",
  "flexBasis",
  "MozFlexBasis",
  "WebkitFlexBasis",
  "MSFlexBasis",
  "OFlexBasis",
  "flexDirection",
  "MozFlexDirection",
  "WebkitFlexDirection",
  "MSFlexDirection",
  "OFlexDirection",
  "flexFlow",
  "MozFlexFlow",
  "WebkitFlexFlow",
  "MSFlexFlow",
  "OFlexFlow",
  "flexGrow",
  "MozFlexGrow",
  "WebkitFlexGrow",
  "MSFlexGrow",
  "OFlexGrow",
  "flexShrink",
  "MozFlexShrink",
  "WebkitFlexShrink",
  "MSFlexShrink",
  "OFlexShrink",
  "flexWrap",
  "MozFlexWrap",
  "WebkitFlexWrap",
  "MSFlexWrap",
  "OFlexWrap",
  "float",
  "MozFloat",
  "WebkitFloat",
  "MSFloat",
  "OFloat",
  "font",
  "MozFont",
  "WebkitFont",
  "MSFont",
  "OFont",
  "fontFamily",
  "MozFontFamily",
  "WebkitFontFamily",
  "MSFontFamily",
  "OFontFamily",
  "fontFeatureSettings",
  "MozFontFeatureSettings",
  "WebkitFontFeatureSettings",
  "MSFontFeatureSettings",
  "OFontFeatureSettings",
  "fontKerning",
  "MozFontKerning",
  "WebkitFontKerning",
  "MSFontKerning",
  "OFontKerning",
  "fontLanguageOverride",
  "MozFontLanguageOverride",
  "WebkitFontLanguageOverride",
  "MSFontLanguageOverride",
  "OFontLanguageOverride",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "fontSizeAdjust",
  "MozFontSizeAdjust",
  "WebkitFontSizeAdjust",
  "MSFontSizeAdjust",
  "OFontSizeAdjust",
  "fontStretch",
  "MozFontStretch",
  "WebkitFontStretch",
  "MSFontStretch",
  "OFontStretch",
  "fontStyle",
  "MozFontStyle",
  "WebkitFontStyle",
  "MSFontStyle",
  "OFontStyle",
  "fontSynthesis",
  "MozFontSynthesis",
  "WebkitFontSynthesis",
  "MSFontSynthesis",
  "OFontSynthesis",
  "fontVariant",
  "MozFontVariant",
  "WebkitFontVariant",
  "MSFontVariant",
  "OFontVariant",
  "fontVariantAlternates",
  "MozFontVariantAlternates",
  "WebkitFontVariantAlternates",
  "MSFontVariantAlternates",
  "OFontVariantAlternates",
  "fontVariantCaps",
  "MozFontVariantCaps",
  "WebkitFontVariantCaps",
  "MSFontVariantCaps",
  "OFontVariantCaps",
  "fontVariantEastAsian",
  "MozFontVariantEastAsian",
  "WebkitFontVariantEastAsian",
  "MSFontVariantEastAsian",
  "OFontVariantEastAsian",
  "fontVariantLigatures",
  "MozFontVariantLigatures",
  "WebkitFontVariantLigatures",
  "MSFontVariantLigatures",
  "OFontVariantLigatures",
  "fontVariantNumeric",
  "MozFontVariantNumeric",
  "WebkitFontVariantNumeric",
  "MSFontVariantNumeric",
  "OFontVariantNumeric",
  "fontVariantPosition",
  "MozFontVariantPosition",
  "WebkitFontVariantPosition",
  "MSFontVariantPosition",
  "OFontVariantPosition",
  "fontWeight",
  "MozFontWeight",
  "WebkitFontWeight",
  "MSFontWeight",
  "OFontWeight",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "grad",
  "MozGrad",
  "WebkitGrad",
  "MSGrad",
  "OGrad",
  "grid",
  "MozGrid",
  "WebkitGrid",
  "MSGrid",
  "OGrid",
  "gridArea",
  "MozGridArea",
  "WebkitGridArea",
  "MSGridArea",
  "OGridArea",
  "gridAutoColumns",
  "MozGridAutoColumns",
  "WebkitGridAutoColumns",
  "MSGridAutoColumns",
  "OGridAutoColumns",
  "gridAutoFlow",
  "MozGridAutoFlow",
  "WebkitGridAutoFlow",
  "MSGridAutoFlow",
  "OGridAutoFlow",
  "gridAutoRows",
  "MozGridAutoRows",
  "WebkitGridAutoRows",
  "MSGridAutoRows",
  "OGridAutoRows",
  "gridColumn",
  "MozGridColumn",
  "WebkitGridColumn",
  "MSGridColumn",
  "OGridColumn",
  "gridColumnEnd",
  "MozGridColumnEnd",
  "WebkitGridColumnEnd",
  "MSGridColumnEnd",
  "OGridColumnEnd",
  "gridColumnGap",
  "MozGridColumnGap",
  "WebkitGridColumnGap",
  "MSGridColumnGap",
  "OGridColumnGap",
  "gridColumnStart",
  "MozGridColumnStart",
  "WebkitGridColumnStart",
  "MSGridColumnStart",
  "OGridColumnStart",
  "gridGap",
  "MozGridGap",
  "WebkitGridGap",
  "MSGridGap",
  "OGridGap",
  "gridRow",
  "MozGridRow",
  "WebkitGridRow",
  "MSGridRow",
  "OGridRow",
  "gridRowEnd",
  "MozGridRowEnd",
  "WebkitGridRowEnd",
  "MSGridRowEnd",
  "OGridRowEnd",
  "gridRowGap",
  "MozGridRowGap",
  "WebkitGridRowGap",
  "MSGridRowGap",
  "OGridRowGap",
  "gridRowStart",
  "MozGridRowStart",
  "WebkitGridRowStart",
  "MSGridRowStart",
  "OGridRowStart",
  "gridTemplate",
  "MozGridTemplate",
  "WebkitGridTemplate",
  "MSGridTemplate",
  "OGridTemplate",
  "gridTemplateAreas",
  "MozGridTemplateAreas",
  "WebkitGridTemplateAreas",
  "MSGridTemplateAreas",
  "OGridTemplateAreas",
  "gridTemplateColumns",
  "MozGridTemplateColumns",
  "WebkitGridTemplateColumns",
  "MSGridTemplateColumns",
  "OGridTemplateColumns",
  "gridTemplateRows",
  "MozGridTemplateRows",
  "WebkitGridTemplateRows",
  "MSGridTemplateRows",
  "OGridTemplateRows",
  "height",
  "MozHeight",
  "WebkitHeight",
  "MSHeight",
  "OHeight",
  "hyphens",
  "MozHyphens",
  "WebkitHyphens",
  "MSHyphens",
  "OHyphens",
  "hz",
  "MozHz",
  "WebkitHz",
  "MSHz",
  "OHz",
  "imageOrientation",
  "MozImageOrientation",
  "WebkitImageOrientation",
  "MSImageOrientation",
  "OImageOrientation",
  "imageRendering",
  "MozImageRendering",
  "WebkitImageRendering",
  "MSImageRendering",
  "OImageRendering",
  "imageResolution",
  "MozImageResolution",
  "WebkitImageResolution",
  "MSImageResolution",
  "OImageResolution",
  "imeMode",
  "MozImeMode",
  "WebkitImeMode",
  "MSImeMode",
  "OImeMode",
  "in",
  "MozIn",
  "WebkitIn",
  "MSIn",
  "OIn",
  "inherit",
  "MozInherit",
  "WebkitInherit",
  "MSInherit",
  "OInherit",
  "initial",
  "MozInitial",
  "WebkitInitial",
  "MSInitial",
  "OInitial",
  "inlineSize",
  "MozInlineSize",
  "WebkitInlineSize",
  "MSInlineSize",
  "OInlineSize",
  "isolation",
  "MozIsolation",
  "WebkitIsolation",
  "MSIsolation",
  "OIsolation",
  "justifyContent",
  "MozJustifyContent",
  "WebkitJustifyContent",
  "MSJustifyContent",
  "OJustifyContent",
  "khz",
  "MozKhz",
  "WebkitKhz",
  "MSKhz",
  "OKhz",
  "left",
  "MozLeft",
  "WebkitLeft",
  "MSLeft",
  "OLeft",
  "letterSpacing",
  "MozLetterSpacing",
  "WebkitLetterSpacing",
  "MSLetterSpacing",
  "OLetterSpacing",
  "lineBreak",
  "MozLineBreak",
  "WebkitLineBreak",
  "MSLineBreak",
  "OLineBreak",
  "lineHeight",
  "MozLineHeight",
  "WebkitLineHeight",
  "MSLineHeight",
  "OLineHeight",
  "listStyle",
  "MozListStyle",
  "WebkitListStyle",
  "MSListStyle",
  "OListStyle",
  "listStyleImage",
  "MozListStyleImage",
  "WebkitListStyleImage",
  "MSListStyleImage",
  "OListStyleImage",
  "listStylePosition",
  "MozListStylePosition",
  "WebkitListStylePosition",
  "MSListStylePosition",
  "OListStylePosition",
  "listStyleType",
  "MozListStyleType",
  "WebkitListStyleType",
  "MSListStyleType",
  "OListStyleType",
  "margin",
  "MozMargin",
  "WebkitMargin",
  "MSMargin",
  "OMargin",
  "marginBlockEnd",
  "MozMarginBlockEnd",
  "WebkitMarginBlockEnd",
  "MSMarginBlockEnd",
  "OMarginBlockEnd",
  "marginBlockStart",
  "MozMarginBlockStart",
  "WebkitMarginBlockStart",
  "MSMarginBlockStart",
  "OMarginBlockStart",
  "marginBottom",
  "MozMarginBottom",
  "WebkitMarginBottom",
  "MSMarginBottom",
  "OMarginBottom",
  "marginInlineEnd",
  "MozMarginInlineEnd",
  "WebkitMarginInlineEnd",
  "MSMarginInlineEnd",
  "OMarginInlineEnd",
  "marginInlineStart",
  "MozMarginInlineStart",
  "WebkitMarginInlineStart",
  "MSMarginInlineStart",
  "OMarginInlineStart",
  "marginLeft",
  "MozMarginLeft",
  "WebkitMarginLeft",
  "MSMarginLeft",
  "OMarginLeft",
  "marginRight",
  "MozMarginRight",
  "WebkitMarginRight",
  "MSMarginRight",
  "OMarginRight",
  "marginTop",
  "MozMarginTop",
  "WebkitMarginTop",
  "MSMarginTop",
  "OMarginTop",
  "mask",
  "MozMask",
  "WebkitMask",
  "MSMask",
  "OMask",
  "maskClip",
  "MozMaskClip",
  "WebkitMaskClip",
  "MSMaskClip",
  "OMaskClip",
  "maskComposite",
  "MozMaskComposite",
  "WebkitMaskComposite",
  "MSMaskComposite",
  "OMaskComposite",
  "maskImage",
  "MozMaskImage",
  "WebkitMaskImage",
  "MSMaskImage",
  "OMaskImage",
  "maskMode",
  "MozMaskMode",
  "WebkitMaskMode",
  "MSMaskMode",
  "OMaskMode",
  "maskOrigin",
  "MozMaskOrigin",
  "WebkitMaskOrigin",
  "MSMaskOrigin",
  "OMaskOrigin",
  "maskPosition",
  "MozMaskPosition",
  "WebkitMaskPosition",
  "MSMaskPosition",
  "OMaskPosition",
  "maskRepeat",
  "MozMaskRepeat",
  "WebkitMaskRepeat",
  "MSMaskRepeat",
  "OMaskRepeat",
  "maskSize",
  "MozMaskSize",
  "WebkitMaskSize",
  "MSMaskSize",
  "OMaskSize",
  "maskType",
  "MozMaskType",
  "WebkitMaskType",
  "MSMaskType",
  "OMaskType",
  "maxHeight",
  "MozMaxHeight",
  "WebkitMaxHeight",
  "MSMaxHeight",
  "OMaxHeight",
  "maxWidth",
  "MozMaxWidth",
  "WebkitMaxWidth",
  "MSMaxWidth",
  "OMaxWidth",
  "minBlockSize",
  "MozMinBlockSize",
  "WebkitMinBlockSize",
  "MSMinBlockSize",
  "OMinBlockSize",
  "minHeight",
  "MozMinHeight",
  "WebkitMinHeight",
  "MSMinHeight",
  "OMinHeight",
  "minInlineSize",
  "MozMinInlineSize",
  "WebkitMinInlineSize",
  "MSMinInlineSize",
  "OMinInlineSize",
  "minWidth",
  "MozMinWidth",
  "WebkitMinWidth",
  "MSMinWidth",
  "OMinWidth",
  "mixBlendMode",
  "MozMixBlendMode",
  "WebkitMixBlendMode",
  "MSMixBlendMode",
  "OMixBlendMode",
  "mm",
  "MozMm",
  "WebkitMm",
  "MSMm",
  "OMm",
  "ms",
  "MozMs",
  "WebkitMs",
  "MSMs",
  "OMs",
  "objectFit",
  "MozObjectFit",
  "WebkitObjectFit",
  "MSObjectFit",
  "OObjectFit",
  "objectPosition",
  "MozObjectPosition",
  "WebkitObjectPosition",
  "MSObjectPosition",
  "OObjectPosition",
  "offsetBlockEnd",
  "MozOffsetBlockEnd",
  "WebkitOffsetBlockEnd",
  "MSOffsetBlockEnd",
  "OOffsetBlockEnd",
  "offsetBlockStart",
  "MozOffsetBlockStart",
  "WebkitOffsetBlockStart",
  "MSOffsetBlockStart",
  "OOffsetBlockStart",
  "offsetInlineEnd",
  "MozOffsetInlineEnd",
  "WebkitOffsetInlineEnd",
  "MSOffsetInlineEnd",
  "OOffsetInlineEnd",
  "offsetInlineStart",
  "MozOffsetInlineStart",
  "WebkitOffsetInlineStart",
  "MSOffsetInlineStart",
  "OOffsetInlineStart",
  "opacity",
  "MozOpacity",
  "WebkitOpacity",
  "MSOpacity",
  "OOpacity",
  "order",
  "MozOrder",
  "WebkitOrder",
  "MSOrder",
  "OOrder",
  "orphans",
  "MozOrphans",
  "WebkitOrphans",
  "MSOrphans",
  "OOrphans",
  "outline",
  "MozOutline",
  "WebkitOutline",
  "MSOutline",
  "OOutline",
  "outlineColor",
  "MozOutlineColor",
  "WebkitOutlineColor",
  "MSOutlineColor",
  "OOutlineColor",
  "outlineOffset",
  "MozOutlineOffset",
  "WebkitOutlineOffset",
  "MSOutlineOffset",
  "OOutlineOffset",
  "outlineStyle",
  "MozOutlineStyle",
  "WebkitOutlineStyle",
  "MSOutlineStyle",
  "OOutlineStyle",
  "outlineWidth",
  "MozOutlineWidth",
  "WebkitOutlineWidth",
  "MSOutlineWidth",
  "OOutlineWidth",
  "overflow",
  "MozOverflow",
  "WebkitOverflow",
  "MSOverflow",
  "OOverflow",
  "overflowWrap",
  "MozOverflowWrap",
  "WebkitOverflowWrap",
  "MSOverflowWrap",
  "OOverflowWrap",
  "overflowX",
  "MozOverflowX",
  "WebkitOverflowX",
  "MSOverflowX",
  "OOverflowX",
  "overflowY",
  "MozOverflowY",
  "WebkitOverflowY",
  "MSOverflowY",
  "OOverflowY",
  "padding",
  "MozPadding",
  "WebkitPadding",
  "MSPadding",
  "OPadding",
  "paddingBlockEnd",
  "MozPaddingBlockEnd",
  "WebkitPaddingBlockEnd",
  "MSPaddingBlockEnd",
  "OPaddingBlockEnd",
  "paddingBlockStart",
  "MozPaddingBlockStart",
  "WebkitPaddingBlockStart",
  "MSPaddingBlockStart",
  "OPaddingBlockStart",
  "paddingBottom",
  "MozPaddingBottom",
  "WebkitPaddingBottom",
  "MSPaddingBottom",
  "OPaddingBottom",
  "paddingInlineEnd",
  "MozPaddingInlineEnd",
  "WebkitPaddingInlineEnd",
  "MSPaddingInlineEnd",
  "OPaddingInlineEnd",
  "paddingInlineStart",
  "MozPaddingInlineStart",
  "WebkitPaddingInlineStart",
  "MSPaddingInlineStart",
  "OPaddingInlineStart",
  "paddingLeft",
  "MozPaddingLeft",
  "WebkitPaddingLeft",
  "MSPaddingLeft",
  "OPaddingLeft",
  "paddingRight",
  "MozPaddingRight",
  "WebkitPaddingRight",
  "MSPaddingRight",
  "OPaddingRight",
  "paddingTop",
  "MozPaddingTop",
  "WebkitPaddingTop",
  "MSPaddingTop",
  "OPaddingTop",
  "pageBreakAfter",
  "MozPageBreakAfter",
  "WebkitPageBreakAfter",
  "MSPageBreakAfter",
  "OPageBreakAfter",
  "pageBreakBefore",
  "MozPageBreakBefore",
  "WebkitPageBreakBefore",
  "MSPageBreakBefore",
  "OPageBreakBefore",
  "pageBreakInside",
  "MozPageBreakInside",
  "WebkitPageBreakInside",
  "MSPageBreakInside",
  "OPageBreakInside",
  "pc",
  "MozPc",
  "WebkitPc",
  "MSPc",
  "OPc",
  "perspective",
  "MozPerspective",
  "WebkitPerspective",
  "MSPerspective",
  "OPerspective",
  "perspectiveOrigin",
  "MozPerspectiveOrigin",
  "WebkitPerspectiveOrigin",
  "MSPerspectiveOrigin",
  "OPerspectiveOrigin",
  "pointerEvents",
  "MozPointerEvents",
  "WebkitPointerEvents",
  "MSPointerEvents",
  "OPointerEvents",
  "position",
  "MozPosition",
  "WebkitPosition",
  "MSPosition",
  "OPosition",
  "pt",
  "MozPt",
  "WebkitPt",
  "MSPt",
  "OPt",
  "px",
  "MozPx",
  "WebkitPx",
  "MSPx",
  "OPx",
  "q",
  "MozQ",
  "WebkitQ",
  "MSQ",
  "OQ",
  "quotes",
  "MozQuotes",
  "WebkitQuotes",
  "MSQuotes",
  "OQuotes",
  "rad",
  "MozRad",
  "WebkitRad",
  "MSRad",
  "ORad",
  "rem",
  "MozRem",
  "WebkitRem",
  "MSRem",
  "ORem",
  "resize",
  "MozResize",
  "WebkitResize",
  "MSResize",
  "OResize",
  "revert",
  "MozRevert",
  "WebkitRevert",
  "MSRevert",
  "ORevert",
  "right",
  "MozRight",
  "WebkitRight",
  "MSRight",
  "ORight",
  "rubyAlign",
  "MozRubyAlign",
  "WebkitRubyAlign",
  "MSRubyAlign",
  "ORubyAlign",
  "rubyMerge",
  "MozRubyMerge",
  "WebkitRubyMerge",
  "MSRubyMerge",
  "ORubyMerge",
  "rubyPosition",
  "MozRubyPosition",
  "WebkitRubyPosition",
  "MSRubyPosition",
  "ORubyPosition",
  "s",
  "MozS",
  "WebkitS",
  "MSS",
  "OS",
  "scrollBehavior",
  "MozScrollBehavior",
  "WebkitScrollBehavior",
  "MSScrollBehavior",
  "OScrollBehavior",
  "scrollSnapCoordinate",
  "MozScrollSnapCoordinate",
  "WebkitScrollSnapCoordinate",
  "MSScrollSnapCoordinate",
  "OScrollSnapCoordinate",
  "scrollSnapDestination",
  "MozScrollSnapDestination",
  "WebkitScrollSnapDestination",
  "MSScrollSnapDestination",
  "OScrollSnapDestination",
  "scrollSnapType",
  "MozScrollSnapType",
  "WebkitScrollSnapType",
  "MSScrollSnapType",
  "OScrollSnapType",
  "shapeImageThreshold",
  "MozShapeImageThreshold",
  "WebkitShapeImageThreshold",
  "MSShapeImageThreshold",
  "OShapeImageThreshold",
  "shapeMargin",
  "MozShapeMargin",
  "WebkitShapeMargin",
  "MSShapeMargin",
  "OShapeMargin",
  "shapeOutside",
  "MozShapeOutside",
  "WebkitShapeOutside",
  "MSShapeOutside",
  "OShapeOutside",
  "tabSize",
  "MozTabSize",
  "WebkitTabSize",
  "MSTabSize",
  "OTabSize",
  "tableLayout",
  "MozTableLayout",
  "WebkitTableLayout",
  "MSTableLayout",
  "OTableLayout",
  "textAlign",
  "MozTextAlign",
  "WebkitTextAlign",
  "MSTextAlign",
  "OTextAlign",
  "textAlignLast",
  "MozTextAlignLast",
  "WebkitTextAlignLast",
  "MSTextAlignLast",
  "OTextAlignLast",
  "textCombineUpright",
  "MozTextCombineUpright",
  "WebkitTextCombineUpright",
  "MSTextCombineUpright",
  "OTextCombineUpright",
  "textDecoration",
  "MozTextDecoration",
  "WebkitTextDecoration",
  "MSTextDecoration",
  "OTextDecoration",
  "textDecorationColor",
  "MozTextDecorationColor",
  "WebkitTextDecorationColor",
  "MSTextDecorationColor",
  "OTextDecorationColor",
  "textDecorationLine",
  "MozTextDecorationLine",
  "WebkitTextDecorationLine",
  "MSTextDecorationLine",
  "OTextDecorationLine",
  "textDecorationStyle",
  "MozTextDecorationStyle",
  "WebkitTextDecorationStyle",
  "MSTextDecorationStyle",
  "OTextDecorationStyle",
  "textEmphasis",
  "MozTextEmphasis",
  "WebkitTextEmphasis",
  "MSTextEmphasis",
  "OTextEmphasis",
  "textEmphasisColor",
  "MozTextEmphasisColor",
  "WebkitTextEmphasisColor",
  "MSTextEmphasisColor",
  "OTextEmphasisColor",
  "textEmphasisPosition",
  "MozTextEmphasisPosition",
  "WebkitTextEmphasisPosition",
  "MSTextEmphasisPosition",
  "OTextEmphasisPosition",
  "textEmphasisStyle",
  "MozTextEmphasisStyle",
  "WebkitTextEmphasisStyle",
  "MSTextEmphasisStyle",
  "OTextEmphasisStyle",
  "textIndent",
  "MozTextIndent",
  "WebkitTextIndent",
  "MSTextIndent",
  "OTextIndent",
  "textOrientation",
  "MozTextOrientation",
  "WebkitTextOrientation",
  "MSTextOrientation",
  "OTextOrientation",
  "textOverflow",
  "MozTextOverflow",
  "WebkitTextOverflow",
  "MSTextOverflow",
  "OTextOverflow",
  "textRendering",
  "MozTextRendering",
  "WebkitTextRendering",
  "MSTextRendering",
  "OTextRendering",
  "textShadow",
  "MozTextShadow",
  "WebkitTextShadow",
  "MSTextShadow",
  "OTextShadow",
  "textTransform",
  "MozTextTransform",
  "WebkitTextTransform",
  "MSTextTransform",
  "OTextTransform",
  "textUnderlinePosition",
  "MozTextUnderlinePosition",
  "WebkitTextUnderlinePosition",
  "MSTextUnderlinePosition",
  "OTextUnderlinePosition",
  "top",
  "MozTop",
  "WebkitTop",
  "MSTop",
  "OTop",
  "touchAction",
  "MozTouchAction",
  "WebkitTouchAction",
  "MSTouchAction",
  "OTouchAction",
  "transform",
  "MozTransform",
  "WebkitTransform",
  "msTransform",
  "OTransform",
  "transformBox",
  "MozTransformBox",
  "WebkitTransformBox",
  "MSTransformBox",
  "OTransformBox",
  "transformOrigin",
  "MozTransformOrigin",
  "WebkitTransformOrigin",
  "MSTransformOrigin",
  "OTransformOrigin",
  "transformStyle",
  "MozTransformStyle",
  "WebkitTransformStyle",
  "MSTransformStyle",
  "OTransformStyle",
  "transition",
  "MozTransition",
  "WebkitTransition",
  "MSTransition",
  "OTransition",
  "transitionDelay",
  "MozTransitionDelay",
  "WebkitTransitionDelay",
  "MSTransitionDelay",
  "OTransitionDelay",
  "transitionDuration",
  "MozTransitionDuration",
  "WebkitTransitionDuration",
  "MSTransitionDuration",
  "OTransitionDuration",
  "transitionProperty",
  "MozTransitionProperty",
  "WebkitTransitionProperty",
  "MSTransitionProperty",
  "OTransitionProperty",
  "transitionTimingFunction",
  "MozTransitionTimingFunction",
  "WebkitTransitionTimingFunction",
  "MSTransitionTimingFunction",
  "OTransitionTimingFunction",
  "turn",
  "MozTurn",
  "WebkitTurn",
  "MSTurn",
  "OTurn",
  "unicodeBidi",
  "MozUnicodeBidi",
  "WebkitUnicodeBidi",
  "MSUnicodeBidi",
  "OUnicodeBidi",
  "unset",
  "MozUnset",
  "WebkitUnset",
  "MSUnset",
  "OUnset",
  "verticalAlign",
  "MozVerticalAlign",
  "WebkitVerticalAlign",
  "MSVerticalAlign",
  "OVerticalAlign",
  "vh",
  "MozVh",
  "WebkitVh",
  "MSVh",
  "OVh",
  "visibility",
  "MozVisibility",
  "WebkitVisibility",
  "MSVisibility",
  "OVisibility",
  "vmax",
  "MozVmax",
  "WebkitVmax",
  "MSVmax",
  "OVmax",
  "vmin",
  "MozVmin",
  "WebkitVmin",
  "MSVmin",
  "OVmin",
  "vw",
  "MozVw",
  "WebkitVw",
  "MSVw",
  "OVw",
  "whiteSpace",
  "MozWhiteSpace",
  "WebkitWhiteSpace",
  "MSWhiteSpace",
  "OWhiteSpace",
  "widows",
  "MozWidows",
  "WebkitWidows",
  "MSWidows",
  "OWidows",
  "width",
  "MozWidth",
  "WebkitWidth",
  "MSWidth",
  "OWidth",
  "willChange",
  "MozWillChange",
  "WebkitWillChange",
  "MSWillChange",
  "OWillChange",
  "wordBreak",
  "MozWordBreak",
  "WebkitWordBreak",
  "MSWordBreak",
  "OWordBreak",
  "wordSpacing",
  "MozWordSpacing",
  "WebkitWordSpacing",
  "MSWordSpacing",
  "OWordSpacing",
  "wordWrap",
  "MozWordWrap",
  "WebkitWordWrap",
  "MSWordWrap",
  "OWordWrap",
  "writingMode",
  "MozWritingMode",
  "WebkitWritingMode",
  "MSWritingMode",
  "OWritingMode",
  "zIndex",
  "MozZIndex",
  "WebkitZIndex",
  "MSZIndex",
  "OZIndex",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "flex",
  "MozFlex",
  "WebkitFlex",
  "MSFlex",
  "OFlex",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "overflowScrolling",
  "MozOverflowScrolling",
  "WebkitOverflowScrolling",
  "MSOverflowScrolling",
  "OOverflowScrolling"
]

},{}],54:[function(require,module,exports){
var properties = require('./css-properties.js');
var PropTypes = require('prop-types');

module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (properties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = PropTypes.oneOfType([
  PropTypes.arrayOf(module.exports),
  module.exports
]);

},{"./css-properties.js":53,"prop-types":47}],55:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {renderHits}=require("../unit/highlight");
const {groupTitle}=require("../unit/humantext");

class ExcerptLine extends React.Component {
	highlightText(text,hits){
    return renderHits(text,hits, (o,t)=> E("span",o,t) )
	}
	openAddress(){
		this.props.openAddress(this.props.address,this.props.n);
	}
	render() {
		var pb=this.props.address||"";
		pb=pb.substr(pb.indexOf("p")+1).replace(".","-");
		return E("div",{className:"excerpt"},
			this.props.header?E("div",{className:"groupheader",
				title:this.props.shorttitle},
				groupTitle(this.props.header,this.props.cor)
				,"("
				,E("span",{className:"hitcount"},this.props.grouphit)
				,")"
			)
			:null
			,E("table",{className:"table"},
				E("tbody",{},
				E("tr",{className:"group"},
					E("td",{},E("span",{className:"seq"},this.props.seq+1)),
					E("td",{},E("a",{onClick:this.openAddress.bind(this)},
						E("span",{className:(this.props.n==this.props.now?"pb_now":"excerptpb")},pb))),
					E("td",{className:"excerptline"}, this.highlightText(this.props.text,this.props.hits))
				)
				)
			)
		)
	}
}
ExcerptLine.propTypes={
	seq:PT.number.isRequired,
	header:PT.string,
	text:PT.string.isRequired,
	address:PT.string.isRequired,
	grouphit:PT.number
}
module.exports=ExcerptLine;
},{"../unit/highlight":130,"../unit/humantext":131,"react":"react"}],56:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization")
const styles={
	container:{whiteSpace: "break-word", display:"inline-block"}
}
class fieldSelector  extends React.Component {
	setItem(item){
		const fieldname=Object.keys(this.props.fields)[item];
		this.props.setField(fieldname, !this.props.hidefields[fieldname]);
	}
	renderItem(item,key){
		return E("label",{key,style:styles.container},E("input",{
			type:"checkbox",id:"cb"+key,
			defaultChecked:!this.props.hidefields[item],
			onChange:this.setItem.bind(this,key)}),

			E("span",{htmlFor:"cb"+key,title:item},
				_(item.replace(/<.*/,""))));//remove text after @
	}
	render(){
		const existfields=Object.keys(this.props.fields).filter(function(field){
			return !!this.props.fields[field];
		}.bind(this));
		return E("div",{},existfields.map(this.renderItem.bind(this)));
	}
}
module.exports=fieldSelector;
},{"ksana-localization":147,"react":"react"}],57:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	hit:{},
	label:{cursor:"pointer"},
	container:{whiteSpace: "break-word"}
}
const humanhit=function(hit){
	if (!hit)return "";
	if (hit<1000) {
		if (hit<10) return Math.floor(hit)+"";
		return Math.floor(hit)+"";
	} else if (hit<1000000) {
		const k=hit/1000;
		if (k<10) return k.toFixed(2)+"k";
		else if (k<100) return k.toFixed(1)+"k";
		return Math.floor(k)+"k"
	}
	return "1M+";
}

class filterItem extends React.Component{
	setExclude(e){
		this.props.setExclude(this.props.idx,!this.props.exclude);
	}
	labelClick(e){
		this.props.goGroup(this.props.idx);
	}
	hitClick(e){
		this.props.goHit&& this.props.goHit(this.props.idx);
	}
	render(){
		return E(this.props.parentElement||"div",{style:styles.container}
		  	,"???"
				,E("input",{type:"checkbox",checked:!this.props.exclude,onChange:this.setExclude.bind(this)})
				,E("span",{style:styles.label,title:this.props.hint,onClick:this.labelClick.bind(this)},this.props.label)
				,this.props.hit?E("span",{className:this.props.exclude?"disablefilterhit":"filterhit",
					onClick:this.hitClick.bind(this)}, humanhit(this.props.hit)):null
		)
	}
};

filterItem.propTypes={
		label:PT.string.isRequired,
		hit:PT.number.isRequired,
		//exclude:PT.bool.isRequired,
		setExclude:PT.func.isRequired,
		goGroup:PT.func.isRequired,
		goHit:PT.func,
		idx:PT.number.isRequired
	}


module.exports=filterItem;
},{"react":"react"}],58:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

class Footer extends React.Component{
	render(){
		return E("div",{className:"footer"}
			,E("div",{className:"separator"},"???")
			,E("div",{style:styles.container}
			,E("table",{style:styles.table},E("tbody",{},E("tr",{}
				,E("td",{}
					,E("img",{style:styles.logoimg,src:"logo.png"}))
				,E("td",{}
					,E("div",{},"Accelon 2019.4.20")
					,E("div",{},"Freely Redistributable")
					,E("div",{},"??????????????????????????????????????????")
					,E("div",{},"??????????????????????????????????????????????????????")
					,E("a",{href:"readme.htm"},"????????????")
				)
			))))
		)
	}
}
const styles={
	table:{margin:"0 auto"},
	logo:{flex:1},
	logoimg:{width:80,height:80,padding:10},
	text:{flex:2}
}
module.exports=Footer;
},{"react":"react"}],59:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const address=require("../model/address");
const mode=require("../model/mode");
class GoPage extends React.Component {
	constructor(props){
		super(props)
		this.state={page:""}
	}
	gopage(){
		const book=this.props.cor.bookOf(address.store.main);
		const pg=(parseInt(this.state.page,10)-1)||0;
		const r=this.props.cor.parseRange(book+"p"+this.state.page);
		const kpos=r?r.start:this.props.cor.makeKPos([book,pg,0,0]);

		const article=this.props.cor.articleOf(kpos);
		if (!article)return;
		const addr=this.props.cor.stringify(kpos);
		address.setMain(addr);
		mode.readText();
	}
	setRef(ref){
		this.input=ref;
	}
	onChange(e){
		this.setState({page:e.target.value});
	}
	onKeyPress(e){
		if (e.key==="Enter") this.gopage();
	}
	render(){
		return E("span",{className:"gotopage"},
			E("button",{onClick:this.gopage.bind(this)},_("Page Number"))
			,E("input",{ref:this.setRef.bind(this),value:this.state.page,size:5,
				onChange:this.onChange.bind(this),onKeyPress:this.onKeyPress.bind(this)})
		)
	}
};
GoPage.propTypes={
	cor:PT.object.isRequired,
	range:PT.array.isRequired,
}
module.exports=GoPage;
},{"../model/address":115,"../model/mode":120,"ksana-localization":147,"react":"react"}],60:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const {linkpopupmatrix}=require("../unit/popupmatrix");
var LinkPopup=React.createClass({
	getInitialState:function(){
		return {close:true,mainAddress:null,mainCorpus:null};
	},
	propTypes:{
		x:PT.number.isRequired,
		title:PT.string,
		cors:PT.object.isRequired, //open corpus
		tagname:PT.string,
		openLink:PT.func.isRequired
	},
	close:function(){
		this.setState({close:true});
		this.props.actions.highlightAddress(0);
	},
	componentWillReceiveProps:function(nextProps){
		if (nextProps.close)	 {
			this.setState({close:true});
		} else {
			if (nextProps.timestamp!==this.props.timestamp) {
				const mainAddress=nextProps.mainAddress;
				const mainCorpus=nextProps.mainCorpus;
				this.setState({close:false,mainAddress,mainCorpus});
			}			
		}
	},
	componentDidUpdate:function(){
		var cm=this.refs.cm;
		if (!cm)return;
		cm=cm.getCodeMirror();
	}
	,linkmouseover:function(e){
		const links=this.props.links;
		const link=links[e.target.dataset.id];
		if (!link)return;
		this.props.actions.highlightAddress(link.from);
	}
	,linkclick:function(e){
		const links=this.props.links;
		const link=links[e.target.dataset.id];
		if (!link)return;

		this.props.actions.openLink(link.corpus+"@"+link.to);
	}
	,sortLinks:function(){
		const links=this.props.links;
		const arr=[];
		for (var i in links){
			arr.push([links[i],i]);
		}
		arr.sort(function(a,b){
			const cor=this.props.cors[a[0].corpus];
			const a1=cor.parseRange(a[0].to).start;
			const b1=cor.parseRange(b[0].to).start;
			return a1>b1?(b1<a1?1:0):-1;
		}.bind(this));
		return arr;
	}
	,renderLinks:function(){
		var out=[];
		const links=this.sortLinks(this.props.links);
		const maincor=this.props.cors[this.state.mainCorpus];
		const mainr=maincor.parseRange(this.state.mainAddress);
		for (var key in links){
			const link=links[key][0];
			const id=links[key][1];
			const cor=this.props.cors[link.corpus];
			const shortname=cor.getGroupName(link.to);
			const r=cor.parseRange(link.to);
			const to=typeof link.to=="number"?cor.stringify(r.range):link.to;
			const m=to.match(/(p\d+)/);
			const page=m?m[1]:to;
			const originate= mainr.start>r.start&&mainr.start<r.end;
			out.push(E("div",{key,className:originate?"backlink_originate":"backlink"
				,"data-id":id
				,onMouseOver:this.linkmouseover
				,onClick:this.linkclick},shortname+" "+page));
		}
		return out;
	},
	render:function(){
		if (this.props.x<0 ||this.state.close || !this.props.links.length){
			return E("div",{});
		}
		var style=JSON.parse(JSON.stringify(styles.viewcontrols));
		style.left=this.props.x;
		style.top=this.props.y;
		style.height=linkpopupmatrix.height;
		style.width=linkpopupmatrix.width;

		if (style.left+style.width>window.innerWidth) {
			style.left=window.innerWidth-style.width;
		}
		if (style.top+style.height>window.innerHeight) {
			style.top=window.innerHeight-style.height;
		}

		if (style.left+style.width>this.props.w) {
				style.left-=style.left+style.width-this.props.w+20;
		} 
		if (style.top+style.height>this.props.h) {
				style.top-=style.top+style.height-this.props.h+20;
		} 
		return	E("div",{style:styles.container},
				E("div",{style,className:"linkpopup"},
					E("span",{style:styles.title,className:"linkpopuptitle",onClick:this.close}
						,"??? "+this.props.title),
					E("div",{style:styles.links}
						,this.renderLinks())
				)
		)
	}
})

var styles={

	links:{height:"100%",overflow:"auto"},
	container:{position:"relative",zIndex:101},
	viewcontrols:{position:"absolute"}, //for scrollbar
	title:{position:"absolute",top:"-1.5em",zIndex:200},
}
module.exports=LinkPopup;
},{"../unit/popupmatrix":135,"ksana-codemirror":"ksana-codemirror","react":"react"}],61:[function(require,module,exports){
const React =require('react');
const E=React.createElement;

const LocalFileItem=require("./localfileitem");
class LocalFileOther extends React.Component {
	render(){
		return E("span",{className:"localfile"},
			E(LocalFileItem,this.props)
		)
	}
}
module.exports=LocalFileOther;
},{"./localfileitem":62,"react":"react"}],62:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalFileItem extends React.Component {
	render(){
		return E("label",{},
			E("span",{className:"openlocalbutton"},
				this.props.title||_("Open local cor")),
			E("input",{type:"file",style:{display:"none"},
				accept:".cor",multiple:true,onChange:this.props.openfile})
		)
	}
}

module.exports=LocalFileItem;
},{"ksana-localization":147,"react":"react"}],63:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalSystem extends React.Component {
	render(){
		const title=_("download latest zip and cor files, and open index.html")
		var downloadable=window&&
		window.location.protocol=="http:"
		&&window.location.host.indexOf("127.0.0.1")==-1;
		if (!downloadable) return E("span");
		return E("span",{className:"localfile"},
			E("a",{href:"https://github.com/accelon/accelon2017/",target:"_new",title},_("local system"))
		)
	}
}
module.exports=LocalSystem;
},{"ksana-localization":147,"react":"react"}],64:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const {notepopupmatrix}=require("../unit/popupmatrix");
const LinesMarkers={
	mppsnote:require("../unit/mpps").markNoteLines,
	yinshunnote:require("../unit/yinshun").markNoteLines,
	footnote:require("../unit/mpps").markNoteLines
}
const citation=require("../unit/citation");
var NotePopup=React.createClass({
	getInitialState:function(){
		return {close:true};
	},
	propTypes:{
		//rule:PT.object.isRequired,
		x:PT.number.isRequired,
		y:PT.number.isRequired,
		text:PT.string.isRequired,
		kpos:PT.number,
		title:PT.string,
		tagname:PT.string,
		openLink:PT.func.isRequired,
		cor:PT.object
	},
	close:function(){
		this.setState({close:true});
	},
	componentWillReceiveProps:function(nextProps){
		if (nextProps.timestamp!==this.props.timestamp) {
			this.setState({close:false});
		}
	},
	onCopy:function(cm,evt){
		var v=evt.target.value;

		v="("+this.props.title+")???"+
		  v.replace(/\{k/g,"").replace(/k\}/g,"")
		.replace(/\{b/g,"").replace(/b\}/g,"")
		.replace(/@t(\d+)p([\d\-abcd]+)/g,function(m,m1,m2){
			return "?????????"+m1+"???"+m2+"???";
		})
		.replace(/@y([A-Z][0-9]+)#([0-9]+)/g,function(m,m1,m2){
			return "?????????????????????????????????????????????"+m1+"???p."+m2+"???";
		})+"???";
		if (this.props.kpos) {
			v+=citation(this.props.cor,this.props.kpos);
		}
		evt.target.value=v;
		evt.target.select();		
	},
	componentDidUpdate:function(){
		var cm=this.refs.cm;
		if (!cm)return;
		cm=cm.getCodeMirror();
		const markLines=LinesMarkers[this.props.tagname];
		markLines&&markLines(cm,0,cm.lineCount()-1,this.props.openLink,this.props.cor);
	},
	render:function(){
		if (!this.props.text||this.props.x<0 ||this.state.close){
			return E("div",{});
		}
		var style=JSON.parse(JSON.stringify(styles.viewcontrols));
		style.left=this.props.x;
		style.top=this.props.y;
		style.height=notepopupmatrix.height;
		style.width=notepopupmatrix.width;

		if (style.left+style.width>window.innerWidth) {
			style.left=window.innerWidth-style.width;
		}
		if (style.top+style.height>window.innerHeight) {
			style.top=window.innerHeight-style.height;
		}

		if (style.left+style.width>this.props.w) {
				style.left-=style.left+style.width-this.props.w+20;
		} 
		if (style.top+style.height>this.props.h) {
				style.top-=style.top+style.height-this.props.h+20;
		} 
		return	E("div",{style:styles.container},
				E("div",{style,className:"notepopup"},
					E("span",{style:styles.title,className:"notepopuptitle",onClick:this.close}
						,"??? "+this.props.title),
					E(CodeMirror,{ref:"cm",readOnly:true,value:this.props.text,
						onCopy:this.onCopy
				})
				)
		)
	}
})

var styles={
	container:{position:"relative",zIndex:101},
	viewcontrols:{position:"absolute"}, //for scrollbar
	title:{position:"absolute",top:"-1.5em",zIndex:200},
}
module.exports=NotePopup;
},{"../unit/citation":127,"../unit/mpps":134,"../unit/popupmatrix":135,"../unit/yinshun":138,"ksana-codemirror":"ksana-codemirror","react":"react"}],65:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
class QSelector extends React.Component{
	onMouseEnter(idx){
		if (this.props.maxChar&&idx>=this.props.maxChar)  idx=this.props.maxChar-1;
		this.setState({selectTo:idx});
	}
	onMouseLeave(){
		this.setState({selectTo:-1});
	}
	onMouseDown(idx){
		const tokens=this.toToken(this.props.q);
		if (this.props.maxChar&&idx>=this.props.maxChar)  idx=this.props.maxChar-1;
		tokens.length=idx+1;
		this.props.onSelect&&this.props.onSelect(tokens.join(""));
	}
	constructor(props){
		super(props);
		this.state={selectTo:-1};
	}
	renderToken(t,key){
		const className=(key<=this.state.selectTo?"selected":"selection");
		return E("span",{key,className,
			onMouseDown:this.onMouseDown.bind(this,key),
			onMouseEnter:this.onMouseEnter.bind(this,key),
			onMouseLeave:this.onMouseLeave.bind(this,key)},
			t);
	}
	toToken(q){ //stupid, should reuse tokenizer
		var out=[],i=0;
		while (i<q.length){
			var c=q.charCodeAt(i);
			if (c>=0xd800&&c<=0xdbff) {
				out.push(q[i]+q[i+1]);
				i++;
			} else if (c>=0x3400&&c<=0x9FFF) {
				out.push(q[i]);
			} else {
				var s="";
				while (i<q.length&&(c<0x3400||c>0x9fff)) {
					s+=q[i++];
					c=q.charCodeAt(i);
				}
				out.push(s);
			}
			i++;
		}
		return out;
	}
	render(){
		const q=this.props.q||"";
		return E("span",{className:"dictbox"},this.toToken(q).map(this.renderToken.bind(this)));
	}
}

module.exports=QSelector;
},{"react":"react"}],66:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const BreadCrumbTOC=require("ksana2015-breadcrumbtoc").Component;

class TOCNav extends React.Component {
	constructor (props) {
		super(props);
		this.state={toc:[]};
	}
	loadTOC(kpos){
		if (!this.props.cor)return;

		this.props.cor.getTOC(kpos,function(tocs){
			var toc= tocs[0] || [];
			toc=toc.slice();
			if (toc.length && toc[0].d!==0) {
				toc.unshift({d:0,t:" "});
			}
			this.setState({toc});
		}.bind(this));
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.caretpos!==this.props.caretpos) {
			this.loadTOC(nextProps.caretpos);
		}
	}
	componentDidMount() {
		this.loadTOC(this.props.caretpos);
	}
	onSelect(idx,address){
		this.props.onSelectItem&&this.props.onSelectItem(address);
	}
	render(){
		return E(BreadCrumbTOC,{toc:this.state.toc,pos:this.props.caretpos
						,buttonStyle:styles.buttonStyle
						,buttonClass:"head"
						,buttonClassOffset:1
						,onSelect:this.onSelect.bind(this)
						,activeButtonStyle:styles.activeButtonStyle
						,untrimDepth:2//last two level is visible
					})
	}
};

TOCNav.propTypes={
	cor:PT.object.isRequired,
	caretpos:PT.number.isRequired,
	onSelectItem:PT.func
}

const styles={
	activeButtonStyle:{opacity:0.9},
	buttonStyle:{opacity:0.6}
}
module.exports=TOCNav;

},{"ksana2015-breadcrumbtoc":154,"react":"react"}],67:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const styles={
	container:{cursor:"pointer"},
	menu:{width:200,height:130,background:"silver",border:"solid 1px gray",borderRadius:"5px",padding:"5px"},
	inputfile:{opacity:0,zIndex:-1},
	uploadbutton:{cursor:"pointer",border:"1px solid black",borderRadius:"3px"},
	closebutton:{cursor:"pointer"},
	error:{background:"red",color:"yellow"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
const address=require("../model/address");
class AuxMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true,lasterror:""});
	}
	constructor(props){
		super(props)
		this.state={opened:false,address:this.props.address};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	opennew(){
		this.closemenu();
		address.openNewWindow(this.props.address,this.props.corpus);
	}
	changeAddress(e){
		this.setState({address:e.target.value});
	}
	goAddress(e){
		if (e.key=="Enter") {
			address.setAux(this.props.corpus+"@"+this.state.address);
		}
	}
	canopennew(){
		return (window.location.protocol.substr(0,4)!="file");
	}
	render(){
		if (this.state.opened) {
			return E("div",{style:styles.menu},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"???"),
				"???",
				E("input",{value:this.state.address,
					onChange:this.changeAddress.bind(this),
					onKeyPress:this.goAddress.bind(this)}),
				E("br"),
				E("span",{},this.props.cor.getTitle(this.props.address)),
				this.canopennew()?E("button",{onClick:this.opennew.bind(this)},_("Open New Window")):null
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},
			E("span",{className:"hamburger"},"???"))
	}
}

module.exports=AuxMainmenu;
},{"../model/address":115,"../unit/localfile":132,"ksana-localization":147,"react":"react"}],68:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const filterItem=require("../components/filteritem");
const mode=require("../model/mode");
const address=require("../model/address");
const {observer}=require("mobx-react");

const filter=require("../model/filter")
const {_}=require("ksana-localization");
const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"},
	cat:{cursor:"pointer"},
	selectedcat:{cursor:"pointer",background:"lightblue"}
}

class BookCategorySelector extends React.Component {
	constructor(props){
		super(props);
		const res=this.buildCategory();
		const groupNames=this.props.cor.groupNames();
		this.state=Object.assign({},{selCategory:-1},res);
	}
	getCategorySelected(){
		const rawgroupNames=this.props.cor.groupNames();
		const selOfCat=[];
		for (var i=0;i<rawgroupNames.length;i++) {
			const r=rawgroupNames[i].split(";");
			const r2=r[1].split("@");
			const prefix=parseInt(r2[0]);
			if (!filter.store.active[i]) {
				if (!selOfCat[prefix]) selOfCat[prefix]=0;
				selOfCat[prefix]++;
			}				
		}
		return selOfCat;
	}
	buildCategory(props){
		props=props||this.props;
		const rawgroupNames=this.props.cor.groupNames();
		var allOfCat=[],groupNames=[],id=[];
		for (var i=0;i<rawgroupNames.length;i++) {
			const r=rawgroupNames[i].split(";");
			id.push(r[0]);
			const r2=r[1].split("@");
			const prefix=parseInt(r2[0]);
			if (!allOfCat[prefix]) allOfCat[prefix]=[];
			allOfCat[prefix].push(groupNames.length);
			groupNames.push(r2[1]);		
		}
		return {allOfCat,groupNames,id,
			categoryNames:this.props.cor.meta.groupPrefix};
	}

	setExclude(group,value){
		filter.setExclude(group,value);
	}
	goGroup(group){
		const r=this.props.cor.groupKRange(group);
		const a=this.props.cor.stringify(r[0]);
		address.setMain(a);
		mode.tocView();
	}
	firstOccurOfGroup(group){
		return 0;
		var first=0;
		for(let i=0;i<group;i++) {
			if (!filter.store.active[i]){
				//first+=filter.store.active.hits[i];
			}
		}
		return first;
	}
	selectCat(key){
		const selCategory=parseInt(key);
		if (this.state.selCategory==selCategory) {
				this.setState({selCategory:-1});	
		} else {
				this.setState({selCategory});	
		}
	}
	checkCat(key){
		const all=this.state.allOfCat[key];
		const sel=this.selOfCat[key]||0;

		filter.setExclude(all,!!sel);		
	}
	renderCategory(item,key){
		const all=this.state.allOfCat[key];
		const sel=this.selOfCat[key]||0;
		const selected=this.state.selCategory==key;
		if (!all) return null;


		const checked=!!sel;
		return E("div",{key},"???",
				E("input",{type:"checkbox",checked,onChange:this.checkCat.bind(this,key)}),
			" ", E("span",{style:styles[(selected?"selectedcat":"cat")],
				onClick:this.selectCat.bind(this,key)},item), 
			" ",sel+"/"+all.length,
			selected?E("div",{},E("blockquote",{},all.map(this.renderGroup.bind(this)))):null
			);
	}
	renderGroup(group,key){
		var hit=0;
		if (this.props.showHit) {
		//	hit=filter.store.active.hits[group] || 0;			
		}
		
		const exclude=filter.store.active[group] || false;
		var br=false;
		var g=this.state.groupNames[group];
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const label=g.replace(/.*;/,"");
		const hint=this.state.id[group] ;//g.replace(/;.*/,"");
		return E(filterItem,{parentElement:"span",label,hit,exclude,key:group,br,idx:group,hint,idx:group,
			setExclude:this.setExclude.bind(this),goGroup:this.goGroup.bind(this)});
	}
	selectall(){
		filter.includeAll();
	}
	deselectall(){
		filter.excludeAll();
	}
	render(){
		this.selOfCat=this.getCategorySelected();
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall.bind(this)},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall.bind(this)},_("Deselect All")),
			this.state.categoryNames.map(this.renderCategory.bind(this)));	
	}
};

module.exports=observer(BookCategorySelector);
},{"../components/filteritem":57,"../model/address":115,"../model/filter":118,"../model/mode":120,"ksana-localization":147,"mobx-react":42,"react":"react"}],69:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const SortByBook=require("./sortbybook");
const ModeSelector=require("./modeselector");
const {_}=require("ksana-localization");
const {showExcerpt}=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const {observer}=require("mobx-react");
class BookResult extends React.Component {
	constructor(props){
		super(props);
		this.state={sort:true};
	}
	setSort(e){
		this.setState({sort:!this.state.sort});
	}
	render(){
		const mcount=searchresult.store.filtered?searchresult.store.filtered.length:0;

		return E("div",{},
			E("span",{},_("Matches"),":",E("span",{className:"totalhitcount"},mcount))
			," "

			,E(SortByBook,{cor:this.props.cor,
				showExcerpt,
				searchresult:searchresult.store,sort:this.state.sort})
			//,E("label",{},E("input",{type:"checkbox",onChange:this.setSort.bind(this)
			//	,checked:this.state.sort}),
			//	_("Sort by hit"))

		)
	}
};

module.exports=observer(BookResult);
},{"../model/excerpt":117,"../model/searchresult":121,"./modeselector":80,"./sortbybook":88,"ksana-localization":147,"mobx-react":42,"react":"react"}],70:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const filterItem=require("../components/filteritem");
const {readText}=require("../model/mode");
const address=require("../model/address");
const filter=require("../model/filter");
const {_}=require("ksana-localization");
const {observer}=require("mobx-react");

const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"},
	columncontainer:{display:"flex"},
	column:{flex:1}
}
const BookCategorySelector=require("./bookcategoryselector");


class BookSelector extends React.Component {
	setExclude(group,value){
		filter.setExclude(group,value);
	}
	goGroup(group){
		const r=this.props.cor.groupKRange(group);
		const a=this.props.cor.stringify(r[0]);
		address.setMain(a);
		readText();
	}
	firstOccurOfGroup(group){
		var first=0;
		for(let i=0;i<group;i++) {
			if (!filter.store.active[i]){
				first+=filter.store.active.hits[i];				
			}
		}
		return first;
	}
	rendergroups(groups){
		const columns=this.props.cor.meta.displayOptions.groupColumn;
		if (!columns) {
			return groups.map(this.rendergroup.bind(this));
		} else {
			var out=[],items=[],now=0;
			for (var i=0;i<groups.length;i++) {
				if (now<columns.length && i==columns[now]) {
					out.push(E("div",{key:i,style:styles.column},items));
					items=[];
					now++;
				}
				items.push(this.rendergroup(groups[i],i));
			}
			out.push(E("div",{key:i,style:styles.column},items));
			return E("div",{style:styles.columncontainer},out);
		}
	}	
	rendergroup(g,key){
		var hit=0;
		if (this.props.showHit) {
			hit=filter.store.active.hits[key] || 0;
		}
		const exclude=filter.store.active[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		return E(filterItem,{label,hit,exclude,key,br,idx:key,hint,idx:key,
			setExclude:this.setExclude.bind(this),goGroup:this.goGroup.bind(this)});
	}
	selectall(){
		filter.includeAll();
	}
	deselectall(){
		filter.excludeAll();
	}
	render(){
		if (this.props.cor.meta.groupPrefix) {
			return E(BookCategorySelector,this.props);
		}
		const groupNames=this.props.cor.groupNames();
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall.bind(this)},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall.bind(this)},_("Deselect All")),
			this.rendergroups(groupNames));	
	}
};
BookSelector.propTypes={
	cor:PT.object.isRequired
}
module.exports=observer(BookSelector);
},{"../components/filteritem":57,"../model/address":115,"../model/filter":118,"../model/mode":120,"./bookcategoryselector":68,"ksana-localization":147,"mobx-react":42,"react":"react"}],71:[function(require,module,exports){
/*
	TODO , load external Cor
*/
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const mode=require("../model/mode");
const corpora=require("../model/corpora");
const searchresult=require("../model/searchresult");
const LocalFile=require("../components/localfile");
const LocalSystem=require("../components/localsystem");
const LocalFileItem=require("../components/localfileitem");
const styles={
	opencorbutton:{color:"blue"}
}
const {_}=require("ksana-localization");
class DBSelector extends React.Component {
	constructor(props){
		super(props);
		this.state={noimage:{}};
	}
	selectdb(db){
		searchresult.clear();
		corpora.setActive(db);
		mode.selectBook();
	}
	onInputKeypress(e){

	}
	onImgError(db){
		var noimage=this.state.noimage;
		noimage[db]=true;
		this.setState({noimage});
	}
	openfile(e){
		const id=e.target.files[0];
		for (var i=0;i<e.target.files.length;i++) {
			if (!e.target.files[i])continue;
			const corpus=e.target.files[i];
			corpora.close(corpus.name.replace(".cor",""));
			corpora.open(corpus);
		}
	}
	renderRegister(cor){
		if (!cor) return;
		var corurl=cor.registered?'https://github.com/accelon/'+cor.id:'';
		var builddate=_("build date")+cor.meta.date;
		var corurllabel=_("about");
		var corurlclass="registered";
		if (!cor.registered) {
			corurl='https://github.com/accelon/register';
			corurllabel=_("unknowncor");
			corurlclass="unregistered";
		}
	
		return E("span",{},
			cor.local?E("span",{className:"localcor",title:builddate},_("local cor")):null,
			corurl?E("a",{href:corurl,target:"_new",
				title:builddate,className:corurlclass},
				corurllabel):null
		);
	}
	renderDB(item,key){
		const active=item==corpora.store.active;
		const cor=corpora.store.cor(item);

		var title=item;
		var onClick=this.selectdb.bind(this,item);
		var className=active?"activedbname":"dbname";

		if (cor) {
			title=cor.meta.title;
		} else {
			if (mode.store.fileprotocol) {
				onClick=null;
				className="dbnotopen";
			} else {
				setTimeout(function(){
					corpora.open(item);	
				},0);				
			}
		}
		var builddate=cor?_("build date")+cor.meta.date:"";
		return E("div",{key,className:"dbselector"},
			E("span",{className,onClick},title),
			this.renderRegister(cor),
			E("span",{},(active?"???":""))
		);
	}
	render(){
		const items=Object.keys(corpora.store.corpora);
		return E("div",{},
			E("br"),
			E(LocalFile,{openfile:this.openfile.bind(this)}),
			E(LocalSystem),
			items.map(this.renderDB.bind(this))

			);
	}
}

module.exports=DBSelector;
},{"../components/localfile":61,"../components/localfileitem":62,"../components/localsystem":63,"../model/corpora":116,"../model/mode":120,"../model/searchresult":121,"ksana-localization":147,"react":"react"}],72:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const QSelector=require("../components/qselector");
const stockurls=[
	{name:"Google",url:"https://www.google.com.tw/search?q=$$"}
]
const selection=require("../model/selection");
const {observer}=require("mobx-react");

class DictView extends React.Component{
	constructor(props){
		super(props);

		const urls=stockurls.slice();
		const o=window.accelon2017&&window.accelon2017.dictionaries;
		if (o) {
			for (var i=0;i<o.length;i++) {
				urls.push(o[i]);
			}
		}

		this.state={site:0,urls}
	}
	componentWillMount(){
	}
	onSelect(t){
		var url=this.state.urls[this.state.site].url;
		window.open( url.replace("$$",t));
	}
	setExternalSite(idx){
		this.setState({site:idx});
	}
	renderExternalSite(item,key){
		return E("label",{key},
			E("input",{type:"radio",name:"external",
				checked:this.state.site==key,
				onChange:this.setExternalSite.bind(this,key)
			}) ,item.name," ");
	}
	render(){
		const s=selection.store;
		var q=s.selectionText?s.selectionText:s.caretText;
		const maxChar=this.state.urls[this.state.site].max;
		if (q.length>20) q=q.substr(0,20);
		return E("div",{},
			E(QSelector,{q,maxChar,onSelect:this.onSelect.bind(this)}),
			E("br"),
			this.state.urls.map(this.renderExternalSite.bind(this))
		)
	}
}
module.exports=observer(DictView);
},{"../components/qselector":65,"../model/selection":122,"mobx-react":42,"react":"react"}],73:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;

const maxbutton=10;
class ExcerptPager extends React.Component {
	calbatch(){
		if(!this.props.count) return null;

		var batchcount=Math.floor(this.props.count/this.props.hitperbatch);
		if (batchcount*this.props.hitperbatch<this.props.count) batchcount++;
		var remain=maxbutton;
		var start=this.props.batch||0 ,end=this.props.batch||0;
		while ( remain ) {
			if (start) {remain--;start--}
			if (remain&&end<batchcount) {remain--;end++}
			if (end>=batchcount)break;
		}
		return {start,end};
	}
	onClick(e) {
		const i=parseInt(e.target.dataset.idx);
		if (isNaN(i))return;
		this.props.gobatch(i);
	}
	renderPager(){
		const B=this.calbatch();
		if (!B)return;
		var out=[],className=null;
		for (let i=B.start;i<B.end;i++) {
			className=this.props.batch==i?"selectedpager":"pager";
			out.push( E("span",{className,key:i,"data-idx":i,onClick:this.onClick.bind(this)}, (i+1) ));
		}
		return out;
	}
	render(){
		return E("span",{className:"excerptpager"},
			this.renderPager()
		);
	}
}
ExcerptPager.propTypes={
		count:PT.number.isRequired,
		hitperbatch:PT.number.isRequired,
		batch:PT.number.isRequired,
		gobatch:PT.func.isRequired
}

module.exports=ExcerptPager;
},{"react":"react"}],74:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
class ExcerptSetting extends React.Component {
	setExtra(e){
		this.props.setExtra(parseInt(e.target.value,10));
	}
	render(){
		const extraline=this.props.extra;
		return E("span",{}," ",E("span",{},_("Extra Line")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==1,name:"extra",type:"radio",value:1}),_("1")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==0,name:"extra",type:"radio",value:0}),_("3")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==5,name:"extra",type:"radio",value:5}),_("5"))
		)
	}
}

module.exports=ExcerptSetting;
},{"ksana-localization":147,"react":"react"}],75:[function(require,module,exports){
const React =require('react');
const ReactDOM =require('react-dom');
const {observer}=require("mobx-react");
const PT=React.PropTypes;
const E=React.createElement;
const ExcerptLine=require("../components/excerptline");
const ExcerptPager=require("./excerptpager");
const ExcerptSetting=require("./excerptsetting");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const BookResult=require("./bookresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
const {highlightExcerpt}=require("../unit/highlight");
const {_}=require("ksana-localization");
const styles={
	container:{},
	table:{width:"100%"}
}
var prevtitle="";
class ExcerptView extends React.Component {
	getSeqOfBook(grouphits,now){
		if (!grouphits)return 0;
		var remain=now,acc=0, g=0;
		while (remain>=grouphits[g] && g<grouphits.length) {
			remain-=grouphits[g];
			g++;
		}
		return remain ;
	}

	openAddress(addr,now){
		address.setMain(addr);
		excerpt.setNow(now);
		mode.readText();
	}
	renderItem(item,key){
		const start=excerpt.store.batch*excerpt.store.hitperbatch;
		const n=start+key;
		const first=(excerpt.store.now%excerpt.store.hitperbatch)==0;
		const {grouphit,address,title,shorttitle}=this.excerptTitle(n);
		
		const header=(title!==prevtitle)? title:"";
		prevtitle=title;
		const now=excerpt.store.now;
		const seq=this.getSeqOfBook(searchresult.store.grouphits,n);
		const scrollto=now==n;
		var obj={};
		if (scrollto && !first) obj.ref="scrollto"; //no need to scroll if first item is highlighted
		const ex=excerpt.store.excerpts[key];
		if (!ex)return null;
		const hits=highlightExcerpt(this.props.cor,ex,searchresult.store.phrasepostings);
		return E(ExcerptLine,Object.assign(obj,item,
			{openAddress:this.openAddress.bind(this),key,now,n,seq,header,shorttitle,
				cor:this.props.cor,
				address:address||"",grouphit,scrollto,hits}));
	}
	excerptTitle(n){
		const sr=searchresult.store;
		if (!sr.filtered)return {};
		const tpos=sr.filtered[n];
		if (!tpos) return{};
		const address=this.props.cor.fromTPos(tpos).kpos[0];
		if (address) {
			var addressH=this.props.cor.stringify(address);
			addressH=addressH.substr(0,addressH.length-2);
			const group=this.props.cor.groupOf(address);
			const grouphit=sr.grouphits[group];

			const title=this.props.cor.getGroupName(address);
			const shorttitle=this.props.cor.getGroupName(address,true);
			return {grouphit,title,shorttitle,address:addressH};
		} else {
			return {grouphit:0,title:"",address:""};
		}
	}
	gobatch(batch) {
		const hitperbatch=excerpt.store.hitperbatch;
		excerpt.showExcerpt(batch*hitperbatch);
	}	
	setExtra(extra){
		excerpt.setExtraLine(extra);
	}
	render(){
		prevtitle="";
		const sr=searchresult.store;
		const excerpts=excerpt.store.excerpts;
		if (sr.searching) return E("div",{},"searching");
		if (!excerpts) return E("div",{},_("no result"));

		

		const count=(sr.filtered||{}).length||0;
		const hitperbatch=excerpt.store.hitperbatch;
		const batch=excerpt.store.batch;

		setTimeout(function(){ //componentDidUpdate only triggered once, don't know why
			const w=ReactDOM.findDOMNode(this.refs.scrollto);
			w&&w.scrollIntoView();
		}.bind(this),100)
		return E("div",{style:styles.container},
				E(BookResult,{cor:this.props.cor}),
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)}),
				E(ExcerptSetting,{setExtra:this.setExtra.bind(this),
					extra:excerpt.store.extra}),
				excerpts.map(this.renderItem.bind(this)),
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)})
		)
	}
}

module.exports=observer(ExcerptView);
},{"../components/excerptline":55,"../model/address":115,"../model/excerpt":117,"../model/mode":120,"../model/searchresult":121,"../unit/highlight":130,"./bookresult":69,"./excerptpager":73,"./excerptsetting":74,"ksana-localization":147,"mobx-react":42,"react":"react","react-dom":"react-dom"}],76:[function(require,module,exports){
const React =require('react');
const ReactDOM =require('react-dom');
const {observer}=require("mobx-react");
const PT=React.PropTypes;
const E=React.createElement;
const searchresult=require("../model/searchresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
const mode=require("../model/mode");
const {groupTitle}=require("../unit/humantext");
const {renderHits,highlightExcerpt}=require("../unit/highlight");

class FuzzyResult extends React.Component {
	openAddress(addr,now){
		address.setMain(addr);
		excerpt.setNow(now);
		mode.readText();
	}	
	renderExcerpt(excerpt,key){
		if (!excerpt)return null;
		if (!excerpt.linebreaks)return null;
		if (!excerpt.linebreaks[0])return null;
		const hits=highlightExcerpt(this.props.cor,excerpt,searchresult.store.phrasepostings);
		const addr=excerpt.linebreaks[0];
		const page=this.props.cor.stringify(addr).match(/p\d+[abc]?/)[0];
		const title=groupTitle(this.props.cor.getGroupName(addr),this.props.cor)+page;
		const score=Math.round(searchresult.store.scores[key]*100);
		return E("div",{className:"excerpt",key},
			E("div",{className:" groupheader"},
				E("span",{className:"fuzzytitle",
					onClick:this.openAddress.bind(this,addr,key)},title), 
				" ",
				E("span",{className:"score"},score+"%")
			),
			renderHits(excerpt.text,hits, (o,t)=> E("span",o,t) )
		);
	}
	render(){
		const excerpts=excerpt.store.excerpts;
		if (!excerpts||!excerpts.length) {
			return E("div",{},"No found");
		}
		return E("div",{},excerpts.map(this.renderExcerpt.bind(this))
		)
	}
}


module.exports=observer(FuzzyResult);
},{"../model/address":115,"../model/excerpt":117,"../model/mode":120,"../model/searchresult":121,"../unit/highlight":130,"../unit/humantext":131,"mobx-react":42,"react":"react","react-dom":"react-dom"}],77:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {observer}=require("mobx-react");
const {_}=require("ksana-localization");
const address=require("../model/address");
const styles={
	a:{cursor:"pointer"}
}
class GroupNav extends React.Component{
	next(){
		const article=this.props.cor.articleOf(this.props.address);
		const next=this.props.cor.getArticle(article.at+1);
		address.setMain(next.startH);
	} 
	prev(){
		const article=this.props.cor.articleOf(this.props.address);
		const prev=this.props.cor.getArticle(article.at-1);
		address.setMain(prev.startH);
	}
	render(){
		const groupname=this.props.cor.getGroupName(this.props.address);
		const article=this.props.cor.articleOf(this.props.address);

		return E("span",{}
			,article.at?
				E("a",{className:"homebar fasciclelink",onClick:this.prev.bind(this)},_("Prev Fascicle")):null
			," "
			,E("span",{className:"homebar activegroup"},groupname)
			," "
			,(article.at+1<this.props.cor.articleCount())?
				E("a",{className:"homebar fasciclelink",onClick:this.next.bind(this)},_("Next Fascicle")):null
			);
	}
}
module.exports=observer(GroupNav);
},{"../model/address":115,"ksana-localization":147,"mobx-react":42,"react":"react"}],78:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchBox=require("./searchbox");
const SearchOptions=require("./searchoptions");
const ModeSelector=require("./modeselector");
const {DBSELECTOR,selectDB,store}=require("../model/mode");
const mode=require("../model/mode");
const m=store.mode;
const {_}=require("ksana-localization");

class HomeBar extends React.Component {
	render(){
		const title=this.props.cor&&this.props.cor.meta.title;
		const date=this.props.cor&&_("build date")+this.props.cor.meta.date;
		const opencormessage=_("click and select one or more *.cor file in your local drive");

		return E("div",{className:"homebar homebarbox"}
			,"???"
			,E("span",{onClick:mode!==DBSELECTOR?selectDB:null,
				className:"activedb",title:date},title)
			,"???"
			,this.props.cor?E(SearchBox,this.props):null
			,"???"
			,this.props.cor?E(ModeSelector,this.props):null
			,!this.props.cor?opencormessage:null
			//,E(SearchOptions,this.props)
		)
	}
};
module.exports=HomeBar;
},{"../model/mode":120,"./modeselector":80,"./searchbox":86,"./searchoptions":87,"ksana-localization":147,"react":"react"}],79:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const HomeBar=require("./homebar");
const DBSelector=require("./dbselector");
const BookSelector=require("./bookselector");
const BookResult=require("./bookresult");
const FuzzyResult=require("./fuzzyresult");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,BOOKRESULT,READTEXT,EXCERPTVIEW}=mode;
const ExcerptView=require("./excerptview");
const TOCView=require("./tocview");

const ReadText=require("./readtext");
const Footer=require("../components/footer");

const {observer}=require("mobx-react");

const corpora=require("../model/corpora");

const {execURL,syncURL}=require("../model/url");

const styles={
body:{overflowY:"auto",height:"96%",overflowX:"hidden"}
}

class MainScreen extends React.Component{
	componentWillMount(){
		corpora.init(this.props.corpora);
	}
	componentDidMount(){
		execURL(true);
	}
	getBody(m){
		const q=searchresult.store.q;
		const fuzzy=searchresult.store.fuzzy;
		m=parseInt(m);
		switch (m) {
			case DBSELECTOR: return DBSelector;
			case BOOKSELECTOR: return BookSelector;
			case READTEXT: return ReadText;
			case TOCVIEW: return TOCView;
			case BOOKRESULT: return q?BookResult:BookSelector;
			case EXCERPTVIEW: return fuzzy?FuzzyResult:ExcerptView;
		}
		return BookSelector;
	}
	getBodyRef(ref) {
		this.bodyref=ref;
	}
	componentDidUpdate(){
		if (this.bodyref) this.bodyref.scrollTop=0;
	}
	showFooter(){
		const m=parseInt(mode.store.mode);
		return (m!==READTEXT)?E(Footer):null;
	}
	render(){
		const cor=corpora.store.cor();
		//if (!cor) return E("div",{},"loading "+corpora.store.active);

		const props=Object.assign({},this.props,{cor});

		const bodyElement=this.getBody(mode.store.mode);

		return E("div",{}
			,E(HomeBar,props)
			,E("div",{style:styles.body,ref:this.getBodyRef.bind(this)}
				,E(bodyElement,props)
				,this.showFooter()
			)

		)
	}
};

module.exports=observer(MainScreen);
},{"../components/footer":58,"../model/corpora":116,"../model/mode":120,"../model/searchresult":121,"../model/url":123,"./bookresult":69,"./bookselector":70,"./dbselector":71,"./excerptview":75,"./fuzzyresult":76,"./homebar":78,"./readtext":84,"./tocview":89,"mobx-react":42,"react":"react"}],80:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
const mode=require("../model/mode");
const address=require("../model/address");
const excerpt=require("../model/excerpt");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,READTEXT,EXCERPTVIEW}=mode;

const searchresult=require("../model/searchresult");
const GroupNav=require("./groupnav");
const GoPage=require("../components/gopage");
const {observer}=require("mobx-react");
class ModelSelector extends React.Component{
	gotopage(){
		const group=this.props.cor.groupOf(address.store.main);
		const range=this.props.cor.groupKRange(group);
		
		return E(GoPage,{cor:this.props.cor, range, readText:mode.readText});
	}
	showExcerpt(){
		excerpt.showExcerpt();
		mode.excerptView();
	}
	render(){
		const m=mode.store.mode;
//		const showBookResult=searchresult.store.filtered && searchresult.store.filtered.length 
//				&& searchresult.store.q;
		const hasExcerpt=searchresult.store.filtered&&searchresult.store.filtered.length;

		return E("span",{},
			E("a",{className:(m==BOOKSELECTOR?"activemodelink":"modelink"),onClick:mode.selectBook},_("Home Page")),
			" ",
			m==READTEXT?E("a",{className:(m==TOCVIEW?"activemodelink":"modelink"),onClick:mode.tocView},_("TOC View")):null,
			" ",
//			showBookResult?E("a",{className:(m==BOOKRESULT?"activemodelink":"modelink"),onClick:mode.groupByBook},_("Group By Book")):null,
//			" ",
			hasExcerpt?E("a",{className:(m==EXCERPTVIEW?"activemodelink":"modelink"),onClick:this.showExcerpt},_("Excerpt")):null,
			" ",
			m==READTEXT?E(GroupNav,{setAddress:address.setMain,address:address.store.main,cor:this.props.cor}):null,
			" ",
			(m==READTEXT||m==TOCVIEW)?this.gotopage():null
		)
	}
}

module.exports=observer(ModelSelector);
},{"../components/gopage":59,"../model/address":115,"../model/excerpt":117,"../model/mode":120,"../model/searchresult":121,"./groupnav":77,"ksana-localization":147,"mobx-react":42,"react":"react"}],81:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReferenceView=require("./referenceview");
const DictView=require("./dictview");
const styles={
	container:{display:"flex",flexDirection:"column",height:"100%"},
	dictionary:{flex:2,overflowY:"auto"},
	reference:{height:"80%"},
}
class ReadAux extends React.Component {
	render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.dictionary},E(DictView,this.props)),
			E("div",{style:styles.reference},E(ReferenceView,this.props))
		)
	}

}

module.exports=ReadAux;
},{"./dictview":72,"./referenceview":85,"react":"react"}],82:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {observer}=require("mobx-react");

const {CorpusView}=window.KsanaCorpusView||require("ksana-corpus-view");
const decorators=require("../decorators");
const quoteCopy=require("../unit/quotecopy");
//const {getExternalField}=require("../unit/fields");
const TOCNav=require("../components/tocnav");
const ReadMainmenu=require("./readmainmenu");
const {fetchArticle,loadArticleMarkup}=require("../unit/article");
const mode=require("../model/mode");
const {openLink}=require("../model/address");
const corpora=require("../model/corpora");
const selection=require("../model/selection");
const searchresult=require("../model/searchresult");
const markups=require("../model/markups");
const address=require("../model/address");
const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:0,top:0}
}

class ReadMain extends React.Component {
	constructor(props) {
		super(props);
		const kpos=this.getCaretKPos();
	this.state= {article:{at:-1},kpos};
	}
	fetch(props){
		const mrks=markups.store.markups[this.props.cor.id];
		if (this.state.address==address.store.main) {
			return;
		}

		props=props||this.props;

		const article=this.props.cor.articleOf(address.store.main);
		if (article &&article.at==this.state.article.at) return;

		fetchArticle(this.props.cor,address.store.main,mrks,(states)=>{
			//console.log(states.fields)
			states.layoutTags=this.props.cor.getParagraphBreaks(states.fields);
			if (!this._unmounted) {
				this.setState(states);
				this.setState({mrks:mrks});
			}
		})  	
	}
	componentWillUpdate(){
		const age=markups.store.age[this.props.cor.id];
		if (age&&age!==this.state.age){ //age changed
			const mrks=markups.store.markups[this.props.cor.id];
			const fields=loadArticleMarkup(this.state.fields,mrks,this.state.article.at);
			setTimeout(()=>{
				this.setState({fields,age});
			},10)
		}
		
		if (!this._unmounted) this.fetch(this.props);
	}
	componentWillMount(){
		this.fetch(this.props);
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	updateArticleByAddress(a){
		const addressH=this.props.cor.stringify(a);
		address.setMain(addressH);
	}
	getCaretKPos(){
		const r=this.props.cor.parseRange(address.store.main);
		return r.start||0;
	}
	onCursorActivity(cm,kpos) {
		const addressH=this.props.cor.stringify(kpos);
		if (kpos>1) {
			address.setMain(addressH,true);
		}
	}
	render(){
		if ( this.state.article==-1) {
			return E("div",{},"loading");
		}
		const caretpos=this.getCaretKPos();
		const navprops={caretpos,cor:this.props.cor,
			onSelectItem:this.updateArticleByAddress.bind(this)};
		const age=markups.store.age[this.props.cor.id];

		const menuprops=Object.assign({},this.props,{
			layout:mode.store.layout,
			fields:this.state.fields,hidefields:this.props.hidefields,
			setField:this.props.setField});

		const cors=corpora.openedCors();
		var layout=null;
		if(mode.store.layout && this.state.fields &&this.state.fields.p) {
			layout=this.state.layoutTags;
		};

		return E("div",{},
			E("div",{style:styles.abscontainer},
				E("div",{style:styles.nav},E(TOCNav,navprops))
			 ,E("div",{style:styles.menu},E(ReadMainmenu,menuprops))
			)
			,E(CorpusView,{address:address.store.main,
			
			cor:this.props.cor,
				corpora:cors,
			article:this.state.article,
			rawlines:this.state.rawlines||[],
			layout,
			decorators,
			onCursorActivity:this.onCursorActivity.bind(this),
			copyText:quoteCopy,
			fields:this.props.displayField(this.state.fields),
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink,
			showNotePopup:this.props.showNotePopup,
			//showLinkPopup:this.props.showLinkPopup,
			showPageStart:true,
			autoFollowSingleLink:true,//auto follow single link 
			setSelection:selection.setSelection.bind(this),
			searchresult:searchresult.store,
			//theme:"ambiance"
			})
		);
	}
}

module.exports=observer(ReadMain);
},{"../components/tocnav":66,"../decorators":96,"../model/address":115,"../model/corpora":116,"../model/markups":119,"../model/mode":120,"../model/searchresult":121,"../model/selection":122,"../unit/article":125,"../unit/quotecopy":136,"./readmainmenu":83,"ksana-corpus-view":144,"mobx-react":42,"react":"react"}],83:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const FieldSelector=require("../components/fieldselector");
const {loadExternalMarkup}=require("../model/markups");
const styles={
	container:{cursor:"pointer"},
	inputfile:{opacity:0,zIndex:-1},	
	closebutton:{cursor:"pointer"},
	error:{background:"red",color:"yellow"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
const mode=require("../model/mode");
class ReadMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true,lasterror:""});
	}
	constructor(props){
		super(props)
		this.state={opened:false};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	loadmarkup(e){
		this.setState({lasterror:"loading"});
		loadJSON(e.target.files[0],json=>{
			const meta=json.shift();
			
			if (meta.corpus!==this.props.cor.id) {
				this.setState({lasterror:"markup is not for this corpus"});
			} else {
				this.setState({lasterror:"",first:meta.first});
				loadExternalMarkup(meta,json,this.props.cor);
			}
		});
	}
	gotofirst(){
		this.setState({first:null,opened:false});
		this.props.setA(this.state.first);
	}
	renderFirstMarkup(){
		if (this.state.first) {
			return E("button",{onClick:this.gotofirst.bind(this)},_("View First Markup"));
		}
	}
	togglelayout(){
		mode.setLayout(this.props.layout?0:1,true);
	}

	render(){
		const layout=this.props.layout;
		const hasP=this.props.fields&&this.props.fields.p &&
		this.props.fields.p.pos&&this.props.fields.p.pos.length;
		var layoutable=hasP;
		if (window.accelon2017 && window.accelon2017.disableLayout) {
			if (window.accelon2017.disableLayout.indexOf(this.props.cor.id)>-1){
				layoutable=false;
			}
		}
		if (this.state.opened) {
			return E("div",{className:"readmainmenu"},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"???"),
				"???",
				layoutable?E("button",{onClick:this.togglelayout.bind(this)},layout?_("Layout Off"):_("Layout On")):null,
				E("br"),
				E(FieldSelector,{fields:this.props.fields,hidefields:this.props.hidefields,setField:this.props.setField}),
				E("br"),"???",
				E("label",{htmlFor:"upload",className:"uploadmarkupbutton"},_("Load Markup")),
				E("input",{type:"file",style:styles.inputfile,accept:".json",
					id:"upload",onChange:this.loadmarkup.bind(this)}),
				this.renderFirstMarkup(),
				E("span",{style:styles.error},this.state.lasterror)
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},
			E("span",{className:"hamburger"},"???"))
	}
}

module.exports=ReadMainmenu;
},{"../components/fieldselector":56,"../model/markups":119,"../model/mode":120,"../unit/localfile":132,"ksana-localization":147,"react":"react"}],84:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReadMain=require("./readmain");
const ReadAux=require("./readaux");
const NotePopup=require("../components/notepopup");
const LinkPopup=require("../components/linkpopup");
const mpps=require("../unit/mpps");
const {openLink}=require("../model/address");
const corpora=require("../model/corpora");
const address=require("../model/address");
const SplitPane=require("react-split-pane");
const styles={container:{},left:{},right:{}};
const mainsizekey="accelon2017.defaultSize";
class ReadText extends React.Component {
	constructor(props){
		super(props);
		const minSize=Math.floor(window.innerWidth * 0.35);
		const w=parseInt(localStorage.getItem(mainsizekey)||"0",10);
		const defaultSize=w||minSize*2;
		this.state={popupX:0,popupY:0,text:"",title:"",hidefields:{},
		lpopupX:0,lpopupY:0,ltitle:"",links:[],lclose:true,minSize,defaultSize};
	}
	showNotePopup(opts){
		this.setState({popupX:opts.x,popupY:opts.y,text:opts.text,notekpos:opts.kpos,
			title:opts.title,tagname:opts.tagname,popuptimestamp:new Date()});
	}
	showLinkPopup(opts){
		if (!opts) {
			this.setState({lclose:true});
		} else {
			this.setState({lclose:false,lpopupX:opts.x,lpopupY:opts.y,links:opts.links,
			lactions:opts.actions,ltitle:opts.title,lpopuptimestamp:new Date()});			
		}
	}	
	setField(field,on){
		var hidefields=this.state.hidefields;
		hidefields[field]=on;
		this.setState({hidefields});
	}	
	displayField(F){
		var fields={};
		for (var i in F) {
			if (!this.state.hidefields[i]) {
				fields[i]=F[i];
			} else {
				delete fields[i];
			}
		}
		return fields;
	}
	onSplitterDown(){

	}
	onSplitterMove(e){
		if (e.buttons==1) {
			const x=e.clientX;
			e.target.style.left=x;
		}
	}
	onSplitterUp(e){

	}
	onChangeMainSize(size){
		clearTimeout(this.timer);
			this.timer=setTimeout(function(){
	 			localStorage.setItem(mainsizekey, size);	
		},1000);
	}
	render(){
		const props=Object.assign({},this.props,{
			showNotePopup:this.showNotePopup.bind(this),
			showLinkPopup:this.showLinkPopup.bind(this),
			displayField:this.displayField.bind(this),
			hidefields:this.state.hidefields,
			setField:this.setField.bind(this)});
		
		const cors=corpora.openedCors();
		const mainAddress=address.store.main;
		const mainCorpus=corpora.store.active;
		return E("div",{},
			E(NotePopup,{x:this.state.popupX,y:this.state.popupY,openLink,
				text:this.state.text,title:this.state.title,tagname:this.state.tagname,
				kpos:this.state.notekpos,
				timestamp:this.state.popuptimestamp,cor:cors[mainCorpus]}),
			E(LinkPopup,{x:this.state.lpopupX,y:this.state.lpopupY,openLink,
				title:this.state.ltitle,links:this.state.links,cors,mainAddress,mainCorpus,
				close:this.state.lclose,
				timestamp:this.state.lpopuptimestamp,actions:this.state.lactions}),

			E(SplitPane,{split:"vertical",minSize:this.state.minSize,
				defaultSize:this.state.defaultSize,
				style:{paddingBottom:"2em"}, //need this because splitPanel set height to 100%
				onChange:this.onChangeMainSize.bind(this)
			},
				E("div",{},E(ReadMain,props))
				,E("div",{},E(ReadAux,props))
			)
		);
	}
}
module.exports=ReadText;
},{"../components/linkpopup":60,"../components/notepopup":64,"../model/address":115,"../model/corpora":116,"../unit/mpps":134,"./readaux":81,"./readmain":82,"react":"react","react-split-pane":49}],85:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const quoteCopy=require("../unit/quotecopy");
const {notarget2address}=require("../unit/taisho");
const {getAnchorAddress}=require("../unit/anchor");
const decorators=require("../decorators");
const AuxMainmenu=require("./auxmainmenu");
const mode=require("../model/mode");
const address=require("../model/address");
const selection=require("../model/selection");
const markups=require("../model/markups");
const corpora=require("../model/corpora");
const {observer}=require("mobx-react");
const {autorun}=require("mobx");
const {linkpopupmatrix}=require("../unit/popupmatrix");
const LocalFile=require("../components/localfile");
const {_}=require("ksana-localization");

const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:1,top:1}
}

class ReferenceView extends React.Component {
	constructor (props) {
		super(props);
		this.state={article:null,message:"",cor:null};
	}
	/*
	shouldComponentUpdate(nextProps,nextState){
		const r= nextProps.params.r&&
		 (nextProps.params.r!==params.store.r || (this.state.article&&(this.state.article.at!=nextState.article.at)));
		 return !!r;
	}
	*/
	fetchAddress(cor,addr,mrks){
		if (addr&&!this._unmounted) {
			this.setState({message:"loading "+addr});
		}

		if ( parseInt(addr,10).toString(10)==addr) {
			addr=cor.stringify(addr);
		}
		fetchArticle(cor,addr,mrks,function(states){
			console.log(states)
			const r=address.store.aux;
			if (!this._unmounted) {
				this.setState(Object.assign({},states,{addr,cor,message:null,r}));
			}
		}.bind(this));
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	componentDidMount(){
		autorun(()=>{
			const a=address.store.aux;
			//make sure loadtext when user open a local file
			const c=Object.keys(corpora.store.corpora).length;
			clearTimeout(this.timer);
			this.timer=setTimeout(function(){
				if (!this._unmounted) this.loadtext(this.props);	
			}.bind(this),200+c);
		});		
	}
	loadtext(props){
		props=props||this.props;
 		if (!address.store.aux)return ;
		const r=address.store.aux.split("@");
		const corpus=r[0].toLowerCase(); //Taisho ==> taisho		
		const cor=corpora.store.cor(corpus);
		if (!cor) {
			if (!mode.store.fileprotocol) {
				corpora.open(corpus);
			}
			return;
		}

		var addr=r[1];
		if (parseInt(addr,10).toString(10)==addr) {
			addr=cor.stringify(addr);
		}
		const range=cor.parseRange(addr);
		const mrks=markups.store.markups[corpus];
		if (!range.start) {
			if (r[0]=="Taisho") { //not page number, sutra id with optional i
				notarget2address(cor,addr,newaddress=>{
					if (this.state.address!=newaddress) {
						this.fetchAddress(cor,newaddress,mrks);
					}
				});
				return;
			}

			const a=getAnchorAddress(cor,addr);
			if (a) this.fetchAddress(cor,a,mrks);
		} else {
			this.fetchAddress(cor,addr,mrks);
		}
	}
	updateArticleByAddress(addr){
		const addressH=this.state.cor.stringify(addr);
		address.setMain(addressH);
	}	
	updateMainText(fulladdress){
		const r=fulladdress.split("@");
		const cor=corpora.store.cor(r[0]);
		var a=r[1];
		if (parseInt(a,10).toString()==a) {
			a=parseInt(a,10);
		}
		if (cor) {
			const range=cor.parseRange(a);
			if (!range.start) a=cor.stringify(getAnchorAddress(cor,a));
		}
		corpora.setActive(r[0]);
		address.setMain(a);
	}
	followLinks(cm,links,actions){
		if (links.length<2) {
			this.props.showLinkPopup(null);//hide the popup
			return false;//use default
		}
		const coords=cm.cursorCoords(cm.getCursor());

		var y=coords.top-linkpopupmatrix.height-80;
		if (y<50) y=coords.top+30;
		var x=coords.left-30;
		
		this.props.showLinkPopup({x,y,links,title:_("backlink"),actions});
		return true;
	}
	openfile(e){
		const id=e.target.files[0];
		for (var i=0;i<e.target.files.length;i++) {
			if (!e.target.files[i])continue;
			const corpus=e.target.files[i];
			corpora.open(corpus);
		}
	}
	render(){
		const r=address.store.aux.split("@");
		if (this.state.message||!this.state.article) {
			if (mode.store.fileprotocol&&r[0]) {
				return E("div",{},
					E("span",{},_("Require Cor:")),
					E("span",{style:{fontWeight:700,size:"125%"}}
						,r[0]),
					E(LocalFile,{openfile:this.openfile.bind(this)})
				)
			}
			return E("div",{},this.state.message);
		}
		
		const menuprops=Object.assign({},this.props,{
			cor:this.state.cor,
			corpus:r[0],
			address:this.state.address});
		const cors=corpora.openedCors();
		return E("div",{},
			E("div",{style:styles.abscontainer},
			 E("div",{style:styles.menu},E(AuxMainmenu,menuprops))
			)

			, E(CorpusView,{address:this.state.address,
			fulladdress:address.store.aux,
			decorators,
			id:"aux",
			cor:this.state.cor,
			corpora:cors,
			article:this.state.article,
			rawlines:this.state.rawlines,
			fields:this.props.displayField(this.state.fields),
			followLinks:this.followLinks.bind(this),
			showNotePopup:this.props.showNotePopup, //called by decorators/popupnote 
			copyText:quoteCopy,
			showPageStart:true,
			setSelection:selection.setSelection.bind(this),
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.updateMainText.bind(this),
			aux:true//open Link will update main text
			})
		);
	}
}
module.exports=observer(ReferenceView);
},{"../components/localfile":61,"../decorators":96,"../model/address":115,"../model/corpora":116,"../model/markups":119,"../model/mode":120,"../model/selection":122,"../unit/anchor":124,"../unit/article":125,"../unit/popupmatrix":135,"../unit/quotecopy":136,"../unit/taisho":137,"./auxmainmenu":67,"ksana-corpus-view":144,"ksana-localization":147,"mobx":43,"mobx-react":42,"react":"react"}],86:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const mode=require("../model/mode");
const excerpt=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const address=require("../model/address");


class SearchBox extends React.Component {
	constructor(props){
		super(props)
		this.state={q:searchresult.store.q||""}
	}
	componentWillReceiveProps(nextProps,nextState){
		this.setState({q:searchresult.store.q});
	}
	tryAddress(q){
		var address=false;
		const r=this.props.cor.parseRange(q);
		if (r.start) {
			address=q;
		}
		
		return address;
	}
	search(){
		const a=this.tryAddress(this.state.q);
		if (a) {
			searchresult.setQ("");
			mode.readText();
			address.setMain(a);
		} else {
			searchresult.setQ(this.state.q,function(){
				excerpt.showExcerpt(0);
				mode.excerptView();
			});
			this.input.focus();
		}
	}
	setRef(ref){
		this.input=ref;
	}
	onChange(e){
		this.setState({q:e.target.value});
	}
	onKeyPress(e){
		if (e.key==="Enter") this.search();
	}
	render(){
		return E("span",{className:"searchbox"},
			E("input",{className:"input",placeholder:_("Puncuation to enable Fuzzy Search"),ref:this.setRef.bind(this),value:this.state.q,
				onChange:this.onChange.bind(this),onKeyPress:this.onKeyPress.bind(this)})
			,E("button",{className:"button",onClick:this.search.bind(this)},_("Search"))
		)
	}
};
module.exports=SearchBox;
},{"../model/address":115,"../model/excerpt":117,"../model/mode":120,"../model/searchresult":121,"ksana-localization":147,"react":"react"}],87:[function(require,module,exports){
const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
class SearchOptions extends React.Component {
	render(){
		return E("span",{},
			"????????????"
			,E("input",{size:1})
		)
	}
};
module.exports=SearchOptions;
},{"react":"react"}],88:[function(require,module,exports){
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{overflowY:"auto"}
}
const {observer}=require("mobx-react");
const {groupTitle}=require("../unit/humantext");
const excerpt=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const {_}=require("ksana-localization");
class SortByBook extends React.Component {
	gotogroup(n){
		const grouphits=searchresult.store.grouphits;
		var g=0,start=0;
		while (n>0 && g<grouphits.length) {
			start+=grouphits[g++];
			n--;
		}
		excerpt.showExcerpt(start);
	}
	sortResult(sort){
		const groupNames=this.props.cor.groupNames();
		if (!sort) {
			return groupNames.map((i,idx)=>idx);
		}
		if (!searchresult.store.q||!searchresult.store.grouphits)return [];

		var out=[]; //group id,hit

		
		for (var i=0;i<groupNames.length;i++) {
			const hit=searchresult.store.grouphits[i] || 0;
			out.push([i,hit]);
		}
		out.sort((a,b)=>b[1]-a[1]);
		return out.map(a=>a[0]);
	}
	rendergroup(g,key){
		if (!searchresult.store.q||!searchresult.store.grouphits)return;
		const hit=searchresult.store.grouphits[g] || 0;
		const gname=this.props.cor.groupNames()[g];
		const title=gname.replace(/;.*/g,"");
		const hint=gname.replace(/.*;/,"");
		const label=groupTitle(hint,this.props.cor);
		if (!hit) return null;

		return E("li",{key,className:"bookresult"},
				E("a",{},
					E("span",{className:"hit"},hit),
					E("span",{className:"bookname",onClick:this.gotogroup.bind(this,g),title},label)
				)				
		);
	}
	render(){
		const groups=this.sortResult(this.props.sort);
		const groupWithHits=searchresult.store.grouphits.filter(item=>!!item).length;
		return E("div",{className:"mui-dropdown"},
  				E("button",{ className:"mui-btn",
  				 "data-mui-toggle":"dropdown"},
    				_("total book")+" "+groupWithHits,
    			E("span",{className:"mui-caret"})
 				),
 				E("ul",{className:"mui-dropdown__menu"},
					groups.map(this.rendergroup.bind(this)))
			);	
		}
};

module.exports=observer(SortByBook);
},{"../model/excerpt":117,"../model/searchresult":121,"../unit/humantext":131,"ksana-localization":147,"mobx-react":42,"react":"react"}],89:[function(require,module,exports){
const React =require('react');
const ReactDOM =require('react-dom');
const PT=React.PropTypes;
const E=React.createElement;
const mode=require("../model/mode");
const address=require("../model/address");

class TOCView extends React.Component {
	constructor(props){
		super(props);
		const MAX_LEVEL=32;
		var indents=[],s="";
		for (var i=0;i<MAX_LEVEL;i++) {
			indents.push(s);
			s+="???";
		}
		this.state={toc:null,indents,kpos:0};
	}
	buildToc(rawtoc){
		var toc=[];
		for (var i=0;i<rawtoc.length;i++) {
			const item=rawtoc[i];
			const parts=item.split("\t");
			const depth=parseInt(parts[0]);
			const label=parts[1].replace(/\r?\n/g,"");
			const kpos=parseInt(parts[2],36);
			toc.push([kpos,depth,label])
		}
		return toc;
	}
	componentDidMount(){		
		const group=this.props.cor.groupOf(address.store.main);
		const kpos=this.props.cor.parseRange(address.store.main).start;
		
		this.props.cor.getGroupTOC(group,function(rawtoc){
			const toc=this.buildToc(rawtoc);
			this.setState({toc,kpos});
		}.bind(this));
	}
	gotocitem(e) {
		const kpos=parseInt(e.target.dataset.kpos);
		const addr=this.props.cor.stringify(kpos);
		address.setMain(addr);
		mode.readText();
	}
	componentDidUpdate(){ 
		setTimeout(function(){ //scroll to closest toc node
			const ref=this.refs.toclabel_selected;
			if (ref && this.refs.body){
				ref.scrollIntoView(false);
				//const container=this.refs.body.parentElement;
				//container.scrollTop+=window.innerHeight/2;
			} 
		}.bind(this),100); //need to wait react to update DOM
	}
	renderItem(item,key,toc){
		const kpos=item[0], indent=this.state.indents[item[1]], label=item[2];
		const pg=this.props.cor.pageOf(kpos)+1;
		var extra="";

		if (this.state.kpos>=kpos && key<toc.length-1 && this.state.kpos<toc[key+1][0]) {
			extra=" toclabel_selected"
		}
		return E("div",{key},indent,
			E("span",{"data-kpos":kpos,className:"toclabel"+extra,ref:extra.trim(),
				title:"Page "+pg,onClick:this.gotocitem.bind(this)},label));
	}
	render(){
		if (!this.state.toc) return E("div",{},"loading toc");
		if (!this.state.toc.length) return E("div",{},"Empty TOC");

		const group=this.props.cor.groupOf(address.store.main);
		const range=this.props.cor.groupKRange(group);
		
		
		return E("div",{ref:"body"},
			this.state.toc.map(this.renderItem.bind(this))
		);
	}
}

module.exports=TOCView;
},{"../model/address":115,"../model/mode":120,"react":"react","react-dom":"react-dom"}],90:[function(require,module,exports){
const createLink=function({cm,cor,field,start,end,id,target,active,actions}){
	return cm.markText(start,end,{className:"k"});
}
module.exports=createLink;
},{}],91:[function(require,module,exports){
const createCDATA=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const widget=document.createElement("div");
	widget.innerHTML=target;
	return cm.setBookmark(end,{widget,handleMouseEvents:true});
}
module.exports=createCDATA;

},{}],92:[function(require,module,exports){
const createCollation=function({cm,cor,start,end,id,tabid,target,actions,krange,field,fields}){
	if (krange.start==krange.end) { //insert
		const widget=document.createElement("span");
		widget.className="collation_insert";
		widget.innerHTML=target;
		return cm.setBookmark(start,{widget});
	} else { //replace or delete
		if (target) { //replace
			const widget=document.createElement("span");
			widget.className="collation_insert";
			widget.innerHTML=target;
			const d=cm.markText(start,end,{className:"collation_delete"});
			const newtext=cm.setBookmark(start,{widget});
			return [d,newtext];
		} else {
			return cm.markText(start,end,{className:"collation_delete"});
		}
	}
}	

module.exports=createCollation;
},{}],93:[function(require,module,exports){
const onDefMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	if (!target.action) {
		console.error("action updateArticleByAddress is not defined");
	}
	target.action&&target.action(address,target.tabid);
}
const createDef=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.className="def";
	const label=fields.noteid.value[id].replace(/.+\./,"").replace(/^0+/,"");
	dom.innerHTML=label;
	if (label=="1") dom.className+=" defgroup";
	dom.dataset.target=target;
	dom.onmousedown=onDefMouseDown;
	dom.action=actions.updateArticleByAddress;
	dom.cor=cor;
	dom.tabid=tabid;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=createDef;
},{}],94:[function(require,module,exports){
const createHead=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	return cm.markText(start,end,{className:"head head"+target});
}

module.exports=createHead;
},{}],95:[function(require,module,exports){
const createImage=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const container=JSON.stringify(start)==JSON.stringify(end)?"span":"div";
	const widget=document.createElement(container);
	const img=document.createElement("img");
	img.src='data:img/'+field+';base64,'+target;
	img.title=cm.doc.getRange(start,end);
	widget.appendChild(img);

	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createImage;

},{}],96:[function(require,module,exports){
const ptr=require("./ptr");
const def=require("./def");
const note=require("./note");
const link=require("./link");
const bilink=require("./bilink");
const k=require("./bilink");
const kepan=require("./kepan");
const figure=require("./table");
const table=require("./table");
const translation=require("./translation");
const head=require("./head");
const rubynote=require("./rubynote");
const mppsnote=require("./popupnote");
const yinshunnote=require("./popupnote");
const footnote=require("./popupnote");
const cdata=require("./cdata");
const jpeg=require("./image");
const png=require("./image");
const inlinesvg=require("./inlinesvg");
const svg=require("./table");
const punc=require("./punc");
const pu=require("./punc");
/* might be simplified to maketext with className same as type */
const inlinenote=require("./inlinenote");
const jin=require("./jin");
const p=require("./p");
const span=require("./span");
const rend=require("./rend"); //same as span for TEI rend
const origin=require("./origin");
const collation=require("./collation");
module.exports={ptr,def,note,link,k,bilink,figure,table,kepan,translation,cdata,
	inlinesvg,
	mppsnote,yinshunnote,inlinenote,jin,p,span,head,rend,footnote,origin,rubynote,png,jpeg,svg
,punc,pu,collation}
},{"./bilink":90,"./cdata":91,"./collation":92,"./def":93,"./head":94,"./image":95,"./inlinenote":97,"./inlinesvg":98,"./jin":99,"./kepan":100,"./link":101,"./note":102,"./origin":103,"./p":104,"./popupnote":105,"./ptr":106,"./punc":107,"./rend":108,"./rubynote":109,"./span":110,"./table":111,"./translation":112}],97:[function(require,module,exports){
const createInlineNote=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	return cm.markText(start,end,{className:"inlinenote"});
}

module.exports=createInlineNote;
},{}],98:[function(require,module,exports){
const createInlineSVG=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const widget=document.createElement("img");
	widget.src="data:image/svg+xml;utf8,"+encodeURI(target);
	widget.style="height:1.4em";
	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createInlineSVG;

},{}],99:[function(require,module,exports){
const createJin=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		return cm.markText(start,end,{className:"jin"});
}

module.exports=createJin;
},{}],100:[function(require,module,exports){
var linktimer;
const onKepanMouseOver=function(e){
	const action=e.target.action;
	const go=e.target.dataset.go;
	popuptimer=setTimeout(function(){
		action(go);
	},400);
}
const onKepanMouseLeave=function(e){
	clearTimeout(popuptimer);
}

const createKepanItem=function(cor,depth,label,target,actions,tabid){
	const kepanwidget=document.createElement("div");
	var clsname="kepanlevel kepanlevel"+depth;

	if (tabid!="aux") {
		kepanwidget.dataset.go=cor.id+"@"+target;
		kepanwidget.action=actions.openLink;
		kepanwidget.onmouseover=onKepanMouseOver;
		kepanwidget.onmouseleave=onKepanMouseLeave;
		clsname+=" kepanresponsive"
	}
	kepanwidget.className=clsname;
	kepanwidget.innerHTML=label;

	return kepanwidget;
}
const createKepans=function(cor,parent,strings,actions,tabid){
	if (typeof strings=="string") strings=[strings];
	for (var i=0;i<strings.length;i++) {
		var indent="";
		var m=strings[i].match(/^(\d)\t(.+?)\t([\d\.pa-z\-]+)/);
		if (m) {
			const depth=parseInt(m[1],10);
			parent.appendChild(createKepanItem(cor,depth,m[2],m[3],actions,tabid));
		}
	}
}
const createKepan=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="kepan";
		createKepans(cor,widget,target,actions,tabid);

		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createKepan;
},{}],101:[function(require,module,exports){
const onLinkMouseDown=function(e){
	const target=e.target;
	const fulladdress=e.target.target;
	e.stopPropagation();
	if (!target.action) {
		console.error("action openLink is not defined");
	}
	target.action&&target.action(fulladdress,target.cor);	
}
/* TODO , show link only when in cursor ,
to save some dom node*/
const createLink=function({cm,cor,start,end,fields,krange,id,target,active,actions}){
	if (start.ch==end.ch && start.line==end.line) {
		if (target instanceof Array) {
			target=target[0];
		}
		const dom=document.createElement("span");
		dom.className="notelink";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=target;
		dom.target=target;
		return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
	} else {
		const dom=document.createElement("span");
		dom.className="link";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=cm.getRange(start,end);
		dom.target=target;
		
		// ?????? link (ref ??????) ???????????? inlinenote ??????
		// ????????? <note place="inline">..<ref >..</ref>...</note>
		// ???????????? : ????????? fields ???, ?????? value ??? inlinenote
		// ?????? pos ?????? inlinenote ?????????
		// ?????? krange ????????? link ?????????, ????????? inlinenote ???????????????
		// ???????????????????????? inlinenote ?????????
		// 2019/4/20 by heaven
		{
			for(i=0;i<fields['span']['pos'].length;i++)
			{
				var span_pos = fields['span']['pos'][i];
				var span_value = fields['span']['value'][i];
				if(span_value == "inlinenote")
				{
					// ?????? inlinenote ??????
					var this_range;
					if(cor.isRange(span_pos)) 
					{
						//const r=cor.breakRange(span_pos);
						// ?????????????????????, ???????????????, ????????? range ???????????????
						{
							var maxrange=Math.pow(2,cor.addressPattern.rangebits);
							var this_dis = Math.floor(span_pos%maxrange);
							var this_s = Math.floor(span_pos/maxrange);
							var this_e = this_s + this_dis;		
							this_range = {start:this_s , end:this_e};
						}
						
						// ?????????????????? inlinenote ??????
						if(krange.start >= this_range.start && krange.end <= this_range.end)
						{
							// clase ?????? inlinenote , ??????????????????
							dom.className="link inlinenote";
							break;
						}
					}
				}
			}
		}
		return cm.markText(start,end,{replacedWith:dom,handleMouseEvents:true});
		//.onmousedown=onLinkMouseDown;
	}
}
module.exports=createLink;
},{}],102:[function(require,module,exports){
const onNoteMouseDown=function(e){
	console.log(e)
}
var entertimer,leavetimer;
const onNoteEnter=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	const target=e.target;
	entertimer=setTimeout(function(){
		target.innerHTML=target.dataset.target;	
	},400);
}

const onNoteLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.id;
	},50);
}

const note=function({cm,cor,start,end,id,target}){
	const dom=document.createElement("span");
	dom.className="note";
	if (target.indexOf("\t")>-1) {
		const t=target.split("\t");
		id=t.shift();
		target=t.join("");
	}
	dom.innerHTML=id;
	dom.dataset.id=id;
	dom.dataset.target=target;
	dom.onmousedown=onNoteMouseDown;
	dom.onmouseenter=onNoteEnter;
	dom.onmouseleave=onNoteLeave;
	dom.cor=cor;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=note;
},{}],103:[function(require,module,exports){
const onOriginMouseDown=function(e){
	e.target.action(e.target.dataset.target)
	e.stopPropagation()
}
const createOrigin=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const widget=document.createElement("span");
	widget.innerHTML=target.replace(/.+@/,"");
	widget.className="origin";
	widget.dataset.target=target;
	widget.onmousedown=onOriginMouseDown;
	widget.action=actions.openLink;
	widget.cor=cor;
	return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createOrigin;
},{}],104:[function(require,module,exports){
const createP=function({cm,cor,corpus,field,start,end,id,tabid,target,actions,fields}){
	if (start.ch==0) { //taisho has p within line
		const dom=document.createElement("span");
		dom.className="p";
		return cm.setBookmark(start,{widget:dom});		
	}
//	return cm.markText(start,end,{className:"p",clearWhenEmpty:false});
}
module.exports=createP;
},{}],105:[function(require,module,exports){
var popuptimer;
const mode=require("../model/mode");
const onLinkMouseOver=function(e){
	const text=e.target.dataset.text;
	const title=e.target.innerHTML;
	const x=e.pageX,y=e.pageY;
	const action=e.target.action;
	const tagname=e.target.dataset.tagname;
	const kpos=parseInt(e.target.dataset.kpos,10)||0;
	popuptimer=setTimeout(function(){
		action({title,text,x,y,tagname,kpos});
	},500);
}
const onLinkMouseLeave=function(e){
	clearTimeout(popuptimer);
}
const createPopupNote=function({cm,cor,corpus,field,kpos,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className=field+ (layout?"":(" "+field+"_ori"));
	dom.onmouseover=onLinkMouseOver;
	dom.onmouseleave=onLinkMouseLeave;
	dom.action=actions.showNotePopup;
	dom.cor=cor;
	dom.dataset.tagname=field;
	dom.dataset.kpos=kpos;
	if (target instanceof Array) {
		target=target.sort(); // for mpps footnote 1.221, 1.222
		var idarr=[],textarr=[];
		for (var i=0;i<target.length;i++) {
			const parts=target[i].split("\t");
			if (parts.length>1) {
				const noteid=parts.shift().match(/^[\d\.]+/), 
				notetext=parts.join("\n").trim();
				idarr.push(noteid?noteid[0]:id);
				textarr.push(noteid+"\n"+notetext);
			} else {
				const noteid=target[i];
				idarr.push(noteid?noteid[0]:id);
				textarr.push(target[i]);
			}
		}
		dom.innerHTML=idarr.join(";");
		dom.dataset.text=textarr.join("\n\n");
	} else {
		const parts=target.split("\t");
		if (parts.length>1) {
			const noteid=parts.shift(),
			notetext=parts.join("\t").trim();

			dom.innerHTML=noteid?noteid:id;
			dom.dataset.text=notetext;
		} else {
			const nid=target.match(/^[\d\.]+/);
			dom.innerHTML=nid?nid:id;
			dom.dataset.text=target;
		}
	}

	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPopupNote;

},{"../model/mode":120}],106:[function(require,module,exports){
const mode=require("../model/mode");

const onPtrMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	if (!target.action) {
		console.error("action updateArticleByAddress not defined");
	}
	target.action&&target.action(address,target.tabid);
	e.target.innerHTML=e.target.dataset.id;
}

var entertimer,leavetimer;
const onPtrEnter=function(e){
	const target=e.target;
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	entertimer=setTimeout(function(){
		const layout=mode.store.layout;
		//+1 to include tailing puncuation
		target.className="ptr"+ (layout?"":(" ptr_ori"));
		const text=target.cor.getText(parseInt(target.dataset.target,10)+1,function(data){
			target.innerHTML=data.join("");
		});
		if ( text instanceof Array) {
			text=text.join("");
		}
		target.innerHTML=text;//if text is ready, call back will be ignored
	},50);
}
const onPtrLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	const layout=mode.store.layout;
	target.className="ptr"+ (layout?"":(" ptr_ori"));
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.id;
	},50);
}
const createPtr=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className="ptr"+ (layout?"":(" ptr_ori"));
	dom.innerHTML=fields.noteid.value[id].replace(/.+\./,"").replace(/^0+/,"");
	dom.dataset.id=dom.innerHTML;
	dom.dataset.target=target;
	dom.onmousedown=onPtrMouseDown;
	dom.cor=cor;
	dom.tabid=tabid;
	dom.action=actions.updateArticleByAddress;
	dom.onmouseenter=onPtrEnter; //problematic for position:absolute
	dom.onmouseleave=onPtrLeave;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPtr;
},{"../model/mode":120}],107:[function(require,module,exports){
var indexOfSorted = function (array, obj, near) {
  var low = 0, high = array.length, mid;
  while (low < high) {
    mid = (low + high) >> 1;
    if (array[mid] === obj) return mid;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  if (near) return low;
  else if (array[low] === obj) return low;else return -1;
};

const createPunc=function({cm,cor,start,end,id,tabid,target,actions,krange,field,fields}){
	var className=field;
	if (field=="punc" && fields.pu) {
		const kpos=indexOfSorted(fields.pu.pos,krange.start);
		if (fields.pu.pos[kpos]==krange.start) {
			className="punc_overlap";
		}
	}
	const widget=document.createElement("span");
	widget.className=className;
	widget.innerHTML=target;
	return cm.setBookmark(start,{widget});
}	

module.exports=createPunc;
},{}],108:[function(require,module,exports){
// tag specified in  -corpus.json  will be render with css class
const createRend=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	if (target instanceof Array) { //array of className
		className=target.join(" ");
		return cm.markText(start,end,{className});
	}
	var className=target;
	const at=target.indexOf("|"); //has attributes
	if (at>0) {
		className=target.substr(0,at);
	} else {
		if (target.indexOf(":")>0) {
			return cm.markText(start,end,{css:target});
		}
	}
	return cm.markText(start,end,{className});
}

module.exports=createRend;
},{}],109:[function(require,module,exports){
const mode=require("../model/mode");
const createRubyNote=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	const widget=document.createElement("span");
	const layout=mode.store.layout;
	const field="rubynote";
	widget.className=field+ (layout?"":(" "+field+"_ori"));
	widget.innerHTML=target;
	widget.cor=cor;
	return cm.setBookmark(start,{widget});
}

module.exports=createRubyNote;
},{"../model/mode":120}],110:[function(require,module,exports){
const createSpan=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	if (target.indexOf(":")>0) {
		return cm.markText(start,end,{css:target});
	} else {
		var className=target;
		if (target instanceof Array) {
			className=target[0];
		}
		return cm.markText(start,end,{className});
	}
}

module.exports=createSpan;
},{}],111:[function(require,module,exports){
const adjustsize=function(e){
	const ins=e.target.value=="???";
	replacedWith=e.target.parentElement;
	var ratio=replacedWith.ratio;
	ratio=ins?ratio*1.1:ratio/1.1;
	if (ratio>5)ratio=5;
	if (ratio<0.3)ratio=0.3;

	replacedWith.ratio=ratio;

	replacedWith.style.width=Math.floor(replacedWith.w*ratio)+"%";
	replacedWith.style.height=Math.floor(replacedWith.h*ratio)+"%";
	e.stopPropagation();
}
const newwindow=function(e){
	e.target.innerHTML;
	e.stopPropagation();
}
//give each style a unique name
const resolveStyleConflict=function(svgcontent,id){
	return svgcontent.replace(/st(\d+)/g,function(m,m1){
		return "st"+id+"-"+m1;
	})
}
const createTable=function({cm,cor,start,end,id,tabid,target,actions,field,fields}){
	// ..\unit\mpps contains the code to replace of svg in footnote 
	const replacedWith=document.createElement("div");
	//var svgcontent=target.replace(/ height=".*?"/,'height="100%"');
	//svgcontent=svgcontent.replace(/ width=".*?"/,'width="100%"').replace(/\r?\n/g,"");
	const filename=target.match(/\S+\.svg/) || "noname.svg";

	var svgcontent=target.replace(/<!--.+?-->\r?\n?/g,"")
	.replace(/<!DOCTYPE.+?>\r?\n/,"").replace(/<\?xml.+>\r?\n/,"");
	replacedWith.className="inlinesvg";

	const opennew=document.createElement("a");
	opennew.style="z-index:200"
	
	opennew.setAttribute("href","data:image/svg+xml;utf8,"+encodeURI(svgcontent));

	opennew.innerHTML="\u21E9"
	opennew.setAttribute("download",filename);
	opennew.onmousedown=newwindow;

	replacedWith.appendChild(opennew);

	const svg=document.createElement("div");
	svg.innerHTML=resolveStyleConflict(svgcontent,field[0]+id);
	replacedWith.appendChild(svg);


	var startch=start.ch;
	var textline=cm.getLine(start.line);
	if (!textline) textline="";
	const endline=cm.getLine(end.line);
	var endch=255;
	if (endline) {
		endch=endline.length;
	}

	const textbefore=textline.substr(0,start.ch);

	c=cor.kcount(textbefore);
	if (!c)startch=0;
	
	if (start.line==end.line && start.ch==endch){
		return cm.setBookmark(start,{widget:replacedWith
			,handleMouseEvents:true});
	} else {
		return cm.markText({line:start.line,ch:startch},{line:end.line,ch:endch},
			{replacedWith,handleMouseEvents:true});
	}
}
module.exports=createTable;
},{}],112:[function(require,module,exports){
const createTranslation=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="translation";
		widget.innerHTML=target;
		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createTranslation;
},{}],113:[function(require,module,exports){
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const MainScreen=require('./containers/mainscreen');
const {useStrict}=require("mobx");
const mode=require("./model/mode");
require("./localestring");
useStrict(true);

const Main=function(appopts){
	//if (window && window.location.protocol=="file:") {
		mode.selectDB();
	//}
	
	var opts=appopts;
	if (appopts.corpora instanceof Array) {
		var corpora={};
		for (var i=0;i<appopts.corpora.length;i++){
			corpora[appopts.corpora[i]]=undefined;
		}
		opts=Object.assign({},appopts,{corpora});
	}

	ReactDOM.render(E(MainScreen,opts), document.getElementById('root'))	
}
module.exports=Main;
},{"./containers/mainscreen":79,"./localestring":114,"./model/mode":120,"mobx":43,"react":"react","react-dom":"react-dom"}],114:[function(require,module,exports){
const localization=require("ksana-localization");
const stringtable={
"zh.tw":[
	["inlinenote","????????????"],
	["span","????????????"],
	["rend","????????????"],
	["punc","????????????"],
	["collation","??????"],
	["rubynote","????????????"],
	["pu","??????"],
	["p","??????"],
	["table","???"],
	["figure","???"],
	["link","??????"],
	["bilink","??????"],
	["k","??????"],
	["note","????????????"],
	["noteid","??????"],
	["jin","??????"],
	["ptr","?????????"],
	["def","??????"],
	["head","??????"],
	["mppsnote","??????"],
	["footnote","??????"],
	["origin","??????"],
	["a","???"],
	["yinshunnote","??????"],
	["kepan","??????"],
	["Search","??????"],
	["toc","??????"],
	["dictionary","??????"],
	["config","??????"],
	["source","??????"],
	["Select All","??????"],
	["Deselect All","?????????"],
	["Select DB","????????????"],
	["Home Page","?????????"],
	["Group By Book","????????????"],
	["Excerpt","??????????????????"],
	["Read Text","????????????"],
	["Matches","?????????"],
	["Sort by hit","???????????????"],
	["Prev Hit","?????????"],
	["Next Hit","?????????"],
	["Page Number","??????"],
	["TOC View","??????"],
	["Extra Line","?????????"],
	["Prev Fascicle","??????"],
	["Next Fascicle","??????"],
	["Load Markup","??????????????????"],
	["View First Markup","?????????????????????"],
	["Layout On","????????????"],
	["Layout Off","????????????"],
	["total book","?????????"],
	["Open New Window","??????????????????"],
	["Puncuation to enable Fuzzy Search","?????????????????????????????????????????????????????????"],
	["Open local cor","?????????????????????"],
	["click and select one or more *.cor file in your local drive",
	"?????????????????????????????? (??????????????????????????????????????????????????????)"],
	["Require Cor:","??????????????????"],
	["local cor","??????"],
	["local system","?????????"],
	["download","??????"],
	["about","??????"],
	["build date","?????????"],
	["no result","???????????????"],
	["unknowncor","???????????????"],
	["download latest zip and cor files, and open index.html",
	"???????????????zip?????????????????????????????????index.html"],
	["backlink","????????????"]
	],
}
for (var locale in stringtable) {
	localization.setLocale(locale);
	for (var j=0;j<stringtable[locale].length;j++) {
		const id=stringtable[locale][j][0],str=stringtable[locale][j][1];
		localization.setString(id,str);
	}
}
localization.setLocale("zh.tw");
},{"ksana-localization":147}],115:[function(require,module,exports){
const {observable,action,autorun}=require("mobx");
const mode=require("./mode");
const corpora=require("./corpora");
const store=observable({
	main:'',
	n:0,
	aux:''
});

const setMain=action((address)=>{
	store.main=address;
});
const setAux=action((address)=>{
	store.aux=address;
});
const openLink=action((fulladdress,cor)=>{
	if (fulladdress.indexOf("http:")==0||
		fulladdress.indexOf("https:")==0) {
		window.open(fulladdress);
		return;
	}
	const r=fulladdress.split("@");

	if (r.length==1) {
		store.aux=cor.id+"@"+r;
		return;
	}

	const corpus=r[0].toLowerCase();

	if (!corpora.store.corpora[corpus]) {
		if (mode.store.fileprotocol) {
			store.aux=fulladdress;	
		} else {
			corpora.open(corpus,false,function(){
				setTimeout(action(function(){//wait connect
					store.aux=fulladdress;	
				}),500);
			});
		}
	} else {
		store.aux=fulladdress;	
	}	
});
const openNewWindow=action((addr,corpus)=>{
	var url=window.location.origin+window.location.pathname+"#c="+corpus+"&m="+mode.READTEXT+"&a="+addr;
	const win=window.open(url,'_blank');
	win.focus();	
});
autorun(()=>{
	//console.log('main address change',store.main,store.aux);
});
module.exports={store,setMain,setAux,openLink,openNewWindow};
},{"./corpora":116,"./mode":120,"mobx":43}],116:[function(require,module,exports){
const {extendObservable,action}=require("mobx");
const expandVariant=require("ksana-unihan-variant").expandVariant;

var openCorpus,closeCorpus;
if (typeof KsanaCorpus!=="undefined") {	
	openCorpus=KsanaCorpus&&KsanaCorpus.openCorpus;
	closeCorpus=KsanaCorpus&&KsanaCorpus.closeCorpus;
} else {
	const KSANACORPUS="ksana-corpus";
	openCorpus=require(KSANACORPUS).openCorpus;
	closeCorpus=require(KSANACORPUS).closeCorpus;
}

const {connectCorpus}=require("../unit/connect");

const Store=function() {
	extendObservable(this,{
		corpora:{},
		active:'',
	})
	this.cor=function (corpus) {
		if (this.corpora[corpus||this.active]) {
			return openCorpus(corpus||this.active);
		}
	}

};

const store=new Store;
const openedCors=function(){
	const out={};
	for (var i in store.corpora){
		if (store.corpora[i]) {
			out[i]=openCorpus(i);
		}
	}
	return out;
}
const close=action((id)=>closeCorpus(id));
const open=(corpus,setActive,cb)=>{
	//console.log("open",corpus)
	const opts={expandVariant};
	openCorpus(corpus,opts,action((err,cor)=>{
		if (err) {
			console.log(err);
		} else {
			if (setActive) store.active=corpus;
			store.corpora[cor.id]=true;
			store.corpora=Object.assign({},store.corpora);
			connectCorpus(cor);
			cb&&cb();
		}
	}))
};

const setActive=action(corpus=>{
	store.active=corpus;
});
const init=action((_corpora)=>{
	store.corpora=_corpora;
	//store.active=Object.keys(_corpora)[0]
});
module.exports={open,close,setActive,store,init,openedCors}
},{"../unit/connect":128,"ksana-unihan-variant":148,"mobx":43}],117:[function(require,module,exports){
const {observable,action}=require("mobx");
const store=observable({
	excerpts:[]
	,extra:0
	,query:{count:0}
  	,batch:0
  	,now:0
	,hitperbatch:20
});
var fetchExcerpts;

if (typeof KsanaCorpus!=="undefined") {
	fetchExcerpts=KsanaCorpus&&KsanaCorpusSearch.excerpt.fetchExcerpts;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	fetchExcerpts=require(KSANACORPUSSEARCH).excerpt.fetchExcerpts;
}


const searchresult=require("./searchresult");
const corpora=require("./corpora");
const setExtraLine=action((l)=>{
	store.extra=l;
	showExcerpt();
});
const setNow=action(now=>{
	now=parseInt(now,10)||0;
	store.now=now;
});
const showExcerpt=action((now)=>{
	if (typeof now=="undefined") {
		now=store.now;
	}

	//store.now=now;
	//store.extra=extra;
	now=parseInt(now,10)||0;
	var line=store.extra==0?3:store.extra;

	const cor=corpora.store.cor();
	const hits=searchresult.store.filtered;
	var tpos=[];
	store.batch=Math.floor(now/store.hitperbatch);

	for (let i=0;i<store.hitperbatch;i++) {
		const at=store.hitperbatch*store.batch+i;		
		if (at<hits.length && hits[at]) tpos.push(hits[at]);
		else break;
	}
	
	fetchExcerpts(cor,{tpos,line,
		phrasepostings:searchresult.store.phrasepostings},
		action(function(excerpts){
			store.excerpts=excerpts;
			store.now=now;
	}));	
});
module.exports={store,showExcerpt,setExtraLine,setNow};
},{"./corpora":116,"./searchresult":121,"mobx":43}],118:[function(require,module,exports){
const {extendObservable,action,autorun}=require("mobx");
const corpora=require("./corpora");
const Store=function() {
	extendObservable(this,{
		filters:{},
		get active () {
			return this.filters[corpora.store.active] ||{};
		},
		get asArray(){
			const active=this.filters[corpora.store.active];
			const out=[];
			for (var i in active) {
				out[i]=active[i];
			}
			return out;
		}
	})
};
const store= new Store;
const setExcludes=action(excludes=>{
	const ex={};
	if (excludes instanceof Array) {
		for (var i=0;i<excludes.length;i++) {
			ex[i]=excludes[i];
		}
	} else {
		ex=excludes;
	}
	const corpus=corpora.store.active;
	store.filters[corpus]=ex;
	store.filters=Object.assign({},store.filters);	
})
const setExclude=action((group,value)=>{
	const corpus=corpora.store.active;
	if (!store.filters[corpus]){
		store.filters[corpus]={}
	}
	const excludes=Object.assign({},store.filters[corpus]);
	if (group instanceof Array) {
		for (var i=0;i<group.length;i++) {
			excludes[group[i]]=value;
		}
	} else {
		excludes[group]=value;			
	}
	while(excludes.length && !excludes[excludes.length-1]) excludes.pop();

	store.filters[corpus]=excludes;
	store.filters=Object.assign({},store.filters);
})

const includeAll=action(()=>{
	const corpus=corpora.store.active;
	store.filters=Object.assign({},store.filters,{[corpus]:{}});
});
const excludeAll=action(()=>{
	const corpus=corpora.store.active;
	const cor=corpora.store.cor(corpus);
	if (!cor)return;
	const groups=cor.groupNames().map(()=>1);

	while(groups.length && !groups[groups.length-1]) groups.pop();
	const excludes={};
	for (var i in groups) excludes[i]=groups[i];
	store.filters=Object.assign({},store.filters,{[corpus]:excludes});
});
autorun(()=>{
	//console.log("filters",store.filters,store.active)
})
module.exports={store, includeAll, excludeAll,setExclude,setExcludes};
},{"./corpora":116,"mobx":43}],119:[function(require,module,exports){
const {extendObservable,action,autorun}=require("mobx");
const Store=function() {
	this.markups={};
	extendObservable(this,{
		age:{}
	})
};

const store= new Store;
const setMarkup=action(function(corpus,name,markups){
	if (!store.markups[corpus]){
		store.markups[corpus]={}
	}
	store.markups[corpus][name]=markups;
	store.markups=Object.assign({},store.markups);
	store.age[corpus]=new Date();
	store.age=Object.assign({},store.age);
});


const {loadMarkup}=require("../unit/markup");
const loadExternalMarkup=function(meta,json,cor){
	const markups=loadMarkup(cor,json);
	if (markups) setMarkup(cor.id,meta.type,markups);
}
module.exports={store,setMarkup,loadExternalMarkup};
},{"../unit/markup":133,"mobx":43}],120:[function(require,module,exports){
const {observable,action,autorun}=require("mobx");

const {packBits,unpackBits}=require("../unit/bitstr");
const BOOKSELECTOR=0, READTEXT=1,TOCVIEW=2,DBSELECTOR=3,EXCERPTVIEW=11;
	//BOOKRESULT=10,
	
const isFileProtocol=function(){
	return (typeof window!=="undefined" && window.location.protocol=="file:");
}
const store=observable({
	mode:BOOKSELECTOR, //mode
	fileprotocol:isFileProtocol(),
	layout:0,//layout
	extraline:3
})

const setMode=action(m=> {
	store.mode=parseInt(m,10)||BOOKSELECTOR;
});

const setLayout=action(l=>{
	store.layout=l;
});

const selectBook=action(()=>{
	store.mode=BOOKSELECTOR;
});

const selectDB=action(()=>{
	store.mode=DBSELECTOR;
});
const readText=action(()=>{
	store.mode=READTEXT;
});
/*const groupByBook=action(()=>{
	store.mode=BOOKRESULT;
});*/

const tocView=action(()=>{
	store.mode=TOCVIEW;
});

const excerptView=action(()=>{
	store.mode=EXCERPTVIEW;
})
module.exports={store,setMode,setLayout,
	readText,selectDB,selectBook,tocView,excerptView,
	BOOKSELECTOR, READTEXT,TOCVIEW,DBSELECTOR,EXCERPTVIEW
	//BOOKRESULT,
};
},{"../unit/bitstr":126,"mobx":43}],121:[function(require,module,exports){
const {extendObservable,action}=require("mobx");
const filter=require("./filter");
const corpora=require("./corpora");
var search=null,filterMatch=null,groupStat=null;

var search,groupState,filterMatch;
if (typeof KsanaCorpusSearch!=="undefined") {
	search=KsanaCorpusSearch.search;
	groupStat=KsanaCorpusSearch.groupStat;
	filterMatch=KsanaCorpusSearch.filterMatch;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	search=require(KSANACORPUSSEARCH).search;
	groupStat=require(KSANACORPUSSEARCH).groupStat;
	filterMatch=require(KSANACORPUSSEARCH).filterMatch;
}

const Store=function() {
	this.phrasepostings=[];
	this.scores=[];
	extendObservable(this,{
		matches:[],
		timer:null,
		q:"",
		fuzzy:false,
		get filtered(){
			const cor=corpora.store.cor();
			const corpus=corpora.store.active;
			const excludes=filter.store.asArray||[];
			return filtered=filterMatch(cor,this.matches,excludes)||[];
		},
		get grouphits(){
			const cor=corpora.store.cor();
			const grouphits=groupStat(this.filtered,cor.groupTPoss());
			grouphits.shift();
			return grouphits;
		}
	});
}
const store=new Store();
var searching=false;
const setResult=action(function(opts){
	store.phrasepostings=opts.phrasepostings;
	store.matches=opts.matches;
	store.scores=opts.scores;
	store.timer=opts.timer;
	store.q=opts.q;
	store.fuzzy=opts.fuzzy;
});
const clear=action(function(){
	store.phrasepostings=[];
	store.matches=[];
})
var waitsearch=0;
function setQ(q,cb){
	if (q==store.q && store.matches.length) {
		setTimeout(function(){
			cb&&cb();
		},10);  	
		return;
	}
	action(function(){
		if (!q) {
			clear();
			q="";
		}

		store.q=q; //update q immediately
	})();

  var searchtimer=setInterval(()=>{
  	const cor=corpora.store.cor();
  	const corpus=corpora.store.active;
  	if (!cor) return;
    if (searching) {
	  waitsearch++;
	  if (waitsearch>50) clearInterval(searchtimer);
      return;
    }
  	waitsearch=0;
    searching=true;

    search(cor,q,function(result){
    	const {matches,phrasepostings,timer,fuzzy,scores}=result;
	        setResult({phrasepostings,matches,q,timer,fuzzy,scores});
	    searching=false;
	    clearInterval(searchtimer);
    	setTimeout(function(){
	     	cb&&cb();
	    },1);
    });
  },100);
}

module.exports={store,setQ,clear};
},{"./corpora":116,"./filter":118,"mobx":43}],122:[function(require,module,exports){
const {observable,action,autorun}=require("mobx");
const store=observable({
	caretText:"",
	selectionText:""
});
const setSelection=action((s)=>{
	for (var i in s){
		store[i]=s[i];
	}
});

module.exports={store,setSelection};
},{"mobx":43}],123:[function(require,module,exports){
const {action,autorun}=require("mobx");
const {parseRoute,setHashTag}=require("../unit/hashtag");
const {packBits,unpackBits}=require("../unit/bitstr");
const corpora=require("./corpora");
const address=require("./address");
const mode=require("./mode");
const searchresult=require("./searchresult");
const excerpt=require("./excerpt");
const filter=require("./filter");
const getDefaultCorpus=function(corpora){
	return Object.keys(corpora)[0];
}
var updating=false;
var synced=false;
const execURL=action((force)=> {
	if (updating && !force)return;
	console.log("execURL")

	var hash=window.location.hash;
	if (hash.match(/%[0-9A-Fa-f]/)) {
		hash=decodeURIComponent(hash);
	}
	const defaultCorpus=getDefaultCorpus(corpora.store.corpora);
	const urlparams=parseRoute(hash);
	const corpus=urlparams.c||defaultCorpus;
	const a=urlparams.a;
	const q=urlparams.q;
	const m=urlparams.m;
	const l=urlparams.l||0;
	const excludes=unpackBits(urlparams.x);
	filter.setExcludes(excludes);
	const n=parseInt(urlparams.n,10)||0;
	if (a) {
		address.setMain(a);
	} 

	const updateSearchResult=action(function(nn){
		mode.setMode(m);
		mode.setLayout(l);
		if (q) {
			setTimeout(function(){
				excerpt.showExcerpt(nn);
				mode.excerptView();	
			},1000);			
		}
	});
		
	if (!corpora.store.cor() && mode.store.fileprotocol) {
		mode.selectDB();
		return;
	}
	if (corpus!==corpora.store.active || !corpora.store.cor()) {
		corpora.open(corpus,true,function(){

			if (!synced) syncURL(); //run once
			
			if (q) {
				searchresult.setQ(q,function(){
					updateSearchResult(0);
				});
			} else {
				updateSearchResult(0);
			}
		});	
	} else {
		if (searchresult.store.q!==q){
			searchresult.setQ(q,function(){
				updateSearchResult(0);
			});			
		} else {
			updateSearchResult(n);
		}
	}
});
const updateUrl=function(urlparams){
	updating=true;
	console.log("update url",urlparams)
	setHashTag(urlparams);
	setTimeout(function(){
		updating=false;	
	},300);
}
var urlupdater=null;
const syncURL=function(){
	const execurl=function(){
		if (!updating) execURL();
	}
	window.removeEventListener('hashchange',execurl);
	window.addEventListener('hashchange', execurl);
	synced=true;
	autorun(()=>{
		const x=packBits(filter.store.asArray);
		const urlparams={
			q:searchresult.store.q,
			a:address.store.main,
			r:address.store.aux,
			l:mode.store.layout,
			m:mode.store.mode,
			c:corpora.store.active,
			e:excerpt.store.extra,
			n:excerpt.store.now,
			x
		};

		clearTimeout(urlupdater);
		urlupdater=setTimeout(updateUrl.bind(this,urlparams),500);
	});
}
module.exports={execURL};
},{"../unit/bitstr":126,"../unit/hashtag":129,"./address":115,"./corpora":116,"./excerpt":117,"./filter":118,"./mode":120,"./searchresult":121,"mobx":43}],124:[function(require,module,exports){
const getAnchorAddress=function(cor,anchor){
	 const anchors=cor.getGField("anchor");
   anchor=anchor.replace(/~.+/,"");
   if (!anchors || !anchors.value)return null;
   const at=anchors.value.indexOf(anchor);
   if (at>-1) return anchors.pos[at];
}
module.exports={getAnchorAddress:getAnchorAddress}
},{}],125:[function(require,module,exports){
const {getAnchorAddress}=require("../unit/anchor");

const fetchArticle=function(cor,address,markups,cb){
  const range=cor.parseRange(address);

  if (!range.start) {
    address=getAnchorAddress(cor,address);
  } else {
    address=cor.stringify(range.start);
  }
  const article=cor.articleOf(address);
  if (article){
    cor.getArticleTextTag(article.at ,  (res)=>{
      const fields=loadArticleMarkup(res.fields,markups,article.at);
      cb&&cb({address,article,rawlines:res.text,fields,kpos:article.start});
    }); 
  }
}
const loadArticleMarkup=function(oldfields,markups,article){
  var fields=oldfields||{};
  if (markups && Object.keys(markups).length) {
    for (var type in markups) {
      if (markups[type][article]) {
        fields=Object.assign({},fields,{[type]:markups[type][article]});
      }
    }
  }
  return fields;
}

module.exports={fetchArticle,loadArticleMarkup};
},{"../unit/anchor":124}],126:[function(require,module,exports){
const packBits=function(_bits){
	if (!_bits)return "";
	var bits=JSON.parse(JSON.stringify(_bits));
	var byte=Math.floor(bits.length / 8);
	if (bits.length % 8) byte++;
	
	var cells=[];
	for (let i=0;i<byte;i++) cells[i]=0;

	var c=0,ncell=0;
	while (bits.length) {
		const ex=bits.shift()?1:0;
		cells[ncell] +=  Math.pow(2, 7-c) * ex;
		c++;
		if (c%8==0) {
			ncell++;
			c=0;
		}		
	}
	var str="";
	for (let i=0;i<byte;i++) {
		var hex="0"+cells[i].toString(16);
		str+=hex.substr(hex.length-2);
	}

	return encodeStr(str);
}
const unpackBits=function(str,bool){
	if (!str) return [];
	str=decodeStr(str);
	var byte=Math.floor(str.length / 2);
	if (str.length % 2) byte++;
	var arr=[];
	for (let i=0;i<byte;i++) {
		const cell= str.substr(i*2,2) ;
		const v="0000000"+parseInt(cell,16).toString(2);
		var bits=v.substr(v.length-8);
		
		arr=arr.concat(bits.split("").map(i=>parseInt(i)));
	}
	while (arr.length>0 && arr[arr.length-1]==0) arr.pop();
	if (bool) {
		arr=arr.map((i)=>!!i);
	}
	return arr;
}

const encodeStr=function(str){
	if (str.length<16) return str;
	const s=str.replace(/([0-9])/g,function(m,m1){
			return String.fromCharCode(parseInt(m1)+0x67);
	});
	var out="z",i=0,prev="",count=0;
	while (i<s.length) {
		if (prev==s.charAt(i)) {
			count++;
		} else {
			if (count) out+=count.toString(10)+prev;
			count=1;
		}
		prev=s.charAt(i);
		i++;
	}
	out+=count.toString(10)+prev;
	if (out.length>str.length) return str;
	return out;
}
const decodeStr=function(str){
	if (str.charAt(0)!='z')return str;
	str=str.substr(1);
	var out="";
	str.replace(/(\d+)([a-p])/g,function(m,count,ch){
		count=parseInt(count,10);
		for (var i=0;i<count;i++) {
			out+=ch;
		}
	});
	const s=out.replace(/([g-p])/g,function(m,m1){
		return (m1.charCodeAt(0)-0x67).toString(10);
	});
	return s;
}

const test=function(){
	const t1=[1, 1,0,0,0,0,0,1,0,0,  0,0,0,0,0,0,1,1, 0,0,0,0,0,0,1,0,  0,0,0,0,0,0,0,1,1 ];
	//pack from left to right, every 8 bits into a byte
	//and convert byte to string
	//tailing 0 will be ignored
	const str=packBits(t1);
	const t2=unpackBits(str);
	if (JSON.stringify(t1)!==JSON.stringify(t2)) console.error('pack bits error');
}
const testencode=function(){
	const input="1111111111111100000000ff00000002faaaaaaaaaaaaaaaaaaaaaa000";
	const s=encodeStr(input);
	console.log(s);
	console.log('passed?',decodeStr(s)==input);
}

//test();
//testencode();
module.exports={packBits,unpackBits};
},{}],127:[function(require,module,exports){
const getSelrange=function(cor,krange){
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var selrange="p."+sp;

	if (ep!==sp) selrange="p"+selrange+'-'+ep;	
	return selrange;
}
const citation=function(cor,krange){
	if (!cor)return "";

	if (cor.meta.id=="mpps") {
		const r=cor.parseRange(krange);
		const getPin=function(rend,kpos){
			if (!rend)return;
			var pin=null;
			if (r.start==r.end) {
				kpos=cor.makeRange(r.start,r.end);
			}
			for (var i=0;i<rend.value.length;i++) {
				if (rend.value[i].substr(0,4)=="pin|") {
					pin=JSON.parse(rend.value[i].substr(4));
				}
				if (kpos<rend.pos[i]) break;
			}
			return pin;
		}
		
		const article=cor.articleOf(r.start).at;
		var rend=cor.getArticleField(article,"rend")[0];

		const pin=getPin(rend,r.range);

		var pinname="???"+pin.n+pin.t+"???";

		var gn=cor.getGroupName(krange);
		
		const toc=cor.getTOC(r.start);
		if (!pin.n) {//use article name as 
			gn='???'+gn+'???';
			pinname="";
		}

		gn=gn.replace(/(???\d+).*/,function(m,m1){return m1});

		return "???????????????????????????"+gn+pinname+"???"+getSelrange(cor,krange)+"???"
	} else {
		var gn=cor.getGroupName(krange);
		return "???"+gn+"???"+getSelrange(cor,krange);
	};
}
module.exports=citation;
},{}],128:[function(require,module,exports){
/* when a corpus is opened, connect it with already opened */
const {setMarkup}=require("../model/markups");
const BILINKSEP="<";
const regex=/<.+/;
const connect=function(cor1,cor2,output){
	if (cor1===cor2)return;
	if (!cor2.meta.linkTo) return; 
	
	for (var field in cor2.meta.linkTo) {
		if (!cor2.linkingTo(field,cor1)) continue;
		output.push([cor2.id,field,cor2.get(['gfields',field])]);
	}
	return output;
}
const groupByArticle=function(pos,value,cor){
	//group by article
	const markups={};
	for (var i=0;i<pos.length;i++) {
		const kpos=cor.parseRange(pos[i]).start;
		const a=cor.articleOf(kpos).at;
		if (!markups[a]) markups[a]={pos:[],value:[]};
		markups[a].pos.push(pos[i]);
		markups[a].value.push(value[i]);
	}
	return markups;
}
const buildReverseLinks=function(links){

	const corpora=require("../model/corpora");
	var out=[];
	const cors=corpora.openedCors();
	for (var i=0;i<links.length;i++) {
		const corpus=links[i][1].replace(/.*</,"");
		if (!cors[corpus]) continue;
		const sourcecorpus=links[i][0];
		const type=links[i][1].replace(/<.*/,"");
		const fieldname=type+BILINKSEP+sourcecorpus;
		const pv=[];
		const payload=links[i][2];
		
		for (var k=0;k<payload.pos.length;k++) {
			pv.push([payload.value[k],payload.pos[k]]);	
		}
		pv.sort((a,b)=>a[0]-b[0]);//sort by value, will became pos

		const pos=pv.map(a=>a[0]);
		const value=pv.map(a=>a[1]);
		
		const markups=groupByArticle(pos,value,cors[corpus]);
		out.push( [corpus, fieldname, markups]);
	}
	return out;
}

const connectCorpus=function(cor){
	const corpora=require("../model/corpora");
	var output=[];
	for (var db in corpora.store.corpora) {
		if (!corpora.store.corpora[db])continue;
		const tcor=corpora.store.cor(db);
		if (!tcor) continue;

		connect(cor,tcor,output);
		connect(tcor,cor,output);
	}
	const outputlinks=buildReverseLinks(output);
	for (var i=0;i<outputlinks.length;i++) {
		const corpus=outputlinks[i][0], name=outputlinks[i][1], mrks=outputlinks[i][2];
		setMarkup(corpus,name,mrks);
	}	
}

module.exports={connectCorpus};
},{"../model/corpora":116,"../model/markups":119}],129:[function(require,module,exports){
/* call actions from url */

const parseRoute=function(route){
	var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
	while(match = regex.exec(route)) {
	  params[match[1]] = match[2];
	}
	return params;
}

const setHashTag=function(newparams,replace){
	var hash=window.location.hash;
	if (hash.match(/%[0-9A-Fa-f]/)) {
		hash=decodeURIComponent(hash);
	}
	var params=parseRoute(hash);
	var key;
	for (key in newparams) {
		params[key]=newparams[key];
	}
	var p=[];
	for (key in params) {
		if (params[key]) p.push(key+"="+params[key]);
	}
	if (replace) {
			history.replaceState(undefined,undefined,"#"+p.join("&"));
	} else {
			window.location.hash=p.join("&");
	}
}

module.exports={setHashTag,parseRoute};
},{}],130:[function(require,module,exports){
var renderHits=function(text,hits,func){
	if (!text) return [];
  var i, ex=0,out=[],now;
  hits=hits||[];

  // hist ??????????????????, ?????????????????????????????????
  if(hits.length>0)
  {
    hits.sort(SortHitsFunc);
    function SortHitsFunc(a, b) 
    {
      if (a[0] === b[0]) {
          return 0;
      }
      else {
          return (a[0] < b[0]) ? -1 : 1;
      }
    }
  }

  for (i=0;i<hits.length;i+=1) {
    now=hits[i][0];
    if (now>ex) {
      const t=text.substring(ex,now);
      out.push(func({key:i},t));
      ex = now;
    }
    // ????????????????????????, ??????????????????????????????, 
    // ???????????? "????????? + ??????" , ?????????????????????
    // const stext=text.substr(now,hits[i][1]);

    if(now == ex)
    {
      const stext=text.substr(now,hits[i][1]);  
      out.push(func({key:"h"+i, className:"hl"+hits[i][2]||""},stext));
      ex = now+hits[i][1];
    }
    else if((now < ex) && (now + hits[i][1] > ex))
    {
      // now ?????? ex , ???????????????????????? ex
      // ??????????????? "????????????...." ,
      // ???????????? "?????????" , ???????????? "???" ??? "??????" ???????????????, ????????????
      // ??????????????? "?????????" , ??????????????? "???" ??????????????????

      const stext=text.substr(ex,now+hits[i][1]-ex);
      out.push(func({key:"h"+i, className:"hl"+hits[i][2]||""},stext));
      ex = now+hits[i][1];
    }
  }
  out.push(func({key:i+1},text.substr(ex)));
  return out;
};
const  buildlinelengths=function(rawtext){
  var linelengths=[];
  var acc=0;
  for (let i=0;i<rawtext.length;i++) {
    linelengths.push(acc);
    acc+=rawtext[i].length;
  }
  linelengths.push(acc);
  return linelengths;
}
const highlightExcerpt=function(cor,excerpt,phrasepostings){
  if (!phrasepostings) return [];
  const linebreaks=excerpt.linebreaks;
  const getrawline=function(line){
    return (line<excerpt.rawtext.length)?excerpt.rawtext[line]:"" ;
  };
  const linelengths=buildlinelengths(excerpt.text.split("\n"));
  var hl=[];

  for(let j=0;j<excerpt.phrasehits.length;j++) {
    const hits=excerpt.phrasehits[j].hits;
    const hitsend=excerpt.phrasehits[j].hitsend;
    if (!phrasepostings[j])continue;
    const phraselengths=phrasepostings[j].lengths;
    const linecharr=hits.map((hit,idx)=>{
      const range=cor.makeRange(hit,hitsend[idx]);
      var {start,end}=cor.toLogicalRange(excerpt.linebreaks,range,getrawline);
      const absstart=linelengths[start.line]+start.ch +start.line //for linefeed ;
      const absend=linelengths[end.line]+end.ch + end.line ;

      hl.push([absstart,absend-absstart,j]);
    });
  }

  return hl;
} 

module.exports={renderHits,highlightExcerpt}
},{}],131:[function(require,module,exports){
const	groupTitle=function(label,cor){
		const r=label.split("@");
		if (r.length==1 || !cor) return label;
		const categoryNames=cor.meta.groupPrefix||[];
		return categoryNames[parseInt(r[0],0)]+"???"+r[1]+"???";
}

module.exports={groupTitle}
},{}],132:[function(require,module,exports){
const loadJSON=function(file,cb) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				//console.log('e readAsText = ', e);
				//console.log('e readAsText target = ', e.target);
				try {
					const json = JSON.parse(e.target.result);
					//alert('json global var has been set to parsed json of this file here it is unevaled = \n');
					cb&&cb(json);
				} catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(file);
		reader.readAsText(file);
}
module.exports={loadJSON};
},{}],133:[function(require,module,exports){
const loadMarkup=function(cor,json){
//	console.time("loadmarkup"); 18K markups take 100ms
	var out=[];
	for (var i=0;i<json.length;i++) {
		if (typeof json[i]=="string") {
			json[i]=json[i].split("\t");
		}
		var address=json[i][0];
		const kpos=parseInt(json[i][0],10);
		if (kpos.toString(10)==address) { //number format
			address=kpos;
		}
		const r=cor.parseRange(address);
		
		const article=cor.articleOf(r.start).at;
		if (!out[article]) out[article]={pos:[],value:[]};	
		out[article].pos.push(r.start==r.end?r.start:r.range);
		out[article].value.push(json[i][1]);
	}
	return out;
}
module.exports={loadMarkup}
},{}],134:[function(require,module,exports){
var patterns={
 bold:/\{b[\s\S]+?b\}/g,
 kai:/\{k[\s\S]+?k\}/g,
 taisho:/@t(\d+p\d+[a-c\-0-9]*)/g,
 taisho_full:/@t(\d+p\d+[a-c][0-9]+)/g,
 yinshun_note:/@y([A-Z][0-9]+)#([0-9]+)/g,
 taisho_app:/@a(\d+p.+)/g,
 svg:/\{svg\|(.+?),([\s\S]+?)\|svg\}/g
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);

	line.replace(patterns.taisho,function(m,taisho,idx){
		const link=document.createElement("span");
		var target=taisho;
		if (!m.match(patterns.taisho_full)){
			target+="a01";//page without line number
		}
		link.innerHTML="??????"+taisho;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})

	line.replace(patterns.taisho_app,function(m,taisho,idx){
		const link=document.createElement("span");
		var target=taisho;
		link.innerHTML=taisho;
		link.className="taisho_app";
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length+1},{replacedWith:link});
	})

	line.replace(patterns.yinshun_note,function(m,filename,pg,idx){
		const link=document.createElement("span");
		link.innerHTML="????????????????????????????????????"+filename;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target="http://ya.ksana.tw/mpps_yinshun_note_img/"+filename.charAt(0)+"/"+filename+".jpg";
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})
}
const newwindow=function(e){
	e.target.innerHTML;
	e.stopPropagation();
}
const showsvg=function(e){
	const marks=e.target.doc.getAllMarks();

	for(var i=0;i<marks.length;i++) {
		const rep=marks[i].replacedWith;
		if (!rep)continue;
		svg=rep.children[0];
		if (svg!==e.target && rep.className=='footnotesvg') {
			svg.innerHTML=svg.filename+" ";
			svg.onclick=showsvg;
			svg.className='svgbutton';
			svg.doc=e.target.doc;
		}
	}

	e.target.innerHTML=e.target.svgcontent;
	e.target.className='';
	e.target.onclick=null;
}
const resolveStyleConflict=function(svgcontent,id){
	//stylesheet of svg conflict
	return svgcontent.replace(/st(\d+)/g,function(m,m1){
		return "st"+id+"-"+m1;
	})
}

const replacesvg=function(doc,from,to,svgcontent,count){
	var replacedWith=document.createElement("div");
	var filename=svgcontent.match(/\S+\.svg/) || "noname.svg";
	if (filename instanceof Array)filename=filename[0];

	var opennew=document.createElement("a");
	opennew.style="z-index:200";
	
	opennew.setAttribute("href","data:image/svg+xml;utf8,"+encodeURI(svgcontent));

	opennew.innerHTML="\u21E9";
	opennew.setAttribute("download",filename);
	opennew.onmousedown=newwindow;

	var svg=document.createElement("span");
	svg.innerHTML=resolveStyleConflict(svgcontent,count);
	svg.filename=filename;
	replacedWith.appendChild(svg);		

	replacedWith.className='footnotesvg';
	replacedWith.appendChild(opennew);

	const start=doc.posFromIndex(from);
	const end=doc.posFromIndex(to);
	doc.markText(start,end,{replacedWith});
}
var markNoteLines=function(doc,from,to,openLink,cor){

	const visitlink=function(e){
		const url=e.target.dataset.target;
		if (url.substr(0,7)==="http://") {
			window.open(url);
		} else {
			openLink("taisho@"+url);
		}
	}

	var M=doc.findMarks({line:from,ch:0},{line:to,ch:65536});
	M.forEach(function(m){m.clear()});

	for (var i=from;i<to+1;i++) {
		markLine(doc, i, visitlink);
	}

	const footnotetext=doc.getValue();

	footnotetext.replace(patterns.bold,function(m,idx,self){
		const start=doc.posFromIndex(idx);
		const end=doc.posFromIndex(idx+m.length);
		var marker=doc.markText({line:start.line,ch:start.ch+2},{line:end.line,ch:end.ch-2},
			{className:"b"});

		//hide control code
		doc.markText({line:start.line,ch:start.ch},{line:start.line,ch:start.ch+2},{className:"hide"});
		doc.markText({line:end.line,ch:end.ch-2},{line:end.line,ch:end.ch},{className:"hide"});
	});

	footnotetext.replace(patterns.kai,function(m,idx,self){
		const start=doc.posFromIndex(idx);
		const end=doc.posFromIndex(idx+m.length);
		var marker=doc.markText({line:start.line,ch:start.ch+2},{line:end.line,ch:end.ch-2},
			{className:"kai"});

		//hide control code
		doc.markText({line:start.line,ch:start.ch},{line:start.line,ch:start.ch+2},{className:"hide"});
		doc.markText({line:end.line,ch:end.ch-2},{line:end.line,ch:end.ch},{className:"hide"});
	});

	var count=0;
	footnotetext.replace(patterns.svg,function(mm,fn,text,idx){
		const m=fn.match(/M(\d+)\.(\d+)/);
		if (!m)return;
		fn=fn+".svg";
		const juan=parseInt(m[1],10),seq=m[2];
		cor.getArticleField(juan,"footnotesvg",function(field){
			const svgs=field[0].value;
			for(var i=0;i<svgs.length;i++) {
				if (svgs[i].indexOf(fn)>-1) {
					replacesvg(doc,idx,idx+mm.length,svgs[i],count);
					break;
				}
			}
		});
		count++;		
	}.bind(this),10);
}
module.exports={markNoteLines};
},{}],135:[function(require,module,exports){
const notepopupmatrix={width:800,height:175};
const linkpopupmatrix={width:200,height:100};
module.exports={notepopupmatrix,linkpopupmatrix}
},{}],136:[function(require,module,exports){
const calFascicle=function(cor,krange){
	const group=cor.groupOf(krange);
	const grange=cor.groupKRange(group)
	const r=cor.parseRange(grange[0]);
	const a=cor.articleOf(krange).at;
	const b=cor.articleOf(r.start).at;
	return (a-b+1);
}
const getTailPunc=function(str){
	const m=str.match(/([??????????????????????????????????????????????????????????????????????????????]*)$/);
	if (m) return m[1]
}
const removeHeadPunc=function(str){
	return str.replace(/^([??????????????????????????????????????????????????????????????????????????????]*)/,"");
}

const getCopyText=function(cor,krange,fields){
	if (!fields.head && !fields.p) return null;
	const r=cor.parseRange(krange);
	var f1=[],f2=[];
	if (fields.p) {
		f1=cor.trimField(fields.p,r.start,r.end).pos;
	}
	if (fields.head) {
		const f3=cor.trimRangeField(fields.head,r.start,r.end).pos;
		for (var i=0;i<f3.length;i++) {
			const rr=cor.parseRange(f3[i]);
			f2.push(rr.start);
		}
	}
	const para=f1.concat(f2);
	para.sort();

	if (!para||!para.length) {
		return removeHeadPunc((cor.getText(krange)||[]).join(""));
	}
	const out=[];
	var prev=r.start,tail="";

	for (var i=0;i<para.length;i++){
		var t=(cor.getText(cor.makeRange(prev,para[i]))||[]).join("");
		if (t.substr(0,tail.length)==tail) {
			t=t.substr(tail.length);
		}
		tail=getTailPunc(t);
		prev=para[i];
		out.push(t);
	}
	var t2=(cor.getText(cor.makeRange(para[para.length-1],r.end))||[]).join("");
	if (t2.substr(0,tail.length)==tail) {
		t2=t2.substr(tail.length);
	}	
	out.push(t2);
	return removeHeadPunc(out.join("\n"));
}

const citation=require("./citation");
const quoteCopy_mpps=function({cor,value,krange,fields}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	value=value.replace(/\{k/g,"").replace(/k\}/g,"")
	.replace(/\{b/g,"").replace(/b\}/g,"").replace(/@t/g,"??????")
	.replace(/@y([A-Z][0-9]+)#([0-9]+)/g,function(m,m1){
		return "????????????????????????????????????"+m1;
	});

	return "???"+value+"???"+citation(cor,krange);
}

const quoteCopy_taisho=function({cor,value,krange,fields}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	const group=cor.getGroupName(krange).replace(/.*@/,"");
	const address=cor.stringify(krange);
	const vol=address.replace(/p.*/,"");
	var shortaddress=address.replace(/.*p/,"").replace(/\d\d-/,"-");

	if (shortaddress.replace(/.*-/,"").length>=4) {
		shortaddress=shortaddress.substr(0,shortaddress.length-2);		
	} else { //same line
		shortaddress=shortaddress.replace(/-.*/,"");
	}
	var fascicle=calFascicle(cor,krange);
	return "???"+group+"??????"+fascicle+"??????"+value+"????????????"+vol+"???"+shortaddress+"???";
}
const taixu_vol=function(compilation,page){ //???, ???
	const volmaps={
		1:{1:1,531:2},
		2:{1:3},
		3:{1:3},
		4:{1:4,475:5},
		5:{1:6,581:7},
		6:{1:7,301:8,899:9},
		7:{1:10,515:11,911:12,1267:13,1725:14,2409:15},
		8:{1:16},
		9:{1:17},
		10:{1:18},
		11:{1:18,167:19},
		12:{1:20},
		13:{1:20,243:21,751:22,1333:23},
		14:{1:23,247:24},
		15:{1:24},
		16:{1:25},
		17:{1:26,555:27},
		18:{1:27,229:28},
		19:{1:29,443:30,1005:31},
		20:{1:32}
	}
	//?????????????????? ???????????? ?????????32???????????????????????????
	//?????????????????????????????????????????????
	//?????????????????? 2017.4.21 21:40 ?????????????????????????????????????????????????????????????????????

	const ranges=volmaps[compilation];
	if (!ranges)return "";
	var vol="";
	for (var end in ranges) {
		if ( page>=parseInt(end,10)) {
			vol=ranges[end];
		}
	}

	return vol?"??? ???"+vol+"??????":"";
}
const quoteCopy_taixu=function({cor,value,krange,pagerange,fields}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	const r=cor.parseRange(krange);
	const page=cor.pageOf(r.start)+1;
	const address=cor.stringify(krange);
	const compilation=address.replace(/p.*/,"");
	const vol=taixu_vol(compilation,page);

	const gn=cor.getGroupName(krange);
	return "???"+gn+"?????????"+value+"??????????????????????????????"+"???"+vol+pagerange+"???";
}
const quoteCopy_yinshun=function({cor,value,krange,fields,pagerange}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	var gn=cor.getGroupName(krange);
	const regexs=[/???.*????/,/???[???????????????]???/];
	var sub="";
	regexs.forEach(function(regex){
		if (gn.match(regex)){
			sub=gn.match(regex)[0];
			gn=gn.replace(regex,"");
		}
	})
	return "???"+value+"?????????"+gn+"???"+sub+"???"+pagerange+"???";
}
const quoteCopy=function({cor,value,krange,fields}){

	if (value.length<10 && value!=="-") {
		return value;
	}

	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var pagerange="p."+sp;
	if (ep!==sp) pagerange="p"+pagerange+'-'+ep;
	if (cor.id=="taisho") return quoteCopy_taisho({cor,value,krange,fields});
	if (cor.id=="mpps") return quoteCopy_mpps({cor,value,krange,fields});
	if (cor.id=="taixu") return quoteCopy_taixu({cor,value,krange,fields,pagerange});
	if (cor.id=="yinshun") return quoteCopy_yinshun({cor,value,krange,fields,pagerange});

	//taixu positing is incorrect, disable quote copy
	//if (cor.id=="taixu") return value;
	
	return "???"+value+"?????????"+cor.getGroupName(krange)+"???"+"???"+pagerange+"???";
}
module.exports=quoteCopy;
},{"./citation":127}],137:[function(require,module,exports){
/*??? ??????  ????????? ????????? ???  ????????? */
const notarget2address=function(cor,no_target,cb){
	var n=parseInt(no_target,10);
	if (n.toString(10)==no_target && n>=cor.parseRange("1p1a0100").start) {
		return no_target;//return as it is , not a sid
	}
	

	if (no_target.indexOf(".")>-1) { //has sub sid
		const m=no_target.match(/(\d+)\.(.*)/);
		if (!m) return no_target;
		var sid=m[1],target=m[2];
		while (sid.length<4) sid="0"+sid;
		cor.getField("subsid@"+sid,function(fielddata){
			if (typeof fielddata.value[0]=="number") { //n26,99,100 sub sid is number, n125 is string(two level)
				target=parseInt(target);
			}
			const at=fielddata.value.indexOf(target);
			if (at>-1) {
				cb(fielddata.pos[at]);
			}
		})
		
	} else { // an sid, search group name
		const groupnames=cor.groupNames();
		const sid=no_target.replace(/^0+/,"");
		for (var i=0;i<groupnames.length;i++) {
			if (groupnames[i].replace(/;.*/,"").replace(/^0+/,"")==sid) {
				const g=cor.groupKRange(i);
				var address= cor.stringify(g[0]);
				console.log("address",address)
				cb&&cb(address);
				return address;
			}
		}
	}
}
module.exports={notarget2address}
},{}],138:[function(require,module,exports){
const patterns={
 taisho:/CBETA, ?T(\d+), .*? p. ?(\d+), ([\dabc\-]+)/g,
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);
	line.replace(patterns.taisho,function(m,v,pg,cline,idx){
		const link=document.createElement("span");
		var target=v+'p'+pg+cline;
		link.innerHTML="CBETA "+target;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})
}

var markNoteLines=function(doc,from,to,openLink){
	const visitlink=function(e){
		const url=e.target.dataset.target;
		if (url.substr(0,7)==="http://") {
			window.open(url);
		} else {
			openLink("taisho@"+url);
		}
	}

	var M=doc.findMarks({line:from,ch:0},{line:to,ch:65536});
	M.forEach(function(m){m.clear()});
	for (var i=from;i<to+1;i++) {
		markLine(doc, i, visitlink);
	}
}
module.exports={markNoteLines};
},{}],139:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;

const CMView=React.createClass({
	propTypes:{
		text:PT.string.isRequired
	}
	,componentDidMount:function(){
		this.loadText(this.props.text);
	}
	,shouldComponentUpdate:function(nextProps){
		return nextProps.text!==this.props.text;
	}
	,componentWillReceiveProps:function(nextProps){
		if (nextProps.text!==this.text) this.loadText(nextProps.text);
	}
	,loadText:function(newtext){
		this.text=newtext;
		this.cm.setValue(newtext);
	}
	,jumpToRange:function(from,to,cb){
		const cm=this.cm;
		cm.scrollIntoView({line:0,ch:0});
		cm.setCursor(from,{scroll:true});
		setTimeout(function(){
			if (from.line<cm.lineCount()){
				cm.scrollIntoView(from,200);
			}
			cb&&cb();
		},500);//wait for decorator
	}
	,scrollToText:function(t){
		var text=this.cm.getValue();
		var at=text.indexOf(t);
		if (at>-1) {
			var pos=this.cm.doc.posFromIndex(at);
			//scroll to last line , so that the paragraph will be at top
			cm.scrollIntoView({line:cm.doc.lineCount()-1,ch:0})
			if (pos.line) pos.line--;
			cm.scrollIntoView(pos);
		}
	}
	,getAllMarks:function(){
		return this.cm.getAllMarks();
	}
	,markText:function(){
		return this.cm.doc.markText.apply(cm.doc,arguments);
	}
	,getLine:function(i){
		return this.cm.getLine(i);
	}
	,onCopy:function(cm,evt){
		this.props.onCopy&&this.props.onCopy(cm,evt);
	}
	,onCut:function(cm,evt){
		this.props.onCut&&this.props.onCut(cm,evt);
	}
	,getCodeMirror:function(){
		return this.cm;
	}
	,setCM:function(cm){
		if (cm) this.cm=cm.getCodeMirror();
	}
	,render:function(){
		return E("div",{},
	  	E(CodeMirror,{ref:this.setCM,value:"",theme:this.props.theme,readOnly:true,
  	  onCursorActivity:this.props.onCursorActivity
  	  ,onCopy:this.onCopy
  	  ,onCut:this.onCut
  	  ,onFocus:this.props.onFocus
  	  ,onBlur:this.props.onBlur
  	  ,extraKeys:this.props.extraKeys
  	  ,onViewportChange:this.props.onViewportChange})
  	 )
	}
})
module.exports=CMView;
},{"ksana-codemirror":"ksana-codemirror","react":"react"}],140:[function(require,module,exports){
const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CMView=require("./cmview");
const is_iOS = navigator.userAgent.match(/(iphone|ipod|ipad)/i) != null;

var search,getArticleHits,stringifyRange;
if (typeof KsanaCorpus!=="undefined") {
	search=KsanaCorpus.openCorpus;
	getArticleHits=KsanaCorpusSearch.getArticleHits;
	stringifyRange=KsanaCorpus.stringifyRange;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	const KSANACORPUS="ksana-corpus";
	openCorpus=require(KSANACORPUS).openCorpus;
	getArticleHits=require(KSANACORPUSSEARCH).getArticleHits;
	stringifyRange=require(KSANACORPUS).stringifyRange;
}

const decorate=require("./decorate").decorate;
const decorateUserField=require("./decorate").decorateUserField;
const decoratePageStarts=require("./decorate").decoratePageStarts;
const USER_FIELD_PREFIX=require("./decorate").USER_FIELD_PREFIX;
const decorateHits=require("./decorate").decorateHits;
const selectionActivity=require("./selectionactivity");
const followLinkButton=require("./followlinkbutton");
const hitButton=require("./hitbutton");
const hasUserLinkAt=require("./link").hasUserLinkAt;
const hasLinkAt=require("./link").hasLinkAt;

const CorpusView=React.createClass({
	propTypes:{
		corpus:PT.string,
		cor:PT.object,
		corpora:PT.object,//open corpus 
		address:PT.oneOfType([PT.string.isRequired,PT.number.isRequired]),
		rawlines:PT.array.isRequired,
		article:PT.object.isRequired,
		theme:PT.string,
		layout:PT.array,
		active:PT.bool, //in active tab
		onCursorActivity:PT.func,
		onViewport:PT.func,
		onCopyText:PT.func, //custom copy handler
		setSelection:PT.func, //used by selectionactivity
		updateArticleByAddress:PT.func,
		extraKeys:PT.object,
		fields:PT.object,
		userfield:PT.object,
		showPageStart:PT.bool
	}
	,getInitialState:function(){
		const updateTime=new Date();
		return {text:"",linebreaks:[],pagebreaks:[],updateTime};
	}
	,setupDecoratorActions:function(){
		//prepare actions for decorators
		this.actions={};
		for (var i in this.props) {
			if (typeof this.props[i]==="function") {
				this.actions[i]=this.props[i];
			}
		}
		this.actions.highlightAddress=this.highlightAddress;
	}
	,highlightAddress:function(address){
		const r=this.cor.parseRange(address);
		const k=this.toLogicalRange(r.range);;
		this.highlight(k.start,k.end);
	}
	,clearLinkButtons:function(){
		if (this.userlinkbuttons) {
			this.userlinkbuttons.clear&&this.userlinkbuttons.clear();
			this.userlinkbuttons=null;
		}
		if (this.multilinkbuttons) {
			this.multilinkbuttons.clear&&this.multilinkbuttons.clear();
			this.multilinkbuttons=null;
		}
	}
	,clearHitButtons:function(){
		if (this.hitbuttons) {
			this.hitbuttons.clear();
			this.hitbuttons=null;
		}
	}
	,clearHighlight:function(){
		if(this.highlighmarker) {
			this.highlighmarker.clear();		
			this.highlighmarker=null;
		}
	}
	,highlight:function(start,end){
		if (!this.cm)return;
		this.clearHighlight();
		this.highlighmarker=this.cm.markText(start,end,{className:"highlight",clearOnEnter:true});
	}
	,componentDidMount:function(){
		if (!this.props.corpus && !this.props.cor) {
			if(this.props.text) this.setState({text:this.props.text.join("\n")});
			return;
		}
		this.loadtext();
	}
	,loadtext:function(props){
		props=props||this.props;

		this.cor=props.cor?props.cor:openCorpus(props.corpus);
		this.markinview={};//fast check if mark already render, assuming no duplicate mark in same range
		this.markdone={};
		props.removeAllUserLinks&&props.removeAllUserLinks(props.corpus);
		this.setupDecoratorActions();
		decorateUserField.call(this,{},props.userfield);//this will unpaint all fields

		this.layout(props.article,props.rawlines,props.address,props.layout);
	}
	,textReady:function(){
		getArticleHits({cor:this.cor,lines:this.state.lines,linebreaks:this.state.linebreaks,
			article:this.props.article,
			pagebreaks:this.state.pagebreaks,searchresult:this.props.searchresult},function(hits){
				decorateHits.call(this,hits);

				this.articleHits=hits;
				this.onViewportChange(this.cm);

				if (this.props.showPageStart) {
					setTimeout(function(){
						decoratePageStarts.call(this,this.props.layout);
					}.bind(this),10);
				}
				setTimeout(function(){
					this.scrollToAddress(this.props.address);
				}.bind(this),200);
		}.bind(this));
	}
	,componentWillUnmount:function(){
		this._unmounted=true;
		if (!this.cm)return;
		this.cm.getAllMarks().forEach(function(m){m.clear()}); //might not need this
		this.cm.setValue("");
	}
	,shouldComponentUpdate:function(nextProps,nextState){
		const scu=(  nextProps.corpus!==this.props.corpus||nextProps.cor!==this.props.cor
			||nextProps.address!==this.props.address
			||nextProps.layout!==this.props.layout
			||nextProps.fields!==this.props.fields
			||nextState.text!==this.state.text);
		return scu;
	}
	,inViewPort:function(line){
		const vp=this.cm.getViewport();
		const from=vp.from,to=vp.to;
		return (line>=from && line<=vp.to);
	}
	,removeDeleteFields:function(fields){
		const newmarkinview={};
		for (var id in this.markinview){
			const type=id.match(/(.*?)_/)[1];
			if (!fields[type] && type[0]!==USER_FIELD_PREFIX) { //user field
				const miv=this.markinview[id];
				if (!miv) continue;
				if (miv instanceof Array) {
					miv.forEach(function(m){m.clear()});
				} else {
					miv.clear();
				}
			} else {
				newmarkinview[id]=this.markinview[id];
			}
		};
		this.markinview=newmarkinview;
	}
	,componentWillReceiveProps:function(nextProps){//cor changed
		if (nextProps.article.at!==this.props.article.at||
			nextProps.layout!==this.props.layout||nextProps.corpus!==this.props.corpus||nextProps.cor!==this.props.cor) {
			this.loadtext(nextProps);
			return;
		}

		if (nextProps.fields!==this.props.fields) {
			this.removeDeleteFields(nextProps.fields);
			this.onViewportChange();			
		}

		if (nextProps.userfield && nextProps.userfield !== this.props.userfield) { //user field should have id			
//			if (Object.keys(nextProps.userfield).length)debugger
			decorateUserField.call(this,nextProps.userfield,this.props.userfield);
			//decorateUserField might clearWorking Link , call viewportchange to repaint
			this.onViewportChange();
			this.clearLinkButtons();
			this.clearHitButtons();
		}

		//if (this.cm && nextProps.active)this.cm.focus();

		if (this.props.address!==nextProps.address ) { //need by updateArticleByAddress
			const r=this.cor.toLogicalRange(this.state.linebreaks,nextProps.address,this.getRawLine);
			if (!r || r.start.line<0)return;

			if (!this.inViewPort(r.start.line)) {
				this.scrollToAddress(nextProps.address);
			} else {
				if (this.noSelection(this.cm)) {
					this.cm.setCursor(r.start);
				}
			}
		}
		if (this.props.hlAddress!==nextProps.hlAddress
			&&nextProps.hlAddress) {
			this.highlightAddress(nextProps.hlAddress);
		}
	}	
	,clearSelection:function(){
		const cursor=this.cm.getCursor();
		this.cm.doc.setSelection(cursor,cursor);
	}
	,toLogicalRange:function(range){
		return this.cor.toLogicalRange(this.state.linebreaks,range,this.getRawLine);
	}
	,toLogicalPos:function(kpos,tailing){
		return this.cor.toLogicalPos(this.state.linebreaks,kpos,this.getRawLine,tailing);
	}
	,fromLogicalPos:function(linech){
		if (!this.cor)return;
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const text=this.cm.doc.getLine(linech.line);
		const lb=this.state.linebreaks[linech.line];
		if (typeof text==="undefined") return this.props.article.end;
		return this.cor.fromLogicalPos(text,linech,lb,firstline,this.getRawLine);
	}
	,getRawLine:function(line){
		return this.props.rawlines[line];
	}
	,scrollToAddress:function(address){
		if (!this.cor)return;
		const r=this.cor.toLogicalRange(this.state.linebreaks,address,this.getRawLine);
		if (!r || r.start.line<0)return;
		if (this.viewer) {
			if (r.start==r.end) {
				const rr=this.cor.toLogicalPos(this.state.linebreaks,address,this.getRawLine,true);
				this.viewer.jumpToRange(rr,rr,this.highlightAddress.bind(this,address));
			} else {
				this.viewer.jumpToRange(r.start,r.end,this.highlightAddress.bind(this,address));
			}
		}
	}
	,layout:function(article,rawlines,address,playout){
		if (!rawlines) {
			return;
		}
		const cor=this.cor;
		if (!address){ //scroll to the selection after layout
			address=this.kRangeFromCursor(this.cm);
		}
		const o=cor.layoutText(rawlines,article.start,playout)
		const text=o.lines.join("\n");
		const updateTime=new Date();
		this.setState({updateTime,linebreaks:o.linebreaks,pagebreaks:o.pagebreaks,text:text,lines:o.lines}, this.textReady );
	}
	,kRangeFromSel:function(cm,from,to){
		if (!this.cor)return;
		if (!from||!to)return 0;
		const f=this.cor.fromLogicalPos.bind(this.cor);
		const firstline=this.cor.bookLineOf(this.props.article.start); //first of of the article
		const s=f(cm.doc.getLine(from.line),from,this.state.linebreaks[from.line],firstline,this.getRawLine,true);
		const e=f(cm.doc.getLine(to.line),to,this.state.linebreaks[to.line],firstline,this.getRawLine,true);
		return this.cor.makeRange(s,e);
	}
	,kRangeFromCursor:function(cm){
		if (!cm)return;
		const sels=cm.listSelections();
		if (!sels.length) return null;

		var from=sels[0].anchor,to=sels[0].head,temp;
		if (from.line>to.line||(from.line==to.line && from.ch>to.ch)) {
			temp=from;from=to;to=temp;
		}
		return this.kRangeFromSel(cm,from,to);
	}
	,onCut:function(cm,evt){
		const krange=this.kRangeFromCursor(cm);
		evt.target.value=this.cor.stringify(krange);
		evt.target.select();//reselect the hidden textarea
	}
	,onCopy:function(cm,evt){
		/*1p178a0103-15 copy and paste incorrect*/
		/* TODO,  address error crossing a page, has line 30 */
		const krange=this.kRangeFromCursor(cm);
		if (this.props.copyText) { //for excerpt copy
			evt.target.value=this.props.copyText(
				{cm:cm,value:evt.target.value,krange:krange,cor:this.cor,fields:this.props.fields});
			evt.target.select();
		}
	}
	,noSelection:function(cm){
		const sels=cm.listSelections();	
		if (sels.length!==1)false;
		const s=sels[0].anchor,e=sels[0].head;
		return s.line==e.line&&s.ch==e.ch;
	}
	,showDictHandle:function(cm){
		this.dicthandle&&this.dicthandle.clear();
		if (!cm.hasFocus())return;
		var widget=document.createElement("span");
		widget.className="dicthandle";
		widget.innerHTML="??????";
		this.dicthandle=cm.setBookmark(cm.getCursor(),{widget:widget,handleMouseEvents:true});
	}
	,onBlur:function(cm){
		this.dicthandle&&this.dicthandle.clear();
	}
	,autoFollow(linkbuttons){
		const widget=linkbuttons&&linkbuttons.replacedWith;
		if (widget){
			var target=widget;
			if (target.children.length==1) target=target.children[0];
			const mouseover=widget.onmouseoever||widget.children[0].onmouseover;
			const mousedown=widget.onmouseodown||widget.children[0].onmousedown;
			if (!mouseover&&!mousedown) return;

			setTimeout(function(){
				mouseover&&mouseover({target});
				mousedown&&mousedown({target});				
				linkbuttons.clear();
			},5);
		}
	}
	,onCursorActivity:function(cm){
		if (!this.cor) return;
		clearTimeout(this.cursortimer);
		if (is_iOS) document.activeElement.blur();
		this.cursortimer=setTimeout(function(){
			if (this._unmounted)return;
			const cursor=cm.getCursor();
			const kpos=this.fromLogicalPos(cursor);
			selectionActivity.call(this,cm,this.cor,this.fromLogicalPos);

			this.clearLinkButtons();
			this.clearHitButtons();
			this.clearHighlight();
			if (this.noSelection(cm)) {				
				const userlinks=hasUserLinkAt(kpos,this.props.userfield);
				this.userlinkbuttons=followLinkButton(cm,userlinks,this.actions,this.props.corpora);

				const multilinks=hasLinkAt(this.cor,kpos,this.props.fields,this.props.corpora,stringifyRange);

				this.multilinkbuttons=(this.props.followLinks||followLinkButton)(cm,multilinks,this.actions,this.props.corpora);
				//custom buttons return false (too few links), use default 
				if (!this.multilinkbuttons) {
					this.multilinkbuttons=followLinkButton(cm,multilinks,this.actions,this.props.corpora);
				}
				const updateSince=new Date() - this.state.updateTime;
				//prevent update from aux to trigger change to aux
				if(this.props.autoFollowSingleLink && updateSince>1500){
					this.autoFollow(this.multilinkbuttons);
				}
				this.hitbuttons=hitButton(cm,kpos,this.articleHits,this.actions);
			}
			//this.showDictHandle(cm);	
			if (is_iOS) document.activeElement.blur();
			this.props.onCursorActivity&&this.props.onCursorActivity(cm,kpos);
			if (is_iOS) document.activeElement.blur();
		}.bind(this),300);
	}
	,onViewportChange:function(cm,from,to){
		cm=cm||this.cm;
		if (!cm)return;
		clearTimeout(this.viewporttimer);
		this.viewporttimer=setTimeout(function(){
			const vp=cm.getViewport();
			const from=this.fromLogicalPos({line:vp.from,ch:0});
			var to=this.fromLogicalPos({line:vp.to,ch:0});
			if (to<from) to=this.props.article.end;
			decorate.call(this,from,to);
			this.onViewport&&this.onViewport(cm,vp.from,vp.to,from,to); //extra params start and end kpos
			this.addresschanged=true;
		}.bind(this),50);
	}
	,setCM:function(cmviewer){
		if (cmviewer) {
			this.viewer=cmviewer;
			this.cm=cmviewer.getCodeMirror();
		}
	}
	,render:function(){
		if (!this.state.text) return E("div",{},"loading...");
		const props=Object.assign({},this.props,
			{ref:this.setCM,
			text:this.state.text,
			onCursorActivity:this.onCursorActivity,
			onCut:this.onCut,
			onCopy:this.onCopy,
			onBlur:this.onBlur,
			extraKeys:this.props.extraKeys,
			onViewportChange:this.onViewportChange,
			articlename:this.props.article.articlename,
			theme:this.props.theme
			}
		);
		return E(CMView,props);
	}
})
module.exports=CorpusView;
},{"./cmview":139,"./decorate":141,"./followlinkbutton":142,"./hitbutton":143,"./link":145,"./selectionactivity":146,"react":"react"}],141:[function(require,module,exports){
const clearWorkingLink=require("./link").clearWorkingLink;
const makeMarkerId=require("./link").makeMarkerId;
const USER_FIELD_PREFIX="#";

//for field with same starting position,
//the short one comes later, so that it will not be overwrite by longer span
const reOrderField=function(cor,pos,value){
	var arr=[];
	for (var i=0;i<pos.length;i++) {
		arr.push([pos[i],value?value[i]:null]);
	}
	arr.sort(function(a,b){
		const r1=cor.parseRange(a[0]); //parse range is slow , don't why?
		const r2=cor.parseRange(b[0]);
		if (r1.start!==r2.start) return r1.start-r2.start;//start has higher priority

		return r2.end-r1.end;
	});
	var out={pos:[],value:[]};
	for (var i=0;i<arr.length;i++) {
		out.pos.push(arr[i][0]);
		out.value.push(arr[i][1]);
	}
	return out;
}
const decorateField=function(fname,_pos,_value,decorator,fromkpos,tokpos,fields){
	var i=0;
	//const rr=reOrderField(this.cor,_pos,_value);
	const rr={value:_value,pos:_pos};
	const pos=rr.pos,value=rr.value;
	if (!pos)return;
	var decorated=0;
	while (i<pos.length) {
		const id=i;
		const range=this.cor.parseRange(pos[i]);
		
		if (typeof fromkpos!=="undefined"&& typeof tokpos !=="undefined"){
			if (!((range.start>fromkpos && range.start<tokpos)
			|| (range.end>fromkpos && range.end<tokpos) )){
				i++;
				continue;
			}
		}

		if (this.markinview[makeMarkerId(fname,range)]) {
			i++
			continue;
		}

		const p=pos[i],v=value?value[i]:"";
		var target=v, multitarget=false;
		i++;

		while (i<pos.length && this.cor.parseRange(pos[i]).start==range.start) {
			if (!multitarget) target=[target];
			target.push(value?value[i]:i);
			multitarget=true;
			i++;
		}
		var r;
		if (this.cor.isRange(p)){
			//by default enclose the concrete words closely
			r=this.toLogicalRange(p);
		} else {
			//tailing = false to paint just after concrete char
			//skipleading to true, so that number of footnotes will stay at begining of line
			var r2=this.toLogicalPos(p,false);
			r={start:r2,end:r2};
		}

		const markerid=makeMarkerId(fname,range);
		const done=this.markdone[markerid];
		decorated++;

		this.markinview[markerid]=decorator({cm:this.cm,cor:this.cor,start:r.start,end:r.end,
			corpus:this.props.corpus,
			field:fname,
			fields:fields,
			kpos:range.start,krange:range,tabid:this.props.id,id:id,target:target,
			multitarget:multitarget,actions:this.actions,done:done});

	}
	//console.log("decorated",decorated,fname)
}

const sortFields=function(fields){
	const out=[];
	for (var id in fields) {
		const field=fields[id];
		const r=this.cor.parseRange(field.from);
		out.push([r.range, field]);
	}
	out.sort(function(a,b){return a[0]-b[0]});
	const pos=out.map(function(i){return i[0]});
	const value=out.map(function(i){return i[1]});

	return {pos:pos,value:value};
}
const groupByDecorator=function(pos,value){
	const out={};
	for (var i=0;i<value.length;i++) {
		const v=value[i];
		if (!out[v.decorator]) out[v.decorator]={pos:[],value:[]};
		out[v.decorator].pos.push(pos[i]);
		out[v.decorator].value.push(v);
	}
	return out;
}

const removeDeletedUserField=function(fields, oldfields){
	for (var id in oldfields) {
		const old=oldfields[id];
		const markerid=USER_FIELD_PREFIX+makeMarkerId(old.decorator,old.range);
		if (!fields[id]) {
			const m=this.markinview[markerid];
			if (m){
				m.clear();
				delete this.markinview[markerid];
				clearWorkingLink.call(this,id,false);
			}
		}
	}
}
const getDecorator=function(fieldname) {
	var decoratorname=fieldname;
	const at=fieldname.indexOf("<");
	if (at>0) decoratorname=decoratorname.substr(0,at);

	return this.props.decorators[decoratorname];
}
const decorateUserField=function(_fields, oldfields){

	removeDeletedUserField.call(this,_fields,oldfields);
	const ff=sortFields.call(this,_fields);
	for (var _f in _fields) { //remove all worling link marker, force redraw
		clearWorkingLink.call(this,_f,true);
	}

	const fields=groupByDecorator(ff.pos,ff.value);
	for (var name in fields) {
		decoratorname=name;
		const at=name.indexOf("@");
		if (at>0) decoratorname=decoratorname.substr(0,at);
		const decorator=getDecorator.call(this,name);;
		decorator&&decorateField.call(this,USER_FIELD_PREFIX+name,fields[name].pos,fields[name].value,decorator);
	}
}

const decorate=function(fromkpos,tokpos,oldfields){
	for (var fname in this.props.fields) {
		if (!this.props.fields[fname]) continue;
		const pos=this.props.fields[fname].pos, value=this.props.fields[fname].value;		
		const decorator=getDecorator.call(this,fname);
		decorator&&decorateField.call(this,fname,pos,value,decorator,fromkpos,tokpos,this.props.fields);
	}
}
const decorateHits=function(phrasehits){
	if (!phrasehits)return;
	if (!this._hits) this._hits=[];
	else {
		this._hits.forEach(function(h){h.clear()});
		this._hits=[];			
	}

	for (var i=0;i<phrasehits.length;i++) {
		const hits=phrasehits[i].hits;
		const hitsend=phrasehits[i].hitsend;

		for (var j=0;j<hits.length;j++) {
			const r=this.toLogicalRange(  this.cor.makeRange(hits[j],hitsend[j]));

			const marker=this.cm.markText(r.start,r.end,{className:'hl'+i});
			this._hits.push(marker);
		}
	}
}
const decoratePageStarts=function(layout){
	if (!this._pageStarts) this._pageStarts=[];
	else {
		this._pageStarts.forEach(function(pagestart){pagestart.clear()});
		this._pageStarts=[];			
	}
	const regexpb=/p(\d+[a-z]?)/;
	for (var i=0;i<this.state.pagebreaks.length;i++) {

		const pb=this.state.pagebreaks[i];
		const linech=this.toLogicalRange(pb);
		const pbtext=this.cor.stringify(pb).match(regexpb)[1];
		if (layout) {
			const widget=document.createElement("span");
			widget.innerHTML=pbtext;
			widget.className="inlinepb";
			this._pageStarts.push(this.cm.setBookmark(linech.start,{widget}));
		} else {
			const ele=document.createElement("div");
			const label=document.createElement("span");
			label.className="pblabel";

			label.innerHTML=pbtext;
			ele.appendChild(label);
			ele.className="pb";

			this._pageStarts.push(this.cm.addLineWidget(linech.start.line, ele,{above:true}));
		}
	}
}
module.exports={decorate:decorate,decorateField:decorateField,decorateUserField:decorateUserField
,decoratePageStarts:decoratePageStarts,decorateHits:decorateHits,USER_FIELD_PREFIX:USER_FIELD_PREFIX};
},{"./link":145}],142:[function(require,module,exports){
/*TODO show multiple link 
highlight range when hover

yinshun@57p1262.1301 has two sources

*/
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
var stringifyRange=null;
if (typeof KsanaCorpus!=="undefined") {
	stringifyRange=KsanaCorpus.stringifyRange;
} else {
	const KSANACORPUS="ksana-corpus"
	stringifyRange=require(KSANACORPUS).stringifyRange;
}

const getLinkLabel=function(link,corpora){
	var linklabel=link.to;
	if (!corpora) {
		return linklabel;
	}

	const cor=corpora[link.corpus]; //not open yet
	if (!cor) {
		if (typeof linklabel=="number") {
			const l=linklabel=stringifyRange(linklabel,link.corpus);
			if (l) return l;
		}
		return (typeof link.to=="string")?link.to:link.corpus;
	}
	const shortname=typeof (link.to!=="number")?cor.getGroupName(link.to):"";
	if (typeof linklabel=="number") {
		linklabel=link.corpus+"@"+cor.stringify(linklabel);
	}
	linklabel=linklabel.replace(/\..*/,"");//remove after page,make it shorter;
	if (shortname) linklabel=shortname+"p"+linklabel.replace(/.+p/,"");
	return linklabel;
}
const followLink=function(cm,links,actions,corpora){
	if (!links)return;
	if (!Object.keys(links).length) return;

	const onMouseDown=function(e){
		e.stopPropagation&&e.stopPropagation();
		actions.openLink(e.target.target);
	}

	const onMouseOver=function(e){
		const link=links[e.target.id];
		if (link && link.from) actions.highlightAddress(link.from);
	}

	var widget=document.createElement("span");
	widget.className="followbuttongroup";
	
	for (var id in links) {
		var child=document.createElement("span");
		child.onmousedown=onMouseDown;
		child.onmouseover=onMouseOver;	
		child.className="followbutton"

		const linklabel=getLinkLabel(links[id],corpora);
		child.target=links[id].corpus+"@"+links[id].to;
		child.innerHTML=linklabel;
		child.id=id;
		widget.appendChild(child);
	}
	
	const insertat={line:cm.getCursor().line,ch:cm.getCursor().ch}
	return cm.setBookmark(insertat,{widget:widget,handleMouseEvents:true});
}

module.exports=followLink;
},{"react":"react","react-dom":"react-dom"}],143:[function(require,module,exports){
const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const hasHitAt=require("./link").hasHitAt;
const _=require("ksana-localization")._;

const HitButtons=React.createClass({
	prev:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit-1;
		if (n>=0) {
			this.props.updateArticleByAddress(phrasehits[n]);
		}
	},
	canNext:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit+1;
		return (n<phrasehits.length) 	;
	},
	next:function(){
		const phrasehits=this.props.articlehits[this.props.phrase].hits;
		const n=this.props.nhit+1;
		if (this.canNext()){
			this.props.updateArticleByAddress(phrasehits[n]);
		}
	},
	render:function(){
		return E("div",{},
			this.props.nhit?E("span",{className:"hitbutton",onClick:this.prev},_("Prev Hit")):null,
			" ",
			this.canNext()?E("span",{className:"hitbutton",onClick:this.next},_("Next Hit")):null
		)
	}
})

const hitButton=function(cm,kpos,articlehits,actions){
	const phrasehit=hasHitAt(kpos,articlehits);
	if (!phrasehit) return null;
	var widget=document.createElement("span");
	widget.className="hitbuttongroup";
	ReactDOM.render(E(HitButtons,{articlehits:articlehits,nhit:phrasehit.nhit,
		updateArticleByAddress:actions.updateArticleByAddress,  phrase:phrasehit.phrase}),widget);

	const insertat={line:cm.getCursor().line,ch:cm.getCursor().ch}
	return cm.setBookmark(insertat,{widget:widget,handleMouseEvents:false});	
}

module.exports=hitButton;

},{"./link":145,"ksana-localization":147,"react":"react","react-dom":"react-dom"}],144:[function(require,module,exports){
const CorpusView=require("./corpusview");
module.exports={CorpusView:CorpusView};
},{"./corpusview":140}],145:[function(require,module,exports){
var bsearch=null,trimArticleField=null

if (typeof KsanaCorpus!=="undefined") {
	trimArticleField=KsanaCorpus.trimArticleField;
	bsearch=KsanaCorpus.bsearch;
} else {
	const KSANACORPUS="ksana-corpus";
	trimArticleField=require(KSANACORPUS).trimArticleField;
	bsearch=require(KSANACORPUS).bsearch;
}


const BILINKREGEX=/.*</;

const	getWorkingLinks=function(workinglinks,prefix,article){
	const fields=trimArticleField(workinglinks,article);
	const value=fields.value.map( function(v){return  prefix+"@"+v});
	return {pos:fields.pos,value:value};
}
const makeWLinkId=function(kpos,address){
	return kpos.toString(36) +"_"+address.replace(/.+@/,"");
}
const parseWLinkId=function(wlinkid){
	return parseInt(wlinkid.replace(/_.+/,""),36);
}
const makeMarkerId=function(prefix,rangeobj){
	if (typeof rangeobj=="number") {
		return prefix+"_"+rangeobj;
	}
	if (rangeobj.start==rangeobj.end) {
		return prefix+"_"+rangeobj.start;
	} else {
		return prefix+"_"+rangeobj.range;
	}
}
const hasLinkAt=function(cor,kpos,fields,corpora,stringifyRange) {
	var out=[];
	for (var name in fields) {
		const field=fields[name];
		if (!field || !field.pos || !field.pos[0])continue;
		if (name=="jpeg"||name=="png") return;

		if (!cor.isRange(field.pos[0])) continue;

		var targetcorpus=name.replace(BILINKREGEX,"");
		if (targetcorpus==name) targetcorpus=cor.id;

		//cannot have valid target in field.value
		if (name=="rend" || name=="head")continue;
		for (var i=0;i<field.pos.length;i++) {
			const r=cor.parseRange(field.pos[i]);
			if (kpos>=r.start && kpos<=r.end) {
				var to=field.value[i];
				if (to&&to[0]=="<") continue;
				if (to&&to.length>100) continue;
				if (typeof to=="number") {
					const str_to=stringifyRange(to,targetcorpus);
					if (str_to) to=str_to;
				}
				out.push({id:i,corpus:targetcorpus,from:field.pos[i],to:to});
			}
		}
	}
	return out;
}
const hasUserLinkAt=function(kpos,userfields){
	const out={};
	for (var id in userfields) {
		const field=userfields[id];
		if (kpos>=field.start && kpos<=field.end) out[id]=field;
	}
	return out;
}

const clearWorkingLink=function(f,done){
	if (!this.markinview ||!this.markdone)return;
	const p=parseWLinkId(f);
	const markerid=makeMarkerId("wlink",p);
	const m=this.markinview[markerid];
	if (m) {
		m.clear();
		if (done){
			this.markdone[markerid]=done;	
		} else if (this.markdone[markerid]) {
			delete this.markdone[markerid];
		}
		delete this.markinview[markerid];
	}	
}

const hasHitAt=function(kpos,articlehits){
	if (!articlehits)return null;
	for (var i=0;i<articlehits.length;i++) {
		const phrase=articlehits[i];
		const hits=articlehits[i].hits;
		const at=bsearch(hits,kpos+1 ,true)-1;
		if (hits[at]-1<kpos && hits[at]+(phrase.lengths[at]||phrase.lengths)>=kpos) {
			return {phrase:i,nhit:at};
		}
	}
	return null;
}

module.exports={getWorkingLinks:getWorkingLinks,makeWLinkId:makeWLinkId,parseWLinkId:parseWLinkId,
	hasLinkAt:hasLinkAt,hasUserLinkAt:hasUserLinkAt,makeMarkerId:makeMarkerId,clearWorkingLink:clearWorkingLink,
hasHitAt:hasHitAt};
},{}],146:[function(require,module,exports){
const getCaretText=function(cm,sel){ //get caretText for checking dictionary
	var line=sel.head.line,ch=sel.head.ch;
	//get caret from left of selection
	if (sel.head.line>sel.anchor.line ||
		 (sel.head.line==sel.anchor.line && sel.anchor.ch<sel.head.ch)) {
		line=sel.anchor.line,ch=sel.anchor.ch;
	}
	//if (ch>1) ch-=1; //include two char before
	//should check punc backward
	var caretText=cm.doc.getRange({line:line,ch:ch},{line:line+1,ch:256});
	caretText=caretText.replace(/\r?\n/g,"");
	const m=caretText.match(/^[.???,??????????????????????????????????????????????????????????????????]*(.*?)[.???,??????????????????????????????????????????????????????????????????]/);
	if (m){
		caretText=m[1];
	}
	return caretText;
}
/*
	from caret, return first n token and it's kpos
	for DharmaCAT
*/
const getCaretTexts=function(cm,sel,cor,fromlogicalpos){
	var line=sel.head.line,ch=sel.head.ch;
	//get caret from left of selection
	if (sel.head.line>sel.anchor.line ||
		 (sel.head.line==sel.anchor.line && sel.anchor.ch<sel.head.ch)) {
		line=sel.anchor.line,ch=sel.anchor.ch;
	}
	const start=cm.indexFromPos({line,ch});
	const startkpos=fromlogicalpos({line,ch});
	var now=start+1;
	var max=20,count=0,prevkpos=0;
	const alltext=cm.doc.getValue();
	var out=[];
	while (count<max) {
		var caretText=alltext.substring(start,now);
		const linech=cm.posFromIndex(now);
		const kpos=fromlogicalpos(linech);
		if (kpos>prevkpos &&caretText) {
			out.push([caretText,cor.makeRange(startkpos,kpos)]);
		} else if (kpos) {
			break;
		}
		now++;
		count++;
		prevkpos=kpos;
	}
	return out;
}

const selectionActivity=function(cm,cor,fromlogicalpos){

	const sels=cm.listSelections();	
	if (sels.length>0){
		const sel=sels[0];
		var ranges=[],selections=[];
		for (var i=0;i<sels.length;i++) {
			ranges.push(this.kRangeFromSel(cm,sel.head,sel.anchor));
			if (sel.anchor.line==sel.head.line&&
				sel.anchor.ch<sel.head.ch) {
				selections.push([sel.anchor,sel.head]);	
			} else {
				selections.push([sel.head,sel.anchor]);
			}
		}

		const selectionText=cm.doc.getSelection();
		const cursor=cm.getCursor();
		const cursorrange=this.kRangeFromCursor(cm);
		const r=this.cor.parseRange(cursorrange);
		this.props.setSelection&&this.props.setSelection({
				cm:cm,
				sels:sels,
				selections:selections,
				corpus:this.props.corpus,id:this.props.id,
				caretText:getCaretText(cm,sel),
				caretTexts:getCaretTexts(cm,sel,cor,fromlogicalpos),
				selectionText:selectionText,
				ranges:ranges, caretpos:r.start, caretposH:this.cor.stringify(r.start),
				index:cm.indexFromPos(cursor),
				cursor:cursor
			});
	}
}
module.exports=selectionActivity;
},{}],147:[function(require,module,exports){
var activelocale="en";
var stringtable={ "en":{} };

const _=function(id){
	return stringtable[activelocale][id]||id;
}
const setLocale=function(locale){
	activelocale=locale;
	if (!stringtable[locale]) stringtable[locale]={};
}
const setString=function(id,str){
	stringtable[activelocale][id]=str;
}
module.exports={_:_,__:_,setLocale:setLocale,setString:setString};
},{}],148:[function(require,module,exports){
const unihanvariants=require("./unihanvariants"); //run gen to get the file
const expandVariant=function(ch){
	const s=unihanvariants[ch];
	if (!s)return ch;//no variants
	//most characters without variants will not create array
	var out=[ch];
	if (s) {
		if (typeof s=="string") {
			out.push(s);
		} else {
			out=out.concat(s);
		}
	}
	for (var i=0;i<out.length;i++) {
		const s2=unihanvariants[out[i]];
		if (s2) {
			if (typeof s2=="string") {
				if (out.indexOf(s2)==-1) out.push(s2);
			} else {
				for (var j=0;j<s2.length;j++) {
					if (out.indexOf(s2[j])==-1) out.push(s2[j]);
				}
			}
		}		
	}
	return out;
}
const test=function(){
	const c1=expandVariant("???");
	const c2=expandVariant("???");
	const c3=expandVariant("???");
	const c4=expandVariant("???");
	console.log(c1,c2,c3,c4);
}
//test();
module.exports={expandVariant:expandVariant}
},{"./unihanvariants":149}],149:[function(require,module,exports){
module.exports={
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "????",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "????",
 "???": "????",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "????",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "????"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???"
 ],
 "???": [
  "???",
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "???",
 "???": [
  "???",
  "???"
 ],
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "????",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "???": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": [
  "???",
  "???"
 ],
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": [
  "???",
  "???"
 ],
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "???",
 "????": "????",
 "????": "???",
 "????": "???",
 "????": "???"
}
},{}],150:[function(require,module,exports){
var React,Dropdown,View;
var pc=function(){
	React=require("react");
	const bootstrap_enabled = (typeof $ == 'function');
	if (bootstrap_enabled) {
		Dropdown=require("./dropdown_bs");
	} else {
		Dropdown=require("./dropdown_mui");
	}
	View="span"; 
}

try {
	React=require("react-native");
	Dropdown=require("./dropdown");//dropdown.android.js or dropdown.ios.js
	View=React.View;
	if (!View) pc();
} catch(e) {
	pc();
}


var E=React.createElement;
var PT=React.PropTypes;
var buildToc = function(toc) {
	if (!toc || !toc.length || toc.built) return;
	var depths=[];
 	var prev=0,j=0;
 	for (var i=0;i<toc.length;i++) if (toc[i].n) delete toc[i].n;
	for (var i=0;i<toc.length;i++) {

	    var depth=toc[i].d;
	    if (prev>depth) { //link to prev sibling
	      if (depths[depth]) toc[depths[depth]].n = i;
	      for (j=depth;j<prev;j++) depths[j]=0;
	    }
    	depths[depth]=i;
    	prev=depth;
	}
	toc.built=true;
	return toc;
}
var getChildren = function(toc,n) {
 
	if (!toc[n]||!toc[n+1] ||toc[n+1].d!==toc[n].d+1) return [];
	var out=[],next=n+1;

	while (next) {
		out.push(next);
		if (!toc[next+1])break;
		if (toc[next].d==toc[next+1].d) {
			next++;
		} else if (toc[next].n){
			next=toc[next].n;			
		} else {
			next=0;
		}
	}
	return out;
}
var BreadcrumbTOC=React.createClass({
	propTypes:{
		toc:PT.array.isRequired
		,hits:PT.array
		,onSelect:PT.func
		,pos:PT.number  //previously vpos
		,keyword:PT.string
		,treenodeHits:PT.func
		,buttonClass:PT.string
		,separator:PT.node
		,append:PT.node
		,prepend:PT.node
		,conv:PT.func
	}
	,componentWillReceiveProps:function(nextProps,nextState) {
		if (nextProps.toc && !nextProps.toc.built) {
			buildToc(nextProps.toc);
		}
		if (nextProps.hits!==this.props.hits) {
			this.clearHits();
		}
	}
	,componentWillMount:function(){
		buildToc(this.props.toc);
	}
	,getInitialState:function(){
		return {};
	}
	,clearHits:function() {
		for (var i=0;i<this.props.toc;i++) {
			if (this.props.toc[i].hit) delete this.props.toc[i].hit;
		}
	}
	,onSelect:function(idx,children,level) {
		this.props.onSelect && this.props.onSelect(idx, children[idx].p);//don't know why???
	}
	,closestItem:function(tocitems,pos) {
		for (i=1;i<tocitems.length;i++) {
			if (this.props.toc[tocitems[i]].p>pos) return i-1;
		}

		return tocitems.length-1;
	}
	,closeOther:function(cb){
		this.forceUpdate(cb);
	}
	,renderCrumbs:function() {		
		var cur=0,toc=this.props.toc,out=[],level=0,dropdowns=[];
		var children=getChildren(toc,cur),nextchildren;
		do {
			var selected = this.closestItem(children,this.props.pos) ;
			cur=children[selected];
		
			var items=children.map(function(child){
				var hit=toc[child].hit;
				if (this.props.hits && isNaN(hit) && this.props.treenodeHits) {
					hit=this.props.treenodeHits( toc,this.props.hits,child);
				}
				var t=toc[child].t;
				if(this.props.conv) t=this.props.conv(t)||t;
				return {t:t,idx:child,hit:hit,p:toc[child].p};

			}.bind(this));

			nextchildren=getChildren(toc,cur);
			if (items.length && (dropdowns.length==0||this.props.pos>=items[0].p)) {
				dropdowns.push({level:level,items:items,selected:selected,nextchildren:nextchildren});
			} else break;

			//if (out.length>5) break;
			level++;
			if (!nextchildren.length) break;
			children=nextchildren;
		} while (true);

		out=dropdowns.map(function(d,idx){
			var buttonClass=null;
			if (this.props.buttonClass) {
				buttonClass=this.props.buttonClass+" "+this.props.buttonClass+(idx+(this.props.buttonClassOffset||0));
			}

			return	E(View,{key:idx,style:{marginTop:4,marginBottom:4}},
					E(Dropdown,{n:idx,total:dropdowns.length,onSelect:this.onSelect,level:d.level,
					separator:this.props.separator,
					buttonClass:buttonClass,
					buttonStyle:this.props.buttonStyle,
					activeButtonStyle:this.props.activeButtonStyle,
					closeOther:this.closeOther,
					depth:idx,
					maxDepth:dropdowns.length,
					untrimDepth:this.props.untrimDepth||1, 
					selected:d.selected,items:d.items,keyword:this.props.keyword})
				)
		}.bind(this));
		this.props.append&& out.push(this.props.append);
		this.props.prepend&& out.unshift(this.props.prepend);
		return out;
	}
	,render:function(){
		if (View==="span") {
			return E(View,null,this.renderCrumbs());
		} else {

			return E(View,{style:{flex:1,flexDirection:'row',flexWrap:'wrap'}},this.renderCrumbs());
		}
	}
});
module.exports=BreadcrumbTOC;
},{"./dropdown":151,"./dropdown_bs":152,"./dropdown_mui":153,"react":"react","react-native":undefined}],151:[function(require,module,exports){
/* empty stub for browserify*/
},{}],152:[function(require,module,exports){
var React=require("react");
var E=React.createElement;
var PT=React.PropTypes;

var BreadCrumbDropdown=React.createClass({
	propTypes:{
		items:PT.array.isRequired
		,selected:PT.number
		,onSelect:PT.func
		,level:PT.number.isRequired //which level
		,keyword:PT.string
	}
	,getDefaultProp:function(){
		return {items:[]}
	}
	,onSelect:function(e) {
		domnode=e.target.parentElement;
		var idx=-1;
		while (domnode) {
			if (domnode.classList.contains("open")) domnode.classList.remove("open");
			if (domnode.dataset && domnode.dataset.idx) idx=parseInt(domnode.dataset.idx);
			domnode=domnode.parentElement;
		}
		this.props.onSelect&&this.props.onSelect(idx,this.props.items,this.props.level);
	}
	,renderKeyword:function(t) {
		if (this.props.keyword) {
			var o=[],lastidx=0;
			t.replace(new RegExp(this.props.keyword,"g"),function(m,idx){
				o.push(t.substr(lastidx,idx));
				o.push(E("span",{key:idx,style:{color:"red"}},m));
				lastidx=idx+m.length;
			});
			o.push(t.substr(lastidx));
			t=o;
		}
		return t;
	}
	,renderItem:function(item,idx) {
		var hit=null;
		var style={cursor:"pointer"};
		if (this.props.selected==idx) style.background="highlight"
		item.hit&&(hit=E("span",{style:{color:"red"},className:"pull-right"},item.hit));
		var t=this.renderKeyword(item.t);
		return E("li",{key:idx,"data-idx":idx},E("a",{style:style,onClick:this.onSelect},t,hit));
	}

	,open:function(e){
		e.target.parentElement.classList.add("open");
	}
	,render:function(){
		var item=this.props.items[this.props.selected];
		if (!item)return E("span");
		var title=this.renderKeyword(item.t);

		item.hit&&(title=[E("span",{key:1},item.t),E("span",{key:2,className:"hl0 pull-right"},item.hit||"")]);
		return E("span",{className:"dropdown"},
				E("button",{key:"drop","data-toggle":"dropdown",className:this.props.buttonClass||"btn btn-default",
					onClick:this.open}, this.renderKeyword(this.props.items[this.props.selected].t) ),
				this.props.separator,
				E("ul",{className:"dropdown-menu open",id:"for_shutting_warning_up",title:title},
			this.props.items.map(this.renderItem)));
	}
});
module.exports=BreadCrumbDropdown;
},{"react":"react"}],153:[function(require,module,exports){
var React=require("react");
var ReactDOM=require("react-dom");
var E=React.createElement;
var PT=React.PropTypes;

var BreadCrumbDropdownMUI=React.createClass({
	propTypes:{
		items:PT.array.isRequired
		,selected:PT.number
		,onSelect:PT.func
		,level:PT.number.isRequired //which level
		,keyword:PT.string
	}
	,getInitialState:function(){
		return {opened:false};
	}
	,componentWillReceiveProps:function(){
		this.setState({opened:false});
	}
	,getDefaultProp:function(){
		return {items:[]}
	}
	,close:function(){
		this.setState({opened:false});
	}
	,closeOther:function(cb){
		this.props.closeOther(cb);
	}
	,onSelect:function(e) {
		this.setState({opened:false});
		const domnode=e.target.parentElement;
		if (domnode.dataset && domnode.dataset.idx) idx=parseInt(domnode.dataset.idx);
		this.props.onSelect&&this.props.onSelect(idx,this.props.items,this.props.level);
	}
	,renderKeyword:function(t) {
		if (this.props.keyword) {
			var o=[],lastidx=0;
			t.replace(new RegExp(this.props.keyword,"g"),function(m,idx){
				o.push(t.substr(lastidx,idx));
				o.push(E("span",{key:idx,style:{color:"red"}},m));
				lastidx=idx+m.length;
			});
			o.push(t.substr(lastidx));
			t=o;
		}
		return t;
	}
	,renderItem:function(item,idx) {
		var hit=null;
		var style={cursor:"pointer"};
		if (this.props.selected==idx) style.background="highlight"
		item.hit&&(hit=E("span",{style:{color:"red"},className:"pull-right"},item.hit));
		var t=this.renderKeyword(item.t);
		return E("li",{key:idx,"data-idx":idx},
			E("a",{style:style,onClick:this.onSelect},t,hit));
	}
	,open:function(e){
		this.closeOther(function(){
			this.setState({opened:true});	
		}.bind(this));
		
	}
	,render:function(){
		var item=this.props.items[this.props.selected];
		if (!item)return E("span");
		var title=this.renderKeyword(item.t);

//		item.hit&&(title=[E("span",{key:1},item.t),E("span",{key:2,className:"hl0 pull-right"},item.hit||"")]);
		var dropdownbuttonclass=this.props.buttonClass;

		this.props.buttonClass
		const menuEl=(this.state.opened)?
			E("ul",{className:"mui-dropdown__menu mui--is-open"
				,onMouseLeave:this.close
				,id:"for_shutting_warning_up",title:title},
			this.props.items.map(this.renderItem)):E("div");

		//trim 
		var label=this.props.items[this.props.selected].t;

		if (this.props.depth+(this.props.untrimDepth||1)
			<this.props.maxDepth && (label.length>5 ||label.match(/(.*)[ ?????????]/))) {
			const m=label.match(/(.*)[ ?????????]/); //remove after punc
			if (m) {
				label=m[1].substring(0,5);	
			} else {
				label=label.substring(0,5);
			}
		}
		if (label.length>10) label=label.substr(0,10)+'...';
		return E("span",{className:"mui-dropdown"},
				E("button",{key:"drop","data-toggle":"dropdown",
					className:dropdownbuttonclass,
					style:this.state.opened?this.props.activeButtonStyle:this.props.buttonStyle,
					onMouseEnter:this.open}, this.renderKeyword(label) ),
				this.props.separator,menuEl);
				
	}
});
module.exports=BreadCrumbDropdownMUI;
},{"react":"react","react-dom":"react-dom"}],154:[function(require,module,exports){
module.exports={Component:require("./breadcrumbtoc")};
},{"./breadcrumbtoc":150}],155:[function(require,module,exports){
"use strict";

var main = require("accelon2017");
setTimeout(function () {
	var corpora = window.accelon2017 && window.accelon2017.corpora;
	if (!corpora) {
		var rootele = document.getElementById("root");
		rootele.innerHTML = "<h1>&nbsp;:( System failure</h1><br>&nbsp;Missing window.corpora.";
		rootele.style = "margin:0px;background-color:blue;color:white;height:100%";
	} else {
		main({ corpora: corpora });
	}
});

},{"accelon2017":113}]},{},[155]);
