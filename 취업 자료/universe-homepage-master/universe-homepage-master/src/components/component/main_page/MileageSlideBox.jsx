import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import CommonStyle from "components/style"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};

    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("white")}` : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};
`

//slider css
const StyledSlider = styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ banner }) => {
        return banner ? "100vw" : "100%"
    }};
    height: 100%;

    position: ${props => {
        return props.position ? props.position : "relative"
    }};

    .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;
    };
`

const Pre = styled(commonDiv)`
    position: absolute;
    z-index: 3;
    min-width: ${props => {
        return props.width ? props.width : null
    }};
    left: ${props => {
        return props.left ? props.left : null
    }};
    top: ${props => {
        return props.top ? props.top : null
    }};

    &:hover{
        opacity: 0.7;
        background-color: ${props => {
            return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
        }};
    }
`

const NextTo = styled(commonDiv)`
    position: absolute;
    z-index: 3;
    min-width: ${props => {
        return props.width ? props.width : null
    }};
    right: ${props => {
        return props.right ? props.right : null
    }};
    top: ${props => {
        return props.top ? props.top : null
    }};

    &:hover{
        opacity: 0.7;
        background-color: ${props => {
            return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
        }};
    }
`

const MileageSlideBox = (props) => {

    const data = props.children
    const nextArr = data?.next
    const backArr = data?.back
    const btnStyle = data?.btnStyle
    const isMobile = useRecoilValue(isMobileState)

    const settings = {
        variableWidth: true,
        dots: false,
        infinite: true,
        speed: 400,
        autoplay: props.auto ? true : false,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slideToScroll: 1,
        centerPadding: "0px",
        lazyLoad: true,
        nextArrow: (
            <NextTo
                id="next"
                backgroundColor={nextArr?.backgroundColor} 
                width={btnStyle?.width} 
                height={btnStyle?.height} 
                right={btnStyle?.distance}
                radius={btnStyle?.radius}
                top={btnStyle?.top}
            >
                <Img src={nextArr?.img}/>
            </NextTo>
        ),
        prevArrow: (
            <Pre
                id="prev"
                backgroundColor={backArr?.backgroundColor} 
                width={btnStyle?.width} 
                height={btnStyle?.height} 
                left={btnStyle?.distance}
                radius={btnStyle?.radius}
                top={btnStyle?.top}
            >
                <Img src={backArr?.img}/>
            </Pre>
        )
    }

    return(
        <Div flex="row_center" width={ props.maxWidth ? props.maxWidth : "1920px" } maxHeight={ props.maxHeight } height="100%">
            <StyledSlider {...settings} position={ props.banner ? "static" : "relative"} banner={ props.banner }>
                {
                    data?.imgList && data.imgList.map((e, i) => 
                        <Div key={i} height="100%" flex="row_center" maxWidth={ props.maxWidth ? props.maxWidth : "1920px" } maxHeight={ props.maxHeight }>
                            {
                                !isMobile && e.pcImage ?
                                <Img src={ `${ e.pcImage }` } id={ `banner_${ e?.link ? e.link : "" }` }/>:
                                isMobile && e.mobileImage &&
                                <Img src={ `${ e.mobileImage }` } id={ `banner_${ e?.link ? e.link : "" }` }/>
                            }
                            {
                                e.text &&
                                <Div flex="row_center" marginTop="38px" height="68px" radius="10px" backgroundColor="orange" padding={ !isMobile ? null : "14px 17px" }>
                                    <Div flex="row_center" width={ !isMobile ? "36px" : "22px" } height={ !isMobile ? "36px" : "22px" } border="white" marginRight="11px">
                                        <P color="white" size={ !isMobile ? "medium_small" : "extra_small" } style={{ fontSize: !isMobile ? null : 13 }}>
                                            {i + 1}
                                        </P>
                                    </Div>
                                    <Div width="fit-content">
                                        <P color="white" size={ !isMobile ? "medium_small" : null } style={{ fontSize: !isMobile ? null : 13 }}>
                                            { e.text }
                                        </P>
                                    </Div>
                                </Div>
                            }
                        </Div>
                    )
                }
            </StyledSlider>
        </Div>
    )
}

export default MileageSlideBox