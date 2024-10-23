import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
`;

export const signupTitle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    margin: 0 auto;
    color: #777777;

    & > p {
        padding: 20px 0px 30px; 
        font-size: 18px;
        font-weight: 600;
    }
`;

export const signupOrder = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 14px;
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &:nth-of-type(2) {
            padding: 0px 40px;
        }
        & > svg {
            font-size: 25px;
            margin-bottom: 10px;

        }
    }
`;

export const signupContent = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;