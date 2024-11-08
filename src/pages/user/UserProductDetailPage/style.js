import { css } from "@emotion/react";

export const mainLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const categoryLayout = css`
     & > p {
        box-sizing: border-box;
        width: 1200px;
        padding: 20px;
        margin: 0 auto;
        font-size: 16px;
        font-weight: 600;
    }
`;

export const layout = css`
    box-sizing: border-box;
    display: flex;
    width: 1200px;
    margin: 0 auto;
    padding: 20px;
    padding-top: 0px;
    & > div {
        flex-grow: 1;
    }
`;

export const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 540px;
    height: 465px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > img {
        width: 100%;
        height: 100%;
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
    width: 540px;
    height: 465px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-left: 40px;
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-of-type(1) {
            font-size: 25px;
            font-weight: 600;
        }
        &:nth-last-of-type(1) {
            padding: 0;
        }
    }
`;

export const priceLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* & > p {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 22px;
        font-weight: 600;
        padding-bottom: 10px;
        & > svg {
            padding-right: 5px;
            color: #777777;
        }
        &:nth-of-type(1) {
            font-size: 18px;
            color: red;
        }
        &:nth-last-of-type(1) {
            font-size: 14px;
            font-weight: 400;
            color: #777777;
        }
    } */
    & > p {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 14px;
        color: #777777;
    }
    & > div {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        & > p {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-weight: 600;
            &:nth-of-type(1) {
                color: red;
                font-size: 18px;
            }
            & > svg {
                padding-right: 5px;
                color: #777777;
            }
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
            text-align: center;
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