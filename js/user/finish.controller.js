(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserFinishController', UserFinishController);

	UserFinishController.$inject = ['$http', '$state', 'dataservice', '$stateParams'];
	function UserFinishController($http, $state, dataservice, $stateParams) {
		var vm = this;
		vm.createProfile = createProfile;
		vm.profile = $stateParams.user;

		if (! vm.profile) {
			$state.go('main');
		}



		/**
		* User Profile Creation
		*/
		function createProfile() {

			var params = {
		        "sex": vm.profile.sex,
		        "search": vm.profile.likes,
		        "age": vm.profile.age
	    	};
			
			dataservice
				.save('user', params)
					.then(function success(data, headers, status, config) {
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

