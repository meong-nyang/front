import { css } from "@emotion/react";

export const reset = css`

    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'IBMPlexSansKR-Regular';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: 'IBMPlexSansKR-Regular';
    }
    p, label {
        margin: 0;
        padding: 0;
    }
    button {
        cursor: pointer;
        font-size: 14px;
        font-family: 'IBMPlexSansKR-Regular';
    }

    textarea, input {
        font-family: 'IBMPlexSansKR-Regular';
    }

    p {
        cursor: default;
    }
`;