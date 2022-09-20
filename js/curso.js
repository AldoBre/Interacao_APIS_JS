var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

$(document).ready(function () {

    loginToken = localStorage.getItem('login-token');
    if (!loginToken) {
        location.href = "login.html";
    }

    $(".addCurso").click(function(){
        user2();
    })

    getCursos().then(function(data){

        for(let i in data){

            let urlSearch = "id_curso="+data[i].id_curso    
                            +"&curso="+data[i].nome 
                            +"&duracao="+data[i].duracao
                            +"&instituicao="+data[i].instituicao;

            document.getElementById("itensTabela").innerHTML +=
            "<tr>"+
                "<td>"+ data[i].id_curso +"</td>"+    
                '<td><a href="./edit.html?'+urlSearch+'">'+data[i].nome+'</a.</td>'+
                "<td>"+ data[i].duracao +"</td>"+
                "<td>"+ data[i].instituicao +"</td>"+
                "<td><button onclick='excluirCurso("+data[i].id_curso+")'>Excluir</button></td>"+
            "</tr>";  
        }

    })

});

function user2() {
    let curso = document.getElementById("curso").value;
    let duracao = document.getElementById("duracao").value;
    let instituicao = document.getElementById("insti").value;

    let data = {
        "nome": curso,
        "duracao": duracao,
        "instituicao": instituicao,
    }
    dadosCurso(data)
}

function dadosCurso(data) {
    dataFormatada = JSON.stringify(data);

    $.ajax({
        type: "POST",
        url: URL_BASE + "/curso",
        data: dataFormatada,
        headers: {
            "Authorization": "Bearer " + loginToken
        },
        success: function (data) {
            console.log(data);
            location.href = "curso.html";

        },
        error: function (data) {
            console.log("Error " + data);
        },
        contentType: "application/json",
        dataType: "json"
    })
}

function getCursos(){
    return new Promise(function(resolve, reject){
        $.ajax({
            type: "GET",
            url: URL_BASE + "/curso",
            headers:{
                "Authorization": "Bearer " + loginToken
            },
            success: function(data){
                resolve(data);
            },
            error: function(data){
                reject(data.message);
            },
            contentType: "application/json",
            dataType: "json"
        });
    });
}

function excluirCurso(id_curso){
    
    $.ajax({
        type: "DELETE",
        url: URL_BASE + "/curso/"+id_curso,
        headers:{
            "Authorization": "Bearer " + loginToken
        },
        success: function(data){
            location.reload();
        },
        error: function(data){
            console.log("Erro: " + data);
        },
        contentType: "application/json",
        dataType: "json"
    });
}

