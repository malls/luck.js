//ensure dom ready with Ω().onload = (function(){ YOUR PAGE JS HERE });

var Ω = function(selector){
	if( selector === undefined ){
		return window;
	}else{
		return Ω.up(selector);
	}
};

Ω.__proto__ = Ω.prototype = {

	//initialze empty object and dom sector
	obj: null,

	up: function(selector){
		if(selector == undefined){
			return window;
		}else{
			var args = Array.prototype.slice.call(arguments);
			var letters = args[0].split('');
			if( letters[0] === "." ){
				letters.splice(0,1);
				selector = letters.join('');
				me = document.getElementsByClassName(selector);
			}else if( letters[0] === "#" ){
				letters.splice(0,1);
				selector = letters.join('');
				me = document.getElementById(selector);
			}else if( selector === document ){
				return document;
			}else{
				me = document.getElementsByTagName(selector);
			}
		}
		return Ω;
	},

	//event listeners

	click: function(fn){
		me.onclick = function(){
			fn();
		};
		return Ω;
	},

	mouseover: function(fn){
		me.onmouseover = function(){
			fn();
		};
		return Ω;
	},


	ondrag: function(fn){
		me.ondrag = function(){
			fn();
		};
		return Ω;
	},

	ondragover: function(fn){
		me.ondragover = function(){
			fn();
		};
		return Ω;
	},

	//functions

	draggable: function(){
		me.draggable = true;
		me.style.position = "absolute";
		me.ondrag = function(e){
			e.preventDefault();
			me.ondragover = function(e){
				e.preventDefault();
			}
			var xpos = e.x + "px";
			var ypos = e.y + "px";
			me.style.left = xpos;
			me.style.top = ypos;
		}
		return Ω;
	},

	eachDo: function(fn){
		for( var i = 0; i < me.length; i++ ){
			fn(me[i]);
		}
		return Ω;
	},

	hide: function(){
		if( me[0] === undefined){
			me.style.display = "none";
		}else{
			for( i = 0; i < me.length; i++ ){
				me[i].style.display = "none";
			}
		};
		return Ω;
	},

	show: function(){
		if( me[0] === undefined){
			me.style.display = "";
		}else{
			for( i = 0; i < me.length; i++ ){
			me[i].style.display = "";
			}
		};
		return Ω;
	},

	toggleDisplay: function(){
		if( me[0] === undefined){
			if( me.style.display != "none" ){
				me.style.display = "none";
				return Ω;
			}else{
				me.style.display = "";
				return Ω;
			}
		}else{
			for( i = 0; i < me.length; i++ ){
			 	if( me[i].style.display != "none" ){

					me[i].style.display = "none";
				}else{
					me[i].style.display = "";
				}
			}
		}
		return Ω;
	},

	itsClass: function(x){
		if(x === undefined){
			return me.className;
		} else {
			me.className = me.className + " " + x;
			return Ω;
		}
	},

	noClass: function(){
		me.className = "";
		return Ω;
	},

	destroy: function(){
		me.parentNode.removeChild(me);
		return Ω;
	},

	obj: function(){
		return me;
	},

	//make each
	duplicate: function(){
		var me2 = document.createElement(me.nodeName);
		me2.prototype = me.prototype;
		me2.style = me.style;
		me2.src = me.src;
		me2.class = me.class;
		me2.id = me.id + "_dupe";
		me.parentNode.appendChild(me2);
		me = me2;
		return Ω;
	},

	//make each
	noWhiteBg:  function(){
		if(me.style.display !== "none"){
			var can = document.createElement("canvas");
			can.height = me.height;
			can.width = me.width;
			can.id = me.id + "_nobg";
			can.style.cssText = me.style.cssText;
			me.parentNode.appendChild(can);
			can = can.getContext("2d");

      can.drawImage( me, 0, 0 );
      var data = can.getImageData( 0, 0, me.width, me.height );

      for ( var i = 0; i < data.data.length; i += 4 ){
      	if( data.data[i] + data.data[ i + 1 ] + data.data[ i + 2 ] > 720 ){
      		data.data[ i + 3 ] = 0;
      	} else if ( data.data[i] + data.data[ i + 1 ] + data.data[ i + 2 ] > 550 ){
      		data.data[ i + 3 ] = 200;
      	}
      };

      can.putImageData(data, 0, 0);
      Ω.hide(me);
      //apologies to @whtebkgrnd
	    }
	},

	//mashing
  showWhiteBg: function(){
  	var canvasName = me.id + "_nobg";
  	var can = document.getElementById(canvasName);
  	me.style.cssText = can.style.cssText;
  	can.parentNode.removeChild(can);
  	Ω.show(me);

  }
    	
};

Object.prototype.each = function (fn){
	for( i = 0; i < me.length; i++ ){
		fn(me[i]);
	}
};

//shorthand 
var me = Ω.prototype.obj;
