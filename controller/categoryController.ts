import  mongoose  from 'mongoose';
// import {  } from './userController';
import express, { Request, Response} from "express";
import categoryModel  from "../model/categoryModel";
import { HTTP } from "../error/mainError";
import userModel from "../model/userModel";


export const createCategory = async (req:Request, res:Response) => {
    try {  
        const { userID } = req.params;
        
        const { categoryName } = req.body;
        
        const user : any = await userModel.findById(userID);

        const category: any = await categoryModel.create({
            categoryName,
            // userID:user._id
        });
        
        user.category?.push(new mongoose.Types.ObjectId(category._id))
user?.save();


    return res.status(HTTP.CREATED).json({
        message: "Category created",
        data: category.id,
    })
    
} catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
        message: "Error creating category",
    })
}
} 


export const viewCategory = async (req: Request, res: Response) => {
    try { 
            const category: any = await categoryModel.find()

        return res.status(200).json({
            message : "Viewing categories",
data: category
        })
    } catch (error: any) {
        return res.status(400).json({
            message : error.message
        })
    }
}