import { chatMessage } from './modules/chat-message.js';

// Main game module that co-ordinates all other modules.
const game = (socket) => {
  chatMessage(socket);
};

game(socket);

export { game };
