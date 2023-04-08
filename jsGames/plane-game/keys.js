Game.onKey('ArrowLeft', () => {
    jet.rotational -= jet.speed / jet.agility / 1000; //(jet.agility / ((jet.speed + 1) / 3)) / 2;
})

Game.onKey('ArrowRight', () => {
    jet.rotational += jet.speed / jet.agility / 1000; // (jet.agility / ((jet.speed + 1) / 3)) / 2;
})

Game.onKey('ArrowUp', () => {
    if(jet.throttle < 0.8)
        jet.throttle += 0.1;
})

Game.onKey('ArrowDown', () => {
    if(jet.throttle > 0.1)
        jet.throttle -= 0.1;
})

Game.onMouseMove((event) => {
    console.log(event.offsetX)
})