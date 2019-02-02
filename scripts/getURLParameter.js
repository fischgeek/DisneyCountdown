function getURLParameter(name) {
	var x = (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [""])[1];
	if (x) {
		return decodeURIComponent(x.replace(/\+/g, '%20')) || undefined;
	} else {
		return undefined;
	}
}