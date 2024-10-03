import React from "react";
import CategoriesTable from "./CategoriesTable";
import { getCatergories } from '../../../../_utilities/actions'

const CategoriesPage = async () => {
    const catergories = await getCatergories();

    console.log('----99----');
    console.log(catergories);
    console.log('====99====');

    return (
        <div>
            <CategoriesTable catergories={catergories} />
        </div>
    );
};

export default CategoriesPage;
