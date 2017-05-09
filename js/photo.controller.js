/**
* Photo controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('PhotoController', PhotoController);

	PhotoController.$inject = ['$http', '$state', '$stateParams', 'dataservice', '$interval'];
	function PhotoController($http, $state, $stateParams, dataservice, $interval) {
		var vm = this;
		// vm.answer = {};
		vm.submitAnswer = submitAnswer;
		vm.photos = {};
		vm.photo = {};
		vm.NUMBER_OF_PHOTOS = 20;
		vm.votedPhotos = 0;
		vm.user = $stateParams.user;

		vm.timerStart = timerStart;
		vm.timerStop = timerStop;
		vm.time = {
			milliseconds: 0,
			total: 0
		};
		vm.checkEvent  = checkEvent;
		vm.stop;
		vm.averageTime = averageTime;


		function averageTime(total, numberElements) {
			return (total / numberElements);
		}

		function checkEvent() {
			vm.time.milliseconds++;
			// console.log(vm.time.seconds);

			if (vm.time.milliseconds === 1000) { // time limit
				$interval.cancel(vm.stop);
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

		// TODO: check user

		// console.log(vm.user);

		loadPhotos();




		// Loads all photos
		function loadPhotos() {
			// console.log('loading photos...');

			dataservice
				.all('photo')
					.then(function success(data, headers, status, config) {
						console.log(data.data.Items);
						// once loaded, start the counter
						vm.photos = data.data.Items;
						showNextPhoto();
						timerStart();
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});

			
		}

		// Creates vote
		function submitAnswer(answer) {

			// stop counter
			timerStop();

			// send answer
			// console.log(answer);

			var params = {
				"operation": "create",
				"payload": {
				    "TableName": "vote",
				    "Item": {
				        "userId": vm.user.id,
				        "sex": vm.user.sex,
				        "search": vm.user.likes,
				        "age": vm.user.age,
				        "photoId": vm.photo.photoId,
				        "like": (answer === 'no') ? "0/1" : "1/0",
				        "milliseconds": 100000000
				    }
				  }
			};


			// console.log(params);


			dataservice
				.save('vote', params)
					.then(function success(data, headers, status, config) {
						console.log(data);

						showNextPhoto();
						timerStart();
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});

			// increase vote counter
			vm.votedPhotos++;

			// check for end-of-test
			if (vm.votedPhotos === (vm.NUMBER_OF_PHOTOS - 1)) {
					// end of test
				$state.go('thanks');
			}

		}

		// Shows new photo
		function showNextPhoto() {
			// console.log(vm.photos[vm.votedPhotos]);
			vm.photo.path = vm.photos[vm.votedPhotos].path;
			vm.photo.photoId = vm.photos[vm.votedPhotos].photoId;
			vm.photo.sex = vm.photos[vm.votedPhotos].sex;
		}



		
	}

})();