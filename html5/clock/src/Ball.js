/**
 * 小球对象类 
 * @Class Ball 
 */

define(function (require) {
    var u = require('u');
    
    function Ball (option) {
        u.extend(
        this,
        {
            cxt: null, //画布
            x: 0,  //x轴位置
            y: 0,  //y轴位置
            r: 5,  //半径
            vx: 5, //x方向速度
            vy: 5, //y方向速度
            g: 5,   //y方向加速度
            color: '#000' //颜色
        }, 
        option);
    }
    
    Ball.prototype = {
        
        /**
         * 渲染小球
         * @public 
         */
        render: function () {
            this.cxt.fillStyle = this.color;
            this.cxt.beginPath();
            this.cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            this.cxt.closePath();
            this.cxt.fill();
        }
    };
    return Ball;
});
