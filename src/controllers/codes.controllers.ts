import {getCodes} from "../services/codes.service"
import {Request, Response} from "express";

export const getAllCodes= async (req: Request, res: Response) => {
    try {
        const allCodes = await getCodes();
        console.log(allCodes)
        return res.status(200).json(allCodes);
    } catch (err: any) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}

