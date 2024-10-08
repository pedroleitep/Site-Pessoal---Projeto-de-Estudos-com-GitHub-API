// app.js

const gostosfoto = document.querySelector(".carousel-inner");
const nomegit = document.querySelector(".nome");
const documentgit = document.querySelector(".document");
const imagemgit = document.querySelector(".img");
const locationgit = document.querySelector(".location");
const repositoriosgit = document.querySelector(".repos");
const urlCarrossel = "https://a961a8aa-8fb7-4007-bdd8-866586b9f6f9-00-33g233xkpjch7.kirk.replit.dev/carrosel";
const urlAmigos = "https://a961a8aa-8fb7-4007-bdd8-866586b9f6f9-00-33g233xkpjch7.kirk.replit.dev/colegas";
const urlApiGit = "https://api.github.com/users/pedroleitep";
const urlRepos = "https://api.github.com/users/pedroleitep/repos";

window.onload = function () {
    // Busca informações do carrossel
    fetch(urlCarrossel)
        .then(res => res.json())
        .then(data => {
            data.forEach((item, index) => {
                const activeClass = index === 0 ? 'active' : '';
                gostosfoto.innerHTML += `
                    <div class="carousel-item ${activeClass}">
                        <img src="${item.imagem_url}" class="d-block w-100" alt="${item.descricao}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${item.titulo}</h5>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error(err));

    // Busca informações do perfil do GitHub
    fetch(urlApiGit)
        .then(res => res.json())
        .then(data => {
            nomegit.textContent = data.name;
            imagemgit.src = data.avatar_url;
            locationgit.textContent = `Location: ${data.location}`;
            documentgit.textContent = data.bio;
        })
        .catch(err => console.error(err));

    // Busca informações dos repositórios do GitHub
    fetch(urlRepos)
        .then(res => res.json())
        .then(data => {
            data.forEach(repo => {
                repositoriosgit.innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description}</p>
                                <a href="repo.html?name=${repo.name}" class="btn btn-dark"> Detalhes</a>
                                <ul id="rec">
                                    <li>${repo.forks_count}</li>
                                    <li id="i1">
                                        <img src="assets/img/person.png">
                                    </li>
                                    <li>${repo.stargazers_count}</li>
                                    <li id="i2">
                                        <img src="assets/img/star.png">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error(err));

    // Busca informações dos amigos (colegas de trabalho)
    fetch(urlAmigos)
        .then(res => res.json())
        .then(data => {
            const colegasSection = document.querySelector('.colegas');
            data.forEach(amigo => {
                console.log(amigo);
                colegasSection.innerHTML += `
                    <div>
                        <div class="colega">
                            <a href="${amigo.imagem_url}" target="_blank">
                                <img src="${amigo.imagem_url}" alt="${amigo.nome}">
                            </a>
                        </div>
                        <p>${amigo.nome}</p>
                    </div>
                `;
            });
        })
        .catch(err => console.error(err));
};
