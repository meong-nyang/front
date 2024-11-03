import React, { useEffect, useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserCartContent from '../../../components/user/UserCartContent/UserCartContent';
import { useMutation, useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';

function UserCartPage(props) {
    const navigate = useNavigate();

    const [ checkItems, setCheckItems ] = useState([]);
    const [ totalPrice, setTotalPrice ] = useState(0);

    const cartItemList = useQuery(
        ["cartItemListQuery"],
        async () => await instance.get("/user/cart", {
            params: {userId: 2} 
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                const total = response.data.reduce((acc, { productPrice, productCount }) => {
                    return acc + productPrice * productCount;
                }, 0);
                setTotalPrice(total);
                console.log(response);
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
            return await instance.delete(`/user/cart?${str}`)
        },
        {
            onSuccess: response => {
                console.log(response);
                cartItemList.refetch();
            },
            onError: error => console.error(error)
        }
    );

    const handleAllCheck = (e) => {
        if(e.target.checked) {
            cartItemList?.data?.data.map(({cartId}) => {
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
            title: "선택한 상품을 삭제하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "삭제",
        }).then((result) => {
            if (result.isConfirmed) {
                cartItemDeleteMutation.mutateAsync(checkItems);
                navigate("/user/cart");
            }
        });
    }

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <UserMainLayout>
            <div css={s.layout}>
                <p>장바구니</p>
                <div css={s.selectLayout}>
                    <div css={s.checkboxStyle}>
                        <input type="checkbox" id='allSelect' 
                            onChange={handleAllCheck}
                            checked={checkItems.length === cartItemList?.data?.data.length ? true : false}/>
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
                    cartItemList?.data?.data.length === 0 
                    ?
                        <p>장바구니가 비어있습니다.</p>
                    :
                        cartItemList?.data?.data.map(cartItem => 
                            <UserCartContent cartItem={cartItem} checkItems={checkItems} setCheckItems={setCheckItems} cartItemDeleteMutation={cartItemDeleteMutation}/>
                        )
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
                    <button>선택상품주문</button>
                    <button>전체상품주문</button>
                </div>

            </div>
        </UserMainLayout>
    );
}

export default UserCartPage;