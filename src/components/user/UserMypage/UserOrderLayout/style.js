import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    height: auto;
    width: 880px;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    & > button {
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        background-color: white;
        padding: 5px;
    }
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

export const addressLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;

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

