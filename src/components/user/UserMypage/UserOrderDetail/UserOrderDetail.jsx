import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { PAYMENT_STATUS_LIST } from '../../../../constants/SelectOption';
import UserOrderLayout from '../UserOrderLayout/UserOrderLayout';
import Paginate from '../../../admin/Paginate/Paginate';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../../apis/util/instance';
import { useSearchParams } from 'react-router-dom';

function UserOrderDetail(props) {
    const limit = 10;
    const queryClient = useQueryClient();
    const userInfoData = queryClient.getQueryData("userInfoQuery");
    const [ searchParams, setSearchParams ] = useSearchParams();
    // const [ paymentSelect, setPaymentSelect ] = useState("주문상태");
    const [ inquiryData, setinquiryData ] = useState({
        paymentSelect: "전체",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        searchParams.set("page", "1");
        setSearchParams(searchParams);
    }, []);

    const handleInquiryDataOnChange = (e) => {
        setinquiryData(inquiryData => ({
            ...inquiryData,
            [e.target.name]: e.target.value
        }));
    }

    const orderList = useQuery(
        ["userOrderListQuery", searchParams.get("page")],
        async () => await instance.get("/user/orderlist", {
            params: {
                userId: userInfoData?.data?.id,
                page: searchParams.get("page"),
                limit: limit,
                paymentSelect: inquiryData.paymentSelect,
                startDate: inquiryData.startDate,
                endDate: inquiryData.endDate
            }
        }),
        {
            enabled: !!userInfoData?.data?.id,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

    const orderListCount = useQuery(
        ["userOrderListCountQuery"],
        async () => await instance.get("/user/orderlist/count"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

    const handleInqueryOnClick = () => {
        orderList.refetch();
    }

    return (
        <div css={s.layout}>
            <div css={s.optionLayout}>
                <select css={s.selectBoxStyle} name="paymentSelect" value={inquiryData.paymentSelect} onChange={handleInquiryDataOnChange}>
                {
                    PAYMENT_STATUS_LIST.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                <div css={s.dateSelectLayout}>
                    <input type="date" name='startDate' onChange={handleInquiryDataOnChange}/>
                    <p>~</p>
                    <input type="date" name='endDate' onChange={handleInquiryDataOnChange}/>
                    <button onClick={handleInqueryOnClick}>조회</button>
                </div>
            </div>
            <div css={s.orderListLayout}>
            {
                orderList?.data?.data?.orderList.map(order => 
                    <UserOrderLayout key={order.orderId} orderData={order}/>
                )
            }
            </div>
            <Paginate address={"/user/orderlist"} limit={limit} totalCount={orderListCount?.data?.data}/>
        </div>
    );
}

export default UserOrderDetail;