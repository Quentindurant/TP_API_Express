console.log('🔧 Script Socket.io chargé');
const socket = io();
let pseudo = prompt('Quel est votre pseudo ?');

socket.on('connect', () => {
    console.log(' Connecté au serveur Socket.io!');
    socket.emit('new user', pseudo);
});

socket.on('disconnect', () => {
    console.log(' Déconnecté du serveur');
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('tchat');

console.log(' Form:', form, 'Input:', input, 'Messages:', messages);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(' Formulaire soumis, valeur:', input.value);
    if (input.value) {
        console.log(' Envoi du message:', input.value);
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    console.log(' Message reçu:', msg);
    const item = document.createElement('li');
    const pseudo = document.createElement('strong');
    pseudo.textContent = pseudo + ': ';
    item.appendChild(pseudo);
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});