import { Response } from "express";

enum HttpStatus {
  OK = 200,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Success",
      data: data,
    });
  }

  NotFound(res: Response, data: string): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: "Not Found",
      error: data,
    });
  }

  Unauthorized(res: Response, data: string): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      error: data,
    });
  }

  Forbidden(res: Response, data: string): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: "Forbidden",
      error: data,
    });
  }

  ServerError(res: Response, error?: Error, url?: string): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error?.message,
      error: error?.name,
      path: url,
    });
  }
}

const httpResponse = new HttpResponse();
export default httpResponse;
