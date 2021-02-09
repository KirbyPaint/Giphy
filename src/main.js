import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function clearFields() {
  $("#results0").empty();
  $("#result").empty();
  $("#randomresult").empty();
  $("#giphy").val("");
}

$(document).ready(function () {

  $("#findgiphy").click(function () {
    const search = $("#giphy").val();

    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const apiURL = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=5&rating=pg-13`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", apiURL, true);
      request.send();
    });

    promise.then(function (response) {
      clearFields();
      const body = JSON.parse(response);
      for (let index = 0; index < body.data.length; index++) {
        $("#results0").append(`<li><img src='${body.data[index].images.original.url}' alt="result gif"></li>`);
      }
    }, function (error) {
      $('#results0').text(`There was an error processing your request: ${error}`);
    });
  });
  //
  $("#findtrendgiphy").click(function () {
    console.log("SUCCESS");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const api = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=5&rating=pg-13`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", api, true);
      request.send();
    });

    promise.then(function(response) {
      clearFields();
      const body = JSON.parse(response);
      for (let index = 0; index < body.data.length; index++) {
        $('#result').append(`<li><img src='${body.data[index].images.original.url}' alt="result gif"></li>`);
      }
    }, function(error) {
      $('#result').text(`There was an error processing your request: ${error}`);
    });
  });
  //
  $('#randomgiphy').click(function () {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const api = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=pg-13`

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", api, true);
      request.send();
    });

    promise.then(function(response) {
      clearFields();
      const body = JSON.parse(response);
      $('#randomresult').html(`<img src='${body.data.images.original.url}' alt="result gif">`);
    }, function(error) {
      $('#result').text(`There was an error processing your request: ${error}`);
    });
  });
});