/** @jsxImportSource @emotion/react */
import { useState } from "react";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import * as s from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";

function ProductDetailPage(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [ blobs, setBlobs ] = useState([]);

    const productDetail = useQuery(
        ["productDetailQuery"],
        async () => await instance.get(`/admin/product/${params.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: async (success) => {
                setBlobs([]);
                for (let i of success.data.imgUrls) {
                    await addImgBlobFromUrl("/images/" + i.imgName);
                }
            },
            onError: error => {
                console.log("정보 들고오기 실패");
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
                <button onClick={() => navigate(`/admin/product/modify/${params.id}`)}>수정</button>
            </div>
            {
                console.log(productDetail?.data?.data.imgUrls)
            }
            {
                productDetail.isSuccess &&
                <>
                    <ProductImages blobs={blobs} setBlobs={setBlobs} isModify={false} />
                    <span>상품 정보</span>
                    <table>
                        <tbody>
                            <tr>
                                <th>상품명</th>
                                <td colSpan={7}>{productDetail.data.data.productName}</td>
                            </tr>
                            <tr>
                                <th>카테고리</th>
                                <td colSpan={3}>{productDetail.data.data.petGroup.categoryGroupName + " > " + productDetail.data.data.category.categoryName}</td>
                                <th>단가</th>
                                <td>{productDetail.data.data.productPrice}</td>
                                <th>추천상품</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>등록일자</th>
                                <td>{productDetail.data.data.productCreateDate}</td>
                                <th>수정일자</th>
                                <td>{productDetail.data.data.productUpdateDate}</td>
                                <th>상품코드</th>
                                <td>{productDetail.data.data.id}</td>
                                <th>모델명</th>
                                <td>{productDetail.data.data.productModel}</td>
                            </tr>
                            <tr>
                                <th>브랜드</th>
                                <td>{productDetail.data.data.productBrand}</td>
                                <th>재조일</th>
                                <td>{}</td>
                                <th>할인금액</th>
                                <td>{productDetail.data.data.productPriceDiscount}</td>
                                <th>판매가격</th>
                                <td>{productDetail.data.data.productPrice - productDetail.data.data.productPriceDiscount}</td>
                            </tr>
                            <tr>
                                <th>메모</th>
                                <td colSpan={7}>{productDetail.data.data.productMemo}</td>
                            </tr>
                        </tbody>
                    </table>
                    <span>재고 관리</span>
                    <table>
                        <tbody>
                            <tr>
                                <th>현재재고</th>
                                <td>{productDetail.data.data.stock.currentStock}</td>
                                <th>가재고</th>
                                <td>{productDetail.data.data.stock.expectedStock}</td>
                                <th>입고 예정 일자</th>
                                <td>{productDetail.data.data.stock.arrivalDate}</td>
                                <th>입고수량</th>
                                <td>{productDetail.data.data.stock.arrivalQuantity}</td>
                            </tr>
                            <tr>
                                <th>재고 알림 설정</th>
                                <td></td>
                                <th>알림 수량</th>
                                <td>{productDetail.data.data.stock.minAlertQuantity}</td>
                            </tr>
                        </tbody>
                    </table>
                    <span>상세정보 미리보기</span>
                    <div css={s.detail}></div>
                </>
            }
        </div>
    );
}

export default ProductDetailPage;