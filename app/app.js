var app = angular.module('meuApp', ['ui.router']);

// 1. HTTP INTERCEPTOR: Adiciona o token em todas as chamadas para a API.
app.factory('AuthInterceptor', function($q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            var token = $window.localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    };
});

// Registra o interceptor na aplicação.
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});


// 2. RUN BLOCK: Verifica o login a cada mudança de rota.
app.run(function($rootScope, $state, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        
        // Lista de rotas que não precisam de login.
        var isPublicRoute = toState.name === 'login' || toState.name === 'register';

        // Se o usuário não está logado e a rota não é pública...
        if (!$window.localStorage.getItem('token') && !isPublicRoute) {
            event.preventDefault(); // Cancela a navegação.
            $state.go('login');     // Redireciona para a tela de login.
        }
    });
});
