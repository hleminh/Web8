class ShipController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
    this.configs = configs;
    this.sprite.update = this.update.bind(this);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.SHIP_SPEED = configs.ship_speed;
    this.BULLET_SPEED = configs.bullet_speed;
    this.bullets = [];
    this.BULLET_DELAY = configs.bullet_delay;
    this.delay = this.BULLET_DELAY;
  }

  update() {
    if (this.delay < this.BULLET_DELAY)
      this.delay = this.delay + 1;
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
    if (Nakama.keyboard.isDown(this.configs.fire) && this.delay == this.BULLET_DELAY) {
      this.bullets.push(new BulletController(this.sprite.x, this.sprite.y, 'BulletType1.png', {
        bullet_speed: this.BULLET_SPEED
      }, this.sprite));
      this.delay = 0;
    }
  }
}
