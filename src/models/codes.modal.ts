import { ObjectId, Schema, model } from "mongoose";
import mongoose from "mongoose";

export interface ICodeBack {
    _id:ObjectId,
    title?:string,
    code?: string
}

export const codeSchema = new Schema<ICodeBack>({
    _id:{type:Schema.Types.ObjectId},
    title:{type:String},
    code:{type:String}
}, { suppressReservedKeysWarning: true });
   
export const codeModel = mongoose.model<ICodeBack>("codes", codeSchema);