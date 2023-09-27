   // Pega os parametros da url
   const urlSearchParams = new URLSearchParams(window.location.search); //const é um valor que não pode ser subscrito
   const params = Object.fromEntries(urlSearchParams.entries());

    // Type: 'Create' || 'edit'
   const screenType = params.id ? 'edit' : 'create'; 
 
 window.onload = function () { //FAZ COM QUE O SCRIPT SEJA CARREGADO DPS DO BODY
    setScreenTypeTexts();
    fillInputs();
}   

function fillInputs() {
    if(screenType === 'edit'){
        fetch(`https://650d031d47af3fd22f681e02.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(project => {
            document.querySelector('#title').value = project.title;
            document.querySelector('#totalCost').value = project.totalCost;
            document.querySelector('#description').value = project.description;
        })
    }
}

function setScreenTypeTexts()
{
    // MODO CRIAR
    if(screenType == 'create')
    {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!"; //document é o DOM, o DOM resumidamente é todas as tag do body
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    // MODO EDITAR
    if(screenType == 'edit')
    {
        document.querySelector('#main-title').innerText = "Editar projeto"; //document é o DOM, o DOM resumidamente é todas as tag do body
        document.querySelector('#action-button').innerText = "Salvar";
    }
}

function createOrEdit(){

    let payload = 
    {
        title:document.querySelector("#title").value,
        totalCost:document.querySelector("#totalCost").value,
        description:document.querySelector("#description").value,
        idClient: localStorage.getItem("#idClient") //getItem pega o valor da variavel em memória
    }

        // Enviar pra API
    fetch(`https://650d031d47af3fd22f681e02.mockapi.io/api/projects${screenType === 'edit' ? ('/' + params.id) : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if(screenType === 'edit'){
            alert('Editado com sucesso!');
        }else {
            alert('Cadastrado com sucesso!');
        }

        window.location.href = "list.html";
    })
    .catch(error => {
      alert('Ocorreu um erro ao fazer a requisição.');
      console.log(error);
    })
}
