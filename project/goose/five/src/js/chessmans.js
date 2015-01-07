/**
 * 棋子交互处理
 */

define(function (require) {
    var util = require('./util');
    // 存放游戏格子系统的数据，为一个二维数组
    var chessData = [];
    
    // 白棋在数组中为1
    const WHITE_CHESS = 1;
    // 没有棋在数组中为0
    const NO_CHESS = 0;
    // 黑棋在数组中为-1
    const BLACK_CHESS = -1;

    var chessmans = {
        
        /**
         * 程序入口
         * @param {Object} options 配置参数
         */
        init: function (options) {
            this.canvas = options.canvas;
            this.context = options.context;
            this.gridWidth = options.gridWidth;
            this.halfGridWidth = this.gridWidth / 2;
            this.gridNumber = options.gridNumber;
            this.isWell = false;//设置该局棋盘是否赢了，如果赢了就不能再走了
            this.imgWhite = new Image();
            this.imgWhite.src = "src/img/white.png";//白棋图片
            this.imgBlack = new Image();
            this.imgBlack.src = "src/img/black.png";//黑棋图片
            
            this.initModel();
            this.bindEvent();
        },
        
        /**
         * 初始化数据 
         */
        initModel: function () {
            //这个为棋盘的二维数组用来保存棋盘信息
            for (var x = 0; x < this.gridNumber; x++) {
                chessData[x] = [];
                for (var y = 0; y < this.gridNumber; y++) {
                    chessData[x][y] = NO_CHESS;
                }
            }
        },
        
        /**
         * 绑定事件 
         */
        bindEvent: function () {
            this.canvas.addEventListener('click', this.clickHandler.bind(this), 'false');
        },
        
         /**
         * 点击事件处理函数
         */
        clickHandler: function (e) {
            //计算鼠标点击的区域
            var x = parseInt((e.layerX - this.halfGridWidth) / this.gridWidth, 10);
            var y = parseInt((e.layerY - this.halfGridWidth) / this.gridWidth, 10);
 
            if (chessData[x][y] !== 0) {//判断该位置是否被下过了
            alert("你不能在这个位置下棋");
                return;
            }
            //玩家为白棋
            this.drawChess( x, y, WHITE_CHESS);
        },
        
        /**
         * 绘制具体的棋子  
         * 换其他实现方式时（如DOM）, 更改此函数即可
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @param {number} chessColor 棋子的代号
         */
        drawChess: function (x, y, chessColor) {
            if (this.isWell === true) {
                alert("已经结束了，刷新重新开始");
                return;
            }
            if (x >= 0 && x < this.gridNumber && y >= 0 && y < this.gridNumber) {
                if (chessColor == WHITE_CHESS) {
                    this.context.drawImage(this.imgWhite, x * this.gridWidth + this.halfGridWidth, y * this.gridWidth + this.halfGridWidth);
                    chessData[x][y] = WHITE_CHESS;
                }
                else {
                    this.context.drawImage(this.imgBlack, x * this.gridWidth + this.halfGridWidth, y * this.gridWidth + this.halfGridWidth);
                    chessData[x][y] = BLACK_CHESS;
                }
                this.judge(x, y, chessColor);
            }
        },
        
        /**
         * 判断是否赢棋
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @param {number} chessColor 棋子的代号
         */
        judge: function (x, y, chessColor) {
            var count1 = 0;
            var count2 = 0;
            var count3 = 0;
            var count4 = 0;
            //左右判断
            for (var i = x; i >= 0; i--) {
                if (chessData[i][y] !== chessColor) {
                    break;
                }
                count1++;
            }
            for (var i = x + 1; i < this.gridNumber; i++) {
                if (chessData[i][y] !== chessColor) {
                    break;
                }
                count1++;
            }
            //上下判断
            for (var i = y; i >= 0; i--) {
                if (chessData[x][i] !== chessColor) {
                    break;
                }
                count2++;
            }
            for (var i = y + 1; i < this.gridNumber; i++) {
                if (chessData[x][i] !== chessColor) {
                    break;
                }
                count2++;
            }
            //左上右下判断
            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
                if (chessData[i][j] !== chessColor) {
                    break;
                }
                count3++;
            }
            for (var i = x + 1, j = y + 1; i < this.gridNumber, j < this.gridNumber; i++, j++) {
                if (chessData[i][j] !== chessColor) {
                    break;
                }
                count3++;
            }
            //右上左下判断
            for (var i = x, j = y; i >= 0, j < this.gridNumber; i--, j++) {
                if (chessData[i][j] !== chessColor) {
                    break;
                }
                count4++;
            }
            for (var i = x + 1, j = y - 1; i < this.gridNumber, j >= 0; i++, j--) {
                if (chessData[i][j] !== chessColor) {
                    break;
                }
                count4++;
            }
 
            if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
                if (chessColor == 1) {
                    alert("白棋赢了");
                }
                else {
                    alert("黑棋赢了");
                }
                this.isWell = true;//设置该局棋盘已经赢了，不可以再走了
            }
            if (chessColor === 1 && !this.isWell) {
                this.AImoveChess();
            }
        },
        
        /**
         * AI 下棋 
         */
        AImoveChess: function() {
            var maxX = 0;
            var maxY = 0;
            var maxWeight = 0;
            for (var i = this.gridNumber - 1; i >= 0; i--) {
                for (var j = this.gridNumber - 1; j >= 0; j--) {
                    if (chessData[i][j] !== NO_CHESS) {
                        continue;
                    }
                    //ai的关键
                    var tem = this.computeWeight(i, j);
                    if (tem > maxWeight) {
                        maxWeight = tem;
                        maxX = i;
                        maxY = j;
                    }
                }
            }
            this.drawChess(maxX, maxY, BLACK_CHESS);
        },
        /**
         * 计算下子至i,j的权重 , AI的关键
         * @param {number} i
         * @param {number} j
         */
        computeWeight: function(i, j) {
            var weight = 0;
            //基于棋盘位置权重 
            var pointInfo = {};
            //某点下子后连子信息 
            var chessColor = BLACK_CHESS;
            //x方向 
            pointInfo = this.putDirectX(i, j, chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, true); //AI下子权重 
            pointInfo = this.putDirectX(i, j, -chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, false); //player下子权重 
            //y方向 
            pointInfo = this.putDirectY(i, j, chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, true); //AI下子权重 
            pointInfo = this.putDirectY(i, j, -chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, false); //player下子权重 
            //左斜方向 
            pointInfo = this.putDirectXY(i, j, chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, true); //AI下子权重 
            pointInfo = this.putDirectXY(i, j, -chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, false); //player下子权重 
            //右斜方向 
            pointInfo = this.putDirectYX(i, j, chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, true); //AI下子权重 
            pointInfo = this.putDirectYX(i, j, -chessColor);
            weight += util.weightStatus(pointInfo.nums, pointInfo.prevSide, pointInfo.nextSide, false); //player下子权重 
            return weight;
        },
        /**
         * 设置X方向上棋子的信息  如多少连子 两边是否截断 
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @param {number} chessColor 棋子的代号
         * @return {Object} 棋子的信息
         */
        putDirectX: function(i, j, chessColor) {
            var nums = 1;
            var prevSide = false;
            var nextSide = false;
            for (var m = j - 1; m >= 0; m--) {
                if (chessData[i][m] === chessColor) {
                    nums++;
                }
                else {
                    if (chessData[i][m] === NO_CHESS) {
                        prevSide = true;
                    }
                    break;
                }
            }
            for (var m = j + 1; m < this.gridNumber; m++) {
                if (chessData[i][m] === chessColor) {
                    nums++;
                }
                else {
                    if (chessData[i][m] === NO_CHESS) {
                        nextSide = true;
                    }
                    break;
                }
            }
            return {
                "nums": nums,
                "prevSide": prevSide,
                "nextSide": nextSide
            };
        },
        /**
         * 设置Y方向上棋子的信息  如多少连子 两边是否截断 
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @param {number} chessColor 棋子的代号
         * @return {Object} 棋子的信息
         */
        putDirectY: function(i, j, chessColor) {
            var nums = 1;
            var prevSide = false;
            var nextSide = false;
            for (var m = i - 1; m >= 0; m--) {
                if (chessData[m][j] === chessColor) {
                    nums++;
                } 
                else {
                    if (chessData[m][j] === NO_CHESS) {
                        prevSide = true;
                    }
                    break;
                }
            }
            for (var m = i + 1; m < this.gridNumber; m++) {
                if (chessData[m][j] === chessColor) {
                    nums++;
                }
                else {
                    if (chessData[m][j] === NO_CHESS) {
                        nextSide = true;
                    }
                    break;
                }
            }
            return {
                "nums": nums,
                "prevSide": prevSide,
                "nextSide": nextSide
            };
        },
        /**
         * 设置XY方向上棋子的信息  如多少连子 两边是否截断 
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @param {number} chessColor 棋子的代号
         * @return {Object} 棋子的信息
         */
        putDirectXY: function(i, j, chessColor) {
            var nums = 1;
            var prevSide = false;
            var nextSide = false;
            for (var m = i - 1, n = j - 1; m >= 0 && n >= 0; m--, n--) {
                if (chessData[m][n] === chessColor) {
                    nums++;
                }
                else {
                    if (chessData[m][n] === NO_CHESS) {
                        prevSide = true;
                    }
                    break;
                }
            }
            for (var m = i + 1, n = j + 1; m < this.gridNumber && n < this.gridNumber; m++, n++) {
                if (chessData[m][n] === chessColor) {
                    nums++;
                }
                else {
                    if (chessData[m][n] === NO_CHESS) {
                        nextSide = true;
                    }
                    break;
                }
            }
            return {
                "nums": nums,
                "prevSide": prevSide,
                "nextSide": nextSide
            };
        },
        /**
         * 设置YX方向上棋子的信息  如多少连子 两边是否截断 
         * @param {number} x x坐标
         * @param {number} y y坐标
         * @param {number} chessColor 棋子的代号
         * @return {Object} 棋子的信息
         */
        putDirectYX: function(i, j, chessColor) {
            var nums = 1;
            var prevSide = false;
            nextSide = false;
            for (var m = i - 1, n = j + 1; m >= 0 && n < this.gridNumber; m--, n++) {
                if (chessData[m][n] === chessColor) {
                    nums++;
                } else {
                    if (chessData[m][n] === NO_CHESS) {
                        prevSide = true;
                    }
                    break;
                }
            }
            for (m = i + 1, n = j - 1; m < this.gridNumber && n >= 0; m++, n--) {
                if (chessData[m][n] === chessColor) {
                    nums++;
                } else {
                    if (chessData[m][n] === NO_CHESS) {
                        nextSide = true;
                    }
                    break;
                }
            }
            return {
                "nums": nums,
                "prevSide": prevSide,
                "nextSide": nextSide
            };
        }
    };
    return chessmans;
});