// создаем класс для движения птицы

class BirdPhysics {
  constructor() {
    this.x = 50;
    this.y = 150;
    this.speed = 0;
    this.gravity = 0.07;
    this.jump = 2.1;
    this.rotation = 0;
    this.frame = 0;
    this.period = gameState.current == gameState.getReady ? 10 : 5;
  }

  flap() {
    this.speed = -this.jump;
  }

  update() {
    //при состоянии игры "Get Ready" то птица машет медленно,с началом игры взмахи увеличиваются вдвое
    this.period = gameState.current == gameState.getReady ? 10 : 5;
    //увеличиваем кадр на 1, каждый период
    this.frame += frame % this.period == 0 ? 1 : 0;
    //переключаем кадры с 0 до конечного, затем снова к 0
    this.frame = this.frame % 3;

    // сщостояние при готовности
    if (gameState.current == gameState.getReady) {
      this.y = 150;
      this.rotation = 0 * DEGREE;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;
      // состояние при столкновении с землей
      if (this.y + 13 >= canvas.height - frontGround.h) {
        this.y = canvas.height - frontGround.h - 13;
        if (gameState.current == gameState.game) {
          gameState.current = gameState.over;
          DIE.play();
        }
      }

      if (this.y - 13 < 0) {
        this.y = 13;
        this.speed = 0;
      }

      // поворот птицы вокруг своей оси в зависимости от того мащет она крыльями или нет
      if (this.speed >= this.jump) {
        this.rotation = 90 * DEGREE;
        this.frame = 1;
      } else if (this.speed >= this.jump / 2) {
        this.rotation = 45 * DEGREE;
      } else {
        this.rotation = 0;
      }
    }
  }

  speedReset() {
    this.speed = 0;
  }
}

