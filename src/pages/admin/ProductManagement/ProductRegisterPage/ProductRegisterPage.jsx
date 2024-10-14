/** @jsxImportSource @emotion/react */
import { useState } from "react";
import MainLayout from "../../../../components/admin/MainLayout/MainLayout";
import * as s from "./style";

function ProductRegisterPage() {

    const emptyRegisterData = {}

    const [ registerData, setRegisterData ] = useState(emptyRegisterData);

    return (
        <MainLayout location="상품관리 > 상품등록">
            <div css={s.layout}>
                <div css={s.images}>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
                <div css={s.buttons}>
                    <span>필수 정보</span>
                    <button>취소</button>
                    <button>등록</button>
                </div>
                <div css={s.mustData}>
                    <table>
                        <tr>
                            <th>상품명</th>
                            <td colSpan="7">강아지 사료</td>
                        </tr>
                        <tr>
                            <th>카테고리</th>
                            <td>{"강아지 > 사료"}</td>
                            <th>단가</th>
                            <td>10000</td>
                            <th>추천상품</th>
                            <td>
                                <div css={s.recommendBox}>
                                    <div>
                                        <input type="radio" name="recommend" id="yes" />
                                        <label htmlFor="yes"></label>
                                        <label htmlFor="yes">설정</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="recommend" id="no" />
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
            </div>
        </MainLayout>
    );
}

export default ProductRegisterPage;