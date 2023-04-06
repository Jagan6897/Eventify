const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatContainer = document.getElementById('chat-container');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const userMessage = chatInput.value.trim();

  if (userMessage) {
    sendMessage(userMessage);
    chatInput.value = '';
  }
});

function sendMessage(userMessage) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: 'User: ' + userMessage + '\nAI:',
      temperature: 0.7,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  };


  fetch('https://api.openai.com/v1/engines/davinci-codex/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
    console.log('chat data-',data);
      const aiMessage = data.choices[0].text.trim();
      displayMessage(aiMessage, 'ai');
    })
    .catch(error => {
      console.log("chat error-",error);
    });
}

function displayMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
}
