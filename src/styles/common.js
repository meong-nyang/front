import { css } from "@emotion/react";
import { BUTTON_COLOR } from "../constants/colors";

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
    }
`;