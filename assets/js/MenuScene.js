class MenuScene extends Phaser.Scene{

  constructor () {
    super('MenuScene');
  } 

  preload () {
  }

  create () {

      // Use X key to continue with game
      this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      this.tomKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
      this.blink = 1000;
      this.transitionTime = 1000;
      this.shouldTransition = false;

      //------------------------------------------------------------------------------------
      //                               START UP SCREEN
      //------------------------------------------------------------------------------------

      // Configure meny differently for each level
      if(this.registry.get('Level') == -1){
        // Add background image
        this.add.image(400, 300, 'start_screen');
        this.animTime = 0;
        // Add and center main body text
        this.starringText = this.add.bitmapText(100, 200, 'font', 'STARRING\n\nLYDIA MAPSTONE AND TOM BROOKS', 20, 1);
        this.starringText.setX((800-this.starringText.width)/2.)
        // Add images of lydia and tom
        this.physics.add.staticGroup().create(240, 420, 'lydia').setScale(3).anims.play('turn');
        this.physics.add.staticGroup().create(580, 410, 'tom').setScale(3.7).anims.play('tom_turn');
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO BEGIN', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 0: BESTIVAL
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 0){
        // Add background image
        this.add.image(400, 300, 'menu_year0');
        // Add and center main body text
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 160, 'font', "OH NO! YOU HAVE BEEN TELEPORTED BACK TO THE START\n\nOF THE RELATIONSHIP... WITHOUT LYDIA!\n\nYOU ARE AT BESTIVAL AND HAVE JUST STARTED DATING.\n\nFIND THE SHEWEE TO GET TO THE NEXT YEAR.\n\nWATCH HOW MANY BEERS YOU DRINK, WITHOUT THE\n\nSHEWEE YOU MIGHT WET YOURSELF!\n\n\nUSE THE ARROW KEYS TO MOVE.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 160, 'font', "OH NO! YOU HAVE BEEN TELEPORTED BACK TO THE START\n\nOF THE RELATIONSHIP... WITHOUT TOM!\n\nYOU ARE AT BESTIVAL AND HAVE JUST STARTED DATING.\n\nFIND THE SHEWEE TO GET TO THE NEXT YEAR.\n\nWATCH HOW MANY BEERS YOU DRINK, WITHOUT THE\n\nSHEWEE YOU MIGHT WET YOURSELF!\n\n\nUSE THE ARROW KEYS TO MOVE.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'shewee').setScale(3).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'beer').setScale(3).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 1: BRISTOL
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 1){
        // Add background image
        this.add.image(400, 300, 'menu_year1');
        // Add and center main body text
        this.starringText = this.add.bitmapText(20, 160, 'font', "CONGRATULATIONS! YOU MADE IT TO THE NEXT YEAR\n\nOF THE RELATIONSHIP.\n\nYOU ARE STUCK IN THE GOLDNEY GROTTO AND YOU LEFT \n\nSNOWFLAKE IN WILLS!\n\nMAKE SURE YOU DON'T CATCH FRESHERS FLU!\n\nALSO, SOMEONE LEFT A BUNCH OF ACID LYING AROUND,\n\nTHAT SHIT CAN MESS WITH YOUR MIND.", 16, 1);
        this.starringText.setX((800-this.starringText.width)/2.);
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'snowflake').setScale(3).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'acid').setScale(2).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      } 

      //------------------------------------------------------------------------------------
      //                            LEVEL 2: MANCHESTER
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 2){
        // Add background image
        this.add.image(400, 300, 'menu_year2');
        // Add and center main body text
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 140, 'font', "YOU FOUND LYDIAS FAVOURITE STUFFED TOY!\n\nALL OF THE YEARS OF DIRT AND NEGLECT HAVE MADE\n\nSUNNY MUTATE INTO A JEALOUS MONSTER.\n\nHE HAS STOLEN LYDIAS KINDLE AND IS TERRORIZING\n\nMANCHESTER!\n\nGET IT BACK TO GET TO THE NEXT YEAR.\n\nTHIS MD ON THE FLOOR HAS BEEN CUT WITH SPEED,\n\nMIGHT HELP, OR MIGHT MAKE THINGS HARDER.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 140, 'font', "YOU FOUND YOUR FAVOURITE STUFFED TOY!\n\nALL OF THE YEARS OF DIRT AND NEGLECT HAVE MADE\n\nSUNNY MUTATE INTO A JEALOUS MONSTER.\n\nHE HAS STOLEN YOUR KINDLE AND IS TERRORIZING\n\nMANCHESTER!\n\nGET IT BACK TO GET TO THE NEXT YEAR.\n\nTHIS MD ON THE FLOOR HAS BEEN CUT WITH SPEED,\n\nMIGHT HELP, OR MIGHT MAKE THINGS HARDER.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'kindle').setScale(2).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'baggy').setScale(2.5).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 3: EXAMS
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 3){
        // Add background image
        this.add.image(400, 300, 'menu_year3');
        // Add and center main body text
        this.starringText = this.add.bitmapText(20, 180, 'font', "YOU HAVE NEARLY MADE IT THROUGH UNIVERSITY!\n\nBUT THERE ARE STILL EXAMS TO GO,\n\nTHIS IS GOING TO BE A TOUGH ONE TO GET THROUGH!\n\nPASS 4 EXAMS TO GET YOUR DIPLOMA.\n\nSECOND YEAR DID NOT GO TOO WELL SO YOU\n\nCANNOT AFFORD TO FAIL ANY.", 16, 1);
        this.starringText.setX((800-this.starringText.width)/2.);
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'diploma').setScale(1.5).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'passed_exam').setScale(2).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                            LEVEL 4: EDINBURGH
      //------------------------------------------------------------------------------------
    
      if(this.registry.get('Level') == 4){
        // Add background image
        this.add.image(400, 300, 'menu_year4');
        // Add and center main body text
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 140, 'font', "AFTER ALL THAT HARD WORK YOU GOT A FIRST!\n\nLYDIA HAS CHOSEN TO DO A MASTERS IN\n\nEDINBURGH.\n\nAFTER A NICE TRIP TO BEN NEVIS YOU REALISE YOU\n\nLEFT YOUR COOKED BREAKFAST AT THE TOP!\n\nHURRY, GET IT BEFORE THE TRAIN LEAVES.\n\nYOU LITTERED THE MOUNTAIN WITH LEGGINGS,\n\nYOU SHOULD PICK THEM UP.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 140, 'font', "AFTER ALL THAT HARD WORK YOU GOT A FIRST!\n\nYOU HAVE CHOSEN TO DO A MASTERS IN\n\nEDINBURGH.\n\nAFTER A NICE TRIP TO BEN NEVIS YOU REALISE YOU\n\nLEFT YOUR COOKED BREAKFAST AT THE TOP!\n\nHURRY, GET IT BEFORE THE TRAIN LEAVES.\n\nTOM LITTERED THE MOUNTAIN WITH LEGGINGS,\n\nYOU SHOULD PICK THEM UP.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'breakfast').setScale(2.5).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'leggings').setScale(3).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                            LEVEL 5: FERMILAB
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 5){
        // Add background image
        this.add.image(400, 300, 'menu_year5');
        // Add and center main body text
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 160, 'font', "LYDIA COMPLETED HER MASTERS! NEXT UP... PHD.\n\nBUT NOT WITHOUT A SURVIVAL KIT!\n\nYOU LEFT IT IN FERMILAB BUT THE EXPERIMENTS BROKE\n\nAND RELEASED ALL THE NEUTRINOS AND PROTONS.\n\nCOLLECT UP ALL THE NEUTRINOS SO YOU CAN FINISH\n\nYOUR THESIS.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 160, 'font', "YOU COMPLETED YOUR MASTERS! NEXT UP... PHD.\n\nBUT NOT WITHOUT A SURVIVAL KIT!\n\nTOM LEFT IT IN FERMILAB BUT THE EXPERIMENTS BROKE\n\nAND RELEASED ALL THE NEUTRINOS AND PROTONS.\n\nCOLLECT UP ALL THE NEUTRINOS SO TOM CAN FINISH\n\nHIS THESIS.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'survival_kit').setScale(1.7).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'nu').setScale(3).refreshBody().anims.play('oscillate', true);
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 6: LONDON
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 6){
        // Add background image
        this.add.image(400, 300, 'menu_year6');
        // Add and center main body text
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 160, 'font', "YOU HAVE ALMOST MADE IT TO VALENTINES 2K19!\n\nLYDIA IS GOING TO GO SEE YOU BUT LEFT THE\n\nPLANE TICKETS IN HER OFFICE.\n\nGO GET THEM, BUT DONT LET THE KINKY ROMANIAN\n\nWHIP YOU!\n\nYOU SHOULD PROBABLY ALSO COLLECT UP ALL THE\n\nSPIRULINA LYDIA LEFT EVERYWHERE.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 160, 'font', "YOU HAVE ALMOST MADE IT TO VALENTINES 2K19!\n\nYOU ARE GOING TO GO SEE TOM BUT YOU LEFT THE\n\nPLANE TICKETS IN YOUR OFFICE.\n\nGO GET THEM, BUT DONT LET THE KINKY ROMANIAN\n\nWHIP YOU!\n\nYOU SHOULD PROBABLY ALSO COLLECT UP ALL THE\n\nSPIRULINA YOU LEFT EVERYWHERE.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(250, 450, 'font', 'FIND         COLLECT     ', 20);
        this.findText.setTint(0xFFFF00);
        this.findText.setX((800-this.findText.width)/2.);
        // Add images
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+170, this.findText.y, 'tickets').setScale(2.5).refreshBody();
        this.physics.add.staticGroup().create(((800-this.findText.width)/2.)+470, this.findText.y, 'algae').setScale(3).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                               GAME COMPLETE
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 7){
        // Add background image
        this.add.image(400, 300, 'menu_complete');
        if(this.registry.get('Score')>=740){
          // Add and center main body text
          this.starringText = this.add.bitmapText(20, 400, 'font', "YOU GOT ENOUGH POINTS TO UNLOCK THE BONUS ROUND!\n\nCONTINUE FOR YOUR CHANCE TO WIN A PRIZE", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
          // Add and center continue text
          this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO CONTINUE', 16);
          this.pressX.setX((800-this.pressX.width)/2.);
        }
        else{
          // Add and center main body text
          this.starringText = this.add.bitmapText(20, 400, 'font', "YOU DID NOT GET ENOUGH POINTS TO UNLOCK THE\n\nBONUS ROUND!\n\nYOU WILL HAVE TO PLAY AGAIN IF YOU WANT A PRIZE.", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
          // Add and center continue text
          this.pressX = this.add.bitmapText(230, 550, 'font', 'PRESS X TO RESTART GAME', 16);
          this.pressX.setX((800-this.pressX.width)/2.);
        }
      }

      //------------------------------------------------------------------------------------
      //                               BONUS LEVEL
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 8){
        // Add background image
        this.add.image(400, 300, 'menu_bonus');
        // Add and center main body text
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 180, 'font', "WELL DONE FOR MAKING IT TO THE BONUS ROUND!\n\nYOU AND LYDIA ARE FINALLY BACK TOGETHER AND THINGS\n\nARE STARTING TO HEAT UP!\n\nIF YOU CAN COLLECT MORE TOYS THAN LYDIA IN\n\nONE MINUTE THEN YOU WIN A PRIZE!", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 180, 'font', "WELL DONE FOR MAKING IT TO THE BONUS ROUND!\n\nYOU AND TOM ARE FINALLY BACK TOGETHER AND THINGS\n\nARE STARTING TO HEAT UP!\n\nIF YOU CAN COLLECT MORE TOYS THAN TOM IN\n\nONE MINUTE THEN YOU WIN A PRIZE!", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add, center and color yellow the find/collect text
        this.findText = this.add.bitmapText(120, 450, 'font', 'COLLECT', 20);
        this.findText.setTint(0xFFFF00);
        // Add images
        this.physics.add.staticGroup().create(320, this.findText.y, 'plug').setScale(2).refreshBody();
        this.physics.add.staticGroup().create(420, this.findText.y, 'massager').setScale(2).refreshBody();
        this.physics.add.staticGroup().create(520, this.findText.y, 'plug_2').setScale(2).refreshBody();
        this.physics.add.staticGroup().create(620, this.findText.y, 'rabbit').setScale(2).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(270, 550, 'font', 'PRESS X TO START', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                            BONUS LEVEL PASSED
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 9){
        // Add background image
        this.add.image(400, 300, 'menu_bonus');
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 140, 'font', "YOU BEAT LYDIA!\n\nYOU HAVE FINALLY PROVEN THAT YOU ARE THE BEST\n\nIN BED.\n\nSEND CODE TOMSDAWORST TO TOM ON WHATSAPP TO\n\nCLAIM YOUR PRIZE!", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 140, 'font', "YOU BEAT TOM!\n\nYOU HAVE FINALLY PROVEN THAT YOU ARE THE BEST\n\nIN BED.\n\nSEND CODE TOMSDABEST TO TOM ON WHATSAPP TO\n\nCLAIM YOUR PRIZE!", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add images
        this.physics.add.staticGroup().create(300, 420, 'lydia_nc').setScale(2.5).refreshBody();
        this.physics.add.staticGroup().create(520, 410, 'tom_nc').setScale(3).refreshBody();
        this.physics.add.staticGroup().create(180, 420, 'trophy').setScale(0.3).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(230, 550, 'font', 'PRESS X TO RESTART GAME', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }

      //------------------------------------------------------------------------------------
      //                            BONUS LEVEL FAILED
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 10){
        // Add background image
        this.add.image(400, 300, 'menu_bonus');
        if(this.registry.get('PlayTom')){
          this.starringText = this.add.bitmapText(20, 140, 'font', "LYDIA BEAT YOU!\n\nSHE MADE YOU ORGASM SO MUCH THAT YOU WERE LEFT\n\nA QUIVERING WRECK.\n\nYOU WILL HAVE TO START OVER FOR ANOTHER CHANCE\n\nAT THE PRIZE!", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        else{
          this.starringText = this.add.bitmapText(20, 140, 'font', "TOM BEAT YOU!\n\nHE MADE YOU ORGASM SO MUCH THAT YOU WERE LEFT\n\nA QUIVERING WRECK.\n\nYOU WILL HAVE TO START OVER FOR ANOTHER CHANCE\n\nAT THE PRIZE!", 16, 1);
          this.starringText.setX((800-this.starringText.width)/2.);
        }
        // Add images
        this.physics.add.staticGroup().create(300, 420, 'lydia_nc').setScale(2.5).refreshBody();
        this.physics.add.staticGroup().create(520, 410, 'tom_nc').setScale(3).refreshBody();
        this.physics.add.staticGroup().create(620, 420, 'trophy').setScale(0.3).refreshBody();
        // Add and center continue text
        this.pressX = this.add.bitmapText(230, 550, 'font', 'PRESS X TO RESTART GAME', 16);
        this.pressX.setX((800-this.pressX.width)/2.);
      }


  }

  update(time, delta) {
      
        // Control transition from start screen (give time for beam animation
        this.animTime -= delta;
        if(this.registry.get('StartGame') && this.animTime < 0){
            this.registry.set('Level', 0);
            this.registry.set('StartGame', false);
            this.scene.start('MenuScene');
        }

        // Control blinking of continue text
        this.blink -= delta;
        if (this.blink < 0) {
            this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }

        // Start next scene transition if start key is pressed
        if (this.startKey.isDown) {
            this.startKey.reset();
            // If we're on the start screen play beam animation
            if(this.registry.get('Level') == -1){
              this.registry.set('StartGame', true);
              this.registry.set('PlayTom', false);
              this.animTime = 700;
              beams = this.physics.add.staticGroup();
              var beam = beams.create(240,340,'beam').setScale(4).refreshBody();
              beam.anims.play('beam_down', true);
              this.cameras.main.fade(700);
            }
            // Otherwise just fade out
            else{
              this.shouldTransition = true;
              this.transitionTime = 1000;
              this.cameras.main.fade(1000);  
            }
        }

        // Start next scene transition if start key is pressed
        if (this.tomKey.isDown) {
            this.tomKey.reset();
            this.registry.set('StartGame', true);
            this.registry.set('PlayTom', true);
            this.animTime = 700;
            beams = this.physics.add.staticGroup();
            var beam = beams.create(580,340,'beam').setScale(4).refreshBody();
            beam.anims.play('beam_down', true);
            this.cameras.main.fade(700);
        }

        // Move to next scene once transition is complete
        this.transitionTime -= delta;
        if(this.shouldTransition && this.transitionTime < 0){
            // If bonus round unlocked
            if(this.registry.get('Level') == 7 && this.registry.get('Score') >= 740){
              this.registry.set('Level', 8);
              this.scene.start('MenuScene');
            }
            // Restart game
            else if(this.registry.get('Level') == 7 || this.registry.get('Level') == 9 || this.registry.get('Level') == 10){
              this.registry.set('Score', 0);
              this.registry.set('Level', -1);
              this.scene.start('MenuScene');
            }
            // Move to next level
            else{
              this.scene.start('GameScene');
            }
        }
  } 

}
