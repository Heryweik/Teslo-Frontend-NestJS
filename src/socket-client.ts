

import { Manager, Socket } from 'socket.io-client'

let socket: Socket;

export const connectToServer = (token: string) => {

    // En local seria http://localhost:3000/socket.io/socket.io.js
    const manager = new Manager('https://teslo-nestjs-06em.onrender.com/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        } // Aquí se envía el token
    })

    // ? dice que si no es null, entonces ejecuta el método
    socket?.removeAllListeners() // Para que no se dupliquen los listeners

    socket = manager.socket('/') // Aqui va el namespace


    addListeners(/* socket */)

    // console.log({socket})
}

// Ya no se ocupa el socket como parámetro porque ya se declaró arriba como variable global
const addListeners = (/* socket: Socket */) => {

    const serverStatusLabel = document.querySelector('#server-status')!; // ! para decirle a TS que no es null y que existe

    const clientsUl = document.querySelector('#clients-ul')!; 
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected'
    }) //El on es para escuchar eventos cuando se conecta

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected'
    }) //El on es para escuchar eventos cuando se desconecta

    // Se obtienen los clientes conectados
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';

        clients.forEach(client => {
            clientsHtml += `<li>${client}</li>`
        })

        clientsUl.innerHTML = clientsHtml;
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Para que no se recargue la página

        if (messageInput.value.trim().length <= 0) return; // Para que no envíe mensajes vacíos

        socket.emit('message-from-client', {
            id: 'asda',
            message: messageInput.value
        }); // El emit es para enviar mensajes

        messageInput.value = '';
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    })
}