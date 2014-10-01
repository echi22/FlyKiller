function Controller(){
	this.attempts;
	this.moscas;
	_self = this;
	this.listOfMoscas = Array();
	this.level = 60;
	this.puntos = 0;
	this.moscaValue = 10;
	this.bateriaValue = 5;
	this.perdiste = false;
	this.killedMoscas=0;
	this.moscasSound;
	this.numMoscasSound = 1;
	this.moscasAlive;
	
	var mira = $("#mira");
	var miraArea = $("#miraArea");
	var miraImg = $("#miraImg");
	this.menu = function(){
		window.location.href="index.html";
	};
	this.restart = function(){
		this.puntos = 0;
		this.level = 1;
		this.perdiste = false;
		this.initialize();
	}
	
	this.initialize = function(){
			_self.setDataToCheckMira();
			_self.setCounter("digit",_self.level);
			/*$("#masterCounter").css("background", "url(imagenes/contador2.png) no-repeat center center")
			setTimeout(function(){$("#masterCounter").css("background", "url(imagenes/contador1.png) no-repeat center center")},1000);*/
			_self.setHighScore();
			if (_self.level==1)
				_self.setCounter("digithigh",localStorage.getItem("highScore"));
			$("#buttonContainer").hide();	
			if(this.moscasSound != null)
				this.moscasSound.stopAudio();
			this.moscasSound = new sonido();
			this.moscasSound.playAudio(/*getPhoneGapPath()+"sounds/"+*/_self.numberOfMoscasForSound(_self.level)+"moscas"/*.mp3*/,true);
			if (this.perdiste) 
			{
				this.removeAllMoscas();
				this.restart();
			} else {
				this.moscas = this.level;
				this.moscasAlive = this.moscas;
				this.killedMoscas = 0;
				document.addEventListener('moscaDied',this.moscaDied);
				this.attempts = this.bateriaValue;
				for(var i = 0; i < this.moscas; i++){
					$("#container").append("<img src='mosca.gif' class='mosca' id='mosca"+i+"' />");

					this.listOfMoscas.push(new Mosca(document.getElementById("mosca"+i),$("#mosca"+i)));
					this.listOfMoscas[i].initialize();
					this.listOfMoscas[i].controller = this;
				}				
				document.getElementById("bat-"+(this.attempts)).style.display ='block';
			}
			_self.moveMoscas();
	};
	this.moveMoscas = function()
	{
		for (var i=0;i<_self.listOfMoscas.length;i++)
		{
			_self.listOfMoscas[i].move();
		}
	}
	this.numberOfMoscasForSound = function(moscasLeft){
		return (moscasLeft > 5) ? 5 : moscasLeft;
	}
	this.checkIfKilled = function(){

			var killedOnThisShot = 0;
			if(this.attempts >0){
				killSomeone=false;
				var indices = [];
				for(var i=0; i < this.listOfMoscas.length; i++){
					if(this.listOfMoscas[i].isInMira()){
						
						indices.push(i);						
						killSomeone=true;
						this.moscasAlive--;
						this.killedMoscas++;
						killedOnThisShot++;
					}
				}		
				var moscasLeft = this.moscas - this.killedMoscas;
				var s = new sonido();		
				killedOnThisShot = (killedOnThisShot > 5) ? 5 : killedOnThisShot;
				if(killSomeone){				
					s.playAudio(/*getPhoneGapPath()+"sounds/"+*/killedOnThisShot+"MM"/*.mp3*/);
					if(moscasLeft <=0){
						_self.moscasSound.stopAudio();						
					}
				}
				else
					s.playAudio(/*getPhoneGapPath()+"sounds/*/"electricidad"/*.mp3*/);					
				for(var j =indices.length-1; j >=0; j--){					
					this.listOfMoscas[indices[j]].die();
					this.listOfMoscas.splice(indices[j], 1);
				}	
				if(moscasLeft > 0 && moscasLeft < 5 && killSomeone){
					var sound = new sonido();					
					sound.playAudio(/*getPhoneGapPath()+"sounds/"+*/_self.numberOfMoscasForSound(moscasLeft)+"moscas"/*.mp3*/,true);
					this.moscasSound.stopAudio();
					this.moscasSound = sound;

				}
				
				
				this.attempts--;
				document.getElementById("bat-"+(this.attempts+1)).style.display ='none';
				document.getElementById("bat-"+(this.attempts)).style.display ='block';
				if (!killSomeone && this.attempts<=0 && _self.moscasAlive > 0)
				{
					_self.lose();
					
				}
			}
		
	};
	
	this.moscaDied = function(){
		
		_self.moscas--;
		_self.killedMoscas--;
		if(_self.moscas <= 0){
			_self.win();
		}else{
			if(_self.attempts <= 0 && _self.killedMoscas==0){//2da condicion para ejecutar al terminar la ULTIMA animacion
				_self.lose();
			}
		}
	};
	
	this.setHighScore= function(){
		if ((localStorage.getItem("highScore") == null) ||  (localStorage.getItem("highScore") == "null"))
			localStorage.setItem("highScore",1);
		if(_self.level >= localStorage.getItem("highScore"))
		{
			localStorage.setItem("highScore",_self.level);
			_self.setCounter("digithigh",_self.level);
		}
	}
	this.showScore = function(){

		if (_self.perdiste){
			
			$("#uniqueButton").attr("src", "pantalla_resumen/restart-boton.png");
		} else {			
			$("#uniqueButton").attr("src", "pantalla_resumen/next-button.png");			
		}		
		$("#buttonContainer").show();
		
		
	};
	this.win = function(){		
		_self.level++;
		
		var moscasLeft = this.moscas - this.killedMoscas;
		_self.moscasSound.stopAudio();
		_self.showScore();		
	};
	this.setCounter = function(id,val){
		var localLevel=val;
		for (var i=0;i<3;i++)
		{
			_self.setNumber("#"+id+i, localLevel %10);
			localLevel=Math.floor(localLevel/10);
		}
		
	};
	
	this.setNumber = function(id, val){
		$(id).removeClass();
		$(id).addClass("digit-"+val);
	};
	this.lose = function(){		
		_self.perdiste = true;
		_self.showScore();
		
	};
	
	this.removeAllMoscas = function(){
		for(var i=0; i < _self.listOfMoscas.length; i++){			
			_self.listOfMoscas[i].element.parentNode.removeChild(element);
			_self.listOfMoscas.splice(i, 1);
			i--;
			_self.moscas--;
			
		}
	};
	this.al;
	this.ar;
	this.at;
	this.ab;
	this.cl;
	this.cr;
	this.ct;
	this.cb;
	this.dl;
	this.dr;
	this.dt;
	this.db;
	this.setDataToCheckMira = function(){
		var a = mira;
		var c = miraImg;
		var d = miraArea;
		this.al = parseInt(a.css("left"));
		this.ar = parseInt(a.css("left"))+parseInt(a.css("width"));
		this.dl = this.al + parseInt(d.css("left"));
		this.dr = this.dl + parseInt(d.css("width"));
		this.at = parseInt(a.css("top"));
		this.ab = parseInt(a.css("top"))+parseInt(a.css("height"));
		this.dt = this.at + parseInt(d.css("top"));
		this.db = this.dt + parseInt(d.css("height"));
	}

}
