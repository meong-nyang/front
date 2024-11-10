/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../../apis/util/instance";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { alwaysNumber, convertToCommaValue, convertToNumericValue, onlyNumber } from "../../../../utils/changeStringFormat";

function StockDetailPage(props) {

    const tomorrowDate = () => {
        const tomorrow = new Date().getTime() + 86400000;
        return new Date(tomorrow).toISOString().replace("T", " ").substring(0, 10);
    };

    const countInputRef = useRef();
    
    const params = useParams();
    
    const emptyInputData = {
        stockId: params.id,
        count: 0,
        arrivalDate: tomorrowDate(),
        currentStock: 0,
        expectedStock: 0
    }
    
    const [ inputData, setInputData ] = useState(emptyInputData);
    const [ alertData, setAlertData ] = useState({
        stockId: params.id,
        minAlertQuantity: 0,
        alertSetting: 0
    });

    const stockDetailData = useQuery(
        ["stockDetailDataQuery"],
        async () => await instance.get("admin/products/stock/detail/" + params.id),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success);
                setInputData(data => ({
                    ...data,
                    currentStock: success.data.currentStock,
                    expectedStock: success.data.expectedStock
                }));
                setAlertData(data => ({
                    ...data,
                    minAlertQuantity: success.data.minAlertQuantity,
                    alertSetting: success.data.alertSetting
                }))
            },
            onError: error => console.log(error.response)
        }
    );

    const stockRequestMutation = useMutation(
        async () => {
            const requestData = inputData;
            requestData.expectedStock += parseInt(requestData.count);
            return await instance.post("/admin/products/stock/detail", requestData)
        }
    );

    const stockStatusMutation = useMutation(
        async (data) => await instance.put("/admin/products/stock/status", data)
    )

    const alertMutation = useMutation(
        async () => await instance.put("/admin/products/stock/alert", alertData),
        {
            onSuccess: success => {
                alert("저장 성공!");
                stockDetailData.refetch();
            },
            onError: error => alert("저장 실패")
        }
    );

    const handleMinAlertCheckboxOnChange = (e) => {
        console.log(e.target.checked ? 2 : 1);
        setAlertData(data => ({
            ...data,
            alertSetting: e.target.checked ? 2 : 1
        }));
    }

    const handleMinAlertQuantityOnChange = (e) => {
        const value = convertToNumericValue(e.target.value);
        setAlertData(data => ({
            ...data,
            [e.target.name]: alwaysNumber(value)
        }));
    }

    const handleNumberInputOnchange = (e) => {
        const value = convertToNumericValue(e.target.value);
        setInputData(data => ({
            ...data,
            [e.target.name]: alwaysNumber(value)
        }))
    }

    const handleDateInputOnChange = (e) => {
        if (e.target.value === "") {
            setInputData(data => ({
                ...data,
                arrivalDate: tomorrowDate()
            }));
            return;
        }

        const tomorrowMillis = new Date().getTime() + 86400000;
        const inputMillis = new Date(e.target.value).getTime();

        if (tomorrowMillis >= inputMillis) {
            alert("입고예정일자는 내일부터 선택가능합니다.")
            return;
        }

        setInputData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const handleSaveAlertButtonOnClick = () => {
        alertMutation.mutateAsync().catch(() => {});
    }

    const handleButtonOnClick = () => {
        if (inputData.count <= 0) {
            alert("주문 수량은 1이상이어야 합니다.");
            countInputRef.current.focus();
            return;
        }

        if (window.confirm("신청하시겠습니까?")) {
            stockRequestMutation.mutateAsync()
                .then(success => {
                    alert("신청되었습니다.");
                    setInputData(emptyInputData);
                    stockDetailData.refetch();
                }).catch(error => console.log(error));
        }
    }

    const handleStockConfirmOnClick = (id, count) => {
        if (window.confirm("확정하시겠습니까?")) {
            const data = {
                id: id,
                stockId: params.id,
                count: count,
                status: "확정"
            }
            stockStatusMutation.mutateAsync(data)
                .then(success => {
                    alert("확정되었습니다.");
                    stockDetailData.refetch();
                })
                .catch(error => alert("에러"));
        }
    }

    const handleStockCancelOnClick = (id, count) => {
        if (window.confirm("취소하시겠습니까?")) {
            const data = {
                id: id,
                stockId: params.id,
                count: count,
                status: "취소"
            }
            stockStatusMutation.mutateAsync(data)
                .then(success => {
                    alert("취소되었습니다.");
                    stockDetailData.refetch();
                })
                .catch(error => alert("에러"));
        }
    }

    return (
        <div css={s.layout}>
            <div css={s.container}>
                <div css={s.stockHeader}>
                    <span>재고현황</span>
                    <button onClick={handleSaveAlertButtonOnClick}>알림 설정 저장</button>
                </div>
                <table css={s.infoTable}>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td colSpan={5}>{stockDetailData?.data?.data.productName}</td>
                        </tr>
                        <tr>
                            <th>현재재고</th>
                            <td>{convertToCommaValue(stockDetailData?.data?.data.currentStock)}</td>
                            <th>가재고</th>
                            <td>{convertToCommaValue(stockDetailData?.data?.data.expectedStock)}</td>
                        </tr>
                        <tr css={s.inputAlert}>
                            <th>최소 알림 신청</th>
                            <td>
                                <input type="checkbox"
                                    checked={alertData.alertSetting === 2}
                                    onChange={handleMinAlertCheckboxOnChange} />
                            </td>
                            <th>최소 알림 수량</th>
                            <td>
                                <input type="text"
                                    name="minAlertQuantity"
                                    value={convertToCommaValue(alertData.minAlertQuantity)}
                                    onChange={handleMinAlertQuantityOnChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <span>입고 신청</span>
                <div css={s.headerInput}>
                    <span>주문 수량</span>
                    <input type="text" ref={countInputRef} name="count" value={convertToCommaValue(inputData.count)} onChange={handleNumberInputOnchange}/>
                    <span>입고 예정 일자</span>
                    <input type="date" name="arrivalDate" value={inputData.arrivalDate} onChange={handleDateInputOnChange}/>
                    <button onClick={handleButtonOnClick}>입고 신청</button>
                </div>
                <div css={s.inbound}>
                    <table css={s.table}>
                        <thead>
                            <tr>
                                <th>신청일자</th>
                                <th>주문수량</th>
                                <th>도착 예정일</th>
                                <th>재고확정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stockDetailData.data && !stockDetailData.isFetching &&
                                stockDetailData.data.data.stockDetailList.map(data => 
                                    <tr key={data.id}>
                                        <td>{data.createDate}</td>
                                        <td>{data.arrivalQuantity}</td>
                                        <td>{data.arrivalDate}</td>
                                        <td>
                                            <button onClick={() => handleStockConfirmOnClick(data.id, data.arrivalQuantity)}>확정</button>
                                            <button onClick={() => handleStockCancelOnClick(data.id, data.arrivalQuantity)}>취소</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div css={s.container}>
                <div css={s.inoutHistory}>
                    <span>입고 기록</span>
                    <table>
                        <thead>
                            <tr>
                                <th>일자</th>
                                <th>수량</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stockDetailData.data && !stockDetailData.isFetching &&
                                stockDetailData.data.data.incommingList.map(data => 
                                    <tr key={data.id}>
                                        <td>{data.arrivalDate}</td>
                                        <td>{convertToCommaValue(data.arrivalQuantity)}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
    );
}

export default StockDetailPage;