function Selections() {
	this.hotel = []
	this.restaurant = []
	this.thing = []
	this.markers = []
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
	Object.keys(days[day]).forEach(function(str) {
			$('#' + str + 'Chosen').empty();
			clearMarkers();
			days[day][str].forEach(function(element, id) {
				$('#' + str + 'Chosen').append("<div class='itinerary-item'><span class='title'>" + element + "</span><button id='" + str + id + "' class='btn btn-xs btn-danger remove btn-circle spin'>x</button></div>")
				deleteFromSelections(id, str);
			})
		})
		// setAllMap(days[day].markers)
}

function displayLatestSelection(str) {
	var id = days[currentDay][str].length - 1
	$('#' + str + 'Chosen').append("<div class='itinerary-item'><span class='title'>" + days[currentDay][str][id] + "</span><button id='" + str + id + "' class='btn btn-xs btn-danger remove btn-circle spin'>x</button></div>")
	deleteFromSelections(id, str);
}


function selectDay(day) {
	$('#day' + day).on('click', function() {
		currentDay = day
		$('.current-day').removeClass('current-day');
		$(this).addClass('current-day');
		currentDayDisplay(day);
		$('#day-title-text').text("Day " + (currentDay + 1));
	})
}

function addDay() {
	$('#addDay').on('click', function() {
		days.push(new Selections());
		$('.current-day').removeClass('current-day');
		currentDay = days.length - 1
		$('<button id="day' + currentDay + '" class="btn btn-circle day-btn current-day spin">' + days.length + '</button>').insertBefore('#addDay')
		selectDay(currentDay);
		Object.keys(days[currentDay]).forEach(function(str) {
			$('#' + str + 'Chosen').empty();
		})
		$('#day-title-text').text("Day " + (currentDay + 1));
		clearMarkers();
	})
}

// function setAllMap(markers) {
// 	for (var i = 0; i < days[currentDay].markers.length; i++) {
// 		days[currentDay].markers[i].setMap(map);
// 	}
// }

// function clearMarkers() {
// 	setAllMap(null);
// }
function deleteDay() {
	$('#delete-day').on('click', function() {
		if (currentDay !== 0) {
			days.splice(currentDay, 1)
			$('#day' + days.length).remove();
		} else {
			days[0] = new Selections()
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
		if (days[currentDay][str].indexOf(selectedStr) === -1) {
			days[currentDay][str].push(selectedStr);
			displayLatestSelection(str);

			var interestObj = database[str].filter(function(interest) {
				return interest.name === selectedStr
			})
			var location = interestObj[0].place[0].location

			days[currentDay].markers.push({
				'location': location,
				'icon': icons[str]
			})

			drawLocation(location, {
				icon: icons[str]
			});
		}
	})
}



function deleteFromSelections(id, str) {
	$('#' + str + id).on('click', function() {
		$(this).parent().remove();
		days[currentDay][str].splice(id, 1);
	})
}