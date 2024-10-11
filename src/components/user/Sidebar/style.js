import { css } from "@emotion/react";

export const layout = (isShow) => css`
    position: absolute;
    top: ${isShow ? 0 : -101}%;
    transition: all 0.5s ease-in-out;
    box-sizing: border-box;
    width: 15%;
    height: 90%;
    background-color: white;
    box-shadow: 1px 0px 3px #00000055;
`;