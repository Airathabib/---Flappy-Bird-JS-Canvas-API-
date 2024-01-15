// создаем класс для отрисовки и подсчета счета
class Score {

  constructor() {
    this.best = Number(localStorage.getItem("best")) || 0;
    this.value = 0;
  }
 
  // рисуем счет при игре, и выводим счет игрока и лучший счет в игре
  draw() {
    ctx.fillStyle = "#ff0";
    ctx.strokeStyle = "#000";

    if (gameState.current == gameState.game) {
      ctx.lineWidth = 2;
      ctx.font = "35px Teko";
      const scoreText = this.value.toString();
      const textWidth = ctx.measureText(scoreText).width;
      const yOffset = 35;
      ctx.fillText(scoreText, canvas.width / 2 - textWidth / 2, canvas.height - yOffset);
      ctx.strokeText(scoreText, canvas.width / 2 - textWidth / 2, canvas.height - yOffset);
    } else if (gameState.current == gameState.over) {
      ctx.font = "25px Teko";
      const scoreText = this.value.toString();
      const bestText = this.best.toString();
      const scoreTextWidth = ctx.measureText(scoreText).width;
      const bestTextWidth = ctx.measureText(bestText).width;
      ctx.fillText(scoreText, canvas.width / 2 - scoreTextWidth / 2, 166);
      ctx.strokeText(scoreText, canvas.width / 2 - scoreTextWidth / 2, 166);
      ctx.fillText(bestText, canvas.width / 2 - bestTextWidth / 2, 208);
      ctx.strokeText(bestText, canvas.width / 2 - bestTextWidth / 2, 208);
    }
  }

  reset() {
    this.value = 0;
  }
}
