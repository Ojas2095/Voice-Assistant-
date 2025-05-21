
function sendMessage() {
    const input = document.getElementById('userInput');
    const messageBox = document.getElementById('messages');
    if (input.value.trim() !== '') {
        const userMsg = document.createElement('div');
        userMsg.textContent = 'You: ' + input.value;
        messageBox.appendChild(userMsg);

        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input.value })
        })
        .then(response => response.json())
        .then(data => {
            const botMsg = document.createElement('div');
            botMsg.textContent = 'Bot: ' + data.reply;
            messageBox.appendChild(botMsg);
            messageBox.scrollTop = messageBox.scrollHeight;
        });

        input.value = '';
    }
}

function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = function(event) {
        const input = document.getElementById('userInput');
        input.value = event.results[0][0].transcript;
    };

    recognition.onerror = function(event) {
        alert('Error occurred in recognition: ' + event.error);
    };
}
