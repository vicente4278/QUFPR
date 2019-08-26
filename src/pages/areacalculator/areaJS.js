function solve() {
	var time = document.getElementById('ta1').value;
	var volume = document.getElementById('ta2').value;
	var current = document.getElementById('ta3').value;
	var height = document.getElementById('ta4').value;
	var temperature = document.getElementById('ta5').value;
	var pressure = document.getElementById('ta6').value;

	var timeU = document.getElementById('time').value;
	var volumeU = document.getElementById('volume').value;
	var currentU = document.getElementById('current').value;
	var heightU = document.getElementById('height').value;
	var temperatureU = document.getElementById('temperature').value;
	var pressureU = document.getElementById('pressure').value;

	var time = time.split("\n");
	var volume = volume.split("\n");
	var current = current.split("\n");
	var height = height.split("\n");
	var temperature = temperature.split("\n");
	var pressure = pressure.split("\n");

	var tcons = false;
	var pcons = false;

	// Conversions
	// t -> s
	if (timeU != "s") {
		if (timeU == "m") {
			for (var i = 0; i < time.length; i++) {
				time[i] = Number(time[i])*60;
			}
		} else {
			for (var i = 0; i < time.length; i++) {
				time[i] = Number(time[i])*360;
			}
		}
	}

	// v -> m3

	if (volumeU != "m3") {
		if (volumeU == "ml") {
			for (var i = 0; i < volume.length; i++) {
				volume[i] = Number(volume[i])/1000000;
			}
		} else {
			for (var i = 0; i < volume.length; i++) {
				volume[i] = Number(volume[i])/1000;
			}
		}
	}

	// current -> A

	if (currentU != "A") {
		for (var i = 0; i < current.length; i++) {
			current[i] = Number(current[i])/1000;
		}
	}

	// height -> m

	if (heightU != "m") {
		if (heightU == "mm") {
			for (var i = 0; i < height.length; i++) {
				height[i] = Number(height[i])/1000;
			}
		} else {
			for (var i = 0; i < height.length; i++) {
				height[i] = Number(height[i])/100;
			}
		}
	}

	// temperature -> K

	if (temperatureU != "k") {
		if (temperatureU == "c") {
			for (var i = 0; i < temperature.length; i++) {
				temperature[i] = Number(temperature[i])+273.15;
			}
		} else {
			for (var i = 0; i < temperature.length; i++) {
				temperature[i] = (Number(temperature[i])-32)*(5/9)+273.15;
			}
		}
	}

	// pressure -> Pa

	if (pressureU != "pa") {
		if (pressureU == "atm") {
			for (var i = 0; i < pressure.length; i++) {
				pressure[i] = Number(pressure[i])*101325;
			}
		} else if (pressureU == "mmhg"){
			for (var i = 0; i < pressure.length; i++) {
				pressure[i] = Number(pressure[i])*133.322;
			}
		} else { // bar
			for (var i = 0; i < pressure.length; i++) {
				pressure[i] = Number(pressure[i])*100000;
			}
		}
	}

	for (var i = 0; i < 6; i++) {
		alert(time[i]+" "+volume[i]+" "+current[i]+" "+height[i]+" "+temperature[i]+" "+pressure[i]);
	}

}
