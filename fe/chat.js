document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatModal');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    // Toggle chat modal
    chatButton.addEventListener('click', function () {
        chatModal.classList.toggle('active');
        if (chatModal.classList.contains('active')) {
            chatInput.focus();
        }
    });

    // Close chat modal
    closeChat.addEventListener('click', function () {
        chatModal.classList.remove('active');
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            sendMessage();
        }
    });

    // Send message on button click
    sendButton.addEventListener('click', function () {
        if (chatInput.value.trim() !== '') {
            sendMessage();
        }
    });

    // Function to send message
    function sendMessage() {
        const message = chatInput.value.trim();

        // Add user message to chat
        addMessage(message, 'user');

        // Clear input
        chatInput.value = '';

        // Disable send button while processing
        sendButton.disabled = true;

        // Show typing indicator
        typingIndicator.classList.add('active');

        // Send message to API
        fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Hide typing indicator
                typingIndicator.classList.remove('active');

                // Add bot response to chat
                setTimeout(() => {
                    addMessage(data.response, 'bot');
                    sendButton.disabled = false;
                }, 500); // Small delay to simulate typing
            })
            .catch(error => {
                console.error('Error:', error);
                typingIndicator.classList.remove('active');
                addMessage('Sorry, there was an error processing your request.', 'bot');
                sendButton.disabled = false;
            });
    }

    // Function to add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = text;

        chatMessages.appendChild(messageElement);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});