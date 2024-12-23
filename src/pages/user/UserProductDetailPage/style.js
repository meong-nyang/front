import { css } from "@emotion/react";

export const mainLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 50px 0px;
    background-color: #ffffff;
    overflow: auto;
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
    height: 100%;
    flex-direction: column;
    & > img {
        width: 100%;
        height: 465px;
    }
`;

export const subImgLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    margin-top: 10px;
    flex-wrap: wrap;
    & > img {
        width: 108px;
        height: 108px;
        margin-right: 10px; 
        &:nth-last-of-type(1) {
            margin: 0;
        }
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
            font-size: 16px;
            color: #777777;
        }
        &:nth-of-type(2) {
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
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        & > div {
            display: flex;
            & > p {
                box-sizing: border-box;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                font-size: 14px;
                color: #777777;
                &:nth-last-of-type(1) {
                    margin-left: 10px;
                    font-size: 22px;
                    font-weight: 600;
                }
            }
        }
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

export const discountStyle = css`
    text-decoration: line-through;
`;

export const optionLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
export const countLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
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
        align-items: center;
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

export const detailTabLayout = (tab) =>  css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1200px;
    height: 50px;
    margin: 20px auto;
    padding: 0px 20px;
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 386px;
        height: 100%;
        padding: 10px 0px;
        border: 1px solid #dbdbdb;
        &:nth-of-type(2) {
            border-left: none;
            border-right: none;
        }
        &:nth-of-type(${tab}) {
            border-bottom: none;
            font-weight: 600;
            color: #9d6c4c;
        }
    }
    
`;

export const detailImgLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1200px;
    padding: 20px;
    margin: 0 auto;
    background-color: white;
   
    & > img {
        width: 100%;
    }
`;