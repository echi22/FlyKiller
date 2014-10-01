function sonido(){

var current;

//
this.initialize = function(){
	//window.plugins.LowLatencyAudio.preloadAudio('prueba', 'sounds/1moscas.mp3', 1);
}
this.transition=function(src,loop){

}
this.playAudio = function(src,loop) {
	if(window.plugins && window.plugins.LowLatencyAudio) {
		if (loop)
		{
			current=src;
			window.plugins.LowLatencyAudio.loop(src);
		} else {
			window.plugins.LowLatencyAudio.play(src);
		}
	}	
}

// Pause audio
//
this.pauseAudio = function() {

}

// Stop audio
//
this.stopAudio = function() {
	if(current != null)
		window.plugins.LowLatencyAudio.stop(current);
}

// onSuccess Callback
//
this.onSuccess =  function() {	

}

// onError Callback
//
this.onError= function(error){

}

// Set audio position
//
this.setAudioPosition = function(position){

}

this.onStatus = function(status) {

}
}