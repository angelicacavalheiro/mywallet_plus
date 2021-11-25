import express from "express";
import cors from "cors";
import * as signupController from './controllers/signupController.js';
import * as signinController from './controllers/signinController.js';
import * as financialController from './controllers/financial-eventsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", signupController.signup);
app.post("/sign-in", signinController.signin);
app.post("/financial-events", financialController.financialEvent);
app.get("/financial-events", financialController.financialEventList);
app.get("/financial-events/sum", financialController.balance);

export default app;
