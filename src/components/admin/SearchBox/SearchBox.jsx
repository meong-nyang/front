/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function SearchBox({ searchOptions, searchData, setSearchData, onEnter }) {

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
    }

    const handleInputOnKeyDown = (e) => {
        if(e.keyCode === 13) {
            onEnter();
        }
    }

    return (
        <div css={s.searchBox}>
            <div>
                <button onClick={() => setOpen(data => !data)}>{searchData.searchOptionName}</button>
                {
                    isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />
                }
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
                onKeyDown={handleInputOnKeyDown}
                value={searchData.searchValue}/>
        </div>
    );
}

export default SearchBox;