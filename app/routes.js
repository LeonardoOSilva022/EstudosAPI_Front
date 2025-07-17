angular.module('meuApp')
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        // ESTADO PAI (ABSTRATO) - Apenas define o layout.
        .state('app', {
            abstract: true,
            templateUrl: 'app/views/layout.html',
            controller: 'controller'
        })

        // ESTADOS FILHOS (Herdeiros do layout)
        .state('app.home', {
            url: '/',
            templateUrl: 'app/views/home.html'
        })
        .state('app.gerenciar', {
            url: '/usuarios',
            templateUrl: 'app/views/gerenciarUsuarios.html',
            controller: 'GerenciarController'
        })

        // ESTADOS INDEPENDENTES (Não usam o layout)
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/views/register.html',
            controller: 'RegistreSeController'
        })
        .state('deslogar', {
            url: '/deslogar',
            controller: 'DeslogarController',
            template: ''
        });
});
