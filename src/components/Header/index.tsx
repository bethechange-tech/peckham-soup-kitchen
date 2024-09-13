import React from 'react'
import Header from './Header'
import { getMe } from "../../app/_utilities/getMeUser";

const Index = async () => {
    const user = await getMe();

    console.log('----88----');
    console.log(user);
    console.log('====88====');

    return (
        <Header user={user} />
    )
}

export default Index