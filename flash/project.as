package 
{

	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import Content;
	import Practice;


	public class project extends MovieClip
	{


		public function project()
		{
			// constructor code
			new Content(teacher);
			new Practice(practice);

			this.initShow();

			this.bindEvent();

		}

		private function initShow()
		{
			practice.visible = false;
			enter_btn.label = "课后习题";
		}

		private function bindEvent()
		{
			enter_btn.addEventListener(MouseEvent.CLICK, function(e){
			   		if(practice.visible){
					   practice.visible = false;
					   teacher.visible = true;
					   enter_btn.label = "课后习题";
					}else{
					   practice.visible = true;
					   teacher.visible = false;
					   enter_btn.label = "教学内容";
					}
			   });
		}
	}

}