import express from 'express';
import { connectToDB } from '../src/connections';
import routes from "../src/routes/index";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.get("/", function (req, res) {
   res.send("Hello World");
});

connectToDB();
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
