
function SANDmenu(Smenu) {
	if (Smenu == 0) {
		document.getElementById("sandwish_menu").className = " ";
		document.getElementById("darkBackground").className = "show";
	} else {
		document.getElementById("sandwish_menu").className = "SANDClose";
		document.getElementById("darkBackground").className = "hide";
	}
}

var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-10);
		timeOut=setTimeout('scrollToTop()',5);
	}
	else clearTimeout(timeOut);
}

var scroll = 0;

function Down() {
	document.getElementById('pre-body').className = "Scrolled";
	document.getElementById('mainT').className = "pre-body-titleScroll";
	if (scroll < 70){
		window.scrollBy(0,10);
		timeOut1=setTimeout('Down()',100);
		scroll++;
	}
	else clearTimeout(timeOut1);
}

function Up() {
	document.getElementById('pre-body').className = "";
	document.getElementById('mainT').className = "pre-body-title";
}