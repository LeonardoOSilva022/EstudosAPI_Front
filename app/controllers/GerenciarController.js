angular.module("meuApp").controller("GerenciarController", function ($scope, $http) {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: "Bearer " + token },
    };

    $scope.modal = {
        visivel: false,
        data: {},
    };

    $scope.abrirModal = function (usuario) {
        $scope.modal.data = usuario ? angular.copy(usuario) : {};
        $scope.modal.visivel = true;
    };

    $scope.fecharModal = function () {
        $scope.modal.visivel = false;
    };

    function listar() {
        const url = "http://localhost:8000/api/Gerenciar/listar";
        $http.get(url, config).then(function (response) {
            $scope.contatos = response.data;
        });
    }

    $scope.salvarUsuario = function () {
        const dados = $scope.modal.data;

        if (dados.id) {
            // Se tem ID, estamos a EDITAR (usando o método PUT)
            const url = `http://localhost:8000/api/Gerenciar/editar/${dados.id}`;
            $http.put(url, dados, config).then(function (response) {
                Swal.fire("Sucesso!", "Usuário atualizado com sucesso!", "success");
                $scope.fecharModal();
                listar();
            });
        } else {
            // Se não tem ID, estamos a CRIAR (usando o método POST)
            const url = "http://localhost:8000/api/Gerenciar/criar";
            $http.post(url, dados, config).then(function (response) {
                Swal.fire("Sucesso!", "Usuário criado com sucesso!", "success");
                $scope.fecharModal();
                listar();
            }).catch(function(error) {
                let mensagem = 'Ocorreu um erro.';
                if (error.status === 409) {
                    mensagem = 'Este e-mail já está cadastrado!';
                }
                Swal.fire('Erro!', mensagem, 'error');
            });
        }
    };

    $scope.excluirUsuario = function (id) {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://localhost:8000/api/Gerenciar/deletar/${id}`;
                $http.delete(url, config).then(function () {
                    Swal.fire("Excluído!", "O usuário foi excluído.", "success");
                    $scope.fecharModal();
                    listar();
                });
            }
        });
    };

    listar();
});