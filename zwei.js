//zwei-0.3.js   2014.12.17   by L3've
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

(function () {
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
        }
        if (!val) {
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
    }());

    var zwei = {
        elem: function (selector) {
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
    //获取外部css样式
    zwei.getStyle = function (obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        if (!obj.currentStyle) {
            return document.defaultView.getComputedStyle(obj, null)[attr];
        }
    };

    //ajax方法
    zwei.post = function (url, parameter, callback) {
        var xmlHttp,
            cb,
            parm;
        if (typeof parameter === "function") {
            cb = parameter;
            parm = null;

        } else {
            cb = callback;
            parm = JSON.stringify(parameter);
        }
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlHttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlHttp == null) {
            alert('Shit Update your browser！');
            return;
        }
        xmlHttp.open("POST", url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(parm);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 1 || xmlHttp.readyState == 2 || xmlHttp.readyState == 3) {
                // 本地提示：加载中/处理中
                console.log("loading");
            }
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                //回调
                cb(xmlHttp.responseText);
            }
        };
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



    //上下居中
    zwei.elemCenter = function (target) {
        var elem,
            parent;
        if (typeof target === "string") {
            elem = document.getElementById(target);
        } else {
            elem = target;
        }
        parent = elem.parentNode;
        if (elem.style.height && parent.style.height) {
            elem.style.paddingTop = parseInt(parent.style.height, 0) / 2 - parseInt(elem.style.height, 0) / 2 + "px";
        } else {
            elem.style.paddingTop = parseInt(getStyle(parent, "height"), 0) / 2 - parseInt(getStyle(elem, "height"), 0) / 2 + "px";
        }
    };

//消息栏  整体的class="zwei_prompt"  标题class="zwei_prompt_title" 内容class="zwei_prompt_content"
//news = new zwei.News({
//    "allnewsId": "父亲元素",
//    "title": "标题",
//    "content": "内容",
//    "color": "red",
//    "interval": "存在时间"
//});
    zwei.News = function (param) {
        this.content = param.content || "你到底想说什么?!";
        this.title = param.title || "天外来音";
        this.interval = param.interval || 3;
        this.color = param.color || "black";
        this.clickpass = false;
        this.allnews = document.getElementById(param.allnewsId);

        this.showEnd = function (news) {
            if (this.clickpass === false) {
                setTimeout(function () {
                    news.parentNode.removeChild(news);
                }, 500);
            }
            news.style.transform = "scale(0.3)";
            news.style.webkitTransform = "scale(0.3)";
        };
        this.init = function () {
            var news = document.createElement("div"),
                content = document.createElement("p"),
                title = document.createElement("p"),
                _this = this;
            news.className = "zwei_prompt";
            news.style.borderColor = this.color;
            content.innerHTML = this.content;
            content.classList.add("zwei_prompt_content");
            news.appendChild(content);
            title.innerHTML = this.title;
            title.classList.add("zwei_prompt_title");
            news.insertBefore(title, content);
            this.allnews.appendChild(news);


            news.onclick = function () {
                _this.showEnd(news);
                news.onclick = null;
                _this.clickpass = true;

            };
            setTimeout(function () {
                _this.showEnd(news);
            }, this.interval * 1000);
        };
        this.init();
    };


    //移动元素
    //zwei.Drag.init(拖拽的对象,移动的对象,最小X,最大X,最小Y,最大Y,只垂直移动,只横向移动);
    zwei.Drag = {
        obj: null,
        init: function (o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
            o.onmousedown = zwei.Drag.start;

            o.hmode = bSwapHorzRef ? false : true;
            o.vmode = bSwapVertRef ? false : true;

            o.root = oRoot && oRoot != null ? oRoot : o;

            if (o.hmode && isNaN(parseInt(o.root.style.left, 0))) {
                o.root.style.left = "0px";
            }
            if (o.vmode && isNaN(parseInt(o.root.style.top, 0))) {
                o.root.style.top = "0px";
            }
            if (!o.hmode && isNaN(parseInt(o.root.style.right, 0))) {
                o.root.style.right = "0px";
            }
            if (!o.vmode && isNaN(parseInt(o.root.style.bottom, 0))) {
                o.root.style.bottom = "0px";
            }

            o.minX = minX !== "undefined" ? minX : null;
            o.minY = minY !== "undefined" ? minY : null;
            o.maxX = maxX !== "undefined" ? maxX : null;
            o.maxY = maxY !== "undefined" ? maxY : null;

            o.xMapper = fXMapper || null;
            o.yMapper = fYMapper || null;

            o.root.onDragStart = function () {
            };
            o.root.onDragEnd = function () {
            };
            o.root.onDrag = function () {
            };
        },

        start: function (e) {
            var o = zwei.Drag.obj = this,
                y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom, 0),
                x = parseInt(o.hmode ? o.root.style.left : o.root.style.right, 0);
            o.root.onDragStart(x, y);
            e = zwei.Drag.fixE(e);
            o.lastMouseX = e.clientX;
            o.lastMouseY = e.clientY;

            if (o.hmode) {
                if (o.minX != null) {
                    o.minMouseX = e.clientX - x + o.minX;
                }
                if (o.maxX != null) {
                    o.maxMouseX = o.minMouseX + o.maxX - o.minX;
                }
            } else {
                if (o.minX != null) {
                    o.maxMouseX = -o.minX + e.clientX + x;
                }
                if (o.maxX != null) {
                    o.minMouseX = -o.maxX + e.clientX + x;
                }

            }

            if (o.vmode) {
                if (o.minY != null) {
                    o.minMouseY = e.clientY - y + o.minY;
                }
                if (o.maxY != null) {
                    o.maxMouseY = o.minMouseY + o.maxY - o.minY;
                }
            } else {
                if (o.minY != null) {
                    o.maxMouseY = -o.minY + e.clientY + y;
                }
                if (o.maxY != null) {
                    o.minMouseY = -o.maxY + e.clientY + y;
                }
            }

            document.onmousemove = zwei.Drag.drag;
            document.onmouseup = zwei.Drag.end;

            return false;
        },

        drag: function (e) {
            e = zwei.Drag.fixE(e);
            var o = zwei.Drag.obj,
                ey = e.clientY,
                ex = e.clientX,
                y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom, 0),
                x = parseInt(o.hmode ? o.root.style.left : o.root.style.right, 0),
                nx, ny;

            if (o.minX != null) {
                ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
            }
            if (o.maxX != null) {
                ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
            }
            if (o.minY != null) {
                ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
            }
            if (o.maxY != null) {
                ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);
            }

            nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
            ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

            if (o.xMapper) {
                nx = o.xMapper(y);
            }
            else if (o.yMapper) {
                ny = o.yMapper(x);
            }

            zwei.Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
            zwei.Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
            zwei.Drag.obj.lastMouseX = ex;
            zwei.Drag.obj.lastMouseY = ey;

            zwei.Drag.obj.root.onDrag(nx, ny);
            return false;
        },

        end: function () {
            document.onmousemove = null;
            document.onmouseup = null;
            zwei.Drag.obj.root.onDragEnd(parseInt(zwei.Drag.obj.root.style[zwei.Drag.obj.hmode ? "left" : "right"], 0),
                parseInt(zwei.Drag.obj.root.style[zwei.Drag.obj.vmode ? "top" : "bottom"], 0));
            zwei.Drag.obj = null;
        },

        fixE: function (e) {
            if (e === 'undefined') {
                e = window.event;
            }
            if (e.layerX == 'undefined') {
                e.layerX = e.offsetX;
            }
            if (e.layerY == 'undefined') {
                e.layerY = e.offsetY;
            }
            return e;
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
        EventEmitter.prototype.emit = function (eventName, _) {
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
    if (typeof define === "function" && define.amd) {
        define("zwei", [], function () {
            return zwei;
        });
    } else {
        window.zwei =  zwei;
    }

}());


