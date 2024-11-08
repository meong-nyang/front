import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { IoIosPricetags } from "react-icons/io";
import { IoPricetagsOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';
import UserScrollLayout from '../../../components/user/UserScrollLayout/UserScrollLayout';

function UserProductDetailPage(props) {
    const navigate = useNavigate();
    const param = useParams();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");

    const [orderProductList, setOrderProductList] = useRecoilState(orderProuctListAtom);

    const [productCount, setProductCount] = useState(1);

    const [productDetailData, setProductDetailData] = useState({
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

    console.log(productDetailData);
    const productDetail = useQuery(
        ["userProductDetailQuery"],
        async () => await instance.get(`/product/${param.productId}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
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

    const handleInputOnchange = (e) => {
        const { value } = e.target;
        // 0 이하의 값이 입력되지 않도록 설정
        if (/^(?!0)[1-9][0-9]*|^\s*$/.test(value)) {
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
            userId: userInfo?.data?.id,
            productId: productDetailData.id,
            productCount
        }
        addProductMutation.mutateAsync(addProductData);

        Swal.fire({
            icon: "success",
            html: "<p>장바구니에 담겼습니다.</p> <p>장바구니로 이동하시겠습니까?</p>",
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
        if (productCount === 0 || productCount === "") {
            Swal.fire({
                text: `최소 구매개수는 1개입니다.`,
                icon: "error",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "확인",
            });
            return;
        }
        Swal.fire({
            text: `${productDetailData.productName} ${productCount}개를 구매하시겠습니까?`,
            icon: "question",
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
            <UserScrollLayout>
                <div css={s.mainLayout}>
                    <div css={s.categoryLayout}>
                        <p>{productDetailData.petGroupName + ">" + productDetailData.categoryName}</p>
                    </div>
                    <div css={s.layout}>
                        <div css={s.imgLayout}>
                            <img src={"http://localhost:8080/images/" + productDetailData.imgName} alt="" />
                            <div css={s.subImgLayout}>
                                {
                                    productDetailData?.imgNames.map(img =>
                                        <img src={"http://localhost:8080/images/" + img}
                                            key={img} onClick={() => hanelSubImgOnClick(img)} />
                                    )
                                }
                            </div>
                        </div>
                        <div css={s.detailLayout}>
                            <p>{productDetailData.productName}</p>
                            <div css={s.priceLayout}>
                                <div>
                                    <p>7,000원 할인</p>
                                    <p>{priceFormet(productDetailData.productPrice)}원</p>
                                </div>
                                    <p><TbTruckDelivery />배송비 : 3,000원</p>
                            </div>
                            <p>{productDetailData.productDetail}</p>
                                <p>선택</p>
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
                </div>
            </UserScrollLayout>
        </UserMainLayout>
    );
}

export default UserProductDetailPage;