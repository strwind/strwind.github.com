/**
 * 棋盘类 
 */
define(function (require) {
    
    function Chessboard (option) {
        this.context = option.context;
        this.gridWidth = option.gridWidth;
        this.gridNumber = option.gridNumber;
        this.width = this.gridWidth * this.gridNumber;
    }
    
    Chessboard.prototype = {
        /**
         * 绘制棋盘
         * @public 
         */
        draw: function () {
            var context = this.context;
            for (var i = 0; i <= this.width; i += this.gridWidth) {
                //绘制棋盘的线  横向
                context.beginPath();
                context.moveTo(0, i);
                context.lineTo(this.width, i);
                context.closePath();
                context.stroke();
                //绘制棋盘的线 纵向
                context.beginPath();
                context.moveTo(i, 0);
                context.lineTo(i, this.width);
                context.closePath();
                context.stroke();
            }
        }
    };
    
    return Chessboard;
});