class ShipType2Controller extends ShipController {
  constructor(x, y, spriteSuffix, configs) {
    super(x, y, `Spaceship2${spriteSuffix}.png`, configs);

    this.SHIP_SPEED = 200;
    this.BULLET_DELAY = 300;
  }

  fire() {
    var flag = false;
    for (var enemy of Nakama.enemies){
      if (enemy.sprite.alive){
        flag = true;
        this.bullets.push(new BulletType2Controller(this.sprite.x, this.sprite.y, {}, enemy));
        break;
      }
    }
    if (flag == false){
      this.bullets.push(new BulletType2Controller(this.sprite.x, this.sprite.y, {}, null));
    }
  }
}
