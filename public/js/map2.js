var map;

function Markers() {
	this.hotel = []
	this.restaurant = []
	this.thing = []
}

var markerDays = [new Markers()];

// var latlng = [];
// var latlngbounds = new google.maps.LatLngBounds();

// // creating autozoom effect
// // var latlng = [
// // 	new google.maps.LatLng(1.23, 4.56),
// // 	new google.maps.LatLng(7.89, 1.01),
// // 	// ...
// // ];
// // var latlngbounds = new google.maps.LatLngBounds();
// for (var i = 0; i < latlng.length; i++) {
// 	latlngbounds.extend(latlng[i]);
// }
// map.fitBounds(latlngbounds);

// function autoZoom() {
// 	for (var i = 0; i < latlng.length; i++) {
// 		latlngbounds.extend(latlng[i]);
// 	}
// 	map.fitBounds(latlngbounds);
// }

function drawLocation(location, opts, str, currentDay) {
	if (typeof opts !== 'object') {
		opts = {}
	}
	opts.position = new google.maps.LatLng(location[0], location[1]);
	// latlng.push(opts.position); // creating autozoom effect
	opts.map = map;
	var marker = new google.maps.Marker(opts);
	if (str === 'hotel') {
		markerDays[currentDay][str][0] = marker
	} else {
		markerDays[currentDay][str].push(marker);
	}
}

// function addMarker(currentDay, str) {
// 	if (str === 'hotel') {
// 		markerDays[currentDay][str][0] = marker
// 	} else {
// 		markerDays[currentDay][str].push(marker);
// 	}
// }

function addDayMarkers() {
	markerDays.push(new Markers());
}

function deleteMarker(str, currentDay, id) {
	var marker = markerDays[currentDay][str][id]
	if (marker) {
		marker.setMap(null);
		markerDays[currentDay][str][id] = null; //.splice(id, 1);
	}
}

function deleteDayMarkers(currentDay) {
	clearMap(currentDay)
	markerDays.splice(currentDay, 1);
}

function displayMap(currentDay) {
	for (var str in markerDays[currentDay]) {

		markerDays[currentDay][str].forEach(function(marker) {
			if (marker) {
				marker.animation = google.maps.Animation.DROP;
				marker.setMap(map);
			}

		})
	}
}

function clearMap(currentDay) {
	for (var str in markerDays[currentDay]) {

		markerDays[currentDay][str].forEach(function(marker) {
			if (marker)
				marker.setMap(null);
		})
	}
}

function initialize_gmaps() {
	// initialize new google maps LatLng object
	var myLatlng = new google.maps.LatLng(40.705786, -74.007672);
	// set the map options hash
	var mapOptions = {
		center: myLatlng,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: styleArr
	};
	// get the maps div's HTML obj
	var map_canvas_obj = document.getElementById("map-canvas");
	// initialize a new Google Map with the options
	map = new google.maps.Map(map_canvas_obj, mapOptions);
	// Add the marker to the map
	var marker = new google.maps.Marker({
		position: myLatlng,
		title: "Hello World!"
	});
}

$(document).ready(function() {
	initialize_gmaps();
});

var styleArr = [{
	"featureType": "landscape",
	"stylers": [{
		"saturation": -100
	}, {
		"lightness": 60
	}]
}, {
	"featureType": "road.local",
	"stylers": [{
		"saturation": -100
	}, {
		"lightness": 0
	}, {
		"visibility": "on"
	}]
}, {
	"featureType": "transit",
	"stylers": [{
		"saturation": -100
	}, {
		"visibility": "simplified"
	}]
}, {
	"featureType": "administrative.province",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "water",
	"stylers": [{
		"visibility": "on"
	}, {
		"lightness": 0
	}]
}, {
	"featureType": "road.highway",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#ef8c25"
	}, {
		"lightness": 0
	}]
}, {
	"featureType": "road.highway",
	"elementType": "geometry.stroke",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "poi.park",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#b6c54c"
	}, {
		"lightness": 40
	}, {
		"saturation": -40
	}]
}, {}]