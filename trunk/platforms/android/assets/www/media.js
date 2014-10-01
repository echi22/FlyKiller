function sonido(){


// Audio player
//
var my_media = "";
var mediaTimer = null;
var _self = this;
var loop = false;
// Play audio
//
this.initialize = function(){
	this.my_media = null;
	this.mediaTimer = null;
}
this.transition=function(src,loop){

}
this.playAudio = function(src,loop) {
	// Create Media object from src
	if(loop)
		_self.loop = true;
	this.initialize();
	_self.my_media = new Media(src, _self.onSuccess, _self.onError,_self.onStatus);
	// Play audio
	_self.my_media.play();

	// Update my_media position every second
	/*if (_self.mediaTimer == null) {
		_self.mediaTimer = setInterval(function() {
			// get my_media position
			_self.my_media.getCurrentPosition(
				// success callback
				function(position) {
					if (position > -1) {
						_self.setAudioPosition((position) + " sec");
					}
				},
				// error callback
				function(e) {
					console.log("Error getting pos=" + e);
					_self.setAudioPosition("Error: " + e);
				}
			);
		}, 1000);
	}*/
}

// Pause audio
//
this.pauseAudio = function() {
	if (_self.my_media) {
		_self.my_media.pause();
	}
}

// Stop audio
//
this.stopAudio = function() {
	_self.loop = false;
	if (_self.my_media) {
		_self.my_media.stop();
	}	
	clearInterval(_self.mediaTimer);
	_self.mediaTimer = null;
}

// onSuccess Callback
//
this.onSuccess =  function() {	
	console.log("playAudio():Audio Success");
}

// onError Callback
//
this.onError= function(error){
	/*alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');*/
	//alert(error);
	if (error.code != 0) //Error code 0 indica success, es un problema de la plataforma
	{
	 var errors = {};
		 errors[MediaError.MEDIA_ERR_ABORTED]= "Stop playing!";
		 errors[MediaError.MEDIA_ERR_NETWORK]= "error in network!";
		 errors[MediaError.MEDIA_ERR_DECODE] = "Could not decode file!";
		 errors[MediaError.MEDIA_ERR_NONE_SUPPORTED] = "Format not supported!";
		 alert("Media error code: " +error.code+ " Message: " + errors[error.code]);
	}
}

// Set audio position
//
this.setAudioPosition = function(position){
	//document.getElementById('audio_position').innerHTML = position;
}
this.onStatus = function(status) {
        if( status==Media.MEDIA_STOPPED && _self.loop) {
           _self.my_media.play();
        }
    }
}