const WebSocket = require('ws');
const Http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

const httpServer = Http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Binance News WebSocket Notification Server\n');
});

const webSocketServer = new WebSocket.Server({ server: httpSoerver });

const sendToAllConnectedClients = (data) => {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(data);
      } catch (error) {
        console.error(`Failed to send data to client: ${error}`);
      }
    }
  });
};

const handleWebSocketConnection = (wsClient) => {
  console.log('Client connected');

  wsClient.on('message', message => {
    try {
      console.log('Received message: %s', message);

      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type === 'subscribe' && parsedMessage.coin) {
        console.log(`Subscribed to ${parsedMessage.coin} notifications`);

        const sendNewsUpdate = setInterval(() => {
          const newsNotification = JSON.stringify({
            coin: parsedMessage.coin,
            news: `Latest update on ${parsedMessage.coin}!`
          });

          sendToAllConnectedClients(newsNotification);
        }, 10000);

        wsClient.on('close', () => {
          console.log('Client disconnected');
          clearInterval(sendNewsUpdate);
        });
      }
    } catch (error) {
      console.error(`Encountered an error: ${error}`);
    }
  });

  wsClient.on('error', (error) => {
    console.log(`WebSocket error: ${error}`);
  });
};

webSocketServer.on('connection', handleWebSocketConnection);

webSocketServer.on('error', (error) => {
  console.error(`WebSocket Server error: ${error}`);
});

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});