import "./css/main.css";
import * as signalR from "@microsoft/signalr";

const btnStart: HTMLButtonElement = document.querySelector("#btnStart");
const btnStop: HTMLButtonElement = document.querySelector("#btnStop");
const lblError: HTMLLabelElement = document.querySelector("#lblError");
const textMinutes: HTMLHeadingElement = document.querySelector("#valueMin");
const textSeconds: HTMLHeadingElement = document.querySelector("#valueSec");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.on("updateTimerState", (status: string, elapsedTime: string) => {
    function pad(n: number): string {
        return (n < 10) ? ("0" + n) : n.toString();
    }

    textMinutes.innerText = pad(Math.trunc(parseInt(elapsedTime) / 60));
    textSeconds.innerText = pad(parseInt(elapsedTime) % 60);
    updateButtonStatus(status);
});

connection.on("alertError", (message: string) => {
    lblError.innerHTML = message;
});

connection.start().catch(err => lblError.innerHTML = err);

btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);

function startTimer() {
    connection.send("startTimer")
        .then(() => updateButtonStatus("Running"));
}

function stopTimer() {
    connection.send("stopTimer")
        .then(() => updateButtonStatus("Stopped"));
}

function updateButtonStatus(status: string) {
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

