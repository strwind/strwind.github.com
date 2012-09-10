
function Masonry(color, x, y, w, h){
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Masonry.prototype = {
    //画色块
    draw: function(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    },
    //获取坐标
    getCoord: function(){
        return {
            x1 : this.x,
            x2 : this.x + this.w,
            y1 : this.y,
            y2 : this.y + this.h
        }
       
    },
    
    //检查是否碰撞
    checkCollide: function(move){
        var stand = this.getCoord();
        var move = move.getCoord();
        return !(stand.x1 > move.x2 || stand.x2 < move.x1 || stand.y1 > move.y2 || stand.y2 < move.y1 );
    }
    
};