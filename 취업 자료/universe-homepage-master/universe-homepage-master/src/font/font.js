// ===== Library =====

import { createGlobalStyle } from "styled-components";

// ===== Files =====

import NotoSans from "font/NotoSansKR-Regular.otf"
import BlackHanSans from "font/BlackHanSans-Regular.ttf"
import Esamanru from "font/esamanru/ttf/esamanru_medium.ttf"
import Pretendard from "font/Pretendard/Pretendard-Medium.otf"

// ===== Style =====

const GlobalFonts = createGlobalStyle`

    @font-face {
        font-family: "regular";
        src: url(${NotoSans});
        font-display: block;
    }

    @font-face {
        font-family: "bold";
        src: url(${BlackHanSans});
    }

    @font-face {
        font-family: "esamanru";
        src: url(${Esamanru});
        font-display: block;
    }

    @font-face {
        font-family: "pretendard";
        src: url(${Pretendard})
    }
`

export default GlobalFonts