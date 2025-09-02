import express from "express";
import { createServer } from "http";

console.log("Creating Express app...");
const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

console.log("Creating HTTP server...");
const httpServer = createServer(app);

console.log("Starting server...");
httpServer.listen(3003, "0.0.0.0", () => {
  console.log("Minimal server running on port 3003");
  process.exit(0);
});