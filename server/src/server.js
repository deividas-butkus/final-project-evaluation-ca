import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

import { connectToDb } from "./mongoClient.js";
import usersRouter from "./routes/users.js";
import chatsRouter from "./routes/chats.js";
import messagesRouter from "./routes/messages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads", "profileImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 5002;

const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/chats", chatsRouter);
app.use("/messages", messagesRouter);

const startServer = async () => {
  try {
    await connectToDb();
    console.log("MongoDB connection established, starting server...");

    const server = app.listen(SERVER_PORT, () => {
      console.log(`Server is up and running on port ${SERVER_PORT}.`);
    });

    const io = new Server(server, {
      cors: {
        origin: `http://localhost:${process.env.CLIENT_PORT}`,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("newMessage", (messageData) => {
        io.emit("messageReceived", messageData);
      });

      socket.on("likeMessage", async ({ messageId, userId }) => {
        console.log("Like received for message:", messageId);

        io.emit("messageLiked", {
          messageId,
          userId,
        });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    const gracefulServerShutdown = async (signal) => {
      console.log(
        `Received ${signal}. Closing server and database connection...`
      );

      server.close((err) => {
        if (err) {
          console.error("Error during server shutdown:", err);
          process.exit(1);
        }
        console.log("Server closed.");
      });

      if (client) {
        try {
          await client.close();
          console.log("MongoDB connection closed.");
        } catch (error) {
          console.error("Error closing MongoDB connection:", error);
        }
      }

      console.log("Graceful shutdown completed.");
      process.exit(0);
    };

    process.on("SIGINT", () => gracefulServerShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulServerShutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
