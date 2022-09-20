var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

$(document).ready(function () {

    loginToken = localStorage.getItem('login-token');
    if (!loginToken) {
        location.href = "login.html";
    }

    getDadosUsuario().then(function (data) {
        $(".usuario_id").val(data.id_usuario);
        $(".usuario_email").val(data.email);
    });

    $(".token").val(loginToken);

});

function getDadosUsuario() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: URL_BASE + "/usuario/dados",
            headers: {
                "Authorization": "Bearer " + loginToken
            },
            success: function (data) {
                resolve(data.user);
            },
            error: function (data) {
                reject(data.message);
            },
            contentType: "application/json",
            dataType: "json"
        });
    });
}


