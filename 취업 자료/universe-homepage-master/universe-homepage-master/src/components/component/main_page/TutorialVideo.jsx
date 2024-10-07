import React, { useState } from "react"
import Div from "components/common/Div"
import H2 from "components/common/H2"
import P from "components/common/P"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { isMobileState, tutorialSelectedState } from "recoil/mainAtom"
import { useEffect } from "react"

const VideoDiv = styled(Div)`
    aspect-ratio: 1180 / 661.35;
    margin-bottom: 32px;
    max-width: ${({ maxWidth }) => {
        return maxWidth ? maxWidth : null
    }}; 
`

const Video = styled.video`
    width: 100%;
    height: 100%;
`

const StepDiv = styled(Div)`
    max-width: ${({ maxWidth }) => {
        return maxWidth ? maxWidth : null
    }}; 
    min-width: ${({ minWidth }) => {
        return minWidth ? minWidth : null
    }};
`

const Text = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

const VideoContainer = styled(Div)`
    max-width: ${({ maxWidth }) => {
        return maxWidth ? maxWidth : null
    }};
`

const TutorialViedo = ({ children }) => {
    
    //recoil
    const isMobile = useRecoilValue( isMobileState )
    const select = useRecoilValue( tutorialSelectedState )

    //variable
    const [ leaf1, setLeaf1 ] = useState( null )
    const [ leaf2, setLeaf2 ] = useState( null )

    useEffect(() => {
        if( children.length !== 0 ){
            setLeaf1( children[ select.leaf1 ] )
            setLeaf2( children[ select.leaf1 ].children[ select.leaf2 ] )
        }
    }, [ children, select ])

    return (
        <VideoContainer maxWidth="1180px" flex="column_center" marginTop="20px" marginBottom="95px">
            {
                leaf1 !== null ?
                leaf1.children.length === 0 ?
                leaf1.data.video &&
                <VideoDiv>
                    <React.Fragment key={ `${ process.env.REACT_APP_API_URL }${ leaf1.data.video }` }>
                        <Video controls>
                            <source src={ `${ process.env.REACT_APP_API_URL }${ leaf1.data.video }` } type="video/webm"/>
                            <source src={ `${ process.env.REACT_APP_API_URL }${ leaf1.data.video }` } type="video/mp4"/>
                        </Video>
                    </React.Fragment>
                </VideoDiv> :
                leaf2.data.video &&
                <VideoDiv>
                    <React.Fragment key={ `${ process.env.REACT_APP_API_URL }${ leaf2.data.video }` }>
                        <Video controls>
                            <source src={ `${ process.env.REACT_APP_API_URL }${ leaf2.data.video }` } type="video/webm"/>
                            <source src={ `${ process.env.REACT_APP_API_URL }${ leaf2.data.video }` } type="video/mp4"/>
                        </Video>
                    </React.Fragment>
                </VideoDiv> :
                <></>
            }
            {
                leaf1 && leaf2 && (( leaf1.data.commentTitle && leaf1.data.commentContent ) || ( leaf2.data.commentTitle && leaf2.data.commentContent )) &&
                <Div flex={ !isMobile ? "row" : "column_center" } padding={ !isMobile ? "29px 44px" : "16px 30px" } paddingTop={ !isMobile ? null : "24px" } radius="10px" borderColor="orange">
                    <StepDiv width={ !isMobile ? "133px" : "fit-content" } marginBottom={ !isMobile ? null : "10px" }>
                        <H2 color="orange" family="esamanru" size={ !isMobile ? "medium_large" : "" } weight="500" lineHeight="28px">
                            {
                                leaf1.data.commentTitle ?
                                `${ leaf1.data.commentTitle }` :
                                `${ leaf2.data.commentTitle }`
                            }
                        </H2>
                    </StepDiv>
                    <StepDiv flex="row_center" maxWidth="935px" borderColor={ !isMobile ? null : "orange" }>
                        <Text color="bk" size={ !isMobile ? "medium" : "small" } lineHeight="30px" weight="500">
                            {
                                leaf1.data.commentContent ?
                                `${ leaf1.data.commentContent }` :
                                leaf2.data.commentContent ?
                                `${ leaf2.data.commentContent }` :
                                ""
                            }
                        </Text>
                    </StepDiv>
                </Div>
            }
        </VideoContainer>
    )
}

export default React.memo( TutorialViedo )