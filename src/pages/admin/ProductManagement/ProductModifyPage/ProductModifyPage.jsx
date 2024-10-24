/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { instance } from "../../../../apis/util/instance";

function ProductModifyPage(props) {

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

    const params = useParams();
    const navigate = useNavigate();
    
    const [ productData, setProductData ] = useState();
    const [ blobs, setBlobs ] = useState([]);
    const [ modifyBeforeBlobs, setModifyBeforeBlobs ] = useState([]);
    const [ modify, setModify ] = useState(true);

    const productModify = useQuery(
        ["productModifyQuery"],
        async () => await instance.get(`/admin/product/${params.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: async (success) => {
                setBlobs([]);
                for (let i of success.data.imgUrls) {
                    await addImgBlobFromUrl("/images/" + i.imgName);
                }
                setProductData(success.data);
            },
            onError: error => {
                console.log(error.response);
            }
        }
    );

    const addImgBlobFromUrl = async (url) => {
        try {
            const response = await instance.get(url, { responseType: "blob" });
            setBlobs(blob => [...blob, response.data]);
        } catch(e) {
            console.log("이미지를 불러오는 중 에러가 발생하였습니다");
            console.log(e.response);
        }
    }

    return (
        <div css={s.layout}>
            <div css={s.buttons}>
                {console.log(productData)}
                {
                    <>
                        <button>저장</button>
                        <button onClick={() => navigate(`/admin/product/detail/${params.id}`)}>취소</button>
                    </>
                }
            </div>
            {
                productModify.isSuccess && productData &&
                <>
                    <ProductImages blobs={blobs} setBlobs={setBlobs} isModify={modify} />
                    <ProductEdit productData={productData} setProductData={setProductData} disabled={!modify} />
                </>
            }
        </div>
    );
}

export default ProductModifyPage;