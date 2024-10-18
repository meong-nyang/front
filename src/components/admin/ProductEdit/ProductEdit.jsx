/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FiExternalLink } from "react-icons/fi";


function ProductEdit({ productData, setProductData, disabled }) {

    const handleProductDataOnChange = (e) => {
        setProductData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
        console.log(productData);
    }

    const handleRecommendOnChange = (e) => {
        setProductData(data => ({
            ...data,
            recommendation: e.target.id
        }));
    }

    return (
        <div css={s.layout}>
            <div css={s.mustData}>
                <span>필수 정보</span>
                <table>
                    <tr>
                        <th>상품명</th>
                        <td colSpan="7">
                            <input type="text" name="productName"
                                disabled={disabled}
                                value={productData.productName} 
                                onChange={handleProductDataOnChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>카테고리</th>
                        <td>
                            <input type="text" name="productName"
                                disabled="false"
                                value={"강아지 > 먹이"} 
                                onChange={handleProductDataOnChange} />
                        </td>
                        <th>단가</th>
                        <td>
                            <input type="number" name="productPrice"
                                disabled={disabled}
                                value={productData.productPrice}
                                onChange={handleProductDataOnChange}
                            />
                        </td>
                        <th>추천상품</th>
                        <td>
                            <div css={s.recommendBox}>
                                <div>
                                    <input type="radio" name="recommend" id="yes" 
                                        disabled={disabled}
                                        checked={productData.recommendation === "yes"}
                                        onChange={handleRecommendOnChange} />
                                    <label htmlFor="yes"></label> 
                                    <label htmlFor="yes">설정</label>
                                </div>
                                <div>
                                    <input type="radio" name="recommend" id="no"
                                        disabled={disabled}
                                        checked={productData.recommendation === "no"}
                                        onChange={handleRecommendOnChange} />
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
                                value={productData.productPriceDiscount}
                                onChange={handleProductDataOnChange}
                            />
                        </td>
                        <th>판매가격</th>
                        <td>
                            <input type="text" 
                                value={productData.productPrice - productData.productPriceDiscount}/>
                        </td>
                    </tr>
                    <tr>
                        <th>메모</th>
                        <td colSpan="7"><input type="text" 
                            disabled={disabled} />
                        </td>
                    </tr>
                </table>
            </div>
            <div css={s.stockManagement}>
                <span>재고 관리</span>
                <table>
                    <tr>
                        <th>현재재고</th>
                        <td><input type="text" /></td>
                        <th>가재고</th>
                        <td><input type="text" /></td>
                        <th>입고 예정 일자</th>
                        <td><input type="text" /></td>
                        <th>입고 수량</th>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <th>재고 알림 신청</th>
                        <td><input type="text" /></td>
                        <th>알림 수량</th>
                        <td><input type="text" /></td>
                    </tr>
                </table>
            </div>
            <div css={s.productDetail}>
                <span>상세정보 미리보기 <FiExternalLink /></span>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default ProductEdit;