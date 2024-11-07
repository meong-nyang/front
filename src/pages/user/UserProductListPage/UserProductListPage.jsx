import React, { useEffect, useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserProductDetail from '../../../components/user/UserProductDetail/UserProductDetail';
import { useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
import Paginate from '../../../components/admin/Paginate/Paginate';
import { useParams, useSearchParams } from 'react-router-dom';
import UserCategoryLayout from '../../../components/user/UserCategoryLayout/UserCategoryLayout';
import { CATEGORY_GROUP, GROUP_LIST, PET_GROUP } from '../../../constants/category';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';

function UserProductListPage(props) {
    const limit = 10;
    const param = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [categoryData, setCategoryData] = useState({
        groupName: "",
        categoryId: 0
    });

    useEffect(() => {
        console.log("파라미터변경" + param.groupName);
        setCategoryData(category => ({
            ...category,
            groupName: param.groupName
        }))
    }, [param.groupName]);

    useEffect(() => {
        console.log("카테고리 변경")
        productList.refetch();
        productListCount.refetch();
    }, [categoryData]);

    console.log(categoryData);

    const productList = useQuery(
        ["userProductListQuery", searchParams.get("page"), categoryData],
        async () => await instance.get("/products", {
            params: {
                page: searchParams.get("page"),
                limit: limit,
                groupName: param.groupName,
                categoryId: categoryData.categoryId
            }
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

    const productListCount = useQuery(
        ["productListCountQuery", categoryData],
        async () => await instance.get("/products/count", {
            params: {
                groupName: param.groupName,
                categoryId: categoryData.categoryId
            }
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

    const groupName = (groupName) => {
        return PET_GROUP[groupName];
    };

    const categoryName = (categoryId) => {
        return CATEGORY_GROUP[categoryId];
    };

    return (
        <UserMainLayout>
            <UserCategoryLayout setCategoryData={setCategoryData} />
            <div css={s.layout}>
                <div css={s.hearderLayout}>
                    <div css={s.navigateLayout}>
                        <p>{groupName(categoryData.groupName)}</p>
                        <p>{'>'}</p>
                        <p>{categoryName(categoryData.categoryId)}</p>
                    </div>
                    <p>총 {productList?.data?.data?.productListCount}개</p>
                </div>
                <div css={s.listLayout}>
                    {
                        productList?.data?.data?.productList.map(productInfo =>
                            <UserProductDetail key={productInfo.productId} productInfo={productInfo} />
                        )
                    }
                </div>
            </div>
            <Paginate address={`/product/list/${param.groupName}`} totalCount={productListCount?.data?.data} limit={limit} />
        </UserMainLayout>

    );
}

export default UserProductListPage;