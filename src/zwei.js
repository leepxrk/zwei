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
import blink from './dataBind.js';
(function(window) {
    "use strict";

    function Zwei(elem) {
        var i;
        for (i = 0; i < elem.length; i++) {
            this[i] = elem[i];
        }
        this.length = elem.length;
    }

    Zwei.prototype.map = function(callback) {
        var results = [],
            i = 0;
        for (i; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results;
    };
    Zwei.prototype.mapOne = function(callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };
    Zwei.prototype.forEach = function(callback) {
        this.map(callback);
        return this;
    };

    //获取or修改DOM的属性
    Zwei.prototype.attr = function(attr, val) {
        if (val) {
            return this.forEach(function(el) {
                el.setAttribute(attr, val);
            });
        } else {
            return this.mapOne(function(el) {
                return el.getAttribute(attr);
            });
        }
    };

    //修改DOM的css样式
    Zwei.prototype.css = function(name, value) {
        return this.forEach(function(el) {
            el.style[name] = value;
        });
    };

    Zwei.prototype.hasClass = function(cName) {
        return !!this[0].className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
        // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
    }
    Zwei.prototype.addClass = function(cName) {
        this.forEach(function(el) {
            if (!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"))) {
                el.className += " " + cName;
            }
        })
        return this;
    }
    Zwei.prototype.removeClass = function(cName) {
        this.forEach(function(el) {
            if (!!el.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"))) {
                el.className = el.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
            }
        })
        return this;
    }


    //事件
    Zwei.prototype.on = (function() {
        if (document.addEventListener) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el.addEventListener(evt, fn, false);
                });
            };
        }
        if (document.attachEvent) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el.attachEvent("on" + evt, fn);
                });
            };
        }
        if (!document.attachEvent && !document.addEventListener) {
            return function(evt, fn) {
                return this.forEach(function(el) {
                    el["on" + evt] = fn;
                });
            };
        }
    } ());

    var zwei = {
        elem: function(selector) {
            var elem;
            if (typeof selector === "string") {
                elem = document.querySelectorAll(selector);
            } else if (selector.length) {
                elem = selector;
            }
            else {
                elem = [selector];
            }
            return new Zwei(elem);
        }
    };
    //在元素后插入新元素
    zwei.insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    };


    //   事件处理器
    zwei.evtOnEmit = function() {
        function EventEmitter() {
            this.events = {};
        }

        //绑定事件函数
        EventEmitter.prototype.on = function(eventName, callback) {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(callback);
        };
        //触发事件函数
        EventEmitter.prototype.emit = function(eventName) {
            var events = this.events[eventName],
                args = Array.prototype.slice.call(arguments, 1),
                i, m;

            if (!events) {
                return;
            }
            for (i = 0, m = events.length; i < m; i++) {
                events[i].apply(null, args);
            }
        };

        return new EventEmitter();
    };

    zwei.blink = function(id, callback) {
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

            Object.defineProperty(dom, val, {
                set: function(x) {
                    this[tip] = x;
                    dom.innerHTML = x;
                },
                get: function() {
                    return this[tip];
                }
            });
        }

    };
    window.zwei = zwei;
} (window));