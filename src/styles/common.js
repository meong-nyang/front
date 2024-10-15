import { css } from "@emotion/react";
import { ADMIN_PAGE_COLORS, BUTTON_COLOR } from "../constants/colors";

export const reset = css`
    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    button {
        border: none;
        outline: none;
        background-color: ${BUTTON_COLOR};
        width: 120px;
        height: 30px;
        cursor: pointer;
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