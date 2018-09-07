// 创建构造函数shape x,y表示文字位置，texte表示绘制的文字
function Shape(x, y, texte) {
    this.x = x;
    this.y = y;
    this.size = 150; //设置文字大小，单位像素
    this.text = texte;
    this.placement = [];
}
// getValue方法
Shape.prototype.getValue = function () {
    context.textAlign = "center"; //设置文字对齐方式
    context.font = this.size + "px arial"; //设置文字大小
    context.fillText(this.text, this.x, this.y); //绘制文字
    // 复制画布上指定矩形的像素数据
    var idata = context.getImageData(0, 0, W, H); //绘制图片
    // data 属性返回一个对象，是一个8位无符号整数的数组Uint8ClampedArray
    var buffer32 = new Uint32Array(idata.data.buffer); //压缩数据
    // 抽样获取图像数据使用particle对象记录下当前像素下数据的位置信息
    //在有数据的地方放上粒子
    for (var j = 0; j < H; j += gridY) {
        for (var i = 0; i < W; i += gridX) {
            if (buffer32[j * W + i]) {
                var particle = new Particle(i, j);
                this.placement.push(particle);
            }
        }
    }
    context.clearRect(0, 0, W, H);
}