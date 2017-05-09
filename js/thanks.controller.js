/**
* Thanks the user controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('ThanksController', ThanksController);

	function ThanksController($scope, $interval) {
		var vm = this;
		vm.timerStart = timerStart;
		vm.timerStop = timerStop;
		// vm.time = {};
		vm.checkEvent  = checkEvent;
		vm.stop;
		vm.averageTime = averageTime;

		vm.time = {
			milliseconds: 0,
			total: 0
		};


		function checkEvent() {
			vm.time.milliseconds++;
			// console.log(vm.time.seconds);

			if (vm.time.milliseconds === 1000) { // time limit
				$interval.stop(vm.stop);
			}
		}


		function timerStart() {
			console.log('timerStart()');
			// $scope.$broadcast('timer-start');

			vm.time.milliseconds = 0;
			vm.stop = $interval(vm.checkEvent, 1); // update each millisecond

		}

		function timerStop() {
			console.log('timerStop()');
			// $scope.$broadcast('timer-stop');

			$interval.cancel(vm.stop);
			vm.time.total += vm.time.milliseconds;
		}

		function averageTime(total, numberElements) {
			return (total / numberElements);
		}

	}

})();