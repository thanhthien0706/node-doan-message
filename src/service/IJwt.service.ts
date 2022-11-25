import { IncomingHttpHeaders } from "http";

export interface IJwtService {
  getToken(headers: IncomingHttpHeaders): string;

  generateToken(data: object, options: object): Promise<string | undefined>;

  verifyToken(token: string, options: object): Promise<any>;
}
