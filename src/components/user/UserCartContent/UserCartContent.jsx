import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';

function UserCartContent({ cartItem, checkItems, setCheckItems, cartItemDeleteMutation }) {
    console.log(cartItem);
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const [ productCount, setProductCount ] = useState(cartItem.productCount);
    const [debounceTimer, setDebounceTimer] = useState(null);
    

    useEffect(() => {
        if(productCount !== "") {
            const modifyCartItemData = {
                cartId: cartItem.cartId,
                userId: userInfo?.data?.id,
                productCount
            }
            clearTimeout(debounceTimer);
            setDebounceTimer(setTimeout(() => {
                modifyCartItemCountMutation.mutateAsync(modifyCartItemData);
            }, 1000));
        }
    }, [productCount]);

    const modifyCartItemCountMutation = useMutation(
        async (modifyCartItemData) => await instance.put(`/user/${cartItem.cartId}/count`, modifyCartItemData),
        {
            onSuccess: response => queryClient.invalidateQueries('cartItemListQuery'),
            onError: error => console.log(error)
        }
    );

    const handleCartItemDeleteOnClick = () => {
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
                cartItemDeleteMutation.mutateAsync([cartItem?.cartId]);
            }
        });
        
    };

    const handelItemCheck = (e) => {
        if(e.target.checked) {
            setCheckItems(items => [...items, cartItem?.cartId]);
        } else {
            setCheckItems(items => items?.filter(id => id !== cartItem?.cartId))
        }
    };

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };

    const handlePlusOnClick = () => {
        setProductCount(count => {
            const updatedCount = count + 1; // 업데이트 함수 호출
            return updatedCount;
        });
    };

    const handleMinusOnClick = () => {
        setProductCount(count => {
            let updatedCount = count;
            if (count > 1) {
                updatedCount = count - 1;
            }  // 업데이트 함수 호출
            return updatedCount;
        });
    };

    const handleCountInputOnChange = (e) => {
        const count = e.target.value;
        setProductCount(count);
        // if(count !== "") {
        //     timeUpdateCart();
        // }
    };

    const timeUpdateCart = () => {
        const modifyCartItemData = {
            cartId: cartItem.cartId,
            userId: userInfo?.data?.id,
            productCount
        }
        const timer = setTimeout(() => {
            modifyCartItemCountMutation.mutateAsync(modifyCartItemData);
        }, 1000); // 1초 후에 요청 보내기

    };

    return (
        <div css={s.contentLayout}>
            <div css={s.checkboxStyle}>
                <input type="checkbox" id={cartItem?.cartId} 
                    onChange={handelItemCheck}
                    checked={checkItems?.includes(cartItem?.cartId) ? true : false}/>
                <label htmlFor={cartItem?.cartId}>✔</label>
            </div>
            <div css={s.productLayout}>
                {/* 이미지 추가하기 */}
                <img src={"http://localhost:8080/images/" + cartItem.imgName} />
                <div>
                    <p>{cartItem?.productName}</p>
                    <p>[옵션]</p>
                </div>
            </div>
            <div css={s.countLayout}>
                <AiFillMinusCircle onClick={handleMinusOnClick} />
                <input type="text" value={productCount} onChange={handleCountInputOnChange}/>
                <AiFillPlusCircle onClick={handlePlusOnClick} />
            </div>
            <p>{priceFormet(productCount * cartItem?.productPrice)}원</p>
            <div>
                <AiTwotoneDelete onClick={handleCartItemDeleteOnClick}/>
            </div>
        </div>
    );
}

export default UserCartContent;