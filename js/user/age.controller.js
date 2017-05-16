(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserAgeController', UserAgeController);

	UserAgeController.$inject = ['$http', '$state', '$stateParams'];
	function UserAgeController($http, $state, $stateParams) {
		var vm = this;
		vm.profile = $stateParams.user;
		vm.submit = submit;



		function submit(isValid) {
			if (isValid) {
				$state.go('finish', {
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

