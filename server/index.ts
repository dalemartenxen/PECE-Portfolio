import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
const isDev = process.env.NODE_ENV !== "production";

// Basic error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error("Server error:", err);
});

(async () => {
  try {
    const server = createServer(app);

    if (isDev) {
      // DEVELOPMENT: Vite + Express for HMR
      await setupVite(app, server);
    } else {
      // PRODUCTION: serve static files from dist
      // This works locally; on Vercel, Express will be ignored
      serveStatic(app);
    }

    const port = parseInt(process.env.PORT || '5000', 10);
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port} [${isDev ? 'development' : 'production'}]`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
})();