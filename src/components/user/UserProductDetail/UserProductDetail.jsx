import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function UserProductDetail({ productInfo }) {
    const navigate = useNavigate();

    const handleProductDetailOnClick = () => {
        navigate(`/product/detail/${productInfo.productId}`)
    };

    const handleAddCartOnClick = () => {
        Swal.fire({
            title: "장바구니에 담겼습니다",
            text: "장바구니로 이동하시겠습니까?",
            icon: "success",
            width: "600px",
            heigth: "400px",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "이동",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/user/cart")
            }
        }

        );
    };

    return (
        <div css={s.layout}>
            <div onClick={handleProductDetailOnClick}> 
                <div css={s.imgLayout}>
                    <img src={"http://localhost:8080/images/" + productInfo.imgNames[0]} alt="" />
                </div>
                <div css={s.contentLayout}>
                    <p>{productInfo.productName}</p>
                    <p>{productInfo.productDetail}</p>
                    <p>{productInfo.productPrice}</p>
                </div>
            </div>
            <button css={s.addCartButton} onClick={handleAddCartOnClick}>Add to Cart</button>
        </div>
    );
}

export default UserProductDetail;