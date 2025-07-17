angular.module('meuApp').controller('controller', function($scope, $http) {
    $scope.usuario = JSON.parse(localStorage.getItem('usuario'));

    $scope.gerarIdeiaProduto = function() {
        Swal.fire({
            title: 'Gerando ideia com a IA...',
            text: 'Aguarde um momento...',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const url = 'http://localhost:8000/api/Gerenciar/gerar-ideia';
        const token = localStorage.getItem('token');
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        $http.post(url, {}, config)
            .then(function(response) {
                const textResponse = response.data.candidates[0].content.parts[0].text;
                const idea = JSON.parse(textResponse);

                Swal.fire({
                    icon: 'success',
                    title: `Nova Ideia: ${idea.nome}`,
                    text: idea.descricao,
                    confirmButtonText: 'Que legal!'
                });
            })
            .catch(function(error) {
                console.error("Erro ao chamar o backend:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Não foi possível se comunicar com nosso servidor para gerar a ideia.',
                });
            });
    };
});