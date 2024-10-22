/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { useNavigate } from "react-router-dom";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";
import { v4 as uuidv4 } from 'uuid';

function ProductRegisterPage() {

    const emptyProductData = {
        productName: "",
        petGroupId: 1,
        categoryId: 1,
        productPrice: 0,
        productPriceDiscount: 0,
        productDetail: "",
        productBrand: "",
        productModel: "",
        productMemo: "",
        recommendation: "1",
        currentStock: 0,
        expectedStock: 0,
        arrivalDate: "",
        arrivalQuantity: 0,
        minAlertQuantity: 0,
        alertSetting: "1"
    }

    const [ productData, setProductData ] = useState(emptyProductData);
    const [ selectedFiles, setSelectedFiles ] = useState([]);

    const navigate = useNavigate();

    // useState(() => {
    //     const now = new Date();
    //     const year = now.getFullYear();
    //     const month = now.getMonth() + 1 < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1;
    //     const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    //     const date = year + "-" + month + "-" + day
    //     setProductData(data => ({
    //         ...data,
    //         arrivalDate: date
    //     }));
    // }, []);

    const formData = () => {
        const formData = new FormData();
        const productEntries = Object.entries(productData);
        for (let i of productEntries) {
            formData.append(i[0], i[1]);
        }
        for (let i of selectedFiles) {
            formData.append('productImage', i, uuidv4() + "_" + i.name);
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
                alert("상품등록 성공");
            },
            onError: error => {
                console.log("등록 실패");
                console.log(error);
            }
        }
    );
    
    const handleRegisterButtonOnClick = () => {
        // console.log(selectedFiles[0]);
        // console.log(uuidv4());
        registerProductMutation.mutateAsync();
    }

    return (
        <div css={s.layout}>
            <div css={s.buttons}>
                <button onClick={handleRegisterButtonOnClick}>등록</button>
            </div>
            <ProductImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            <ProductEdit productData={productData} setProductData={setProductData} disabled={false}/>
        </div>
    );
}

export default ProductRegisterPage;