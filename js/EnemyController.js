class EnemyController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);

    this.configs = configs;
    this.bullets = [];

    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;

    this.sprite.health = this.configs.health;

    this.SHIP_SPEED = configs.ship_speed;
    this.BULLET_SPEED = configs.bullet_speed;
    this.BULLET_DELAY = configs.bullet_delay;
    this.delay = 0;

    this.sprite.anchor = new Phaser.Point(0.5, 0, 5);
    this.configs.startingX = x;
    this.configs.moveRadius = 250;

  }

  update() {
    this.sprite.position.x = this.configs.startingX + this.configs.moveRadius * Math.sin(Nakama.game.time.time / 1000);
  }
}
