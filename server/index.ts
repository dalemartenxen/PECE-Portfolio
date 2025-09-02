import express from 'express';
import { createServer } from 'vite';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Create Vite server in middleware mode
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa',
  root: path.resolve(process.cwd(), 'client'),
});

// Use vite's connect instance as middleware
app.use(vite.ssrFixStacktrace);
app.use(vite.middlewares);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});