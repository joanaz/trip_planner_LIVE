function Selections() {
	this.hotel = []
	this.restaurant = []
	this.thing = []
	this.markers = {};
}

var days = [new Selections()];
var currentDay = 0;

var database = {
	'hotel': all_hotels,
	'restaurant': all_restaurants,
	'thing': all_things_to_do
}

var icons = {
	'hotel': '/images/lodging_0star.png',
	'restaurant': '/images/restaurant.png',
	'thing': '/images/star-3.png'
}

$(document).ready(function() {
	selectDay(0);
	addDay();

	var arrChoices = ['hotel', 'restaurant', 'thing'];
	arrChoices.forEach(function(str) {
		addToSelections(str);
	})
	deleteDay()
});

function currentDayDisplay(day) {
	for (var i = 0; i < days.length; i++) {
		clearMap(days[i].markers);
	}

	Object.keys(days[day]).forEach(function(str) {
		$('#' + str + 'Chosen').empty();
		var interests = days[currentDay][str];

		if (interests.length) {
			interests.forEach(function(element, id) {
				$('#' + str + 'Chosen').append("<div class='itinerary-item'><span class='title'>" + element + "</span><button id='" + str + id + "' class='btn btn-xs btn-danger remove btn-circle spin'>x</button></div>")
				deleteFromSelections(id, str);

				if (days[currentDay][str].indexOf(element) > -1) {
					markerDisplay(str, element)
				}


			})
		}
	})
}

function markerDisplay(str, interestName) {
	var interestObj = database[str].filter(function(interest) {
		return interest.name === interestName;
	})
	var location = interestObj[0].place[0].location
	drawLocation(location, {
		icon: icons[str],
		animation: google.maps.Animation.DROP
	}, days[currentDay].markers, interestName);
	// autoZoom();
}

function displayLatestSelection(str) {
	var id = days[currentDay][str].length - 1
	$('#' + str + 'Chosen').append("<div class='itinerary-item'><span class='title'>" + days[currentDay][str][id] + "</span><button id='" + str + id + "' class='btn btn-xs btn-danger remove btn-circle spin'>x</button></div>")
	deleteFromSelections(id, str);
}


function selectDay(day) {
	$('#day' + day).on('click', function() {
		currentDay = day;
		$('.current-day').removeClass('current-day');
		$(this).addClass('current-day');
		$('#day-title-text').text("Day " + (currentDay + 1));
		currentDayDisplay(day);
	})
}

function addDay() {
	$('#addDay').on('click', function() {
		days.push(new Selections());
		$('.current-day').removeClass('current-day');
		clearMap(days[currentDay].markers); // removes all icons from map
		currentDay = days.length - 1
		$('<button id="day' + currentDay + '" class="btn btn-circle day-btn current-day spin">' + days.length + '</button>').insertBefore('#addDay')
		selectDay(currentDay);
		currentDayDisplay(currentDay);
		Object.keys(days[currentDay]).forEach(function(str) {
			$('#' + str + 'Chosen').empty();
		})
		$('#day-title-text').text("Day " + (currentDay + 1));
	})
}

function deleteDay() {
	$('#delete-day').on('click', function() {
		clearMap(days[currentDay].markers);

		if (currentDay === 0 && days.length === 1) {
			days[0] = new Selections();
		} else {
			days.splice(currentDay, 1);
			$('#day' + days.length).remove();
		}

		if (currentDay === days.length && days.length > 0) {
			currentDay--
		}

		$('#day' + currentDay).addClass('current-day');
		currentDayDisplay(currentDay);
		$('#day-title-text').text("Day " + (currentDay + 1));
	})

}

function addToSelections(str) {
	$('#' + str + 'Plus').on('click', function() {
		var e = document.getElementById(str + 'Select');
		var selectedStr = e.options[e.selectedIndex].value;

		if (str === "hotel") {
			$('#' + str + 'Chosen').empty()
			markerDisplay(str, selectedStr);
			var marker = days[currentDay].markers[selectedStr];
			console.log(marker)
				// marker.setMap(null);
			days[currentDay][str][0] = selectedStr
			displayLatestSelection(str);


		} else if (days[currentDay][str].indexOf(selectedStr) === -1) {
			days[currentDay][str].push(selectedStr);
			displayLatestSelection(str);

			markerDisplay(str, selectedStr)
		}



	})
}

function deleteFromSelections(id, str) {
	$('#' + str + id).on('click', function() {
		$(this).parent().remove();
		var locationName = days[currentDay][str][id];
		var marker = days[currentDay].markers[locationName];
		marker.setMap(null); // remove marker from map
		days[currentDay][str].splice(id, 1); // delete marker from Selections object
	})
}