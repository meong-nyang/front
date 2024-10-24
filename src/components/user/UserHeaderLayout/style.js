import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    padding: 10px 30px;
    width: 100%;
    height: 65px;
    background-color: #FFF5D6;
    color: #777777;

    & > div:nth-of-type(1) {
        width: 206px;
        &  img {
            width: 45px;
            height: 45px;
        }
    }
    & > div:nth-of-type(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        /* margin-left: 160px; */

        & > a {
            margin-right: 50px;
            color: #777777;
            text-decoration: none;
            &:nth-last-of-type(1) {
                margin: 0px;
            }
        }
    }

    & > div:nth-last-of-type(1) {
        display: flex;
        align-items: center;
        font-size: 14px;
        width: 206px;
        & > a {
            margin-right: 20px;
            color: #777777;
            text-decoration: none;
            &:nth-last-of-type(1) {
                margin: 0;
            }
        }
        & svg {
            font-size: 23px;
        }
    }
`;