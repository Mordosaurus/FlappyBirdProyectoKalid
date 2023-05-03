import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
import Score from "../features/score";
import FlappyBirdScene from "./flappy-bird-scene";

export default class GameScene extends FlappyBirdScene{
    constructor(config) {
        super("GameScene", config);
        this.bird = null;
        this.pipeSystem = null;
        this.score = null;
        this.gameOver = false;
        this.birdCollision = null;
    }
    
    preload(){
        this.load.image("bird", "assets/bird.png")
        this.load.image("pipe", "assets/pipe.png")
        this.load.image("pause_button", "assets/pause.png")
      }

    create(){
        super.create();
        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.layers.game.add(this.bird);
        this.pipeSystem = new PipeSystem(this, this.layers.game);
      
        //añadir "body" le da un Rigid Body al objeto, para poder asignarle valores de velocidad y gravedad
        this.bird.body.velocity.x = 10;        
        this.birdCollision = this.physics.add.collider(this.bird, this.pipeSystem.group, this.gameOver, null, this);
        //Limita el movimiento al canvas
        //this.bird.body.setCollideWorldBounds(true);
        this.score = new Score(this, 16, 16, this.layers.ui);
        this.pauseButton = this.add.image(this.config.width -10, 10, "pause_button").setOrigin(1, 0);
        this.pauseButton.setScale(3);
        this.pauseButton.setInteractive();

        this.pauseButton.on("pointerup", this.pause, this);

        this.pipeSystem.onPipeExit = ()=>{
          this.score.addScore(1);
        }
        this.isGameOver = false;
        this.isPaused = false;
        this.pipeSystem.start();


        
    }

    update(time, delta){
      if(this.isGameOver || this.isPaused) return;

        this.pipeSystem.update();
        this.bird.checkOffbounds(() => {
          this.gameOver();
        });
      }

    gameOver(){
      this.pipeSystem.stop();
      this.birdCollision.destroy();
      this.isGameOver = true;
      this.pauseButton.setVisible(false);
      this.layers.game.bringToTop(this.bird);
      this.bird.triggerLoseAnimation(()=> {
        this.score.checkHighScore();
         //Reinicia la escena
         this.scene.restart();
      });

    }

    pause() {
      this.physics.pause();
      this.pipeSystem.pause();
      this.isPaused = true;
      this.pauseButton.setVisible(false);
    }
}