/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { useNavigate } from "react-router-dom";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";
import { v4 as uuidv4 } from 'uuid';
import { MENU_DATAS } from "../../../../constants/options";

function ProductRegisterPage() {

    const emptyProductData = {
        productName: "",
        petGroupId: 1,
        categoryId: 1,
        productPrice: "",
        productPriceDiscount: 0,
        productDetail: "",
        productBrand: "",
        productModel: "",
        productMemo: "",
        recommendation: "1",
        currentStock: 0,
        expectedStock: 0,
        minAlertQuantity: 0,
        alertSetting: "1"
    }

    const [ productData, setProductData ] = useState(emptyProductData);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ detailImg, setDetailImg ] = useState([]);

    const navigate = useNavigate();

    const formData = () => {
        const formData = new FormData();
        const productEntries = Object.entries(productData);
        for (let i of productEntries) {
            formData.append(i[0], i[1]);
        }
        for (let i of selectedFiles) {
            formData.append('productImage', i, uuidv4() + "_" + i.name);
        }
        for (let i of detailImg) {
            formData.append('productDetailImg', i, uuidv4() + "_" + i.name);
        }
        return formData;
    }

    const registerProductMutation = useMutation(
        async () => await instance.post("/admin/product", formData(), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    );
    
    const handleRegisterButtonOnClick = () => {
        if (!productData.productName || !productData.productPrice) {
            alert("필수정보를 입력하세요");
            return;
        }

        registerProductMutation.mutateAsync()
        .then(success => {
            alert("등록되었습니다.");
            navigate(MENU_DATAS[1].address);
        }).catch(error => {
            alert("등록에 실패하였습니다.");
            console.log(error.response);
        });
    }

    return (
        <div css={s.layout}>
            <div css={s.head}>
                <span>상품 이미지</span>
                <div css={s.buttons}>
                    <button onClick={handleRegisterButtonOnClick}>등록</button>
                </div>
            </div>
            <ProductImages imgSource={selectedFiles} setImgSource={setSelectedFiles} isModify={true}/>
            <ProductEdit
                detailImg={detailImg}
                setDetailImg={setDetailImg}
                productData={productData}
                setProductData={setProductData}
                disabled={false} />
        </div>
    );
}

export default ProductRegisterPage;