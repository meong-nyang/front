import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }
`;

export const information = css`
    display: flex;
    width: 100%;
    margin-bottom: 50px;
    
    & > img {
        width: 90px;
        height: 90px;
    }

    & > table {
        border-collapse: collapse;
        width: 100%;

        & th, td {
            text-align: center;
        }

        & th {
            width: 10%;
        }

        & td {
            width: 40%;
        }
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