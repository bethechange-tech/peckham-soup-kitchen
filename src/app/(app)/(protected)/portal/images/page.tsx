import React from 'react'
import ClientComp from './clientComp'
import { getTags } from '@/app/_utilities/actions'

const page = async () => {
    const tags = await getTags();

    console.log('----77----');
    console.log(tags);
    console.log('====77====');

    return (
        <ClientComp tags={tags} />
    )
}

export default page