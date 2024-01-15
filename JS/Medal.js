class Medal {
  constructor() {
    this.position = []
    this.gold = {
      sX: 276, sY: 164
    }
    this.w = 34;
    this.h = 26;
    this.radius = 12;
  }

  draw() {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
  }

}
