var Nakama = {};
Nakama.configs = {
  GAME_WIDTH: 640,
  GAME_HEIGHT: 960,
  P1_START_POSITION: {
    x: 200,
    y: 600
  },
  P2_START_POSITION: {
    x: 400,
    y: 600
  },
  BULLET_SPEED: 500,
  BULLET_DELAY: 200,
  SHIP_SPEED: 300,
  BACKGROUND_SPEED: 5
};

window.onload = function() {
  Nakama.game = new Phaser.Game(Nakama.configs.GAME_WIDTH, Nakama.configs.GAME_HEIGHT, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
  }, false, false);
}

// preparations before game starts
var preload = function() {
  Nakama.game.scale.minWidth = Nakama.configs.GAME_WIDTH / 2;
  Nakama.game.scale.minHeight = Nakama.configs.GAME_HEIGHT / 2;
  Nakama.game.scale.maxWidth = Nakama.configs.GAME_WIDTH;
  Nakama.game.scale.maxHeight = Nakama.configs.GAME_HEIGHT;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function() {
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.players = [];
  Nakama.enemies = [];

  Nakama.background = Nakama.game.add.sprite(0, -Nakama.configs.GAME_HEIGHT, 'background');

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();

  Nakama.players.push(new ShipType2Controller(Nakama.configs.P1_START_POSITION.x, Nakama.configs.P1_START_POSITION.y, '-Player', {
    up: Phaser.Keyboard.UP,
    down: Phaser.Keyboard.DOWN,
    left: Phaser.Keyboard.LEFT,
    right: Phaser.Keyboard.RIGHT,
    fire: Phaser.Keyboard.SPACEBAR,
    ship_speed: Nakama.configs.SHIP_SPEED,
    bullet_speed: Nakama.configs.BULLET_SPEED,
    bullet_delay: Nakama.configs.BULLET_DELAY
  }));

  Nakama.players.push(new ShipType3Controller(Nakama.configs.P2_START_POSITION.x, Nakama.configs.P2_START_POSITION.y, '-Player', {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    fire: Phaser.Keyboard.F,
    ship_speed: Nakama.configs.SHIP_SPEED,
    bullet_speed: Nakama.configs.BULLET_SPEED,
    bullet_delay: Nakama.configs.BULLET_DELAY
  }));

  Nakama.enemies.push(new EnemyController(320, 200, 'EnemyType1.png', {
    ship_speed: Nakama.configs.SHIP_SPEED,
    bullet_speed: Nakama.configs.BULLET_SPEED,
    bullet_delay: Nakama.configs.BULLET_DELAY,
    health: 2
  }));

}

// update game state each frame
var update = function() {
  Nakama.background.y += Nakama.configs.BACKGROUND_SPEED;
  if (Nakama.background.y > 0) Nakama.background.y = -Nakama.configs.GAME_HEIGHT;

  Nakama.game.physics.arcade.overlap(
    Nakama.bulletGroup,
    Nakama.enemyGroup,
    onBulletHitEnemy
  )
}

// before camera render (mostly for debug)
var render = function() {}

var onBulletHitEnemy = function(bulletSprite, enemySprite) {
  if (bulletSprite.frame != 11){ //BulletType3
    bulletSprite.kill();
  }
  enemySprite.damage(1);
  if (enemySprite.alive == false) {
    setTimeout(function() {
      Nakama.enemies.push(new EnemyController(320, 200, 'EnemyType1.png', {
        ship_speed: Nakama.configs.SHIP_SPEED,
        bullet_speed: Nakama.configs.BULLET_SPEED,
        bullet_delay: Nakama.configs.BULLET_DELAY,
        health: 2
      }));
    }, 1000);
  }
}
