/** @jsxImportSource @emotion/react */
import { FaArrowRight } from "react-icons/fa6";
import * as s from "./style";
import { Link } from "react-router-dom";
import { ORDER_DATA, STATISTICS_DATA, STOCK_DATA } from "../../../constants/testDatas/DashboardDatas";

function DashboardPage(props) {

    const orderData = ORDER_DATA;
    const stockData = STOCK_DATA;
    const statisticsData = STATISTICS_DATA;

    return (
        <>
            <div css={s.total}>
                <div>실시간 매출 현황</div>
                <table>
                    <tr>
                        <th>총 매출</th>
                        <td>data</td>
                        <th>총 주문건수</th>
                        <td>data</td>
                        <th>총 취소건수</th>
                        <td>data</td>
                        <th>전체 회원</th>
                        <td>data</td>
                    </tr>
                    <tr>
                        <th>오늘 매출</th>
                        <td>data</td>
                        <th>오늘 주문건수</th>
                        <td>data</td>
                        <th>오늘 취소건수</th>
                        <td>data</td>
                        <th>신규 회원</th>
                        <td>data</td>
                    </tr>
                </table>
            </div>
            <div css={s.information}>
                <div css={s.leftInfo}>
                    <div css={s.card}>
                        <header>주문현황</header>
                        <body>
                            <table>
                                <thead>
                                    <tr>
                                        <th>고객명</th>
                                        <th>주문날짜</th>
                                        <th>결제상태</th>
                                        <th>배송상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderData.map(data => (
                                            <tr>
                                                <td>{data.customerName}</td>
                                                <td>{data.orderDate}</td>
                                                <td>{data.payStatus}</td>
                                                <td>{data.deliveryStatus}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </body>
                        <footer>
                            <Link to="/admin/order"><FaArrowRight />주문현황 보러가기</Link>
                        </footer>
                    </div>
                    <div css={s.card}>
                        <header>재고부족</header>
                        <body>
                            <table>
                                <thead>
                                    <tr>
                                        <th>상품코드</th>
                                        <th>상품명</th>
                                        <th>가재고</th>
                                        <th>현재재고</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stockData.map(data => (
                                            <tr>
                                                <td>{data.productCode}</td>
                                                <td>{data.productName}</td>
                                                <td>{data.expectedStock}</td>
                                                <td>{data.currentStock}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </body>
                        <footer>
                            <Link to="/admin/stock"><FaArrowRight />재고현황 보러가기</Link>
                        </footer>
                    </div>
                </div>
                <div css={s.rightInfo}>
                    <div css={s.card}>
                        <header>통계</header>
                        <body>
                            <table>
                                <thead>
                                    <tr>
                                        <th>일자</th>
                                        <th>주문건수</th>
                                        <th>매출액</th>
                                        <th>취소건수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statisticsData.map(data => (
                                            <tr>
                                                <td>{data.date}</td>
                                                <td>{data.orderCount}</td>
                                                <td>{data.sales}</td>
                                                <td>{data.cancelCount}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div css={s.graph}>
                                그래프자리
                            </div>
                        </body>
                        <footer>
                            <Link to="/admin/statistics"><FaArrowRight />통계 보러가기</Link>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;