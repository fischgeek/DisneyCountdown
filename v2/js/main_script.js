$(document).ready(function () {
	var debug = false
	// var debug = true
	var tdate;
	var counterPosition = 7
	var imageBank = 65
	var seqNo = Math.floor(Math.random() * imageBank)
	var excludes = [43]
	var installed = window.navigator.standalone
	var isFirefox = typeof InstallTrigger !== 'undefined'
	if (debug) {
		installed = true
	}

	if (!installed) {
		$('#instructions-container').show()
		$('#container').hide()
		$('#date-picker-container').hide()
	} else {
		installed = true;
		tdate = Cookies.get('disney-date')
		tdate = new moment(tdate, "YYYY-MM-DD")
		if (!tdate.isValid()) {
			$('#container').hide()
			$('#date-picker-container').show()
			$('#date-picker').val(new moment().format('YYYY-MM-DD'))
		} else {
			$('#container').show()
			$('#date-picker-container').hide()
			seqNo = switchImage(seqNo, imageBank, "left")
			updateCounter()
			positionCounter(counterPosition)
		}
	}

	$('#disney').on('touchend', function () {
		var ran = Math.floor(Math.random() * Math.floor(imageBank));
		ran = ran == 0 ? 1 : ran
		ran = ran == seqNo ? seqNo + 1 : ran
		while (ran == seqNo) {
			var ran2 = Math.floor(Math.random() * Math.floor(imageBank));
			ran2 = ran2 == 0 ? 1 : ran2
			ran2 = ran2 == seqNo ? seqNo + 1 : ran2
			ran = ran2
		}
		console.log(ran)
		seqNo = switchImage(ran, imageBank, "random")
	})
	
	$('#done-button').on('touchend', function () {
		var x = $('#date-picker').val()
		Cookies.set('disney-date', x, { expires: 365 })
		tdate = new moment(x, "YYYY-MM-DD")
		if (tdate.isValid()) {
			$('#container').show()
			$('#date-picker-container').hide()
			counterPosition = positionCounter(counterPosition)
			updateCounter()
		}
	})

	var timer
	$('#countdown').on('touchstart', function () {
		console.log('start timer')
		timer = setTimeout(function () {
			$('#container').hide()
			$('#date-picker-container').show()
			if (tdate.isValid()) {
				$('#date-picker').val(tdate.format('YYYY-MM-DD'))
			} else {
				$('#date-picker').val(new moment().format('YYYY-MM-DD'))
			}
		}, 2000)
	}).on('touchend', function () {
		console.log('clear timer')
		clearTimeout(timer)
	})

	$('body').swipe({
		swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			if (installed) {
				if (direction == "left") {
					seqNo++
				} else if (direction == "right") {
					seqNo--
				} else if (direction == "up") {
					counterPosition--
				} else if (direction == "down") {
					counterPosition++
				}
				seqNo = switchImage(seqNo, imageBank, direction)
				counterPosition = positionCounter(counterPosition)
			}
		}, threshold: 200
	})

	function updateCounter() {
		var cDate = new moment()
		var diff = tdate.diff(cDate, 'days')
		$("#countdown").text(diff + 1)
	}

	function switchImage(imgNum, highest, dir) {
		imgNum = (imgNum == imageBank ? 1 : imgNum)
		imgNum = imgNum > highest ? 1 : imgNum
		while (excludes.includes(imgNum)) {
			if (dir == "left" || "random") {
				imgNum++
			} else if (dir == "right") {
				imgNum--
			}
		}
		$('#disney-image').attr('src', '../images/' + imgNum + '.jpg')
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
})