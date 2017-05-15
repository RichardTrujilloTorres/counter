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



		/**
		* Interval callback. 
		*
		* @return void
		*/
		function checkEvent() {
			vm.time.milliseconds++;

			// if (vm.time.milliseconds === 1000) { // time limit
			// 	$interval.cancel(vm.stop);
			// }
		}


		/**
		* Starts the timer. 
		*
		* @return void
		*/
		function timerStart() {
			vm.time.milliseconds = 0;
			vm.stop = $interval(vm.checkEvent, 1); // update each millisecond
		}

		/**
		* Stops the timer. 
		*
		* @return void
		*/
		function timerStop() {
			$interval.cancel(vm.stop);
			vm.time.total += vm.time.milliseconds;
		}



		loadPhotos();



		/**
		* Loads all photos. 
		*
		* @return void
		*/
		function loadPhotos() {

			dataservice
				.all('photo')
					.then(function success(data, headers, status, config) {
						// once loaded, start the counter
						vm.photos = data.data.Items;
						showNextPhoto();
						timerStart();
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});

			
		}

		/**
		* Creates a vote. 
		*
		* @param string answer
		*/
		function submitAnswer(answer) {

			var params = {
		        "userId": vm.user.id,
		        "sex": vm.user.sex,
		        "search": vm.user.likes,
		        "age": vm.user.age,
		        "photoId": vm.photo.photoId,
		        "like": (answer === 'no') ? "0/1" : "1/0",
		        "milliseconds": vm.time.milliseconds
		    };


		    // stop timer
			timerStop();


			// create vote
			dataservice
				.save('vote', params)
					.then(function success(data, headers, status, config) {

						// increase vote counter
						vm.votedPhotos++;
						showNextPhoto();
						timerStart();
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});
		}

		/**
		* Shows new photo. 
		*
		* @return void
		*/
		function showNextPhoto() {
			// check for end-of-test
			if (! (vm.votedPhotos === vm.NUMBER_OF_PHOTOS)) {
				// console.log(vm.photos[vm.votedPhotos]);
				vm.photo.path = vm.photos[vm.votedPhotos].path;
				vm.photo.photoId = vm.photos[vm.votedPhotos].photoId;
				vm.photo.sex = vm.photos[vm.votedPhotos].sex;	
			} else {
				$state.go('thanks', {
					time: vm.time
				});	
			}

		}
	
	}

})();