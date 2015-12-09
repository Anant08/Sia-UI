'use strict';

// Library for communicating with Sia-UI
const IPCRenderer = require('electron').ipcRenderer;
// Siad wrapper
const Siad = require('sia.js');
// Keeps track of if the view is shown
var updating;

// Update version every 50 seconds that this plugin is open
function update() {
	Siad.call('/daemon/version', function(err, result) {
		if (err) {
			IPCRenderer.sendToHost('notify', '/daemon/version call failed!', 'error');
		} else {
			document.getElementById('siaversion').innerHTML = result;
		}
	});

	updating = setTimeout(update, 50000);
}

// Called by the UI upon showing
function start() {
	// DEVTOOL: uncomment to bring up devtools on plugin view
	// IPCRenderer.sendToHost('devtools');
	
	// Call the API
	update();
}

// Called by the UI upon transitioning away from this view
function stop() {
	clearTimeout(updating);
}
