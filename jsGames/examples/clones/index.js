Game.init({
    canvas: "game",
    render: renderLoop,
    width: 400,
    height: 400,
});

var circle = new ACircle(20, 200, 200, "red")

circle.clone(36)
circle.clonesDo((clone, id) => {
    clone.moveTo(Game.randomNumber(0, 400), Game.randomNumber(0, 400))
    clone.speed = 0;
})

function renderLoop() {
    circle.clonesDo((clone, id) => {
        var oscillate = Math.sin(performance.now() / 1000)
        clone.move(oscillate)
        clone.filter = `hue-rotate(${id * 10 * Math.cos(oscillate)}deg)`
        clone.pointTowards(Game.mouse.x, Game.mouse.y)
    })
}

Game.run();