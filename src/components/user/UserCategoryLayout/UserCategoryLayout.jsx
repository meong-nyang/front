import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQueryClient } from 'react-query';

function UserCategoryLayout({ setCategoryData }) {
    const queryClient = useQueryClient();
    const categoryQuery = queryClient.getQueryData("categoryListQuery");

    const handleCategoryOnCilck = (categoryId) => {
        setCategoryData(category => ({
            ...category,
            categoryId
        }));
        console.log(categoryId);
    };

    return (
        <div css={s.layout}>
            <button onClick={() => handleCategoryOnCilck(0)}>전체</button>
            {
                categoryQuery?.data?.categoryList.map(category => 
                    <button key={category.id} onClick={() => handleCategoryOnCilck(category.id)}>{category.categoryName}</button>
                )
            }
        </div>
    );
}

export default UserCategoryLayout;