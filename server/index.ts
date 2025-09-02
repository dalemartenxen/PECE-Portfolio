import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import ViteExpress from 'vite-express';
import session from 'express-session';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// API routes
app.use('/api', routes);

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // In production, serve static files
  app.use(express.static('dist/public'));
  server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
} else {
  // In development, use ViteExpress
  ViteExpress.listen(app, port, () => {
    console.log(`Server running on port ${port}`);
  });
}
