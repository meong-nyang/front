import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    width: 1000px;
    height: 500px;
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #e0e0e0;
`;

export const headerLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
    color: #777777;

    & > p {
        font-size: 18px;
        font-weight: 600;
    }

    & > div {
        display: flex;
        align-items: center;

        & > p:nth-of-type(2) {
            font-size: 18px;
            font-weight: 600;
            margin-left: 10px;
        }
    }
`;

export const titleLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        &:nth-of-type(1) {
            width: 478px;
        }
    }
`;

export const contentLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: aliceblue;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 100%;
    }
`;

export const productLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: row !important;
    width: 478px !important;
    & > img {
        width: 50px;
        height: 50px;
        background-color: red;
    }
    & > div {
        display: flex;
        flex-direction: column;
    }
`;