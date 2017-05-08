
(function() {
	'use strict';

	angular
		.module('app', [
		'ngAnimate',
		'ui.router',
		]);
		

})();



/**
* Main controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$http'];
	function MainController($http) {
		var vm = this;

		console.log('MainController()');
	}

})();


/**
* User Profile Creation Controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserController', UserController);

	UserController.$inject = ['$http', '$state', 'dataservice'];
	function UserController($http, $state, dataservice) {
		var vm = this;
		vm.profile = {};
		vm.createProfile = createProfile;

		console.log('UserController()');



		function createProfile() {
			console.log(vm.profile);

			var params = {
				operation: 'create',
				payload: {
					"TableName": "user",
				    "Item": {
				        "sex": vm.profile.sex,
				        "search": vm.profile.likes,
				        "age": vm.profile.age
			    	}
				}
			};


			// create profile
			dataservice
				.save('user', params)
					.then(function success(data, headers, status, config) {
						console.log(data);
						// move to voting section
						$state.go('photo', {
							user: {
								id: data.data,
								sex: vm.profile.sex,
								likes: vm.profile.likes,
								age: vm.profile.age
							}
						});
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});

		}

		
	}

})();




/**
* Photo controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('PhotoController', PhotoController);

	PhotoController.$inject = ['$http', '$state', '$stateParams', 'dataservice'];
	function PhotoController($http, $state, $stateParams, dataservice) {
		var vm = this;
		// vm.answer = {};
		vm.submitAnswer = submitAnswer;
		vm.photos = {};
		vm.photo = {};
		vm.NUMBER_OF_PHOTOS = 20;
		vm.votedPhotos = 0;
		vm.user = $stateParams.user;

		// TODO: check user

		console.log(vm.user);

		loadPhotos();





		function loadPhotos() {
			console.log('loading photos...');

			dataservice
				.all('photo')
					.then(function success(data, headers, status, config) {
						console.log(data.data.Items);
						// once loaded, start the counter
						vm.photos = data.data.Items;
						showNextPhoto();

						startCounter();
					}, function error(response) {
						console.log('Something went wrong');
						$state.go('main');
					});

			
		}

		function submitAnswer(answer) {

			// stop counter
			stopCounter();

			// send answer
			console.log(answer);

			var params = {
				"operation": "create",
				"payload": {
				    "TableName": "vote",
				    "Item": {
				        "userId": vm.user.id,
				        "sex": vm.user.sex,
				        "search": vm.user.likes,
				        "age": vm.user.age,
				        "photoId": vm.photo.id,
				        "like": "0/1",
				        "milliseconds": 100000000
				    }
				  }
			};


			// dataservice
			// 	.save('vote', params)
			// 		.then(function success(data, headers, status, config) {
			// 			console.log(data);
			// 			// move to voting section
						
			// 		}, function error(response) {
			// 			console.log('Something went wrong');
			// 			$state.go('main');
			// 		});

			// increase vote counter
			vm.votedPhotos++;

			// check for end-of-test
			if (vm.votedPhotos === (vm.NUMBER_OF_PHOTOS - 1)) {
					// end of test
				$state.go('thanks');
			}

			showNextPhoto();
		}

		function showNextPhoto() {
			console.log(vm.photos[vm.votedPhotos]);
			vm.photo.path = vm.photos[vm.votedPhotos].path;
		}




		function startCounter() {
			console.log('counter started');
		}

		function stopCounter() {
			console.log('counter stopped');
		}



		
	}


	

	

})();



(function() {
	'use strict';

	angular
		.module('app')
		.controller('ThanksController', ThanksController);

	function ThanksController() {
		var vm = this;

		console.log('ThanksController()');
	}

})();

	


/**
* Routes
*/
(function() {
	'use strict';

	angular
		.module('app')
		.config(config);
	
	
	config.injector = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'templates/main.html',
				controller: 'MainController as main' 
			});

		$stateProvider
			.state('photo', {
				url: '/photo/{user:json}',
				templateUrl: 'templates/photo.html',
				controller: 'PhotoController as photo',
				params: {
					user: null
				} 
			});

		$stateProvider
			.state('user', {
				url: '/user',
				templateUrl: 'templates/user/index.html',
				controller: 'UserController as user' 
			});

		$stateProvider
			.state('user.sex', {
				url: '/sex',
				templateUrl: 'templates/user/sex.html'
			});

		$stateProvider
			.state('user.likes', {
				url: '/likes',
				templateUrl: 'templates/user/likes.html'
			});

		$stateProvider
			.state('user.age', {
				url: '/age',
				templateUrl: 'templates/user/age.html'
			});

		$stateProvider
			.state('user.finish', {
				url: '/finish',
				templateUrl: 'templates/user/finish.html'
			});

		$stateProvider
			.state('thanks', {
				url: '/thanks',
				templateUrl: 'templates/thanks.html',
				controller: 'ThanksController as thanks'
			});

	}

})(); 

