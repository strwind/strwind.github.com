package 
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import PracticeLoader;
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
			
		    var dataAll = JSON.decode(PracticeLoader.ins.getJson("data"));
			var dataArr = this.adapter(dataAll);
			this.init(dataArr);
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

		private function getIcon(imgClass)
		{
			var main = this.main;
			var img = PracticeLoader.ins.getBitmap(imgClass);
			img.width = 40;
			img.height = 40;
			if(main.iconBox.numChildren > 0){
				main.iconBox.removeChild(main.iconBox.getChildAt(0));
			}
			main.iconBox.addChild(img);
			
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
			choices = sort(choices.slice(0));
			
//			trace(rightChoice);
//			trace(choices.join("||"))

			var rightOption = ["A","B","C","D"][getIndex(rightChoice,choices)];
			//trace(rightOption);
			//trace(getIndex(rightChoice,choices));
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
		function sort(arr){
			var len = arr.length;
			var ran = Math.floor(Math.random()*len);
			arr.push(arr.splice(ran, 1));
			var ran2 = Math.floor(Math.random()*len);
			arr.push(arr.splice(ran2, 1));
			var ran3 = Math.floor(Math.random()*len);
			arr.push(arr.splice(ran3, 1))
			//trace(ran);
			return arr;
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