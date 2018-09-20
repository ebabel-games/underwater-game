import { addMessageToLogs } from './add-message-to-logs.js';

// Multi-player chat.
const chatMessage = () => {
  socket.on('chatMessage', (chatMessage) => addMessageToLogs(chatMessage));

  const logsForm = document.getElementById('logsForm');

  // Emit current player chat message to all players, via server side.
  logsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const chatMessage = document.getElementById('logsInput').value;
    socket.emit('chatMessage', { chatMessage, playerName: dataStore.playerName });

    const logsInput = document.getElementById('logsInput');
    logsInput.value = '';
    logsInput.blur();
  });

  return {
    logsForm: document.getElementById('logsForm')
  };
};

export { chatMessage };
