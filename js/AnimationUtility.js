///// Initialization
var AnimationUtility = function( aMethod )
{
	// Dev
	var queryStringUpdateMethod = this.getUpdateMethodFromQueryString();

	// TODO: Use Modernizer to determin proper function mapping
	this.method = queryStringUpdateMethod || AnimationUtility.prototype.DEFAULT_METHOD;
	this['setPosition'] = this['setPositionUsing'+this.method];
	this['setOpacity'] = this['setOpacityUsing'+this.method];
	return this;
};

/**
 * Dev function to force updateMethod via query string
 * @return {String} The query string set via '?updateMethod' or null
 */
AnimationUtility.prototype.getUpdateMethodFromQueryString = function() {
	var anUpdateMethod = QueryStringManager.getValue('updateMethod');
	if(anUpdateMethod) { // Found something
		anUpdateMethod = anUpdateMethod.toUpperCase();

		// Update method passed in is bogus, force whatever
		if( !AnimationUtility.prototype.METHOD_TYPES[anUpdateMethod] ) {
		  anUpdateMethod = null;
		} else { // Valid type
			anUpdateMethod = AnimationUtility.prototype.METHOD_TYPES[anUpdateMethod];
		}
	}

	return anUpdateMethod;
}

// These functions are what will be called externally, we will point them to the proper 'method" using Modernizer or some such tool
AnimationUtility.prototype.setPosition = null;
AnimationUtility.prototype.setOpacity = null;

// Available method types
AnimationUtility.prototype.METHOD_TYPES = { CSS: 'CSS', TRANSFORM: 'Transform', JQUERY: 'Jquery' };
AnimationUtility.prototype.DEFAULT_METHOD = AnimationUtility.prototype.METHOD_TYPES.CSS;

///// Positioning
/**
 * Positioning via CSS 'style' property access
 * @param {HTMLDivElement} divElement	Reference to HTMLElement
 * @param {Number} xpos			X position
 * @param {Number} ypos			Y Position
 */
AnimationUtility.prototype.setPositionUsingCSS = function(divElement, xpos, ypos)
{
	divElement.style.left = (xpos << 0) + "px";
	divElement.style.top = (ypos << 0) + "px";
};
/**
 * @inheritDoc
 */
AnimationUtility.prototype.setPositionUsingJquery = function(divElement, xpos, ypos)
{
	$(divElement).offset({left: xpos << 0, top: ypos << 0});
};

/**
 * @inheritDoc
 */
AnimationUtility.prototype.setPositionUsingTransform = function(divElement, xpos, ypos)
{
	// TODO: These should be fixed only on first run
	if(divElement.style.left !== '0px')
		divElement.style.left = '0px';
	if(divElement.style.top !== '0px')
		divElement.style.top = '0px';

	// Matrix translate the position of the object in webkit & firefox
	divElement.style.webkitTransform = "translate3d("+(xpos << 0)+"px,"+(ypos << 0)+"px, 0px)";
	divElement.style.MozTransform = "translate("+(xpos << 0)+"px,"+(ypos << 0)+"px)";
};

///// Alpha
/**
 * Set an elements opacity property
 * @param {Number} divElement	Reference to HTMLElement
 * @param {Number} newOpacity 	New opacity value
 */
AnimationUtility.prototype.setOpacityUsingCSS = function(divElement, newOpacity)
{
	divElement.style.opacity = newOpacity
};
/**
 * @inheritDoc
 */
AnimationUtility.prototype.setOpacityUsingJquery = function(divElement, newOpacity)
{
	$(divElement).css('opacity', newOpacity);
};
/**
 * @inheritDoc
 */
AnimationUtility.prototype.setOpacityUsingTransform = function(divElement, newOpacity)
{
	this.setOpacityUsingCSS(divElement, newOpacity);
};

///// Helpers
/**
 * Remove unwanted CSS 'animation' properties
 * @param aSelector
 */
AnimationUtility.prototype.removeCSSOnObjectsInSelector = function(aSelector)
{
	var allSections = $(aSelector);
	var unwantedProperties	= ['opacity', 'left', 'top', '-webkit-transition-property', '-webkit-transition-duration','-webkit-border-radius','-moz-border-radius', 'border-radius'];
	var newDefaults			= ['1', '0px', '0px', 'all 0s linear', '0s', '0px', '0px', '0px'];
	var len = unwantedProperties.length;
	allSections.each(function(index, divElement) {
		for(var i = 0; i < len; i++) {
			divElement.style[unwantedProperties[i]] = newDefaults[i];
		}
	});
	//$("#mainHub").offset().left
}