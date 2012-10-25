package 
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.events.Event;
	import com.greensock.*;
	import com.greensock.easing.*;
	import flash.display.SimpleButton;
	import ContentLoader;
	import com.adobe.serialization.json.JSON;

	public class content
	{
		private var dataAll:Array;
		private var screen:MovieClip;
		private var CLICKED:MovieClip = null;

		public function content(teacher)
		{
			this.dataAll = JSON.decode(ContentLoader.ins.getJson("data"));
			
			init(teacher.screen0,380,300);
			init(teacher.screen1,380,300);
			init(teacher.screen2,380,300);
			init(teacher.screen3,380,300);
			init(teacher.screen4,380,300);
			init(teacher.screen5,380,300);
			init(teacher.screen6,380,300);
		}

		public function init(screen:MovieClip, targetX, targetY)
		{
			this.screen = screen;
			
			this.initStatus(screen);
			
			this.parse(screen, this.dataAll);
	
			this.bindEvent( targetX, targetY);
		}
		
		private function initStatus(node){
		    hideChild(node);
			hideChildTxt(node);
			node.home.txt.alpha = 0;
			node.home.btn.buttonMode = true;
		}
		
		

		
		//给ui填充数据
        private function parse(node,data)
		{
			
			var  num = Number(/\d/.exec(node.name));
			var  dataArr = data[num];
			
			this.parseTxt(node, dataArr);
			this.parseImg(node, dataArr);

		}
		
		private function parseTxt(node, dataArr){
			var len = node.numChildren;
			node.home.txt.text = dataArr[len-1].txt;
			
			for(var i=0; i<len-1;i++){
				var nodeChild = node.getChildAt(i);
				var  num = Number(/\d/.exec(nodeChild.name));
				nodeChild.txt.text = dataArr[num-1].txt;
			}
			
		}
	    
		private function parseImg(node, dataArr){
			var len = node.numChildren;
			//node.home.txt.text = dataArr[len-1].img;
			loaderImg(dataArr[len-1].img, node.home.btn, 48, 48);
			
			for(var i=0; i<len-1;i++){
				var nodeChild = node.getChildAt(i);
				var  num = Number(/\d/.exec(nodeChild.name));
				loaderImg(dataArr[num-1].img, nodeChild.btn, 32, 32);
				
				nodeChild.btn.buttonMode = true;
			}
			
		}
		
	    public function loaderImg(imgClass, node, w, h)
		{
			var img = ContentLoader.ins.getBitmap(imgClass);
			img.width = w;
			img.height = h;
			node.addChild(img);
		}
		
		private function hideChild(parentNode)
		{
			var num:int = parentNode.numChildren;
			for (var i:int = 0; i < num-1; i++)
			{
				parentNode.getChildAt(i).alpha = 0;
			}
		}
		//隐藏二层文本控件
		private function hideChildTxt(node)
		{
			var num = node.numChildren;
			var icon;
			for (var i=0; i<num-1; i++)
			{
				icon = node.getChildAt(i);
				icon.txt.visible = false;
			}
		}


		private function bindEvent(targetX,targetY)
		{
			var mc = this.screen;
			//screen到达目的地的坐标
			mc.targetX = targetX;
			mc.targetY = targetY;
			//screen的初始坐标
			mc.initX = mc.x;
			mc.initY = mc.y;
			//绑定第一层按钮的事件
			mc.home.btn.addEventListener(MouseEvent.CLICK,function(e:MouseEvent){
			//先收起展示的mc,再展开点击的mc
			    if(CLICKED && CLICKED != mc){
			         //trace(CLICKED.name);
			         moveBack(CLICKED, CLICKED.initX, CLICKED.initY, function(){
			             CLICKED = mc;
			             moveGo( mc.targetX, mc.targetY, mc);
			         });
			        return;
			    };
			
			  //trace(mc.y);
			  //通过判断screen的y坐标的变化来判断它是否被点击，因为动画回去的y坐标小数点后有出入，所有改判断为差值
			   if(mc.y - mc.initY > 1){
			         CLICKED = null;
			         moveBack( mc, mc.initX, mc.initY, null);
			   }else{
			         CLICKED = mc;
			         moveGo( mc.targetX, mc.targetY, mc);
			   }
			 });

			//绑定第二层按钮的事件;
			var num = mc.numChildren;
			for (var i=0; i<num-1; i++)
			{
			   (function(){
				   var icon = mc.getChildAt(i);
				   icon.btn.addEventListener(MouseEvent.CLICK,function(e:MouseEvent){
						
						if(icon.txt.visible){
							icon.txt.visible = false;
						}else{
							icon.txt.visible = true;
						}
				   })
			   })(i);
				
			}

		}
		

		public function moveGo(targetX, targetY, node)
		{
			TweenLite.to(node,1,{x:targetX, y:targetY, ease:Cubic.easeOut, onComplete:showChildEase, onCompleteParams:[node]});
		}


		public function moveBack(node, initX, initY, callback)
		{
			TweenLite.to(node,0.5,{onStart:hideChildEase,onStartParams:[node, initX, initY], onComplete:callback});
			hideChildTxt(node);
		}

		//缓动展开mc的子元件
		public function showChildEase(node)
		{
			node.home.txt.alpha = 1;

			var num:int = node.numChildren;
			var nodeChild;
			var pos:Array = this.getPosArr(num-1);
			//trace(mc.getChildAt(0).x);
			for (var i:int = 0; i < num-1; i++)
			{
				var addX = pos[i][0],addY = pos[i][1];
				nodeChild = node.getChildAt(i);
				//存储icon_btn的初始位置
				if (! nodeChild.bx)
				{
					nodeChild.bx = nodeChild.x;
					nodeChild.by = nodeChild.y;
				}
				//trace(nodeChild.name);
				//trace(addX);
				TweenLite.to(nodeChild,1,{x:nodeChild.bx + addX ,y:nodeChild.by + addY, alpha:1, ease:Cubic.easeOut});
			}
		}

		//缓动收起mc的子元件
		public function hideChildEase(node, initX, initY)
		{
			var num:int = node.numChildren;
			var nodeChild;
			var pos:Array = this.getPosArr(num-1);
			for (var i:int = 0; i < num-1; i++)
			{
				var addX = pos[i][0],addY = pos[i][1];
				nodeChild = node.getChildAt(i);
				TweenLite.to(nodeChild,0.5,{x:nodeChild.x-addX, y:nodeChild.y-addY, alpha:0, ease:Cubic.easeOut, onComplete:back, onCompleteParams:[node, nodeChild, initX, initY]});
			}
		}
		
		public function back(node, nodeChild, initX, initY)
		{
			node.home.txt.alpha = 0;
			nodeChild.x = nodeChild.bx;
			nodeChild.y = nodeChild.by;
			TweenLite.to(node,0.5,{x:initX, y:initY, ease:Cubic.easeOut});

		}
		
		
		private function getPosArr(num){
			var posArr = [];
			switch (num){
				case 2:
					posArr = [[0,-120],[120,0]];
					break;
				case 3:
					posArr = [[-110,-100],[110,-100],[0,100]];
					break;
				case 4:
					posArr = [[0,-120],[120,0],[0,120],[-120,0]];
					break;
				case 5:
					posArr = [[-90,-100],[20,-110],[120,20],[-10,100],[-120,20]];
					break;
				default:
				    posArr = [[-200,-90],[0,-200],[200,0],[0,200],[-200,0]];
					break;
			}
			return posArr;
		}
	}

}