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
		
		public function ASJS() 
		{
			initShow();
			getParam();
			provide();
			bindEvent();
		}
		
		public function initShow() {
			stage.scaleMode = "noScale";
			aj.label = "AS→JS";
			ja.label = "JS→AS";
			output.text = "此处显示";
		}
		
		public function getParam() {
			//获取参数
			_flashId = this.loaderInfo.parameters["id"]  || "lab";
			_jsName = this.loaderInfo.parameters["js"] || "flash.";
		}
		
		private function bindEvent() {
			aj.addEventListener(MouseEvent.CLICK, ajHandler);
			//ja.addEventListener(MouseEvent.CLICK, jaHandler);
		}
		
		public  function provide() {
			ExternalInterface.addCallback("jaClick", jaHandler);
		}
			
		public function ajHandler(e:MouseEvent) {
			ExternalInterface.call("ajClick", _flashId);
			
			//output.text = "AS 调用了 JS ";
			
		}
		public function jaHandler(e:MouseEvent) {
			
			output.text = "JS 调用了 AS ";
		} 
		
	}

}