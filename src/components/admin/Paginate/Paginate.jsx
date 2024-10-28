/** @jsxImportSource @emotion/react */
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import * as s from "./style";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function Paginate({ address, totalCount, limit }) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    const [ totalPageCount, setTotalPageCount ] = useState(1);

    const handlePageOnChange = (event) => {
        navigate(`${address}?page=${event.selected + 1}`);
    }

    useEffect(() => {
        setTotalPageCount(
            totalCount % limit === 0
            ? totalCount / limit
            : Math.floor(totalCount / limit) + 1)
    }, [totalCount]);

    return (
        <div css={s.paginateContainer}>
            <ReactPaginate 
                breakLabel = "..."
                previousLabel = {<><IoMdArrowDropleft /></>}
                nextLabel = {<><IoMdArrowDropright /></>}
                pageCount={totalPageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                activeClassName="active"
                onPageChange={handlePageOnChange}
                forcePage={parseInt(searchParams.get("page")) - 1}
            />
        </div>
    );
}

export default Paginate;