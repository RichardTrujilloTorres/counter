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



		if (! vm.time) {
			$state.go('main'); 
		}


		
		/**
		* Computates the average voting time.
		*
		* @param float total 
		* @param int numberOfElements  
		*
		* @return float
		*/
		function averageTime(total, numberOfElements) {		
			var avg = ( (total / 1000) / numberOfElements);
			return avg;
		}

		

	}

})();