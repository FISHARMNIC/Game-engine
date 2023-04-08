Game.init({
    canvas: "game",
    render: renderLoop,
    width: 400,
    height: 400,
});

var dice = new AImage("dice.png", 250, 250);
var dino = new AImage("dino.png", 150, 250);

dice.reSize(200,200)
dino.reSize(200, 200)

var speech_dice = new AText("", 20, 30);
var speech_dino = new AText("", 20, 60);
var speech_coll = new AText("", 20, 90);

//var test = new ARectangle()

function renderLoop()
{
    speech_dice.contents = "Dice touching mouse: " + dice.isTouchingMouse();
    speech_dino.contents = "Dino touching mouse: " + dino.isTouchingMouse();
    speech_coll.contents = "Dino touching dice: " + dino.isTouching(dice);
}

Game.onKey('ArrowLeft', () => {dino.x -= 5})
Game.onKey('ArrowRight', () => {dino.x += 5})

Game.run()