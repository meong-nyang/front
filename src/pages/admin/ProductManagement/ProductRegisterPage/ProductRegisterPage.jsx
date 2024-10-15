/** @jsxImportSource @emotion/react */
import { useState } from "react";
import MainLayout from "../../../../components/admin/MainLayout/MainLayout";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../../apis/util/instance";

function ProductRegisterPage() {

    const emptyRegisterData = {
        petGroupId: "",
        categoryId: "",
        productPrice: "",
        productPriceDiscount: "",
        productDetail: "",
        productBrand: "",
        productModel: "",
        productMemo: "",
        recommendation: "",
        currentStock: "",
        expectedStock: "",
        productImage: ""
    }

    const [ registerData, setRegisterData ] = useState(emptyRegisterData);
    const [ selectedFiles, setSelectedFiles ] = useState([]);

    const imagesToFormData = () => {
        const formData = new FormData();
        for (let i of selectedFiles) {
            formData.append('productImage', i);
        }
        setRegisterData(data => ({
            ...data,
            productImage: formData
        }));
    }

    const toFormData = () => {
        const formData = new FormData();
        formData.append("petGroupId", registerData.petGroupId);
        formData.append("productPrice", registerData.productPrice);
        formData.append("productPriceDiscount", registerData.productPriceDiscount);
        formData.append("productDetail", registerData.productDetail);
        formData.append("productBrand", registerData.productBrand);
        formData.append("productModel", registerData.productModel);
        formData.append("productMemo", registerData.productMemo);
        formData.append("recommendation", registerData.recommendation);
        formData.append("currentStock", registerData.currentStock);
        formData.append("expectedStock", registerData.expectedStock);
        for (let i of selectedFiles) {
            formData.append('productImage', i);
        }
        return formData;
    }

    const registerProductMutation = useMutation(
        async () => await instance.post("/admin/product", toFormData(), {
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

    const handleFileOnChange = (e) => {
        setSelectedFiles(e.target.files);
    }

    const handleRegisterButtonOnClick = () => {
        // imagesToFormData();  // 이미지를 FormData로 변환
        registerProductMutation.mutateAsync();
    }

    return (
        <MainLayout location="상품관리 > 상품등록">
            <div css={s.layout}>
                <div css={s.images}>
                    <input type="file" multiple onChange={handleFileOnChange} />
                </div>
                <div css={s.buttons}>
                    <span>필수 정보</span>
                    <button onClick={() => {imagesToFormData(); console.log(registerData)}}>취소</button>
                    <button onClick={handleRegisterButtonOnClick}>등록</button>
                </div>
                <div css={s.mustData}>
                    <table>
                        <tr>
                            <th>상품명</th>
                            <td colSpan="7">강아지 사료</td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>{"강아지 > 사료"}</td>
                            <th>단가</th>
                            <td>10000</td>
                            <th>추천상품</th>
                            <td>
                                <div css={s.recommendBox}>
                                    <div>
                                        <input type="radio" name="recommend" id="yes" />
                                        <label htmlFor="yes"></label>
                                        <label htmlFor="yes">설정</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="recommend" id="no" />
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
            </div>
        </MainLayout>
    );
}

export default ProductRegisterPage;