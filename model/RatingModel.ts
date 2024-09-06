import mongoose from "mongoose"


interface iRating {
    rate?: number;
    ratedBy?: string;
    article?: {};
  }

  export interface iRatingData extends iRating, mongoose.Document {}

  const ratingModel = new mongoose.Schema(
    {
      rate: {
        type: Number,
      },
  
      ratedBy: {
        type: String,
      },
  
      article: {
        type: mongoose.Types.ObjectId,
        ref: "articles",
      },
    },
    { timestamps: true },
  );
  
  export default mongoose.model<iRatingData>("ratings", ratingModel);