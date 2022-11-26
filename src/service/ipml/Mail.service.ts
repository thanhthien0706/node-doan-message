import createError from "http-errors";
import nodemailer from "nodemailer";

import { EMAIL_USER, EMAIL_PASSWORD } from "./../../config/enviroment";

import { IMailservice } from "../IMail.service";

class MailService implements IMailservice {
  sendMail(content: string, subject: string, toEmail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
      });

      let mainOptions = {
        from: "NQH-Test nodemailer",
        to: toEmail,
        subject: subject,
        html: content,
      };

      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          throw createError(500, "Not Send Mail");
        } else {
          resolve(true);
        }
      });
    });
  }
}

export default new MailService();
