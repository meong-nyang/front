import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { cartItemCheckList } from '../../../atoms/orderAtom';
import { IMAGE_ADDRESS, instance } from '../../../apis/util/instance';
import { alwaysNumber, convertToCommaValue, convertToNumericValue } from '../../../utils/changeStringFormat';

function UserCartContent({ cartItem, cartItemDeleteMutation }) {
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const siteLogo = queryClient.getQueryData("siteLogoQuery");
    const [ productCount, setProductCount ] = useState(1);
    const [ debounceTimer, setDebounceTimer ] = useState(null);
    const [ checkItems, setCheckItems ] = useRecoilState(cartItemCheckList);

    console.log(cartItem);
    useEffect(() => {
        setProductCount(cartItem.productCount);  
    }, [cartItem.productCount]);

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
            }, 500));
        }
    }, [productCount]);

    const currentStockCheck = useQuery(
        ["currentStockCheckQuery", cartItem.productId],
        async () => {
            const arr = Array.from([cartItem.productId]);
            let str = "productIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.get(`/product/stock?${str}`)
        },
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response)
        }
    );

    const modifyCartItemCountMutation = useMutation(
        async (modifyCartItemData) => await instance.put(`/user/${cartItem.cartId}/count`, modifyCartItemData),
        {
            onSuccess: () => queryClient.invalidateQueries('cartItemAllListQuery'),
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

    const handlePlusOnClick = () => {
        const stock = currentStockCheck?.data?.data?.currentStocks[0];
        if(productCount === "") {
            setProductCount(0);
        }
        if(stock?.currentStock >= productCount + 1){
            setProductCount(count => {
                const updatedCount = count + 1; // 업데이트 함수 호출
                return updatedCount;
            });
        } else {
            Swal.fire({
                text: "재고가 넘는 수량은 선택할 수 없습니다.",
                icon: "error",
                timer: 1500,
                showConfirmButton: false
            });
        } 
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
        const value = convertToNumericValue(e.target.value);
        const stock = currentStockCheck?.data?.data?.currentStocks[0];
        setProductCount(alwaysNumber(value));
        if(stock?.currentStock >= alwaysNumber(value)){
            setProductCount(alwaysNumber(value));
        } else {
            const previousCount = productCount;
            console.log(previousCount); // 원래 값 저장
            setProductCount(alwaysNumber(value))
            Swal.fire({
                text: "재고가 넘는 수량은 선택할 수 없습니다.",
                icon: "error",
                timer: 1500,
                showConfirmButton: false
            });
            setProductCount(previousCount);
            clearTimeout(debounceTimer);
            setDebounceTimer(setTimeout(() => {
            }, 1000));
        }
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
                <img src={cartItem.imgName === "" ? IMAGE_ADDRESS + siteLogo?.data : IMAGE_ADDRESS + cartItem.imgName} />
                <div>
                    <p>{cartItem?.productName}</p>
                </div>
            </div>
            <div css={s.countLayout}>
                <AiFillMinusCircle onClick={handleMinusOnClick} />
                <input type="text" value={productCount} onChange={handleCountInputOnChange}/>
                <AiFillPlusCircle onClick={handlePlusOnClick} />
            </div>
            <p>{convertToCommaValue(productCount * (cartItem?.productPrice - cartItem?.productDiscountPrice))}원</p>
            <div>
                <AiTwotoneDelete onClick={handleCartItemDeleteOnClick}/>
            </div>
        </div>
    );
}

export default UserCartContent;