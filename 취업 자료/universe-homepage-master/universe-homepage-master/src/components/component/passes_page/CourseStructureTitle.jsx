import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import Div from "components/common/Div"
import H1 from "components/common/H1"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const TitleBox = styled(Div)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
`

const CourseStructureTitle = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)

    return(
        <TitleBox flex="row" paddingBottom="12px" height={ !isMobile ? "42px" : null } borderBottom={ data.color ? data.color : "grey2" }>
            {
                data.img &&
                <Div width="28px" height="26px" marginRight={ !isMobile ? "10px" : "8px" }>
                    <Img src={data.img}/>
                </Div>
            }
            <Div width="fit-content">
                <H1 weight="700" size={ !isMobile ? "medium_small" : "small_large" } lineHeight={ !isMobile ? "29px" : "26px" } color="bk">
                    { data.title }
                </H1>
            </Div>
        </TitleBox>
    )
}

export default CourseStructureTitle