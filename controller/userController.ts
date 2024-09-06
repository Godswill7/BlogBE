import { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import cloudinary from "../utils/cloudinary";
import bcrypt from "bcrypt"
import userModel from "../model/userModel";
// import articleModel from "../model/articleModel";

export const registerUser = async (
  req: any,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    const salt: any = await bcrypt.genSalt(10);
    const hashed: any = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });

    // Bad Logic
    // if (user.friends?.includes(user.id)) {
    //   return res.status(HTTP.OK).json({
    //     message: "Already friends",
    //   });

    // } else {
    //   user.friends?.push(user.id);
    //   user.save();
    // }
    return res.status(HTTP.CREATED).json({
      message: "Created user Successfully",
      data: user,
    });

  } catch (error:any) {
    new mainError({
      name: "Create Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: error.messge
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ email });


    if (user) {
      const checked = await bcrypt.compare(password, user.password!);

      if (checked) {
        return res.status(HTTP.CREATED).json({
          message: `welcome back ${user.name}`,
          data: user.id,
        });
      } else {
        new mainError({
          name: "Invalid Password Error",
          message: `User Password is not correct`,
          status: HTTP.BAD_REQUEST,
          success: false,
        });

        return res
          .status(HTTP.BAD_REQUEST)
          .json({ message: "User Password is not correct" });
      }
    } else {
      new mainError({
        name: "Invalid User Error",
        message: `User can't be found in our Database`,
        status: HTTP.BAD_REQUEST,
        success: false,
      });

      return res
        .status(HTTP.BAD_REQUEST)
        .json({ message: "User can't be found in our Database" });
    }
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await userModel.find();

    return res.status(HTTP.OK).json({
      message: "All Users found",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "GET Error",
      message: "Error finding all users",
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error finding all users",
    });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user: any = await userModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: `${user.name} found`,
      data: user,
    });

  } catch (error) {
    new mainError({
      name: "GET Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error"
    });
  }
};

export const updateOneUser = async (req: Request, res: Response):Promise <Response> => {
  try {
    const { name } = req.body;
    const { userID } = req.params;

    const user:any = await userModel.findByIdAndUpdate(
      userID,
      { name },
      { new: true }
    );

    return res.status(HTTP.CREATED).json({
      message:  `updated ${user.name} successfully`,
      data: user,
    });
  } catch (error) {

    new mainError({
      name: "GET Error",
      message: `This Error is came as a result of you updating this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

   return  res.status(HTTP.BAD_REQUEST).json({
      message: "Error updating user",
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response):Promise <Response> => {
  try {
    const { userID } = req.params;

    const user:any = await userModel.findByIdAndDelete(userID);

    return res.status(HTTP.NOT_FOUND).json({
      message:  `delete ${user.name} successfully`,
    });
  } catch (error) {

    new mainError({
      name: "GET Error",
      message: `This Error is came as a result of you deleting this User!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

   return  res.status(HTTP.BAD_REQUEST).json({
      message: "Error deleting user",
    });
  }
};

// export const CategoryAuthors = async (req: Request, res: Response) => {
//   try {

//     const { userID } = req.params;
//     const { category } = req.body;
//     const user: any = await userModel.findById(userID);

//     user?.category.push(category);
//     user.save();

//     return res.status(201).json({
//       message: "Category updated successfully",
//       data: user,
//     });

//   } catch (error) {
//     res.status(404).json({
//       message: "error Occured",
//     });
//   }
// };

// export const AuthorCategoryForArticle = async (req: Request, res: Response) => {
//   try {
//     const { authorID } = req.params;
//     const user = await userModel.findById(authorID);
//     const article: any = await articleModel.find().populate({
//       path: "categoryName",
//       options: {
//         sort: {
//           createdAt: -1,
//         },
//       },
//     });

//     let data: any = article?.filter((el: any) =>
//       user?.category!.includes(el.categoryName)
//     );
//     //  console.log("List of articles", article.filter((el:any)=>{

//     //      author?.category.includes()
//     //   }))

//     return res.status(200).json({
//       message: "Article successfully found ",
//       data: data,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "error Occured",
//     });
//   }
// };