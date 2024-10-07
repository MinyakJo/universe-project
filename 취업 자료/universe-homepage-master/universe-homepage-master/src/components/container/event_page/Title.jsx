import React from "react"
import styled from "styled-components"
import commonP from "components/common/P"
import H1 from "components/common/H1"
import { Div } from "components/page/EventDetailPage"
import { isMobileState } from "recoil/mainAtom"
import { useRecoilValue } from "recoil"

const TitleText = styled(H1)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: pre-line;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => {
        return props.isMobile ? 2 : 1
    }};
`

const P = styled(commonP)`
    white-space: ${props => {
        return props.whiteSpace ? props.whiteSpace : "nowrap"
    }};
`

const Title = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children

    return(
        <Div flex={ !isMobile ? "row" : "column" } paddingBottom="16px" borderBottom="gray3">
            <Div flex={ (!isMobile && props.recruit) ? "row_between" : "column" }>
                <Div flex={ (!isMobile && props.recruit) ? "row" : "column" } width="fit-content" marginRight="10px">
                    {
                        props.event ?
                        <Div 
                            flex="row_center" 
                            width="fit-content"
                            backgroundColor={ data?.isEnd ? "grey2" : "orange" } 
                            padding={ !isMobile ? "5px 17px" : "3px 12px" } 
                            marginRight="10px"
                        >
                            <P color="white" weight="400" lineHeight="20px" style={{ fontSize: !isMobile ? 14: 13 }}>
                                { data?.isEnd ? "종료" : "진행중" }
                            </P>
                        </Div>:
                        props.recruit &&
                        <Div 
                            flex="row_center" 
                            width="fit-content" 
                            backgroundColor="orange" 
                            padding={ !isMobile ? "5px 17px" : "3px 7px" } 
                            marginRight="10px"
                            marginBottom={ !isMobile ? null : "7px" }
                        >
                            <P color="white" weight="400" style={{ fontSize: !isMobile ? 14 : 13 }} lineHeight={ !isMobile ? "20px" : "19px" }>
                                { data?.area && data.area }
                            </P>
                        </Div>
                    }
                    {
                        ( !isMobile || ( props.recruit && isMobile ) ) &&
                        <Div>
                            <TitleText color="grey7" size={ !isMobile ? "medium" : "medium_small" } weight="700" lineHeight="160%" isMobile={ isMobile }>
                                { data?.title && data.title }
                            </TitleText>
                        </Div>
                    }
                </Div>
                <Div flex={ !isMobile ? "row" : "row_between" } width={ !isMobile ? "fit-content" : null } marginTop={ (!isMobile && props.recruit) ? null : "7px" }>
                    <Div flex="row" width="fit-content">
                        <Div 
                            flex="row_end" 
                            marginRight={ 
                                !isMobile ?
                                props.event ? 
                                "15px" : 
                                "10px" :
                                "8px" 
                            }>
                            <P size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="26px" weight="600" style={{ color: "#3A4443" }}>
                                {
                                    props.event ?
                                    "이벤트 기간":
                                    props.recruit?
                                    "모집 기간":
                                    ""
                                }
                            </P>
                        </Div>
                        <Div flex="row_cetner">
                            <P size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="26px" weight="400" style={{ color: "#3A4443" }}>
                                {
                                    data?.startDate &&
                                    data.startDate.split("T")[ 0 ]
                                }
                                {" ~ "} 
                                {
                                    data?.endDate &&
                                    data.endDate.split("T")[ 0 ]
                                }
                            </P>
                        </Div>
                    </Div>
                    {
                        props.recruit &&
                        <Div flex="row" width="fit-content" marginLeft={ !isMobile ? "35px" : null }>
                            <Div flex="row_cetner" marginRight={ !isMobile ? "12px" : "8px" }>
                                <P color="bk" weight="700" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="26px">
                                    진행여부
                                </P>
                            </Div>
                            <Div flex="row_cetner">
                                <P weight="400" color="bk" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="26px">
                                    {
                                        data?.inProgress ? 
                                        "진행중" : 
                                        data && !data.inProgress ? 
                                        "마감" :
                                        "" 
                                    }
                                </P>
                            </Div>
                        </Div>
                    }
                </Div>
            </Div>
            {
                isMobile && props.event &&
                <Div marginTop="9px">
                    <TitleText color="grey7" size="small_medium" weight="700" lineHeight="160%" isMobile={ isMobile }>
                        { 
                            data?.title && 
                            data.title 
                        }
                    </TitleText>
                </Div>
            }
        </Div>
    )
}

export default Title