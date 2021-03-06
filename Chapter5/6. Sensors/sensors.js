define(["require", "exports", '../Scripts/addEvent'], function(require, exports, addEvent) {
    

    var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;

    if (battery) {
        var batteryOutput = document.getElementById('battery');

        function updateBatteryStatus() {
            // Gets the battery charge level
            var charge = Math.floor(battery.level * 100) + '%';

            // Detects whether the battery is charging
            var charging = battery.charging ? ' charging' : ' discharging';

            // Gets the time remaining based on charging or discharging
            var timeLeft = battery.charging ? ' (' + Math.floor(battery.chargingTime / 60) + ' mins)' : ' (' + Math.floor(battery.dischargingTime / 60) + ' mins)';

            batteryOutput.innerHTML = charge + timeLeft + charging;
        }

        // Update the display when plugged in or unplugged
        battery.onchargingchange = updateBatteryStatus;

        // Update the display when the charging time changes
        battery.onchargingtimechange = updateBatteryStatus;

        // Update the display when the discharging time changes
        battery.ondischargingtimechange = updateBatteryStatus;

        // Update the display when the battery level changes
        battery.onlevelchange = updateBatteryStatus;

        // In case none of these events fire for a while, let's show the current status...
        // Unplug your cable for a while to see the events fire (something has to change)
        updateBatteryStatus();
    }

    

    var proximityOutput = document.getElementById('proximity');

    function proximitySensorChange(proximity) {
        var distance = (proximity.value ? proximity.value + ' ' : '') + (proximity.near ? 'near' : 'far');

        proximityOutput.innerHTML = distance;
    }

    // Near or far
    addEvent(window, 'userproximity', proximitySensorChange);

    // Measurement within a range
    addEvent(window, 'deviceproximity', proximitySensorChange);

    

    var lightOutput = document.getElementById('light');

    function lightSensorChange(data) {
        lightOutput.innerHTML = 'Ambient light reading: ' + data.value;
    }

    addEvent(window, 'devicelight', lightSensorChange);

    // Motion
    var motionOutput = document.getElementById('motion');

    function motionSensorChange(event) {
        var motion = event.acceleration;
        var rotation = event.rotationRate;

        motionOutput.innerHTML = '<p>Motion :<br />' + motion.x + '<br />' + motion.y + '<br />' + motion.z + '</p>' + '<p>Rotation:<br />' + rotation.alpha + '<br />' + rotation.beta + '<br />' + rotation.gamma + '</p>';
    }

    addEvent(window, 'devicemotion', motionSensorChange);

    // Temperature
    var sensorApiName = 'devicetemperature';

    var temperatureOutput = document.getElementById('temperature');

    addEvent(window, sensorApiName, function (data) {
        temperatureOutput.innerHTML = sensorApiName + ' ' + data.value;
    });
});
