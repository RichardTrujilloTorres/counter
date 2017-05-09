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