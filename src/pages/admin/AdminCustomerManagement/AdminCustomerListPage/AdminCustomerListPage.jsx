/** @jsxImportSource @emotion/react */
import { useState } from "react";
import SearchBox from "../../../../components/admin/SearchBox/SearchBox";
import * as s from "./style";
import { CUSTOMER_SEARCH_OPTIONS } from "../../../../constants/options";
import { useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../../../../components/admin/Paginate/Paginate";

function AdminCustomerListPage(props) {
    const limit = 20;

    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    const [ searchData, setSearchData ] = useState({
        searchOptionId: "all",
        searchOptionName: "전체",
        searchValue: ""
    });

    const userInfoDatas = useQuery(
        ["userInfoDatasQuery", searchParams.get("page")],
        async () => await instance.get("/admin/users/search", {
            params: {
                page: searchParams.get("page"),
                limit: limit,
                option: searchData.searchOptionId,
                search: searchData.searchValue
            }
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => console.log(success),
            onError: error => console.log(error.response)
        }
    );

    return (
        <>
            <div css={s.header}>
                <span>총 {userInfoDatas?.data?.data.userListCount || 0}명</span>
            </div>
            <SearchBox searchOptions={CUSTOMER_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} onEnter={() => userInfoDatas.refetch()}/>
            <div css={s.tableLayout}>
                <table css={s.mainTable}>
                    <thead>
                        <tr>
                            <th>가입일</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>최근구매일자</th>
                            <th>등급</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userInfoDatas?.data?.data.userList.map(user => (
                                <tr key={user.id} onClick={() => navigate("/admin/customer/detail/" + user.id)}>
                                    <td>{user.createDate}</td>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.recentPurchaseDate}</td>
                                    <td>{user.membership.membershipLevelName}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Paginate address={"/admin/customer"} totalCount={userInfoDatas?.data?.data.userListCount} limit={limit} />
        </>
    );
}

export default AdminCustomerListPage;