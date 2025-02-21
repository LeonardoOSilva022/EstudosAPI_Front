angular.module('meuApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('main', {
        abstract: true,
        templateUrl: 'index.html',
        controller: 'controller'
    })
    .state('main.home', {
        url: '/',
        templateUrl: 'app/views/home.html',
        controller: 'controller'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginController'
    })
    .state('deslogar', {
        url: '/deslogar',
        templateUrl: 'app/views/deslogar.html',
        controller: 'DeslogarController'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'app/views/register.html',
        controller: 'RegistreSeController' 
    })
    .state('gerenciar', {
        url: '/usuarios',
        templateUrl: 'app/views/gerenciarUsuarios.html',
        controller: 'GerenciarController'
    })

    $urlRouterProvider.otherwise('/');
});