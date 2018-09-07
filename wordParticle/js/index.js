var canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
var message = document.getElementById('message');
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
  gridX = 7;
  gridY = 7;
  colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722'
  ];
  durVal = 0.1;

  // 创建模型数据对象
  console.log('message'+message.value)
  var word = new Shape(W/2, H/2,message.value);
  // 调用getValue方法，获取数据位置信息
  word.getValue();

  function change(){
	  context.clearRect(0, 0, W, H);
	
	  word.placement = [];
	  word.text = message.value;
	  word.getValue();
}

(function drawFrame(){
  window.requestAnimationFrame(drawFrame);
  context.clearRect(0, 0, W, H);

  for (var i = 0; i < word.placement.length; i++){
      //调用particle对像的drawParticle方法，开始画布上画
      word.placement[i].drawParticle();
  }

}())