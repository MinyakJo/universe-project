import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonH1 from "components/common/H1"
import commonH2 from "components/common/H2"
import CommonStyle from "components/style"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    justify-content: ${props => {
        return props.justify ? props.justify : null
    }};
`

const H1 = styled(commonH1)`
    white-space: ${props => {
        return props.whiteSpace ? props.whiteSpace : "pre-line"
    }};
    text-align: ${props => {
        return props.justify ? props.justify : "center"
    }};
`

const H2 = styled(commonH2)`
    white-space: ${props => {
        return props.whiteSpace ? props.whiteSpace : "pre-line"
    }};
    text-align: ${props => {
        return props.justify ? props.justify : "center"
    }};
`

const Span = styled.span`
    position: relative;
    color: ${CommonStyle.setColor("orange")};
`

const MainIntroText = (props) => {

    const data = props.children

    /*
        MainPage Section들의 title들이 똑같아서 만든 Component
        data = {
            top{
                margin: maingin-bottom에 들어갈 margin: string | undefined ,
                text: 부제목: string,
                accent: string | undefined,
                accentPosition: string | undefined => accent를 적으면 무조건 기입
                justify: 행 정렬(좌측, 가운데, 우측): string | undefined
            },
            bottom{
                margin: maingin-bottom에 들어갈 margin,
                text: 제목: string,
                accent: string | undefined,
                accentPosition: string | undefined => accent를 적으면 무조건 기입
                justify: 행 정렬(좌측, 가운데, 우측): string | undefined
            },
            color: 글씨 색깔: string | undefined
        }
    */

    //텍스트 분리
    let topText = data?.top?.text
    let bottomText = data?.bottom?.text
    let accentTop = data?.top?.accent
    let accentBottom = data?.bottom?.accent
    const topPosition = data?.top?.accentPosition
    const bottomPosition = data?.bottom?.accentPosition
    const isMobile = useRecoilValue(isMobileState)

    //강조할 텍스트 문자열에서 빼는 과정
    //강조할 텍스트는 span 태그 안에다가
    if(accentTop){
        if(topPosition === "center"){
            topText = topText.split(accentTop)
        }else if(topPosition === "both"){
            bottomText = bottomText.replace(accentBottom[0], "")
            bottomText = bottomText.replace(accentBottom[1], "")
        }else{
            topText = topText.replace(accentTop, "")
        }
    }
    if(accentBottom){
        if(bottomPosition === "center"){
            bottomText = bottomText.split(accentBottom)
        }else if(bottomPosition === "both"){
            bottomText = bottomText.replace(accentBottom[0], "")
            bottomText = bottomText.replace(accentBottom[1], "")
        }else{
            bottomText = bottomText.replace(accentBottom, "")
        }
    }

    return(
        <>
            <Div flex="row_center" paddingBottom={ data.top.margin ? data.top.margin : null } justify={data.top.justify}>
                {
                    topText &&
                    <H2 color={ data.color ? data.color : null } weight="300" family="esamanru" size={ !isMobile ? "medium_large" : "small_medium" } justify={ data.top.justify } whiteSpace={ data.top.whiteSpace }>
                        {
                            accentTop && topPosition === "center" ?
                            <>
                                { topText[0] }
                                <Span>{ accentTop }</Span>
                                { topText[1] }
                            </>:
                            <>
                                {
                                    accentTop && topPosition === "start" ?
                                    <Span>{ accentTop }</Span>:
                                    accentTop && topPosition === "both" &&
                                    <Span>{ accentTop[0] }</Span>
                                }
                                { topText }
                                {
                                    accentTop && topPosition === "end" ?
                                    <Span>{ accentTop }</Span>:
                                    accentTop && topPosition === "both" &&
                                    <Span>{ accentTop[1] }</Span>
                                }
                            </>
                        }
                    </H2>
                }    
            </Div>
            <Div flex="row_center" paddingBottom={ data.bottom.margin ? data.bottom.margin : null } justify={ data.bottom.justify }>
                {
                    bottomText &&
                    <H1 color={ data.color ? data.color : null } weight="500" family="esamanru" size={ !isMobile ? "extra_large" : "large_small" } justify={ data.bottom.justify } whiteSpace={ data.bottom.whiteSpace }>
                        {
                            accentBottom && bottomPosition === "center"?
                            <>
                                { bottomText[0] }
                                <Span>{ accentBottom }</Span>
                                { bottomText[1] }
                            </>:
                            <>
                                {
                                    accentBottom && bottomPosition === "start" ?
                                    <Span>{ accentBottom }</Span>:
                                    accentBottom && bottomPosition === "both" &&
                                    <Span>{ accentBottom[0] }</Span>
                                }
                                { bottomText }
                                {
                                    accentBottom && bottomPosition === "end" ?
                                    <Span>{ accentBottom }</Span>:
                                    accentBottom && bottomPosition === "both" &&
                                    <Span>{ accentBottom[1] }</Span>
                                }
                            </>
                        }
                    </H1>
                }
            </Div>
        </>
    )
}

export default React.memo(MainIntroText)