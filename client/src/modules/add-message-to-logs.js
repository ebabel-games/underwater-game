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

module.exports = {
  addMessageToLogs,
};
