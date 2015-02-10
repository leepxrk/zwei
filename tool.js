//中英翻译,数组下标奇数为英语,偶数为中文
//translation(
//    [
//        'Finish', '完成',
//        'Delay', '延迟'    ,
//        'Cancel', '取消',
//        'Refresh', '刷新',
//    ])
//
//

function translation(arr) {
    var all = document.querySelectorAll(".zweiTranlt"),
        newLan,
        oldLan,
        i,
        len = 0;

    while (len < arr.length) {
        for (i = all.length; i--;) {
            if (/.*[\u4e00-\u9fa5]+.*$/.test(all[i].innerHTML)
                || /.*[\u4e00-\u9fa5]+.*$/.test(all[i].value)
                || /.*[\u4e00-\u9fa5]+.*$/.test(all[i].getAttribute("placeholder"))) {
                newLan = arr[len];
                oldLan = arr[len + 1];
            } else {
                newLan = arr[len + 1];
                oldLan = arr[len];
            }

            if (all[i].getAttribute("placeholder") == oldLan) {
                all[i].setAttribute("placeholder", newLan);
            }
            if (all[i].value == oldLan) {
                all[i].value = newLan;
            }
            if (all[i].innerHTML == oldLan) {
                all[i].innerHTML = newLan;
            }
        }
        len = len + 2;
    }
}


//日期格式化    new Date().format("yyyy-MM-dd hh:mm:ss");
Date.prototype.format = function (format) {
    "use strict";
    var k,
        o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

var zwei = {};

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


//获取外部css样式
zwei.getStyle = function (obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    if (!obj.currentStyle) {
        return document.defaultView.getComputedStyle(obj, null)[attr];
    }
};