/** @jsxImportSource @emotion/react */
import { useQuery, useQueryClient } from "react-query";
import * as s from "./style";
import { instance } from "../../../apis/util/instance";
import { useEffect, useState } from "react";

function CategoryModal({ setOpen, productData, setProductData, setSelectedCategoryName }) {

    const queryClient = useQueryClient();
    const categoryList = queryClient.getQueryData("categoryListQuery");

    const handleRadioOnChange = (e, id, name) => {
        setSelectedCategoryName(selectedName => ({
            ...selectedName,
            [e.target.name]: name
        }))
        setProductData(data => ({
            ...data,
            [e.target.name]: id
        }));
    }

    return (
        <>
            <div css={s.background} onClick={() => {
                setOpen(false);
            }}/>
            <div css={s.layout}>
                <div>
                    <span>대분류</span>
                    {
                        categoryList?.data.petGroupList.map(petGroup => (
                            <div key={petGroup.id}>
                                <input type="radio" id={petGroup.id} name="petGroupId"
                                    checked={petGroup.id === productData.petGroupId}
                                    onChange={(e) => handleRadioOnChange(e, petGroup.id, petGroup.categoryGroupName)}/>
                                <label htmlFor={petGroup.id}>{petGroup.categoryGroupName}</label>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <span>소분류</span>
                    {
                        categoryList?.data.categoryList.map(category => (
                            <div key={category.id}>
                                <input type="radio" id={category.id * 100} name="categoryId"
                                    checked={category.id === productData.categoryId}
                                    onChange={(e) => handleRadioOnChange(e, category.id, category.categoryName)}/>
                                <label htmlFor={category.id * 100}>{category.categoryName}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default CategoryModal;