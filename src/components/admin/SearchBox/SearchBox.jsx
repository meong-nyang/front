/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

function SearchBox({ searchOptions, searchData, setSearchData }) {

    const [ isOpen, setOpen ] = useState(false);

    const handleOptionSelectedOnClick = (option) => {
        setOpen(false);
        setSearchData(data => ({
            ...data,
            searchOptionId: option.id,
            searchOptionName: option.name
        }));
    }

    const handleInputOnChange = (e) => {
        setSearchData(data => ({
            ...data,
            searchValue: e.target.value
        }));
        console.log(searchData);
    }

    return (
        <div css={s.searchBox}>
            <div>
                <button onClick={() => setOpen(true)}>{searchData.searchOptionName}</button>
                <IoMdArrowDropdown />
            </div>
            {
                isOpen &&
                <>
                    <span onClick={() => setOpen(false)}/>
                    <div css={s.searchOptionModal}>
                        {
                            searchOptions.map(option => 
                                <button key={option.id} onClick={() => handleOptionSelectedOnClick(option)}>
                                    {option.name}
                                </button>
                            )
                        }
                    </div>
                </>
            }
            <input type="text"
                onChange={handleInputOnChange}
                value={searchData.searchValue}/>
        </div>
    );
}

export default SearchBox;