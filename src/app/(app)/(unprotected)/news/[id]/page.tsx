import React from 'react'
import { getArticle } from '@/app/_utilities/actions';
import ClientComp from './clientComp';

const page = async ({ params: { id: slug } }: { params: { id: string } }) => {
    const article = await getArticle(slug);

    console.log('----88----');
    console.log(article);
    console.log('====88====');

    return (
        <ClientComp article={article} />
    )
}

export default page