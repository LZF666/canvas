var canvas = document.getElementById('container')
var context = canvas.getContext('2d');
var brush = document.getElementById('brush')
var lineWidth = 2;

autoSetCanvas(canvas)
listenToUser(canvas)
/***************/

var usingEraser = false
pen.onclick = function () {
  usingEraser = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  usingEraser = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
/********/

function listenToUser(canvas) {

  var using = false

  var lastPoint = {
    'x': undefined,
    'y': undefined
  }
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }

      }
    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if (!using) {
        return
      }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }
        drwaLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint

      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }

      }

    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      if (!using) {
        return
      }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }
        drwaLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint

      }
    }
    canvas.onmouseup = function (aaa) {
      using = false
    }
  }

}

/***************/
function autoSetCanvas(canvas) {
  setCanvasSize();
  window.onresize = function () {
    setCanvasSize();
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
/***************/

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drwaLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1) //起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) //终点
  context.stroke()
  context.closePath()
}
/******画笔颜色 */
lightblue.onclick = function () {
  context.strokeStyle = 'lightblue'
  lightblue.classList.add('active')
  pink.classList.remove('active')
  lightgreen.classList.remove('active')

}
pink.onclick = function () {
  context.strokeStyle = 'pink'
  pink.classList.add('active')
  lightblue.classList.remove('active')
  lightgreen.classList.remove('active')
}
lightgreen.onclick = function () {
  context.strokeStyle = 'lightgreen'
  lightgreen.classList.add('active')
  pink.classList.remove('active')
  lightblue.classList.remove('active')
}
/* 画笔粗细 */
size1.onclick = function() {
  lineWidth = 2
  size1.classList.add('active')
  size2.classList.remove('active')
}
size2.onclick = function() {
  lineWidth = 5
  size2.classList.add('active')
  size1.classList.remove('active')
}
/**清屏 */
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
/**保存 */
download.onclick = function() {
  var url = canvas.toDataURL('image/png');
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画板'
  a.target = '_blank'
  a.click()
}

