angular.module('meuApp')
  .controller('GerenciarController', function ($scope, $http) {

    $token = localStorage.getItem('token');
    $scope.usuario = JSON.parse(localStorage.getItem('usuario'));

    $config = {
      headers: {
          'Authorization': 'Bearer ' + $token
      }
  }

  $scope.editarDados = {
        id: '',
        nome: '',
        email: '',
        password: ''
  }

    lerUm = function(id){
      $url = 'http://localhost:8000/api/Gerenciar/lerUm/' + id;
      $http.get($url,$config).then(function(response){
        console.log(response);
        $scope.editarDados = response.data;
      },function(error){
        console.log(error);
      });
    }

    listar = function () {
      $url = 'http://localhost:8000/api/Gerenciar/listar';
      $http.get($url,$config).then(function (response) {
        console.log(response);
        $scope.contatos = response.data;

      }, function (error) {
        console.log(error);
      });
    }

    listar();

    $scope.status = 'criando';
    
    $scope.dados = {
      id: '',
      nome: '',
      email: '',
    };

    $scope.resetar = function () {
      $scope.status = 'criando';

      $scope.dados = {
        id: '',
        nome: '',
        email: '',
      };

      listar();
    }


    $scope.salvarInfo = function () {
      $url = 'http://localhost:8000/api/Gerenciar/salvar';
      $http.post($url, $scope.dados,$config).then(function (response) {
        console.log(response);
        if (response.status == 201) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Operação realizada com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          $scope.resetar();
        }

      }, function (error) {
        console.log(error);
      });
    };

    $scope.editarSalvar = function () {
      $url = 'http://localhost:8000/api/Gerenciar/editarParcial/' + $scope.dados.id;
      $http.patch($url, $scope.editarDados,$config).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Operação atualizada com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          $scope.resetar();
        }

      }, function (error) {
        console.log(error);
      });
    };

    $scope.delete = function (id) {
      Swal.fire({
        title: "Você tem certeza?",
        text: "Excluir este dado não é irreversível!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, delete isso!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          $url = 'http://localhost:8000/api/Gerenciar/deletar/' + id;
          $http.delete($url,$config).then(function (response) {
            if (response.status == 200) {
              Swal.fire({
                title: "Deletado!",
                text: "Seu dado foi deletado.",
                timer: 5000,
                timerProgressBar: true,
                icon: "success"
              });
              listar();
            }
          }, function (error) {
            console.log(error);
          });
        }
      });
    };

    $scope.mostraredicao = function(id){
      $scope.status = 'editando';
      lerUm(id);
    }

    $scope.editar = function () {
      $url = 'http://localhost:8000/api/Gerenciar/editar/' + $scope.editarDados.id;
      $http.put($url,$scope.editarDados,$config).then(function (response) {
        console.log(response);
        $scope.dados = response.data;

      }, function (error) {
        console.log(error);
      });
    }; 

    $scope.cancelar = function () {
      $scope.status = ''; // Oculta o formulário
  };


});
