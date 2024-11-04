/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { instance } from "../../../apis/util/instance";
import SearchBox from "../../../components/admin/SearchBox/SearchBox";
import { MENU_DATAS, STOCK_SEARCH_OPTIONS } from "../../../constants/options";
import Paginate from "../../../components/admin/Paginate/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

function StockManagementPage(props) {

    const limit = 20;

    const [ searchParams, setSearchParams ] = useSearchParams();

    const navigate = useNavigate();

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
                setStockData(success.data.stockList.map(data => ({
                    ...data,
                    isModified: false
                })));
            },
            onError: error => console.log(error),
        }
    );

    const updateStocksMutation = useMutation(
        async () => {
            let requestData = stockData.filter(data => data.isModified === true);
            requestData = requestData.map(data => {
                delete data.isModified
                return data;
            });
            return await instance.put("/admin/products/stock", {modifyStockList: requestData});
        }
    );

    const handleSaveButtonOnClick = () => {
        updateStocksMutation.mutateAsync()
            .then(success => {
                alert("변경되었습니다");
                stockDatas.refetch();
            })
            .catch(error => {
                console.log(error.response);
                alert("변경에 실패하였습니다");
            });
    }

    const handleInputOnEnter = () => {
        navigate(MENU_DATAS[2].address);
        stockDatas.refetch();
    }

    const handleInputOnChange = (e, index) => {
        setStockData(data => {
            const result = [...data];
            result[index] = {
                ...result[index],
                [e.target.name]: e.target.value,
                isModified: true
            };
            return result;
        })
    }

    const handleCheckboxOnChange = (e, index) => {
        setStockData(data => {
            const result = [...data];
            result[index] = {
                ...result[index],
                [e.target.name]: result[index][e.target.name] === 2 ? 1 : 2,
                isModified: true
            };
            console.log(result);
            return result;
        })
    }

    return (
        <>
            <div css={s.header}>
                <span>총 {stockDatas?.data?.data.stockListCount}개의 상품</span>
                <button onClick={handleSaveButtonOnClick}>변경사항 저장</button>
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
                            stockData.map((stock, index) => (
                                <tr key={stock.productId} css={s.productLine(stockData[index].isModified)}>
                                    <td>{stock.productId}</td>
                                    <td>{stock.productName}</td>
                                    <td>
                                        <input type="number" 
                                            name="currentStock" 
                                            value={stock.currentStock} 
                                            onChange={(e) => handleInputOnChange(e, index)} />
                                    </td>
                                    <td>{stock.expectedStock}</td>
                                    <td>
                                        <input type="date"
                                            name="arrivalDate" 
                                            value={stock.arrivalDate}
                                            css={s.dateInput(stock.arrivalDate === "")}
                                            onChange={(e) => handleInputOnChange(e, index)} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            name="arrivalQuantity"
                                            value={stock.arrivalQuantity}
                                            onChange={(e) => handleInputOnChange(e, index)} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            name="minAlertQuantity"
                                            value={stock.minAlertQuantity}
                                            onChange={(e) => handleInputOnChange(e, index)} />
                                    </td>
                                    <td>
                                        <input type="checkbox" 
                                            name="alertSetting" 
                                            checked={stock.alertSetting === 2} 
                                            onChange={(e) => handleCheckboxOnChange(e, index)}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" 
                                            name="outOfStock"
                                            checked={stock.outOfStock === 2}
                                            onChange={(e) => handleCheckboxOnChange(e, index)} />
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