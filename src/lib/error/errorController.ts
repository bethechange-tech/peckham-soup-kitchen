import { NextRequest, NextResponse } from "next/server";


const sendErrorDev = (
  err: Record<string, any>,
  _req: NextRequest,
  _res: NextResponse
) => {
  return {
    status: err["status"],
    error: err,
    message: err["message"],
    stack: err["stack"],
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
};

const sendErrorProd = (
  err: Record<string, any>,
  _req: NextRequest,
  _res: NextResponse
) => {
  return {
    status: err["status"],
    message: err["message"],
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
};

const errorFunction = (
  err: Record<string, any>,
  req: NextRequest,
  res: NextResponse
) => {
  err["statusCode"] = err["statusCode"] || err?.["status"] || 500;
  err["status"] = err?.["statusCode"] || err?.["status"] || "error";

  let error = { ...err };

  if (!error?.message) {
    error["message"] = err["message"] || "error";
  }

  if (process.env.NODE_ENV !== "production") {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }

  return Response.json(error, {
    status: err["statusCode"],
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default errorFunction;
