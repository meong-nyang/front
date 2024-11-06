/** @jsxImportSource @emotion/react */
import { FaArrowRight } from "react-icons/fa6";
import * as s from "./style";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import Graph from "../../../components/admin/Graph/Graph";
import { useState } from "react";
import { convertToCommaValue } from "../../../utils/changeStringFormat";

function DashboardPage() {

    const [ graphData, setGraphData ] = useState({
        date: [],
        amount: [],
        refundAmount: []
    });

    const dashboardData = useQuery(
        ["dashboardDataQuery"],
        async () => await instance.get("/admin/dashboard"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success.data.statisticsStatusList);
                setGraphData();
                let tempDate = [];
                let tempAmount = [];
                let tempRefundAmount = [];
                for(let daily of success.data.statisticsStatusList) {
                    tempDate.push(daily.date);
                    tempAmount.push(daily.orderAmount);
                    tempRefundAmount.push(daily.refundAmount);
                }
                setGraphData({
                    date: tempDate.reverse(),
                    amount: tempAmount.reverse()
                });
            },
            onError: error => console.log(error.response)
        }
    );

    return (
        <>
            <div css={s.total}>
                <div>실시간 매출 현황</div>
                <table>
                    <tbody>
                        <tr>
                            <th>총 매출</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.totalPrice)}</td>
                            <th>총 주문건수</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.totalCount)}</td>
                            <th>총 취소금액</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.refundPrice)}</td>
                            <th>전체 회원</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.totalCustomerCount)}</td>
                        </tr>
                        <tr>
                            <th>오늘 매출</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.todayTotalPrice)}</td>
                            <th>오늘 주문건수</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.todayTotalCount)}</td>
                            <th>오늘 취소금액</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.todayRefundPrice)}</td>
                            <th>신규 회원</th>
                            <td>{convertToCommaValue(dashboardData?.data?.data.todayJoinCustomerCount)}</td>
                        </tr>
                    </tbody>
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
                                        <th>주문상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dashboardData?.data?.data.orderStatusList.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.orderName}</td>
                                                <td>{data.orderDate}</td>
                                                <td>{data.orderStatus}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </body>
                        <footer>
                            <Link to="/admin/order?page=1"><FaArrowRight />주문현황 보러가기</Link>
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
                                        dashboardData?.data?.data.stockStatusList.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.productId}</td>
                                                <td>{data.productName}</td>
                                                <td>{convertToCommaValue(data.expectedStock)}</td>
                                                <td>{convertToCommaValue(data.currentStock)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </body>
                        <footer>
                            <Link to="/admin/stock?page=1"><FaArrowRight />재고현황 보러가기</Link>
                        </footer>
                    </div>
                </div>
                <div css={s.rightInfo}>
                    <div css={s.card}>
                        <header>통계</header>
                        <body css={s.statisticsLayout}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>일자</th>
                                        <th>주문건수</th>
                                        <th>매출액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dashboardData?.data?.data.statisticsStatusList.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.date}</td>
                                                <td>{convertToCommaValue(data.orderCount)}</td>
                                                <td>{convertToCommaValue(data.orderAmount)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div css={s.graph}>
                                <Graph graphData={graphData} showRefund={false}/>
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