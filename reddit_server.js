const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Serve a basic HTML page for clients to connect to
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Store all connected clients
let clients = [];

// WebSocket server handles incoming connections from the Python fetcher 
// AND outgoing connections to the web clients.
wss.on('connection', function connection(ws, req) {
    console.log('New client connected.');

    // Add the new client to the list
    clients.push(ws);

    // Handle messages coming from the Python fetcher
    ws.on('message', function incoming(message) {
        // Assume the Python script sends valid JSON
        try {
            const data = JSON.parse(message);
            console.log(`Received data from Python: ${data.title}`);
            
            // RELAY: Broadcast the data to all other connected clients (browsers)
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });

        } catch (e) {
            console.error("Failed to parse JSON or relay message:", e);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        console.log('Client disconnected. Total clients:', clients.length);
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`HTTP/WebSocket Server running on port ${PORT}`);
    console.log(`Please run your Python script now to start the stream.`);
});