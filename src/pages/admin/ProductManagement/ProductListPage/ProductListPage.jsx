/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { SEARCH_OPTIONS } from "../../../../constants/testDatas/ProductListDatas";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import SearchBox from "../../../../components/admin/SearchBox/SearchBox";

function ProductListPage() {

    const navigate = useNavigate();

    const [ searchData, setSearchData ] = useState({
        searchOptionId: "all",
        searchOptionName: "전체",
        searchValue: ""
    });
    const [ masterCheckbox, setMasterCheckbox ] = useState(false);
    const [ checkedId, setCheckedId ] = useState(new Set());
    const [ products, setProducts ] = useState({});

    useEffect(() => {
        if (checkedId.size === products.length) {
            setMasterCheckbox(true);
        } else {
            setMasterCheckbox(false);
        }
    }, [checkedId]);

    const productList = useQuery(
        ["productListQuery"],
        async () => await instance.get("/admin/products"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => setProducts(success.data.productList),
            onError: error => console.log(error)
        }
    );

    const handleMasterCheckboxOnChange = (e) => {
        const temp = new Set();
        if (masterCheckbox) {
            setCheckedId(new Set());
            return;
        }
        products.map(product => {
            temp.add(product.id.toString());
        });
        setCheckedId(temp);
    }
    
    const handleCheckboxOnChange = (e) => {
        console.log(checkedId);
        const temp = new Set(checkedId);
        const checkboxId = e.target.name;
        if (temp.has(checkboxId)) {
            temp.delete(checkboxId);
        } else {
            temp.add(checkboxId);
        }
        setCheckedId(temp);
    }

    return (
        <>
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
            <SearchBox searchOptions={SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} />
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
                        productList.data?.data?.productList.map(product => 
                            <tr key={product.id} onClick={() => navigate(`/admin/product/detail/${product.id}`)}>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox"
                                        name={product.id}
                                        onChange={handleCheckboxOnChange}
                                        checked={checkedId.has(product.id.toString())}/>
                                </td>
                                <td>{product.id}</td>
                                <td>{product.petGroup.categoryGroupName + " > " + product.category.categoryName}</td>
                                <td>{product.productName}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.productPrice - product.productPriceDiscount}</td>
                                <td>{product.productMemo}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default ProductListPage;