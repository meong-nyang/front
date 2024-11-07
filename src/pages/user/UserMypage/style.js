import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-grow: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    /* background-color: #FFF5D6; */
    & > p {
        font-size: 25px;
        font-weight: 600;
        color: #9d6c4c;
        margin-bottom: 20px;
    }
`;