"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@microsoft/signalr");
var btnStart = document.querySelector("#btnStart");
var btnStop = document.querySelector("#btnStop");
var lblError = document.querySelector("#lblError");
var lblStatus = document.querySelector("#lblStatus");
var textMinutes = document.querySelector("#valueMin");
var textSeconds = document.querySelector("#valueSec");
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
connection.on("updateTimerState", function (status, elapsedTime) {
    function pad(n) {
        return (n < 10) ? ("0" + n) : n.toString();
    }
    lblStatus.innerText = status;
    textMinutes.innerText = pad(Math.trunc(parseInt(elapsedTime) / 60));
    textSeconds.innerText = pad(parseInt(elapsedTime) % 60);
    updateButtonStatus(status);
});
connection.on("alertError", function (message) {
    lblError.innerText = message;
    lblStatus.innerText = "Error Occured";
});
connection.start().catch(function (err) { return lblError.innerHTML = err; });
btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);
function startTimer() {
    connection.send("startTimer")
        .then(function () { return updateButtonStatus("Running"); });
}
function stopTimer() {
    connection.send("stopTimer")
        .then(function () { return updateButtonStatus("Stopped"); });
}
function updateButtonStatus(status) {
    switch (status) {
        case "Running":
            btnStart.classList.add("btn-disabled");
            btnStop.classList.remove("btn-disabled");
            break;
        case "Stopped":
            btnStop.classList.add("btn-disabled");
            btnStart.classList.remove("btn-disabled");
            break;
        default:
            btnStart.classList.add("btn-disabled");
            btnStop.classList.add("btn-disabled");
    }
}
