import React from "react"
import { CloseButton, Div } from "components/container/Dialog"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import styled from "styled-components"

const VideoTag = styled.video`
    display: block;
    width: 100%;
`

const Video = ({ children, reset }) => {

    const isMobile = useRecoilValue( isMobileState )
    
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

    return (
        <Div position="relative" maxWidth={ !isMobile ? "1000px" : null } backgroundColor="black" onClick={ onClickEvent }>
            <CloseButton/>
            {
                children?.src &&
                <VideoTag controls posterSize={ !isMobile ? "100px" : "48px" }>
                    <source src={ `${ process.env.REACT_APP_API_URL }${ children.src }` } type="video/webm"/>
                    <source src={ `${ process.env.REACT_APP_API_URL }${ children.src }` } type="video/mp4"/>
                    지원하는 소스가 없습니다.
                </VideoTag>
            }
        </Div>
    )
}

export default Video