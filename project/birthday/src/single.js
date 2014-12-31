
define(function (require) {
    var digit = require('./digit');
    var u = require('u');
    var Ball = require('./Ball');
    var Char = require('./Char');
    
    var WINDOW_WIDTH = window.innerWidth;
    var WINDOW_HEIGHT = window.innerHeight;
    var MARGIN_LEFT = Math.round(WINDOW_WIDTH * (2 / 5)); // 把屏幕划分为5份
    var RADIUS = Math.round(WINDOW_WIDTH * (1 / 5) / 14) - 1; // 字符由14个小球半径组成， 为了小球间的留白，格子的间距留1
    var MARGIN_TOP = Math.round((WINDOW_HEIGHT - 20 * (RADIUS + 1)) / 3);
    var COLORS = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
    var startTime = new Date().getTime();
    var numberIndex = 10;
    var single = {
        /**
         * 初始入口 
         */
        init: function () {
            this.canvas = document.querySelector('#canvas');
            this.cxt = this.canvas.getContext('2d');
            this.balls = [];
            this.enterDocument();
            this.render();
            this.animate();
        },
        
        /**
         * 初始页面状态 
         */
        enterDocument: function () {
            this.canvas.width = WINDOW_WIDTH;
            this.canvas.height = WINDOW_HEIGHT;
        },

        /**
         * 渲染页面 
         */
        render: function () {
            this.cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            var char1 = new Char({
                'cxt': this.cxt,
                'data': digit,
                'x': MARGIN_LEFT,
                'y': MARGIN_TOP,
                'r': RADIUS,
                'index': numberIndex,
                'color': 'rgb(0,102,153)'
            });
            char1.render();
        },
        
        /**
         * 渲染彩色小球 
         */
        renderColorBalls: function () {
            u.each(this.balls, function (ball, index) {
                ball.render();
            });
        },
        
        /**
         * 更新数据 
         */
        update: function () {
            var nowTime = new Date().getTime();
            if (nowTime - startTime >= 1000) {
                startTime = nowTime;
                numberIndex--;
                if (numberIndex < 0) {
                    numberIndex = 9;
                }
                //添加颜色球
                this.addColorBalls(MARGIN_LEFT + 0 , MARGIN_TOP, numberIndex);
            }
            this.updateColorBalls();
        },
        
        /**
         * 动画效果 
         */
        animate: function () {
            var me = this;
            me.timer = setInterval(function () {
                me.update();
                me.render();
                me.renderColorBalls();
            }, 30);
        },
        
        /**
         * 添加颜色球 
         * @param {number} x  x坐标值
         * @param {number} y  y坐标值
         * @param {number} index  在数据源中的序号
         */
        addColorBalls: function (x , y , index) {
            u.each(digit[index], function (item, i) {
                u.each(item, function (single, j) {
                    if (!single) {
                        return;
                    }
                    var option = {
                        'cxt': this.cxt,
                        'x': x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                        'y': y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                        // y方向的运动坐标长度绝对值
                        'pathY': y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                        'r': RADIUS,
                        'g': 0.8 + Math.random(),
                        'vx': Math.pow( -1 , Math.ceil(Math.random() * 1000)),
                        'vy': -5,
                        'color': COLORS[Math.floor(Math.random() * COLORS.length)]
                    };
                    var ball = new Ball(option);
                    this.balls.push(ball);
                }, this);
            }, this);
        },
        
        /**
         * 更新彩色小球
         */
        updateColorBalls: function () {
            u.each(this.balls, function (ball) {
                if (ball.pathY >= WINDOW_HEIGHT-RADIUS) {
                    ball.x += ball.vx;
                    //判断方向
                    if (ball.vx >= 0) {
                        ball.vx += 0.1; 
                    }
                    else {
                        ball.vx -= 0.1; 
                    }
                    ball.vy += ball.g;
                }
                else {
                    ball.vy += 1;
                }
                //y方向的运动坐标长度绝对值
                ball.pathY = ball.pathY + Math.abs(ball.vy);
                ball.y += ball.vy;
                
                //反弹效果
                if( ball.y >= WINDOW_HEIGHT-RADIUS){
                    ball.y = WINDOW_HEIGHT-RADIUS;
                    ball.vy = -Math.abs(ball.vy) * 0.75;
                }
            }, this);
            
            //移除屏幕外的小球
            var cnt = 0;
            u.each(this.balls, function (ball) {
                if(ball.x + RADIUS > 0 && ball.x -RADIUS < WINDOW_WIDTH) {
                    this.balls[cnt++] = ball;
                }
            }, this);
            while(this.balls.length > cnt){
                this.balls.pop();
            }
        }
    };
    
    return single;
});
