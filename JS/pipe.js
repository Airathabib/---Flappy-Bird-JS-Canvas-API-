// создаем класс для  отрисовки помех для птицы

class Pipe {
  constructor() {
    this.position = [];
    // верхняя труба, координаты для отрисовки
    this.top = {
      sX: 553,
      sY: 0,
    };
    // нижняя трубы, координаты для отрисовки
    this.bottom = {
      sX: 502,
      sY: 0,
    };
    this.w = 53;// ширина труб
    this.h = 400;  // высота труб
    this.gap = 85; // зазор между трубами для пролета птицы
    this.maxYPos = -150; // высота нижней трубы
    this.dx = 1.7; //расстояние между трубами
  }

  // рисуем трубы
  draw() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;
      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);
      ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
  }

  //удаляем из массива трубы при выходе их окна и добавляем новые и фиксируем счет про пролете птицы через них
  update() {
    if (gameState.current !== gameState.game) return;
    if (frame % 100 == 0) {
      this.position.push({
        x: canvas.width,
        y: this.maxYPos * (Math.random() + 1),
      });
    }

    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      let bottomPipeYPos = p.y + this.h + this.gap;

      if (
        bird.physics.x + bird.radius > p.x &&
        bird.physics.x - bird.radius < p.x + this.w &&
        bird.physics.y + bird.radius > p.y &&
        bird.physics.y - bird.radius < p.y + this.h
      ) {
        gameState.current = gameState.over;
        HIT.play();
      }

      if (
        bird.physics.x + bird.radius > p.x &&
        bird.physics.x - bird.radius < p.x + this.w &&
        bird.physics.y + bird.radius > bottomPipeYPos &&
        bird.physics.y - bird.radius < bottomPipeYPos + this.h
      ) {
        gameState.current = gameState.over;
        HIT.play();
      }

      p.x -= this.dx;

      if (p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        SCORE.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  }

  reset() {
    this.position = [];
  }
}
