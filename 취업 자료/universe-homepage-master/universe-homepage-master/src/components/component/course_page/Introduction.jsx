import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import P from "components/common/P"
import CourseStructureTitle from "../passes_page/CourseStructureTitle"
import profile from "../../../svg/default_profile.svg"
import document from "../../../svg/document.svg"
import VideoList from "./VideoList"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    position: ${props => {
        return props.position ? props.position : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    bottom: ${props => {
        return props.bottom ? props.bottom : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Profile = styled(commonDiv)`
    width: ${props => {
        return props.isMobile ? "48px" : "80px"
    }};
    min-width: ${props => {
        return props.isMobile ? "48px" : "80px"
    }};
    height: ${props => {
        return props.isMobile ? "48px" : "80px"
    }};
    border-radius: 50%;
    margin-right: ${props => {
        return props.isMobile ? "11px" : "20px"
    }};
    overflow: hidden;
`

const Span = styled.span`
    color: ${CommonStyle.setColor("orange")};
`

const Introduction = (props) => {

    const isMobile = useRecoilValue(isMobileState)

    const data = props.children

    return(
        <Div flex="column">
            <CourseStructureTitle>
                {{
                    img: document,
                    title: "강사 정보",
                    color: "black"
                }}
            </CourseStructureTitle>
            
            <Div flex={ !isMobile ? "row" : "column" } 
                marginTop="20px" 
                height={ !isMobile ? "115px" : null } 
                radius="4px" 
                backgroundColor="admin_bg" 
                paddingBottom={ !isMobile ? "23px" : "29px" } 
                paddingLeft={ !isMobile ? "21px" : "10px" }
                padding={ !isMobile ? "12px 21px" : "15px 10px" }
                marginBottom={ !isMobile ? "17px" : "14px" } 
            >
                <Div flex="row" width="fit-content" marginBottom={ !isMobile ? null : "12px" }>
                    <Profile flex="row_center" isMobile={isMobile}>
                        {
                            data && data.profile ?
                            <Img src={`${ process.env.REACT_APP_API_URL }${ data.profile }`}/>:
                            <Img src={ profile }/>
                        }
                    </Profile>
                    {
                        isMobile &&
                        <Div flex="row">
                            <P size="small_medium" weight="400" lineHeight="23px">
                                {
                                    data && data.name &&
                                    <Span>{ data.name }</Span>
                                }
                                선생님
                            </P>
                        </Div>
                    }
                </Div>

                <Div flex="column">
                    <Div flex="row" marginBottom="3px">
                        <H1 color="bk" weight="700" lineHeight="34px" style={{ fontSize: !isMobile ? 23 : 18 }}>
                            “{ data?.introduction ? data.introduction : null }”
                        </H1>
                    </Div>
                    {
                        !isMobile &&
                        <Div flex="row" marginLeft="12px">
                            <P size="small_large" weight="400" lineHeight="26px">
                                <Span>{ data?.name ? data.name : null }</Span>
                                선생님
                            </P>
                        </Div>
                    }
                </Div>
            </Div>

            <VideoList>
                { data?.videoData }
            </VideoList>
        </Div>
    )
}

export default Introduction