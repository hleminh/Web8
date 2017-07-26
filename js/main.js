var Nakama = {};
Nakama.configs = {
  GAME_WIDTH: 640,
  GAME_HEIGHT: 960
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

  Nakama.background = Nakama.game.add.sprite(0, -Nakama.configs.GAME_HEIGHT, 'background');

  Nakama.players = [];

  Nakama.players.push(new ShipController(200, 400, 'Spaceship1-Player.png', {
    up: Phaser.Keyboard.UP,
    down: Phaser.Keyboard.DOWN,
    left: Phaser.Keyboard.LEFT,
    right: Phaser.Keyboard.RIGHT,
    fire: Phaser.Keyboard.SPACEBAR,
    ship_speed: 300,
    bullet_speed: 500,
    bullet_delay: 10
  }));

  Nakama.players.push(new ShipController(400, 400, 'Spaceship1-Partner.png', {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    fire: Phaser.Keyboard.F,
    ship_speed: 300,
    bullet_speed: 500,
    bullet_delay: 10
  }));

}

// update game state each frame
var update = function() {
  // for (var player of Nakama.players) {
  //   player.update();
  // }
  Nakama.background.y += 5;
  if (Nakama.background.y > 0) Nakama.background.y = -Nakama.configs.GAME_HEIGHT;
}

// before camera render (mostly for debug)
var render = function() {}
