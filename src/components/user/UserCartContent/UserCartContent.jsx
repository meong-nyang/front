import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { RxCross2 } from "react-icons/rx";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";

function UserCartContent({ cartItem, checkItems, setCheckItems, cartItemDeleteMutation }) {
    const [ productCount, setProductCount ] = useState(1);

    const handleCartItemDeleteOnClick = () => {
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
                cartItemDeleteMutation.mutateAsync([cartItem?.cartId]);
            }
        });
        
    };

    const handelItemCheck = (e) => {
        if(e.target.checked) {
            setCheckItems(item => [...item, cartItem?.cartId]);
        } else {
            setCheckItems(checkItems.filter(id => id != cartItem?.cartId))
        }
    };

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };

    const handlePlusOnClick = () => {
        setProductCount(count => count + 1);
    };

    const handleMinusOnClick = () => {
        setProductCount(count => {
            if (count > 1) {
                return count - 1;
            }
            return count;
        });
    };

    return (
        <div css={s.contentLayout}>
            <div css={s.checkboxStyle}>
                <input type="checkbox" id={cartItem?.cartId} 
                    onChange={handelItemCheck}
                    checked={checkItems.includes(cartItem?.cartId) ? true : false}/>
                <label htmlFor={cartItem?.cartId}>✔</label>
            </div>
            <div css={s.productLayout}>
                <img src="" />
                <div>
                    <p>{cartItem?.productName}</p>
                    <p>[옵션]</p>
                </div>
            </div>
            <div css={s.countLayout}>
                <AiFillMinusCircle onClick={handleMinusOnClick} />
                <p>{cartItem?.productCount}</p>
                <AiFillPlusCircle onClick={handlePlusOnClick} />
            </div>
            <p>{priceFormet(cartItem?.productCount * cartItem?.productPrice)}원</p>
            <div>
                <RxCross2 onClick={handleCartItemDeleteOnClick}/>
            </div>
        </div>
    );
}

export default UserCartContent;