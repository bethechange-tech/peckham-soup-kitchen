
export const checkRole = (
    allRoles: any["roles"] = [],
    user?: any | null
): boolean => {
    if (user) {
        if (
            allRoles?.some((role: any) => {
                return user?.roles?.some((individualRole: any) => {
                    return individualRole === role;
                });
            })
        )
            return true;
    }

    return false;
};