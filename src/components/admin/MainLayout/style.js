import { css } from "@emotion/react";
import { ADMIN_PAGE_COLORS, BUTTON_COLOR } from "../../../constants/colors";

export const layout = css`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const logo = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 10px;

    & > img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    & > span {
        font-size: 24px;
        cursor: default;
    }
`;

export const menuList = (selectedMenu) => css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 200px;
    height: 100%;

    & > div {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        width: 100%;
        height: 60px;
    }

    & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-top: none;
        width: 100%;
        height: 60px;
        font-size: 16px;
        text-decoration: none;
        color: #000000;
    }

    & > a:hover {
        background-color: #efefef;
    }

    & > a:nth-of-type(${selectedMenu}) {
        font-weight: 600;
    }
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    & > header {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 20px;
        width: 1650px;
        height: 40px;
        font-size: 14px;
    }

    & > main {
        width: 1650px;
        height: 700px;
        box-sizing: border-box;
        padding-left: 20px;
        padding-top: 20px;
    }
    
    img {
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    button {
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;

        border: none;
        outline: none;
        background-color: ${BUTTON_COLOR};
        width: 120px;
        height: 30px;
        cursor: pointer;

        &:hover {
            background-color: #c4c4c4;
        }

        &:active {
            background-color: #878787;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        box-sizing: border-box;
        border: 1px solid black;
        font-size: 16px;
        height: 30px;
    }

    th {
        width: 10%;
        font-weight: 500;
        background-color: ${ADMIN_PAGE_COLORS.tableTitleBg};
    }

    td {
        width: 15%;
        padding: 0px 10px;
    }
`;

export const head = css`
    display: flex;
    justify-content: space-between;
`;

export const logout = css`
    display: flex;
    align-items: center;

    & > button {
        margin-left: 20px;
        background-color: white;
        width: auto;
        height: auto;

        &:hover, &:active {
            background-color: white;
            text-decoration: underline;
        }
    }
`;