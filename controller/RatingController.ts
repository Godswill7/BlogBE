import express,{Request,Response} from "express"
import mongoose from "mongoose"
import RatingModel from "../model/RatingModel"
import userModel from "../model/userModel"
import articleModel from "../model/articleModel"
import {HTTP} from "../error/mainError"

export const createRate = async (req:Request,res:Response) =>{
    try {
    
    const {userID, articleID} = req.params;
    const {rate} = req.body;

    const User = await userModel.findById(userID);
    const article:any = await articleModel.findById(articleID);

    const rating = await RatingModel.create({
      rate,
      ratedBy: User!._id,
      article,
    });

    article?.ratings?.push(new mongoose.Types.ObjectId(rating._id))
    article!.save()

   return res.status(HTTP.CREATED).json({
    message: `Rating ${article.title} successfully` ,
      data: rating,
   })

} catch (error:any) {
   return res.status(HTTP.BAD_REQUEST).json({
    message:"error rating  article"
   })
}
}


export const viewRatedArticle  = async (req:Request,res:Response) =>{
try {
    const {userID, articleID} = req.params;
    const {rate} = req.body;

    const User = await userModel.findById(userID);
    const Article:any = await articleModel.findById(articleID).populate({
        path: "ratings",
    });

   return res.status(HTTP.OK).json({
    message: "Showing Rated Article" ,
      data: Article.ratings,
   })

} catch (error:any) {
   return res.status(HTTP.BAD_REQUEST).json({
    message:"error viewing rated article"
   })
}
}


export const rateArticle = async (req:Request,res:Response) =>{
try {
    const {userID, articleID} = req.params;
    const {rate} = req.body;

    const User = await userModel.findById(userID);
    const Article:any = await articleModel.findById(articleID).populate({
        path: "ratings"
    });

let totalRate = Article.ratings.length;
let totalScore = Article.ratings.map((el:any) =>{
    return el.rate
})
.reduce((a:number,b:number) =>{
    return a + b ;
});

let Rate = totalScore/totalRate;

const Rated = await articleModel.findByIdAndUpdate(articleID,{
    rate: parseFloat(Rate.toFixed(2))
    },{
        new:true
    },
    );
   return res.status(HTTP.OK).json({
    message: "showing Rating Value",
      data: Rated,
   });
} catch (error:any) {
   return res.status(HTTP.BAD_REQUEST).json({
    message:"error rating  Value",
    data: error.message
   });
};
};


