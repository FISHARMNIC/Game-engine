class AText extends Actor {

    contents;
    color;
    font;

    constructor(text, x, y, color = "red", font = "30px serif") {
        super(x, y);

        this.contents = text;
        this.color = color;
        this.font = font;
    }

    render() {
        var col = Game.context.fillStyle;
        Game.context.font = this.font;
        Game.context.fillStyle = this.color;
        Game.context.fillText(this.contents, this.x, this.y)
        Game.context.fillStyle = col;
    }

}