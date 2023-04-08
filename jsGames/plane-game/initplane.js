function init_plane(plane)
{
    plane.max_altitude = 100;
    plane.movement_vector = {x: 5, y: 0}

    plane.thrust_vector = {x: 0, y: 0}
    plane.throttle = 0.0;
    plane.rotational = 0;
    plane.speed = 0;
    plane.altitude = 0;

    plane.agility = 0.2;
    plane.air_resistance = 20;
    plane.max_climb_rate = 3;
    plane.missile_count = 7;
}