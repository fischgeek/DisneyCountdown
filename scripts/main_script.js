$(document).ready(function () {
	// if (!window.navigator.standalone == true) {
	// 	$('#instructions').show();
	// 	$('#innerContainer').hide();
	// }
	console.log(getURLParameter("date"))
	
	var counterPosition = 7
	var imageBank = 42
	var seqNo = Math.floor(Math.random() * imageBank)
	var excludes = [4, 6, 11, 12, 13, 20, 21, 23, 24, 27, 32, 35, 42]
	seqNo = switchImage(seqNo, imageBank, "left")
	// setInterval(function () { updateCounter() }, 2000);
	updateCounter()
	positionCounter(counterPosition)

	$('#countdown').on('touchend', function () {
		counterPosition = positionCounter(counterPosition + 1)
	})

	$('body').swipe({
		swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == "left") {
				seqNo++
			} else if (direction == "right") {
				seqNo--
			} else if (direction == "up") {
				counterPosition--
			} else if (direction == "down") {
				counterPosition++
			}
			console.log('swiped ' + direction)
			seqNo = switchImage(seqNo, imageBank, direction)
			counterPosition = positionCounter(counterPosition)
		}
	})

	function updateCounter() {
		console.log('updating counter...')
		// set the date we're counting down to
		var target_date = new Date("Dec 8, 2019").getTime();
		// variables for time units
		var days, hours, minutes, seconds;
		// find the amount of "seconds" between now and target
		var current_date = new Date().getTime();
		var d = new Date().getDay();
		var seconds_left = (target_date - current_date) / 1000;
		days = parseInt(seconds_left / 86400);
		seconds_left = seconds_left % 86400;
		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;
		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);
		$("#countdown").text(days + 1);
	}

	function switchImage(imgNum, highest, dir) {
		imgNum = (imgNum == imageBank ? 1 : imgNum)
		imgNum = imgNum > highest ? 1 : imgNum
		while (excludes.includes(imgNum)) {
			console.log(imgNum + '. picking a new one...')
			if (dir == "left") {
				imgNum++
			} else if (dir == "right") {
				imgNum--
			}
			console.log('new imgNum: ' + imgNum)
		}
		$('body').css({
			'background': 'url("images/' + imgNum + '.jpg")',
			'background-repeat': 'no-repeat',
			'background-size': 'cover',
			'background-position': 'center'
		});
		return imgNum
	}

	function positionCounter(posNumber) {
		posNumber = posNumber < 0 ? 8 : posNumber
		posNumber = posNumber > 8 ? 0 : posNumber
		switch (posNumber) {
			case 0:
				$('#innerContainer').css({ 'top': 5, 'right': '', 'bottom': '', 'left': 5, 'text-align': 'left' })
				break;
			case 1:
				$('#innerContainer').css({ 'top': 5, 'right': '', 'bottom': '', 'left': 5, 'text-align': 'center' })
				console.log('value was 1')
				break;
			case 2:
				$('#innerContainer').css({ 'top': 5, 'right': '', 'bottom': '', 'left': 5, 'text-align': 'right' })
				break;
			case 3:
				$('#innerContainer').css({ 'top': '40%', 'right': '', 'bottom': '', 'left': 5, 'text-align': 'left' })
				break;
			case 4:
				$('#innerContainer').css({ 'top': '40%', 'right': '', 'bottom': '', 'left': 5, 'text-align': 'center' })
				break;
			case 5:
				$('#innerContainer').css({ 'top': '40%', 'right': '', 'bottom': '', 'left': 5, 'text-align': 'right' })
				break;
			case 6:
				$('#innerContainer').css({ 'top': '', 'right': '', 'bottom': 5, 'left': 5, 'text-align': 'left' })
				break;
			case 7:
				$('#innerContainer').css({ 'top': '', 'right': '', 'bottom': 5, 'left': 5, 'text-align': 'center' })
				break;
			case 8:
				$('#innerContainer').css({ 'top': '', 'right': '', 'bottom': 5, 'left': 5, 'text-align': 'right' })
				break;
		}
		return posNumber
	}

	function getURLParameter(name) {
		var x = (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [""])[1];
		if (x) {
			return decodeURIComponent(x.replace(/\+/g, '%20')) || undefined;
		} else {
			return undefined;
		}
	}
});