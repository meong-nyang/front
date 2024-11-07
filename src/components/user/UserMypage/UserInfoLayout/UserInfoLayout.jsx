import React, { Children, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
                            <button onClick={handleConfirmButtonClick}>확인</button>
                            <button onClick={handleCancelButtonClick}>취소</button>
                        </div>
                        
                    :
                        <div css={s.buttonLayout}>
                            <button onClick={handleEditClick}>수정하기</button>
                        </div>
                }
            </div>
            {children}
        </div>
    );
}

export default UserInfoLayout;