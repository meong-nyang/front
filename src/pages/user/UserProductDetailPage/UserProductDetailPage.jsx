import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';

function UserProductDetailPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div>

            </div>
            <UserProductDetailPage />
        </UserBackgoundLayout>
    );
}

export default UserProductDetailPage;