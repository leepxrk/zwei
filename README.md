zwei
====
一个自娱自乐的JavaScript库~

JavaScript Library

### DOM的获取

    zwei.elem("");

采用`document.querySelectorAll()`来实现

#### DOM常用方法

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


## 常用的事件

     zwei.getStyle(obj, attr)
获取外部CSS样式,也就是最后渲染好之后的CSS样式.obj为DOM对象,attr为属性名
***
     zwei.post(url, parameter, callback)
ajax请求,类型固定为post,数据固定为json
***
     zwei.insertAfter(newElement, targetElement)
在某个DOM后面插入DOM
***
     zwei.placeHolder(target, bool)
其实我还在犹豫要不要这家伙..明显有悖于我不支持低版本的思想,但IE8都不支持placeHolder...
***
     zwei.elemCenter(target)
让DOM上下居中,参数可以是ID或者DOM,对象必须设置`position:relative`
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
