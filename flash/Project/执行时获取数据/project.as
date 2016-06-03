package  {
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import content;
	import practice;
	
	
	public class project extends MovieClip {
		
		
		public function project() {
			// constructor code
			new practice(blackboard);
			new content(teacher);
			
			initShow();
			bindEvent();
		}
		
		
		private function initShow()
		{
			blackboard.visible = false;
			enter_btn.label = "课后习题";
		}

		private function bindEvent()
		{
			enter_btn.addEventListener(MouseEvent.CLICK, function(e){
			   		if(blackboard.visible){
					   blackboard.visible = false;
					   teacher.visible = true;
					   enter_btn.label = "课后习题";
					}else{
					   blackboard.visible = true;
					   teacher.visible = false;
					   enter_btn.label = "教学内容";
					}
			   });
		}
	}
	
}
