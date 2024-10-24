/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { IoMdArrowDropdown } from "react-icons/io";

function StockManagementPage(props) {

    const searchOptions = [];

    const emptyStockData = [
        {
            id: 1,
            productId: 1,
            productName: "상품",
            currentStock: 100,
            expectedStock: 50,
            arrivalDate: "2022-02-02",
            arrivalQuantity: 100,
            minAlertQuantity: 30,
            alertSetting: 1,
            outOfStock: 1
        },
        {
            id: 1,
            productId: 1,
            productName: "상품",
            currentStock: 100,
            expectedStock: 50,
            arrivalDate: "2022-02-02",
            arrivalQuantity: 100,
            minAlertQuantity: 30,
            alertSetting: 1,
            outOfStock: 1
        },
        {
            id: 1,
            productId: 1,
            productName: "상품",
            currentStock: 100,
            expectedStock: 50,
            arrivalDate: "2022-02-02",
            arrivalQuantity: 100,
            minAlertQuantity: 30,
            alertSetting: 1,
            outOfStock: 1
        },
        {
            id: 1,
            productId: 1,
            productName: "상품",
            currentStock: 100,
            expectedStock: 50,
            arrivalDate: "2022-02-02",
            arrivalQuantity: 100,
            minAlertQuantity: 30,
            alertSetting: 1,
            outOfStock: 1
        }
    ]

    const [ stocks, setStocks ] = useState(emptyStockData);

    const [ isOpen, setOpen ] = useState(false);

    return (
        <>
            <div css={s.header}>
                <button>변경사항 저장</button>
            </div>
            <div css={s.searchBox}>
                <div>
                    <button></button>
                    <IoMdArrowDropdown />
                </div>
                {
                    isOpen &&
                    <>
                        <span onClick={() => setOpen(false)}/>
                        <div css={s.searchOptionModal}>
                            {
                                searchOptions.map(option => 
                                    <button key={option.id}>
                                        {option.name}
                                    </button>
                                )
                            }
                        </div>
                    </>
                }
                <input type="text" />
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
                        stocks.map(stock => (
                            <tr>
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