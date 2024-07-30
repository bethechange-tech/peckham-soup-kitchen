import { type NextRequest, type NextResponse } from 'next/server';
import errorFunction from "./error/errorController";

type NextHandlerFunction = (
  req: NextRequest,
  res: NextResponse
) => Promise<Response>;

const HandlerFunctionWrapper =
  (handlerFunction: NextHandlerFunction) =>
    async (req: any, res: NextResponse) => {
      let response;

      try {
        response = await handlerFunction(req, res);
      } catch (e: any) {
        response = errorFunction(e, req, res);
      }

      return response;
    };

export { HandlerFunctionWrapper };
