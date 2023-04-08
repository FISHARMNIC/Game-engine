window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

class Game {
    static canvas;
    static context;

    static renderFuntion;
    static allActors = [];

    static onkeyfunctions = {};
    static keyData = {
        "ArrowLeft": 0,
        "ArrowRight": 0,
        "ArrowUp": 0,
        "ArrowDown": 0
    };

    // from: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    static _fps_throttle = {
        fps: 60,
        fpsInterval: 0,
        startTime: 0,
        now: 0,
        then: 0,
        elapsed: 0
    };

    static mouse = { x: 0, y: 0 };

    static init({ canvas, render = () => { }, width, height, frameRate = 30, kbEvents = true }) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext("2d");
        this.renderFuntion = render;
        this._fps_throttle.fps = frameRate;

        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.border = "";

        this.canvas.addEventListener('mousemove', (e) => {
            Game.mouse.x = e.offsetX,
                Game.mouse.y = e.offsetY
        })

        // init keypress obj
        for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
            this.keyData[String.fromCharCode(i)] = 0;
        }

        // init keyboard events
        if (kbEvents) {
            document.addEventListener('keydown', function (event) {
                Game.keyData[event.key] = 1;
                if (Object.keys(Game.onkeyfunctions).includes(event.key)) {
                    Game.onkeyfunctions[event.key]();
                }
            });

            document.addEventListener('keyup', function (event) {
                Game.keyData[event.key] = 0;
            });
        }

        //myRequire("../engine/Actor.js")
        //myRequire("../engine/AImage.js")

    }

    static _renderFrame() {
        requestAnimationFrame(Game._renderFrame);
        Game._fps_throttle.now = performance.now();
        Game._fps_throttle.elapsed = Game._fps_throttle.now - Game._fps_throttle.then;
        if (Game._fps_throttle.elapsed > Game._fps_throttle.fpsInterval) {

            Game._fps_throttle.then = Game._fps_throttle.now - (Game._fps_throttle.elapsed % Game._fps_throttle.fpsInterval);

            // ----- render -----

            Game.context.beginPath();
            Game.context.fillStyle = "rgba(0, 0, 0, 255)";
            Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
            Game.context.stroke();

            // render, optimize this loop maybe
            for (var i = 0, l = Game.allActors.length; i < l; i++) {
                var current = Game.allActors[i];
                current.render_host();
                // part one collision, part 2 is comparing pixel data
                // if (Game.mouse.x >= current.x && Game.mouse.y >= current.y && Game.mouse.x <= (current.x + current.width) && Game.mouse.y <= (current.y + current.width)) {
                //     console.log(current.actorIndex)
                // }
            }

            Game.renderFuntion()


        }
    }

    static run() {
        Game._fps_throttle.fpsInterval = 1000 / Game._fps_throttle.fps;
        Game._fps_throttle.then = performance.now();
        Game._fps_throttle.startTime = Game._fps_throttle.then;
        this._renderFrame();
    }


    static onKey(letter, callback) {
        this.onkeyfunctions[letter] = callback;
    }

    static onMouseMove(callback) {
        this.canvas.addEventListener('mousemove', callback);
    }

    // ------- easy functions ------

    static randomNumber(from, to) {
        return Math.floor((Math.random() * (to + 1)) + from);
    }

    static pixelColorAt(x, y) {
        return this.context.getImageData(x, y, 1, 1).data
    }

    static newHiddenCanvas() {
        var coll_canvas = document.createElement('canvas');
        coll_canvas.width = Game.canvas.width;
        coll_canvas.height = Game.canvas.height;
        return coll_canvas
    }
}

class Actor {
    x;
    y;
    width = 100;
    height = 100;
    direction = 0;
    actorIndex;
    filter;
    clones = [];

    constructor(x, y) {
        this.x = x;
        this.y = y;
        Game.allActors.push(this)
        this.actorIndex = Game.allActors.length - 1
    }

    move(amt) {
        this.x += amt * Math.cos(this.direction);
        this.y += amt * Math.sin(this.direction);
    }

    reSize(w, h) {
        this.width = w;
        this.height = h;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    setLayer(layer) {
        var e = Game.allActors[this.actorIndex];
        Game.allActors.splice(this.actorIndex, 1);
        Game.allActors.splice(layer, 0, e);
    }

    clone(amount = 1) {
        // class clone
        for (; amount > 0; amount--) {
            var n = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
            n.actorIndex = Game.allActors.length
            this.clones.push(n)
            Game.allActors.push(n)

        }
    }

    clonesDo(fn) {
        this.clones.forEach(fn)
    }

    static delete(actor) {
        Game.allActors.splice(actor.actorIndex, 1)
        // let garbo collector get it
        actor = null;
    }

    render_host(context = Game.context) {
        var f = context.filter;
        context.filter = this.filter;
        this.render(context)
        context.filter = f;
    }

    // placeholdder incase no function exists
    touchingMouse() {
        return false
    }

    render() {
        console.log("Actor did not provide render function", this)
    }

    pointTowards(x, y) {
        this.direction = Math.atan2(y - this.y, x - this.x)
    }

    numberOfCollisions(a1,a2,dim)
    {
        var this_canv = Game.newHiddenCanvas()
        var this_context = this_canv.getContext('2d')      

        a1.render_host(this_context);
        var this_arr = Array.from(this_context.getImageData(...dim).data);

        a2.render_host(this_context);
        var both_arr = Array.from(this_context.getImageData(...dim).data);

    // var id = new ImageData(new Uint8ClampedArray(both_arr.map((x,ind) => x - this_arr[ind])), this.width, this.height)
    //    Game.context.putImageData(id, this.x, this.y)
        var collisions = 0
        for(var i = 0; i < this_arr.length; i++)
        {
            // r,g,b,a,r,g,b,a <- a: if not part of this actor skip
            if((i + 1) % 4 == 0 && this_arr[i] == 0) continue;
            
            if(this_arr[i] != both_arr[i])
            {
                collisions++
            }
        }
        
        return collisions;
    }

}
