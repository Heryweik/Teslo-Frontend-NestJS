import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="server-status">offline</span>

    <ul id="clients-ul">
    </ul>

    <form id="message-form">
      <input type="text" placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul">
    </ul>
  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

// En una aplicación real, el token se obtendría de un login que se puede almacenar en el local storage
btnConnect.addEventListener("click", () => {

  if (jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT'); // Para que no envíe mensajes vacíos

  connectToServer( jwtToken.value.trim() ); // trim() para quitar espacios en blanco
});
// connectToServer();
