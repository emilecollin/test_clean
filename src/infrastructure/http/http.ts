import "module-alias/register";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import logger from "morgan";
import UserController from "@infrastructure/http/controllers/UserController";
import config from "@root/config.test.json";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use("/v1/user", UserController);

app.use((err, req, res, next) => res.send(err.message));

const server = http.createServer(app);

server.listen(config.PORT_SERVER);
