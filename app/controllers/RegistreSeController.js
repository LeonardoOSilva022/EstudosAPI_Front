angular
  .module("meuApp")
  .controller("RegistreSeController", function ($scope, $http, $state) {
    $scope.info = {
      name: "",
      email: "",
      password: "",
      senhaConfimar: "",
    };

    $scope.criarCadastro = function () {
      $url = "http://localhost:8000/api/cadastrar";

      if ($scope.info.password != $scope.info.senhaConfirmar) {
        Swal.fire({
          title: "Erro!",
          text: "As senhas são diferentes!",
          icon: "error",
          confirmButtonText: "Voltar",
        });
      } else {
        $http.post($url, $scope.info).then(
          function (response) {
            if (response.status == 201) {
              Swal.fire({
                title: "Sucesso!",
                text: "Usuário cadastrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
              }).then(function () {
                $state.go("login");
              });
            }
            console.log(response);
          },
          function (error) {
            if (error.status == 409) {
              Swal.fire({
                title: "Erro!",
                text: "E-mail já cadastrado!",
                icon: "error",
                confirmButtonText: "Voltar",
              });
            }
            console.log(error);
          }
        );
      }
    };
  });
