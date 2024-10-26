/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";

import { IoMdArrowDropdown } from "react-icons/io";
import { useQuery, useQueryClient } from "react-query";
import { instance } from "../../../apis/util/instance";

function StockManagementPage(props) {

    const searchOptions = [];

    const [ isOpen, setOpen ] = useState(false);
    
    const stockData = useQuery(
        ["stockDataQuery"],
        async () => await instance.get("/admin/products/stock"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => console.log(success.data),
            onError: error => console.log(error),
        }
    );

    return (
        <>
            <div css={s.header}>
                <button>변경사항 저장</button>
            </div>
            <table css={s.mainTable}>
                <thead>
                    <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>현재재고</th>
                        <th>가재고</th>
                        <th>입고 예정 일자</th>
                        <th>입고 수량</th>
                        <th>알림 수량</th>
                        <th>최소 알림 설정</th>
                        <th>품절 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stockData?.data?.data.stockList.map(stock => (
                            <tr key={stock.productId}>
                                <td>{stock.productId}</td>
                                <td>{stock.productName}</td>
                                <td>{stock.currentStock}</td>
                                <td>{stock.expectedStock}</td>
                                <td>{stock.arrivalDate}</td>
                                <td>{stock.arrivalQuantity}</td>
                                <td>{stock.minAlertQuantity}</td>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <input type="checkbox" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

export default StockManagementPage;