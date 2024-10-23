import React from 'react';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';

function UserMainPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
        </UserBackgoundLayout>
    );
}

export default UserMainPage;