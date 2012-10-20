package 
{

	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.display.Loader;
	import com.adobe.serialization.json.JSON;


	public class Practice
	{
		private var showedArr:Array = [];
		private var board;
		private var main;

		public function Practice(rootMc)
		{
			// constructor code
			this.board = rootMc;
			this.main = this.board.question;

			this.getData("data/data.json", init);
		}

		//通过url得到的数据传入回调函数callback中
		private function getData(url, callback)
		{
			var urlLoader:URLLoader = new URLLoader();
			urlLoader.load(new URLRequest(url));
			urlLoader.addEventListener(Event.COMPLETE, parseData);

			function parseData(event:Event):void
			{
				var data = JSON.decode(URLLoader(event.target).data);
				callback(data);
			}

		}

		private function init(dataArr)
		{
			this.initBlackboard(dataArr);
			this.initQuestion(dataArr);
		}

		private function initBlackboard(dataArr)
		{
			this.board.nextBtn.label = "下一题";
			this.board.tip.visible = false;

			this.bindNextBtnEvent(dataArr);
		}

		private function initQuestion(dataArr)
		{
			this.initOption();

			this.bindOptionEvent();

			this.nextQuestion(dataArr);

		}
		private function initOption()
		{
			var main = this.main;
			main.optionA.value = "A";
			main.optionB.value = "B";
			main.optionC.value = "C";
			main.optionD.value = "D";

			//optionX是为了清除每次切换题目时的被选中状态的
			main.optionX.selected = true;
			main.optionX.visible = false;

			main.wrong.visible = false;
			main.right.visible = false;
		}

		private function setOption(optionList)
		{
			var main = this.main;
			main.optionA.label = optionList["optionA"];
			main.optionB.label = optionList["optionB"];
			main.optionC.label = optionList["optionC"];
			main.optionD.label = optionList["optionD"];
		}

		private function bindOptionEvent()
		{
			var main = this.main;
			main.addEventListener(MouseEvent.CLICK, function(e){
			    if(e.target.value == main.rightOption){
			      main.right.visible = true;
			      main.wrong.visible = false;
			    } else {
			      main.right.visible = false;
			      main.wrong.visible = true;
			    }
			   });
		}

		private function getIcon(url)
		{
			var main = this.main;
			var imageLoader:Loader = new Loader();
			var imageRequest = new URLRequest(url);
			imageLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			imageLoader.load(imageRequest);
			function onComplete(evt:Event)
			{
				imageLoader.content.width = 60;
				imageLoader.content.height = 50;
				main.iconBox.addChild(imageLoader.content);
			}
		}

		public function nextQuestion(dataArr)
		{
			var len = dataArr.length;
			var num = this.getRandom(len);
			var showedArr = this.showedArr;
			while (this.isRepeat(num, showedArr))
			{
				if (showedArr.length == len)
				{
					trace("已经全部做完了");
					this.questionOver();
					showedArr.length = 0;
					break;
				}
				num = this.getRandom(len);
			}
			showedArr.push(num);
			trace(showedArr.join(","));
			this.main.rightOption = dataArr[num]["rightOption"];

			this.setOption(dataArr[num]["optionList"]);

			this.getIcon(dataArr[num]["icon"]);
		}

		//检查数组是否有重复项
		private function isRepeat(val, arr)
		{
			for (var i=0; i<arr.length; i++)
			{
				if (val == arr[i])
				{
					return true;
				}
			}
			return false;
		}
		
		//全部题目做完后的动作
		private function questionOver()
		{
            this.board.tip.visible = true;
			this.board.nextBtn.enabled = false;
		}

		private function bindNextBtnEvent(dataArr)
		{
			var len = dataArr.length;
			var that = this;
			this.board.nextBtn.addEventListener(MouseEvent.CLICK, function(e){
			that.nextQuestion(dataArr);
			that.initOption();
			});
		}

		private function getRandom(len)
		{
			var num = Math.floor(Math.random() * len);
			return num;
		}
	}
}