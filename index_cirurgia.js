var tabela_cirurgias=document.getElementById('tabela_cirurgias');
var filtro = {
    CRM_Medico:"",
    CPF_Paciente:"" ,
    Sala_Hospital: "",
    Tipo_Cirurgia: "",
    Kit_id:""
}
function atualiza_valores(filtro){
    while (tabela_cirurgias.firstChild) {
        tabela_cirurgias.removeChild(tabela_cirurgias.firstChild);
    }    
    fetch('https://robo-instrumentador-backend-render.onrender.com/cirurgia')
    .then(function(res){ return res.json(); })
    .then(function(data){
        data=data.sort(compareById=(a, b)=>{
            return a.id - b.id;
        }
        )
        if(!Object.values(filtro).every(item => item == "")){
            data = ((String(filtro.CRM_Medico) !== "" ) ? data.filter(el => (String(el.CRM_Medico) === String(filtro.CRM_Medico))) : data);
            data = ((String(filtro.CPF_Paciente) !== "") ? data.filter(el => (String(el.CPF_Paciente) === String(filtro.CPF_Paciente))) : data);
            data = ((String(filtro.Sala_Hospital) !== "" ) ? data.filter(el => (String(el.Sala_Hospital) === String(filtro.Sala_Hospital))) : data);
            data = ((String(filtro.Tipo_Cirurgia) !== "" ) ? data.filter(el => (String(el.Tipo_Cirurgia) === String(filtro.Tipo_Cirurgia))) : data);
            data = ((String(filtro.Kit_id) !== "" ) ? data.filter(el => (String(el.Kit_id) === String(filtro.Kit_id))) : data);
        }
        data.forEach(element => {
            var elemento = document.createElement('div');
            var crm = document.createElement('p')
            var cpf = document.createElement('p')
            var sala = document.createElement('p')
            var tipo = document.createElement('p')
            var kit = document.createElement('p')
            var botao = document.createElement('button')
            botao.addEventListener("click", enviar)
            crm.textContent="CRM: "+element.CRM_Medico
            cpf.textContent="CPF: "+element.CPF_Paciente
            sala.textContent="Sala: "+element.Sala_Hospital
            tipo.textContent="Tipo de Cirurgia: "+element.Tipo_Cirurgia
            kit.textContent="Kit: "+ element.Kit_id
            kit.className="kit"

            elemento.appendChild(crm)
            elemento.appendChild(cpf)
            elemento.appendChild(sala)
            elemento.appendChild(tipo)
            elemento.appendChild(kit)
            elemento.appendChild(botao)
            elemento.className = "cirurgia"
            tabela_cirurgias.appendChild(elemento);   
        }       
        );
    }
    )
}

function enviar(event){


    var clickedElement = event.target.parentElement;
    var kitId = clickedElement.querySelector('p.kit').textContent.replace('Kit: ', '');

    var conteudo = {
        kit: kitId
    };

    fetch('https://robo-instrumentador-backend-render.onrender.com/e/',
    {
        method: "POST",
        body: JSON.stringify(conteudo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response){
        if(response.status===200){
          atualiza_valores({
                CRM_Medico:"",
                CPF_Paciente:"" ,
                Sala_Hospital: "",
                Tipo_Cirurgia: "",
                Kit_id:""
            })
        }
    }).catch(function(error){
        console.error(error)
    }) 
} 



function mandar(){
    crm=parseInt(document.getElementById("crm").value)
    cpf=parseInt(document.getElementById("cpf").value)
    sala=parseInt(document.getElementById("sala").value)
    tipo=document.getElementById("tipo").value
    kit=parseInt(document.getElementById("kit").value)
    var payload = {
        "CRM_Medico": crm,
        "CPF_Paciente": cpf,
        "Sala_Hospital": sala,
        "Tipo_Cirurgia": tipo,
        "Kit_id":kit
    }
    fetch('https://robo-instrumentador-backend-render.onrender.com/add_cirurgia/',
    {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response){
        if(response.status===200){
          atualiza_valores({
                CRM_Medico:"",
                CPF_Paciente:"" ,
                Sala_Hospital: "",
                Tipo_Cirurgia: "",
                Kit_id:""
            })
        }
    }).catch(function(error){
        console.error(error)
    }) 
}
function filtrar(){
    crm_filtro=document.getElementById("crm_filtro").value
    cpf_filtro=document.getElementById("cpf_filtro").value
    sala_filtro=document.getElementById("sala_filtro").value
    tipo_filtro=document.getElementById("tipo_filtro").value
    kit_filtro=document.getElementById("kit_filtro").value
    var filtro = {
        CRM_Medico:crm_filtro,
        CPF_Paciente: cpf_filtro,
        Sala_Hospital: sala_filtro,
        Tipo_Cirurgia: tipo_filtro,
        Kit_id:kit_filtro
    }
    atualiza_valores(filtro)
}
atualiza_valores(filtro)