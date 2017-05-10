/**
* Thanks the user controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('ThanksController', ThanksController);

	ThanksController.$inject = ['$scope', '$interval', '$stateParams', '$state'];
	function ThanksController($scope, $interval, $stateParams, $state) {
		var vm = this;
		vm.time = $stateParams.time;
		vm.averageTime = averageTime;


		vm.avgVoteTime = vm.averageTime(vm.time.total, 20); 

		function averageTime(total, numberElements) {		
			var avg = ( (total / 1000) / numberElements);
			return avg;
		}

		if (! vm.time) {
			$state.go('main'); 
		}

	}

})();