/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { useSetRecoilState } from "recoil";
import { currentLocationAtom } from "../../../../atoms/currentLocationAtom";
import { useNavigate } from "react-router-dom";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";

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
        const productEntries = Object.entries(productData);
        for (let i of productEntries) {
            formData.append(i[0], i[1]);
        }
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

    return (
        <div css={s.layout}>
            <ProductImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            <div css={s.buttons}>
                <button onClick={() => navigate("/admin/product/list")}>취소</button>
                <button onClick={handleRegisterButtonOnClick}>등록</button>
            </div>
            <ProductEdit productData={productData} setProductData={setProductData}/>
        </div>
    );
}

export default ProductRegisterPage;