/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import CategoryModal from "../CategoryModal/CategoryModal";
import * as s from "./style";
import { IoMdArrowDropdown } from "react-icons/io";
import { useQuery, useQueryClient } from "react-query";
import { instance } from "../../../apis/util/instance";
import { convertToCommaValue, convertToNumericValue } from "../../../utils/changeStringFormat";
import ProductImages from "../ProductImages/ProductImages";

function ProductEdit({ productData, setProductData, detailImg, setDetailImg, disabled }) {

    const emptySelectedCategoryName = {
        petGroupId: "",
        categoryId: ""
    }
    
    const queryClient = useQueryClient();
    const categoryList = queryClient.getQueryData("categoryListQuery");

    const [isOpen, setOpen] = useState(false);
    const [selectedCategoryName, setSelectedCategoryName] = useState(emptySelectedCategoryName);

    useEffect(() => {
        console.log(productData.onSale);
    }, [productData]);

    const getCategoryList = useQuery(
        ["categoryListQuery"],
        async () => await instance.get("/product/categorys"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                setSelectedCategoryName({
                    petGroupId: success.data.petGroupList[0].categoryGroupName,
                    categoryId: success.data.categoryList[0].categoryName
                });
            },
            onError: error => console.log(error.response)
        }
    );

    useEffect(() => {
        setSelectedCategoryName({
            petGroupId: productData?.petGroup?.categoryGroupName || getCategoryList?.data?.data.petGroupList[0].categoryGroupName,
            categoryId: productData?.category?.categoryName || getCategoryList?.data?.data.categoryList[0].categoryName
        });
    }, [productData.category]);

    const handleProductNumberDataOnChange = (e) => {
        const value = convertToNumericValue(e.target.value.toString());
        if(e.target.name === "productPriceDiscount" && parseInt(value) > parseInt(productData.productPrice)) {
            alert("할인금액은 단가보다 높을 수 없습니다.");
            return;
        }
        if(e.target.name === "productPrice" && parseInt(value) < parseInt(productData.productPriceDiscount)) {
            alert("단가는 할인금액보다 낮을 수 없습니다.");
            return;
        }
        setProductData(data => {
            return ({
                ...data,
                [e.target.name]: value === "" ? "0" : value.replace(/^0+/, "")
            })
        });
    }

    const handleProductDataOnChange = (e) => {
        setProductData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const handleRecommendOnChange = (e) => {
        setProductData(data => ({
            ...data,
            recommendation: e.target.id
        }));
    }

    const handleonSaleOnChange = (value) => {
        setProductData(data => ({
            ...data,
            onSale: value
        }))
    }

    const handleStockAlertOnChange = (e, value) => {
        setProductData(data => ({
            ...data,
            alertSetting: value
        }));
    }

    const handleModalChangeOnClick = () => {
        setOpen(open => !open);
    }

    return (
        <div css={s.layout}>
            <div css={s.mustData}>
                <span>필수 정보</span>
                <table>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td colSpan="3">
                                <input type="text" name="productName"
                                    disabled={disabled}
                                    value={productData.productName}
                                    onChange={handleProductDataOnChange} />
                            </td>
                            <th>판매상태</th>
                                <td>
                                    <div css={s.recommendBox}>
                                        <div>
                                            <input type="radio" name="onSale" id="20" readOnly={true}
                                                checked={productData.onSale.toString() === "1"}
                                                onChange={() => handleonSaleOnChange("1")} />
                                            <label htmlFor="20"></label>
                                            <label htmlFor="20">판매</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="onSale" id="10" readOnly={true}
                                                checked={productData.onSale.toString() === "2"}
                                                onChange={() => handleonSaleOnChange("2")} />
                                            <label htmlFor="10"></label>
                                            <label htmlFor="10">미판매</label>
                                        </div>
                                    </div>
                                </td>
                        </tr>
                        <tr css={s.mustCategory}>
                            <th>카테고리</th>
                            <td css={s.modal}>
                                <div css={s.categorySelect}>
                                    <button type="button" onClick={handleModalChangeOnClick}>
                                        {selectedCategoryName.petGroupId + " > " + selectedCategoryName.categoryId}
                                    </button>
                                    <IoMdArrowDropdown />
                                </div>
                                {
                                    isOpen &&
                                    <CategoryModal setOpen={setOpen}
                                        productData={productData}
                                        setProductData={setProductData}
                                        setSelectedCategoryName={setSelectedCategoryName} />
                                }
                            </td>
                            <th>단가</th>
                            <td>
                                <input type="text" name="productPrice"
                                    disabled={disabled}
                                    value={convertToCommaValue(productData.productPrice)}
                                    onChange={handleProductNumberDataOnChange}
                                />
                            </td>
                            <th>추천상품</th>
                            <td>
                                <div css={s.recommendBox}>
                                    <div>
                                        <input type="radio" name="recommend" id="2"
                                            disabled={disabled}
                                            checked={productData.recommendation.toString() === "2"}
                                            onChange={handleRecommendOnChange} />
                                        <label htmlFor="2"></label>
                                        <label htmlFor="2">설정</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="recommend" id="1"
                                            disabled={disabled}
                                            checked={productData.recommendation.toString() === "1"}
                                            onChange={handleRecommendOnChange} />
                                        <label htmlFor="1"></label>
                                        <label htmlFor="1">미설정</label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div css={s.optionalData}>
                <span>선택 정보</span>
                <table>
                    <tbody>
                        <tr>
                            <th>브랜드</th>
                            <td>
                                <input type="text" name="productBrand"
                                    disabled={disabled}
                                    value={productData.productBrand}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                            <th>모델명</th>
                            <td>
                                <input type="text" name="productModel"
                                    disabled={disabled}
                                    value={productData.productModel}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                            <th>할인금액</th>
                            <td>
                                <input type="text" name="productPriceDiscount"
                                    disabled={disabled}
                                    value={convertToCommaValue(productData.productPriceDiscount)}
                                    onChange={handleProductNumberDataOnChange}
                                />
                            </td>
                            <th>판매가격</th>
                            <td>
                                <input type="text"
                                    disabled={true}
                                    value={convertToCommaValue(productData.productPrice - productData.productPriceDiscount)} />
                            </td>
                        </tr>
                        <tr>
                            <th>메모</th>
                            <td colSpan="7">
                                <input type="text" name="productMemo"
                                    disabled={disabled}
                                    value={productData.productMemo}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div css={s.productDetail}>
                <span>상품 설명</span>
                <textarea 
                    disabled={disabled}
                    name="productDetail"
                    value={productData.productDetail}
                    onChange={handleProductDataOnChange} />
                <span>상품 상세 이미지</span>
                <ProductImages imgSource={detailImg} setImgSource={setDetailImg} isModify={true} />
            </div>
        </div>
    );
}

export default ProductEdit;