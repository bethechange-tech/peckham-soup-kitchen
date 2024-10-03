import { HandlerFunctionWrapper } from '@/lib/handler-wrapper';
import { PayloadHandler } from '@/lib/PayloadHandler';

export const GET = HandlerFunctionWrapper(
    async (req) => {
        console.log('Request received to get article');

        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return new Response('Article ID is required', { status: 400 });
        }

        try {
            const payload = await PayloadHandler.getPayload();

            const articleResponse = await payload.find({
                collection: 'articles',
                where: {
                    or: [
                        {
                            id: {
                                equals: id,
                            },
                        },
                        {
                            slug: {
                                equals: id,
                            },
                        },
                    ]
                },
            });

            if (articleResponse.docs.length === 0) {
                return new Response('Article not found', { status: 404 });
            }

            return Response.json(articleResponse.docs[0]);
        } catch (error) {
            console.error('Error in GET handler:', error);
            throw error
        }
    },
    { useAuth: false }
);
