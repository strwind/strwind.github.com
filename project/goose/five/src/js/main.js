/**
 * 入口 
 */
define(function (require) {
    
    var Chessboard = require('./Chessboard');
    var chessmans = require('./chessmans');
    const GRID_NUMBER = 11;
    const GRID_WIDTH = 40;
    const BOARD_WIDTH = GRID_NUMBER * GRID_WIDTH;
    
    var main = {
        
        init: function () {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            
            //初始化棋盘
            var chessboard = new Chessboard({
                'context': context,
                'gridWidth': GRID_WIDTH,
                'gridNumber': GRID_NUMBER
            });
            chessboard.draw();
            
            //初始化棋子
            chessmans.init({
                'canvas': canvas,
                'context': context,
                'gridWidth': GRID_WIDTH,
                'gridNumber': GRID_NUMBER
            });
        }
    };
    
    return main;

});