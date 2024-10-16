/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { FiExternalLink } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { currentLocationAtom } from "../../../../atoms/currentLocationAtom";
import { useNavigate } from "react-router-dom";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";

function ProductRegisterPage() {

    const setCurrentLocation = useSetRecoilState(currentLocationAtom);
    setCurrentLocation({
        selectedMenuId: 2,
        currentLocation: "상품관리 > 상품등록"
    });

    const emptyProductData = {
        productName: "",
        petGroupId: "",
        categoryId: "",
        productPrice: "",
        productPriceDiscount: "",
        productDetail: "",
        productBrand: "",
        productModel: "",
        productMemo: "",
        recommendation: "no",
        currentStock: "",
        expectedStock: ""
    }

    const [ productData, setProductData ] = useState(emptyProductData);
    const [ selectedFiles, setSelectedFiles ] = useState([]);

    const navigate = useNavigate();

    const formData = () => {
        const formData = new FormData();
        formData.append("productName", productData.productName)
        formData.append("petGroupId", productData.petGroupId);
        formData.append("productPrice", productData.productPrice);
        formData.append("productPriceDiscount", productData.productPriceDiscount);
        formData.append("productDetail", productData.productDetail);
        formData.append("productBrand", productData.productBrand);
        formData.append("productModel", productData.productModel);
        formData.append("productMemo", productData.productMemo);
        formData.append("recommendation", productData.recommendation);
        formData.append("currentStock", productData.currentStock);
        formData.append("expectedStock", productData.expectedStock);
        for (let i of selectedFiles) {
            formData.append('productImage', i);
        }
        return formData;
    }

    const registerProductMutation = useMutation(
        async () => await instance.post("/admin/product", formData(), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        {
            onSuccess: response => {
                console.log("등록 성공");
                console.log(response);
            },
            onError: error => {
                console.log("등록 실패");
                console.log(error);
            }
        }
    );
    
    const handleRegisterButtonOnClick = () => {
        registerProductMutation.mutateAsync();
    }

    const handleRecommendOnChange = (e) => {
        setProductData(data => ({
            ...data,
            recommendation: e.target.id
        }));
    }

    return (
        <>
            <div css={s.layout}>
                <ProductImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                <div css={s.buttons}>
                    <span>필수 정보</span>
                    <button onClick={() => navigate("/admin/product/list")}>취소</button>
                    <button onClick={handleRegisterButtonOnClick}>등록</button>
                </div>
                <div css={s.mustData}>
                    <table>
                        <tr>
                            <th>상품명</th>
                            <td colSpan="7"></td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>{"강아지 > 사료"}</td>
                            <th>단가</th>
                            <td></td>
                            <th>추천상품</th>
                            <td>
                                <div css={s.recommendBox}>
                                    <div>
                                        <input type="radio" name="recommend" id="yes" 
                                            checked={productData.recommendation === "yes"}
                                            onChange={handleRecommendOnChange} />
                                        <label htmlFor="yes"></label> 
                                        <label htmlFor="yes">설정</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="recommend" id="no"
                                            checked={productData.recommendation === "no"}
                                            onChange={handleRecommendOnChange} />
                                        <label htmlFor="no"></label>
                                        <label htmlFor="no">미설정</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div css={s.optionalData}>
                    <span>선택 정보</span>
                    <table>
                        <tr>
                            <th>브랜드</th>
                            <td></td>
                            <th>모델명</th>
                            <td></td>
                            <th>할인금액</th>
                            <td></td>
                            <th>판매가격</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>메모</th>
                            <td colSpan="7"></td>
                        </tr>
                    </table>
                </div>
                <div css={s.stockManagement}>
                    <span>재고 관리</span>
                    <table>
                        <tr>
                            <th>현재재고</th>
                            <td></td>
                            <th>가재고</th>
                            <td></td>
                            <th>입고 예정 일자</th>
                            <td></td>
                            <th>입고 수량</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>재고 알림 신청</th>
                            <td></td>
                            <th>알림 수량</th>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div css={s.productDetail}>
                    <span>상세정보 미리보기 <FiExternalLink /></span>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductRegisterPage;