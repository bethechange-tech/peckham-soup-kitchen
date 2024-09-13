
import { AccessArgs } from "payload";
import { checkRole } from "./checkRole";

type isAdmin = (args: AccessArgs<unknown>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
    return checkRole(["admin"], user);
};
