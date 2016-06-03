package 
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.events.Event;
	import com.greensock.*;
	import com.greensock.easing.*;
	import flash.display.SimpleButton;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.display.Loader;
	import com.adobe.serialization.json.JSON;

	public class content
	{
		private var screen:MovieClip;
		private var CLICKED:MovieClip = null;

		public function content(teacher)
		{
			init(teacher.screen0,380,300);
			init(teacher.screen1,380,300);
			init(teacher.screen2,380,300);
			init(teacher.screen3,380,300);
			init(teacher.screen4,380,300);
			init(teacher.screen5,380,300);
			init(teacher.screen6,380,300);
		}

		public function init(screen:MovieClip,x:int,y:int)
		{
			this.screen = screen;
			
			this.initStatus(screen);
			
			this.getData("data/content.json", this.parse, screen);

			this.bindEvent( x, y);
		}
		
		private function initStatus(node){
		    hideChild(node);
			hideChildTxt(node);
			node.home.txt.alpha = 0;
			node.home.btn.buttonMode = true;
		}
		
		private function bindEvent(x, y)
		{
			var mc = this.screen;
			mc.bx = mc.x;
			mc.by = mc.y;
			//绑定第一层按钮的事件
			mc.home.btn.addEventListener(MouseEvent.CLICK,function(e:MouseEvent){
			//先收起展示的mc,再展开点击的mc
			    if(CLICKED && CLICKED != mc){
			         //trace(CLICKED.name);
			         moveBack( x, y, CLICKED, CLICKED.bx, CLICKED.by, function(){
			             CLICKED = mc;
			             moveGo( x, y,mc);
			         });
			        return;
			    };
			
			  //trace(mc.y);
			  //通过判断screen的y坐标的变化来判断它是否被点击，因为动画回去的y坐标小数点后有出入，所有改判断为差值
			   if(mc.y - mc.by > 1){
			         CLICKED = null;
			         moveBack( x, y, mc, mc.bx, mc.by, null);
			   }else{
			         CLICKED = mc;
			         moveGo( x, y,mc);
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

		//通过url得到的数据传入回调函数callback中
		private function getData(url, callback, node)
		{
			var urlLoader:URLLoader = new URLLoader();
			urlLoader.load(new URLRequest(url));
			urlLoader.addEventListener(Event.COMPLETE, parseData);

			function parseData(event:Event):void
			{
				var data = JSON.decode(URLLoader(event.target).data);
				callback(node, data);
			}

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
		
	    public function loaderImg(url, node, w, h)
		{
			var imageLoader:Loader = new Loader();
			var theURL:String = url;
			var imageRequest = new URLRequest(theURL);
			imageLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			imageLoader.load(imageRequest);
			function onComplete(evt:Event)
			{
				imageLoader.content.width = w;
				imageLoader.content.height = h;
				node.addChild(imageLoader.content);
			}
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

		public function back(node,nodeChild,x,y)
		{
			node.home.txt.alpha = 0;
			nodeChild.x = nodeChild.bx;
			nodeChild.y = nodeChild.by;
			TweenLite.to(node,0.5,{x:x,y:y,alpha:1,ease:Cubic.easeOut});
		}

		public function moveGo(x,y,node)
		{
			TweenLite.to(node,1,{x:x,y:y,alpha:1,ease:Cubic.easeOut,onComplete:showChildEase,onCompleteParams:[node]});
		}


		public function moveBack(x,y,node,bx,by, callback)
		{
			TweenLite.to(node,0.5,{x:x,y:y,alpha:1,ease:Cubic.easeOut,onStart:hideChildEase,onStartParams:[node,bx,by], onComplete:callback});
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
				TweenLite.to(nodeChild,1,{x:nodeChild.bx + addX,y:nodeChild.by + addY,alpha:1,ease:Cubic.easeOut});
			}
		}

		//缓动收起mc的子元件
		public function hideChildEase(node,bx,by)
		{
			var num:int = node.numChildren;
			var nodeChild;
			var pos:Array = this.getPosArr(num-1);
			for (var i:int = 0; i < num-1; i++)
			{
				var addX = pos[i][0],addY = pos[i][1];
				nodeChild = node.getChildAt(i);
				TweenLite.to(nodeChild,0.5,{x:nodeChild.x - addX,y:nodeChild.y - addY,alpha:0,ease:Cubic.easeOut,onComplete:back,onCompleteParams:[node,nodeChild,bx,by]});
			}
		}
		private function getPosArr(num){
			var posArr = [];
			switch (num){
				case 2:
					posArr = [[0,-120],[120,0]];
					break;
				case 3:
					posArr = [[-40,-80],[40,-80],[0,80]];
					break;
				case 4:
					posArr = [[0,-120],[120,0],[0,120],[-120,0]];
					break;
				case 5:
					posArr = [[-100,-90],[20,-120],[120,0],[-10,100],[-100,20]];
					break;
				default:
				    posArr = [[-200,-90],[0,-200],[200,0],[0,200],[-200,0]];
					break;
			}
			return posArr;
		}
	}

}