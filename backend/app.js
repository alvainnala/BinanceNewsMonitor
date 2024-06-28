require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Logger function
const log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
};

const errorHandler = (err, req, res, next) => {
    log(err.stack);
    res.status(500).send('Something broke!');
};

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Binance News Monitor Backend is up and running!');
});

wss.on('connection', (ws) => {
    log('Client connected to WebSocket');

    ws.on('message', (message) => {
        log('Received: ' + message);
        try {
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        } catch (error) {
            log('Error sending message to client: ' + error);
        }
        
    });

    ws.on('close', () => {
        log('Client disconnected');
    });

    ws.on('error', error => {
        log('WebSocket error observed: ' + error);
    });
});

app.use((req, res, next) => {
    res.status(404).send('Sorry can’t find that!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
    
    server.on('error', (error) => {
        log('Server error: ' + error);
    });
});