class ShipType1Controller extends ShipController {
  constructor(x, y, spriteSuffix, configs) {
    super(x, y, `Spaceship1${spriteSuffix}.png`, configs);

    this.configs.SHIP_SPEED = 300;
    this.configs.BULLET_DELAY = 300;
  }

  fire() {
    this.bullets.push(new BulletType1Controller(this.sprite.x, this.sprite.y, {}));
  }
}
