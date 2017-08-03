class ShipController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.playerGroup.create(x, y, 'assets', spriteName);

    this.configs = configs;
    this.bullets = [];

    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;

    this.SHIP_SPEED = configs.ship_speed;
    this.BULLET_SPEED = configs.bullet_speed;
    this.BULLET_DELAY = configs.bullet_delay;
    this.delay = 0;

    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
  }

  update() {
    if (Nakama.keyboard.isDown(this.configs.left)) {
      this.sprite.body.velocity.x = -this.SHIP_SPEED;
    } else if (Nakama.keyboard.isDown(this.configs.right)) {
      this.sprite.body.velocity.x = this.SHIP_SPEED;
    } else this.sprite.body.velocity.x = 0;
    if (Nakama.keyboard.isDown(this.configs.up)) {
      this.sprite.body.velocity.y = -this.SHIP_SPEED;
    } else if (Nakama.keyboard.isDown(this.configs.down)) {
      this.sprite.body.velocity.y = this.SHIP_SPEED;
    } else this.sprite.body.velocity.y = 0;
    if (Nakama.keyboard.isDown(this.configs.fire) && Nakama.game.time.time > this.delay) {
      this.fire();
      if (!(this instanceof ShipType3Controller)) {
        this.delay = Nakama.game.time.time + this.BULLET_DELAY;
      }
    }
    if (!Nakama.keyboard.isDown(this.configs.fire) && (this instanceof ShipType3Controller)) {
      this.clearBullets();
      this.delay = Nakama.game.time.time + this.BULLET_DELAY;
    }
  }

  fire() {}

  clearBullets() {}

}
