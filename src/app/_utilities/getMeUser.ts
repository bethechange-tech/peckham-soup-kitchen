"use server";
import { PayloadHandler } from "@/lib/PayloadHandler";
import { redirect } from "next/navigation";
import { User } from "payload";

export const getMe = async (): Promise<User> => {
    const token = PayloadHandler.getToken();
    const meReq = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
        {
            headers: {
                Authorization: `JWT ${token}`,
            },
        }
    );

    const {
        user,
    }: {
        user: User;
    } = await meReq.json();

    return user;
};

export const getMeUser = async (args?: {
    nullUserRedirect?: string;
    validUserRedirect?: string;
}): Promise<{
    user: User | null;
    token: string | null;
}> => {
    const { nullUserRedirect, validUserRedirect } = args || {};
    const token = PayloadHandler.getToken();

    if (!token) {
        if (nullUserRedirect) {
            redirect(nullUserRedirect);
        }

        return { user: null, token: null };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        if (!response.ok) {
            if (nullUserRedirect) {
                redirect(nullUserRedirect);
            }
            return { user: null, token };
        }

        const data = await response.json();

        if (validUserRedirect) {
            redirect(validUserRedirect);
        }

        return {
            user: data.user,
            token,
        };
    } catch (error) {
        console.error('Error fetching user:', error);
        if (nullUserRedirect) {
            redirect(nullUserRedirect);
        }
        return { user: null, token };
    }
};