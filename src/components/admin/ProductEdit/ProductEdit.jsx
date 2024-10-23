/** @jsxImportSource @emotion/react */
import { useState } from "react";
import CategoryModal from "../CategoryModal/CategoryModal";
import * as s from "./style";
import { FiExternalLink } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";

function ProductEdit({ productData, setProductData, disabled }) {

    const emptySelectedCategoryName = {
        petGroupId: "강아지",
        categoryId: "사료"
    }

    const [isOpen, setOpen] = useState(false);
    const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
    const [selectedCategoryName, setSelectedCategoryName] = useState(emptySelectedCategoryName);

    const getCategoryList = useQuery(
        ["categoryListQuery"],
        async () => await instance.get("/admin/categorys"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {},
            onError: error => console.log(error.response)
        }
    );

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
                            <td colSpan="5">
                                <input type="text" name="productName"
                                    disabled={disabled}
                                    value={productData.productName}
                                    onChange={handleProductDataOnChange} />
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
                                <input type="number" name="productPrice"
                                    disabled={disabled}
                                    onFocus={(e) => e.target.select()}
                                    value={productData.productPrice}
                                    onChange={handleProductDataOnChange}
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
                                <input type="number" name="productPriceDiscount"
                                    disabled={disabled}
                                    onFocus={(e) => e.target.select()}
                                    value={productData.productPriceDiscount}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                            <th>판매가격</th>
                            <td>
                                <input type="text"
                                    disabled={true}
                                    value={productData.productPrice - productData.productPriceDiscount} />
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
            <div css={s.stockManagement}>
                <span>재고 관리</span>
                <table>
                    <tbody>
                        <tr>
                            <th>현재재고</th>
                            <td>
                                <input type="number" name="currentStock"
                                    disabled={disabled}
                                    onFocus={(e) => e.target.select()}
                                    value={productData.currentStock}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                            <th>가재고</th>
                            <td>
                                <input type="number" name="expectedStock"
                                    disabled={disabled}
                                    onFocus={(e) => e.target.select()}
                                    value={productData.expectedStock}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                            <th>입고 예정 일자</th>
                            <td>
                                <input type="date" name="arrivalDate"
                                    disabled={disabled}
                                    value={productData.arrivalDate}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                            <th>입고 수량</th>
                            <td>
                                <input type="number" name="arrivalQuantity"
                                    disabled={disabled}
                                    onFocus={(e) => e.target.select()}
                                    value={productData.arrivalQuantity}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>재고 알림 신청</th>
                            <td>
                                <div css={s.recommendBox}>
                                    <div>
                                        <input type="radio" name="alertSetting" id="20"
                                            disabled={disabled}
                                            checked={productData.alertSetting.toString() === "2"}
                                            onChange={(e) => handleStockAlertOnChange(e, "2")} />
                                        <label htmlFor="20"></label>
                                        <label htmlFor="20">설정</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="alertSetting" id="10"
                                            disabled={disabled}
                                            checked={productData.alertSetting.toString() === "1"}
                                            onChange={(e) => handleStockAlertOnChange(e, "1")} />
                                        <label htmlFor="10"></label>
                                        <label htmlFor="10">미설정</label>
                                    </div>
                                </div>
                            </td>
                            <th>알림 수량</th>
                            <td>
                                <input type="number" name="minAlertQuantity"
                                    disabled={disabled}
                                    onFocus={(e) => e.target.select()}
                                    value={productData.minAlertQuantity}
                                    onChange={handleProductDataOnChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div css={s.productDetail}>
                {
                    productDetailModalOpen &&
                    <ProductDetailModal setProductDetailModalOpen={setProductDetailModalOpen} />
                }
                <button onClick={() => setProductDetailModalOpen(true)}>상세정보 미리보기 <FiExternalLink /></button>
                <div>

                </div>
            </div>
        </div>
    );
}

export default ProductEdit;