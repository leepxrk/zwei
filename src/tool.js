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