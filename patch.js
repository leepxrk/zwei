//这是拯救IE的存在...

function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}
function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    }
}
function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        // replace方法是替换
    }
}



//优雅降级placeholder
function placeHolder(elemId, bool) {
    var d = document.getElementById(elemId),
        text = d.getAttribute("placeholder"),
        newpw,
        ispw = bool || false;
    if ('placeholder' in document.createElement('input')) {
        return;
    }
    if (ispw) {
        d.style.display = "none";
        newpw = document.createElement("input");
        newpw.setAttribute("type", "text");
        newpw.value = text;
        insertAfter(newpw, d);
        newpw.onfocus = function () {
            newpw.style.display = "none";
            d.style.display = "inline-block";
            d.focus();
        };
        d.onblur = function () {
            if (d.value == "") {
                newpw.style.display = "inline-block";
                d.style.display = "none";
            }
        };
    } else {
        d.value = text;
        d.onfocus = function () {
            if (d.value == text) {
                d.value = "";
            }

        };
        d.onblur = function () {
            if (d.value == "") {
                d.value = text;
            }
        };
    }
}



//requestAnimationFrame兼容性

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
