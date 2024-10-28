/** @jsxImportSource @emotion/react */
import { useState } from "react";
import SearchBox from "../../../../components/admin/SearchBox/SearchBox";
import * as s from "./style";
import { CUSTOMER_SEARCH_OPTIONS } from "../../../../constants/options";

function AdminCustomerManagementPage(props) {

    const [ searchData, setSearchData ] = useState({
        searchOptionId: "all",
        searchOptionName: "전체",
        searchValue: ""
    });

    return (
        <>
            <div css={s.header}>
                <span>총 10명</span>
            </div>
            <SearchBox searchOptions={CUSTOMER_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData}/>
            <table css={s.mainTable}>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>가입일</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>연락처</th>
                        <th>최근구매일자</th>
                        <th>등급</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    );
}

export default AdminCustomerManagementPage;