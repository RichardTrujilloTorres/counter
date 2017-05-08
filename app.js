
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

	UserController.$inject = ['$http', '$state'];
	function UserController($http, $state) {
		var vm = this;
		vm.profile = {};
		vm.createProfile = createProfile;

		console.log('UserController()');



		function createProfile() {
			console.log(vm.profile);

			// craete profile
			// move to voting section

			$state.go('photo');

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

	PhotoController.$inject = ['$http'];
	function PhotoController($http) {
		var vm = this;

		// console.log('Start counting');

		startCounter();
	}


	function startCounter() {
		console.log('counter started');
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
				url: '/photo',
				templateUrl: 'templates/photo.html',
				controller: 'PhotoController as photo' 
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
	}

})(); 

