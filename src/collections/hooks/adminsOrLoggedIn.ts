import { Access, AccessArgs, User } from "payload";
import { checkRole } from "./checkRole";


export const adminsOrLoggedIn: Access = ({ req }: AccessArgs<User>) => {
    if (checkRole(["admin"], req.user)) {
        return true;
    }

    return !!req.user;
};