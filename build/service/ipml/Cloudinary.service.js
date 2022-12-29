"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary.config"));
const streamifier_1 = __importDefault(require("streamifier"));
class CloudinaryService {
    constructor() {
        this.optionsCloud = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder: "doan4",
        };
    }
    uploadFile(file, options) {
        return new Promise((resolve, reject) => {
            cloudinary_config_1.default.uploader
                .upload(file, Object.assign(Object.assign({}, this.optionsCloud), options))
                .then((result) => {
                resolve(result);
            })
                .catch((err) => reject(err));
        });
    }
    uploadFileBuffer(fileBuffer, options) {
        return new Promise((resolve, reject) => {
            let cld_upload_stream = cloudinary_config_1.default.uploader.upload_stream(Object.assign(Object.assign({}, this.optionsCloud), options), function (error, result) {
                resolve(result);
            });
            streamifier_1.default.createReadStream(fileBuffer).pipe(cld_upload_stream);
        });
    }
}
exports.default = new CloudinaryService();
