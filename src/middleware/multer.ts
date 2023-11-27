import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { configStorage, validation_type } from "../utils/upload";

export const uploadFile = (path: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
      storage: configStorage(path),
      fileFilter: validation_type("image"),
      limits: { fileSize: 5242880 },
    }).single("photo");

    upload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // * A Multer error occurred when uploading.
        console.log(`ERROR WITH INSTANCEOF MULTER`);
        console.error(err.message);
        return res.status(400).json({
          status: false,
          code: 400,
          message: err.message,
        });
      } else if (err) {
        // * An unknown error occurred when uploading.
        console.log(`ERROR ANOTHER WITHOUT INSTANCEOF MULTER`);
        console.error(err);
        return res.status(400).json({
          status: false,
          code: 400,
          message: err.message,
          // * errors: err
        });
      }
      next()
    });
  };
};
