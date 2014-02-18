function Ball(canvas, r){
    this.init(canvas, r);
}
Ball.prototype = {
    init: function(canvas, r){
        this.canvas = canvas;
        this.r = r;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height - this.r*2 - 6;
        this.speedX = 0;
        this.speedY = -3;
    },
    
    draw: function(context){
        context.fillStyle = "#f00";
        context.beginPath();
        context.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        context.fill();
    },
    
    update: function(timer){
        var maxX = this.canvas.width - this.r,
            maxY = this.canvas.height - this.r,
            minX =  this.r,
            minY = this.r;
        if(this.x >= maxX || this.x <= minX){
            this.speedX *= -1;
        }else if(this.y <= minY ){
            this.speedY *= -1;
        }else if(this.y >= maxY){
            clearInterval(timer);
            alert("YOU LOST!");
            document.location.reload();
        }
        
        
        this.x += this.speedX;
        this.y += this.speedY;
    },
    
    //获取坐标
    getCoord: function(){
        return {
            x1 : this.x - this.r,
            x2 : this.x + this.r,
            y1 : this.y - this.r,
            y2 : this.y + this.r
        }
       
    },
    
    //检查是否碰撞
    checkCollide: function(move){
        var stand = this.getCoord();
        var move = move.getCoord();
        return !(stand.x1 > move.x2 || stand.x2 < move.x1 || stand.y1 > move.y2 || stand.y2 < move.y1 );
    }
};






