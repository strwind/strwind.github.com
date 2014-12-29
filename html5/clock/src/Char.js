/**
 * 单个字符类
 * @Class Char 
 */

define(function (require) {
    var u = require('u');
    var Ball = require('./Ball');
    var digit = require('./digit');
     
    function Char(option) {
        u.extend(
        this,
        {
            cxt: null, //画布
            data: [], //数据源
            x: 0,  //x轴位置
            y: 0,  //y轴位置
            r: 5,  //组成字符的小球的半径
            index: 5, //在数据源中的序号
            color: '#000' //颜色
        }, 
        option);
    }
    
    Char.prototype = {
        
        /**
         * 绘制字符 
         * @public
         */
        render: function () {
            u.each(this.data[this.index], function (item, i) {
                u.each(item, function (single, j) {
                    if (!single) {
                        return;
                    }
                    var option = {
                        'cxt': this.cxt,
                        'x': this.x + j * 2 * (this.r + 1) + (this.r + 1),
                        'y': this.y + i * 2 * (this.r + 1) + (this.r + 1),
                        'r': this.r,
                        'color': this.color
                    };
                    var ball = new Ball(option);
                    ball.render();
                }, this);
            }, this);
        }
    };
    
    return Char;
});
