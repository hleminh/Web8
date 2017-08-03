class BulletType3Controller extends BulletController {
  constructor(x, y, configs, ship) {
    super(x, y, "BulletType3.png", configs);
    this.sprite.update = this.update.bind(this);
    this.ship = ship;
  }
  update(){
    this.sprite.x = this.ship.sprite.x;
    this.sprite.y = this.ship.sprite.y - this.sprite.height/2 - this.ship.sprite.height/2 + 10;
  }
}
