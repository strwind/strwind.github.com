package  
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	/**
	 * ...
	 * @author 
	 */
	public class ASJS extends MovieClip
	{
		private var _flashId:String;			//Flash的ID
		private var _jsName:String;				//JS的命名空间
		private var count:Number = 0;
		public function ASJS() 
		{
			initShow();
			getParam();
			provide();
			bindEvent();
		}
		
		public function initShow() {
			stage.scaleMode = "noScale";
			aj.label = "AS调用JS";
			output.text = "此处显示";
		}
		
		public function getParam() {
			//获取参数
			_flashId = this.loaderInfo.parameters["id"]  || "lab";
			_jsName = this.loaderInfo.parameters["js"] || "flash.";
		}
		
		private function bindEvent() {
			aj.addEventListener(MouseEvent.CLICK, ajHandler);
		}
		
		public  function provide() {
			ExternalInterface.available && ExternalInterface.addCallback("jaClick", jaHandler);
		}
			
		public function ajHandler(e:MouseEvent) {
			var fnName:String = _jsName + "ajClick";
			trace(fnName);
			ExternalInterface.available && ExternalInterface.call(fnName, _flashId);
		}
		public function jaHandler() {
			output.text = "JS 调用了 AS " + ++count + "次";
		} 
		
	}

}