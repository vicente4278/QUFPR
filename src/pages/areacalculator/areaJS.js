function solve() {
	var time = document.getElementById('ta1').value;
	var volume = document.getElementById('ta2').value;
	var current = document.getElementById('ta3').value;
	var height = document.getElementById('ta4').value;
	var temperature = document.getElementById('ta5').value;
	var pressure = document.getElementById('ta6').value;
	var wvp = document.getElementById('wvp').value;

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

	for (var i = 0; i < time.length; i++) {
		time[i] = Number(time[i]);
		volume[i] = Number(volume[i]);
		current[i] = Number(current[i]);
		height[i] = Number(height[i]);
		temperature[i] = Number(temperature[i]);
		pressure[i] = Number(pressure[i]);
		wvp = Number(wvp);
	}


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

	//for (var i = 0; i < 6; i++) {
	//	alert(time[i]+" "+volume[i]+" "+current[i]+" "+height[i]+" "+temperature[i]+" "+pressure[i]);
	//}

	/**

	The real problem is in the following session, be careful with the variables...

	**/
	var gasPressure = 0;

	var resultMin = [];
	var resultMax = [];
	var resultMed = [];
	var resultDir = [];

	var resultMinF = "";
	var resultMaxF = "";
	var resultMedF = "";
	var resultDirF = "";

	var r = 8.314462618;
	var g = 9.80665;
	var e = 1.602177*Math.pow(10, -19);
	var d = 997;

	var barError = 6.666119;
	var terError = 0.5;
	var curError = 0.0001;
	var volError = 0.00000005;
	var heiError = 0.005;


	// DIRECT
	for (var i = 1; i < time.length; i++) {
		gasPressure = -wvp+pressure[i]-(d*g*height[i]);
		resultDir[i] = (r*temperature[i]*current[i]*time[i])/(2*gasPressure*volume[i]*e);
		resultDirF = resultDirF+resultDir[i]+"<br/>";
	}

	document.getElementById('directR').innerHTML = resultDirF;

	// MAXIMUM
	for (var i = 1; i < time.length; i++) {
		gasPressure = -wvp+pressure[i]-barError-(d*g*(height[i]+heiError));
		resultMax[i] = (r*(temperature[i]+terError)*(current[i]+curError)*time[i])/(2*gasPressure*(volume[i]-volError)*e);
		resultMaxF = resultMaxF+resultMax[i]+"<br/>";
	}

	document.getElementById('maxR').innerHTML = resultMaxF;

	// MINIMUM
	for (var i = 1; i < time.length; i++) {
		gasPressure = -wvp+pressure[i]+barError-(d*g*(height[i]-heiError));
		resultMin[i] = (r*(temperature[i]-terError)*(current[i]-curError)*time[i])/(2*gasPressure*(volume[i]+volError)*e);
		resultMinF = resultMinF+resultMin[i]+"<br/>";
	}

	document.getElementById('minR').innerHTML = resultMinF;

	// Avogadro Number
	for (var i = 1; i < time.length; i++) {
		resultMed[i] = (resultMin[i]+resultMax[i])/2
		resultMedF = resultMedF+resultMed[i]+"<br/>";
	}
	document.getElementById('avogR').innerHTML = resultMedF;

	// TIME
	var timePrint = "";
	for (var i = 1; i < time.length; i++) {
		timePrint = timePrint+time[i]+"<br/>";
	}
	document.getElementById('timeR').innerHTML = timePrint;

	/*
		Area Under Graph
	*/

	var graphBase = document.getElementById('graphBase').value;
	graphBase = Number(graphBase);
	var storeAreas = [];

	for (var i = 0; i < time.length; i++) {
		if (graphBase == 1) {
			storeAreas[i] = volume[i];
		}
		if (graphBase == 2) {
			storeAreas[i] = pressure[i];
		}
		if (graphBase == 3) {
			storeAreas[i] = height[i];
		}
		if (graphBase == 4) {
			storeAreas[i] = current[i];
		}
		if (graphBase == 5) {
			storeAreas[i] = temperature[i];
		}
	}


	alert(storeAreas[1]);
	var areaUnderGraph = 0;

	for (var i = 1; i < time.length; i++) {
		areaUnderGraph = areaUnderGraph+(((storeAreas[i]+storeAreas[i-1])*(time[i]-time[i-1]))/2);
	}

	document.getElementById('areaUnderGraph').innerHTML = areaUnderGraph+"<br/>";

}
