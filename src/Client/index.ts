import "./css/main.css";
import * as signalR from "@microsoft/signalr";

const btnStart: HTMLButtonElement = document.querySelector("#btnStart");
const btnStop: HTMLButtonElement = document.querySelector("#btnStop");
const lblError: HTMLLabelElement = document.querySelector("#lblError");
const lblStatus: HTMLLabelElement = document.querySelector("#lblStatus");
const textMinutes: HTMLHeadingElement = document.querySelector("#valueMin");
const textSeconds: HTMLHeadingElement = document.querySelector("#valueSec");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

// updateTimerState - singalr client method
connection.on("updateTimerState", (status: string, elapsedTime: string) => {
    function pad(n: number): string {
        return (n < 10) ? ("0" + n) : n.toString();
    }
    lblStatus.innerText = status;
    textMinutes.innerText = pad(Math.trunc(parseInt(elapsedTime) / 60));
    textSeconds.innerText = pad(parseInt(elapsedTime) % 60);
    updateButtonStatus(status);
});

// alertError - singalr client method
connection.on("alertError", (message: string) => {
    lblError.innerText = message;
    lblStatus.innerText = "Error Occured";
});

// start singalr connection
connection.start().catch(err => lblError.innerHTML = err);

// attach event handlers to buttons
btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);

// event handler for Start button
function startTimer() {
    connection.send("startTimer")
        .then(() => updateButtonStatus("Running"));
}

// event handler for Stop button
function stopTimer() {
    connection.send("stopTimer")
        .then(() => updateButtonStatus("Stopped"));
}

// update button states (active or disabled) depeding upon the status
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

