/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";

import { IoMdArrowDropdown } from "react-icons/io";
import { useQuery, useQueryClient } from "react-query";
import { instance } from "../../../apis/util/instance";
import SearchBox from "../../../components/admin/SearchBox/SearchBox";
import { MENU_DATAS, STOCK_SEARCH_OPTIONS } from "../../../constants/options";
import Paginate from "../../../components/admin/Paginate/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

function StockManagementPage(props) {

    const limit = 10;
    const searchOptions = [];

    const [ searchParams, setSearchParams ] = useSearchParams();

    const navigate = useNavigate();

    const [ isOpen, setOpen ] = useState(false);
    const [ stockData, setStockData ] = useState([]);
    const [ searchData, setSearchData ] = useState({
        searchOptionId: "전체",
        searchOptionName: "전체",
        searchValue: ""
    });
    
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
                setStockData(success.data.stockList);
            },
            onError: error => console.log(error),
        }
    );

    const handleInputOnEnter = () => {
        console.log(searchData.searchValue);
        console.log(searchData.searchOptionId);
        navigate(MENU_DATAS[2].address);
        stockDatas.refetch();
    }

    return (
        <>
            <div css={s.header}>
                <span>총 {stockDatas?.data?.data.stockListCount}개의 상품</span>
                <button>변경사항 저장</button>
            </div>
            <SearchBox searchOptions={STOCK_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} onEnter={handleInputOnEnter}/>
            <div css={s.tableLayout}>
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
                            stockData.map(stock => (
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
            </div>
            <Paginate address={"/admin/stock"} totalCount={stockDatas?.data?.data.stockListCount} limit={limit} />
        </>
    );
}

export default StockManagementPage;