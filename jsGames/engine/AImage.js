class AImage extends Actor {

    img;

    constructor(source, x, y) {
        super(x, y);

        this.img = new Image();
        this.img.src = source;
        this.img.hidden = true

        document.body.append(this.img);
    }

    render(context = Game.context) {
        context.setTransform(1, 0, 0, 1, this.x, this.y); // sets scale and origin
        context.rotate(this.direction);
        context.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    touchingMouse() {
        var coll_canvas = document.createElement('canvas');
        coll_canvas.width = Game.canvas.width;
        coll_canvas.height = Game.canvas.height;

        var coll_context = coll_canvas.getContext('2d')
        this.render(coll_context);
        var coll_arr = coll_context.getImageData(Game.mouse.x, Game.mouse.y, 1, 1).data;
        return coll_arr[3] != 0; // rgba <- a
    }

    // isColliding(actor2) {
    //     if(this.)
    // }
}