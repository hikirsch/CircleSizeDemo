var colornames = [ 'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen' ];

function DemoCircle() {
	this.radius = this.getNewRadius();

	this.animationUtility = new AnimationUtility();

	this.shouldFade = true;

	this.docHeight = $('body').height();
	this.docWidth = $('body').width();

	var newPos = this.getNewPosition();

	this.x = newPos.x;
	this.y = newPos.y;

	this.addToDOM();
};

DemoCircle.prototype.getNewPosition = function () {
	var x = Math.floor( Math.random() * this.docWidth ),
		y = Math.floor( Math.random() * (this.docHeight) );

	x = Math.min( x, this.docWidth - this.radius );
	y = Math.min( y, this.docHeight - this.radius );

	return {
		x: x,
		y: y
	};
};


DemoCircle.prototype.getNewRadius = function() {
	return Math.floor( Math.random() * 150 ) + 20;
}

DemoCircle.prototype.addToDOM = function() {
	this.element = $('<div class="circle">' +
//			'<div class="orange"></div>' +
//			'<div class="white"></div>' +

			'<img src="img/circle-3.png" width="100%" height="100%" />' +
			'<img src="img/circle.png" width="100%" height="100%" />' +

		'</div>'
		)
		.css({
			height: this.radius + "px",
			width: this.radius + "px",
			left: this.x,
		    top: this.y
			// backgroundColor: colornames[ Math.floor( Math.random() * colornames.length ) ]
		})
		.appendTo('body');
};

DemoCircle.prototype.startFade = function( direction ) {
	var that = this;

	var ele = this.element.find('img').get(1);

	new TWEEN.Tween({opacity: direction ? 1 : 0})
		.to({opacity: direction ? 0 : 1}, Math.floor( Math.random() * 5000 ) )
		.onUpdate(function() {
			that.animationUtility.setOpacityUsingJquery( ele, this.opacity);
		})
		.onComplete( function() {
			if( that.shouldFade ) {
				that.startFade( ! direction );
			}
		})
		.easing(TWEEN.Easing.Quadratic.EaseIn)
		.start();

};

DemoCircle.prototype.animatePosition = function() {
	var that = this;

	var pos = this.getNewPosition();

	new TWEEN.Tween({top: this.y, left: this.x })
		.to({ left: pos.x, top: pos.y },  Math.floor( Math.random() * 7000 ) + 3000)
		.onUpdate(function() {
			that.animationUtility.setPosition( that.element.get(0), this.left, this.top );
		})
		.onComplete( function() {
			that.x = pos.x;
			that.y = pos.y;

			that.animatePosition();
		})
		.easing(TWEEN.Easing.Quadratic.EaseIn)
		.start();
};

DemoCircle.prototype.animateSize = function() {
	var that = this;

	var newRadius = this.getNewRadius();

	new TWEEN.Tween({width: this.radius, height: this.radius })
		.to({width: newRadius, height: newRadius },  Math.floor( Math.random() * 3000 ) + 2000 )
		.onUpdate(function() {
			var ele = that.element.get(0);
			ele.style.height = this.height + "px";
			ele.style.width = this.width + "px";
		// that.animationUtility.setPosition( that.element.get(0), this.width, this.height );
		})
		.onComplete( function() {
			that.radius = newRadius;

			that.animateSize();
		})
		.easing(TWEEN.Easing.Quadratic.EaseIn)
		.start();
};