/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import MainLayout from "../../../../components/admin/MainLayout/MainLayout";
import * as s from "./style";
import { PRODUCTS, SEARCH_OPTIONS } from "../../../../constants/testDatas/ProductListDatas";
import { useNavigate } from "react-router-dom";

function ProductListPage() {

    const products = PRODUCTS;
    const searchOptions = SEARCH_OPTIONS;

    const navigate = useNavigate();

    const [ isOpen , setOpen ] = useState(false);
    const [ searchData, setSearchData ] = useState({
        searchOption: "전체",
        searchValue: ""
    });
    const [ masterCheckbox, setMasterCheckbox ] = useState(false);
    const [ checkedId, setCheckedId ] = useState(new Set());

    useEffect(() => {
        if (checkedId.size === products.length) {
            setMasterCheckbox(true);
        } else {
            setMasterCheckbox(false);
        }
    }, [checkedId]);

    const handleMasterCheckboxOnChange = (e) => {
        const temp = new Set();
        if (masterCheckbox) {
            setCheckedId(new Set());
            return;
        }
        products.map(product => {
            temp.add(product.id);
        });
        setCheckedId(temp);
    }
    
    const handleCheckboxOnChange = (e) => {
        const temp = new Set(checkedId);
        const checkboxId = e.target.name;
        if (temp.has(checkboxId)) {
            temp.delete(checkboxId);
        } else {
            temp.add(checkboxId);
        }
        setCheckedId(temp);
    }
    
    const handleSearchOptionOnClick = () => {
        setOpen(open => !open);
    }

    const handleSearchInputOnChange = (e) => {
        setSearchData(data => ({
            ...data,
            searchValue: e.target.value
        }));
    }

    const handleSearchInputOnKeyDown = (e) => {
        if (e.keyCode === 13) {
            console.log(searchData);
        }
    }

    const handleOptionSelectedOnClick = (option) => {
        setOpen(false);
        setSearchData(data => ({
            ...data,
            searchOption: option.name
        }));
    }

    return (
        <>
            <MainLayout location="상품관리 > 상품목록" css={s.layout}>
                <div css={s.header}>
                    <span>총 10개의 상품</span>
                    <div>
                        {
                            checkedId.size !== 0 &&
                            <button>선택항목 삭제</button>
                        }
                        <button onClick={() => navigate("/admin/product/register")}>상품등록</button>
                    </div>
                </div>
                <div css={s.searchBox}>
                    <button onClick={handleSearchOptionOnClick}>{searchData.searchOption}</button>
                    {
                        isOpen &&
                        <div css={s.searchOptionModal}>
                            {
                                searchOptions.map(option => 
                                    <button key={option.id} onClick={() => handleOptionSelectedOnClick(option)}>
                                        {option.name}
                                    </button>
                                )
                            }
                        </div>
                    }
                    <input type="text"
                        onChange={handleSearchInputOnChange}
                        onKeyDown={handleSearchInputOnKeyDown}
                        value={searchData.searchValue} />
                </div>
                <table css={s.mainTable}>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox"
                                    onChange={handleMasterCheckboxOnChange}
                                    checked={masterCheckbox} />
                            </th>
                            <th>상품코드</th>
                            <th>카테고리</th>
                            <th>상품명</th>
                            <th>단가</th>
                            <th>판매가격</th>
                            <th>메모</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            PRODUCTS.map(product => 
                                <tr key={product.id}>
                                    <td>
                                        <input type="checkbox"
                                            name={product.id}
                                            onChange={handleCheckboxOnChange}
                                            checked={checkedId.has(product.id)}/>
                                    </td>
                                    <td>{product.productCode}</td>
                                    <td>{product.category}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.sellingPrice}</td>
                                    <td>{product.memo}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </MainLayout>
        </>
    );
}

export default ProductListPage;