/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useMutation } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { FiExternalLink } from "react-icons/fi";
import { RiImageAddLine } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { useSetRecoilState } from "recoil";
import { currentLocationAtom } from "../../../../atoms/currentLocationAtom";
import { useNavigate } from "react-router-dom";

function ProductRegisterPage() {

    const setCurrentLocation = useSetRecoilState(currentLocationAtom);
    setCurrentLocation({
        selectedMenuId: 2,
        currentLocation: "상품관리 > 상품등록"
    });

    const emptyProductData = {
        productName: "",
        petGroupId: "",
        categoryId: "",
        productPrice: "",
        productPriceDiscount: "",
        productDetail: "",
        productBrand: "",
        productModel: "",
        productMemo: "",
        recommendation: "no",
        currentStock: "",
        expectedStock: ""
    }

    const [ productData, setProductData ] = useState(emptyProductData);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ imgsPreview, setImgsPreview ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // const result = selectedFiles.map(file => URL.createObjectURL(file));
        const result = [];
        console.log(selectedFiles)
        for (let i of selectedFiles) {
            result.push(URL.createObjectURL(i));
        }
        setImgsPreview(result);
    }, [selectedFiles]);

    const formData = () => {
        const formData = new FormData();
        formData.append("productName", productData.productName)
        formData.append("petGroupId", productData.petGroupId);
        formData.append("productPrice", productData.productPrice);
        formData.append("productPriceDiscount", productData.productPriceDiscount);
        formData.append("productDetail", productData.productDetail);
        formData.append("productBrand", productData.productBrand);
        formData.append("productModel", productData.productModel);
        formData.append("productMemo", productData.productMemo);
        formData.append("recommendation", productData.recommendation);
        formData.append("currentStock", productData.currentStock);
        formData.append("expectedStock", productData.expectedStock);
        for (let i of selectedFiles) {
            formData.append('productImage', i);
        }
        return formData;
    }

    const registerProductMutation = useMutation(
        async () => await instance.post("/admin/product", formData(), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        {
            onSuccess: response => {
                console.log("등록 성공");
                console.log(response);
            },
            onError: error => {
                console.log("등록 실패");
                console.log(error);
            }
        }
    );

    // const handleFileOnChange = (e) => {
    //     setSelectedFiles(e.target.files);
    //     for (let i of e.target.files) {
    //         setImgsPreview(img => ([...img, URL.createObjectURL(i)]));
    //     }
    //     console.log(e.target.files);
    // }

    const handleImageChangeOnClick = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");
        fileInput.setAttribute("multiple", "true");
        fileInput.click();

        fileInput.onchange = (e) => {
            if (selectedFiles.length + e.target.files.length > 10) {
                return alert("이미지는 최대 10개까지만 등록이 가능합니다");
            }
            for (let i of e.target.files) {
                setSelectedFiles(file => [...file, i]);
            }
        }
    }

    const handleImageDeleteOnClick = (index) => {
        console.log(index);
        const newFiles = []
        for (let i = 0; i < selectedFiles.length; i++) {
            if (i !== index) {
                newFiles.push(selectedFiles[i]);
            }
        }
        setSelectedFiles(newFiles);
    }

    const handleRegisterButtonOnClick = () => {
        registerProductMutation.mutateAsync();
    }

    const handleRecommendOnChange = (e) => {
        setProductData(data => ({
            ...data,
            recommendation: e.target.id
        }));
        console.log(e.target.id);
    }

    return (
        <>
            <div css={s.layout}>
                <div css={s.images}>
                    {
                        imgsPreview.map((img, index) =>
                            <span key={index} onClick={() => handleImageDeleteOnClick(index)}>
                                <img src={img}/>
                                <GiCancel />
                            </span>
                        )
                    }
                    {
                        imgsPreview.length < 10 &&
                        <div onClick={handleImageChangeOnClick}><RiImageAddLine /></div>
                    }
                </div>
                <div css={s.buttons}>
                    <span>필수 정보</span>
                    <button onClick={() => navigate("/admin/product/list")}>취소</button>
                    <button onClick={handleRegisterButtonOnClick}>등록</button>
                </div>
                <div css={s.mustData}>
                    <table>
                        <tr>
                            <th>상품명</th>
                            <td colSpan="7"></td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>{"강아지 > 사료"}</td>
                            <th>단가</th>
                            <td></td>
                            <th>추천상품</th>
                            <td>
                                <div css={s.recommendBox}>
                                    <div>
                                        <input type="radio" name="recommend" id="yes" 
                                            checked={productData.recommendation === "yes"}
                                            onChange={handleRecommendOnChange} />
                                        <label htmlFor="yes"></label> 
                                        <label htmlFor="yes">설정</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="recommend" id="no"
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
                            <td></td>
                            <th>모델명</th>
                            <td></td>
                            <th>할인금액</th>
                            <td></td>
                            <th>판매가격</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>메모</th>
                            <td colSpan="7"></td>
                        </tr>
                    </table>
                </div>
                <div css={s.stockManagement}>
                    <span>재고 관리</span>
                    <table>
                        <tr>
                            <th>현재재고</th>
                            <td></td>
                            <th>가재고</th>
                            <td></td>
                            <th>입고 예정 일자</th>
                            <td></td>
                            <th>입고 수량</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>재고 알림 신청</th>
                            <td></td>
                            <th>알림 수량</th>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div css={s.productDetail}>
                    <span>상세정보 미리보기 <FiExternalLink /></span>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductRegisterPage;