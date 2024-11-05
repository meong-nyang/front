/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import * as s from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { MENU_DATAS } from "../../../../constants/options";
import { convertToCommaValue } from "../../../../utils/changeStringFormat";

function ProductDetailPage(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [blobs, setBlobs] = useState([]);

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

    const deleteProductMutation = useMutation(
        async () => await instance.delete("/admin/products", {
            params: {
                productIds: params.id
            }
        })
    );

    const addImgBlobFromUrl = async (url) => {
        try {
            const response = await instance.get(url, { responseType: "blob" });
            setBlobs(blob => [...blob, response.data]);
        } catch (e) {
            console.log("이미지를 불러오는 중 에러가 발생하였습니다");
            console.log(e.response);
        }
    }

    const handleDeleteButtonOnClick = () => {
        if (window.confirm("정말로 작제하시겠습니까?")) {
            deleteProductMutation.mutateAsync()
                .then(success => {
                    alert("삭제되었습니다.");
                    navigate(MENU_DATAS[1].address);
                })
                .catch(error => {
                    alert("알수 없는 이유로 삭제에 실패하였습니다.");
                    console.log(error.response);
                })
        }

    }

    return (
        <div css={s.layout}>
            <div css={s.head}>
                <span>상품 이미지</span>
                <div css={s.buttons}>
                    <button onClick={handleDeleteButtonOnClick}>삭제</button>
                    <button onClick={() => navigate(`/admin/product/modify/${params.id}`)}>수정</button>
                </div>
            </div>
            {
                console.log(productDetail.isFetching)
            }
            {
                productDetail.isSuccess && !productDetail.isFetching &&
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
                                <td>{convertToCommaValue(productDetail.data.data.productPrice)}</td>
                                <th>추천상품</th>
                                <td>
                                    <div css={s.recommendBox}>
                                        <div>
                                            <input type="radio" name="recommend" id="2" readOnly={true}
                                                checked={productDetail.data.data.recommendation === 2} />
                                            <label htmlFor="2"></label>
                                            <label htmlFor="2">설정</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="recommend" id="1" readOnly={true}
                                                checked={productDetail.data.data.recommendation === 1} />
                                            <label htmlFor="1"></label>
                                            <label htmlFor="1">미설정</label>
                                        </div>
                                    </div>
                                </td>
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
                                <th>제조일</th>
                                <td>{ }</td>
                                <th>할인금액</th>
                                <td>{convertToCommaValue(productDetail.data.data.productPriceDiscount)}</td>
                                <th>판매가격</th>
                                <td>{convertToCommaValue(productDetail.data.data.productPrice - productDetail.data.data.productPriceDiscount)}</td>
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
                                <td>{convertToCommaValue(productDetail.data.data.currentStock)}</td>
                                <th>가재고</th>
                                <td>{convertToCommaValue(productDetail.data.data.expectedStock)}</td>
                                <th>입고 예정 일자</th>
                                <td>{productDetail.data.data.arrivalDate}</td>
                                <th>입고수량</th>
                                <td>{convertToCommaValue(productDetail.data.data.arrivalQuantity)}</td>
                            </tr>
                            <tr>
                                <th>재고 알림 설정</th>
                                <td>
                                    <div css={s.recommendBox}>
                                        <div>
                                            <input type="radio" name="alertSetting" id="20" readOnly={true}
                                                checked={productDetail.data.data.alertSetting === 2} />
                                            <label htmlFor="20"></label>
                                            <label htmlFor="20">설정</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="alertSetting" id="10" readOnly={true}
                                                checked={productDetail.data.data.alertSetting === 1} />
                                            <label htmlFor="10"></label>
                                            <label htmlFor="10">미설정</label>
                                        </div>
                                    </div>
                                </td>
                                <th>알림 수량</th>
                                <td>{convertToCommaValue(productDetail.data.data.minAlertQuantity)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div css={s.productDetail}>
                    <span>제품설명</span>
                    <textarea></textarea>
                    <span>상세정보 이미지</span>
                    <div css={s.detailImages}>
                        <img src="" alt="" />
                    </div>
                </div>
                </>
            }
        </div>
    );
}

export default ProductDetailPage;