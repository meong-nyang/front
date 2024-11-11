/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ProductImages from "../../../../components/admin/ProductImages/ProductImages";
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { MENU_DATAS } from "../../../../constants/options";
import { convertToCommaValue } from "../../../../utils/changeStringFormat";
import { FiExternalLink } from "react-icons/fi";
import ProductDetailModal from "../../../../components/admin/ProductDetailModal/ProductDetailModal";

function ProductDetailPage(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [imgName, setImgName] = useState([]);
    const [productDetailImgName, setProductDetailImgName ] = useState([]);
    const [isProductDetailModalOpen, setProductDetailModalOpen] = useState();

    const productDetail = useQuery(
        ["productDetailQuery"],
        async () => await instance.get(`/admin/product/${params.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: async (success) => {
                console.log(success.data);
                setImgName(success.data.imgUrls.map(data => data.imgName));
                setProductDetailImgName(success.data.productDetailImgUrls.map(data => data.imgName));
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

    const handleProductDetailOnClick = () => {
        if (productDetailImgName.length === 0) {
            alert("미리 볼 이미지가 없습니다.");
            return;
        }
        setProductDetailModalOpen(true);
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
                productDetail.isSuccess && !productDetail.isFetching &&
                <>
                    <ProductImages imgSource={imgName} setImgSource={setImgName} isModify={false} />
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
                                <th>판매상태</th>
                                <td>
                                    <div css={s.recommendBox}>
                                        <div>
                                            <input type="radio" name="onSale" id="20" readOnly={true}
                                                checked={productDetail.data.data.onSale.toString() === "1"} />
                                            <label htmlFor="20"></label>
                                            <label htmlFor="20">판매</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="onSale" id="10" readOnly={true}
                                                checked={productDetail.data.data.onSale.toString() === "2"} />
                                            <label htmlFor="10"></label>
                                            <label htmlFor="10">미판매</label>
                                        </div>
                                    </div>
                                </td>
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
                                <th>단가</th>
                                <td>{convertToCommaValue(productDetail.data.data.productPrice)}</td>
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
                    <div css={s.productDetail}>
                        <span>상품 설명</span>
                        <textarea disabled={true} value={productDetail.data.data.productDetail} />
                        <div css={s.productDetailButton} onClick={handleProductDetailOnClick}>
                            상품 상세 미리보기
                            <FiExternalLink />
                        </div>
                        <div css={s.detailImages}>
                            <ProductImages imgSource={productDetailImgName} setImgSource={setProductDetailImgName} isModify={false} />
                            {
                                isProductDetailModalOpen &&
                                <ProductDetailModal detailImg={productDetailImgName} setOpen={setProductDetailModalOpen}/>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ProductDetailPage;