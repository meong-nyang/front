import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';

function UserProductDetailPage(props) {
    const navigate = useNavigate();
    const param = useParams();
    const queryClient = useQueryClient();

    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);

    const [ productCount, setProductCount ] = useState(1);

    const [ productDetailData, setProductDetailData ] = useState({
        id: "",
        productName: "",
        petGroupName: "",
        categoryName: "",
        productDetail: "",
        productPrice: "",
        productPriceDiscount: "",
        imgName: "",
        imgNames: []

    });


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
                    imgName: response?.data.imgNames[0],
                    imgNames: response?.data.imgNames
                }))
            },
            onError: error => console.log(error)
        }
    );

    const addProductMutation = useMutation(
        async (addProductData) => await instance.post("/user/cart", addProductData),
        {
            onSuccess: response => console.log(response),
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

    const hanelSubImgOnClick = (imgName) => {
        setProductDetailData(product => ({
            ...product,
            imgName
        }))
    }

    const handlePlusOnClick = () => {
        setProductCount(count => parseInt(count) + 1);
    };

    const handleMinusOnClick = () => {
        setProductCount(count => {
            // 1 미만으로 내려가지 않도록 설정
            if (count > 1) {
                return parseInt(count) - 1;
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
        return parseInt(price) * parseInt(productCount);
    };

    const handleAddCartOnClick = () => {
        const addProductData = {
            userId: 2,
            productId: productDetailData.id,
            productCount
        }
        addProductMutation.mutateAsync(addProductData);

        Swal.fire({
            icon:"success",
            title: "장바구니에 담겼습니다",
            text: "장바구니로 이동하시겠습니까?",
            height: "500px",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "이동",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/user/cart?page=1")
            }
        }
        );
    };

    const handleOrderOnClick = () => {
        Swal.fire({
            text: `${productDetailData.productName} ${productCount}개를 구매하시겠습니까?`,
            icon: "success",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "취소",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "구매",
        }).then((result) => {
            if (result.isConfirmed) {
                setOrderProductList([{
                    productId: param.productId,
                    productName: productDetailData.productName,
                    productCount: productCount,
                    productPrice: productDetailData.productPrice,
                    productTotal: parseInt(productCount) * parseInt(productDetailData.productPrice)
                }]);
                navigate("/user/order")
            }
        }
        );
    }

    return (
        <UserMainLayout>
            <div css={s.layout}>
                <div css={s.imgLayout}>
                    <img src={"http://localhost:8080/images/"  + productDetailData.imgName} alt="" />
                    <div css={s.subImgLayout}>
                    {
                        productDetailData?.imgNames.map(img =>
                                <img src={"http://localhost:8080/images/" + img} 
                                    key={img} onClick={() => hanelSubImgOnClick(img)}/>
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
        </UserMainLayout>
    );
}

export default UserProductDetailPage;