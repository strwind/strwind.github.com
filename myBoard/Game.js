var game = {
    init: function(time){
        var that = this;
        that.canvas1 = document.getElementById("canvas1"),
        that.canvas2 = document.getElementById("canvas2"),
        that.context1 = that.canvas1.getContext("2d"),
        that.context2 = that.canvas2.getContext("2d");
        //初始化小球
        that.ball = new Ball(that.canvas2, 6);
        //初始化挡板
        that.board = new Board(that.canvas2, 80, 6);
        //初始化方块
        that.drawMasonry();
        
        //持续执行move
        that.timer = setInterval(function(){that.move()}, time);
    },
    
    drawMasonry :function(){
        var that = this;
        that.masonryArr = [];
        for(var i=0, f=0; i<10; i++){
            for(var j=0; j<4; j++, f++){
               var color = "#"+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
               that.masonryArr[f] = new Masonry(color, i*61, 50+j*40, 40, 30);
               that.masonryArr[f].draw(this.context1); 
            }
        }
    },
    
    //一直在执行的函数
    move: function(){
        this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
        this.ball.draw(this.context2);
        this.ball.update(this.timer);
        this.board.draw(this.context2);
        this.board.update(eventManager);
        
        this.boardCollide();
        this.masonryCollide(); 
        this.win();
    },
    
     //判断滑板与小球是否撞击
    boardCollide: function(){
        if(this.ball.checkCollide(this.board)){
            var speedX = this.board.x + this.board.w/2 - this.ball.x ;
            this.ball.speedX = Math.floor(speedX/5);
            this.ball.speedX *= -1;
            this.ball.speedY *= -1;
        }
    },
   
   //循环判断小球是否与其中某个色块撞击
    masonryCollide: function(){
        for(var i=0; i<this.masonryArr.length; i++){
            if(this.masonryArr[i].checkCollide(this.ball)){
                this.context1.clearRect(this.masonryArr[i].x, this.masonryArr[i].y, 40, 30);
                speedX = this.masonryArr[i].x - (this.ball.x + this.ball.r); 
                this.ball.speedX = Math.floor(speedX/10);
                this.ball.speedX *= -1;
                this.ball.speedY *= -1;
                if(this.ball.speedX > 4){
                    this.ball.speedX = 4;
                }
                this.masonryArr.splice(i,1);
                
                console.log(this.ball.speedX);
            }
        }
    },
    
    //当色块为0时，提示胜利
    win: function(){
        if(this.masonryArr.length == 0){
            clearInterval(this.timer);
            alert("YOU WIN!");
            document.location.reload();
        }
    }
};











