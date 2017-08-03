class ShipType3Controller extends ShipController {
  constructor(x, y, spriteSuffix, configs) {
    super(x, y, `Spaceship3${spriteSuffix}.png`, configs);

    this.SHIP_SPEED = 200;
    this.BULLET_DELAY = 700;
  }

  fire() {
    if (this.bullets.length == 0) {
      this.bullets.push(new BulletType3Controller(this.sprite.x, this.sprite.y, {}, this));
      this.SHIP_SPEED = 50;
    }
  }

  clearBullets() {
    for (var bullet of this.bullets) {
      bullet.sprite.kill();
    }
    this.bullets = [];
    this.SHIP_SPEED = 200;
  }
}
