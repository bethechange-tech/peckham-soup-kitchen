import React from "react";
import { getMeUser } from "@/app/_utilities/getMeUser";
import LoginForm from "@/components/LoginForm";

export default async function ProfileForm() {
    await getMeUser({
        validUserRedirect: `/`,
    });

    return <LoginForm />;
}