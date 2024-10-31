/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useQuery } from "react-query";
import { instance } from "../../../apis/util/instance";

function AdminStatisticsPage(props) {

    const todayDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1 < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1;
        const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
        return year + "-" + month + "-" + day;
    }

    const [ selectedDate, setSelectedDate ] = useState({
        startDate: todayDate(),
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
            onSuccess: success => console.log(success),
            onError: error => console.log(error)
        }
    );

    const handleDateInputOnChange = (e) => {
        setSelectedDate(date => ({
            ...date,
            [e.target.name]: e.target.value
        }))
    }

    const handleRefetchOnClick = () => {
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div css={s.graph}>
                그래프자리
            </div>
            <table>
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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AdminStatisticsPage;