import express from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import departmentRouter from "./routes/department.route";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRouter from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import { LoggerService } from "./services/logger.service";
import cors from "cors";

const server = express();
const logger = LoggerService.getInstance('app()');
server.use(express.json());
server.use(loggerMiddleware);
server.use(cors());

server.use("/employees", authMiddleware, employeeRouter);
server.use("/departments", authMiddleware, departmentRouter);
server.use("/auth",authRouter);
server.use(errorMiddleware);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

(async () => {
  try {
    await datasource.initialize();
    logger.info("Database connected");
  } catch(e) {
    logger.error(`Failed to connect to DB--${e}`);
    process.exit(1);
  }
  server.listen(3000, () => {
  logger.info("server listening to 3000");
  })
})();