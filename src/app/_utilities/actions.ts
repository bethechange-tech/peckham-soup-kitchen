import { PayloadHandler } from "@/lib/PayloadHandler";
import { Articles, Categories, Images, Tags } from '@/payload-types'
import axios from "axios";


export const getTags = async (): Promise<Tags[]> => {
    try {
        const token = PayloadHandler.getToken();

        const response = await axios.get<{ docs: Tags[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tags`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        return response.data.docs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};


export const getCatergories = async (): Promise<Categories[]> => {
    try {
        const token = PayloadHandler.getToken();

        const response = await axios.get<Categories[]>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/catergories`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};

export const getImages = async (): Promise<Images[]> => {
    try {
        const token = PayloadHandler.getToken();

        const response = await axios.get<{ docs: Images[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        return response.data.docs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};



export const getArticles = async (): Promise<Articles[]> => {
    try {
        const token = PayloadHandler.getToken();

        const response = await axios.get<{ docs: Articles[] }>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        return response.data.docs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};


export const getArticle = async (articleID: string): Promise<Articles> => {
    try {
        const token = PayloadHandler.getToken();

        const response = await axios.get<Articles>(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles/${articleID}`,
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return {} as Articles;
    }
};


