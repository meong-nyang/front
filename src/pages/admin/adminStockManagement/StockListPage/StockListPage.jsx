/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { instance } from "../../../../apis/util/instance";
import SearchBox from "../../../../components/admin/SearchBox/SearchBox";
import { MENU_DATAS, STOCK_SEARCH_OPTIONS } from "../../../../constants/options";
import Paginate from "../../../../components/admin/Paginate/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertToCommaValue, convertToNumericValue, onlyNumber } from "../../../../utils/changeStringFormat";

function StockListPage(props) {
    const limit = 20;

    const [ searchParams ] = useSearchParams();

    const navigate = useNavigate();

    const [ stockData, setStockData ] = useState([]);
    const [ searchData, setSearchData ] = useState({
        searchOptionId: "전체",
        searchOptionName: "전체",
        searchValue: ""
    });

    useEffect(() => {
        setSearchData(data => ({
            ...data,
            expectedStock: parseInt(stockData.currentStock) + parseInt(stockData.arrivalQuantity)
        }));
    }, [stockData]);
    
    const stockDatas = useQuery(
        ["stockDataQuery", searchParams.get("page")],
        async () => await instance.get("/admin/products/stock/search", {
            params: {
                page: searchParams.get("page"),
                limit: limit,
                search: searchData.searchValue,
                option: searchData.searchOptionId
            }
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success.data);
            },
            onError: error => console.log(error),
        }
    );

    const handleInputOnEnter = () => {
        navigate(MENU_DATAS[2].address);
        stockDatas.refetch();
    }

    return (
        <>
            <div css={s.header}>
                <span>총 {stockDatas?.data?.data.stockListCount || 0}개</span>
            </div>
            <SearchBox searchOptions={STOCK_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} onEnter={handleInputOnEnter}/>
            <div css={s.tableLayout}>
                <table css={s.mainTable}>
                    <thead>
                        <tr>
                            <th>상품코드</th>
                            <th>상품명</th>
                            <th>현재재고</th>
                            <th>가재고 (현재재고 + 입고예정수량)</th>
                            <th>최소 알림 수량</th>
                            <th>최소 알림 설정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stockDatas?.data?.data.stockList.map((stock) => (
                                <tr key={stock.productId} css={s.productLine} onClick={() => navigate("/admin/stock/detail/" + stock.id)} >
                                    <td>{stock.productId}</td>
                                    <td>{stock.productName}</td>
                                    <td>{convertToCommaValue(stock.currentStock)}</td>
                                    <td>{convertToCommaValue(stock.expectedStock)}</td>
                                    <td>{convertToCommaValue(stock.minAlertQuantity)}</td>
                                    <td>{stock.alertSetting === 2 ? "설정" : "미설정"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Paginate address={"/admin/stock"} totalCount={stockDatas?.data?.data.stockListCount} limit={limit} />
        </>
    );
}

export default StockListPage;