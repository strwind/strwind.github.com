package 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.display.Loader;
	import com.adobe.serialization.json.JSON;


	public class practice 
	{
		private var showedArr:Array = [];
		private var board;
		private var main;

		public function practice(blackboard)
		{
			// constructor code
			this.board = blackboard;
			this.main = this.board.question;

			this.getData("data/practice.json", init);
		}

		//通过url得到的数据传入回调函数callback中
		private function getData(url, callback)
		{
			var urlLoader:URLLoader = new URLLoader();
			urlLoader.load(new URLRequest(url));
			urlLoader.addEventListener(Event.COMPLETE, parseData);

			function parseData(event:Event):void
			{   
				//适配前的数据，数据格式可参看data/practice.json
				var data = JSON.decode(URLLoader(event.target).data);
				//适配数据,适配后的数据格式可参看data/practice-adapder.json
				//先把原始数据存储在全局属性dataAll中，供循环时使用
				data = adapter(data);
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
			this.board.nextBtn.label = "重新生成";
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
				imageLoader.content.width = 40;
				imageLoader.content.height = 40;
				main.iconBox.addChild(imageLoader.content);
			}
		}

		public function nextQuestion(dataArr)
		{
			var len = dataArr.length;
			var num = this.getRandom(len);
			while (this.isRepeat(num, showedArr))
			{
				if (showedArr.length == len)
				{
					trace("已经全部做完了");
					
					//this.questionOver();
					 var showLen = showedArr.length;
				     showedArr.splice(0, showLen);
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



		//适配器代码部分
		function adapter(data)
		{
			//把data变成一维数组
			var dataArr = getDataArr(data),
			        len = dataArr.length;
			var question;
			var questionArr = [],
			        choiceArr = [];
			while (questionArr.length != len)
			{
				question = getQustion(dataArr.slice(0));
				if (isRepeat(question.icon,choiceArr))
				{
					question = getQustion(dataArr.slice(0));
				}
				else
				{
					choiceArr.push(question.icon);
					questionArr.push(question);
				}
			}
			return questionArr;
		}
		function getDataArr(data)
		{
			var all = [];
			// 把所有图标和说明变成一维数组
			for (var i = 0; i < data.length; i++)
			{
				var item = data[i];
				all.push({ icon: item.icon, name: item.name });
				for (var j = 0; j < item.children.length; j++)
				{
					var child = item.children[j];
					all.push({ icon: child.icon, name: child.name });
				}
			}
			return all;
		}

		function getQustion(dataArr)
		{
			// 抽取其中一个作为题目
			var actualIndex = Math.floor(Math.random() * dataArr.length);
			var actual = dataArr.splice(actualIndex,1)[0];
			// 另外随机抽取3个作为错误的选项
			var choices = [actual.name];
			var rightChoice = choices[0];
			for (var i = 0; i < 3; i++)
			{
				var index = Math.floor(Math.random() * dataArr.length);
				var choice = dataArr.splice(index,1)[0];
				choices.push(choice.name);
			}
			// 打乱选项
			choices.sort(function() { return Math.random() - 0.5; });

			var rightOption = ["A","B","C","D"][getIndex(rightChoice,choices)];
			var img = actual.icon;
			return {
			        "icon" : img,
			        "rightOption" : rightOption,
			        "optionList": {
			            "optionA" : choices[0],
			            "optionB" : choices[1],
			            "optionC" : choices[2],
			            "optionD" : choices[3]
			        }
			    };

		}

		function getIndex(val, arr)
		{
			for (var i=0; i<arr.length; i++)
			{
				if (val == arr[i])
				{
					return i;
				}
			}
			return -1;
		}
      //isRepeat方法在其他地方定义有， 所以这里省去
	}
}