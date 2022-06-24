$(document).ready(function () {
	var debug = false
	//var debug = true
	var tdate = new moment().format('YYYY-MM-DD')
	var counterPosition = 7
	var imageBank = 92
	var seqNo = Math.floor(Math.random() * imageBank)
	var excludes = []
	var installed = window.navigator.standalone
	var isFirefox = typeof InstallTrigger !== 'undefined'
	// var hideNavigationsTimeout = hideNavTimer()
	var controlsVisible = false
	switchImage(seqNo)
	if (debug) {
		installed = true
	}
	installed = true // override to force

	if (!installed) {
		$('#instructions-container').show()
		$('#container').hide()
		$('#date-picker-container').hide()
	} else {
		$('#instructions-container').hide()
		$('#date-picker-container').show()
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

	$('#left-navigation').on('touchend', function() {
		showNavigations()
		seqNo = switchImage(seqNo-1, imageBank, 'left')
	})

	$('#right-navigation').on('touchend', function() {
		console.log(seqNo)
		showNavigations()
		seqNo = switchImage(seqNo+1, imageBank, 'right')
		console.log(seqNo)
	})

	$('#disney-image').on('touchend', function() {
		if (controlsVisible) {
			hideNavigations()
		} else {
			showNavigations()
		}
		controlsVisible = !controlsVisible
		console.log('image tapped')
	})

	$('#calendar-control').on('touchend', function() {
		$('#container').hide()
		$('#date-picker-container').show()
		if (tdate.isValid()) {
			$('#date-picker').val(tdate.format('YYYY-MM-DD'))
		} else {
			$('#date-picker').val(new moment().format('YYYY-MM-DD'))
		}
	})

	$('#random-control').on('touchend', function() {
		var ran = Math.floor(Math.random() * Math.floor(imageBank));
		ran = ran == 0 ? 1 : ran
		ran = ran == seqNo ? seqNo + 1 : ran
		while (ran == seqNo) {
			var ran2 = Math.floor(Math.random() * Math.floor(imageBank));
			ran2 = ran2 == 0 ? 1 : ran2
			ran2 = ran2 == seqNo ? seqNo + 1 : ran2
			ran = ran2
		}
		seqNo = switchImage(ran, imageBank, "random")
	})

	$('#move-control').on('touchend', function() {
		counterPosition = positionCounter()
	})

	$('#refresh-control').on('touchend', function() {
		window.location.reload()
	})

	function showNavigations() {
		// clearTimeout(hideNavigationsTimeout)
		$('#left-navigation').css('left', 0)
		$('#right-navigation').css('right', 0)
		$('#controls-container').css('top', 0)
		// if (!debug) {
		// 	hideNavigationsTimeout = hideNavTimer()
		// }
	}

	function hideNavigations() {
		$('#left-navigation').css('left', -80)
		$('#right-navigation').css('right', -80)
		$('#controls-container').css('top', -105)
	}

	function hideNavTimer() {
		return setTimeout(function(){ hideNavigations(); console.log('hiding') }, 3000)
	}

	function updateCounter() {
		var cDate = new moment()
		var diff = tdate.diff(cDate, 'days')
		$("#countdown").text(diff + 1)
	}

	function switchImage(imgNum, dir) {
		imgNum = imgNum >= imageBank ? 1 : imgNum
		imgNum = imgNum <= 0 ? imageBank : imgNum
		while (excludes.includes(imgNum)) {
			imgNum = imgNum >= imageBank ? 1 : imgNum
			imgNum = imgNum <= 0 ? imageBank : imgNum
			if (dir == "left" || "random") {
				imgNum--
			} else if (dir == "right") {
				imgNum++
			}
		}
		setImage(imgNum)
		return imgNum
	}

	function setImage(n) {
		$('#disney-image').attr('src', 'images/' + n + '.jpg')
	} 

	function positionCounter() {
		console.log('counterPosition ' + counterPosition)
		var posNumber = counterPosition < 0 ? 8 : counterPosition
		posNumber = posNumber > 8 ? 0 : posNumber
		var spacing = 20
		switch (posNumber) {
			case 0:
				$('#innerContainer').css({ 'top': spacing, 'right': '', 'bottom': '', 'left': spacing, 'text-align': 'left' })
				$('#static-label').css('float', 'none')
				break;
			case 1:
				$('#innerContainer').css({ 'top': spacing, 'right': '', 'bottom': '', 'left': spacing, 'text-align': 'center' })
				$('#static-label').css('float', 'none')
				break;
			case 2:
				$('#innerContainer').css({ 'top': spacing, 'right': '', 'bottom': '', 'left': -10, 'text-align': 'right' })
				$('#static-label').css('float', 'right')
				break;
			case 3:
				$('#innerContainer').css({ 'top': '40%', 'right': '', 'bottom': '', 'left': spacing, 'text-align': 'left' })
				$('#static-label').css('float', 'none')
				break;
			case 4:
				$('#innerContainer').css({ 'top': '40%', 'right': '', 'bottom': '', 'left': spacing, 'text-align': 'center' })
				$('#static-label').css('float', 'none')
				break;
			case 5:
				$('#innerContainer').css({ 'top': '40%', 'right': '', 'bottom': '', 'left': -10, 'text-align': 'right' })
				$('#static-label').css('float', 'right')
				break;
			case 6:
				$('#innerContainer').css({ 'top': '', 'right': '', 'bottom': spacing, 'left': spacing, 'text-align': 'left' })
				$('#static-label').css('float', 'none')
				break;
			case 7:
				$('#innerContainer').css({ 'top': '', 'right': '', 'bottom': spacing, 'left': spacing, 'text-align': 'center' })
				$('#static-label').css('float', 'none')
				break;
			case 8:
				$('#innerContainer').css({ 'top': '', 'right': '', 'bottom': spacing, 'left': -10, 'text-align': 'right' })
				$('#static-label').css('float', 'right')
				break;
		}
		return posNumber+1
	}
})