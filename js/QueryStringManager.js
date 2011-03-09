/**
 File:
 	QueryStringManager
 Created By:
	 Adam Kirschner
 Project	:
 	Ogilvy Holiday Card 2010
 Abstract:
 	Retrieve and set the query string
 Basic Usage:

 */
(function(global) {
	var _location = global['location'],
		_queryString = {};

	// TODO: Place into something, should not be global but does not belong in GRAVEDANGER namespace, so for now its global

	// Singleton
	global['QueryStringManager'] =
	{
		init: function()
		{
			if( _location.search && _location.search.length > 0 )
			{
				var splitPair = _location.search.substring(1).split("&"),
					i = splitPair.length;

				while(i--)
				{
					var splitPiece = splitPair[i].split("="),
						name = splitPiece[0].trim(),
						value = decodeURI( splitPiece.length > 1 ? splitPiece[1].trim() : "" );

					_queryString[ name ] = value;
				}
			}
		},

		getValue: function( name )
		{
			return _queryString[ name ];
		},

		hasValue: function( name )
		{
			return name in _queryString;
		},

		/**
		 * Output all values to console.
		 */
		dump: function()
		{
			for(var val in _queryString) {
				console.log('(QueryStringManager):: name:' + val + " value:" + _queryString[val]);
			}
		}
	};

	// Listen for browser ready
	$( QueryStringManager.init );
})(window, window.location);