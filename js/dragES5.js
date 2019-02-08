'use strict';

var dragRender = function () {
    var loginBox = document.getElementById('loginBox'),
        loginTitle = loginBox.getElementsByTagName('h3')[0];

    var winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight;

    // noinspection JSAnnotator
    var maxL = winW - loginBox.offsetWidth,
        maxT = winH - loginBox.offsetHeight;

    //=> 鼠标按下
    var dragDown = function dragDown(e) {
        var _this2 = this;

        e = e || window.event;

        //=> 记录鼠标起始位置和盒子的起始位置
        this.strX = e.clientX;
        this.strY = e.clientY;
        this.strL = loginBox.offsetLeft;
        this.strT = loginBox.offsetTop;

        //=> 按下代表拖拽开始
        //=> 绑定给document，问题：此时dragMove和dragUp方法中的this是document，而我们在方法中需要使用H3的记录信息
        // document.onmousemove = dragMove;
        // document.onmouseup = dragUp;

        //=> 解决：
        var _this = this;
        document.onmousemove = function () {
            dragMove.call(_this);
        };
        document.onmouseup = function () {
            dragUp.call(_this2);
        };
    };

    //=> 鼠标移动
    var dragMove = function dragMove(e) {
        e = e || window.event;
        var curL = e.clientX - this.strX + this.strL,
            curT = e.clientY - this.strY + this.strT;
        curL = curL < 0 ? 0 : curL > maxL ? maxL : curL;
        curT = curT < 0 ? 0 : curT > maxT ? maxT : curT;

        loginBox.style.left = curL + 'px';
        loginBox.style.top = curT + 'px';
    };

    //=> 鼠标抬起
    var dragUp = function dragUp(e) {
        //=> 鼠标抬起：拖拽结束，把move和up移除掉
        //=> 移除DOC上绑定的方法
        document.onmousemove = null;
        document.onmouseup = null;
    };

    return {
        init: function init() {
            //=> 让盒子处于页面的中间
            loginBox.style.left = maxL / 2 + 'px';
            loginBox.style.top = maxT / 2 + 'px';
            loginTitle.onmousedown = dragDown; //=> this:loginTitle
        }
    };
}();
dragRender.init();

/*
* 在拖拽案例中有一个经典的问题：鼠标焦点丢失问题
*   当鼠标移动速度过快的时候，鼠标离开了h3(盒子跟不上奔跑的速度)，所以导致一下的一些问题
*       1、鼠标在H3外边飞，不会触发H3的mousemove，盒子也就不跟着动了
*       2、鼠标在H3外边抬起，也不会触发H3的mouseup，那么原有绑定的dragMove方法无法被溢出，鼠标新进入H3，此时不管有没有按下鼠标，是要鼠标移动，盒子就跟着跑
*       ...
*       =>鼠标的所有操作和H3的事件（以及绑定的方法）没关系了
*
*   解决方案一：（所有浏览器兼容）
*       把movesemove和moveseup事件绑定给document，原因：鼠标不管怎么飞都飞不出document，只要你鼠标还在文档中，那么mousemove和mouseup永远生效
* */
