class GameScene extends Phaser.Scene{

  constructor () {
    super('GameScene');
  }


  preload () {
  }

  create () {


      //  Input Events
      cursors = this.input.keyboard.createCursorKeys();

      // Create some groups beforehand
      enemies = this.physics.add.group();
      followers = this.physics.add.group();
      toms = this.physics.add.group();

      // Flag for timed event in level 4
      this.firstTrain = true;

      // Keep track of score for this level
      this.levelScore = 0;

      // Speed multiplier for level 2
      this.speedMult = 1;

      // Number of tabs collected for level 1
      this.tabs = 0;

      // Control transition between scenes
      this.transitionTime = 1000;
      this.shouldTransition = false;

      this.level6 = false

      this.cameras.main.fadeIn(500);

      //------------------------------------------------------------------------------------
      //                               LEVEL 0: BESTIVAL
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level") == 0){

        // Count how many beers consumes
        this.beersDrunk = 0;

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 1600, 1200); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 1200, true, true, true, true);

        //  Add level background
        this.add.image(800, 600, 'bestival');

        // Create map from tilemap and tileset
        const map = this.make.tilemap({ key: "map_yr0" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add and configure lydia
        player = this.physics.add.sprite(50, 500, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(50,500,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add in beer collectibles
        collectibles = this.physics.add.group({
            key: 'beer',
            repeat: 10,
            setXY: { x: 30, y: 0, stepX: 140}
        });
        collectibles.createMultiple({
            key: 'beer',
            repeat: 10,
            setXY: { x: 30, y: 650, stepX: 140}
        });
        // Give all the beers a slightly different bounce
        collectibles.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        });

        // Add in shewee
        items = this.physics.add.group();
        var item = items.create(525, 730, 'shewee');

        // Add in door
        doors = this.physics.add.group();
        var door = doors.create(1230, 152, 'door');

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.overlap(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 1: BRISTOL
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==1){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 1600, 600); 
        this.cameras.main.centerOn(400, 300);
        // Set the world bounds
        this.physics.world.setBounds(0, 0, 1600, 600, true, true, true, true);

        // Add level background
        bkg = this.add.image(800, 300, 'bristol');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_yr1" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add and configure lydia
        player = this.physics.add.sprite(60, 500, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(60,500,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add in acid collectibles
        collectibles = this.physics.add.group();
        collectibles.create(100, 350, 'acid').setScale(0.7);
        collectibles.create(1000, 350, 'acid').setScale(0.7);
        collectibles.create(1400, 350, 'acid').setScale(0.7);
        collectibles.create(150, 150, 'acid').setScale(0.7);

        // Add in freshers flu enemies
        enemies.create(280, 550, 'flu');
        enemies.create(520, 450, 'flu');
        enemies.create(900, 550, 'flu');
        enemies.create(1200, 560, 'flu');

        // Add in snowflake
        items = this.physics.add.group();
        var item = items.create(290, 100, 'snowflake').setScale(1.5);

        // Add in door
        doors = this.physics.add.group();
        var door = doors.create(20, 553, 'door');

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.overlap(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.overlap(player, enemies, this.hitEnemy, null, this);
        this.physics.add.collider(enemies, worldLayer);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 2: MANCHESTER
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==2){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 1600, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 600, true, true, true, true);

        // Add background image
        this.add.image(800, 300, 'manchester');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_yr2" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const platformLayer = map.createStaticLayer("Platforms", tileset, 0, 0);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);
        platformLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add and configure lydia
        player = this.physics.add.sprite(60, 500, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(60,500,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add in baggy collectibles
        collectibles = this.physics.add.group();
        collectibles.create(100, 350, 'baggy').setScale(0.7);
        collectibles.create(670, 150, 'baggy').setScale(0.7);
        collectibles.create(1280, 150, 'baggy').setScale(0.7);
        collectibles.create(1520, 350, 'baggy').setScale(0.7);

        // Add in sunny enemy
        var enemy = enemies.create(800, 300, 'sunny').setScale(1.5);

        // Add in kindle
        items = this.physics.add.group();
        var item = items.create(1570, 550, 'kindle').setScale(0.75);

        // Add in door
        doors = this.physics.add.group();
        var door = doors.create(40, 200, 'door');

        //Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(player, platformLayer);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.collider(collectibles, platformLayer);
        this.physics.add.overlap(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.collider(enemies, worldLayer);
        this.physics.add.overlap(player, enemies, this.hitEnemy, null, this);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.collider(doors, platformLayer);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 3: EXAMS
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==3){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 1600, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 600, true, true, true, true);

        // Add level background
        this.add.image(800, 300, 'exam_sky');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_yr3" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const doorLayer = map.createStaticLayer("Door", tileset, 0, 0);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        const windowLayer = map.createStaticLayer("Windows", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);
        doorLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add and configure lydia
        player = this.physics.add.sprite(60, 500, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(60,500,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add in failed exam bombs
        bombs = this.physics.add.group({
            key: 'failed_exam',
            repeat: 2,
            setXY: { x: 850, y: 100, stepX: 300}
        });
        // Make bombs bounce around
        bombs.children.iterate(function (child) {
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-60, 60), 20);
          child.allowGravity = false;
        });

        // Add in passed exam collectibles
        collectibles = this.physics.add.group({
            key: 'passed_exam',
            repeat: 3,
            setXY: { x: 850, y: 400, stepX: 200}
        });
        // Make collectibles bounce around
        collectibles.children.iterate(function (child) {
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-60, 60), 20);
          child.allowGravity = false;
        });

        // Add in diploma item
        items = this.physics.add.group();
        var item = items.create(1500, 550, 'diploma');

        // Add in door
        doors = this.physics.add.group();
        var door = doors.create(735, 80, 'door');

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(bombs, worldLayer);
        this.physics.add.collider(bombs, doorLayer);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.collider(collectibles, doorLayer);
        this.physics.add.collider(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 4: EDINBURGH
      //------------------------------------------------------------------------------------


      if (this.registry.get("Level")==4){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 2400, 1800); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 2400, 1800, true, true, true, true);

        // Add level background
        this.add.image(1200, 900, 'edinburgh');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_yr4" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const windowsLayer = map.createStaticLayer("Windows", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Create train which acts as a door
        doors = this.physics.add.group();
        var door = doors.create(775, 1760, 'train').setScale(0.85);
        this.physics.add.collider(doors, worldLayer);

        // Add and configure lydia
        player = this.physics.add.sprite(60, 1650, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(60,1650,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add in legging collectibles
        collectibles = this.physics.add.group();
        collectibles.create(1150, 600, 'leggings');
        collectibles.create(970, 1300, 'leggings');
        collectibles.create(1550, 1300, 'leggings');
        collectibles.create(2240, 500, 'leggings');
        collectibles.create(1750, 100, 'leggings');
        collectibles.create(1680, 700, 'leggings');

        // Add breakfast item
        items = this.physics.add.group();
        var item = items.create(2350, 10, 'breakfast');

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.overlap(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 5: FERMILAB
      //------------------------------------------------------------------------------------


      if (this.registry.get("Level")==5){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 1600, 1800); 
        this.cameras.main.centerOn(800, 600); 
        this.cameras.main.zoomTo(0.5); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 1800, true, true, true, true);

        // Add level background
        this.add.image(800, 900, 'fermilab');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_yr5" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        const windowLayer = map.createStaticLayer("Windows", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(-300, -300, 'Score: 0', { fontSize: '64px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add and configure lydia
        player = this.physics.add.sprite(400, 1600, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(400,1600,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Make camera follow player
        this.cameras.main.startFollow(player);

        // Add in door
        doors = this.physics.add.group();
        var door = doors.create(50, 1680, 'door');
        this.physics.add.collider(doors, worldLayer);

        // Add in proton bombs
        bombs = this.physics.add.group({
            key: 'proton',
            repeat: 3,
            setXY: { x: 440, y: 940, stepX: 200}
        });
        // Make them bounce around
        bombs.children.iterate(function (child) {
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-60, 60), 20);
          child.allowGravity = false;
        });

        // Add in neutrino collectibles
        collectibles = this.physics.add.group({
            key: 'nu',
            repeat: 3,
            setXY: { x: 440, y: 1340, stepX: 200}
        });
        collectibles.createMultiple({
            key: 'nu',
            repeat: 3,
            setXY: { x: 440, y: 650, stepX: 200}
        });
        // Make them bounce around and play oscillation animation
        collectibles.children.iterate(function (child) {
          child.anims.play('oscillate', true);
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-160, 160), 20);
          child.allowGravity = false;
        });

        // Add in survival kit item
        items = this.physics.add.group();
        var item = items.create(1000, 360, 'survival_kit');

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.collider(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.collider(bombs, worldLayer);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               LEVEL 6: LONDON
      //------------------------------------------------------------------------------------


      if (this.registry.get("Level")==6){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 3200, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 3200, 600, true, true, true, true);

        // Add background image
        this.add.image(1600, 300, 'london');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_yr6" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const bkgLayer = map.createStaticLayer("TileBkg", tileset, 0, 0);
        const windowLayer = map.createStaticLayer("Windows", tileset, 0, 0);
        const obsLayer = map.createStaticLayer("Obstacles", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);
        obsLayer.setCollisionBetween(0, 1400);

        // Display level score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add and configure lydia
        player = this.physics.add.sprite(280, 500, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation
        beams = this.physics.add.staticGroup();
        var beam = beams.create(280,500,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add in algae collectible
        collectibles = this.physics.add.group();
        collectibles.create(790, 450, 'algae');
        collectibles.create(970, 350, 'algae');
        collectibles.create(1460, 350, 'algae');
        collectibles.create(2040, 350, 'algae');
        collectibles.create(2640, 220, 'algae');
        collectibles.create(2560, 400, 'algae');

        // Add in follower
        var follower = followers.create(40, 500, 'romanian').setScale(1.1);

        // Add in tickets item
        items = this.physics.add.group();
        var item = items.create(3050, 150, 'tickets');

        // Add in plane which acts as door
        doors = this.physics.add.group();
        var door = doors.create(150, 100, 'plane');

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(player, obsLayer);
        this.physics.add.collider(collectibles, worldLayer);
        this.physics.add.collider(collectibles, obsLayer);
        this.physics.add.overlap(player, collectibles, this.hitCollectible, null, this);
        this.physics.add.collider(followers, worldLayer);
        this.physics.add.overlap(player, followers, this.hitEnemy, null, this);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(player, items, this.hitItem, null, this);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.overlap(player, doors, this.hitDoor, null, this);


      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 6.5: MEETING TOM
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==7){

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 800, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);

        // Add level background
        this.add.image(400, 300, 'photo');

        // Add map from tileset
        const map = this.make.tilemap({ key: "map_yr6_2" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const bkgLayer = map.createStaticLayer("Pillars", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);
        bkgLayer.setCollisionBetween(0, 1400);

        // Display game score
        score = this.registry.get("Score") + this.levelScore;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Score: ' + score);

        // Add in images of all collected items
        items = this.physics.add.group();
        var item = items.create(170, 500, 'shewee');
        var item = items.create(250, 500, 'snowflake');
        var item = items.create(330, 500, 'kindle').setScale(0.75);
        var item = items.create(410, 500, 'diploma').setScale(0.5);
        var item = items.create(490, 500, 'breakfast');
        var item = items.create(570, 500, 'survival_kit').setScale(0.5);
        var item = items.create(650, 500, 'algae');

        // Add in plane, but don't act as door
        doors = this.physics.add.group();
        var door = doors.create(150, 320, 'plane');

        // Add and configure lydia
        player = this.physics.add.sprite(100, 320, 'lydia');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // Add tom as a follower, make him act like a door
        var follower = followers.create(750, 550, 'tom').setScale(1.2);

        // Colliders and overlaps
        this.physics.add.collider(items, bkgLayer);
        this.physics.add.collider(items, worldLayer);
        this.physics.add.collider(doors, worldLayer);
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(followers, worldLayer);
        this.physics.add.overlap(player, followers, this.hitDoor, null, this);

      }

      //------------------------------------------------------------------------------------
      //                               BONUS: THE BEDROOM
      //------------------------------------------------------------------------------------

      if (this.registry.get("Level")==8){

        // Count scores for both lydia and tom
        this.lydiaScore = 0;
        this.tomScore = 0;

        // Set initial position and bounds of camera
        this.cameras.main.setBounds(0, 0, 800, 600); 
        this.cameras.main.centerOn(400, 300); 
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true);

        // Add background image
        this.add.image(400, 300, 'bedroom');

        // Create map from tiles
        const map = this.make.tilemap({ key: "map_bonus" });
        const tileset = map.addTilesetImage("bkg_sheet", "bkg_sheet_extruded", 20, 20, 1, 2);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionBetween(0, 1400);

        // Display lydias score on the left
        scoreText = this.add.text(16, 16, 'Lydia: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        scoreText.setText('Lydia: ' + this.lydiaScore);
        // Display toms score on the right
        this.tomScoreText = this.add.text(650, 16, '0 :Tom', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        this.tomScoreText.setText(this.tomScore + ' :Tom');

        // Add and configure lydia
        player = this.physics.add.sprite(50, 500, 'lydia_base');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // Play beam down animation 
        beams = this.physics.add.staticGroup();
        var beam = beams.create(50,500,'beam').setScale(2).refreshBody();
        beam.anims.play('beam_down', true);

        // Add and configure tom
        var tom = toms.create(750, 500, 'tom_base').setScale(1.2);
        tom.setBounce(0.2);
        tom.setVelocityX(-160);
        tom.setCollideWorldBounds(true);
        // Play beam down animation
        var beam2 = beams.create(750,500,'beam').setScale(2).refreshBody();
        beam2.anims.play('beam_down', true);

        // Set a one minute timer
        timedEvent = this.time.delayedCall(60000, onEventBonus, [], this);
        // Display remaining time
        timeText = this.add.text(300, 16, 'Time: 60', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);

        // Add in toy collectibles
        collectibles = this.physics.add.group();
        var massager = collectibles.create(Phaser.Math.Between(50, 750), 100, 'massager');
        massager.setData('name', 'massager');
        var plug = collectibles.create(Phaser.Math.Between(50, 750), 100, 'plug');
        plug.setData('name', 'plug');
        var plug2 = collectibles.create(Phaser.Math.Between(50, 750), 100, 'plug_2');
        plug2.setData('name', 'plug_2');
        var rabbit = collectibles.create(Phaser.Math.Between(50, 750), 100, 'rabbit');
        rabbit.setData('name', 'rabbit');
        // Make them bounce around
        collectibles.children.iterate(function (child) {
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setVelocity(Phaser.Math.Between(-60, 60), 20);
          child.allowGravity = false;
        });

        // Colliders and overlaps
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(player, collectibles, this.hitToyLydia, null, this);
        this.physics.add.collider(toms, collectibles, this.hitToyTom, null, this);
        this.physics.add.collider(collectibles, worldLayer);

      }

  }

  update (time, delta) {

    // Move to next scene when transition completed
    this.transitionTime -= delta;
    if(this.shouldTransition && this.transitionTime <= 0){
      this.shouldTransition = false;
      this.transitionTime = 1000;
      // If on level 6, don't go to menu
      if(this.level6){
      this.level6 = false;
        this.scene.start('GameScene');
      }
      else{
        this.scene.start('MenuScene');
      }
    }
    // If transition begun don't update game any more
    if(this.shouldTransition){
      return;
    }

    // End game when transition completed
    if (gameOver && this.transitionTime <= 0){
        this.levelScore = 0;
        gameOver = false;
        cursors.left.reset();
        cursors.right.reset();
        cursors.up.reset();
        this.registry.set('HasItem', false);
        this.scene.start('GameOverScene');
    }

    // Level 0: if player has had more than 3 beers without sheewee = game over
    if (this.beersDrunk > 3){
      this.beersDrunk = 0;
      cursors.left.reset();
      cursors.right.reset();
      cursors.up.reset();
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;
      this.transitionTime = 1000;
      this.cameras.main.fade(1000);  
    }   

    // Control lydias movement
    var suffix = '';
    // Change animations if in bonus round
    if(this.registry.get('Level')==8){
      suffix = '_base';
    }
    // Moving to the left
    if (cursors.left.isDown){
        player.setVelocityX(-160*this.speedMult);
        player.anims.play('left'+suffix, true);
    }
    // Moving to the right
    else if (cursors.right.isDown){
        player.setVelocityX(160*this.speedMult);
        player.anims.play('right'+suffix, true);
    }
    // Stationary
    else{
        player.setVelocityX(0);
        player.anims.play('turn'+suffix);
    }
    // Jumping
    if (cursors.up.isDown && player.body.onFloor()){
        player.setVelocityY(-250);
    }

    // Make camera jump to 800x600 window with player
    if(this.registry.get("Level")!=5){
      this.cameras.main.centerOn(400 + Phaser.Math.FloorTo(player.x/800.)*800, 300 + Phaser.Math.FloorTo(player.y/600.)*600);
    }

    // Control enemy (flu or sunny) movements
    var enemy_left = 'flu_left';
    var enemy_right = 'flu_right';
    if(this.registry.get("Level")==2){
      enemy_left = 'sunny_move';
      enemy_right = 'sunny_move';
    }
    // Loop over enemied
    enemies.children.iterate(function (child) {
        // Make them move in one direction until they collide
        if (child.body.velocity.x === 0) {
            if(child.body.angle<1.5){
              child.setVelocityX(-80);
            }
            else if(child.body.angle>1.5){
              child.setVelocityX(80);
            }
        }
        // Play animations depending on direction
        if (child.body.velocity.x > 0) {
            child.anims.play(enemy_right, true);
        }
        else if(child.body.velocity.x < 0){
            child.anims.play(enemy_left, true);
        }
    });

    // Control follower movements
    var fol_right = 'rom_right';
    var fol_left = 'rom_left';
    var fol_turn = 'rom_turn';
    var follow = true;
    if(this.registry.get('Level')==7){
      fol_right = 'tom_right';
      fol_left = 'tom_left';
      fol_turn = 'tom_turn';
      // Tom only follows if lydia on the ground
      if(player.y < 500){
        follow = false;
      }
    }
    // Loop over followers
    followers.children.iterate(function (child) {
        if(follow){
          // Move in the direction of the player
          if (child.x < (player.x-2)) {
              child.setVelocityX(120);
          }
          else if(child.x > (player.x+2)){
              child.setVelocityX(-120);
          }
          else{
              child.setVelocityX(0);
          }
        }
        // Play animations based on direction of movement
        if (child.body.velocity.x > 0) {
            child.anims.play(fol_right, true);
        }
        else if(child.body.velocity.x < 0){
            child.anims.play(fol_left, true);
        }
        else{
            child.anims.play(fol_turn, true);
        }
    });

    // Control tom in bonus round
    toms.children.iterate(function (child) {
        // Change direction when colliding
        var nearest_x = 0;
        var nearest_y = 0;
        var min_dist = 99999;
        collectibles.children.iterate(function (item) {
          var dist = Phaser.Math.Distance.Between(item.x, item.y, child.x, child.y);
          if(dist < min_dist){
            min_dist = dist;
            nearest_x = item.x;
            nearest_y = item.y;
          }
        });
        if(child.x > (nearest_x+30)){
            child.setVelocityX(-200);
        }
        else if(child.x < (nearest_x-30)){
            child.setVelocityX(200);
        }
        else if (child.x < (nearest_x+10) && child.x > (nearest_x -10)){
          child.setVelocityX(0);
        }
        // Jump randomly
        if (child.body.onFloor() && child.y > (nearest_y+100)){
          child.setVelocityY(Phaser.Math.Between(-400, -200));
        }
        // Play animations based on movement
        if (child.body.velocity.x > 0) {
            child.anims.play('tom_right_base', true);
        }
        else if(child.body.velocity.x < 0){
            child.anims.play('tom_left_base', true);
        }
        else{
            child.anims.play('tom_turn_base', true);
        }
    });

    // Update time to train text for level 4
    if(this.registry.get("Level")==4 && !this.firstTrain){
      var elapsed = timedEvent.getElapsedSeconds();
      var timeLeft = 80. - elapsed;
      timeText.setText('Time to train: ' + timeLeft.toString().substr(0, 4));
    }

    // Update time remaining text for bonus round
    if(this.registry.get("Level")==8){
      var elapsed = timedEvent.getElapsedSeconds();
      var timeLeft = 60. - elapsed;
      timeText.setText('Time: ' + timeLeft.toString().substr(0, 4));
    } 

    // Mess with the display/camera when collecting tabs
    if(this.registry.get('Level')==1){
      if(this.tabs>=1){
        this.cameras.main.setZoom(1 - Math.abs(Math.sin(player.x/400)) * 0.2)
      }
      if(this.tabs>=2){
        var xcol = Phaser.Math.FloorTo((1+Math.sin(player.x/500)) * 127.5)
        var xcol2 = Phaser.Math.FloorTo((1+Math.sin((player.x-1500)/500)) * 127.5)
        var col1 = Phaser.Display.Color.RGBToString(0, 255-xcol, xcol, 100, '0x');
        var col2 = Phaser.Display.Color.RGBToString(xcol, 0, 255-xcol, 100, '0x');
        var col3 = Phaser.Display.Color.RGBToString(255-xcol2, xcol2, 0, 100, '0x');
        var col4 = Phaser.Display.Color.RGBToString(xcol, 255-xcol, xcol, 100, '0x');
        bkg.setTint(col3, col1, col4, col2);
      }
      if(this.tabs>=3){
        this.cameras.main.rotation = (550 - player.y)/300;
      }
      if(this.tabs>=4){
        this.cameras.main.shake(1000, 0.01);
      }
    }
    
      
  }
  
  // Controls behaviour when hitting collectible
  hitCollectible (player, collectible) {

    // Make the collectible dissapear
    collectible.disableBody(true, true);

    //  Add and update the score
    this.levelScore += 10;
    score = this.registry.get('Score') + this.levelScore;
    scoreText.setText('Score: ' + score);

    // If lydia doesn't have the shewee then add to number of beers drunk
    if(!this.registry.get('HasItem') && this.registry.get('Level')==0){
      this.beersDrunk += 1;
    }

    // If all exams passed then create diploma
    if (collectibles.countActive(true) === 0 && this.registry.get('Level')==3){
        var item = items.create(1000, 100, 'diploma');
    }

    // Make camera flash if baggy picked up
    if (this.registry.get('Level')==2){
      this.cameras.main.flash();
      this.speedMult += 0.3;
    }

    // Add to number of tabs picked up
    if (this.registry.get('Level')==1){
      this.tabs += 1;
    }

  }

  // Controls behaviour when lydia hits toy
  hitToyLydia (player, toy){

    // Make toy vanish
    toy.disableBody(true, true);
    // Add 1 to lydias score and update text
    this.lydiaScore += 1;
    scoreText.setText('Lydia: ' + this.lydiaScore);
    // Add and configure new toy of the same type
    var newToy = collectibles.create(Phaser.Math.Between(25, 775), 0, toy.getData('name'));
    newToy.setData('name', toy.getData('name'));
    newToy.setBounce(1);
    newToy.setCollideWorldBounds(true);
    newToy.setVelocity(Phaser.Math.Between(-60, 60), 20);
    newToy.allowGravity = false;
    collectibles.remove(toy);

  }

  // Controls behaviour when tom hits toy
  hitToyTom (follower, toy){

    // Make toy vanish
    toy.disableBody(true, true);
    // Add 1 to toms score and update text
    this.tomScore += 1;
    this.tomScoreText.setText(this.tomScore + ' :Tom');
    // Add and configure new toy of same type
    var newToy = collectibles.create(Phaser.Math.Between(25, 775), 0, toy.getData('name'));
    newToy.setData('name', toy.getData('name'));
    newToy.setBounce(1);
    newToy.setCollideWorldBounds(true);
    newToy.setVelocity(Phaser.Math.Between(-60, 60), 20);
    newToy.allowGravity = false;
    collectibles.remove(toy);

  }

  // Controls behaviour when lydia hits bomb
  hitBomb (player, bomb) {

    // Begin game over sequence
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    this.transitionTime = 1000;
    this.cameras.main.fade(1000);  

  }

  // Contols behaviour when lydia collects item
  hitItem (player, item) {

    // Make item dissapear
    item.disableBody(true, true);
    // Add to score and update text
    this.levelScore += 30;
    score = this.registry.get('Score') + this.levelScore;
    scoreText.setText('Score: ' + score);
    // Set has item flag (makes door work)
    this.registry.set('HasItem', true);
    
  }

  // Controls behaviour when lydia hits door
  hitDoor (player, door) {

    // If lydia has item then begin transition to next scene
    if(this.registry.get('HasItem') && !this.shouldTransition){
      cursors.left.reset();
      cursors.right.reset();
      cursors.up.reset();
      score = this.registry.get('Score') + this.levelScore;
      this.registry.set('Score', score);
      this.registry.set('HasItem', false);
      // Increment level if level is not 6
      if(this.registry.get('Level') == 6){
        this.level6 = true;;
      }
      this.registry.set('Level', this.registry.get('Level')+1);
      this.shouldTransition = true;
      this.transitionTime = 1000;
      this.physics.pause();
      this.cameras.main.fade(1000);  
    }
    // Start timer on first hit during level 4
    else if(this.registry.get("Level")==4 && this.firstTrain){
      timedEvent = this.time.delayedCall(80000, onEvent, [], this);
      this.firstTrain = false;
      timeText = this.add.text(400, 16, 'Time to train: 80', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
    }
    // Don't require item for level 6.5 - meeting tom
    else if(this.registry.get('Level')==7 && !this.shouldTransition){
      cursors.left.reset();
      cursors.right.reset();
      cursors.up.reset();
      score = this.registry.get('Score') + this.levelScore;
      this.registry.set('Score', score);
      this.registry.set('HasItem', false);
      this.shouldTransition = true;
      this.transitionTime = 1000;
      this.physics.pause();
      this.cameras.main.fade(1000);  
    }
    // Otherwise don't do anything
    else{
      return;
    }
  }

  // Controls behaviour when lydia collides with enemy
  hitEnemy (player, enemy) {

    // Begin game over transition
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    this.transitionTime = 1000;
    this.cameras.main.fade(1000);

  }

}

// Controls behaviour when level 4 timer ends
function onEvent ()
{
    // Begin game over transition
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    this.transitionTime = 1000;
    this.cameras.main.fade(1000);
}

// Controls behaviour when bonus level timer ends
function onEventBonus() 
{
    // Begin new scene transition
    cursors.left.reset();
    cursors.right.reset();
    cursors.up.reset();
    this.registry.set('HasItem', false);
    // Work out who won
    if(this.lydiaScore > this.tomScore){
      this.registry.set('Level', this.registry.get('Level')+1);
    }
    if(this.lydiaScore <= this.tomScore){
      this.registry.set('Level', this.registry.get('Level')+2);
    }
    this.shouldTransition = true;
    this.transitionTime = 1000;
    this.physics.pause();
    this.cameras.main.fade(1000);
}
