import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import Div from "components/common/Div"
import bannerLeft from "../../../svg/bannerLeft.svg"
import bannerRight from "../../../svg/bannerRight.svg"
import SlideImgBox from "../../component/main_page/SlideImgBox"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useRecoilValue } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import Icon from "components/common/Icon"
import CommonStyle from "components/style"
import { Button } from "../Dialog"
import { useCookies } from "react-cookie"
import Img from "components/common/Img"
import click from "../../../svg/click_icon.svg"

const BannerDiv = styled( Div )`
    position: relative;
    top: ${({ top }) => {
        return top ? top : null
    }};
    left: 0;
    width: 100%;
    min-width: ${({ minWidth }) => {
        return minWidth ? minWidth : null
    }};
    cursor: pointer;
    overflow: hidden;
`

const SolutionIcon = styled( Div )`
    position: absolute;
    border: 1px solid ${ CommonStyle.setColor( "orange" ) };
    border-radius: 50%;
    bottom: 20px;
    right: 15px;
    aspect-ratio: 1 / 1;
`

const blink = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ClickIcon = styled.div`
    position: absolute;
    width: 47px;
    height: 24px;
    top: -5px;
    left: 40px;

    animation: ${ blink } linear 1.5s infinite alternate;
`

const Banner = () => {

    const [ cookies ] = useCookies([ "token" ])

    const { data } = useQuery(
        [ "bannerImages" ],
        async () => fetch("GET", "/banner?page=0&type=0"),
        { refetchOnWindowFocus: false }
    )

    const [ slideData, setSlideData ] = useState()

    const onClickEvent = (e) => {
        const basic = e.target.id
        const type = basic.split("_")[ 0 ]

        switch(type){
            case "banner":
                const link = basic.split("_")[ 1 ]
                
                if(link) window.open( link, "_blank", "noreferrer" )
                break
            case "solution":
                window.open( cookies.token ? `${ process.env.REACT_APP_SOLUTION_URL }` : "/login", "_blank", "noreferrer" )
                break
            default:
        }
    }

    const isMobile = useRecoilValue( isMobileState )

    useEffect(() => {
        setSlideData(
            {
                imgList: data?.data?.bannerArray ? data.data.bannerArray : null,
                next: {
                    img: bannerRight,
                    backgroundColor: "none"
                },
                back: {
                    img: bannerLeft,
                    backgroundColor: "none"
                },
                btnStyle: {
                    width: !isMobile ? "34px" : "22px",
                    height: !isMobile ? "34px" : "22px",
                    distance: !isMobile ? "58px" : "20px",
                    radius: "50%",
                    top: isMobile ? "92px" : null
                },
            }
        )
    }, [ setSlideData, data, isMobile ])

    return(
        <BannerDiv 
            flex="row_center" 
            height={ !isMobile ? "540px" : "667px" }
            minWidth={ !isMobile ? "1180px" : null } 
            onClick={ onClickEvent } 
            backgroundColor="black"
        >
            <SlideImgBox banner height={ !isMobile ? "540px" : "667px" } maxWidth={ !isMobile ? null : "100%" } auto>
                { slideData }
            </SlideImgBox>  
            {
                isMobile &&
                <SolutionIcon id="solution" width="83px" backgroundColor="white">
                    <Button family="esamanru" size="small_medium" weight="500" lineHeight="120%" color="orange" id="solution">
                        반복<br/>시작하기
                    </Button>
                    <ClickIcon>
                        <Img src={ click } id="solution"/>
                    </ClickIcon>
                </SolutionIcon>
            }
        </BannerDiv>
    )
}

export default Banner