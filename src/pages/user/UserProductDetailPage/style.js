import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    width: 1000px;
    margin: 20px auto;
    padding: 20px;
    & > div {
        flex-grow: 1;
    }
`;

export const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > img {
        width: 465px;
        height: 465px;
        object-fit: contain; 
        background-color: aliceblue;
    }
`;

export const subImgLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    & > img {
        width: 60px;
        height: 60px;
        margin: 10px;
        object-fit: contain; 
        background-color: aliceblue;
    }
`;

export const detailLayout = css`
    box-sizing: border-box;
    display: flex;
    height: 465px;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 40px;
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0px;
        &:nth-of-type(1) {
            font-size: 25px;
            font-weight: 600;
        }
        &:nth-of-type(3), :nth-last-of-type(2) {
            padding-left: 10px;
            font-size: 16px;
            font-weight: 400;
            & > svg {
                padding-right: 5px;
                font-size: 18px;
                color: #777777;
            }
        }
        &:nth-of-type(2) {
            font-size: 18px;
            font-weight: 600;
            & > svg {
                padding-right: 5px;
                color: #777777;
            }
        }
        &:nth-last-of-type(1) {
            padding: 0;
        }
    }
`;

export const countLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px 0px;
    border-bottom: 2px solid #e0e0e0;
    border-top: 2px solid #e0e0e0;
    & > p {
        display: flex;
        width: 139px;
        font-size: 14px;
        font-weight: 600;
        &:nth-of-type(1) {
            justify-content: flex-start;
        }
        &:nth-last-of-type(1) {
            justify-content: flex-end;
        }
    }
    & > div {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        width: 139px;
        & > input {
            box-sizing: border-box;
            display: flex;
            width: 50px;
            justify-content: center !important;
            align-items: center;
            padding: 0px 10px;
            border: none;
            outline: none;
            font-size: 18px;
            font-weight: 600;
        }
        & > svg {
            font-size: 20px;
            color: #9d6c4c;
        }
    }
`;

export const totalLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px 0px;
    & > p {
        margin-left: 10px;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const buyLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    & > button {
        width: 50%;
        height: 40px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        &:nth-of-type(1) {
            background-color: #D9D9D9;
            color: #777777 ;
            margin-right: 20px;
        }
        &:nth-last-of-type(1) {
            background-color: #9d6c4c;
            color: #ffffff;
            font-weight: 600;
        }
    }

`;