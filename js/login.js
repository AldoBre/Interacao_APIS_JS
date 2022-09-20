var URL_BASE = "https://webapp-senai-scc.herokuapp.com"

$(document).ready(function () {

  $(".loginButton").click(function () {
    user();
  })

});

function user() {
  let valor1 = document.getElementById("user").value;
  let valor2 = document.getElementById("pass").value;

  let data = {
    "email": valor1,
    "senha": valor2,
  }
  efetuarLogin(data)

}

function efetuarLogin(data) {
  dataFormatada = JSON.stringify(data);

  $.ajax({
    type: "POST",
    url: URL_BASE + "/usuario/login",
    data: dataFormatada,
    success: function (data) {
      console.log(data.token);
      localStorage.setItem('login-token', data.token);
      location.href = "home.html";
    },
    error: function (data) {
      console.log("Error " + data);
    },
    contentType: "application/json",
    dataType: "json"
  })
}