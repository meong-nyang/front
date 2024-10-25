/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import SearchBox from "../../../components/admin/SearchBox/SearchBox";
import { SEARCH_OPTIONS } from "../../../constants/testDatas/ProductListDatas";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function OrderManagementPage(props) {

    const emptyOrderData = [
        {
            id: "",
            userId: "",
            totalPrice: "",
            orderItemCount: "",
            orderDate: "",
            orderStatus: "",
            orderName: "",
            zipcode: "",
            addressDefault: "",
            addressDetail: "",
            phone: "",
            orderDetails: ""
        }
    ]

    const [ searchData, setSearchData ] = useState({
        searchOptionId: "all",
        searchOptionName: "전체",
        searchValue: ""
    });

    const [ orders, setOrders ] = useState(emptyOrderData);

    // const orderList = useQuery(
    //     ["orderListQuery"],
    //     async () => await instance.get("/admin/orders"),
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //         onSuccess: success => console.log(success),
    //         onError: error => console.log(error)
    //     }
    // );

    return (
        <>
            <div css={s.header}>
                <span>총 10개의 상품</span>
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
                        orders.map(order => (
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{order.id}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.id}</td>
                                <td>{order.id}</td>
                                <td>{order.id}</td>
                                <td>{order.orderItemCount}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderStatus}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

export default OrderManagementPage;