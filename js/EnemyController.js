class EnemyController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);

    this.configs = configs;
    this.bullets = [];

    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;

    this.SHIP_SPEED = configs.ship_speed;
    this.BULLET_SPEED = configs.bullet_speed;
    this.BULLET_DELAY = configs.bullet_delay;
    this.delay = 0;

    this.sprite.anchor = new Phaser.Point(0.5, 0, 5);
  }

  update() {
    if (this.sprite.x >= Nakama.configs.GAME_WIDTH - this.sprite.width) {
      if (this.SHIP_SPEED > 0) {
        this.SHIP_SPEED = -this.SHIP_SPEED;
      }
    }
    if (this.sprite.x == this.sprite.width / 2) {
      if (this.SHIP_SPEED < 0) {
        this.SHIP_SPEED = -this.SHIP_SPEED;
      }
    }
    this.sprite.body.velocity.x = this.SHIP_SPEED;
  }
}
