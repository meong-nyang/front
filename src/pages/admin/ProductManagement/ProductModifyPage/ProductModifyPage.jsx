/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";
import { useState } from "react";

function ProductModifyPage(props) {
    const emptyProductData = {
        productName: "맛있다",
        petGroupId: 1,
        categoryId: 1,
        productPrice: 0,
        productPriceDiscount: 0,
        productDetail: "asdf",
        productBrand: "asdf",
        productModel: "asdf",
        productMemo: "asdf",
        recommendation: 0,
        currentStock: 0,
        expectedStock: 0
    }

    const productId = useParams();
    
    const navigate = useNavigate();
    
    const [ productData, setProductData ] = useState(emptyProductData);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ modify, setModify ] = useState(false);

    return (
        <div css={s.layout}>
            <div css={s.buttons}>
                {
                    modify
                    ?
                    <>
                        <button onClick={() => setModify(false)}>취소</button>
                        <button>저장</button>
                    </>
                    :
                    <>
                        <button onClick={() => setModify(true)}>수정</button>
                        <button>삭제</button>
                    </>
                }
            </div>
            <ProductImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
            <ProductEdit productData={productData} setProductData={setProductData} disabled={!modify} />
        </div>
    );
}

export default ProductModifyPage;