var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-10);
		timeOut=setTimeout('scrollToTop()',5);
	}
	else clearTimeout(timeOut);
}

/** var scroll = 0;

function Down() {
	document.getElementById('pre-body').className = "Scrolled";
	document.getElementById('mainT').className = "pre-body-titleScroll";
}

function Up() {
	document.getElementById('pre-body').className = "";
	document.getElementById('mainT').className = "pre-body-title";
}
**/
function goUpB() {
	if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0){
		document.getElementById("go2Top").className = "TopH";
		document.getElementById('pre-body').className = "";
		document.getElementById('mainT').className = "pre-body-title";
	}
	if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
		document.getElementById("go2Top").className = " ";
		document.getElementById('pre-body').className = "Scrolled";
		document.getElementById('mainT').className = "pre-body-titleScroll";
	}
}
