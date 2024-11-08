import React, { useEffect, useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { CiSearch } from "react-icons/ci";
import { useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useSearchParams } from 'react-router-dom';
import UserProductDetail from '../../../components/user/UserProductDetail/UserProductDetail';
import Paginate from '../../../components/admin/Paginate/Paginate';
function UserSearchProductPage(props) {
    const limit = 12;
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchData, setSearchData ] = useState("");
    const [ searchProductData, setSearchProductData ] = useState({
        products: [],
        productsCount: 0
    });
    const [ isEnter, setEnter ] = useState(false);
    const [ isInit, setInit ] = useState(true);

    useEffect(() => {
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    }, []);

    useEffect(() => {
        if(!isInit) {
            setEnter(true);
        }
        if(isInit) {
            setSearchProductData([]);
        }
    }, [searchParams.get("page")]);

    const searchProductList = useQuery(
        ["searchProductListQuery", searchParams.get("page")],
        async () => await instance.get("/product/search", {
            params: {
                page: searchParams.get("page"),
                limit,
                search: searchData
            }
        }),
        {
            enabled: isEnter,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setSearchProductData(data => ({
                    ...data,
                    products: response.data.products
                }));
                setEnter(false);
                setInit(false);
                console.log(response)
            },
            onError: error => console.log(error)
        }
    );

    const searchProductListCount = useQuery(
        ["searchProductListCountQuery", searchData],
        async () => await instance.get(`/product/search/count?search=${searchData}`),
        {
            enabled: isEnter,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => setSearchProductData(data => ({
                ...data,
                productsCount: response.data
            })),
            onError: error => console.log(error)
        }
    );
    
    const handleInputOnChange = (e) => {
        setSearchData(e.target.value);
    };
    
    const handleInputOnKeyDown = (e) => {
        if(e.keyCode === 13) {
            setEnter(true);
        }
    };

    return (
        <UserBackgoundLayout>
            <div css={s.layout}>
                <div css={s.searchLayout}>
                    <input name='searchData' type="text" 
                        onChange={handleInputOnChange} 
                        onKeyDown={handleInputOnKeyDown}
                        value={searchData} 
                        placeholder='검색어를 입력해주세요'/>
                    <CiSearch />
                </div>
                <div css={s.resultLayout}>
                    {
                        searchProductList?.data?.data?.productCount === 0 
                        ? 
                        <p>"{searchData}" 의 검색 결과가 없습니다.</p>
                        :
                        <>
                            <p>총 {searchProductData?.productsCount}개의 검색결과가 있습니다.</p>
                            <div css={s.listLayout}>
                            {
                                searchProductData?.products?.map(product => 
                                    <UserProductDetail key={product.productId} productInfo={product} />
                                )
                            }
                            </div>
                        </>
                    }
                </div>
            </div>
            <Paginate address={"/search"} totalCount={searchProductListCount?.data?.data} limit={limit} />
        </UserBackgoundLayout>            
    );
}

export default UserSearchProductPage;