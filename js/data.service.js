(function() {
	'use strict';

	angular
		.module('app')
		.service('dataservice', data);

	data.$inject = ['$http'];
	function data($http) {
		var URL = 'https://y8ohrxiy96.execute-api.eu-west-1.amazonaws.com/prod';

		return {
			all: function(resourceUri) {
				return $http.get(URL + '/' + resourceUri);
			},
			get: function(resourceUri, id) {
				return $http.get(URL + resourceUri + "/" + id);
			}, 
			save: function(resourceUri, params) {
				return ($http({
					method: 	'POST',
					url: 		URL + "/" + resourceUri,
					headers: 	{ 
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin': '*' 
					},
					data: 		params
				}));
			},
			put: function(resourceUri, id, params) {
				return $http({
					method: 	'POST',
					url: 		URL + resourceUri + "/" + id,
					headers: 	{ 'Content-Type' : 'application/json' },
					data: 		params
					
				});
			},
			destroy: function(resourceUri, id) {
				return $http.delete(URL + resourceUri + "/" + id);
			}
		};
	}

})();