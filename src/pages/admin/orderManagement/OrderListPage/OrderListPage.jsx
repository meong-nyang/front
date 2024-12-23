/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import SearchBox from "../../../../components/admin/SearchBox/SearchBox";
import { useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import Paginate from "../../../../components/admin/Paginate/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MENU_DATAS, ORDER_SEARCH_OPTIONS } from "../../../../constants/options";
import { convertToCommaValue } from "../../../../utils/changeStringFormat";

function OrderListPage(props) {
    const limit = 20;

    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams();

    const emptySearchRange = {
        page: searchParams.get("page"),
        limit: limit,
        search: "",
        option: "",
        startDate: "",
    }

    const [ searchData, setSearchData ] = useState({
        searchOptionId: "all",
        searchOptionName: "전체",
        searchValue: ""
    });

    const [ hoverOrderId, setHoverOrderId ] = useState(0);

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

    const handleMouseOver = (orderId) => {
        console.log(orderId);
        setHoverOrderId(orderId);
    }

    const handleMouseOut = () => {
        setHoverOrderId(0);
    }

    return (
        <>
            <div css={s.header}>
                <span>총 {orderList?.data?.data.orderListCount || 0}개</span>
            </div>
            <SearchBox searchOptions={ORDER_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} onEnter={handleOnEnter}/>
            <div css={s.tableLayout}>
                <table css={s.mainTable}>
                    <thead>
                        <tr>
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
                    <tbody css={s.tableBody}>
                        {
                            orderList?.data?.data?.orderList?.map((order, index) => (
                                <React.Fragment key={order.id}>
                                    <tr css={hoverOrderId === order.id ? s.trHover : s.whiteBackground} 
                                        onClick={() => navigate("/admin/order/detail/" + order.id)}
                                        onMouseOver={() => handleMouseOver(order.id)}
                                        onMouseOut={handleMouseOut} >
                                        <td rowSpan={order.orderDetails.length}>{order.id}</td>
                                        <td rowSpan={order.orderDetails.length}>{order.orderDate}</td>
                                        <td>{order.orderDetails[0].productId}</td>
                                        <td>{order.orderDetails[0].product.productName}</td>
                                        <td>{convertToCommaValue(order.orderDetails[0].productPrice)}</td>
                                        <td>{convertToCommaValue(order.orderDetails[0].productCount)}</td>
                                        <td rowSpan={order.orderDetails.length}>{convertToCommaValue(order.totalPrice)}</td>
                                        <td rowSpan={order.orderDetails.length}>{order.orderStatus}</td>
                                    </tr>
                                    {
                                        order.orderDetails.slice(1).map(product => (
                                            <tr key={product.productId} 
                                                onClick={() => navigate("/admin/order/detail/" + order.id)}
                                                onMouseOver={() => handleMouseOver(order.id)}
                                                onMouseOut={handleMouseOut}
                                                css={hoverOrderId === order.id ? s.productCellHover : s.productCell} >
                                                <td>{product.productId}</td>
                                                <td>{product.product.productName}</td>
                                                <td>{convertToCommaValue(product.productPrice)}</td>
                                                <td>{convertToCommaValue(product.productCount)}</td>
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
export default OrderListPage;