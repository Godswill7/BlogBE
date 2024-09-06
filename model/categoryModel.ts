import mongoose from "mongoose";

interface iCategory {
    categoryName?: string 
    article?: {}[];
}

interface iCategoryData extends iCategory, mongoose.Document { }

const categoryModel = new mongoose.Schema({
  categoryName: {
    type: String,
  },
  article: [
    {
      type: Array<String>,
      item: mongoose.Schema.ObjectId,
      ref: "articles",
    },
  ],
},
    {
    timestamps: true,
    });

    export default mongoose.model<iCategoryData>("category", categoryModel )
