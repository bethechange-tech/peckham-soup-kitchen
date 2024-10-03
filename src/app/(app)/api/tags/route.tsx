import { NextRequest, NextResponse } from 'next/server';
import { HandlerFunctionWrapper } from '../../../../lib/handler-wrapper';
import { uploadFiles } from '@/services/adapters';
import { PayloadTransactionManager } from '@/lib/PayloadTransactionManager';
import { PayloadHandler } from '@/lib/PayloadHandler';
import { Images, Tags } from '@/payload-types';

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
    const reader = stream.getReader();
    const chunks = [];
    let done, value;

    while (!done) {
        ({ done, value } = await reader.read());
        if (value) {
            chunks.push(value);
        }
    }
    return Buffer.concat(chunks);
}

export const POST = HandlerFunctionWrapper(async (request: NextRequest) => {
    try {
        const formData = await request.formData();
        const tag = formData.get('tag') as string;
        const files: Buffer[] = [];

        for (const [key, value] of formData.entries()) {
            if (key.startsWith('file_')) {
                const file = value as File;
                const fileStream = file?.stream();
                const fileBuffer = await streamToBuffer(fileStream);
                files.push(fileBuffer);
            }
        }

        // Assuming you have a service to handle file uploads
        const urls = await uploadFiles({ files });

        console.log('Received tag:', tag);
        console.log('Received files:', files);
        console.log('Received urls:', urls);

        const payload = await PayloadHandler.getPayload();
        console.log("Payload instance obtained.");

        const transactionManager = new PayloadTransactionManager(payload);
        console.log("Transaction manager initialized.");

        // Use upsert method to ensure the tag is either created or updated
        await transactionManager.upsert<Tags>('tags', {
            id: {
                equals: tag
            }
        }, {
            name: tag,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            id: ''
        });

        // Return success response
        return new NextResponse('File uploaded successfully', {
            status: 200,
        });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return new NextResponse('Failed to upload files', { status: 500 });
    }
}, { useAuth: false });


export const GET = HandlerFunctionWrapper(async (req) => {
    console.log("Request received to get jobs");

    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get("page") || "10", 10);

    try {
        const payload = await PayloadHandler.getPayload();

        const jobsResponse = await payload.find({
            collection: "tags",
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
