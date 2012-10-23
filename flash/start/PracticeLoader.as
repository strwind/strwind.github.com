package
{
	import flash.display.Bitmap;
	public class PracticeLoader
	
	{
		[Embed(source = "data/practice.json", mimeType = "application/octet-stream")]
		private var data:Class;
		
		//group0
		[Embed(source="image/0-0.png")]
		private var zeroZero:Class;
		[Embed(source="image/0-1.png")]
		private var zeroOne:Class;
		[Embed(source="image/0-2.png")]
		private var zeroTwo:Class;
		[Embed(source="image/0.png")]
		private var zeroHome:Class;
		//group1
		[Embed(source="image/1-0.png")]
		private var oneZero:Class;
		[Embed(source="image/1-1.png")]
		private var oneOne:Class;
		[Embed(source="image/1-2.png")]
		private var oneTwo:Class;
		[Embed(source="image/1.png")]
		private var oneHome:Class;
		//group2
		[Embed(source="image/2-0.png")]
		private var twoZero:Class;
		[Embed(source="image/2-1.png")]
		private var twoOne:Class;
		[Embed(source="image/2-2.png")]
		private var twoTwo:Class;
		[Embed(source="image/2-3.png")]
		private var twoThree:Class;
		[Embed(source="image/2-4.png")]
		private var twoFour:Class;
		[Embed(source="image/2.png")]
		private var twoHome:Class;
		//group3
		[Embed(source="image/3-0.png")]
		private var threeZero:Class;
		[Embed(source="image/3-1.png")]
		private var threeOne:Class;
		[Embed(source="image/3.png")]
		private var threeHome:Class;
		//group4
		[Embed(source="image/4-0.png")]
		private var fourZero:Class;
		[Embed(source="image/4-1.png")]
		private var fourOne:Class;
		[Embed(source="image/4-2.png")]
		private var fourTwo:Class;
		[Embed(source="image/4-3.png")]
		private var fourThree:Class;
		[Embed(source="image/4.png")]
		private var fourHome:Class;
		//group5
		[Embed(source="image/5-0.png")]
		private var fiveZero:Class;
		[Embed(source="image/5-1.png")]
		private var fiveOne:Class;
		[Embed(source="image/5.png")]
		private var fiveHome:Class;
		//group6
		[Embed(source="image/6-0.png")]
		private var sixZero:Class;
		[Embed(source="image/6-1.png")]
		private var sixOne:Class;
		[Embed(source="image/6-2.png")]
		private var sixTwo:Class;
		[Embed(source="image/6.png")]
		private var sixHome:Class;
		
		
		
		
		private static var _ins:PracticeLoader;
		public function PracticeLoader()
		{
			
		}
		public static function get ins():PracticeLoader
		{
			if (!_ins) _ins = new PracticeLoader();
			return _ins;
		}
		
		public function getBitmap(name:String):Bitmap
		{
			return new this[name] as Bitmap;
		}
		
		public function getJson(name:String):String
		{
			return new this[name]();
		}
	}
	
}