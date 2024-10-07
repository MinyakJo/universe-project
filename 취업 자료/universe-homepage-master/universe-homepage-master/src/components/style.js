// ===== Library =====

import { css } from 'styled-components'

// ===== Code =====

const setFontSize = (value) => {

    const font_size = {
        "extra_small": "14px",
        "small": "15px",
        "small_medium": "16px",
        "small_large": "18px",
        "medium_small": "20px",
        "medium": "22px",
        "medium_large": "24px",
        "large_small": "26px",
        "large_medium": "28px",
        "large": "30px",
        "extra_large": "40px"
    }

    if (value === "extra_small") return font_size.extra_small
    else if (value === "small") return font_size.small
    else if (value === "small_medium") return font_size.small_medium
    else if (value === "small_large") return font_size.small_large
    else if (value === "medium_small") return font_size.medium_small
    else if (value === "medium") return font_size.medium
    else if (value === "medium_large") return font_size.medium_large
    else if (value === "large_small") return font_size.large_small
    else if (value === "large_medium") return font_size.large_medium
    else if (value === "large") return font_size.large
    else if (value === "extra_large") return font_size.extra_large
}

const setColor = (value) => {

    const color = {
        "white": "#FFFFFF",
        "black": "#000000",
        "red" : "#FE5C5C",
        "grey": "#E5E5E5",
        "orange": "#FF5C00",
        "light_orange": "#FE7E48",
        "light_washed_orange": "#FF9344",
        "light_orange2": "#FFF1ED",
        "light_blue": "#DEEBF8",
        "sky_blue": "#94A5F4",
        "purple": "#653FDA",
        "dark_purple": "#2A1764",
        "bk": "#242230",
        "light_grey": "#F3F3F3",
        "dark_grey": "#3A4443",
        "gray1": "#F8F8F8",
        "gray2": "#D7D7D7",
        "gray3": "#6B6B6B",
        "grey1": "#DBDBDB",
        "grey2": "#A5A4A8",
        "grey3": "#7F8193",
        "grey4": "#585469",
        "grey5": "#484456",
        "grey6": "#363342",
        "grey7": "#2D2A39",
        "m_grey": "#999999",
        "admin_bg": "#EFEFEF",
        "none": "#00000000"
    }

    if (value === "white") return color.white
    else if (value === "black") return color.black
    else if (value === "grey") return color.grey
    else if (value === "red") return color.red
    else if (value === "orange") return color.orange
    else if (value === "light_orange") return color.light_orange
    else if (value === "light_orange2") return color.light_orange2
    else if (value === "light_washed_orange") return color.light_washed_orange
    else if (value === "light_blue") return color.light_blue
    else if (value === "sky_blue") return color.sky_blue
    else if (value === "purple") return color.purple
    else if (value === "dark_purple") return color.dark_purple
    else if (value === "main") return color.main
    else if (value === "bk") return color.bk
    else if (value === "light_grey") return color.light_grey
    else if (value === "dark_grey") return color.dark_grey
    else if (value === "gray1") return color.gray1
    else if (value === "gray2") return color.gray2
    else if (value === "gray3") return color.gray3
    else if (value === "grey1") return color.grey1
    else if (value === "grey2") return color.grey2
    else if (value === "grey3") return color.grey3
    else if (value === "grey4") return color.grey4
    else if (value === "grey5") return color.grey5
    else if (value === "grey6") return color.grey6
    else if (value === "grey7") return color.grey7
    else if (value === "m_grey") return color.m_grey
    else if (value === "admin_bg") return color.admin_bg
    else if (value === "none") return color.none
}

const setFlex = (value) => {

    const flex = {
        "row": css`
            display: flex;
            align-items: center;
        `,
        "row_top": css`
            display: flex;
        `,
        "row_bottom": css`
            display: flex;
            align-items: end;
        `,
        "row_center": css`
            display: flex;
            justify-content: center;
            align-items: center;
        `,
        "row_end": css`
            display: flex;
            justify-content: right;
            align-items: center;
        `,
        "row_between": css`
            display: flex;
            justify-content: space-between;
            align-items: center;
        `,
        
        "column": css`
            display: flex;
            flex-direction: column;
            justify-content: center;
        `,
        "column_top": css`
            display: flex;
            flex-direction: column;
        `,
        "column_center": css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `,
        "column_between": css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        `
    }

    if (value === "row") return flex.row
    else if (value === "row_top") return flex.row_top
    else if (value === "row_bottom") return flex.row_bottom
    else if (value === "row_center") return flex.row_center
    else if (value === "row_end") return flex.row_end
    else if (value === "row_between") return flex.row_between
    else if (value === "column") return flex.column
    else if (value === "column_top") return flex.column_top
    else if (value === "column_center") return flex.column_center
    else if (value === "column_between") return flex.column_between
}

const CommonStyle = { setFontSize, setColor, setFlex }

export default CommonStyle