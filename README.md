zwei
====
一个自娱自乐的JavaScript库~

`zwei.js`为主code,IE9连classList都不支持,别怪我 

`patch.js`勉强试试抢救了下兼容性问题

`tool.js`是一些方便的方法工具,也有前端组件
### DOM的获取

    zwei.elem("");

采用`document.querySelectorAll()`来实现

### DOM常用函数

     zweiDOM.forEach(callback)
callback带2个参数,当前的this和i(和原生的forEach一样)
***
     zweiDOM.attr(attr, val)
attr为查询获取修改的属性名,val为值,但val缺省时为查询
***
     zweiDOM.css(name, val)
name为属性名,val为属性值
***
     zweiDOM.on(evt, fn)
evt为事件名,fn为回调,默认是冒泡false(无奈的兼容了IE~)
***


### 常用的函数
###zwei.js
     zwei.post(url, parameter, callback)
ajax请求,类型固定为post,数据固定为json
***
     zwei.insertAfter(newElement, targetElement)
在某个DOM后面插入DOM
***

    zwei.evtOnEmit()
返回一个EventEmitter事件对象,该对象有2个方法

     EventEmitter.on(eventName, callback)
     EventEmitter.emit(eventName)
订阅发布的设计模式
###tool.js
     zwei.elemCenter(target)
让DOM上下居中,参数可以是ID或者DOM,对象必须设置`position:relative`
***
     zwei.getStyle(obj, attr)
获取外部CSS样式,也就是最后渲染好之后的CSS样式.obj为DOM对象,attr为属性名
***
     zwei.News(param)
消息栏  

整体的class="zwei_prompt"  标题class="zwei_prompt_title" 内容class="zwei_prompt_content"

     news = new zwei.News({
       "allnewsId": "父亲元素",
        "title": "标题",            //默认 "天外来音"
        "content": "内容",          //默认 "你到底想说什么?!"
        "color": "边框颜色",             //默认 "black"  支持各种颜色格式
        "interval": "存在时间"      //默认  3
     });
***
    zwei.Drag.init(拖拽的对象,移动的对象,最小X,最大X,最小Y,最大Y,只垂直移动,只横向移动);
拖拽.这代码是参考网上的代码的,基本上没什么改动,性能感觉是我用的最好的
***

###patch.js
     zwei.placeHolder(target, bool)
其实我还在犹豫要不要这家伙..明显有悖于我不支持低版本的思想,但IE8都不支持placeHolder...
***
1. `hasClass``addClass``removeClass`代替`classList`

2. 统一`requestAnimationFrame``cancelAnimationFrame`的写法