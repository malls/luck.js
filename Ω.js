//ensure dom ready with Ω().onload = (function(){ YOUR PAGE JS HERE });

var Ω = function(selector){
	if( selector === undefined ){
		return window;
	}else{
		return Ω.up(selector);
	}
};

Ω.__proto__ = Ω.prototype = {

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
	
	hide: function(){
		me.style.display = "none";
		return Ω;
	},

	show: function(){
		me.style.display = "";
		return Ω;
	},

	toggleDisplay: function(){
		if( me.style.display != "none" ){
			me.style.display = "none";
		}else{
			me.style.display = "";
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

	noBg:  function(){
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
	    	}
	    },

    showBg: function(){
    	var canvasName = me.id + "_nobg";
    	var can = document.getElementById(canvasName);
    	me.style.cssText = can.style.cssText;
    	can.parentNode.removeChild(can);
    	Ω.show(me);

    }
	
}

var me = Ω.prototype.obj;
