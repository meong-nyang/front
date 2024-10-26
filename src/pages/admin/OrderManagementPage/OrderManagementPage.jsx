/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import SearchBox from "../../../components/admin/SearchBox/SearchBox";
import { SEARCH_OPTIONS } from "../../../constants/testDatas/ProductListDatas";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function OrderManagementPage(props) {

    const emptySearchData = {
        page: 1,
        limit: 20,
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
        ["orderListQuery"],
        async () => await instance.get("/admin/orders"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => console.log(success.data),
            onError: error => console.log(error)
        }
    );

    return (
        <>
            <div css={s.header}>
                <span>총 {orderList?.data?.data.orderListCount}개</span>
            </div>
            <SearchBox searchOptions={SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} />
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
                            <>
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
                                    <tr>
                                        <td>{product.productId}</td>
                                        <td>{product.product.productName}</td>
                                        <td>{product.productPrice}</td>
                                        <td>{product.productCount}</td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
export default OrderManagementPage;