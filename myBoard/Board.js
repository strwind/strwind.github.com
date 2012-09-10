function Board(canvas, w, h){
    this.init(canvas, w, h);
}
Board.prototype = {
    init: function(canvas, w, h){
        this.canvas = canvas;
        this.x = this.canvas.width/2 - w/2;
        this.y = this.canvas.height - h;
        this.w = w;
        this.h = h;
        this.speedX = 5;
    },
    
    draw: function(context){
        context.fillStyle = "#000";
        context.fillRect(this.x, this.y, this.w, this.h);
    },
    
    update: function(eventManager){
        if(eventManager[key.RIGHT]){
            this.x += this.speedX;
        }else if(eventManager[key.LEFT]){
            this.x -= this.speedX;
        }
    },
    //获取坐标
    getCoord: function(){
        return {
            x1 : this.x,
            x2 : this.x + this.w,
            y1 : this.y,
            y2 : this.y + this.h
        }
       
    }
};
