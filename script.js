
(function(){
    const pesquisar = document.getElementById("pesquisar");
    const perfil = document.getElementById("perfil");
    const url = "https://api.github.com/users";
    const client_id = "Iv1.b76a9105446f36f6";
    const client_secret = "fbd951a3e40dda2cfb9824481fd711b89e8fe1c1";
    const count = 7;
    const sort = "created: asc";


    async function getUser(user){
        const perfilResponse = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);

        const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`);

        const perfil = await perfilResponse.json();
        const repos = await reposResponse.json();
        return {perfil, repos};
    }
    function showPerfil(user){
        perfil.innerHTML = `   
    <div class="row mt-4">
        <div class="col-md-4">
            <div class="card" style="width: 18rem;">
                <div class="card-header">Voce esta olhando o perfil de :<span> ${user.login}</span></div>
                <img class="card-img-top" src="${user.avatar_url}">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-center">Bio:
                        <div>${user.bio}</div>
                    </li>
                    <li class="list-group-item">Repositorios:<span class="badge badge-success">${user.public_repos}</span></li>
                    <li class="list-group-item">Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                    <li class="list-group-item">Seguindo: <span class="badge badge-warning">${user.following}</span></li>
                </ul>
                <div class="card-body">
                    <a href="${user.html_url}" target="_blank"class="btn btn-primary btn-block">Visitar perfil</a>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div id="repos">
                
            </div>
        </div>
    </div>`;
    }

    function showRepos(repos){
        let output =`

        
        `;
        repos.forEach(repo =>{
            output += `   
        <div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6"><a href="${repo.html_url}" target="_black">${repo.name}</a></div>
                <div class="col-md-6">
                    <span class="badge badge-primary">stars: ${repo.stargazers_count}</span>
                    <span class="badge badge-primary">watch: ${repo.watchers_count}</span>
                    <span class="badge badge-primary">forks: ${repo.forks_count}</span>
                </div>
            </div>
        </div>`
        });
        document.getElementById("repos").innerHTML = output;
    }

    pesquisar.addEventListener("keyup", (e)=>{
        const user = e.target.value;
        if(user.length > 0){
            getUser(user).then(res =>{
                showPerfil(res.perfil);
                showRepos(res.repos);
                console.log(res.perfil);

            })
        }

        
    })
})();