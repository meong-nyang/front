import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserCartContent from '../../../components/user/UserCartContent/UserCartContent';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';
import Paginate from '../../../components/admin/Paginate/Paginate';
import { useRecoilState } from 'recoil';
import { cartItemCheckList, orderProuctListAtom } from '../../../atoms/orderAtom';
import UserScrollLayout from '../../../components/user/UserScrollLayout/UserScrollLayout';
import { convertToCommaValue } from '../../../utils/changeStringFormat';

function UserCartPage() {
    const limit = 10;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const userInfoState = queryClient.getQueryState("userInfoQuery");
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ isInit, setInit ] = useState(true); 
    //체크된 아이템의 cartId를 담는 배열(초기값: 장바구니의 모든 id)
    const [ checkItems, setCheckItems ] = useRecoilState(cartItemCheckList);
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);
    console.log(checkItems);
    console.log(orderProductList);
    console.log(totalPrice);

    // useEffect(() => {
    //     if (isInit && cartItemAllList?.data?.data) {
    //         const allCartIds = cartItemAllList?.data?.data.map(({ id }) => id) || [];
    //         setCheckItems(allCartIds); // 처음에만 checkItems 설정
    //         setInit(false); // 설정 후에는 더 이상 변경하지 않도록 isInit을 false로 설정
    //     }
    // }, [isInit]);

    useEffect(() => {
        if(userInfoState === "success" && userInfo === undefined) {
            Swal.fire({
                icon: "error",
                text: "로그인 후 이용가능합니다.",
                showCancelButton: true,
                cancelButtonText: "닫기",
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "로그인하기",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/user/signin")
                }
            });
            navigate("/")
            return;
        }
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    }, []);

    // useEffect(() => {
    //     if(isInit) {
    //         setCheckItems(cartItemAllList?.data?.data?.map(item => item.id));
    //     }
    //     return setInit(false);
    // }, [cartItemAllList?.data?.data]);

    //페이지네이션이 적용된 장바구니 아이템 리스트
    const cartItemList = useQuery(
        ["cartItemListQuery", searchParams.get("page")],
        async () => await instance.get("/user/cart", {
            params: {
                userId: userInfo?.data?.id,
                page: searchParams.get("page"),
                limit: limit,
            } 
        }),
        {
            enabled: !!userInfo?.data?.id,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response)
        }
    );

    //페이지네이션 적용안된 전체 장바구니 아이템 리스트
    const cartItemAllList = useQuery(
        ["cartItemAllListQuery"],
        async () => await instance.get("/user/cartId", {
            params: {
                userId: userInfo?.data?.id,  
            } 
        }),
        {
            enabled: !!userInfo?.data?.id,
            onSuccess: response => {
                console.log(response)
                if(isInit) {
                    setCheckItems(response.data.map(item => item.id))
                    setInit(false)
                }
            }
        }
    )

    useEffect(() => {
        let total = 0;
        if(checkItems?.length !== 0) {
            total = cartItemAllList?.data?.data
            .filter(item => checkItems?.includes(item.id))
                .reduce((acc, { product, productCount }) => {
                    return acc + ((product.productPrice - product.productPriceDiscount) * productCount);
                }, 0);
        }
        console.log(total);
        setTotalPrice(total);
        
    }, [checkItems, cartItemAllList.data]);

    const cartItemListCount = useQuery(
        ["cartItemListCountQuery"],
        async () => await instance.get("/user/cart/count", {
            params: {
                userId: userInfo?.data?.id,  
            } 
        }),
        {
            enabled: !!userInfo?.data?.id,
            retry: 0,
            refetchOnWindowFocus: false,
        }
    );

    const cartItemDeleteMutation = useMutation(
        async (deleteIds) => {
            const arr = Array.from(deleteIds);
            let str = "cartIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.delete(`/user/cart?userId=${userInfo?.data?.id}&${str}`)
        },
        {
            onSuccess: (response, deleteIds) => {
                console.log(deleteIds);
                cartItemList.refetch();
                cartItemAllList.refetch();
                setCheckItems(items => (
                    items.filter(item => !deleteIds.includes(item))  
                ));
            },
            onError: error => console.error(error)
        }
    );

    const handleAllCheck = (e) => {
        if(e.target.checked) {
            const allCartIds = cartItemAllList?.data?.data.map(({ id }) => id) || [];
            setCheckItems(allCartIds);
        } else {
            setCheckItems([]);
        }
    };

    const handleSelectDeleteOnClick = () => {
        Swal.fire({
            text: "선택한 상품을 삭제하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "삭제",
        }).then((result) => {
            if (result.isConfirmed) {
                cartItemDeleteMutation.mutateAsync(checkItems);
            }
        });
    }

    const handleSelectProductOrderOnClick = () => {
        if(checkItems?.length === 0) {
            Swal.fire({
                text: "선택한상품이 없습니다. ",
                icon: "error",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "닫기",
            });
            return;
        }
        Swal.fire({
            text: `선택한 상품 ${checkItems.length}개를 구매하시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "구매",
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedProducts = cartItemAllList?.data?.data
                    .filter(item => checkItems.includes(item.id)) // checkItems에 있는 상품 ID로 필터링
                    .map(item => ({
                        cartId: item.id,
                        productId: item.productId,
                        productName: item.product.productName,
                        productCount: item.productCount,
                        productPrice: item.product.productPrice - item.product.productPriceDiscount,
                        productTotal: item.productCount * item.product.productPrice - item.product.productPriceDiscount
                    }));
                setOrderProductList(selectedProducts);
                navigate("/user/order");
            }});
    };

    const handleAllProductOrderOnClick = () => {
        Swal.fire({
            text: `전체 상품을 구매하시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "구매",
        }).then((result) => {
            if (result.isConfirmed) {
                setOrderProductList(cartItemAllList?.data?.data
                    .map(item => ({
                        cartId: item.id,
                        productId: item.productId,
                        productName: item.product.productName,
                        productCount: item.productCount,
                        productPrice: item.product.productPrice - item.product.productPriceDiscount,
                        productTotal: item.productCount * item.product.productPrice - item.product.productPriceDiscount
                    })));
                navigate("/user/order")
            }});
    };
    
    return (
        <UserMainLayout>
            <UserScrollLayout>
            <div css={s.layout}>
                <p>장바구니</p>
                <div css={s.selectLayout}>
                    <div css={s.checkboxStyle}>
                        <input type="checkbox" id='allSelect' 
                            onChange={handleAllCheck}
                            checked={checkItems?.length === cartItemAllList?.data?.data?.length && checkItems?.length !== 0 ? true : false}
                           />
                        <label htmlFor="allSelect" >✔</label>
                        <label htmlFor="allSelect" >전체선택</label>
                    </div>
                    <button onClick={handleSelectDeleteOnClick} disabled={checkItems?.length === 0} >선택삭제</button>
                </div>
                <div css={s.titleLayout}>
                    <p>선택</p>
                    <p>상품명/옵션</p>
                    <p>수량</p>
                    <p>결제금액</p>
                    <p></p>
                </div>
                {
                    cartItemListCount?.data?.data === 0 
                    ?
                        <p css={s.blankText}>장바구니가 비어있습니다.</p>
                    :
                    <>
                    {
                        cartItemList?.data?.data?.cartList.map(cartItem => 
                            <UserCartContent cartItem={cartItem} cartItemDeleteMutation={cartItemDeleteMutation}/>
                        )
                    }
                    <Paginate address={"/user/cart"} totalCount={cartItemListCount?.data?.data} limit={limit}/>
                    </>
                }
                <div css={s.paymentLayout}>
                    <p>결제정보</p>
                    <div css={s.priceLayout}>
                        <div>
                            <p>총주문금액</p>
                            <p>{convertToCommaValue(totalPrice)}원</p>
                        </div>
                        <p>+</p>
                        <div>
                            <p>배송비</p>
                            <p>{checkItems?.length === 0 ? "0" : "3,000"}원</p>
                        </div>
                        <p>=</p>
                        <div>
                            <p>결제 예정 금액</p>
                            <p>{checkItems?.length === 0 ? convertToCommaValue(totalPrice) : convertToCommaValue(totalPrice + 3000)}원</p>
                        </div>
                    </div>
                </div>

                <div css={s.orderButtonLayout}>
                    <button onClick={handleSelectProductOrderOnClick}>선택상품주문</button>
                    <button onClick={handleAllProductOrderOnClick}>전체상품주문</button>
                </div>

            </div>
            </UserScrollLayout>
        </UserMainLayout>
    );
}

export default UserCartPage;