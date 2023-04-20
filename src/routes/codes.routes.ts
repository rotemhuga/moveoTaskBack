import express from 'express';
import {getAllCodes} from "../controllers/codes.controllers"

const codesRouter = express.Router();
// const middleWare = require('../../middleWare/IsAdmin');
codesRouter.get('/codes', getAllCodes);

export default codesRouter;