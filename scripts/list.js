let list = [];
window.onload = function() {
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#role").innerText = localStorage.getItem("role");;

    getProjects();
}

function getProjects(){
    // Enviar pra API
    fetch("https://650d031d47af3fd22f681e02.mockapi.io/api/projects")
    .then(response => response.json())
    .then(response => {
       list = response;
       buildTable();
    })
    .catch(error => {
        alert('Ocorreu um erro ao fazer a requisição.');
        console.log(error);
    })
}

function goToEdit(id){
    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id){
    fetch(`https://650d031d47af3fd22f681e02.mockapi.io/api/projects/${id}`, {
        method:'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        //Para retornar o resultado da lista listado usando memória do JS ao invés de uma nova requisição
        list = list.filter(project => project.id != id);

        buildTable();
    })
}

function buildTable(){
    document.querySelector("#table-body").innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    list = list.filter(el => el.idClient === idClient);

    list.forEach(el => { 
        let template = `
            <div class="row">
                <div class="title-description">
                    <h6 class="title">${el.title}</h6>
                    <p class="description">${el.description}</p>
                </div>
                <div class="price">R$ ${el.totalCost}</div>
                <div class="actions">
                    <span class="edit material-icons" onclick="goToEdit(${el.id})">edit</span>
                    <span class="delete material-icons" onclick="deleteProject(${el.id})">delete_outline</span>
                </div>
            </div>
        `

        document.querySelector("#table-body").insertAdjacentHTML("beforeend", template)
    });
}