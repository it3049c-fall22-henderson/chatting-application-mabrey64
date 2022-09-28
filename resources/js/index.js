const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const nameInput = document.getElementById("my-name-input");
const save = document.getElementById("save")

async function updateMessages() {
  const messages = await fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function fetchMessages() {
  return fetch(serverURL)
    .then(response => response.json())
}

const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function formatMessage(message, nameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (nameInput === message.sender) {
    return `
    <div class="mine messages">
        <div class="message">
            ${message.text}
        </div>
        <div class="sender-info">
            ${formattedTime}
        </div>
    </div>
    `
  } else {
    return `
        <div class="yours messages">
            <div class="message">
                ${message.text}
            </div>
            <div class="sender-info">
                ${message.sender} ${formattedTime}
            </div>
        </div>
    `
  }
}

function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  }

  fetch(serverURL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function (sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender, message);
  myMessage.value = "";
});


save.onclick = function () {
  localStorage.setItem("my-name-input", nameInput.value);
  nameInput.value = "";
  document.getElementById("my-message").disabled = false;
}

edit.onclick = function () {
  const text = localStorage.getItem("my-name-input")
  nameInput.value = text;
}

function switchModes() {
  var element = document.body;
  element.classList.toggle("dark");
}