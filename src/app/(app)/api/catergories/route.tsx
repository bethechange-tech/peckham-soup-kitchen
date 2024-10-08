import { NextRequest, NextResponse } from 'next/server';
import { HandlerFunctionWrapper } from '@/lib/handler-wrapper';
import { PayloadTransactionManager } from '@/lib/PayloadTransactionManager';
import { PayloadHandler } from '@/lib/PayloadHandler';
import { Categories } from '@/payload-types';

// Helper function to get payload instance
const getPayloadInstance = async () => {
    const payload = await PayloadHandler.getPayload();
    console.log("Payload instance obtained.");
    return payload;
};

// Helper function for transaction management
const initializeTransactionManager = async (payload: any) => {
    const transactionManager = new PayloadTransactionManager(payload);
    console.log("Transaction manager initialized.");
    return transactionManager;
};

// Helper function to handle responses
const handleSuccessResponse = (message: string, data: any = null) => {
    console.log(message);
    return new NextResponse(data ? JSON.stringify(data) : message, {
        status: 200,
    });
};

// Helper function to handle errors
const handleErrorResponse = (error: unknown, message: string) => {
    console.error(message, error);
    return new NextResponse(message, {
        status: 500,
    });
};

// POST Handler
export const POST = HandlerFunctionWrapper(async (request: NextRequest) => {
    try {
        const formData = (await request.json()) as Categories

        const payload = await getPayloadInstance();
        const transactionManager = await initializeTransactionManager(payload);

        const categoriesEntry = await transactionManager.create<Categories>('categories', {
            id: formData.id, // Assuming ID is auto-generated by the database
            name: formData.name,
            description: formData.description,
            updatedAt: formData.updatedAt,
            createdAt: formData.createdAt,
        });

        return handleSuccessResponse('Category created successfully', categoriesEntry);
    } catch (error) {
        return handleErrorResponse(error, 'Failed to create category');
    }
}, { useAuth: false });

// GET Handler
export const GET = HandlerFunctionWrapper(async () => {
    try {
        const payload = await getPayloadInstance();

        const categoriesResponse = await payload.find({
            collection: 'categories',
            where: {},
        });

        return handleSuccessResponse('Categories retrieved successfully', categoriesResponse.docs);
    } catch (error) {
        return handleErrorResponse(error, 'Failed to retrieve categories');
    }
}, { useAuth: false });
