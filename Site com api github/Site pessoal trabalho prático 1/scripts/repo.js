// Extrair o parâmetro 'name' da URL
const urlParams = new URLSearchParams(window.location.search);
const repoName = urlParams.get('name');

// Verificar se o nome do repositório foi fornecido
if (repoName) {
  const apiUrl = `https://api.github.com/repos/pedroleitep/${repoName}`;

  // Fazer a requisição à API do GitHub
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do repositório');
      }
      return response.json();
    })
    .then(data => {
      // Preencher os elementos HTML com os dados do repositório
      document.getElementById('repo-name').textContent = data.name;
      document.getElementById('repo-description').textContent = data.description;
      document.getElementById('repo-created').textContent = new Date(data.created_at).toLocaleDateString('pt-BR');
      document.getElementById('repo-owner').textContent = data.owner.login;
      document.getElementById('repo-link').href = data.html_url;
      document.getElementById('repo-link').textContent = data.html_url;
      document.getElementById('repo-language').textContent = data.language;

      // Adicionar imagem do dono do repositório (substituindo a imagem das flores)
      document.getElementById('repo-image').src = data.owner.avatar_url;
      document.getElementById('repo-image').alt = `${data.name} logo`;
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Não foi possível carregar as informações do repositório.');
    });
} else {
  alert('Parâmetro "name" não fornecido na URL.');
}
