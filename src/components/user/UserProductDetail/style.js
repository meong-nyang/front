import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 600px;
    margin: 20px;
    & > div{
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
`;

export const imgLayout = css`
    box-sizing: border-box;
    width: 400px;
    height: 400px;

    & > img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: contain; 
        background-color: #777777;
    }
`;

export const contentLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0px 20px;
    flex-grow: 1;

    & > p {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #777777;

        &:nth-of-type(2) {
            font-size: 14px;
            font-weight: 400;
        }
    }
`;

export const addCartButton = css`
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    color: #777777;
    font-weight: 600;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
`;