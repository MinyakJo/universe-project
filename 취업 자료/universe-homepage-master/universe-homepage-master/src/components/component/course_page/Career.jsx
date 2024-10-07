import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import CourseStructureTitle from "../passes_page/CourseStructureTitle"
import document from "../../../svg/document.svg"
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
const Contents = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

const Career = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)

    return(
        <Div flex={ !isMobile ? "row_top" : "column" } marginTop={ !isMobile ? "60px" : "50px" }>
            <Div flex="column_top" paddingRight={ !isMobile ? "10px" : null }>
                <CourseStructureTitle>
                    {{
                        img: document,
                        title: "약력 및 저서",
                        color: "black"
                    }}
                </CourseStructureTitle>

                <Div paddingLeft={ !isMobile ? "20px" : null }>
                    <Div 
                        flex="row_center" 
                        marginTop={ !isMobile ? "30px" : "20px" } 
                        radius="1px" 
                        width={ !isMobile ? "70px" : "54px" } 
                        height={ !isMobile ? "36px" : "28px" } 
                        backgroundColor="orange"
                    >
                        <P color="white" weight="700" size={ !isMobile ? "small_large" : "extra_small" }>
                            약력
                        </P>
                    </Div>

                    <Div marginTop={ !isMobile ? "12px" : "10px" }>
                        <Contents color="bk" weight="400" lineHeight="40px" style={{ fontSize: !isMobile ? 17 : 15 }}>
                            { data?.career ? data.career : null }
                        </Contents>
                    </Div>
                </Div>
            </Div>
            
            <Div flex="column_top" paddingRight={ !isMobile ? "10px" : null }>
                {
                    !isMobile &&
                    <CourseStructureTitle>
                        {{
                            title: "",
                            color: "black"
                        }}
                    </CourseStructureTitle>
                }

                <Div paddingLeft={ !isMobile ? "20px" : null }>
                    <Div flex="row_center" 
                        marginTop={ !isMobile ? "30px" : "20px" } 
                        radius="1px" 
                        width={ !isMobile ? "70px" : "54px" } 
                        height={ !isMobile ? "36px" : "28px" } 
                        backgroundColor="orange"
                    >
                        <P color="white" weight="700" size={ !isMobile ? "small_large" : "extra_small" }>
                            저서
                        </P>
                    </Div>

                    <Div marginTop={ !isMobile ? "12px" : "10px" } paddingRight={ !isMobile ? "20px" : null }>
                        <Contents color="bk" weight="400" lineHeight="40px" style={{ fontSize: !isMobile ? 17 : 15 }}>
                            { data?.book ? data.book : null }
                        </Contents>
                    </Div>
                </Div>
            </Div>
        </Div>
    )
}

export default Career