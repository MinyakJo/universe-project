import React, { Suspense, useEffect, useRef } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import Button from "components/common/Button"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { dialogState } from "../../recoil/dialogAtom"
import xButton from "../../svg/x.svg"
import Review from "components/component/dialog/Review"
import Report from "components/component/dialog/Report"
import Patent from "components/component/dialog/Patent"
import Purchase from "components/component/dialog/Purchase"
import Password from "components/component/dialog/Password"
import Phone from "components/component/dialog/Phone"
import BirthDate from "components/component/dialog/BirthDate"
import Profile from "components/component/dialog/Profile"
import Grade from "components/component/dialog/Grade"
import Alert from "components/component/dialog/Alert"
import FindId from "components/component/dialog/FindId"
import Popup from "components/component/dialog/Popup"
import { isMobileState } from "recoil/mainAtom"
import Spinner from "components/component/Spinner"
import Video from "components/component/dialog/Video"

const Div = styled(commonDiv)`
    display: ${props=> {
        return props.display ? props.display : null
    }};
    position: ${props => {
        return props.position ? props.position : null
    }};
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
    top: ${props => {
        return props.top ? props.top : null
    }};
    bottom: ${props => {
        return props.bottom ? props.bottom : null
    }};
    left: ${props => {
        return props.left ? props.left : null
    }};
    right: ${props => {
        return props.right ? props.right : null
    }}; 
    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};
    justify-content: ${props => {
        return props.justify ? props.justify : null
    }};
    align-items: ${props => {
        return props.align ? props.align : null
    }};
    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};
    min-height: ${props => {
        return props.height ? props.height : null
    }};
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
    overflow: ${props => {
        return props.overflow ? props.overflow : null
    }};
    overflow-y: ${props => {
        return props.overflowY ? props.overflowY : null
    }};
    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};
    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};

    &::-webkit-scrollbar{
        width: ${props => {
            return props.scrollWidth ? props.scrollWidth : "6px"
        }};
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: ${CommonStyle.setColor("grey1")}
    }
`

const Background = styled.div`
    top: 0;
    display: ${props => {
        return props.display ? props.display : null
    }};
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${props => {
        return props.padding ? props.padding : null
    }};
    background-color: rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    z-index: 8;
`

const Img = styled.img`
    object-fit: ${props => {
        return props.fit ? props.fit : "contain"
    }};
    width: 100%;

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const ContentsBox = styled(Div)`
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 3px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #D9D9D9;
    }
`

const Contents = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

const TextAreaBox = styled(Div)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : `1px solid ${CommonStyle.setColor("bk")}`
    }};
    border-radius: ${props => {
        return props.radius ? props.radius : null
    }};
    height: 100%;
    overflow: hidden;
`

const TextArea = styled.textarea`
    width: ${props => {
        return props.width ? props.width : "100%"
    }};
    height: ${props => {
        return props.height ? props.height : "100%"
    }};
    padding: ${props => {
        return props.padding ? props.padding : null
    }};
    padding-right: ${props => {
        return props.paddingRight ? props.paddingRight : null
    }};
    margin-right: ${props => {
        return props.marginRight ? props.marginRight : null
    }};
    font-size: ${props => {
        return props.size ? `${CommonStyle.setFontSize(props.size)}` : null
    }};
    color: ${props => {
        return props.color ? `${CommonStyle.setColor(props.color)}` : null
    }};
    font-weight: ${props => {
        return props.weight ? props.weight : null
    }};
    font-family: ${props => {
        return props.family ? props.family : "regular"
    }};
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight: null
    }};
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : `1px solid ${CommonStyle.setColor("gray3")}`
    }};
    border-radius: 4px;
    
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    resize: none;
    margin-right: 8px;
    &::placeholder{
        color: ${props => {
            return props.placeColor ? `${CommonStyle.setColor(props.placeColor)}` : `${CommonStyle.setColor("grey1")}`
        }};
    }
    &:focus{
        outline: ${props => {
            return props.outline ? `1px solid ${CommonStyle.setColor(props.outline)}` : `1px solid ${CommonStyle.setColor("bk")}`
        }};
    }
    &::-webkit-scrollbar{
        width: 3px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #D9D9D9;
    }
`

const Input = styled.input`
    width: ${props => {
        return props.width ? props.width : "100%"
    }};
    height: ${props => {
        return props.height ? props.height : "100%"
    }};
    padding: ${props => {
        return props.padding ? props.padding : props.isMobile ? "15px 16px" : "12px 20px"
    }};
    padding-right: ${props => {
        return props.paddingRight ? props.paddingRight : null
    }};
    font-size: ${props => {
        return props.size ? 
            `${CommonStyle.setFontSize(props.size)}` : 
            props.isMobile ? 
            `${CommonStyle.setFontSize("small")}` : 
            `${CommonStyle.setFontSize("small_medium")}`
    }};
    color: ${props => {
        return props.color ? `${CommonStyle.setColor(props.color)}` : null
    }};
    font-weight: ${props => {
        return props.weight ? props.weight : "500"
    }};
    font-family: ${props => {
        return props.family ? props.family : "regular"
    }};
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight: "130%"
    }};
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : `1px solid ${CommonStyle.setColor("gray3")}`
    }};
    border-radius: 4px;
    box-sizing: border-box;

    &::placeholder{
        color: ${props => {
            return props.placeColor ? `${CommonStyle.setColor(props.placeColor)}` : `${CommonStyle.setColor("grey1")}`
        }};
    }
    &:focus{
        outline: 1px solid ${CommonStyle.setColor("bk")};
    }
`

const GuideBox = styled(Div)`
    margin-bottom: ${props => {
        return props.isMobile ? "7px" : "12px" 
    }};
`

const Guide = styled(P)`
    font-weight: 500;
    line-height: 130%;
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("small")}` : `${CommonStyle.setFontSize("small_medium")}`
    }};
    color: ${({ color }) => {
        return color ? CommonStyle.setColor( color ) : CommonStyle.setColor( "bk" ) 
    }};
`

const GuideAndInputBox = styled(Div)`
    ${CommonStyle.setFlex("column")};
    margin-bottom: ${props => {
        return props.end ? null : "17px"
    }};
`

const Title = styled(H1)`
    font-family: "esamanru";
    font-weight: 500;
    font-size: ${props => {
        return props.isMobile ? `${CommonStyle.setFontSize("medium_small")}` : `${CommonStyle.setFontSize("large_small")}`
    }};
    line-height: 200%;
`

const TitleBox = styled(Div)`
    ${CommonStyle.setFlex("row_center")};
    margin-bottom: ${props => {
        return props.isMobile ? "26px" : "50px"
    }};
`

const StyledDialog = styled(Div)`
    ${CommonStyle.setFlex("column")};
    padding: ${props => { 
        return props.isMobile ? "32px 20px" : "56px 40px"
    }};
    padding-bottom: 0px;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

export { Div, Button, Img, TextArea, TextAreaBox, ContentsBox, Contents, Title, TitleBox, Input, GuideBox, Guide, GuideAndInputBox, StyledDialog, Span }


const Dialog = () => {

    const ref = useRef()
    const dialog = useRecoilValue(dialogState)
    const reset = useResetRecoilState(dialogState)
    const tt = dialog.textType
    const bt = dialog.btnType
    const data = dialog.data
    const isMobile = useRecoilValue(isMobileState)

    const onKeyUpEvent = (e) => {
        if(e.keyCode === 27){
            reset()
        }
    }

    useEffect(() => {
        ref.current.focus()
    }, [ dialog ])

    return(
        <Background padding={ !isMobile ? null : "0px 20px" } ref={ref} tabIndex={-1} display={ dialog.isOpen ? "flex" : "none" } onKeyUp={onKeyUpEvent}>
            <Suspense fallback={ <Div width="150px"><Spinner/></Div> }>
                {
                    tt === "video" ?
                    <Video reset={reset}>
                        { data }
                    </Video>:
                    tt === "review" ?
                    <Review reset={reset} isMobile={isMobile}>
                        { data }
                    </Review>:
                    tt === "report" ?
                    <Report reset={reset} isMobile={isMobile}>
                        { data }
                    </Report>:
                    tt === "patent" ?
                    <Patent reset={reset} isMobile={isMobile}>
                        { data }
                    </Patent>:
                    tt === "purchase" ?
                    <Purchase reset={reset} isMobile={isMobile}>
                        { data }
                    </Purchase>:
                    tt === "pw" ?
                    <Password reset={reset} isMobile={isMobile}>
                        { bt }
                    </Password>:
                    tt === "tel" ?
                    <Phone reset={reset} isMobile={isMobile}>
                        { bt }
                    </Phone>:
                    tt === "birthDate" ?
                    <BirthDate reset={reset} isMobile={isMobile}>
                        {{
                            bt: bt,
                            data: data,
                        }}
                    </BirthDate>:
                    tt === "profile" ?
                    <Profile reset={reset} isMobile={isMobile}>
                        {{
                            bt: bt,
                            data: data,
                        }}
                    </Profile>:
                    tt === "grade" ?
                    <Grade reset={reset} isMobile={isMobile}>
                        {{
                            bt: bt,
                            data: data
                        }}
                    </Grade>:
                    tt === "findId" ?
                    <FindId reset={reset} isMobile={isMobile}>
                        {{
                            data: data,
                            bt: bt
                        }}
                    </FindId>:
                    tt === "alert" ?
                    <Alert reset={reset} isMobile={isMobile}>
                        {{
                            bt: bt,
                            data: data,
                        }}
                    </Alert>:
                    tt === "popup" ?
                    <Popup reset={reset} isMobile={isMobile}>
                        { data }
                    </Popup>:
                    <></>
                }
            </Suspense>
        </Background>
    )
}

export const CloseButton = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div 
            position="absolute" 
            top={ !props.none ? "-64px" : null } 
            right={ !props.none ? "0px" : null } 
            display="flex" 
            width={ !isMobile ? "44px" : "30px" } 
            height={ !isMobile ? "44px" : "30px" }
        >
            <Button backgroundColor="none" id="close">
                <Img id={ props.id ? props.id : "close" } fit="contain" src={xButton}/>
            </Button>
        </Div>
    )
}

export const ButtonComponent = (props) => {
    const type = props.children.type
    const id = props.children.id
    const text = props.children?.text
    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex="row" height={ !isMobile ? "66px" : "50px" }  marginTop={ !isMobile ? "60px" : "40px" }>
            {
                Number(type) > 0 &&
                <Div 
                    flex="row_center" 
                    backgroundColor="orange" 
                    height="100%"
                    radius={ Number(type) > 1 ? "0px 0px 0px 20px" : "0px 0px 20px 20px" }
                >
                    <Button 
                        id={ !Array.isArray(id) ? id : id[0] } 
                        color="white" 
                        weight="500" 
                        size={ !isMobile ? "small_large" : "extra_small" }
                    >
                        {
                            !Array.isArray(id) ?
                            <>
                                {
                                    props.change?
                                    "변경":
                                    props.save?
                                    "저장":
                                    "확인"
                                }
                            </>:
                            text[0]
                        }
                    </Button>
                </Div>
            }
            {
                Number(type) > 1 &&
                <Div 
                    flex="row_center" 
                    backgroundColor="grey1"
                    height="100%"
                    radius="0px 0px 20px 0px"
                >
                    <Button 
                        id={ !Array.isArray(id) ? "close" : id[1] }
                        color="grey4" 
                        weight="500" 
                        size={ !isMobile ? "small_large" : "extra_small" }
                    >
                        {
                            !Array.isArray(id) ?
                            "취소":
                            text[1]
                        }
                    </Button>
                </Div>
            }
        </Div>
    )
}

export default Dialog