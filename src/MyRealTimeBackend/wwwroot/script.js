let connection;
let user = '';

let message = {
    user: '',
    message: ''
}

let messages = [];

const start = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    connection
        .start()
        .then(() => {
            connection.on("messageReceived", (user, message) => {
                messages.push({ user, message });
                loadMessages();
            });

            sendMessage(`${user} entrou no chat!`, 'Realtime Chat App');
        })
        .catch((err) => console.error(err));
}

const getUser = () => {
    user = localStorage.getItem('user');
    if (user !== null) {
        start(); return;
    }

    user = prompt("Informe seu nome de usuário");
    if (user === undefined || user === null) getUser();
    if (user.trim() === '') { getUser(); return; }
    user = `${user}_${getRandom()}`;
    localStorage.setItem('user', user);
    start();
}

const sendMessage = (message, m_user = user) => {
    connection
        .invoke("SendMessage", m_user, message)
        .catch(err => console.error(err));
}

const sendButton = (e) => {
    const messageBox = document.getElementById("messageBox");
    if (messageBox.value === null || messageBox.value === '') return;
    sendMessage(messageBox.value);
    messageBox.value = '';

    return false;
}

const getRandom = (min = 1000, max = 5000) => {
    return Math.round(Math.random() * (max - min) + min);
}

const getMessage = (m_user, message) => {
    let u = m_user;
    let c1 = "user-receive";
    let c2 = "message-received";

    if (m_user === user) {
        u = user;
        c1 = "user-send";
        c2 = "message-sended";
    }

    let date = new Date();
    let m_date = `${date.getHours()}:${date.getMinutes()}`;

    let component = `<div class="message-container">
        <div class="${c1}">${m_date} - ${u} enviou:</div>
        <div class="message ${c2}">
            ${message}
        </div>
    </div>`;

    return component;
}

const loadMessages = () => {
    const c_messages = document.getElementById("messages");
    c_messages.innerHTML = "";

    messages.map(msg => {
        c_messages.innerHTML += getMessage(msg.user, msg.message);
    });

    c_messages.scrollTo(0, c_messages.scrollHeight);
}

const logoutButton = () => {
    localStorage.removeItem('user');
    location.reload();
}

getUser();