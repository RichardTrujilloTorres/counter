
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
* User controller
*/
(function() {
	'use strict';

	angular
		.module('app')
		.controller('UserController', UserController);

	UserController.$inject = ['$http'];
	function UserController($http) {
		var vm = this;

		console.log('UserController()');
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

		// $stateProvider
		// 	.state('selectSex', {
		// 		url: '/select-sex',
		// 		templateUrl: 'templates/select-sex.html',
		// 		controller: 'SelectSexController as selectSex' 
		// 	});

		$stateProvider
			.state('user', {
				url: '/user',
				templateUrl: 'templates/user.html',
				controller: 'UserController as user' 
			});
	}

})(); 

