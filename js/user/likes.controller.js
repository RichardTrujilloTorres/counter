(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserLikesController', UserLikesController);

	UserLikesController.$inject = ['$http', '$state', '$stateParams'];
	function UserLikesController($http, $state, $stateParams) {
		var vm = this;
		vm.profile = $stateParams.user;
		vm.submit = submit;



		function submit(isValid) {
			console.log(isValid);


			if (isValid) {
				$state.go('age', {
					user: vm.profile
				});
			}

			// show errors

		}

		if (! vm.profile) {
			$state.go('main');
		}

	}

})();

