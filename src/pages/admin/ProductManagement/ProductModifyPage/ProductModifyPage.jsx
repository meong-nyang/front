/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import ProductEdit from "../../../../components/admin/ProductEdit/ProductEdit";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { v4 as uuidv4 } from 'uuid';

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
        expectedStock: 0
    }

    const params = useParams();
    const navigate = useNavigate();
    
    const [ productData, setProductData ] = useState(emptyProductData);
    const [ imgName, setImgName ] = useState([]);
    const [ originalImgName, setOriginalImgName ] = useState(new Set());
    const [ productDetailImgName, setProductDetailImgName ] = useState([]);
    const [ originalDetailImgName, setOriginalDetailImgName ] = useState();

    useEffect(() => {
        console.log(productDetailImgName);
    }, [productDetailImgName]);

    const productModify = useQuery(
        ["productModifyQuery"],
        async () => await instance.get(`/admin/product/${params.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: async (success) => {
                console.log(success.data);
                const tempImgName = success.data.imgUrls.map(data => data.imgName);
                const tempDetailImgName = success.data.productDetailImgUrls.map(data => data.imgName);
                setImgName(tempImgName);
                setOriginalImgName(new Set(tempImgName));
                setProductData(success.data);
                setProductDetailImgName(tempDetailImgName);
                setOriginalDetailImgName(tempDetailImgName);
            },
            onError: error => {
                console.log(error.response);
            }
        }
    );

    const findChangedImgs = (ImgList, originalImgList) => {
        const changeData = {
            deletedImgName: [],
            addedImgFiles: []
        }
        const temp = new Set(originalImgList);
        for (let source of ImgList) {
            if (source instanceof Blob) {
                changeData.addedImgFiles.push(source);
            } else {
                temp.delete(source);
            }
        }
        changeData.deletedImgName = Array.from(temp);
        return changeData;
    }

    const formData = () => {
        const formData = new FormData();
        const productEntries = Object.entries(productData);
        const imgs = findChangedImgs(imgName, originalImgName);
        const detailImgs = findChangedImgs(productDetailImgName, originalDetailImgName);
        for (let i of productEntries) {
            formData.append(i[0], i[1]);
        }
        for (let i of imgs.addedImgFiles) {
            formData.append('productImage', i, uuidv4() + "_" + i.name);
        }
        for (let i of imgs.deletedImgName) {
            formData.append('deleteImgList', i);
        }
        for (let i of detailImgs.addedImgFiles) {
            formData.append('productDetailImage', i, uuidv4() + "_" + i.name);
        }
        for (let i of detailImgs.deletedImgName) {
            formData.append('deleteProductDetailImgList', i);
        }
        return formData;
    }

    const productModifyMutation = useMutation(
        async () => await instance.put(`/admin/product/${productData.id}`, formData(), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    );

    const handleModifyButtonOnClick = () => {
        productModifyMutation.mutateAsync()
            .then(success => {
                alert("저장되었습니다.");
                navigate(`/admin/product/detail/${params.id}`);
            })
            .catch(error => {
                alert("수정에 실패했습니다.");
                console.log(error.response);
            });
    }

    return (
        <div css={s.layout}>
            <div css={s.head}>
                <span>상품 이미지</span>
                <div css={s.buttons}>
                    {
                        <>
                            <button onClick={handleModifyButtonOnClick}>저장</button>
                            <button onClick={() => navigate(`/admin/product/detail/${params.id}`)}>취소</button>
                        </>
                    }
                </div>
            </div>
            {
                productModify.isSuccess && productData &&
                <>
                    <ProductImages imgSource={imgName} setImgSource={setImgName} isModify={true} />
                    <ProductEdit detailImg={productDetailImgName} setDetailImg={setProductDetailImgName} productData={productData} setProductData={setProductData} disabled={false} />
                </>
            }
        </div>
    );
}

export default ProductModifyPage;