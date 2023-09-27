function checkIfAnyRoleIsChecked()
{
    let list = document.getElementsByName("role");
    let counter = 0;
    for(let radioButton of list)
    {
        if(radioButton.checked == false)
        {
            counter++;
        }
    }

    return counter !== list.length;
}

function cadastrar()
{
    //se ele entrou aq é pq o form está válido!

    //Pegar os dados do form
    if(checkIfAnyRoleIsChecked() === false)
    {
        Swal.fire(
            'Algo deu errado',
            'Selecione o tipo de usuário',
            'error'
          ) //plugin para deixar o alert personalizado
        return;
    }

    let payload = 
    {
        role:document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    // Enviar pra API
    fetch("https://650d031d47af3fd22f681e02.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire({
            title: '',
            text: "Cadastrado com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if(result.isConfirmed){
                //localStorage é para criar uma "variavel" em memória do JS
                localStorage.setItem("userName", response.fullName);
                localStorage.setItem("role", response.role === "dev"? "Desenvolvedor" : "Cliente");
                localStorage.setItem("idCliente", response.id);

                window.location.href = "list.html"; //redireciona para essa pág
            }
        })
  
    })
    .catch(error => {
        alert('Ocorreu um erro ao fazer a requisição.');
        console.log(error);
    })
}