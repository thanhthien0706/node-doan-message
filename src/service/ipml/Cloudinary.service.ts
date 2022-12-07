import { IClouddinaryService } from "../ICloudinary.service";
import cloudinary from "../../config/cloudinary.config";
import streamifier from "streamifier";

class CloudinaryService implements IClouddinaryService {
  private optionsCloud: object;

  constructor() {
    this.optionsCloud = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "doan4",
    };
  }

  uploadFile(file: any, options?: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload(file, {
          ...this.optionsCloud,
          ...options,
        })
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => reject(err));
    });
  }

  uploadFileBuffer(fileBuffer: any, options?: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          ...this.optionsCloud,
          ...options,
        },
        function (error: any, result: any) {
          resolve(result);
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    });
  }
}

export default new CloudinaryService();
