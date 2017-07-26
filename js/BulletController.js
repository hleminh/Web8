class BulletController {
  constructor(x, y, spriteName, configs, parentSprite) {
    this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
    this.sprite.x = x + (parentSprite.width - this.sprite.width) / 2;
    this.sprite.y = y - parentSprite.height / 2;
    this.configs = configs;
    this.sprite.update = this.update.bind(this);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.BULLET_SPEED = configs.bullet_speed;
  }

  update() {
    this.sprite.body.velocity.y = -this.BULLET_SPEED;
    if (this.sprite.y < 0) this.sprite.destroy();
  }
}
