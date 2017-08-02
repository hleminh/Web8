class BulletController {
  constructor(x, y, spriteName) {
    this.sprite = Nakama.bulletGroup.create(x, y, 'assets', spriteName);
    this.sprite.update = this.update.bind(this);
    this.sprite.collideWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
  }

  update() {}
}
