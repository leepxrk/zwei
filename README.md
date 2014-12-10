zwei
====
一个自娱自乐的JavaScript库~

JavaScript Library

## DOM的获取

    zwei.elem("");

采用`document.querySelectorAll()`来实现

### DOM常用方法

     `zweiDOM.forEach(callback)`
callback带2个参数,当前的this和i(和原生的forEach一样)
***
     `zweiDOM.attr(attr, val)`
attr为查询获取修改的属性名,val为值,但val缺省时为查询
***
     `zweiDOM.css(name, val)`
name为属性名,val为属性值
***
     `zweiDOM.on(evt, fn)`
evt为事件名,fn为回调,默认是冒泡false(无奈的兼容了IE~)
***


## 常用的事件

     `zwei.getStyle(obj, attr)`
获取外部CSS样式,也就是最后渲染好之后的CSS样式.obj为对象,attr为属性名
***
     `zwei.post(url, parameter, callback)`
ajax请求,类型固定为post,数据固定为json
