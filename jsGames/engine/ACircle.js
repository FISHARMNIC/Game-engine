class ACircle extends Actor {
    radius;
    color;
    constructor(radius, x, y, color = "red") {
        super(x, y)

        this.radius = radius;
        this.color = color
    }

    render() {
        Game.context.beginPath();
        Game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        Game.context.fillStyle = this.color;
        Game.context.fill();
        Game.context.lineWidth = 0;
        Game.context.stroke();
    }
}