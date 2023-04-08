Game.init({
    canvas: "game",
    render: renderLoop,
    width: 800,
    height: 800,
});

var jet = new AImage("assets/fighter.png", 200, 200); //new Actor(Actors.Image, "assets/fighter.png", 200, 200)
var text = new AText("hello", 20, 30, "red");
var map = new AImage("assets/map.jpeg", 100, 100);
var trueOrigin = {x: 0, y: 0}

init_plane(jet);
map.reSize(3000, 3000);
map.setLayer(0);

function renderLoop() {

    calculateThrust(jet);
    calculateAltitude(jet);

    jet.direction += jet.rotational;
    if(Game.keyData['ArrowLeft'] == 0 && Game.keyData['ArrowRight'] == 0)
    {
        jet.rotation /= jet.rotational / (3 * (jet.rotational - 100));
    }

    trueOrigin.x -= jet.movement_vector.x;
    trueOrigin.y -= jet.movement_vector.y;

    map.moveTo(trueOrigin.x, trueOrigin.y);
    text.contents = parseInt((jet.throttle * 10));
    jet.filter = `drop-shadow(0px ${jet.altitude}px ${jet.altitude / 25}px rgba(0,0,0,${1.5 - jet.altitude / jet.max_altitude}))`;

}

Game.run();