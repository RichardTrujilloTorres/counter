(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserSexController', UserSexController);

	UserSexController.$inject = ['$http'];
	function UserSexController($http) {
		var vm = this;
		vm.profile = {};

	}

})();

