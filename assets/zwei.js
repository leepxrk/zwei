(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//zwei-0.4.js   2016.4.5   by L3've
	//                                                                                 `.`
	//                                                                               .hMMMm:
	//                                                                               hMMMMMM
	//                                                                               `yNMNh-
	//      ................    ...          `....     .//.          `.-////.`      .://:.
	//     :MMdyssshMMMMMMM::ymMMMMMd:      yMMMMN.  -NMMMMh      -odMNs+sNMMMm+ `yNNMMMMMd.
	//     hN:   `oMMMMMMy. :..:NMMMMN.    -MMMMMy   +MMMMMM:   :mMMMN.   oMMMMM.``  +MMMMM/
	//    `s-   :dMMMMMN:      `mMMMMm     yMMMMM.    +NMMMM:  sMMMMM-    yMMMMh     +MMMMM-
	//        .yMMMMMMo`       +MMMMM:    .NMMMMs       yMMm  +MMMMMh `./dMMNy/      NMMMMh
	//      `+NMMMMMd.        .NMMMMs     sMMMMM-       +MM:  mMMMMMmhyyo+:.        sMMMMN.
	//     :dMMMMMN/    ss    hMMMMM`    `NMMMMN       `mN/   hMMMMMh         :`   `NMMMMs
	//   `yMMMMMMs`    sM/    MMMMMN`  `/yNMMMMN.    .oNh.    :NMMMMM/`    `+dm:   oMMMMMo
	//  -NMMMMMMs++++omMm`    +MMMMMNddd/`-hMMMMMmddNms.       `sNMMMMMdddNmy:     -NMMMMMddh/
	//  .///////////////-      ./ooo/-`     ./+ooo+/.             -/oooo+:.         `:+ooo/.
	//
	//
	//
	//
	"use strict";

	var _Object$defineProperty = __webpack_require__(3)["default"];

	var _interopRequireDefault = __webpack_require__(9)["default"];

	var _dataBindJs = __webpack_require__(6);

	var _dataBindJs2 = _interopRequireDefault(_dataBindJs);

	(function (window) {
	    "use strict";

	    function Zwei(elem) {
	        var i;
	        for (i = 0; i < elem.length; i++) {
	            this[i] = elem[i];
	        }
	        this.length = elem.length;
	    }

	    Zwei.prototype.map = function (callback) {
	        var results = [],
	            i = 0;
	        for (i; i < this.length; i++) {
	            results.push(callback.call(this, this[i], i));
	        }
	        return results;
	    };
	    Zwei.prototype.mapOne = function (callback) {
	        var m = this.map(callback);
	        return m.length > 1 ? m : m[0];
	    };
	    Zwei.prototype.forEach = function (callback) {
	        this.map(callback);
	        return this;
	    };

	    //获取or修改DOM的属性
	    Zwei.prototype.attr = function (attr, val) {
	        if (val) {
	            return this.forEach(function (el) {
	                el.setAttribute(attr, val);
	            });
	        } else {
	            return this.mapOne(function (el) {
	                return el.getAttribute(attr);
	            });
	        }
	    };

	    //修改DOM的css样式
	    Zwei.prototype.css = function (name, value) {
	        return this.forEach(function (el) {
	            el.style[name] = value;
	        });
	    };

	    Zwei.prototype.hasClass = function (cName) {
	        return !!this[0].className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
	        // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
	    };
	    Zwei.prototype.addClass = function (cName) {
	        this.forEach(function (el) {
	            if (!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"))) {
	                el.className += " " + cName;
	            }
	        });
	        return this;
	    };
	    Zwei.prototype.removeClass = function (cName) {
	        this.forEach(function (el) {
	            if (!!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"))) {
	                el.className = el.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
	            }
	        });
	        return this;
	    };

	    //事件
	    Zwei.prototype.on = (function () {
	        if (document.addEventListener) {
	            return function (evt, fn) {
	                return this.forEach(function (el) {
	                    el.addEventListener(evt, fn, false);
	                });
	            };
	        }
	        if (document.attachEvent) {
	            return function (evt, fn) {
	                return this.forEach(function (el) {
	                    el.attachEvent("on" + evt, fn);
	                });
	            };
	        }
	        if (!document.attachEvent && !document.addEventListener) {
	            return function (evt, fn) {
	                return this.forEach(function (el) {
	                    el["on" + evt] = fn;
	                });
	            };
	        }
	    })();

	    var zwei = {
	        elem: function elem(selector) {
	            var elem;
	            if (typeof selector === "string") {
	                elem = document.querySelectorAll(selector);
	            } else if (selector.length) {
	                elem = selector;
	            } else {
	                elem = [selector];
	            }
	            return new Zwei(elem);
	        }
	    };
	    //在元素后插入新元素
	    zwei.insertAfter = function (newElement, targetElement) {
	        var parent = targetElement.parentNode;
	        if (parent.lastChild == targetElement) {
	            parent.appendChild(newElement);
	        } else {
	            parent.insertBefore(newElement, targetElement.nextSibling);
	        }
	    };

	    //   事件处理器
	    zwei.evtOnEmit = function () {
	        function EventEmitter() {
	            this.events = {};
	        }

	        //绑定事件函数
	        EventEmitter.prototype.on = function (eventName, callback) {
	            this.events[eventName] = this.events[eventName] || [];
	            this.events[eventName].push(callback);
	        };
	        //触发事件函数
	        EventEmitter.prototype.emit = function (eventName) {
	            var events = this.events[eventName],
	                args = Array.prototype.slice.call(arguments, 1),
	                i,
	                m;

	            if (!events) {
	                return;
	            }
	            for (i = 0, m = events.length; i < m; i++) {
	                events[i].apply(null, args);
	            }
	        };

	        return new EventEmitter();
	    };

	    zwei.blink = function (id, callback) {
	        var _blink_ = {},
	            father = zwei.elem("#" + id)[0],
	            child = father.getElementsByTagName("*"),
	            childTex;
	        for (var i = child.length; i--;) {
	            childTex = child[i].innerHTML.toString();
	            if (/[\{][\{][0-9a-z]*[\}][\}$]/gi.test(childTex)) {
	                childTex = /[\{][\{][0-9a-z]*[\}][\}$]/i.exec(childTex).toString().replace(/^\{\{*/, '').replace(/\}\}*$/, '');
	                child[i][childTex] = childTex;
	                _blink_[childTex] = child[i];
	                gset(child[i], childTex);
	            }
	        }
	        callback(brief);

	        function brief(val, cval) {
	            _blink_[val][val] = cval;
	        }

	        function gset(dom, val) {
	            var tip = new Date().getTime();

	            _Object$defineProperty(dom, val, {
	                set: function set(x) {
	                    this[tip] = x;
	                    dom.innerHTML = x;
	                },
	                get: function get() {
	                    return this[tip];
	                }
	            });
	        }
	    };
	    window.zwei = zwei;
	})(window);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(8)['default'];

	var _classCallCheck = __webpack_require__(7)['default'];

	var _Object$defineProperty = __webpack_require__(3)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var blink = (function () {
	    function blink(params) {
	        _classCallCheck(this, blink);

	        for (var target in params) {
	            this[target] = {};
	            for (var props in params[target]) {
	                this[target][props] = params[target][props];
	            }
	        }
	        return this;
	    }

	    _createClass(blink, [{
	        key: 'bind',
	        value: function bind(obj, props, callback) {
	            var tip = new Date().getTime();
	            _Object$defineProperty(this[obj], props, {
	                get: function get() {
	                    return this[tip];
	                },
	                set: function set(newValue) {
	                    this[tip] = newValue;
	                    callback(newValue);
	                },
	                configurable: true // 允许在稍后重定义这个属性
	            });
	        }
	    }]);

	    return blink;
	})();

	exports['default'] = blink;

	var dataPool = {
	    live: {
	        'name': 'L3ve',
	        'uid': 1,
	        'img': 'http://fuck.you'
	    },
	    master: {
	        'name': 'zwei',
	        'rank': 7
	    }
	};
	var testPool = {
	    live: {
	        liveVal: {
	            name: 'l3ve'
	        }
	    }
	};

	var dataBind = new blink(dataPool);
	dataBind.bind('live', 'name', function (newData) {
	    console.log('it will be changed');
	});
	dataBind.live.name = 'fuck';
	console.log(dataBind.live.name);
	// dataPool.live.name = 'Bob'
	// dataBind.updata('live','name','get');
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(3)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ }
/******/ ])
});
;