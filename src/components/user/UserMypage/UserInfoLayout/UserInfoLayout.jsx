import React, { Children, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../../apis/util/instance';
import UserInfoPassword from '../UserInfoPassword/UserInfoPassword';

function UserInfoLayout({ children, title, editMode, setEditMode, handleConfirmButtonClick }) {

    const queryClient = useQueryClient();

    const handleEditClick = () => {
        setEditMode(mode => !mode); 
    };
    
    const handleCancelButtonClick = () => {
        queryClient.invalidateQueries(["myPageDataQuery"])
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
                            <p onClick={handleConfirmButtonClick}>확인</p>
                            <p onClick={handleCancelButtonClick}>취소</p>
                        </div>
                        
                    :
                        <div css={s.buttonLayout}>
                            <p onClick={handleEditClick}>수정하기</p>
                        </div>
                }
            </div>
            {children}
        </div>
    );
}

export default UserInfoLayout;