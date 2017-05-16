(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserSexController', UserSexController);

	UserSexController.$inject = ['$http', '$state'];
	function UserSexController($http, $state) {
		var vm = this;
		vm.profile = {};
		vm.submit = submit;



		function submit(isValid) {
			if (isValid) {
				$state.go('likes', {
					user: vm.profile
				});
			}

			// show errors

		}

	}

})();

