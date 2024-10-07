import React from "react"
import styled from "styled-components"
import P from "components/common/P"
import H1 from "components/common/H1"
import { Div, Img, ContentsBox, Contents, CloseButton } from "components/container/Dialog"
import default_profile from "../../../svg/default_profile.svg"
import { star } from "components/container/passes_page/PassReview"
import { dateFormat } from "modules/dateFormat"

const Title = styled(H1)`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const Name = styled(P)`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
`

const Review = (props) => {

    const data = props.children
    const reset = props.reset
    const isMobile = props.isMobile

    const onClickEvent = (e) => {
        const id = e.target.id

        switch(id){
            case "close":
                reset()
                return
            default:
                return
        }
    }
    return(
        <Div 
            position="relative" 
            maxWidth="780px" 
            backgroundColor="white" 
            zIndex="9" 
            radius="10px" 
            paddingTop={ !isMobile ? "40px" : "26px" } 
            paddingLeft={ !isMobile ? "40px" : "17px" } 
            paddingRight={ !isMobile ? "10px" : "8px" } 
            paddingBottom="28px" 
            onClick={onClickEvent}
        >
            <CloseButton/>
            <Div flex="column">
                <Div flex="row" paddingRight={ !isMobile ? "30px" : "14px" } marginBottom={ !isMobile ? "20px" : "27px" }>
                    {/* 프로필 */}
                    <Div 
                        flex="row_center"
                        width={ !isMobile ? "72px" : "52px" } 
                        minWidth={ !isMobile ? "72px" : "52px" } 
                        height={ !isMobile ? "72px" : "52px" } 
                        marginRight={ !isMobile ? "16px" : "11px" }
                        radius="50%"
                        overflow="hidden"
                    >
                        <Img src={ data?.profile ? `${ process.env.REACT_APP_API_URL }${ data.profile }` : default_profile }/>
                    </Div>
                    {/* 이름, 점수, 날짜 */}
                    <Div flex="column">
                        <Div flex="row_between" marginBottom="4px">
                            <Div width="fit-content">
                                <Name lineHeight={ !isMobile ? "29px" : "26px" } color="grey7" weight="700" style={{ fontSize: !isMobile ? 20 : 17 }}>
                                    {
                                        data && data.name?
                                        data.name:
                                        "loading"
                                    }
                                </Name>
                            </Div>
                            {
                                isMobile &&
                                <Div width="fit-content">
                                    <P color="grey3" weight="400" lineHeight="22px" style={{ fontSize: 12 }}>
                                        { data?.date && dateFormat( new Date( data.date ), "-" ) }
                                    </P>
                                </Div>
                            }
                        </Div>
                        <Div flex="row_between">
                            <Div flex="row" width="fit-content">
                                <Div flex="row" width="fit-content">
                                    { 
                                        star({ 
                                            score: data.score ? data.score : 0, 
                                            width: !isMobile ? "20px" : "15px", 
                                            height: !isMobile ? "20px" : "15px", 
                                            marginLeft: "0px", 
                                            marginRight: !isMobile ? "7px" : "6px" 
                                        }) 
                                    }
                                </Div>
                                <Div width="fit-content" marginTop={ !isMobile ? null : "4px" }>
                                    <P lineHeight={ !isMobile ? "26px" : "23px" } color="grey7" size={ !isMobile ? "small_large" : "small_medium" } weight="500">
                                        { data.score && ( data.score * 10 ) % 10 === 0 ? `${ data.score }.0` : data.score }
                                    </P>
                                </Div>
                            </Div>
                            {
                                !isMobile &&
                                <Div flex="row" width="fit-content">
                                    <P color="grey4" size="small" weight="400" lineHeight="22px">
                                        { data?.date && dateFormat( new Date( data.date ), "-" ) }
                                    </P>
                                </Div>
                            }
                        </Div>
                    </Div>
                </Div>
                {/* 제목 */}
                <Div flex="row" marginBottom="11px" paddingRight={ !isMobile ? "30px" : "14px" }>
                    <Title color="orange" weight="700" size={ !isMobile ? "small_large" : "small_medium" } lineHeight={ !isMobile ? "26px" : "23px" }>
                        { data.title && data.title }
                    </Title>
                </Div>
                {/* 내용 */}
                <ContentsBox height={ !isMobile ? "274px" : "330px" } paddingRight={ !isMobile ? "20px" : "8px" }>
                    <Contents color="grey7" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="180%" weight="400">
                        { data.contents && data.contents }
                    </Contents>
                </ContentsBox>
            </Div>
        </Div>
    )
}

export default Review