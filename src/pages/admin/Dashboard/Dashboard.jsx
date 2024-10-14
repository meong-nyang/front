/** @jsxImportSource @emotion/react */
import { FaArrowRight } from "react-icons/fa6";
import MainLayout from "../../../components/admin/MainLayout/MainLayout";
import * as s from "./style";
import { Link } from "react-router-dom";

function Dashboard(props) {

    const orderData = [
        {
            id: 1,
            customerName: "홍길동",
            orderDate: "2024-01-01",
            payStatus: "결제완료",
            deliveryStatus: "배송종"
        },
        {
            id: 1,
            customerName: "홍길동",
            orderDate: "2024-01-01",
            payStatus: "결제완료",
            deliveryStatus: "배송종"
        },
        {
            id: 1,
            customerName: "홍길동",
            orderDate: "2024-01-01",
            payStatus: "결제완료",
            deliveryStatus: "배송종"
        },
        {
            id: 1,
            customerName: "홍길동",
            orderDate: "2024-01-01",
            payStatus: "결제완료",
            deliveryStatus: "배송종"
        },
        {
            id: 1,
            customerName: "홍길동",
            orderDate: "2024-01-01",
            payStatus: "결제완료",
            deliveryStatus: "배송종"
        },
        {
            id: 1,
            customerName: "홍길동",
            orderDate: "2024-01-01",
            payStatus: "결제완료",
            deliveryStatus: "배송종"
        }
    ];

    const stockData = [
        {
            id: 1,
            productCode: "P-100101",
            productName: "사료",
            expectedStock: "10",
            currentStock: "20"
        }
    ];

    const statisticsData = [
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
        {
            id: 1,
            date: "2024-01-01",
            orderCount: "10",
            sales: "100,000",
            cancelCount: "5"
        },
    ]

    return (
        <MainLayout location={"대시보드"}>
            <div css={s.layout}>
                <div>실시간 매출 현황</div>
                <table>
                    <tr>
                        <td>총 매출</td>
                        <td>data</td>
                        <td>총 주문건수</td>
                        <td>data</td>
                        <td>총 취소건수</td>
                        <td>data</td>
                        <td>전체 회원</td>
                        <td>data</td>
                    </tr>
                    <tr>
                        <td>오늘 매출</td>
                        <td>data</td>
                        <td>오늘 주문건수</td>
                        <td>data</td>
                        <td>오늘 취소건수</td>
                        <td>data</td>
                        <td>신규 회원</td>
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
                                        <td>고객명</td>
                                        <td>주문날짜</td>
                                        <td>결제상태</td>
                                        <td>배송상태</td>
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
                                        <td>상품코드</td>
                                        <td>상품명</td>
                                        <td>가재고</td>
                                        <td>현재재고</td>
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
                                        <td>일자</td>
                                        <td>주문건수</td>
                                        <td>매출액</td>
                                        <td>취소건수</td>
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
        </MainLayout>
    );
}

export default Dashboard;