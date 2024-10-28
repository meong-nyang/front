import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

function UserProductDetailPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <div css={s.imgLayout}>
                    <img src="" alt="" />
                </div>
                <div css={s.detailLayout}>
                    <p>향균탈취 강아지 스프레이</p>
                    <p>생활공간 세균과 악취를 99% 제거하는 강아지 전용 항균탈취제. 
                    유칼립투스잎 추출물 함유로 반려견 심신 안정에 도움</p>
                    <p>6,900원</p>
                    <p>배송비 : 3,000원</p>
                    <div css={s.countLayout}>
                        <p>향균탈취 강아지 스프레이</p>
                        <div>
                            <AiFillMinusCircle />
                            <p>1</p>
                            <AiFillPlusCircle />
                        </div>
                        <p>6,500원</p>
                    </div>
                    <div css={s.totalLayout}>
                        <p>총 상품금액</p>
                        <p>6,500원</p>
                    </div>
                    <div css={s.buyLayout}>
                        <button>장바구니</button>
                        <button>구매하기</button>
                    </div>
                </div>
            </div>
            
        </UserBackgoundLayout>
    );
}

export default UserProductDetailPage;