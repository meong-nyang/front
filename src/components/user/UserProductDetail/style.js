import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 260px;
    height: 400px;
    margin: 20px;
    & > div{
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
`;

export const imgLayout = css`
    box-sizing: border-box;
    width: 100%;
    height: 70%;

    & > img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
`;

export const contentLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0px 20px;
    flex-grow: 1;

    & > p {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #777777;

        &:nth-of-type(2) {
            font-size: 14px;
            font-weight: 400;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical
        }
    }
`;

export const addCartButton = css`
    box-sizing: border-box;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: #777777;
    font-weight: 600;
    background-color: #ffffff;
    border-radius: 50%;
    border: none;
    & > svg {
        font-size: 25px;
    }
`;