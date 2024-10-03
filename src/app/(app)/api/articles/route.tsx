import { HandlerFunctionWrapper } from '@/lib/handler-wrapper';
import { FileHandler } from '@/lib/FileHandler'
import { PayloadTransactionManager } from '@/lib/PayloadTransactionManager';
import { PayloadHandler } from '@/lib/PayloadHandler';
import { uuid } from 'uuidv4';
import slugify from 'slugify'


export const POST = HandlerFunctionWrapper(async (req, _res, user) => {
    console.log("Request received for article creation.");

    const formData = await req.formData();
    console.log("FormData received:", formData);

    const tag = formData.get('tag') as string;
    const payload = await PayloadHandler.getPayload();
    console.log("Payload instance obtained.");

    const transactionManager = new PayloadTransactionManager(payload);

    try {
        const file = formData.get('image') as File;
        const fileHandler = new FileHandler();
        const files = await fileHandler.buildBuffer([file])
        const urls = await fileHandler.generateFiles(files)

        console.log('Received tag:', tag);
        console.log('Received files:', files);
        console.log('Received urls:', urls);

        // Prepare the article data from FormData
        const articleBody = {
            id: uuid(),
            title: formData.get('title')?.toString() || '',
            slug: slugify(formData.get('title')?.toString() || '') || '',
            author: formData.get('author')?.toString() || '',
            image: urls[0], // Handle file upload
            link: formData.get('link')?.toString() || '',
            description: formData.get('description')?.toString() || '',
            extendedDescription: formData.get('extendedDescription')?.toString() || '',
            category: Number(formData.get('category')) || '',
            date: formData.get('date')?.toString() || new Date().toISOString(),
            published: formData.get('published') === 'true',
        };

        console.log("Parsed article body:", articleBody);
        console.log("Transaction manager initialized.");

        console.log("Beginning transaction...");
        await transactionManager.begin();

        // Create a new article
        console.log("Creating a new article...");
        const articleEntry = await transactionManager.create('articles', {
            ...articleBody,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            applicant: user?.id,
        });

        console.log("Article created:", articleEntry);


        console.log("Committing transaction...");
        await transactionManager.commit();
        console.log("Transaction committed.");

        return Response.json({
            article: articleEntry,
        });
    } catch (error) {
        console.error('Error encountered:', error);
        console.log("Rolling back transaction...");
        await transactionManager.rollback();
        console.log("Transaction rolled back.");

        throw error;
    }
}, { useAuth: false });

export const GET = HandlerFunctionWrapper(async (req) => {
    console.log("Request received to get jobs");

    try {
        const payload = await PayloadHandler.getPayload();

        const jobsResponse = await payload.find({
            collection: "articles",
            where: {},
        });

        console.log("Jobs retrieved successfully:", jobsResponse.docs);

        return Response.json({
            ...jobsResponse,
        });
    } catch (error) {
        console.error("Error in GET handler:", error);
        throw error; // rethrow the error
    }
}, { useAuth: false });
