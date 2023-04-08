function calculateThrust(plane)
{
    // calculate x and y thrust
    plane.thrust_vector = {
        x: (Math.cos(plane.direction) / (1 - plane.throttle)),
        y: (Math.sin(plane.direction) / (1 - plane.throttle))
    };

    plane.speed = Math.sqrt(plane.movement_vector.x * plane.movement_vector.x + plane.movement_vector.y * plane.movement_vector.y)

    // move the plane
    plane.movement_vector.x += (smartDiv(plane.movement_vector.x,(-20 + (smartDiv(Math.abs(plane.rotational),3))))) + (smartDiv((plane.thrust_vector.x * 10),(plane.air_resistance * plane.speed)));
    plane.movement_vector.y += (smartDiv(plane.movement_vector.y,(-20 + (smartDiv(Math.abs(plane.rotational),3))))) + (smartDiv((plane.thrust_vector.y * 10),(plane.air_resistance * plane.speed)));

}

function calculateAltitude(plane)
{
    if(plane.altitude >= plane.max_altitude)
        plane.altitude = plane.max_altitude;

    plane.altitude += smartDiv(plane.speed, smartDiv(plane.altitude - plane.max_altitude, 0 - plane.max_climb_rate))
}


function smartDiv(top, bottom)
{
    if(bottom == 0) return 0;
    return top / bottom;
}