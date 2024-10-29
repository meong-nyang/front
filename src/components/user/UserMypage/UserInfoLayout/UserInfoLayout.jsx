import React, { Children, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { instance } from '../../../../apis/util/instance';
import { m } from 'framer-motion';
import { useQuery } from 'react-query';

function UserInfoLayout({ children, title, editMode, setEditMode, userInfo, setUserInfo }) {

    const handleEditOnClick = () => {
        setEditMode(mode => !mode);
    };
    
    const handleConfirmButtonOnClick = () => {
        setEditMode(mode => !mode);
    };

    const handleCancelButtonOnClick = () => {
        setEditMode(mode => !mode);
    };

    return (
        <div css={s.layout}>
            <div>
                <p>{title}</p>
                {
                    editMode 
                    ?
                        <div css={s.buttonLayout}>
                            <p onClick={handleEditOnClick}>수정하기</p>
                        </div>
                    :
                        <div css={s.buttonLayout}>
                            <p onClick={handleConfirmButtonOnClick}>확인</p>
                            <p onClick={handleCancelButtonOnClick}>취소</p>
                        </div>
                }
            </div>
            {children}
        </div>
    );
}

export default UserInfoLayout;