
// import { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import Ad from '../model/adModel';
// import { HTTP } from '../error/mainError';
// import adModel from '../model/adModel';

// // Function to clean up expired ads
// const cleanupExpiredAds = async () => {
//   try {
//     const currentTime = new Date();
//     // Find and delete ads that have expired
//     await Ad.deleteMany({ expirationDate: { $lt: currentTime } });
//     console.log('Expired ads cleaned up.');
//   } catch (error) {
//     console.error('Error cleaning up expired ads:', error);
//   }
// };

// // Schedule the cleanup function to run every 24 hours (86400000 milliseconds)
// setInterval(cleanupExpiredAds, 86400000);

// export const createAd = async (req: any, res: Response) => {
//   try {

//     const { imageUrl } = req.params;

//     const { title, description } = req.body;

//     const Ad = await adModel.create({
//       title,
//       description,
//       imageUrl,
//       // newAdID,
//     });

//     // user.friends?.push(user.id)


//   Ad.Ads?.push(Ad.id);
//     await Ad.save();

//     // Introduce a 2-second delay before sending the response
//     setTimeout(() => {
//       return res.status(HTTP.OK).json({
//         message: "Ad created successfully",
//         data: Ad.id,
//       });
//     }, 2000); // 2000 milliseconds
//   } catch (error) {
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: 'Error creating ad',
//     });
//   }
// };


import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Ad from '../model/adModel'; // 
import { HTTP } from '../error/mainError'; 
import adModel from '../model/adModel';


// Function to clean up expired ads
const cleanupExpiredAds = async () => {
  try {
    
    const currentTime = new Date();
    // Find and delete ads that have expired
    await Ad.deleteMany({ expirationDate: { $lt: currentTime } });
    console.log("Expired ads cleaned up.");
  } catch (error) {
    console.error("Error cleaning up expired ads:", error);
  }
};

// Schedule the cleanup function to run every 24 hours (86400000 milliseconds)
setInterval(cleanupExpiredAds, 86400000);

export const createAd = async (req: any, res: Response) => {
  try {
    const { adsURL } = req.params;

    const {id,content,description} = req.body;

    // const { title, description } = req.body;

    const Ad = await adModel.create({
      id,
      content,
      description,
      // imageUrl,
      
    });


    // user.friends?.push(user.id)

    // Add the ad to the ads array
    Ad.adsArr?.push(Ad.id)
    await Ad.save();



    // Introduce a 2-second delay before sending the response
    setTimeout(() => {
      return res.status(HTTP.CREATED).json({
        message: "Ad created successfully",
        data: Ad?.id,
      });
    }, 2000); // 2000 milliseconds
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating ad",
    });
  }
};

export const getAd = async (req: Request, res: Response) => {
  try {
    const { adID } = req.params;

    const ad = await Ad.findById(adID);

    if (!ad) {
      return res.status(HTTP.NOT_FOUND).json({
        message: 'Ad not found',
      });
    }

    return res.status(HTTP.OK).json({
      message: 'Ad retrieved successfully',
      ad,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: 'Error retrieving ad',
    });
  }
};

export const updateAd = async (req: Request, res: Response) => {
  try {
    const { adID } = req.params;
    const { title, description, imageUrl } = req.body;

    const updatedAd = await Ad.findByIdAndUpdate(
      adID,
      { title, description, imageUrl },
      { new: true }
    );

    if (!updatedAd) {
      return res.status(HTTP.NOT_FOUND).json({
        message: 'Ad not found',
      });
    }

    return res.status(HTTP.OK).json({
      message: 'Ad updated successfully',
      ad: updatedAd,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: 'Error updating ad',
    });
  }
};

export const deleteAd = async (req: Request, res: Response) => {
  try {
    const { adID } = req.params;

    const deletedAd = await Ad.findByIdAndDelete(adID);

    if (!deletedAd) {
      return res.status(HTTP.NOT_FOUND).json({
        message: 'Ad not found',
      });
    }

    return res.status(HTTP.OK).json({
      message: 'Ad deleted successfully',
      ad: deletedAd,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: 'Error deleting ad',
    });
  }
};
