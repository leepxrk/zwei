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

