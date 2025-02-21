
angular.module('meuApp')
    .controller('LoginController', function ($scope, $http, $state) {

        $scope.usuario = {
            email: '',
            password: ''
        }

        $token = localStorage.getItem('token');


        if ($token != null) {
            $config = {
                headers: {
                    'Authorization': 'Bearer ' + $token
                }
            }
            $http.get('http://localhost:8000/api/me', $config).then(function (response) {
                console.log(response.status);
                $scope.usuario = response.data;
                if(response.status == 200){
                    $state.go('main.home');
                }
            }, function (error) {
                console.log(error);
            })
        }


            verificarMe = function () {
                $url = 'http://localhost:8000/api/me';
                $token = localStorage.getItem('token');
                if ($token == null) {
                    return;
                }
    
                $config = {
                    headers: {
                        'Authorization': 'Bearer ' + $token
                    }
                }
    
                $http.get($url, $config).then(function (response) {
                    $scope.usuario = response.data;
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                }, function (error) {
                    console.log(error);
                })

        }

        $scope.logar = function () {
            $http.post('http://localhost:8000/api/login', $scope.usuario).then(function (response) {
                localStorage.setItem('token', response.data.access_token)
                $state.go('main.home');
                verificarMe();
            }, function (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Login inválido!',
                    icon: 'error'
                });

                $scope.usuario = {
                    email: '',
                    password: ''
                }

            })
        }

    });
