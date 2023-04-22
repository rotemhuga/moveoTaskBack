import express from 'express';
import {getAllCodes} from "../controllers/codes.controllers"

const codesRouter = express.Router();
codesRouter.get('/codes', getAllCodes);

export default codesRouter;