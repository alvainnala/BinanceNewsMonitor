const WebSocket = require('ws');
const Http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = Http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Binance News WebSocket Notification Server\n');
});

const wsServer = new WebSocket.Server({ server });

const broadcastMessage = (data) => {
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(data);
      } catch (error) {
        console.error(`Failed to send data to a client: ${error}`);
      }
    }
  });
};

const wsConnection = (ws) => {
  console.log('Client connected');

  ws.on('message', message => {
    try {
      console.log('Received message: %s', message);

      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type === 'subscribe' && parsedText.coin) {
        console.log(`Subscribed to ${parsedMessage.coin} notifications`);

        const notificationInterval = setInterval(() => {
          const newsUpdate = JSON.stringify({
            coin: parsedMessage.coin,
            news: `New mentioning of ${parsedMessage.coin} in the news!`
          });

          broadcastMessage(newsUpdate);
        }, 10000);

        ws.on('close', () => {
          console.log('Client disconnected');
          clearInterval(notificationInterval);
        });
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  });

  ws.on('error', (error) => {
    console.log(`WebSocket error: ${error}`);
  });
};

wsServer.on('connection', wsConnection);

wsServer.on('error', (error) => {
  console.error(`WebSocket Server error: ${error}`);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});