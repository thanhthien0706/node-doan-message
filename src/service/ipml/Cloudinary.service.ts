import { IClouddinaryService } from "../ICloudinary.service";
import cloudinary from "../../config/cloudinary.config";

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
}

export default new CloudinaryService();
