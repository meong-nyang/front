import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IMAGE_ADDRESS, instance } from '../../../apis/util/instance';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';
import { alwaysNumber, convertToCommaValue, onlyNumber } from '../../../utils/changeStringFormat';
import UserScrollLayout from '../../../components/user/UserScrollLayout/UserScrollLayout';

function UserProductDetailPage(props) {
    const navigate = useNavigate();
    const param = useParams();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const [orderProductList, setOrderProductList] = useRecoilState(orderProuctListAtom);
    const [productCount, setProductCount] = useState(1);
    const [ tabSelect, setTabSelect ] = useState(1);
    const [productDetailData, setProductDetailData] = useState({
        id: "",
        productName: "",
        petGroupName: "",
        categoryName: "",
        productDetail: "",
        productPrice: "",
        productPriceDiscount: "",
        onSale: "",
        currentStock: "",
        imgName: "",
        imgNames: [],
        detailImgUrls: []

    });

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
                    currentStock: response?.data.currentStock,
                    onSale: response?.data.onSale,
                    imgName: response?.data.imgNames[0],
                    imgNames: response?.data.imgNames,
                    detailImgUrls: response?.data.detailImgUrls
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
        let {value} = e.target;
        value = onlyNumber(alwaysNumber(value));
        // 0 이하의 값이 입력되지 않도록 설정
        setProductCount(value);

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
        setProductCount(count => {
            if(count === "") {
                return 1;
            }
            return parseInt(count) + 1;
        });
    };

    const handleMinusOnClick = () => {
        setProductCount(count => {
            if (count > 1) {
                return parseInt(count) - 1;
            }
            return count;
        });
    };

    const handleTabOnClick = (tab) => {
        setTabSelect(tab);
    };

    const totalPrice = (price) => {
        return parseInt(price) * parseInt(productCount);
    };

    const validUserCheck = () => {
        if(userInfo == undefined) {
            Swal.fire({
                icon: "error",
                text: "로그인 후 이용가능합니다.",
                showCancelButton: true,
                cancelButtonText: "닫기",
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "로그인하기",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/user/signin")
                }
            });
            return false;
        }
        return true;
    }

    const currentCheck = () => {
        if(productCount > productDetailData?.currentStock){
            Swal.fire({
                icon: "error",
                text: "재고를 넘은 수량은 선택할 수 없습니다.",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "확인",
            });
            return false;
        }
        return true;
    }

    const productCountCheck = () => {
        if (productCount === 0 || productCount === "") {
            Swal.fire({
                text: `최소 구매개수는 1개입니다.`,
                icon: "error",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "확인",
            });
            return false;
        }
        return true;
    }

    const handleAddCartOnClick = () => {
        if(!validUserCheck()) {
            return;
        }
        if(!currentCheck()) {
            return;
        }
        if(!productCountCheck()) {
           return;
        }
        const addProductData = {
            userId: userInfo?.data?.id,
            productId: productDetailData.id,
            productCount
        }
        addProductMutation.mutateAsync(addProductData).catch(() => {});

        Swal.fire({
            icon: "success",
            html: "<p>장바구니에 담겼습니다.</p> <p>장바구니로 이동하시겠습니까?</p>",
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
        if(!validUserCheck()) {
            return;
        }
        if(!currentCheck()) {
            return;
        }
        if(!productCountCheck()) {
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
                    <div css={s.layout}>
                        <div css={s.imgLayout}>
                            <img src={IMAGE_ADDRESS + productDetailData.imgName} alt="" />
                            <div css={s.subImgLayout}>
                                {
                                    productDetailData?.imgNames?.length > 1 &&
                                    productDetailData?.imgNames.map(img =>
                                        <img src={IMAGE_ADDRESS + img}
                                            key={img} onClick={() => hanelSubImgOnClick(img)} />
                                    )
                                }
                            </div>
                        </div>
                        <div css={s.detailLayout}>
                            <p>{productDetailData.petGroupName + ">" + productDetailData.categoryName}</p>
                            <p>{productDetailData.productName}</p>
                            <div css={s.priceLayout}>
                                <div>
                                    {
                                        <p>{productDetailData.productPriceDiscount !== "0" 
                                            ? convertToCommaValue(productDetailData.productPriceDiscount) + "원 할인"
                                            :""}</p>
                                    }
                                    <div>
                                        {
                                            productDetailData.productPriceDiscount !== "0" &&
                                            <p css={s.discountStyle}>{convertToCommaValue(productDetailData.productPrice)}원</p>
                                        }
                                        <p>{convertToCommaValue(productDetailData.productPrice - productDetailData.productPriceDiscount)}원</p>
                                    </div>
                                </div>
                                    <p><TbTruckDelivery />배송비 : 3,000원</p>
                            </div>
                            <p>{productDetailData.productDetail}</p>
                            <div css={s.optionLayout}>
                            <p>선택</p>
                            <div css={s.countLayout}>
                            
                                <p>{productDetailData.productName}</p>
                                <div>
                                    <AiFillMinusCircle onClick={handleMinusOnClick} />
                                    <input type='text' value={productCount} onChange={handleInputOnchange} />
                                    <AiFillPlusCircle onClick={handlePlusOnClick} />
                                </div>
                                <p>{convertToCommaValue(totalPrice(productDetailData.productPrice - productDetailData.productPriceDiscount))}원</p>
                            </div>
                            </div>
                            <div css={s.totalLayout}>
                                <p>총 상품금액</p>
                                <p>{convertToCommaValue(totalPrice(productDetailData.productPrice - productDetailData.productPriceDiscount))}원</p>
                            </div>
                            <div css={s.buyLayout}>
                                <button onClick={handleAddCartOnClick}>장바구니</button>
                                <button onClick={handleOrderOnClick}>구매하기</button>
                            </div>
                        </div>
                    </div>
                    <div css={s.detailTabLayout(tabSelect)}>
                        <p onClick={() => handleTabOnClick(1)}>상세정보</p>
                        <p onClick={() => handleTabOnClick(2)}>리뷰</p>
                        <p onClick={() => handleTabOnClick(3)}>문의</p>
                    </div>
                    {
                        tabSelect === 1 && 
                        <div css={s.detailImgLayout}>
                        {
                            productDetailData.detailImgUrls.map(({imgName}) => 
                                <img src={IMAGE_ADDRESS + imgName} />
                            )
                        }
                        </div>
                    }
                </div>
            </UserScrollLayout>
        </UserMainLayout>
    );
}

export default UserProductDetailPage;