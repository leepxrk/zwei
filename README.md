zwei
====
一个自娱自乐的JavaScript库~

## DOM的获取

>zwei.elem("");

- 采用`document.querySelectorAll()`来实现

### DOM常用函数
>zweiDOM.forEach(callback)

- callback带2个参数,当前的this和i(和原生的forEach一样)

>zweiDOM.attr(attr, val)

- attr为查询获取修改的属性名,val为值,但val缺省时为查询

>zweiDOM.css(name, val)

- name为属性名,val为属性值

>zweiDOM.on(evt, fn)

- evt为事件名,fn为回调,默认是冒泡false

>hasClass  addClass  removeClass

- 你懂的

## 常用的函数
###zwei.js
>zwei.insertAfter(newElement, targetElement)

- 在某个DOM后面插入DOM

>zwei.evtOnEmit()

- 返回一个EventEmitter事件对象,该对象有2个方法

>EventEmitter.on(eventName, callback)
>EventEmitter.emit(eventName)

- 订阅发布的设计模式

>zwei.blink(id, callback);

- 数据绑定,第一个参数是父亲标签的ID,回调函数有一个参数方法m,方法带2个参数m(name,val),分别为绑定属性名与对应的值.

###tool.js
> zwei.Drag.init(拖拽的对象,移动的对象,最小X,最大X,最小Y,最大Y,只垂直移动,只横向移动);

- 拖拽.这代码是参考网上的代码的,基本上没什么改动,性能感觉是我用的最好的
