import React, { useEffect, useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserCartContent from '../../../components/user/UserCartContent/UserCartContent';
import { useMutation, useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';
import Paginate from '../../../components/admin/Paginate/Paginate';
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';

function UserCartPage(props) {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const limit = 10;
    const [ checkItems, setCheckItems ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0);
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);

    const cartItemList = useQuery(
        ["cartItemListQuery"],
        async () => await instance.get("/user/cart", {
            params: {
                userId: 2,
                page: searchParams.get("page"),
                limit: limit,
            } 
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response.data);
                const total = response.data.cartList.reduce((acc, { productPrice, productCount }) => {
                    return acc + productPrice * productCount;
                }, 0);
                setTotalPrice(total);
            } ,
            onError: error => console.error(error)
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
            //(수정) userId 받아오기
            return await instance.delete(`/user/cart?userId=2&${str}`)
        },
        {
            onSuccess: response => cartItemList.refetch(),
            onError: error => console.error(error)
        }
    );

    const handleAllCheck = (e) => {
        if(e.target.checked) {
            cartItemList?.data?.data?.cartList.map(({cartId}) => {
                setCheckItems(item => ([
                    ...item,
                    cartId
                ]))
            })
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

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleSelectProductOrderOnClick = () => {
        Swal.fire({
            text: `선택한 상품 ${checkItems.length}개를 구매하시겠습니까?`,
            icon: "success",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "구매",
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedProducts = cartItemList?.data?.data?.cartList
                    .filter(item => checkItems.includes(item.cartId)) // checkItems에 있는 상품 ID로 필터링
                    .map(item => ({
                        productId: item.productId,
                        productName: item.productName,
                        productCount: item.productCount,
                        productPrice: item.productPrice,
                        productTotal: item.productCount * item.productPrice
                    }));
                setOrderProductList(selectedProducts);
                navigate("/user/order");
            }});
    };

    const handleAllProductOrderOnClick = () => {
        Swal.fire({
            text: `전체 상품을 구매하시겠습니까?`,
            icon: "success",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "구매",
        }).then((result) => {
            if (result.isConfirmed) {
                setOrderProductList(cartItemList?.data?.data?.cartList
                    .map(item => ({
                        productId: item.productId,
                        productName: item.productName,
                        productCount: item.productCount,
                        productPrice: item.productPrice,
                        productTotal: item.productCount * item.productPrice
                    })));
                navigate("/user/order")
            }});
    };
    
    return (
        <UserMainLayout>
            <div css={s.layout}>
                <p>장바구니</p>
                <div css={s.selectLayout}>
                    <div css={s.checkboxStyle}>
                        <input type="checkbox" id='allSelect' 
                            onChange={handleAllCheck}
                            checked={checkItems.length === cartItemList?.data?.data?.cartListCount & checkItems.length !== 0 ? true : false}/>
                        <label htmlFor="allSelect" >✔</label>
                        <label htmlFor="allSelect" >전체선택</label>
                    </div>
                    <button onClick={handleSelectDeleteOnClick} disabled={checkItems.isNaN} >선택삭제</button>
                </div>
                <div css={s.titleLayout}>
                    <p>선택</p>
                    <p>상품명/옵션</p>
                    <p>수량</p>
                    <p>결제금액</p>
                    <p></p>
                </div>
                {
                    cartItemList?.data?.data.cartListCount === 0 
                    ?
                        <p css={s.blankText}>장바구니가 비어있습니다.</p>
                    :
                    <>
                    {
                        cartItemList?.data?.data?.cartList.map(cartItem => 
                            <UserCartContent cartItem={cartItem} checkItems={checkItems} setCheckItems={setCheckItems} cartItemDeleteMutation={cartItemDeleteMutation}/>
                        )
                    }
                    <Paginate address={"/user/cart"} totalCount={cartItemList?.data?.data?.cartListCount} limit={limit}/>
                    </>
                }
                <div css={s.paymentLayout}>
                    <p>결제정보</p>
                    <div css={s.priceLayout}>
                        <div>
                            <p>총주문금액</p>
                            <p>{priceFormet(totalPrice)}원</p>
                        </div>
                        <p>+</p>
                        <div>
                            <p>배송비</p>
                            <p>2,500원</p>
                        </div>
                        <p>=</p>
                        <div>
                            <p>결제 예정 금액</p>
                            <p>{priceFormet(totalPrice + 2500)}원</p>
                        </div>
                    </div>
                </div>

                <div css={s.orderButtonLayout}>
                    <button onClick={handleSelectProductOrderOnClick}>선택상품주문</button>
                    <button onClick={handleAllProductOrderOnClick}>전체상품주문</button>
                </div>

            </div>
        </UserMainLayout>
    );
}

export default UserCartPage;