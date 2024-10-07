import React, { useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import H1 from "components/common/H1"
import commonButton from "components/common/Button"
import P from "components/common/P"
import play from "../../../svg/play_button.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { courseSelectVideoIndexState } from "recoil/coursesAtom"

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

    box-shadow: ${props => {
        return props.shadow ? props.shadow : null
    }};

    opacity: ${props => {
        return props.opacity ? props.opacity : null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};
`
const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: ${props => {
        return props.justify ? props.justify : "center"
    }};
    align-items: center;

    div, p, img{
        cursor: pointer;
    }
`

const Contents = styled(P)`
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`


const Video = styled.video`
    display: block;
    width: 100%;
    height: 100%;
`

const VideoList = (props) => {

    const data = props.children
    const isMobile = useRecoilValue(isMobileState)
    const [ select, setSelect ] = useRecoilState(courseSelectVideoIndexState)

    const onClickEvent = e => {
        const id = e.target.id

        if(!isNaN(Number(id)) && ( ( id === 0 ) || id )) setSelect(Number(id))
    }

    return(
        <Div flex="column">
            {
                !props.teacher &&
                <Div marginBottom="16px">
                    <H1 color="bk" weight="700" size={ !isMobile ? "medium_small" : "small_large" } lineHeight="29px">
                        강사소개
                    </H1>
                </Div>
            }

            {/* 동영상 */}
            <Div flex={ !isMobile ? "row" : "column" } height={ !isMobile ? "405px" : null } marginBottom={ !isMobile ? "27px" : null }>
                {
                    data && data?.length !== 0 &&
                    <Div     
                        height="100%"
                        ratio="16/9" 
                        backgroundColor="black" 
                        marginRight="20px"
                        marginBottom={ !isMobile ? null : "11px" }
                    >
                        <React.Fragment key={ data[ select ]?.src ? `${ process.env.REACT_APP_API_URL }${ data[ select ].src }` : null }>
                            <Video controls>
                                <source src={ data[ select ]?.src ? `${ process.env.REACT_APP_API_URL }${ data[ select ].src }` : null } type="video/mp4"/>
                                <source src={ data[ select ]?.src ? `${ process.env.REACT_APP_API_URL }${ data[ select ].src }` : null } type="video/webm"/>
                                지원 하지 않는 영상입니다..
                            </Video>
                        </React.Fragment>
                    </Div>
                }
                {
                    isMobile &&
                    <Div flex="column_center" marginBottom="15px">
                        <Div flex="row">
                            <H1 color="bk" weight="700" size="small">
                                { data[ select ]?.title ? data[ select ].title : null }
                            </H1>
                        </Div>
                        <Div flex="row" marginTop="10px">
                            <P color="bk" weight="500" size="small">
                                { data[ select ]?.contents ? data[ select ].contents : null }
                            </P>
                        </Div>
                    </Div>
                }
                <Div flex="column_top" height={ !isMobile ? "100%" : null } onClick={ onClickEvent }>
                    {
                        data?.length > 0 &&
                        data && data.map((e, i) =>
                            <Div 
                                key={ `videoGrid_${ i }` } 
                                flex="row" 
                                radius="4px" 
                                border={ props.teacher ? null : "grey1" }
                                marginBottom={ !isMobile ? "21px" : null }
                                marginTop={ !isMobile ? null : "12px" }
                                shadow={ props.teacher ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : null }
                                opacity={ select === i ? "1.0" : "0.5" }
                            >
                                <Button id={ i }>
                                    <Div 
                                        flex={ !isMobile ? null : "row_center" }
                                        position="relative" 
                                        minWidth={ !isMobile ? "123px" : "80px" } 
                                        width={ !isMobile ? "123px" : "80px" }  
                                        height={ !isMobile ? "123px" : "80px" }  
                                        backgroundColor="black" 
                                        marginRight={ !isMobile ? "15px" : "19px" }
                                        id={ i }
                                    >
                                        <Div 
                                            position="absolute" 
                                            width={ !isMobile ? "30px" : "36px" } 
                                            height={ !isMobile ? "30px" : "36px" }
                                            left={ !isMobile ? "8px" : null } 
                                            bottom={ !isMobile ? "8px" : null }
                                        >
                                            <Img src={ play } id={ i }/>
                                        </Div>
                                    </Div>
                                    <Div flex="colum_center">
                                        <Div flex="row" marginBottom="4px" id={ i }>
                                            {
                                                e.title && 
                                                <P weight="700" lineHeight="17px" style={{ fontSize: !isMobile ? 17 : 15 }} id={ i }>
                                                    { e.title }
                                                </P>
                                            }
                                        </Div>
                                        <Div flex="row" id={ i }>
                                            {
                                                e.contents &&
                                                <Contents size="extra_small" color="grey3" weight="400" id={ i }>
                                                    { e.contents }
                                                </Contents>
                                            }
                                        </Div>
                                    </Div>
                                </Button>
                            </Div>
                        )
                    }
                </Div>
            </Div>

            {/* 동영상 설명 */}
            {
                !isMobile &&
                <Div flex="column_center" width="700px">
                    <Div flex="row">
                        <H1 color="bk" weight="700" size="medium">
                            { data[ select ]?.title ? data[ select ].title : null }
                        </H1>
                    </Div>
                    <Div flex="row" marginTop="20px">
                        <P color="bk" weight="500" size="small_large">
                            { data[ select ]?.contents ? data[ select ].contents : null }
                        </P>
                    </Div>
                </Div>
            }
        </Div>
    )
}

export default VideoList