import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import CommonStyle from "components/style"
import default_profile from "../../../svg/default_profile.svg"
import speaker from "../../../svg/loud_speak.svg"
import { star } from "../passes_page/PassReview";
import { useRecoilState, useRecoilValue } from "recoil";
import { dialogState } from "recoil/dialogAtom";
import { isMobileState } from "recoil/mainAtom";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "modules/fetch";
import Spinner from "components/component/Spinner";

const Div = styled(commonDiv)`
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};

    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};

    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};

    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("white")}` : null
    }};

    align-items: ${props => {
        return props.align ? props.align : null
    }};

    aspect-ratio: ${({ ratio }) => {
        return ratio ? ratio : null
    }};

    cursor: pointer;
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    cursor: pointer;

    border-radius: ${({ radius }) => {
        return radius ? radius : null
    }};
    max-height: ${props => {
        return props.maxHeight ? props.maxHeight : null
    }};
`

//slider css
const StyledSlider = styled(Slider)`
    display: flex;
    align-items: center;
    width: 100%;
    position: ${props => {
        return props.position ? props.position : "relative"
    }};
    background-color: ${CommonStyle.setColor("none")};
    .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;
    };
    .slick-list{
        width: 100%;
    }
    .slick-track{
        display:flex;
        cursor: pointer;
        margin-left: 0;
        margin-right: 0;
    }

    cursor: pointer;
`

const Pre = styled(commonDiv)`
    position: absolute;
    z-index: 3;
    flex-basis: ${props => {
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
    flex-basis: ${props => {
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

const Contents = styled(P)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    cursor: pointer;
`

const ReviewSlide = (props) => {

    const { data } = useQuery(
        [ "bestReviewFetchData" ],
        async () => await fetch("GET", "/home/review/best"),
        { refetchOnWindowFocus: false }
    )
    
    const [ dataList, setDataList ] = useState([])

    const isMobile = useRecoilValue(isMobileState)
    const nextArr = props.children.next
    const backArr = props.children.back
    const btnStyle = props.children.btnStyle
    const [ dialog, setDialog ] = useRecoilState(dialogState)

    const settings = {
        variableWidth: true,
        dots: false,
        infinite: dataList.length > 3 ? true : false,
        speed: 400,
        autoplay: props.auto ? true : false,
        autoplaySpeed: 1000,
        slidesToShow: 3,
        slideToScroll: 1,
        centerPadding: "0px",
        nextArrow: (
            <NextTo 
                backgroundColor={nextArr.backgroundColor} 
                width={btnStyle.width} 
                height={btnStyle.height} 
                right={btnStyle.distance}
                radius={btnStyle.radius}
                top={btnStyle.top}
            >
                <Img src={nextArr.img}/>
            </NextTo>
        ),
        prevArrow: (
            <Pre 
                backgroundColor={backArr.backgroundColor} 
                width={btnStyle.width} 
                height={btnStyle.height} 
                left={btnStyle.distance}
                radius={btnStyle.radius}
                top={btnStyle.top}
            >
                <Img src={backArr.img}/>
            </Pre>
        )
    }

    const onClickEvent = (e) => {
        const id = e.target.id
        if(id){
            const copy = {...dialog}

            copy.textType = "review"
            copy.isOpen = true
            copy.data = dataList[ id ]
            setDialog(copy)
        }
    }

    useEffect(() => {
        if( data?.data ){
            const list = []

            for(let i of data.data.reviewArray){
                list.push({
                    title: i.title,
                    profile: i.userProfileImage,
                    name: i.userName,
                    score: i.star,
                    contents: i.contents,
                    date: i.registrationDate,
                    id: i.id,
                })
            }

            setDataList( list )
        }
    }, [ setDataList, data ])

    return(
        <Div flex="row_center" width={props.width} paddingTop={ !isMobile ? null : "68px" }>
            <StyledSlider {...settings} position={ props.banner ? "static" : "relative"}>
                {
                    dataList.length !== 0 ?
                    dataList && dataList.map((e, i) => 
                        <Div key={i} 
                            flex="column"
                            maxWidth={ !isMobile ? "380px" : "calc(100vw - 40px)" }
                            minWidth={ !isMobile ? "380px" : "calc(100vw - 40px)" }
                            padding={ !isMobile ? "30px 25px" : "30px 22px" }
                            backgroundColor="white" 
                            radius="10px"
                            marginRight={ !isMobile ? "20px" : null }
                            id={ i }
                            onClick={onClickEvent}
                        > 
                            <Div flex={ !isMobile ? "row" : "column_center" } marginBottom={ !isMobile ? "14px" : "16px" } id={ i }>
                                <Div flex="row" minWidth="70px" width="70px" marginRight={ !isMobile ? "9px" : null } marginBottom={ !isMobile ? null : "17px" } id={ i }>
                                    <Img src={ speaker } id={ i }/>
                                </Div>
                                <Div flex="row" width="fit-content" id={ i }>
                                    <P color="dark_purple" style={{ fontSize: !isMobile ? 20 : 21 }} id={ i }>
                                        { e.title }
                                    </P>
                                </Div>
                            </Div>
                            <Div flex={ !isMobile ? "row_between" : "column_center" } id={ i } marginBottom="9px">
                                {
                                    isMobile &&
                                    <Div flex="row" width="fit-content" marginBottom="27px">
                                        { star({ score: e.score, width: "24px", height: "22px", yellow: true, id: e.id }) }
                                    </Div>
                                }
                                <Div flex="row" width={ !isMobile ? "fit-content" : null } id={ i }>
                                    <Div flex="row_center" minWidth={ !isMobile ? "36px" : "34px" } width={ !isMobile ? "36px" : "34px" } marginRight="16px" ratio="1 / 1">
                                        <Img src={ e.profile ? `${ process.env.REACT_APP_API_URL }${ e.profile }` : default_profile } id={ i } radius="50%"/>
                                    </Div>
                                    <Div flex="row" width="fit-content">
                                        <P color="bk" weight="400" lineHeight="24px" style={{ fontSize: !isMobile ? 17 : 16 }} id={ i }>
                                            { e.name }
                                        </P>
                                    </Div>
                                </Div>
                                {
                                    !isMobile &&
                                    <Div flex="row" width="fit-content" id={ i }>
                                        { star({ score: e.score, width: "22px", height: "20px", yellow: true, id: i }) }
                                    </Div>
                                }
                            </Div>
                            <Div flex="row" height="108px" align="start" id={ i }>
                                <Contents color="grey4" weight="400" size="small_medium" lineHeight="27px" id={ i }>
                                    { e.contents }
                                </Contents>
                            </Div>
                        </Div>
                    ):
                    <Div flex="row_center" height="280px">
                        <P color=""></P>
                    </Div>
                }
            </StyledSlider>
        </Div>
    )
}

export default ReviewSlide