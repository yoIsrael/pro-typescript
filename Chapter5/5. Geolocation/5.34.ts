function watchLocation(pos: Position) {
    console.log('You are here: Lat=' + pos.coords.latitude +
        ' Long=' + pos.coords.longitude +
        ' Altitude=' + pos.coords.altitude +
        ' (Accuracy=' + pos.coords.altitudeAccuracy + ')' +
        ' Heading=' + pos.coords.heading +
        ' Speed=' + pos.coords.speed);
}

function watchFailed() {
    console.log('Position information not available.');
}

var watch = navigator.geolocation.watchPosition(watchLocation, watchFailed);

// You are here: Lat = 51.5033 Long = 0.1197
// Altitude = 135 (Accuracy = 15)
// Heading = 0 Speed = 0

// You are here: Lat = 51.5144 Long = 0.0803
// Altitude = 180 (Accuracy = 15)
// Heading = 60 Speed = 3379
