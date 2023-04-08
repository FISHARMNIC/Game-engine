Game.init({
    canvas: "game",
    render: renderLoop,
    width: 400,
    height: 400,
});

var dice = new AImage("dice.png", 250, 200);
var dino = new AImage("dino.png", 150, 200);

dice.reSize(200,200)
dino.reSize(200, 200)

var speech_dice = new AText("", 20, 30);
var speech_dino = new AText("", 20, 60);

function renderLoop()
{
    speech_dice.contents = "Dice touching mouse: " + dice.touchingMouse();
    speech_dino.contents = "Dino touching mouse: " + dino.touchingMouse();
}

Game.run()