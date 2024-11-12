/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";
import Graph from "../../../components/admin/Graph/Graph";
import { convertToCommaValue } from "../../../utils/changeStringFormat";

function AdminStatisticsPage(props) {

    const emptySummaryData = {
        totalAmount: 0,
        totalCount: 0,
        refundAmount: 0,
        refundCount: 0,
        dailyMinAmount: 0,
        dailyAvgAmount: 0,
        dailyMaxAmount: 0
    };
    
    const todayDate = () => {
        return new Date().toISOString().replace("T", " ").substring(0, 10);
    };
    
    const before7DayDate = () => {
        const now = new Date().getTime();
        const day7 = 1000 * 60 * 60 * 24 * 7;
        return new Date(now - day7).toISOString().replace("T", " ").substring(0, 10);
    };

    const [ summaryData, setSummaryData ] = useState(emptySummaryData);
    const [ graphData, setGraphData ] = useState({
        date: [],
        amount: [],
        refundAmount: []
    });

    const [ selectedDate, setSelectedDate ] = useState({
        startDate: before7DayDate(),
        endDate: todayDate()
    });

    const [ searchingDate, setSearchingDate ] = useState({
        startDate: before7DayDate(),
        endDate: todayDate()
    });

    const statisticsDatas = useQuery(
        ["statisticsDatasQuery"],
        async () => await instance.get("/admin/statistics", { params: 
            {
                startDate: selectedDate.startDate,
                endDate: selectedDate.endDate
            }}),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success.data.summaryStatistics);
                let tempSummaryData = {...emptySummaryData, dailyMinAmount: success.data.summaryStatistics[0]?.totalPrice || 0};
                let tempDate = [];
                let tempAmount = [];
                let tempRefundAmount = [];
                let cnt = 0;
                for (let data of success.data.summaryStatistics) {
                    if(data.orderStatus === "결제완료") {
                        tempSummaryData.totalAmount += data.totalPrice;
                        tempSummaryData.totalCount += data.totalCount;
                        tempSummaryData.dailyMinAmount = tempSummaryData.dailyMinAmount < data.totalPrice ? tempSummaryData.dailyMinAmount : data.totalPrice;
                        tempSummaryData.dailyMaxAmount = tempSummaryData.dailyMaxAmount > data.totalPrice ? tempSummaryData.dailyMaxAmount : data.totalPrice;
                        cnt++;

                        tempDate.push(data.orderDate);
                        tempAmount.push(data.totalPrice);
                    } else if (data.orderStatus === "환불완료") {
                        tempSummaryData.refundAmount += data.totalPrice;
                        tempSummaryData.refundCount += data.totalCount;

                        tempRefundAmount.push(data.totalPrice);
                    }
                    tempSummaryData.dailyAvgAmount = parseInt(tempSummaryData.totalAmount / cnt) || 0;
                }
                setSummaryData(tempSummaryData);
                setGraphData({
                    date: tempDate,
                    amount: tempAmount,
                    refundAmount: tempRefundAmount
                });
            },
            onError: error => console.log(error)
        }
    );

    const handleDateInputOnChange = (e) => {
        if(e.target.value === '') {
            return;
        }
        setSelectedDate(date => ({
            ...date,
            [e.target.name]: e.target.value
        }));
    }

    const handleRefetchOnClick = () => {
        setSearchingDate(selectedDate);
        statisticsDatas.refetch();
    }

    return (
        <div css={s.layout}>
            <div css={s.selectTime}>
                <span>조회일자 :</span>
                <input type="date" name="startDate" value={selectedDate.startDate} onChange={handleDateInputOnChange}/>
                <span>~</span>
                <input type="date" name="endDate" value={selectedDate.endDate} onChange={handleDateInputOnChange}/>
                <button onClick={handleRefetchOnClick}>조회</button>
            </div>
            <table css={s.mainTable}>
                <thead>
                    <tr>
                        <th>일자</th>
                        <th>매출액</th>
                        <th>결제건수</th>
                        <th>환불액</th>
                        <th>취소건 수</th>
                        <th>하루 최소 매출</th>
                        <th>하루 평균 매출</th>
                        <th>하루 최대 매출</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{searchingDate.startDate + " ~ " + searchingDate.endDate}</td>
                        <td>{convertToCommaValue(summaryData?.totalAmount)}</td>
                        <td>{convertToCommaValue(summaryData?.totalCount)}</td>
                        <td>{convertToCommaValue(summaryData?.refundAmount)}</td>
                        <td>{convertToCommaValue(summaryData?.refundCount)}</td>
                        <td>{convertToCommaValue(summaryData?.dailyMinAmount)}</td>
                        <td>{convertToCommaValue(summaryData?.dailyAvgAmount)}</td>
                        <td>{convertToCommaValue(summaryData?.dailyMaxAmount)}</td>
                    </tr>
                </tbody>
            </table>
            <div css={s.graph}>
                <Graph graphData={graphData} showRefund={true} />
            </div>
            <table css={s.subTable}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>자주 팔린 상품</th>
                        <th>개수</th>
                        <th>No</th>
                        <th>매출이 많은 상품</th>
                        <th>금액</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        statisticsDatas?.data?.data?.bestProductsCounts?.map((product, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.productName}</td>
                                <td>{convertToCommaValue(product.productCount)}</td>
                                <td>{index + 1}</td>
                                <td>{statisticsDatas?.data?.data.bestProductsAmounts[index].productName}</td>
                                <td>{convertToCommaValue(statisticsDatas?.data?.data.bestProductsAmounts[index].productPrice)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AdminStatisticsPage;