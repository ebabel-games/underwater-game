'use strict';

const addMessageToLogs = require('./add-message-to-logs');

// Multi-player chat.
const chatMessage = () => {
  socket.on('chatMessage', (chatMessage) => addMessageToLogs(chatMessage));

  const logsForm = document.getElementById('logsForm');

  logsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const chatMessage = document.getElementById('logsInput').value;

    // Emit current player chat message to all players, via server side.
    socket.emit('chatMessage', { chatMessage, name: EG.dataStore.player.name });

    // Clear content and remove focus from logs input field.
    const logsInput = document.getElementById('logsInput');
    logsInput.value = '';
    logsInput.blur();
  });

  return {
    logsForm: document.getElementById('logsForm')
  };
};

module.exports = chatMessage;
