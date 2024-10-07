import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonH1 from "components/common/H1"
import commonP from "components/common/P"
import commonButton from "components/common/Button"
import { star } from "../../container/passes_page/PassReview"
import thumbs_up from "../../../svg/thumbs_up.svg"
import small_thumbs_up from "../../../svg/small_thumbs_up.svg"
import siren from "../../../svg/siren.svg"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { dialogState } from "../../../recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"
import Img from "components/common/Img"
import { useCookies } from "react-cookie"
import default_profile from "../../../svg/default_profile.svg"
import { loginAlert } from "modules/loginAlert"


const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};

    cursor: ${({ cursor }) => {
        return cursor ? cursor : "pointer"
    }};
`

const H1 = styled(commonH1)`
    cursor: pointer;
`

const P = styled(commonP)`
    cursor: ${props => {
        return props.cursor ? props.cursor : "pointer"
    }};
    white-space: nowrap;
`

const Contents = styled(commonP)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3 ;
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
    cursor: pointer;
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Review = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children
    const setDialog = useSetRecoilState(dialogState)
    const [ cookies ] = useCookies([ "token" ])

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "review":
            case "report":
                if( ( id === "report" ) && !cookies.token ) loginAlert( setDialog, cookies.token )
                else{
                    setDialog({
                        isOpen: true,
                        textType: id,
                        data: data
                    })
                }
                return
            case "like":
                return
            default:
        }
    }

    return(
        <Div flex="column_top" marginBottom="20px" paddingBottom={ !isMobile ? "35px" : "10px" } borderBottom="grey1" onClick={onClickEvent} id="review">

            {/* 리뷰 프로필 */}
            <Div flex="row_between" marginBottom="20px" id="review">

                {/* 프로필, 이름, 별점 */}
                <Div flex="row" id="review">

                    {/* 프로필 */}
                    <Div 
                        flex="row_center"
                        width={ props.course  && !isMobile ? "72px" : "29.45px" } 
                        minWidth={ props.course  && !isMobile ? "72px" : "29.45px" } 
                        height={ props.course && !isMobile ? "72px" : "29.45px" } 
                        marginRight={ props.course && !isMobile ? "16px" : !isMobile ? "10px" : "4px" }
                        backgroundColor="white"
                        radius="50%"
                        overflow="hidden"
                    >
                        <Img src={ data?.profile ? `${ process.env.REACT_APP_API_URL }${ data.profile }` : default_profile } id="review"/>    
                    </Div>

                    {/* 이름 */}
                    <Div width="fit-content" marginRight="8px">
                        <P weight="700" 
                            size={ 
                                props.course  && !isMobile ? 
                                "medium_small" : 
                                !isMobile ? 
                                null : 
                                "extra_small" 
                            } 
                            lineHeight={ !isMobile ? "29px" : "20px" } 
                            color="grey7" 
                            style={{ fontSize: props.course ? null : 17 }} 
                            id="review"
                        >
                            { data?.name ? data.name : null }
                        </P>
                    </Div>

                    {/* 별점 */}
                    <Div flex="row" width="fit-content" marginBottom={ !isMobile ? null : "4px" } id="review">
                        { star({ score: data?.score ? data.score : null, width: props.course && !isMobile ? "20px" : !isMobile ? "16px" : "15px", height: props.course && !isMobile ? "20px" : !isMobile ? "16px" : "15px", id: "review" }) }
                    </Div>

                    {
                        props.course &&
                        <Div width="fit-content" marginLeft={ !isMobile ? "11px" : "8px" }>
                            <P color="grey7" weight="600" lineHeight="26px" size={  !isMobile ? "small_large" : "small_medium" } id="review">
                                { data?.score ? ( ( data.score * 10 ) % 10 ) === 0 ? `${ data.score }.0` : data.score : null }
                            </P>
                        </Div>
                    }
                </Div>

                {/* 날짜 */}
                <Div flex="row_end" id="review">
                    <P weight="400" size={ !isMobile ? "small" : "extra_small" } lineHeight="22px" color="grey4" id="review">
                        { data?.date ? data.date.split("T")[ 0 ] : null }
                    </P>
                </Div>
            </Div>

            {/* 리뷰 제목 */}
            {
                data.title &&
                <Div marginBottom={ !isMobile ? "13px" : "6px" } id="review">
                    <H1 weight="700" size={ !isMobile ? "small_large" : "small_medium" } lineHeight="26px" color="bk" id="review">
                        { data?.title ? data.title : null }
                    </H1>
                </Div>
            }

            {/* 리뷰 내용 */}
            <Div marginBottom={ !isMobile ? "22px" : "6px" } id="review">
                <Contents color="grey4" weight="400" size={ !isMobile ? "small" : "extra_small" } lineHeight="26px" id="review">
                    { data?.contents ? data.contents : null }
                </Contents>
            </Div>

            {/* 좋아요, 신고하기 */}
            <Div flex="row_between">

                {/* 좋아요 */}
               
                <Div flex="row" id="like">
                    <Div width={ props.course && !isMobile ? "24px" : !isMobile ? "14px" : "12px" } height={ props.course && !isMobile ? "24px" : !isMobile ? "14px" : "12px" } marginRight="5px" id="like">
                        <Button>
                            {
                                props.course?
                                <Img src={ thumbs_up } id="like"/>:
                                <Img src={ small_thumbs_up } id="like"/>
                            }
                        </Button>
                    </Div>
                    <Div width="fit-content">
                        <P color={ props.course && !isMobile ? "grey3" : "grey6" } weight="500" size={ !isMobile ? "small_medium" : "extra_small" } cursor="pointer" id="like">
                            { data.thumbs_up ? data.thumbs_up : "0" }명에게 도움이 되었어요.
                        </P>
                    </Div>
                </Div>
                
                <Div flex="row_end" id="review">
                    <Div width="fit-content">
                        <Button color="grey2" size={ !isMobile ? "small_medium" : "extra_small" } weight="500" lineHeight="40px" id="report">
                            <Div flex="row" width="15px" height="15px" marginRight="4px" id="report">
                                <Img src={ siren } id="report"/>
                            </Div>
                            신고하기
                        </Button>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default Review