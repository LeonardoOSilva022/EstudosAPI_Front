angular
  .module("meuApp")
  .controller("LoginController", function ($scope, $http, $state) {
    $scope.usuario = {
      email: "",
      password: "",
    };

    verificarMe = function (redirecionar) {
      $url = "http://localhost:8000/api/me";

      $token = localStorage.getItem("token");

      if ($token == null) {
        return;
      }

      $config = {
        headers: {
          Authorization: "Bearer " + $token,
        },
      };

      $http.get($url, $config).then(function (response) {
        if (response.status == 200) {
          console.log(response.data);
          localStorage.setItem("usuario", JSON.stringify(response.data));
          $scope.dadosDoUsuario = response.data;
          if (redirecionar == true) {
            $state.go("main.home");
          }
        }
      });
    };

    verificarMe(false);

    $scope.logar = function () {
      $http.post("http://localhost:8000/api/login", $scope.usuario).then(
        function (response) {
          if (response.status == 200) {
            localStorage.setItem("token", response.data.token);
            verificarMe(true);
          }
        },
        function (error) {
          Swal.fire({
            title: "Erro!",
            text: "Login inválido!",
            icon: "error",
          });

          $scope.usuario = {
            email: "",
            password: "",
          };
        }
      );
    };
  });
