// создаем класс для отрисовки птицы
class Bird {
  constructor() {
    this.animation = [
      { sX: 276, sY: 112 },
      { sX: 276, sY: 139 },
      { sX: 276, sY: 164 },
    ];
    this.w = 34;
    this.h = 26;
    this.radius = 12;
    this.physics = new BirdPhysics();
  }
  
  // отрисовываем птицу
  draw() {
    let bird = this.animation[this.physics.frame];
    ctx.save();
    ctx.translate(this.physics.x, this.physics.y);
    ctx.rotate(this.physics.rotation);
    ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();

    if (gameState.current === gameState.getReady) {
      getReady.draw();
    } else if (gameState.current === gameState.over) {
      gameOver.draw();
    }
  }

  // функция взмаха крыльев
  flap() {
    this.physics.flap();
    FLAP.play()
  }

  // функция обновления
  update() {
    this.physics.update();
  }
  // скорость птицы
  speedReset() {
    this.physics.speedReset();
  }

  //состояние птицы перед игрой
  reset() {
    this.physics.y = 150;
    this.physics.speed = 0;
    this.physics.frame = 0;
    gameState.current = gameState.getReady;
  }
}
