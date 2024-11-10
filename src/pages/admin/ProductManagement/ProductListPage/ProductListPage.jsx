/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../../../apis/util/instance";
import SearchBox from "../../../../components/admin/SearchBox/SearchBox";
import { PRODUCT_SEARCH_OPTIONS } from "../../../../constants/options";
import Paginate from "../../../../components/admin/Paginate/Paginate";
import { convertToCommaValue } from "../../../../utils/changeStringFormat";

function ProductListPage() {

    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const limit = 20;

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
        ["productListQuery", searchParams.get("page")],
        async () => await instance.get("/admin/products/search", {
            params: {
                page: searchParams.get("page"),
                limit: limit,
                option: searchData.searchOptionId,
                search: searchData.searchValue
            }
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                console.log(success.data);
                setProducts(success.data.productList)
            },
            onError: error => console.log(error)
        }
    );

    const deleteProductsMutation = useMutation(
        async () => {
            const arr = Array.from(checkedId);
            let str = "productIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.delete(`/admin/products?${str}`)
        }
    );

    const handleDeleteButtonOnClick = () => {
        if(checkedId.size === 0) {
            alert("삭제할 항목이 없습니다.");
            return;
        }
        if(window.confirm("정말 삭제하시겠습니까?")) {
            deleteProductsMutation.mutateAsync()
                .then(success => {
                    alert("삭제되었습니다.");
                    productList.refetch();
                })
                .catch(error => {
                    alert("알수 없는 이유로 삭제에 실패하였습니다.");
                    console.log(error.response);
                });
        }
    }

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
                <span>총 {productList?.data?.data.productListCount || 0}개</span>
                <div>
                    <button onClick={handleDeleteButtonOnClick}>선택항목 삭제</button>
                    <button onClick={() => navigate("/admin/product/register")}>상품등록</button>
                </div>
            </div>
            <SearchBox searchOptions={PRODUCT_SEARCH_OPTIONS} searchData={searchData} setSearchData={setSearchData} onEnter={() => productList.refetch()}/>
            <div css={s.tableLayout}>
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
                            productList?.data?.data.productList.map(product => 
                                <tr key={product.id} css={s.trHover}
                                    onClick={() => navigate(`/admin/product/detail/${product.id}`)}>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox"
                                            name={product.id}
                                            onChange={handleCheckboxOnChange}
                                            checked={checkedId.has(product.id.toString())}/>
                                    </td>
                                    <td>{product.id}</td>
                                    <td>{product.petGroup.categoryGroupName + " > " + product.category.categoryName}</td>
                                    <td>{product.productName}</td>
                                    <td>{convertToCommaValue(product.productPrice)}</td>
                                    <td>{convertToCommaValue(product.productPrice - product.productPriceDiscount)}</td>
                                    <td>{product.productMemo}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Paginate address={"/admin/product/list"} totalCount={productList?.data?.data.productListCount} limit={limit} />
        </>
    );
}

export default ProductListPage;