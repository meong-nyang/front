/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import SearchBox from "../../../components/admin/SearchBox/SearchBox";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import Paginate from "../../../components/admin/Paginate/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MENU_DATAS, ORDER_SEARCH_OPTIONS } from "../../../constants/options";

function OrderManagementPage(props) {

    const navigate = useNavigate();

    const limit = 20;
    const [ searchParams ] = useSearchParams();

    const emptySearchRange = {
        page: searchParams.get("page"),
        limit: limit,
        search: "",
        option: "",
        startDate: "",
        endDate: "",
    }

    const [ searchData, setSearchData ] = useState({
        searchOptionId: "all",
        searchOptionName: "전체",
        searchValue: ""
    });

    const orderList = useQuery(
        ["orderListQuery", searchParams.get("page")],
        async () => {
            return await instance.get("/admin/orders/search", {
            params: {
                page: searchParams.get("page"),
                limit: limit,
                option: searchData.searchOptionId,
                search: searchData.searchValue
            }
        })},
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success.data);
            },
            onError: error => console.log(error.response)
        }
    );

    const handleOnEnter = () => {
        navigate(MENU_DATAS[3].address);
        orderList.refetch();
    }

    return (
        <>
            <div css={s.header}>
                <span>총 {orderList?.data?.data.orderListCount}개</span>
            </div>
            <SearchBox searchOptions={ORDER_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} onEnter={handleOnEnter}/>
            <div css={s.tableLayout}>
                <table css={s.mainTable}>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>주문번호</th> 
                            <th>주문날짜</th>
                            <th>상품코드</th>
                            <th>상품명</th>
                            <th>판매가격</th>
                            <th>개수</th>
                            <th>총 금액</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList?.data?.data.orderList.map(order => (
                                <React.Fragment key={order.id}>
                                    <tr>
                                        <td rowSpan={order.orderDetails.length}>
                                            <input type="checkbox" />
                                        </td>
                                        <td rowSpan={order.orderDetails.length}>{order.id}</td>
                                        <td rowSpan={order.orderDetails.length}>{order.orderDate}</td>
                                        <td>{order.orderDetails[0].productId}</td>
                                        <td>{order.orderDetails[0].product.productName}</td>
                                        <td>{order.orderDetails[0].productPrice}</td>
                                        <td>{order.orderDetails[0].productCount}</td>
                                        <td rowSpan={order.orderDetails.length}>{order.totalPrice}</td>
                                        <td rowSpan={order.orderDetails.length}>{order.orderStatus}</td>
                                    </tr>
                                    {
                                        order.orderDetails.slice(1).map(product => (
                                            <tr key={product.productId}>
                                                <td>{product.productId}</td>
                                                <td>{product.product.productName}</td>
                                                <td>{product.productPrice}</td>
                                                <td>{product.productCount}</td>
                                            </tr>
                                        ))
                                    }
                                </React.Fragment >
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Paginate address={"/admin/order"} totalCount={orderList?.data?.data.productCount} limit={limit} />
        </>
    );
}
export default OrderManagementPage;