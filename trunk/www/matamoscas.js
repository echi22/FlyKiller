function Mosca(element,jqueryElement){
	this.angle = 0;
	this.degreeInRadians = 2*Math.PI/360;
	this.realX = 0; 
	this.realY = 0;
	this.repeat = 10;
	this.rotatingToWithin=false;
	this.p = 0;
	this.direction = 0;
	this.isDead = false;
	this.element = element;
	this.jqueryElement = jqueryElement;
	var _self = this;
	var limitSpeed;
	var forIndex=4;
	var controller;
	var mira = $("#mira");
	var miraArea = $("#miraArea");
	var miraImg = $("#miraImg");
	var rotationAngleToWithing=4;
	var porDondeSalio;
	this.directionInterval;
	this.originalX;
	this.originalY;
	this.initialize = function(){
		_self.setLimits();
		_self.placeInCenter();
		
		//window.setInterval(_self.move,20);		
		this.limitSpeed = parseInt(window.innerHeight) / parseInt(window.innerHeight)*0.6;
		setTimeout(_self.rotate,Math.random()*150+50);
		this.directionInterval=window.setInterval(_self.chooseDirection,Math.random()*4000+1000);
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
		_self.rotateElement(_self.angle);
	};
	this.rotateElement = function(degrees){
		
		_self.element.style.webkitTransform = 'rotate3d(0,0,1,'+degrees+'deg)'; 
		_self.element.style.mozTransform    = 'rotate3d(0,0,1,'+degrees+'deg)'; 
		_self.element.style.msTransform     = 'rotate3d(0,0,1,'+degrees+'deg)'; 
		_self.element.style.oTransform      = 'rotate3d(0,0,1,'+degrees+'deg)'; 
		_self.element.style.transform       = 'rotate3d(0,0,1,'+degrees+'deg)';
		//_self.jqueryElement.velocity({rotateZ:degrees+"deg"},0.1);
	};
	this.rotateLeft= function(degrees) {
		if(_self.angle-degrees >= 0) {
			_self.angle-=degrees;
		}
		else {
			_self.angle=360 + _self.angle - degrees;
		}
		_self.rotateElement(_self.angle);
	};

	
	this.getSupportedPropertyName = function(properties) {
		for (var i = 0; i < properties.length; i++) {
			if (typeof document.body.style[properties[i]] != "undefined") {
				return properties[i];
			}
		}
		return null;
	};
	
	this.moveForward = function(speed) {
		//move the element to polar cordinate (speed,angle)		
		_self.realX = _self.realX + _self.limitSpeed * Math.cos(_self.degreeInRadians * _self.angle);
		_self.realY = _self.realY + _self.limitSpeed * Math.sin(_self.degreeInRadians * _self.angle);
		/*difX=_self.realX-_self.originalX;
		difX=_self.realX-_self.originalX;
		
		difY=_self.realY-_self.originalY;
		move('.mosca').to(difX,difY).end();*/
		_self.element.style.top= _self.realY;		
		_self.element.style.left= _self.realX;
	};
	
	this.rotate = function(){
		if (!_self.rotatingToWithin && !_self.isDead)
		{
			if(_self.p >= 5){
				_self.rotateLeft(5);
			}else{
				_self.rotateRight(5);
			}
			setTimeout(_self.rotate,Math.random()*50+50);
		}
	};
	this.lowerLimitTop;
	this.lowerLimitLeft;
	this.maxLeft;
	this.lampLowerLimit;
	this.setLimits = function(){
		this.lowerLimitTop=window.screen.height*0.13;
		this.lowerLimitLeft=window.screen.width*0.35;
		this.maxLeft=window.screen.width-this.lowerLimitLeft;
		//para hacer la linea de abajo curva
		this.lampLowerLimit=window.screen.height*0.4;
	};
	this.isNearLimits= function()
	{
	//return true;
		var currentTop=parseInt(_self.realY);
		
		var currentLeft=parseInt(_self.realX);
		
		var soFarDown = currentTop>_self.lampLowerLimit;	
		
		//return ((currentTop<_self.lowerLimitTop)||(soFarDown && (porDondeSalio != "abajo"))||(currentLeft<_self.lowerLimitLeft)||(currentLeft>_self.maxLeft));
			
		if (currentTop<_self.lowerLimitTop){
			porDondeSalio="arriba";
			return true;
		} else if (soFarDown && (porDondeSalio != "abajo")){
			porDondeSalio="abajo";
			return true;
		} else if (currentLeft<_self.lowerLimitLeft){
			porDondeSalio="izquierda";
			return true;
		} else if (currentLeft>_self.maxLeft){
			porDondeSalio="derecha";
			return true;
		}else if (soFarDown){
			porDondeSalio="abajo";
			return true;
		}
		return false;
	}
	this.move = function(){
		if(!_self.isDead){
			if (_self.isNearLimits())
			{
				if(!_self.rotatingToWithin){
					_self.direction = Math.floor(Math.random() * 10);
					_self.rotatingToWithin = true;
					//setTimeout(_self.saveMoscaFromDeath,1500);
				}
				_self.startRotatingToWithin();
			}else{
				if(_self.rotatingToWithin)
					setTimeout(_self.rotate,Math.random()*150+50);
				_self.rotatingToWithin = false;
				for(var i =0; i < forIndex; i++){
					_self.moveForward(1);
				}
			}
		}
		setTimeout(_self.move,20);
		
	};

	this.startRotatingToWithin = function(){		
		if(_self.direction >= 5){		
			if (!_self.angleIsOk())
				_self.rotateLeft(rotationAngleToWithing);				
		}else{
			if (!_self.angleIsOk())
				_self.rotateRight(rotationAngleToWithing);			
		}
		for(var i =0; i < forIndex; i++){
			_self.moveForward(1);
		}
	};	
	
	this.angleIsOk = function(){
		switch (porDondeSalio){
			case "arriba":
				return ((_self.angle>45) && (_self.angle<135));
			case "abajo":
				return ((_self.angle>225) && (_self.angle<315));
			case "izquierda":
				return (((_self.angle>315) && (_self.angle<360)) || ((_self.angle>0) && (_self.angle<45)));
			case "derecha":
				return ((_self.angle>135) && (_self.angle<225));
		}
	}

	this.placeInCenter = function() {
		// get viewport height and width and divide it by 2
		//centerY = parseInt($("#mira").css("top")) +parseInt($("#mira").css("height")) ;
		centerY = window.innerHeight - (window.innerHeight *0.20);
		centerX = window.innerWidth/2  ;
		_self.originalX=centerX;
		_self.originalY=centerY;
		//set absoulte positioning on element
		_self.element.style.position="absolute";
		// place the element
		_self.element.style.top = centerY;
		_self.element.style.left = centerX;
		
		//update realX and realY
		_self.realX = centerX;
		_self.realY = centerY;
		_self.rotateRight(Math.random()*360);
	}
	this.die = function(){
		_self.isDead = true;
		var selfWidth = _self.element.style.width;
		var selfHeight = _self.element.style.height;
		_self.element.src = "mosca-muerta.png";
		_self.element.style.width = selfWidth;
		_self.element.style.height = selfHeight;
		_self.fallDown();
		window.clearInterval(_self.directionInterval);
	};
	this.animate = function(x,y){
		var transform = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
  
		var item = _self.element;
		var transformProperty = _self.getSupportedPropertyName(transform);
		  
		  
		if (transformProperty) {
			item.style[transformProperty] = "translate3d("+x+"px, "+y+"px, 0px)";
		}
	};
	this.fallDown = function(){
		/*_self.element.className = _self.element.className + " open";
		setTimeout(function(){
			_self.element.parentNode.removeChild(element);
			_self.controller.moscaDied();		
			delete this;
		},2000);*/
		
		
		_self.jqueryElement.velocity({top: window.innerHeight-20+"px"}, 2000,
		function(){
			_self.element.remove();
			_self.controller.moscaDied();		
			delete this;
			
			/*var event = new Event('moscaDied');
			document.dispatchEvent(event);*/
		} );
		/*_self.element.animate({top: window.innerHeight-20+"px"}, 2000,
		function(){
			_self.element.remove();
			_self.controller.moscaDied();		
			delete this;
		} );*/
	};	
	
	this.isInMira = function(){
		var b = _self.element;
		var bl = parseInt(b.offsetLeft);
		var br = parseInt(b.offsetLeft)+parseInt(b.offsetWidth);		
		var bt = parseInt(b.offsetTop);
		var bb = parseInt(b.offsetTop)+parseInt(b.offsetHeight);
		if(bl>_self.controller.dr || br<_self.controller.dl){return false;}//overlap not possible
		if(bt>_self.controller.db || bb<_self.controller.dt){return false;}//overlap not possible

		if(bl>_self.controller.dl && bl<_self.controller.dr){return true;}
		if(br>_self.controller.dl && br<_self.controller.dr){return true;}

		if(bt>_self.controller.dt && bt<_self.controller.db){return true;}
		if(bb>_self.controller.dt && bb<_self.controller.db){return true;}

		return false;
	}
}
