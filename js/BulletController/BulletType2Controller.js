class BulletType2Controller extends BulletController {
  constructor(x, y, configs, enemy) {
    super(x, y, "BulletType2.png", configs);
    this.TURN_RATE = 5;
    this.WOBBLE_LIMIT = 15;
    this.WOBBLE_SPEED = 250;
    this.BULLET_SPEED = 200;
    this.enemy = enemy;
    this.sprite.update = this.update.bind(this);
    this.wobble = this.WOBBLE_LIMIT;
    Nakama.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.y = y - this.sprite.height + 10;
    Nakama.game.add.tween(this)
      .to({
          wobble: -this.WOBBLE_LIMIT
        },
        this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
        Number.POSITIVE_INFINITY, true
      );
    this.sprite.rotation -=  Nakama.game.math.degToRad(90);
    this.lastTargetAngle = 0;
  }
  update() {
    if (this.enemy != null) {
      if (this.enemy.sprite.alive) {
        var targetAngle = Nakama.game.math.angleBetween(
          this.sprite.x, this.sprite.y,
          this.enemy.sprite.x, this.enemy.sprite.y
        );
        targetAngle += Nakama.game.math.degToRad(this.wobble);
        if (this.sprite.rotation !== targetAngle) {
          var delta = targetAngle - this.sprite.rotation;

          if (delta > Math.PI) delta -= Math.PI * 2;
          if (delta < -Math.PI) delta += Math.PI * 2;

          if (delta > 0) {
            this.sprite.angle += this.TURN_RATE;
          } else {
            this.sprite.angle -= this.TURN_RATE;
          }

          if (Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)) {
            this.sprite.rotation = targetAngle;
          }

          this.lastTargetAngle = targetAngle;
        }

        this.sprite.body.velocity.x = Math.cos(this.sprite.rotation) * this.BULLET_SPEED;
        this.sprite.body.velocity.y = Math.sin(this.sprite.rotation) * this.BULLET_SPEED;
      }else{
        var targetAngle = this.lastTargetAngle;
        targetAngle += Nakama.game.math.degToRad(this.wobble);
        if (this.sprite.rotation !== targetAngle) {
          var delta = targetAngle - this.sprite.rotation;

          if (delta > Math.PI) delta -= Math.PI * 2;
          if (delta < -Math.PI) delta += Math.PI * 2;

          if (delta > 0) {
            this.sprite.angle += this.TURN_RATE;
          } else {
            this.sprite.angle -= this.TURN_RATE;
          }

          if (Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)) {
            this.sprite.rotation = targetAngle;
          }
        }
        this.sprite.body.velocity.x = Math.cos(this.sprite.rotation) * this.BULLET_SPEED;
        this.sprite.body.velocity.y = Math.sin(this.sprite.rotation) * this.BULLET_SPEED;
      }
    } else {
      var targetAngle = Nakama.game.math.degToRad(-90);
      targetAngle += Nakama.game.math.degToRad(this.wobble);
      if (this.sprite.rotation !== targetAngle) {
        var delta = targetAngle - this.sprite.rotation;

        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
          this.sprite.angle += this.TURN_RATE;
        } else {
          this.sprite.angle -= this.TURN_RATE;
        }

        if (Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)) {
          this.sprite.rotation = targetAngle;
        }
      }
      this.sprite.body.velocity.x = Math.cos(this.sprite.rotation) * this.BULLET_SPEED;
      this.sprite.body.velocity.y = Math.sin(this.sprite.rotation) * this.BULLET_SPEED;
    }
  }
}
