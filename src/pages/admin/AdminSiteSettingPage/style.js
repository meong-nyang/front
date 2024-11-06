import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }
`;

export const title = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    & button {
        margin-left: 5px;
    }
`;

export const information = css`
    display: flex;
    margin-bottom: 50px;

    & input {
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 0px 10px;
        width: calc(100% - 2px);
        height: calc(100% - 2px);

        &:focus {
            outline: 1px solid black;
        }
    }

    & > table {
        border-collapse: collapse;
        width: 100%;

        & th, td {
            text-align: center;
            padding: 0px;
        }

        & th {
            width: 10%;
        }

        & td {
            width: 40%;
        }
    }
`;

export const fileInput = css`
    display: none;
`;

export const imageLayout = (isModify) => css`
    width: 90px;
    height: 90px;

    & > img {
        width: 100%;
        height: 100%;
        cursor: ${isModify ? "pointer" : "default"};
    }
`;

export const notice = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    width: 100%;
    height: 600px;
    font-size: 30px;
`;