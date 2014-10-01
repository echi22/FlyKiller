function Mosca(element){
	this.angle = 0;
	this.degreeInRadians = 2*Math.PI/360;
	this.realX = 0; 
	this.realY = 0;
	this.repeat = 10;
	this.rotatingToWithin=false;
	this.p = 0;
	this.direction = 0;
	this.isDead = false;
	this.anguloSalvador;
	this.element = element;
	var _self = this;
	var forIndex=4;
	var mira = $("#mira");
	this.initialize = function(){
		_self.placeInCenter();
		window.setInterval(_self.move,20);
		setTimeout(_self.rotate,Math.random()*150+50);
		window.setInterval(_self.chooseDirection,Math.random()*1000+500);
	};
	this.chooseDirection = function(){
		_self.p = Math.floor(Math.random() * 10);
	};
	this.rotateRight = function(degrees) {
		if(_self.angle+degrees <=360) {
			_self.angle+=degrees;
		}
		else {
			_self.angle=degrees - 360 + _self.angle;
		}
		_self.element.rotate(_self.angle);
	};

	this.rotateLeft= function(degrees) {
		if(_self.angle-degrees >= 0) {
			_self.angle-=degrees;
		}
		else {
			_self.angle=360 + _self.angle - degrees;
		}
		_self.element.rotate(_self.angle);
	};

	this.moveForward = function(speed) {
		//move the element to polar cordinate (speed,angle)
		_self.realX = _self.realX + Math.cos(_self.degreeInRadians * _self.angle);
		_self.realY = _self.realY + Math.sin(_self.degreeInRadians * _self.angle);
		
		_self.element.css({ top: _self.realY, left: _self.realX });
	};
	this.rotate = function(){
		if (!_self.rotatingToWithin && !_self.isDead)
		{
			if(_self.p >= 5){
				_self.rotateLeft(10);
			}else{
				_self.rotateRight(10);
			}
			setTimeout(_self.rotate,Math.random()*50+50);
		}
	};
	this.isNearLimits= function()
	{
		var currentTop=parseInt(_self.element.css("top"));
		var currenLeft=parseInt(_self.element.css("left"));
		var lowerLimitTop=window.screen.height*0.10;
		var lowerLimitLeft=window.screen.width*0.10;
		var maxLeft=window.screen.width-lowerLimitLeft;
		var maxTop=window.screen.height-lowerLimitTop;
		
		
		return ((currentTop<lowerLimitTop) || (currentTop>maxTop) || (currenLeft<lowerLimitLeft) || (currenLeft>maxLeft-30));
	}
	this.move = function(){
		if(!_self.isDead){
			if (_self.isNearLimits())
			{
				if(!_self.rotatingToWithin){					
					_self.rotatingToWithin = true;
					_self.startRotatingToWithin();
					_self.saveMoscaFromDeath();
				}
				
			}else{
				/*if(_self.rotatingToWithin)
					setTimeout(_self.rotate,Math.random()*150+50);*/
				_self.rotatingToWithin = false;
				for(var i =0; i < forIndex; i++){
					_self.moveForward(1);
				}
			}
		}
		
	};
	this.saveMoscaFromDeath = function(){
		/*if(Math.abs(_self.anguloSalvador - _self.angle) > 20){
			if (_self.anguloSalvador > _self.angle)
			{
				_self.rotateRight(10);
			} else {
				_self.rotateLeft(10);
			}
		}

		if (_self.isNearLimits())
			_self.saveMoscaFromDeath();*/
		for(var i =0; i < forIndex; i++){
			_self.moveForward(1);
		}
	};
	this.startRotatingToWithin = function(){	
		var top = (parseInt(_self.element.css("top")) < window.innerHeight /2);
		var left = (parseInt(_self.element.css("left")) < window.innerWidth /2);
		if (top)
		{
			if (left) //ARRIBA IZQUIERDA
			{
			} else { //ARRIBA DERECHA
			}
		} else {
			if (left) //ABAJO IZQUIERDA
			{
			} else { //ABAJO DERECHA
			}			
		}
		/*var angulin;
		var left;
		if(parseInt(_self.element.css("left")) > window.innerWidth /2){
			left=false;
			var opuesto = Math.abs(window.innerWidth/2 - parseInt(_self.element.css("left")));
			var adyacente = Math.abs(window.innerHeight/2 - parseInt(_self.element.css("top")));
		}else{			
			left=true;
			var adyacente = Math.abs(window.innerWidth/2 - parseInt(_self.element.css("left")));
			var opuesto = Math.abs(window.innerHeight/2 - parseInt(_self.element.css("top")));
		}
		var hipotenusa = Math.sqrt(opuesto*opuesto+adyacente*adyacente);
		var top = (parseInt(_self.element.css("top")) < window.innerHeight /2);
		var arcsin=(180/Math.PI)*Math.asin(opuesto / hipotenusa);
		if (top)
		{
			if (left)
			{
				angulin = arcsin;
			} else {
				angulin = 180 - arcsin;
			}
		} else {
			if (left)
			{
				angulin = 360 - arcsin;
			} else {
				angulin = 270 - arcsin;
			}			
		}
		_self.anguloSalvador = angulin;*/
	};	
	this.placeInCenter = function() {
		// get viewport height and width and divide it by 2
		centerY = parseInt($("#mira").css("top")) +parseInt($("#mira").css("height"))+ 20;
		centerX = window.innerWidth/2 - (Math.random()*100+Math.random()*100) ;
		
		//set absoulte positioning on element
		_self.element.css("position", "absolute");
		// place the element
		_self.element.css({ top: centerY, left: centerX });
		//update realX and realY
		_self.realX = centerX;
		_self.realY = centerY;
	}
	this.die = function(){
		_self.isDead = true;
		_self.element.attr("src","moscaMuerta.jpg");
		_self.fallDown();
	};
	this.fallDown = function(){
		_self.element.animate({top: window.innerHeight-20+"px"}, 2000,
		function(){
			_self.element.remove();
			delete this;
			var event = new Event('moscaDied');
			document.dispatchEvent(event);
		} );
	};	
	this.isInMira = function(){
		var b = _self.element;
		var a = mira;
		var al = parseInt(a.css("left"));
		var ar = parseInt(a.css("left"))+parseInt(a.css("width"));
		var bl = parseInt(b.css("left"));
		var br = parseInt(b.css("left"))+parseInt(b.css("width"));

		var at = parseInt(a.css("top"));
		var ab = parseInt(a.css("top"))+parseInt(a.css("height"));
		var bt = parseInt(b.css("top"));
		var bb = parseInt(b.css("top"))+parseInt(b.css("height"));

		if(bl>ar || br<al){return false;}//overlap not possible
		if(bt>ab || bb<at){return false;}//overlap not possible

		if(bl>al && bl<ar){return true;}
		if(br>al && br<ar){return true;}

		if(bt>at && bt<ab){return true;}
		if(bb>at && bb<ab){return true;}

		return false;
	}
}
