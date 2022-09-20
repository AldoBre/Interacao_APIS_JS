var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

let id_curso = 0

$(document).ready(function () {

    loginToken = localStorage.getItem('login-token');
    if (!loginToken) {
        location.href = "login.html";
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    id_curso = urlParams.get('id_curso');
    let curso_nome = urlParams.get('curso');
    let curso_duracao = urlParams.get('duracao');
    let curso_instituicao = urlParams.get('instituicao');

    $('.cursoEditarNome').val(curso_nome);
    $('.cursoEditarDuracao').val(curso_duracao);
    $('.cursoEditarInstituicao').val(curso_instituicao);

    $(".editarCurso").click(function () {
        editarCursos()
    })

});

function editarCursos() {

    let curso_nome_atualizado = $('.cursoEditarNome').val();
    let curso_duracao_atualizado = $('.cursoEditarDuracao').val();
    let curso_instituicao_atualizado = $('.cursoEditarInstituicao').val();

    let dadosEditados = {
        "nome": curso_nome_atualizado,
        "duracao": curso_duracao_atualizado,
        "instituicao": curso_instituicao_atualizado
    }

    atualizarDadosCurso(dadosEditados).then(function (data) {
        ;
        location.href = 'curso.html';
    });
}

function atualizarDadosCurso(dadosEditados) {
    editedData = JSON.stringify(dadosEditados);

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "PUT",
            url: URL_BASE + "/curso/" + id_curso,
            data: editedData,
            headers: {
                "Authorization": "Bearer " + loginToken
            },
            success: function (data) {
                resolve(data);
            },
            error: function (data) {
                reject(data);
            },
            contentType: "application/json",
            dataType: "json"
        });
    });
}
