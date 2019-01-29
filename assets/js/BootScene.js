class BootScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        const progress = this.add.graphics();

        var loadText = this.add.text(250, 200, 'Loading...', { fontSize: '64px', fill: '#ffffff' });

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            this.makeAnimations();
            //  Our player animations, turning, walking left and walking right.

            progress.destroy();
            this.scene.start('MenuScene');
        });

        // Menu screens
        this.load.image('start_screen',     'assets/images/menus/start_screen.png');
        this.load.image('menu_year0',       'assets/images/menus/menu_year0.png');
        this.load.image('menu_year1',       'assets/images/menus/menu_year1.png');
        this.load.image('menu_year2',       'assets/images/menus/menu_year2.png');
        this.load.image('menu_year3',       'assets/images/menus/menu_year3.png');
        this.load.image('menu_year4',       'assets/images/menus/menu_year4.png');
        this.load.image('menu_year5',       'assets/images/menus/menu_year5.png');
        this.load.image('menu_year6',       'assets/images/menus/menu_year6.png');
        this.load.image('menu_complete',    'assets/images/menus/menu_complete.png');
        this.load.image('menu_bonus',       'assets/images/menus/menu_bonus.png');
        this.load.image('gameover_screen',  'assets/images/menus/gameover_screen.png');

        // Level backgrounds
        this.load.image('bestival',   'assets/images/backgrounds/bestival.png');
        this.load.image('bristol',    'assets/images/backgrounds/bristol.png');
        this.load.image('manchester', 'assets/images/backgrounds/manchester.png');
        this.load.image('exam_sky',   'assets/images/backgrounds/exam_sky.png');
        this.load.image('edinburgh',  'assets/images/backgrounds/edinburgh.png');
        this.load.image('fermilab',   'assets/images/backgrounds/fermilab.png');
        this.load.image('london',     'assets/images/backgrounds/london.png');
        this.load.image('photo',      'assets/images/backgrounds/photo.jpg');
        this.load.image('bedroom',    'assets/images/backgrounds/bedroom.png');

        // Game objects
        this.load.image('door',         'assets/images/items/door.png');
        this.load.image('train',        'assets/images/items/train.png');
        this.load.image('acid',         'assets/images/items/acid.png');
        this.load.image('baggy',        'assets/images/items/baggy.png');
        this.load.image('leggings',     'assets/images/items/leggings.png');
        this.load.image('algae',        'assets/images/items/algae.png');
        this.load.image('shewee',       'assets/images/items/shewee.png');
        this.load.image('snowflake',    'assets/images/items/snowflake.png');
        this.load.image('kindle',       'assets/images/items/kindle.png');
        this.load.image('passed_exam',  'assets/images/items/passed_exam.png');
        this.load.image('failed_exam',  'assets/images/items/failed_exam.png');
        this.load.image('proton',       'assets/images/items/proton.png');
        this.load.image('diploma',      'assets/images/items/diploma.png');
        this.load.image('breakfast',    'assets/images/items/breakfast.png');
        this.load.image('tickets',      'assets/images/items/tickets.png');
        this.load.image('beer',         'assets/images/items/cerveza.png');
        this.load.image('survival_kit', 'assets/images/items/survival_kit.png');
        this.load.image('massager',     'assets/images/items/massager.png');
        this.load.image('plug',         'assets/images/items/plug.png');
        this.load.image('plug_2',       'assets/images/items/plug_2.png');
        this.load.image('rabbit',       'assets/images/items/rabbit.png');
        this.load.image('lydia_nc',     'assets/images/items/lydia_nc.png');
        this.load.image('tom_nc',       'assets/images/items/tom_nc.png');
        this.load.image('trophy',       'assets/images/items/trophy.png');
        this.load.image('plane',        'assets/images/items/plane.png');

        // Sprite sheets
        this.load.spritesheet('lydia',      'assets/images/spritesheets/lydia_clothed.png', { frameWidth: 36, frameHeight: 64 });
        this.load.spritesheet('lydia_base', 'assets/images/spritesheets/lydia_base.png',    { frameWidth: 36, frameHeight: 64 });
        this.load.spritesheet('tom',        'assets/images/spritesheets/tom_clothed.png',   { frameWidth: 36, frameHeight: 64 });
        this.load.spritesheet('tom_base',   'assets/images/spritesheets/tom_base.png',      { frameWidth: 36, frameHeight: 64 });
        this.load.spritesheet('rom',        'assets/images/spritesheets/rom.png',           { frameWidth: 44, frameHeight: 64 });
        this.load.spritesheet('beam',       'assets/images/spritesheets/beam_sprite.png',   { frameWidth: 64, frameHeight: 81 });
        this.load.spritesheet('flu',        'assets/images/spritesheets/flu_sprite.png',    { frameWidth: 57, frameHeight: 34 });
        this.load.spritesheet('sunny',      'assets/images/spritesheets/sunny.png',         { frameWidth: 160, frameHeight: 256 });
        this.load.spritesheet('nu',         'assets/images/spritesheets/neutrino.png',      { frameWidth: 13, frameHeight: 13 });

        // Fonts
        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

        // Tile sheets
        this.load.image("bkg_sheet", "assets/images/bkg_sheet.png");
        this.load.image("bkg_sheet_extruded", "assets/images/bkg_sheet_extruded.png");

        // Level tile maps
        this.load.tilemapTiledJSON("map_yr0",   "assets/images/tilemap_year0.json"); 
        this.load.tilemapTiledJSON("map_yr1",   "assets/images/tilemap_year1.json"); 
        this.load.tilemapTiledJSON("map_yr2",   "assets/images/tilemap_year2.json"); 
        this.load.tilemapTiledJSON("map_yr3",   "assets/images/tilemap_year3.json");
        this.load.tilemapTiledJSON("map_yr4",   "assets/images/tilemap_year4.json"); 
        this.load.tilemapTiledJSON("map_yr5",   "assets/images/tilemap_year5.json"); 
        this.load.tilemapTiledJSON("map_yr6",   "assets/images/tilemap_year6.json"); 
        this.load.tilemapTiledJSON("map_yr6_2", "assets/images/tilemap_year6_2.json"); 
        this.load.tilemapTiledJSON("map_bonus", "assets/images/tilemap_bonus.json"); 


    }

    create() {
      this.registry.set('Level', -1);
      this.registry.set('HasItem', false);
      this.registry.set('Score', 0);
      this.registry.set('StartGame', false);
    }

  makeAnimations() {

    // Lydia animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('lydia', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'lydia', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('lydia', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Lydia base animations
    this.anims.create({
        key: 'left_base',
        frames: this.anims.generateFrameNumbers('lydia_base', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn_base',
        frames: [ { key: 'lydia_base', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right_base',
        frames: this.anims.generateFrameNumbers('lydia_base', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Tom animations
    this.anims.create({
        key: 'tom_left',
        frames: this.anims.generateFrameNumbers('tom', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'tom_turn',
        frames: [ { key: 'tom', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'tom_right',
        frames: this.anims.generateFrameNumbers('tom', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Tom base animations
    this.anims.create({
        key: 'tom_left_base',
        frames: this.anims.generateFrameNumbers('tom_base', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'tom_turn_base',
        frames: [ { key: 'tom_base', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'tom_right_base',
        frames: this.anims.generateFrameNumbers('tom_base', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Rom animations
    this.anims.create({
        key: 'rom_left',
        frames: this.anims.generateFrameNumbers('rom', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    this.anims.create({
        key: 'rom_turn',
        frames: [ { key: 'rom', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'rom_right',
        frames: this.anims.generateFrameNumbers('rom', { start: 5, end: 8 }),
        frameRate: 7,
        repeat: -1
    });

    // Beam animation
    this.anims.create({
        key: 'beam_down',
        frames: this.anims.generateFrameNumbers('beam', { start: 0, end: 15 }),
        frameRate: 20,
        repeat: 0
    });

    // Flu animation
    this.anims.create({
        key: 'flu_left',
        frames: this.anims.generateFrameNumbers('flu', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'flu_right',
        frames: this.anims.generateFrameNumbers('flu', { start: 4, end: 7 }),
        frameRate: 6,
        repeat: -1
    });

    // Sunny animation
    this.anims.create({
        key: 'sunny_move',
        frames: this.anims.generateFrameNumbers('sunny', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });

    // Neutrino animation
    this.anims.create({
        key: 'oscillate',
        frames: this.anims.generateFrameNumbers('nu', { start: 0, end: 2 }),
        frameRate: 1,
        repeat: -1
    });

  }

}
