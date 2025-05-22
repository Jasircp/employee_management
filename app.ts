import express from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employees", employeeRouter);
server.use(errorMiddleware);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

(async () => {
  try {
    await datasource.initialize();
    console.log("Connected to DB");
  } catch {
    console.error("Failed to connect to DB");
    process.exit(1);
  }
  server.listen(3000, () => {
  console.log("server listening to 3000");
  })
})();