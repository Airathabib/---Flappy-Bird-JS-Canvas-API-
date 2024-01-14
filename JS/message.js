// создаем класс для отрисовки сообщений

class Message {
  constructor(sX, sY, w, h, x, y) {
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }

  draw() {
    if (gameState.current === gameState.getReady) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y - 105, this.w, this.h);
    } else if (gameState.current === gameState.over) {
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, canvas.width / 2 - this.w / 2, this.y - 150, this.w, this.h);
    }
  }
}
