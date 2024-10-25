import React from 'react';
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function UserSignupAddress({ order, setOrder }) {
    const handlePreOnClick = () =>{
        setOrder(order => order - 1);
    }

    const handleNextOnClick = () => {
        setOrder(order => order + 1);
    }
    return (
        <UserSignupLayout title="배송지정보">
            <div css={s.inputBox}>
                <p>주소</p>
                <div>
                    <input type="text" placeholder='우편번호'/>
                    <button>주소검색</button>
                </div>
                <input type="text" placeholder='기본주소'/>
                <input type="text" placeholder='상세주소'/>
            </div>
            <div css={s.locationBox}>
                <p onClick={handlePreOnClick}><MdArrowBackIos />이전</p>
                <p onClick={handleNextOnClick}>다음<MdArrowForwardIos /></p>
            </div>
        </UserSignupLayout>
    );
}

export default UserSignupAddress;