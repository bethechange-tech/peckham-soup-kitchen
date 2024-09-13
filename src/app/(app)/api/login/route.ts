import { PayloadHandler } from "@/lib/PayloadHandler";
import { HandlerFunctionWrapper } from "@/lib/handler-wrapper";
import { NextRequest } from "next/server";

export const POST = HandlerFunctionWrapper(async (req: NextRequest) => {
    const payloadControllerUtils = new PayloadHandler();

    const payload = await PayloadHandler.getPayload();
    const { email, password } = await req.json();

    const { user, token } = await payload.login({
        collection: "users",
        data: { email, password },
    });

    return payloadControllerUtils.createSendToken({
        req,
        user,
        token,
    });
}); 