package 
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import com.greensock.*;
	import com.greensock.easing.*;
	import flash.display.SimpleButton;

	public class Content
	{

		public function Content(rootMc)
		{        
			init(rootMc.screen1,150,200);
			init(rootMc.screen2,150,200);
			init(rootMc.screen3,150,200);
		}
		
		private var CLICKED:MovieClip = null;
        
	    private function hideChild(mc)
		{
			var num:int = mc.numChildren;
			for (var i:int = 0; i < num-1; i++)
			{
				mc.getChildAt(i).alpha = 0;
			}
		}
		//隐藏二层文本控件
		private function hideChildTxt(mc){
			var num = mc.numChildren;
			//num =1;
			//trace(mc.getChildAt(4));
			for(var i=0; i<num-1; i++){
				hideChild(mc.getChildAt(i));
			}
		}
		
		public function init(mc:MovieClip,x:int,y:int)
		{
			mc.bx = mc.x;
			mc.by = mc.y;
			//最初显示的主mc
			mc.home = mc.getChildAt(mc.numChildren-1);

			hideChild(mc);
			hideChildTxt(mc);
			mc.home.getChildAt(0).alpha = 0;
			
           
            //绑定第一层按钮的事件
			mc.home.getChildAt(1).addEventListener(MouseEvent.CLICK,function(e:MouseEvent){
				//先收起展示的mc,再展开点击的mc
			    if(CLICKED && CLICKED != mc){
			         //trace(CLICKED.name);
			         moveBack( x, y, CLICKED, CLICKED.bx, CLICKED.by, function(){
						 CLICKED = mc;
						 moveGo( x, y,mc);
					 });
					 return;
			    };
			
			 //trace(mc.x);
			   if(mc.x != mc.bx){
			         CLICKED = null;
			         moveBack( x, y, mc, mc.bx, mc.by, null);
			   }else{
			         CLICKED = mc;
			         moveGo( x, y,mc);
			   }
		  });
		  
		  //绑定第二层按钮的事件
		  var num = mc.numChildren;
		  for(var i=0; i<num-1; i++){
			   
			   (function(){
				var iconi_i = mc.getChildAt(i);
					 iconi_i.getChildAt(1).addEventListener(MouseEvent.CLICK,function(e:MouseEvent){
							iconi_i.getChildAt(0).alpha = 1;
					 })
				})(i);

			  }
		  
		}

		public function back(mc,btn,x,y)
		{
		    mc.home.getChildAt(0).alpha = 0;
			
			btn.x = btn.bx;
			btn.y = btn.by;
			TweenLite.to(mc,0.5,{x:x,y:y,scaleX:1,scaleY:1,alpha:1,ease:Cubic.easeOut});
		}



		public function moveGo(x,y,mc)
		{
			TweenLite.to(mc,1,{x:x,y:y,scaleX:2,scaleY:2,alpha:1,ease:Cubic.easeOut,onComplete:showChildEase,onCompleteParams:[mc]});
		}
        
		
		public function moveBack(x,y,mc,bx,by, callback)
		{
			TweenLite.to(mc,0.5,{x:x,y:y,scaleX:2,scaleY:2,alpha:1,ease:Cubic.easeOut,onStart:hideChildEase,onStartParams:[mc,bx,by], onComplete:callback});
			hideChildTxt(mc);
		}

        //缓动展开mc的子元件
		public function showChildEase(mc:MovieClip)
		{
		    mc.home.getChildAt(0).alpha = 1;
			
			var num:int = mc.numChildren;
			var btn;
			var pos:Array = [[-40,-30],[0,-40],[40,0],[0,40],[-40,0]];
			//trace(mc.getChildAt(0).x);
			for (var i:int = 0; i < num-1; i++)
			{
				var addX = pos[i][0],addY = pos[i][1];
				btn = mc.getChildAt(i);
			    //存储icon1_1_btn的初始位置
				if(!btn.bx){
					btn.bx = btn.x;
					btn.by = btn.y;
				}
				TweenLite.to(btn,1,{x:btn.bx + addX,y:btn.by + addY,scaleX:1,scaleY:1,alpha:1,ease:Cubic.easeOut});
			}
		}
       
	   //缓动收起mc的子元件
		public function hideChildEase(mc:MovieClip,bx,by)
		{
			var num:int = mc.numChildren;
			var btn;
			var pos:Array =[[-40,-30],[0,-40],[40,0],[0,40],[-40,0]];
			for (var i:int = 0; i < num-1; i++)
			{
				var addX = pos[i][0],addY = pos[i][1];
				btn = mc.getChildAt(i);
				TweenLite.to(btn,0.5,{x:btn.x - addX,y:btn.y - addY,scaleX:1,scaleY:1,alpha:0,ease:Cubic.easeOut,onComplete:back,onCompleteParams:[mc,btn,bx,by]});
			}
		}
	}

}