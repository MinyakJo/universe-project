import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import commonH2 from "components/common/H2"
import commonButton from "components/common/Button"
import play_button from "../../../svg/play_button.svg"
import eye from "../../../svg/eye.svg"
import star from "../../../svg/star.svg"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    position: ${props => {
        return props.position ? props.position : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};

    border-right: ${props => {
        return props.borderRight ? `1px solid ${CommonStyle.setColor(props.borderRight)}` : null
    }};

    border-left: ${props => {
        return props.borderLeft ? `1px solid ${CommonStyle.setColor(props.borderLeft)}` : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : "pointer"
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const PlayButton = styled(commonButton)`
    position: absolute;
    bottom: ${props => {
        return props.isMobile ? "24px" : "10px"
    }};
    right: ${props => {
        return props.isMobile ? "24px" : "10px"
    }};
    width: ${props => {
        return props.isMobile ? "48px" : "50px"
    }};
    height: ${props => {
        return props.isMobile ? "48px" : "50px"
    }};
    border-radius: 50%;
    background-color: ${CommonStyle.setColor("none")};
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};

    overflow: hidden;          
    white-space: nowrap;                   
    text-overflow: ellipsis;

    cursor: ${props => {
        return props.cursor ? props.cursor : "pointer"
    }};
`

const Title = styled(commonH2)`
    font-weight: 700;
    font-size: 17px;
    line-height: 25px;
    width: 100%;
    overflow: hidden;          
    white-space: nowrap;                   
    text-overflow: ellipsis;

    cursor: ${props => {
        return props.cursor ? props.cursor : "pointer"
    }};
`

const Img = styled.img`
    object-fit: cover;
    height: 100%;

    cursor: ${props => {
        return props.cursor ? props.cursor : "pointer"
    }};
`

const VideoList = (props) => {

    const data = props.children
    const navigate = useNavigate()
    const isMobile = useRecoilValue(isMobileState)

    const onClickEvent = (e) => {
        const id = e.target.id

        if(id){
            navigate(`/courses/${id}`)
        }
    }

    return(
        <Div flex="row" wrap="wrap">
            {
                data && data.map((e, i) =>
                    <Div flex="column" key={ i } maxWidth="380px" marginLeft={ !isMobile && (i % 3 !== 0) ? "20px" : null } marginBottom="22px" id={ e?.id ? e.id : null } onClick={ onClickEvent }>

                        {/* thumbnail */}
                        
                        <Div 
                            flex="row_center" 
                            overflow="hidden"
                            height="238px" 
                            maxHeight="238px" 
                            position="relative" 
                            radius="4px" 
                            backgroundColor="grey1"
                        >
                            {
                                e.img &&
                                <Img src={ `${ process.env.REACT_APP_API_URL }${ e.img }` } id={ e?.id ? e.id : null }/>
                            }
                            <PlayButton isMobile={ isMobile }>
                                <Img src={ play_button } id={ e?.id ? e.id : null }/>
                            </PlayButton>
                        </Div>

                        {/* 종류 / 조회수 */}
                        <Div flex="row_between" marginTop="13px" id={ e?.id ? e.id : null }>
                            <Div width="fit-content" flex="row" backgroundColor="light_orange" radius="4px" padding="3px 5px" id={ e?.id ? e.id : null }>
                                <P color="white" size={ !isMobile ? "extra_small" : null } style={{ fontSize: !isMobile ? null : 12 }} lineHeight="20px" weight="500" id={ e?.id ? e.id : null }>
                                    { e.tag ? e.tag : null }
                                </P>
                            </Div>
                            <Div width="fit-content" flex="row" id={ e?.id ? e.id : null }>
                                <Div width="18px" height="18px" marginRight="5px" id={ e?.id ? e.id : null }>
                                    <Img src={ eye } id={ e?.id ? e.id : null }/>
                                </Div>
                                <Div width="fit-content">
                                    <P color="grey4" lineHeight="22px" size={ !isMobile ? "small" : "extra_small" } weight="400" id={ e?.id ? e.id : null }>
                                        {
                                            e.views ? e.views : null
                                        }
                                    </P>
                                </Div>
                            </Div>
                        </Div>

                        <Div flex="row_between" marginTop={ !isMobile ? "13px" : "7px" } id={ e?.id ? e.id : null }>
                            <Div width="calc(100% - 45px)" flex="row" id={ e?.id ? e.id : null }>
                                <Title color="bk" id={ e?.id ? e.id : null }>
                                    {
                                        e.title ? e.title : null
                                    }
                                </Title>
                            </Div>
                            <Div width="fit-content" flex="row" id={ e?.id ? e.id : null }>
                                <Div width="18px" height="18px" marginRight="5px" id={ e?.id ? e.id : null }>
                                    <Img src={star} id={ e?.id ? e.id : null }/>
                                </Div>
                                <Div width="fit-content">
                                    <P color="grey4" lineHeight="22px" size={ !isMobile ? "small" : "extra_small" } weight="400" id={ e?.id ? e.id : null }>
                                        {
                                            ( e.rank || e.rank === 0 ) ? ( e.rank * 10 ) % 10 === 0 ? `${ e.rank }.0` : e.rank : null
                                        }
                                    </P>
                                </Div>
                            </Div>
                        </Div>

                        <Div flex="row" marginTop="8px" id={ e?.id ? e.id : null }>
                            <Div width="fit-content" paddingRight={ !isMobile ? "10px" : "12px" } borderRight="grey4" id={ e?.id ? e.id : null }>
                                <P color="grey4" size={ !isMobile ? "small" : "small_medium" } lineHeight="15px" weight="400" id={ e?.id ? e.id : null }>
                                    {
                                        e.name ? e.name : null
                                    }
                                </P>
                            </Div>
                            <Div width="fit-content" padding={ !isMobile ? "0px 10px" : "0px 12px" } borderRight="grey4" id={ e?.id ? e.id : null }>
                                <P color="grey4" size="small" lineHeight="15px" weight="400" id={ e?.id ? e.id : null }>
                                    { e?.class ? e.class : null }
                                </P>
                            </Div>
                            <Div width="fit-content"padding={ !isMobile ? "0px 10px" : "0px 12px" } id={ e?.id ? e.id : null }>
                                <P color="grey4" size="small" lineHeight="15px" weight="400" id={ e?.id ? e.id : null }>
                                    {
                                        e.num ? e.num : null
                                    }강
                                </P>
                            </Div>
                        </Div>
                    </Div>
                )
            }
        </Div>
    )
}

export default VideoList