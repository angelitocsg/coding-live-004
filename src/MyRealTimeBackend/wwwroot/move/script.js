let connection;

const start = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    connection
        .start()
        .then(() => {
            connection.on("coordsReceived", (top, left) => {
                setPosition(top, left);
            });
        })
        .catch((err) => console.error(err));
}

const sendCoords = (top, left) => {
    connection
        .invoke("SendCoords", top, left)
        .catch(err => console.error(err));
}

const image = document.getElementById("sigImg");

function setPosition(top, left) {
    image.style.marginTop = `${top}px`;
    image.style.marginLeft = `${left}px`;
}

function dragging(event) {
    console.log(event)
    sendCoords(event.clientY, event.clientX);
}

function drop(event) {
    sendCoords(event.clientY, event.clientX);
}

start();