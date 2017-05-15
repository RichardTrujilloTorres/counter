(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserAgeController', UserAgeController);

	UserAgeController.$inject = ['$http', '$state', '$stateParams'];
	function UserAgeController($http, $state, $stateParams) {
		var vm = this;
		vm.profile = $stateParams.user;

		if (! vm.profile) {
			$state.go('main');
		}

	}

})();

