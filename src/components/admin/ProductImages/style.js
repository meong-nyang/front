import { css } from "@emotion/react";

export const images = css`
    display: flex;
    width: 100%;
    height: 100px;

    & > span {
        display: inline-block;
        position: relative;
        margin-right: 20px;
        width: 100px;
        height: 100px;
        cursor: pointer;

        & > svg {
            position: absolute;
            transform: translate(-60%, -40%);
            color: red;
        }
    }

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: #dddddd;
        cursor: pointer;

        & > svg {
            width: 40px;
            height: 40px;
        }
    }

    & img {
        position: relative;
        width: 100%;
        height: 100%;
    }

    &

    & input[type="file"] {
        display: none;
    }
`;