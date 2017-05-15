(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserLikesController', UserLikesController);

	UserLikesController.$inject = ['$http', '$state', '$stateParams'];
	function UserLikesController($http, $state, $stateParams) {
		var vm = this;
		vm.profile = $stateParams.user;

		if (! vm.profile) {
			$state.go('main');
		}

	}

})();

