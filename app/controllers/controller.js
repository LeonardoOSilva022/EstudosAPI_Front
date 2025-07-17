angular.module('meuApp')
.controller('controller', function($scope) {
    // Pega os dados do usuário diretamente do localStorage.
    $scope.usuario = JSON.parse(localStorage.getItem('usuario'));

    // --- FUNCIONALIDADE: GERADOR DE IDEIAS COM GEMINI ---
    $scope.gerarIdeiaProduto = async function() {
        Swal.fire({
            title: 'Gerando ideia com a IA...',
            text: 'Aguarde um momento, estamos consultando a criatividade cósmica!',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const prompt = "Gere uma ideia de produto eletrônico criativo e vendável para uma loja online chamada 'Majestic Store'. Forneça um nome para o produto e uma descrição curta e atraente em português do Brasil. Formate a resposta como um objeto JSON com as chaves 'nome' e 'descricao'.";

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { 
                contents: chatHistory,
                generationConfig: { responseMimeType: "application/json" }
            };
            
            // =========================================================
            const apiKey = ""; 
            // =========================================================

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

            const result = await response.json();
            
            if (!result.candidates || !result.candidates[0].content || !result.candidates[0].content.parts[0]) {
                throw new Error("Resposta da API em formato inesperado.");
            }

            let textResponse = result.candidates[0].content.parts[0].text;

            if (textResponse.startsWith("```json")) {
                textResponse = textResponse.substring(7, textResponse.length - 3).trim();
            } else if (textResponse.startsWith("```")) {
                textResponse = textResponse.substring(3, textResponse.length - 3).trim();
            }
            
            const idea = JSON.parse(textResponse);

            Swal.fire({
                icon: 'success',
                title: `Nova Ideia: ${idea.nome}`,
                text: idea.descricao,
                confirmButtonText: 'Que legal!'
            });

        } catch (error) {
            console.error("Erro ao chamar a API do Gemini:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops... A IA está tirando uma soneca.',
                text: 'Não foi possível interpretar a resposta da IA. Verifique sua chave de API e tente novamente.',
            });
        }
    };
});
