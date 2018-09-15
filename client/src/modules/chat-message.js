const addMessageToLogs = (message) => {
  const logsList = document.getElementById('logsList');
  const li = document.createElement('li');
  li.textContent = message;

  // Remove old messages.
  if (logsList.childNodes.length > 5) {
    while (logsList.childNodes.length > 5) {
      logsList.removeChild(logsList.firstChild);
    }
  }

  // Display latest message.
  logsList.append(li);

  // Scroll to the latest message.
  logsList.scrollTop = logsList.scrollHeight;
};

// Multi-player chat.
const chatMessage = () => {
  socket.on('chatMessage', (chatMessage) => addMessageToLogs(chatMessage));

  // Emit current player chat message to all players, via server side.
  document.getElementById('logsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const chatMessage = document.getElementById('logsInput').value;
    socket.emit('chatMessage', chatMessage);
    document.getElementById('logsInput').value = '';
  });

  return {
    logsForm: document.getElementById('logsForm')
  }
};

export { chatMessage };
