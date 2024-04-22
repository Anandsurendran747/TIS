mapboxgl.accessToken = 'pk.eyJ1Ijoic25laG9tb3kxMDAiLCJhIjoiY2tvNjBnaGY5MWhtZzJxbHl0NWdwOGF0dyJ9.Ps-ZNqoVkpQWZ_apcBgCyA';
navigator.geolocation.getCurrentPosition(successLocation, errorLocaion, {
    enableHighAccuracy: true
})



function successLocation(position) {

    console.log(position);

    pinLocation([position.coords.longitude, position.coords.latitude])

};



function errorLocaion() {
    console.log("Error!");
};



function pinLocation(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
    });

    map.addControl(new mapboxgl.NavigationControl());

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
    });
    // Disable the origin input field
    directions.setOrigin('');
    console.log(directions)
    map.addControl(directions, 'top-left');

    
function updateLoc() {
    console.log("updating..");
    navigator.geolocation.getCurrentPosition(function (position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        
        
     // Set current location as the origin
    }, function (error) {
        console.error('Error getting current location:', error);
    });
    navigator.geolocation.watchPosition(function (position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        console.log(position);
        var marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
            directions.on('route', function (event) {
                var steps = event.route[0].legs[0].steps;
                var instr = steps[0].maneuver.instruction;
                console.log(event);
                directions.setOrigin([lng, lat]);
                const dist =event.route[0].distance
                
                if (instr.includes('Turn left') && dist <=100) {
                    alert('left')
                }
                if(instr.includes('Turn right') && dist <=100){
                    alert('right')
                }
            });
    }, function (error) {
        console.error('Error adding marker for current location:', error);
    },
        {
            enableHighAccuracy: true
        });
}
updateLoc()
// setInterval(updateLoc, 1000);
    

};




