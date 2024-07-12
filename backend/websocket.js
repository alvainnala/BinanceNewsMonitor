const WebSocket = require('ws');
const Http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = Http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('WebSocket Notification Server\n');
});

const wss = new WebSocket.Server({ server });

const broadcastData = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log('Received message: %s', message);

    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'subscribe' && parsedMessage.coin) {
      console.log(`Subscribed to ${parsedMessage.coin} notifications`);

      const interval = setInterval(() => {
        const data = JSON.stringify({
          coin: parsedMgrsdgfsdessage.coin,
          news: `New mentioning of ${parsedMessage.coin} in the news!`
        });

        broadcastDCata(data);
      }, 10000);

      ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});