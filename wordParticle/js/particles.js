function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.futurRadius = randomInt(1.1, 5.1);
  this.radius = 1.1;
  this.dying = false;
  this.base = [x, y];
  
  function randomInt(min, max) {
    return min + Math.random() * (max - min + 1);
  }


  this.drawParticle = function () {

    // 当前粒子变小到一定程度之后，每次将它的半径+0.1，使其慢慢变大
    if (this.radius < this.futurRadius && this.dying === false) {
      this.radius += durVal;
    } else { //粒子已经到达最大状态
      this.dying = true; //表示粒子还处于show状态
    }

    //每次-0.1
    if (this.dying) {
      this.radius -= durVal;
    }

    context.save();
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.restore();

    //将消失的粒子重置最初的状态
    if (this.y < 0 || this.radius < 1) {
      this.x = this.base[0];
      this.y = this.base[1];
      this.dying = false;
    }
  }
}