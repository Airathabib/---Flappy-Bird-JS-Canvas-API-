// создаем функцию для события клика мыши
function handleMouseDown(e) {
  switch (gameState.current) {
    // перед началом игры
    case gameState.getReady:
      gameState.current = gameState.game;
      break;
    // сама игра клик это взмах птицы
    case gameState.game:
      bird.flap();
      break;

    // после смерти птицы выводим сообщение и при изменении  окна браузера фиксируем кнопку на одном уровне
    case gameState.over:
      let rect = canvas.getBoundingClientRect();
      let clickX = e.clientX - rect.left;
      let clickY = e.clientY - rect.top;
      if (
        clickX >= startBtn.x &&
        clickX <= startBtn.x + startBtn.w &&
        clickY >= startBtn.y &&
        clickY <= startBtn.y + startBtn.h
      ) {
        resetGame();
      }
      break;
  }

}