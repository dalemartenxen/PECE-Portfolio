import express from "express";
import { registerRoutes } from "./server/routes";

const app = express();
app.use(express.json());

(async () => {
  try {
    console.log("Starting minimal server test...");
    const server = await registerRoutes(app);
    
    app.get("*", (req, res) => {
      res.json({ message: "Test server is running", path: req.path });
    });

    const port = 3002;
    server.listen(port, "0.0.0.0", () => {
      console.log(`Test server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error in test server:", error);
  }
})();