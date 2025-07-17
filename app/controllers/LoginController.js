angular
  .module("meuApp")
  .controller("LoginController", function ($scope, $http, $state) {
    $scope.usuario = {
      email: "",
      password: "",
    };

    // Função para buscar os dados do usuário após o login.
    function buscarDadosDoUsuario(token) {
        $http.get("http://localhost:8000/api/me", {
            headers: {'Authorization': 'Bearer ' + token}
        }).then(function(response) {
            // Salva os dados do usuário no localStorage.
            localStorage.setItem('usuario', JSON.stringify(response.data));
            $state.go("app.home");
        }).catch(function(error) {
            // Se falhar, limpa tudo para segurança.
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            Swal.fire("Erro", "Não foi possível obter os dados do usuário.", "error");
        });
    }

    $scope.logar = function () {
      $http.post("http://localhost:8000/api/login", $scope.usuario).then(
        function (response) {
          if (response.status == 200 && response.data.token) {
            var token = response.data.token;
            localStorage.setItem("token", token);
            buscarDadosDoUsuario(token);
          }
        },
        function (error) {
          Swal.fire({
            title: "Erro!",
            text: "Login inválido!",
            icon: "error",
          });
          $scope.usuario = { email: "", password: "" };
        }
      );
    };
  });
