import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { pgConnect } from "./db.js";
import usersRouter from "./users/index.js";
import experiencesRouter from "./experiences/index.js";
import postsRouter from "./posts/index.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/users", usersRouter);
server.use("/posts", postsRouter);
server.use("/experiences", experiencesRouter);

await pgConnect();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
