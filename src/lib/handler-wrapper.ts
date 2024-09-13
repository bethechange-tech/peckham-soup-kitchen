import errorFunction from "./error/errorController";
import { NextRequest, NextResponse } from "next/server";
import { PayloadHandler } from "./PayloadHandler";
import AppError from "./appError";
// import { Users } from "@/payload-types";

type Users = any

type NextHandlerFunction = (
  req: NextRequest,
  res: NextResponse,
  user?: Users
) => Promise<Response>;

const HandlerFunctionWrapper =
  (handlerFunction: NextHandlerFunction, options?: { useAuth?: boolean }) =>
    async (req: NextRequest, res: NextResponse) => {

      if (options?.useAuth) {
        const token = PayloadHandler.getToken();
        const resp = await fetch(
          `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user } = await resp.json();

        if (!user) {
          throw new AppError(
            "Failed to retrieve user data. Please ensure you are logged in and have the correct permissions.",
            401
          );
        }

        console.log("User data retrieved:", user.id);
      }


      let response;

      try {
        response = await handlerFunction(req, res);
      } catch (e: any) {
        response = errorFunction(e, req, res);
      }

      return response;
    };

export { HandlerFunctionWrapper };