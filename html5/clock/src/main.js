
define(function (require) {
    
    var digit = require('./digit');
    var u = require('u');
    var Ball = require('./Ball');
    var Char = require('./Char');
    
    var WINDOW_WIDTH = document.body.clientWidth;
    var WINDOW_HEIGHT = document.body.clientHeight - 100;
    var MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    var RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    var MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    var nowTime = new Date();
    var END_TIME = nowTime.setTime(nowTime.getTime() + 3600 * 1000);
    var COLORS = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
    
    var main = {
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
            this.currentShowTime = this.getCurrentShowTime();
        },
        
        /**
         * 获取当前显示的时间
         * @return {number} 
         */
        getCurrentShowTime: function () {
            var now = new Date();
            var ret = END_TIME - now.getTime();
            ret = Math.round(ret / 1000);
            return ret >= 0 ? ret : 0;
        },
        
        /**
         * 渲染页面 
         */
        render: function () {
            this.cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            var hours = parseInt(this.currentShowTime / 3600);
            var minutes = parseInt( (this.currentShowTime - hours * 3600) / 60 );
            var seconds = this.currentShowTime % 60;
        
            this.renderSingle( MARGIN_LEFT , MARGIN_TOP , parseInt(hours / 10));
            this.renderSingle( MARGIN_LEFT + 15 * (RADIUS + 1) , MARGIN_TOP , parseInt(hours % 10));
            this.renderSingle( MARGIN_LEFT + 30 * (RADIUS + 1) , MARGIN_TOP , 10);
            this.renderSingle( MARGIN_LEFT + 39 * (RADIUS + 1) , MARGIN_TOP , parseInt(minutes / 10));
            this.renderSingle( MARGIN_LEFT + 54 * (RADIUS + 1) , MARGIN_TOP , parseInt(minutes % 10));
            this.renderSingle( MARGIN_LEFT + 69 * (RADIUS + 1) , MARGIN_TOP , 10);
            this.renderSingle( MARGIN_LEFT + 78 * (RADIUS + 1) , MARGIN_TOP , parseInt(seconds / 10));
            this.renderSingle( MARGIN_LEFT + 93 * (RADIUS + 1) , MARGIN_TOP , parseInt(seconds % 10));
        },
        
        /**
         * 渲染单个字符 
         * @param {number} x  x坐标值
         * @param {number} y  y坐标值
         * @param {number} index  在数据源中的序号
         */
        renderSingle: function (x, y, index) {
            var char1 = new Char({
                'cxt': this.cxt,
                'data': digit,
                'x': x,
                'y': y,
                'r': RADIUS,
                'index': index,
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
            var nextShowTime = this.getCurrentShowTime();
            var nextHours = parseInt(nextShowTime / 3600);
            var nextMinutes = parseInt((nextShowTime - nextHours * 3600) / 60 );
            var nextSeconds = nextShowTime % 60;
        
            var curHours = parseInt(this.currentShowTime / 3600);
            var curMinutes = parseInt((this.currentShowTime - curHours * 3600) / 60 );
            var curSeconds = this.currentShowTime % 60;
            if (nextSeconds !== curSeconds) {
                this.currentShowTime = this.getCurrentShowTime();
                //添加颜色球
                if ( parseInt(curHours / 10) !== parseInt(nextHours / 10)) {
                    this.addColorBalls(MARGIN_LEFT + 0 , MARGIN_TOP, parseInt(curHours / 10));
                }
                if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
                    this.addColorBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10) );
                }
                if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
                    this.addColorBalls(MARGIN_LEFT + 39 * (RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10) );
                }
                if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
                    this.addColorBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
                }
        
                if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
                    this.addColorBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
                }
                if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
                    this.addColorBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
                }
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
                        'r': RADIUS,
                        'g': 1.5 + Math.random(),
                        'vx': Math.pow( -1 , Math.ceil(Math.random() * 1000)) * 4,
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
                ball.x += ball.vx;
                /*
                var c = 1.0;
                if( ball.y + RADIUS + ball.vy >= WINDOW_HEIGHT ){
                    c = ( WINDOW_HEIGHT - (ball.y+ RADIUS) ) / ball.vy;
                    console.log( c );   
                }
                */  
                ball.y += ball.vy;
                ball.vy += ball.g;
                //ball.vy += c * ball.g;
        
                if( ball.y >= WINDOW_HEIGHT-RADIUS ){
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
    
    return main;
});
