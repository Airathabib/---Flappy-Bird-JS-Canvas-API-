// создаем  канвас ,заголовок и даем ему класс и размеры
const container = document.getElementById('app');
const title = document.createElement('h1');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

title.classList.add('title')
title.innerHTML = 'Flappy Bird'
canvas.width = 650;
canvas.height = 480;
canvas.classList.add('canvas')

container.insertAdjacentElement('beforebegin', title)
container.insertAdjacentElement('afterbegin', canvas)

// создаем переменную кадры игры
let frame = 0;

// создаем постоянную переменную для перевода радиан в градусы
const DEGREE = Math.PI / 180;

// загружаем игровое изображение
const sprite = new Image();
sprite.src = "img/sprite.png";

// загружаем звуки игры
const SCORE = new Audio();
SCORE.src = "audio/point.mp3";

const FLAP = new Audio();
FLAP.src = "audio/fly.mp3";

const DIE = new Audio();
DIE.src = "audio/die.mp3";

const HIT = new Audio();
HIT.src = "audio/hit.mp3";

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/swooshing.mp3";

// находим кнопку старта игры
const startBtn = {
  x: canvas.width / 2 - 41.5,
  y: 263,
  w: 83,
  h: 29,
};

// состояние игры
const gameState = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

// Инициализация объектов
const backGround = new Background(0, 0, 288, 512, 0, canvas.height - 226, canvas.width, 226, 2);
backGround.increaseSize();
const frontGround = new Background(276, 0, 224, 112, 0, canvas.height - 112, canvas.width, 112, 2);
const bird = new Bird();
const pipes = new Pipe();
const score = new Score();
const getReady = new Message(0, 228, 173, 152, canvas.width / 2 - 173 / 2, 200);
const gameOver = new Message(175, 228, 225, 202, canvas.width / 2 - 225 / 2, 240);

// Обработчик события
canvas.addEventListener("mousedown", handleMouseDown);

// функция обновления игрового поля при изменениях в игре
function update() {
  bird.update();
  frontGround.update();
  pipes.update();
}
// функция отрисовки
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0fcfff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  backGround.draw();
  pipes.draw();
  frontGround.draw();
  bird.draw();
  // если игра окончена то выводим сообщение
  if (gameState.current === gameState.over) {
    ctx.drawImage(sprite, 0, 114, startBtn.w, startBtn.h, startBtn.x, startBtn.y, startBtn.w, startBtn.h);
    gameOver.draw();
  }
  // если игра готова к запуску
  if (gameState.current === gameState.getReady) {
    getReady.draw();
  }

  score.draw();
}

// циклическая функция обновления элементов игры
function loop() {
  update();
  backGround.update();
  draw();
  frame++;
  requestAnimationFrame(loop);
}

// функция перезапуска
function resetGame() {
  bird.reset();
  pipes.reset();
  score.reset();
  gameState.current = gameState.getReady;
}

loop();
