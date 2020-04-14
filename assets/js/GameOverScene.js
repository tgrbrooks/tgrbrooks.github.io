class GameOverScene extends Phaser.Scene{

  constructor () {
    super('GameOverScene');
  } 

  preload () {
  }

  create () {

      // Create continue key
      this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

      this.blink = 1000;
      this.transitionTime = 1000;
      this.shouldTransition = false;

      // Add background image
      this.add.image(400, 300, 'gameover_screen');

      //------------------------------------------------------------------------------------
      //                              LEVEL 0: BESTIVAL
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 0){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', 'OH DEAR! YOU DRANK ONE TOO MANY BEERS...\n\nWITHOUT THE PORTALOO KEY\n\nYOU WET YOURSELF IN FRONT OF EVERYONE.\n\nHOW EMBARRASING!', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      }

      //------------------------------------------------------------------------------------
      //                              LEVEL 1: BRISTOL
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 1){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', 'GROSS! YOU CAUGHT FRESHERS FLU.\n\nNOW YOU ARE STUCK IN BED WHILE ALL YOUR FRIENDS\n\nGO OUT AND HAVE FUN.', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      } 

      //------------------------------------------------------------------------------------
      //                              LEVEL 2: MANCHESTER
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 2){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', 'UH OH! SUNNY ATE YOU!\n\nSOMEONE PROBABLY SHOULD HAVE WASHED OR\n\nTHROWN AWAY THAT BIRD AGES AGO...', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      } 

      //------------------------------------------------------------------------------------
      //                              LEVEL 3: EXAMS
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 3){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', 'YOU FAILED AN EXAM!\n\nYOU CAN EITHER GRADUATE WITH A THIRD AND\n\nNEVER ACHIEVE YOUR DREAM OF WORLD DOMINATION,\n\nOR YOU COULD REPEAT A YEAR...', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      } 

      //------------------------------------------------------------------------------------
      //                              LEVEL 4: EDINBURGH
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 4){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', 'AHHRGH! YOU MISSED THE TRAIN.\n\nYOU SHOULD HAVE RUN DOWN THE MOUNTAIN FASTER!\n\nLOOKS LIKE YOU ARE STUCK IN FORT WILLIAM FOREVER.', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      } 

      //------------------------------------------------------------------------------------
      //                              LEVEL 5: FERMILAB
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 5){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', 'SILLY LYDIA! YOU TRIED TO PICK UP A PROTON\n\nAND GOT IRRADIATED.\n\nYOU GREW AN EXTRA FOOT AND NOW TOM WILL PROBABLY\n\nNOT BE ATTRACTED TO YOU ANY MORE.', 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      } 

      //------------------------------------------------------------------------------------
      //                              LEVEL 6: LONDON
      //------------------------------------------------------------------------------------

      if(this.registry.get('Level') == 6){
        // Add and center failure message
        this.failText = this.add.bitmapText(20, 240, 'font', "YOU GOT MUGGED!\n\nYOU LOST YOUR PLANE TICKETS...\n\nNOW YOU WON'T BE ABLE TO GET TO TOM.", 16, 1);
        this.failText.setX((800-this.failText.width)/2.)
      } 
      
      // Add and center continue text
      this.pressX = this.add.bitmapText(200, 550, 'font', 'PRESS X TO RESTART LEVEL', 16, 1);
      this.pressX.setX((800-this.pressX.width)/2.);

  }

  update(time, delta) {

        // Control flashing of continue text
        this.blink -= delta;
        if (this.blink < 0) {
            this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }

        // If start key is pressed begin scene transition
        if (this.startKey.isDown) {
            this.startKey.reset();
            this.shouldTransition = true;
            this.transitionTime = 1000;
            this.cameras.main.fade(1000);
        }

        // Go back to menu when transition completed
        this.transitionTime -= delta;
        if(this.shouldTransition && this.transitionTime < 0){
          this.scene.start('MenuScene');
        }
  } 

}
