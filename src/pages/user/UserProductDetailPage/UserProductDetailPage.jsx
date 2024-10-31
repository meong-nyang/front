import React, { useEffect, useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";

function UserProductDetailPage(props) {
    const navigate = useNavigate();
    const param = useParams();
    const queryClient = useQueryClient();
    // const userInfo = queryClient.getQueryData("");
    const [ productDetailData, setProductDetailData ] = useState({
        id: "",
        productName: "",
        petGroupName: "",
        categoryName: "",
        productDetail: "",
        productPrice: "",
        productPriceDiscount: "",
        imageNames: []

    });

    const [ productCount, setProductCount ] = useState(1);

    const productDetail = useQuery(
        ["userProductDetailQuery"],
        async () => await instance.get(`/product/${param.productId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response?.data);
                setProductDetailData(product => ({
                    ...product,
                    id: response?.data.id,
                    productName: response?.data.productName,
                    petGroupName: response?.data.petGroupName,
                    categoryName: response?.data.categoryName,
                    productDetail: response?.data.productDetail,
                    productPrice: response?.data.productPrice,
                    productPriceDiscount: response?.data.productPriceDiscount,
                    imageNames: response?.data.imgNames
                }))
            },
            onError: error => console.log(error)
        }
    );

    console.log(productDetailData);

    const handleInputOnchange = (e) => {
        const {value} = e.target;
        // 0 이하의 값이 입력되지 않도록 설정
        if(/^(?!0)[1-9][0-9]*|^\s*$/.test(value)) {
            setProductCount(value);
        }

        // const result = value.replace(/\D/, "");
        // console.log(result);
        // setProductCount(result);
        
    };

    const handlePlusOnClick = () => {
        setProductCount(count => count + 1);
    };

    const handleMinusOnClick = () => {
        setProductCount(count => {
            // 1 미만으로 내려가지 않도록 설정
            if (count > 1) {
                return count - 1;
            }
            return count; // 1 이하로는 내려가지 않음
        });
    };

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };

    const totalPrice = (price) => { 
        console.log(price);
        return parseInt(price) * parseInt(productCount);
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

    const handleOrderOnClick = () => {

    }

    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <div css={s.imgLayout}>
                    <img src={"http://localhost:8080/images/"  + productDetailData?.imageNames[0]} alt="" />
                    <div css={s.subImgLayout}>
                    {
                        productDetailData?.imageNames.map(img =>
                                <img src={"http://localhost:8080/images/" + img} />
                            )
                    }
                    </div> 
                </div>
                <div css={s.detailLayout}>
                    <p>{productDetailData.productName}</p>
                    <p>{productDetailData.productDetail}</p>
                    <p>{priceFormet(productDetailData.productPrice)}원</p>
                    <p>배송비 : 3,000원</p>
                    <div css={s.countLayout}>
                        <p>{productDetailData.productName}</p>
                        <div>
                            <AiFillMinusCircle onClick={handleMinusOnClick} />
                            <input type='text' value={productCount} onChange={handleInputOnchange} />
                            <AiFillPlusCircle onClick={handlePlusOnClick} />
                        </div>
                        <p>{priceFormet(totalPrice(productDetailData.productPrice))}원</p>
                    </div>
                    <div css={s.totalLayout}>
                        <p>총 상품금액</p>
                        <p>{priceFormet(totalPrice(productDetailData.productPrice))}원</p>
                    </div>
                    <div css={s.buyLayout}>
                        <button onClick={handleAddCartOnClick}>장바구니</button>
                        <button onClick={handleOrderOnClick}>구매하기</button>
                    </div>
                </div>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserProductDetailPage;