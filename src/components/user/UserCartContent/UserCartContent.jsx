import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import { IMAGE_ADDRESS, instance } from '../../../apis/util/instance';

function UserCartContent({ cartItem, checkItems, setCheckItems, cartItemDeleteMutation }) {
    console.log(cartItem);
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const [ productCount, setProductCount ] = useState(cartItem.productCount);
    const [ debounceTimer, setDebounceTimer ] = useState(null);
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);

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
        setOrderProductList((prevOrderList) => 
            prevOrderList?.map((product) => {
                if (product.productId === cartItem.productId) {
                    return {
                        ...product,
                        productCount: productCount
                    };
                }
                return product;
            })
        );
    }, [productCount]);

    const currentStockCheck = useQuery(
        ["currentStockCheckQuery", productCount],
        async () => {
            const arr = Array.from([cartItem?.productId]);
            let str = "productIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.get(`/product/stock?${str}`)
        },
        {
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const modifyCartItemCountMutation = useMutation(
        async (modifyCartItemData) => await instance.put(`/user/${cartItem.cartId}/count`, modifyCartItemData),
        {
            onSuccess: () => queryClient.invalidateQueries('cartItemListQuery'),
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

    console.log(checkItems);

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
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
        const count = e.target.value;
        const stock = currentStockCheck?.data?.data?.currentStocks[0];
        if(count === "") {
            setProductCount(count);
        }
        else if((stock?.currentStock >= parseInt(count) && stock?.outOfStock === 1)){
            setProductCount(parseInt(count));
        } else {
            const previousCount = productCount;
            console.log(previousCount); // 원래 값 저장
            setProductCount(e.target.value);
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

    // const timeUpdateCart = () => {
    //     const modifyCartItemData = {
    //         cartId: cartItem.cartId,
    //         userId: userInfo?.data?.id,
    //         productCount
    //     }
    //     const timer = setTimeout(() => {
    //         modifyCartItemCountMutation.mutateAsync(modifyCartItemData);
    //     }, 1000); // 1초 후에 요청 보내기

    // };

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
                <img src={IMAGE_ADDRESS + cartItem.imgName} />
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