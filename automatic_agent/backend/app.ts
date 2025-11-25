import express, { type Request, type Response } from "express";
import cors from "cors";
import chatRoutes from "./endpoints/chat";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Automatic Agent API is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount chat/workflow routes
app.use(chatRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`💬 Chat endpoint: POST http://localhost:${port}/chat`);
});

export default app;
