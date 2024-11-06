import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';

function UserProductDetail({ productInfo }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    console.log(productInfo);
    const handleProductDetailOnClick = () => {
        navigate(`/product/detail/${productInfo.productId}`)
    };

    const addProductMutation = useMutation(
        async (addProductData) => await instance.post("/user/cart", addProductData),
        {
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

    const handleAddCartOnClick = () => {
        const addProductData = {
            userId: userInfo?.data?.id,
            productId: productInfo.productId,
            productCount: 1
        };
        addProductMutation.mutateAsync(addProductData);
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

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };
    
    return (
        <div css={s.layout}>
            <div onClick={handleProductDetailOnClick}> 
                <div css={s.imgLayout}>
                    <img src={"http://localhost:8080/images/" + productInfo.imgName} alt="" />
                </div>
                <div css={s.contentLayout}>
                    <p>{productInfo.productName}</p>
                    <p>{productInfo.productDetail}</p>
                    <p>{priceFormet(productInfo.productPrice)}원</p>
                </div>
            </div>
            <button css={s.addCartButton} onClick={handleAddCartOnClick}>Add to Cart</button>
        </div>
    );
}

export default UserProductDetail;