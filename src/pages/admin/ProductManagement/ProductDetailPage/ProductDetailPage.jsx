/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";
import { useState } from "react";
import { useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";

function ProductDetailPage(props) {

    const productId = useParams();
    const navigate = useNavigate();
    
    const [ productData, setProductData ] = useState({});
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ modify, setModify ] = useState(false);

    const productDetail = useQuery(
        ["productDetailQuery"],
        async () => await instance.get(`/admin/product/${productId.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success.data);
                setProductData(success.data);
            },
            onError: error => {
                console.log(error.response);
            }
        }
    );

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
            <ProductImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} isModify={modify}/>
            <ProductEdit productData={productData} setProductData={setProductData} disabled={!modify} />
        </div>
    );
}

export default ProductDetailPage;