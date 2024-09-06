import { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import cloudinary from "../utils/cloudinary";
import bcrypt from "bcrypt"
import userModel from "../model/userModel";
import adminModel from "../model/adminModel";
import adModel from "../model/adModel";

export const registerAdmin = async (
  req: any,
  res: Response,
): Promise<Response> => {
  try {
    const { password, email, name, } = req.body;



    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path,
    );

    const admin = await adminModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });

    admin.friends?.push(admin.id);
    admin.save()

    return res.status(HTTP.CREATED).json({
      message: `${admin.name} created successfully`,
      data: admin,
    });
  } catch (error:any) {
     new mainError({
       name: "Create Error",
       message: `This Error is came as a result of you creating this User!!!`,
       status: HTTP.BAD_REQUEST,
       success: false,
     });

    return res.status(HTTP.BAD_REQUEST).json({
      message: error.message
        });
  }
};

export const signInAdmin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { password, email } = req.body;


    const admin = await adminModel.findOne({ email });


    if (admin) {
      const checked = await bcrypt.compare(password, admin.password!);

      if (checked) {
        return res.status(HTTP.CREATED).json({
          message: `welcome back ${admin.name}`,
          data: admin._id,
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

  // export const getAdmins = async (
  //   req: Request,
  //   res: Response,
  // ): Promise<Response> => {
  //   try {

  //     const admin = await adminModel.find();

  //     return res.status(HTTP.OK).json({
  //       message: "This is all the Admins",
  //       data: admin,
  //     });

  //   } catch (error:any) {
  //     new mainError({
  //       name: "GET Error",
  //       message: `This Error is came as a result of you getting all Admin!!!`,
  //       status: HTTP.BAD_REQUEST,
  //       success: false,
  //     });

  //     return res.status(HTTP.BAD_REQUEST).json({
  //       message: error.message
  //     });
  //   }
  // };

export const getAllAdmins = async (
  req: Request,
  res: Response
) => {
  try {
    const admin = await adminModel.find();

    // console.log(admin)

    return res.status(HTTP.OK).json({
      message: "All Admin found",
      data: admin,
    });
  } catch (error) {
    new mainError({
      name: "GET Error",
      message: "Error finding all admins",
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error finding all adminss",
    });
  }
};


export const getOneAdmin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { adminID } = req.params;
    const admin = await adminModel.findById(adminID);

    return res.status(HTTP.OK).json({
      message: "found",
      data: admin,
    });
  } catch (error) {
    new mainError({
      name: "GET Error",
      message: `This Error is came as a result of you creating this Admin!!!`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({ message: "Error" });
  }
};

export const postAdByAdmin = async (req: Request, res: Response) => {
    try {
      const { title, description, imageUrl } = req.body;
  
      const newAd = new adModel({
        title,
        description,
        imageUrl,
      });
  
      await newAd.save();
  
      return res.status(HTTP.OK).json({
        message: 'Ad posted successfully',
        ad: newAd,
      });
    } catch (error) {
      return res.status(HTTP.BAD_REQUEST).json({
        message: 'Error posting ad',
      });
    }
  };