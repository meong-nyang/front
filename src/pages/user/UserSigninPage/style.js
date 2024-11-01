import { css } from "@emotion/react";

export const layout = css`
   box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-grow: 1;
`;

export const signinContainer = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 600px;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 5px 5px 20px #00000028;

    & > div {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        width: 500px;
        height: 100%;
        & > img {
            box-sizing: border-box;
            width: 300px;
            margin: 0px auto;
        }

        &:nth-of-type(1) {
            border-top-right-radius: 100px;
            border-bottom-right-radius: 0px;
            background-color: #FFF5D6;
        }
        &:nth-of-type(2) {
            border-bottom-left-radius: 0px;
        }
    }
`;

export const signinBox = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 100px;
    background-color: #ffffff;
    padding: 50px;

    & > p {
        padding-top: 30px;
        font-size: 30px;
        font-weight: 600;
        color: #777777;
        font-family: "HakgyoansimDunggeunmisoTTF-B";
        @font-face {
            font-family: 'HakgyoansimDunggeunmisoTTF-B';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
        }
    }

    & > div {
        display: flex;
        flex-direction: column;
        margin-top: 100px;
    }
`;
export const back = css`
    box-sizing: border-box;
    width: 100%;
    background-color: #FFF5D6;
`;

export const inputBox = css`
    box-sizing: border-box;
    width: 100%;
    color: #777777;
    
    & > div:nth-last-of-type(1) {
        display: flex;
        justify-content: flex-end;
        width: 100%;
       & > p {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
        }
    }

    & > input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        outline: none;
    }

    & > button {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        margin-top: 15px;
        border: none;
        border-radius: 5px;
        background-color: #FFF5D6;
    }
`;

export const userInfoTag = css`
    display: flex;
    box-sizing: border-box;
    color: #777777;

    & > p:nth-of-type(1) {
        margin: 10px 0px 7px ;
        font-size: 14px;
        font-weight: 600;
    }

    & > p:nth-last-of-type(1) {
        margin-top: 10px;
        margin-left: 12px;
        font-size: 14px;
        color: red;
    }
`;

export const snsBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
    width: 100%;
    
    & > p {
        color: #777777;
        font-size: 14px;
        font-weight: 600;
    }

    & > div {
        
    }
`;

export const linkBox = css`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 35px;
        width: 100%;

        & > a {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            color: #FFB69C;

            &:nth-of-type(1) {
                width: 50px;
                height: 50px;
                /* border: 1px solid #e0e0e0;
                border-radius: 5px; */
                & > svg {
                    font-size: 33px;
                }
            }
                
            &:nth-of-type(2) {
                width: 50px;
                height: 50px;
                margin: 30px;
                /* background-color: #FAE100;
                border-radius: 5px; */
                & > svg {
                    font-size: 42px;
                }
            }
            &:nth-of-type(3) {
                width: 50px;
                height: 50px;
                /* background-color: #03C75A;
                border-radius: 5px; */
                & > svg {
                    font-size: 29px;
                }
            }
        }
`;
