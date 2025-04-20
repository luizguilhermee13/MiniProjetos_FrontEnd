// Seleciona o botão pelo ID e adiciona um evento de clique
document.getElementById("buscarcep").addEventListener("click", buscando);

async function buscando() {
  // Obtém o valor digitado no input
  const cep = document.getElementById("cepinput").value;

  // Seleciona a div onde será exibido o resultado
  const resDiv = document.getElementById("res");

  // Expressão regular para validar se o CEP contém apenas 8 dígitos numéricos
  if (!/^\d{8}$/.test(cep)) {
    resDiv.innerHTML =
      "<p style='color: red;'>CEP inválido! Digite apenas números.</p>";
    return; // Para a execução da função caso o CEP seja inválido
  }

  try {
    // Faz a requisição para a API usando fetch
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

    // Se a resposta não for bem-sucedida, lança um erro
    if (!response.ok) {
      throw new Error("CEP não encontrado");
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Exibe os dados na div de resultado
    resDiv.innerHTML = `
            <p><strong>CEP:</strong> ${data.cep}</p>
            <p><strong>Rua:</strong> ${data.street}</p>
            <p><strong>Bairro:</strong> ${data.neighborhood}</p>
            <p><strong>Cidade:</strong> ${data.city} - ${data.state}</p>
        `;
  } catch (error) {
    // Caso ocorra um erro na requisição, exibe uma mensagem de erro
    resDiv.innerHTML =
      "<p style='color: red;'>Erro ao buscar o CEP. Verifique se digitou corretamente.</p>";
  }
}
