var cidade = "Concórdia,BR";

function previsaoCincoDias(cidade) {

  $.ajax({
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast",
      data: {
          q: cidade,
          cnt: "40",
          lang: "pt",
          units: "metric",
          APPID: "dbe4273bff6f3d7daad8e1fb6f946d32",
      },
      dataType: "json",

      success: function(response) {
        console.log(response);
          $("#data-1").html(
            response.list[6].dt_txt.substring(8, 10) + "/" +
            response.list[6].dt_txt.substring(5, 7) + "/" +
            response.list[6].dt_txt.substring(0, 4)
          );
          $("#temp-med-1").html(response.list[0].main.temp + "ºC");
          $("#umidade-1").html(response.list[0].main.humidity + "%");
          $("#condicoes-temp-1").html(
            $("#condicao-temp-1-img").attr("src", "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png")
          );

          $("#data-2").html(
            response.list[14].dt_txt.substring(8, 10) + "/" +
            response.list[14].dt_txt.substring(5, 7) + "/" +
            response.list[14].dt_txt.substring(0, 4)
          );
          $("#temp-med-2").html(response.list[1].main.temp + "ºC");
          $("#umidade-2").html(response.list[1].main.humidity + "%");
          $("#condicoes-temp-2").html(
            $("#condicao-temp-2-img").attr("src", "http://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png")
          );

          $("#data-3").html(
            response.list[22].dt_txt.substring(8, 10) + "/" +
            response.list[22].dt_txt.substring(5, 7) + "/" +
            response.list[22].dt_txt.substring(0, 4)
          );
          $("#temp-med-3").html(response.list[2].main.temp + "ºC");
          $("#umidade-3").html(response.list[2].main.humidity + "%");
          $("#condicoes-temp-3").html(
            $("#condicao-temp-3-img").attr("src", "http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png")
          );

          $("#data-4").html(
            response.list[30].dt_txt.substring(8, 10) + "/" +
            response.list[30].dt_txt.substring(5, 7) + "/" +
            response.list[30].dt_txt.substring(0, 4)
          );
          $("#temp-med-4").html(response.list[3].main.temp + "ºC");
          $("#umidade-4").html(response.list[3].main.humidity + "%");
          $("#condicoes-temp-4").html(
            $("#condicao-temp-4-img").attr("src", "http://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png")
          );
          try {
            $("#data-5").html(
              response.list[38].dt_txt.substring(8, 10) + "/" +
              response.list[38].dt_txt.substring(5, 7) + "/" +
              response.list[38].dt_txt.substring(0, 4)
            );
            $("#temp-med-5").html(response.list[4].main.temp + "ºC");
            $("#umidade-5").html(response.list[4].main.humidity + "%");
            $("#condicoes-temp-5").html(
              $("#condicao-temp-5-img").attr("src", "http://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png")
            );
          }
          catch(err) {
            $("#data-5").html("Desculpe-nos. Esta previsão está indisponível por problemas na API.");
            $("#umidade-5").html("");
            var modal =
              '<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Mostar erro</button>' +
              '<div id="myModal" class="modal fade" role="dialog">' +
                '<div class="modal-dialog">' +
                  '<div class="modal-content">' +
                    '<div class="modal-header">' +
                      '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                      '<h4 class="modal-title">Erro:</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                      '<p id="p-err">' + err + '</p>' +
                      '<p> O erro ocorre, pois se os horários acessados forem menores que a hora de acesso, esses são excluídos ' +
                      'da lista de dados. </p>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                      '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>';
            $("#temp-med-5").html("");
            $("#condicoes-temp-5").html(modal);
          }
      },

      failure: function(response) {
          console.error(response);
          $("#jumbotron").html("<h1>Desculpe-nos, houve um problema</h1>");
      }
  });
}

function previsaoDiaria(cidade) {

  $.ajax({
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
          q: cidade,
          lang: "pt",
          units: "metric",
          APPID: "dbe4273bff6f3d7daad8e1fb6f946d32"
      },
      dataType: "json",

      success: function(response) {
          $("#hoje-jumbotron-cidade").html(response.name);
          $("#proximos-cinco-dias-cidade").html(response.name);
          $("#temp-min").html(response.main.temp_min + "ºC");
          $("#temp-max").html(response.main.temp_max + "ºC");
          $("#umidade").html(response.main.humidity + "%");
          $("#condicao-tempo").html(
            $("#condicao-tempo-img").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
          );
          $("#velocidade-vento").html(response.wind.speed + "m/s");
      },

      failure: function(response) {
          console.error(response);
          $("#jumbotron").html("<h1>Desculpe-nos, houve um problema</h1>");
      }
  });
}

var app = {

    inicializarDB: function () {
      this.db = new loki("cidades.db", {
        autosave: true,
        autosaveInternal: 1000,
        autoload: true,
      });

      this.db.loadDatabase();
      var cidades = this.db.getCollection("cidades");
      if (!cidades) {
        cidades = this.db.addCollection("cidades");
      }
    },

    favoritarCidade: function () {
      var cidades = this.db.getCollection("cidades");
      var cidade = {
        titulo: $("#input-cidade").val(),
      };
      cidades.insert(cidade);
      console.log(cidades.data);
    }
  };

$(document).ready(function() {

    app.inicializarDB();
    $("#button-favoritar").click(function() {
      console.log("salvou");
      app.favoritarCidade();
    });

    previsaoDiaria(cidade);
    previsaoCincoDias(cidade);

    $("#menu-toggle").click(function(event) {
        event.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#modal").modal("show");

    var hoje = new Date();
    $("#hoje-navbar").html("Hoje (" + hoje.getDate() + "/" + (hoje.getMonth() + 1) + "/" + hoje.getFullYear() + ")");

    $("#proximos-cinco-dias-cidade").html(cidade);
    $("#hoje-navbar").css("background-color", "#4256FF");
    $("#hoje-navbar").css("color", "white");
    $("#container-proximos-cinco-dias").hide();

    $("#button-favoritar").click(function () {
      console.log("enteei");
      var elemento =
        '<li>' +
          '<a href="#"  class="cidade-favorita">' +
            $("#input-cidade").val() +
          '</a>' +
        '</li>';
      $("#lista-cidades").append(elemento);
    });

    $(this).click(function () {
      console.log("clicou")
      if (this.className == "cidade-favorita") {
        console.log("classe");
        $("#input-cidade").val(this);
      }
    });

    $("#hoje-navbar").click(function() {
      $("#proximos-cinco-dias-navbar").css("background-color", "white");
      $("#proximos-cinco-dias-navbar").css("color", "black");
      $(this).css("background-color", "#4256FF");
      $(this).css("color", "white");
      $("#container-proximos-cinco-dias").slideUp();
      $("#previsao-hoje").slideDown();
    });

    $("#proximos-cinco-dias-navbar").click(function() {
      $("#hoje-navbar").css("background-color", "white");
      $("#hoje-navbar").css("color", "black");
      $(this).css("background-color", "#4256FF");
      $(this).css("color", "white");
      $("#previsao-hoje").slideUp();
      $("#container-proximos-cinco-dias").slideDown();
    });

    $("#button-preveja").click(function(event) {
      event.preventDefault();
      cidade = $("#input-cidade").val();
      previsaoDiaria(cidade);
      previsaoCincoDias(cidade);
    });
});
