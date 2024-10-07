import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h1 {
        margin-bottom: 0px;
    }
`;

export const joinBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 10px;
    width: 55%;
    height: 75%;
    border-radius: 15px;

    

    & > button {
        width: 80%;
        height: 35px;
        border-radius: 10px;
        background-color: #BDCCFF;

        &:hover {
            background-color: #97abeb;
        }

        &:active {
            background-color: #7b95eb;
        }   
    }
`;

export const requiredInformation = css`

`;

export const selectInformation = css`
    display: flex;
    align-items: center;

`;