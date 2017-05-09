/**
* User Profile Creation Controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserController', UserController);

	UserController.$inject = ['$http', '$state', 'dataservice'];
	function UserController($http, $state, dataservice) {
		var vm = this;
		vm.profile = {};
		vm.createProfile = createProfile;

		console.log('UserController()');


		// Creates user profile
		function createProfile() {
			console.log(vm.profile);

			var params = {
				operation: 'create',
				payload: {
					"TableName": "user",
				    "Item": {
				        "sex": vm.profile.sex,
				        "search": vm.profile.likes,
				        "age": vm.profile.age
			    	}
				}
			};


			
			dataservice
				.save('user', params)
					.then(function success(data, headers, status, config) {
						console.log(data);
						// move to voting section
						$state.go('photo', {
							user: {
								id: data.data,
								sex: vm.profile.sex,
								likes: vm.profile.likes,
								age: vm.profile.age
							}
						});
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});

		}

		
	}

})();