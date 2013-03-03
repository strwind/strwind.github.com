package  {
	import flash.display.StageScaleMode
	import flash.display.StageDisplayState;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import content;
	import practice;
	
	
	public class project extends MovieClip {
		
		
		public function project() {
			//禁止缩放
			stage.scaleMode= StageScaleMode.NO_SCALE;

			// constructor code
			new practice(blackboard);
			new content(teacher);
			
			initShow();
			bindEvent();
		}
		
		
		private function initShow()
		{
			blackboard.visible = false;
			enter_btn.visible = false;
			enter_btn.label = "教学内容";
			
			//change_btn.buttonMode = true;
		}

		private function bindEvent()
		{
			enter_btn.addEventListener(MouseEvent.CLICK, function(e){
				   blackboard.visible = false;
				   teacher.visible = true;
				   enter_btn.visible = false;
				   change_btn.visible = true;
			   });
			   
			change_btn.addEventListener(MouseEvent.CLICK, function(e){
			   	   blackboard.visible = true;
				   teacher.visible = false;
				   enter_btn.visible = true;
				   change_btn.visible = false;
			   });
		}
	}
	
}
