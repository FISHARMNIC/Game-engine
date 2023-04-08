class ARectangle extends Actor {
    
    color;
    
    constructor(x, y, width = 100, height = 100, color = "red") {
        super(x, y)

        this.width = width;
        this.height = height;
        this.color = color;
    }

    render() {
        Game.context.beginPath();
        Game.context.rect(this.x, this.y, this.width, this.height);
        Game.context.fillStyle = this.color;
        Game.context.fill();
        Game.context.lineWidth = 0;
        Game.context.stroke();
    }
}