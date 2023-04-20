import express from "express";
import codesRoutes from "../routes/codes.routes"


const router = express.Router();

router.use("/moveoTask", codesRoutes);

export default router;
