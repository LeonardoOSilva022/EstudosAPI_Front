angular.module('meuApp')
    .controller('DeslogarController', function ($scope, $http, $state) {

        $token = localStorage.getItem('token');

        $scope.deslogar = function () {
            $url = 'http://localhost:8000/api/logout';

            $config = {
                headers: {
                    'Authorization': 'Bearer ' + $token
                }
            }

            $http.get($url, $config).then(function (response) {
                if (response.status == 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('usuario');
                    $state.go('login')
   
                }
            }, function (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                $state.go('login')
            })
        }

    $scope.deslogar();

    });