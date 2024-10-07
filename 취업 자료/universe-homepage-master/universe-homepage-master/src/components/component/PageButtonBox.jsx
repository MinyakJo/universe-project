import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import Div from "components/common/Div"
import commonButton from "components/common/Button"
import grey_vector from "../../svg/page_right.svg"
import grey_double_vector from "../../svg/right_double_grey_vector.svg"
import light_vector from "../../svg/left_vector.svg"
import light_grey_double_vector from "../../svg/left_double_vector.svg"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { lecturePageState } from "recoil/teachersAtom"

const ButtonDiv = styled(Div)`
    border: 1px solid ${CommonStyle.setColor("grey1")};
    margin: ${props => {
        return props.margin ? props.margin : null
    }};
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Img = styled.img`
    color: ${ CommonStyle.setColor("grey4") };
`

const PageButtonBox = (props) => {

    const data = props.children
    const setPage = useSetRecoilState(currentPageState)
    const setLecturePage = useSetRecoilState(lecturePageState)
    const isMobile = useRecoilValue(isMobileState)

    const onClickEvent = (e) => {

        const id = e.target.id

        if(!isNaN(Number(id)) && id){
            if( props.lecture ) setLecturePage(Number(id))
            else setPage(Number(id))
        }else if(id === "prev"){
            if(data.page > 1){
                if( props.lecture ) setLecturePage(data.page - 1)
                else setPage(data.page - 1)
            }
        }else if(id === "next"){
            if(data.page < data.pageCnt){
                if( props.lecture ) setLecturePage(data.page + 1)
                else setPage(data.page + 1)
            }
        }else if(id === "start"){
            if( props.lecture ) setLecturePage(1)
            else setPage(1)
        }else if(id === "end"){
            if( props.lecture ) setLecturePage(data.pageCnt)
            else setPage(data.pageCnt)
        }

        return
    }

    return(
        <Div flex="row_center" backgroundColor="transparent" onClick={onClickEvent}>
            <Div flex="row_center" width="fit-content">
                <ButtonDiv 
                    flex="row" 
                    width={ !isMobile ? "36px" : "30px" } 
                    height={ !isMobile ? "36px" : "30px" }
                    margin={ !isMobile ? "0px 5px" : "0px 4px" }
                    id="start"
                >
                    <Button backgroundColor="none" id="start">
                        <Img src={ data.page === 1 ? light_grey_double_vector : grey_double_vector } id="start" style={{ transform: data.page !== 1 ? "rotate( 180deg )" : null }}/>
                    </Button>
                </ButtonDiv>
                <ButtonDiv 
                    flex="row" 
                    width={ !isMobile ? "36px" : "30px" } 
                    height={ !isMobile ? "36px" : "30px" }
                    margin={ !isMobile ? "0px 5px" : "0px 4px" }
                    id="prev"
                >
                    <Button backgroundColor="none" id="prev">
                        <Img src={ data.page === 1 ? light_vector : grey_vector } id="prev" style={{ transform: data.page !== 1 ? "rotate( 180deg )" : null }}/>
                    </Button>
                </ButtonDiv>
            </Div>
                
            <Div flex="row" width="fit-content">
                { page(data, { width: !isMobile ? "36px" : "30px", margin: !isMobile ? "0px 5px" : "0px 4px" }) }
            </Div>

            <Div width="fit-content" flex="row_center">
                <ButtonDiv 
                    flex="row" 
                    width={ !isMobile ? "36px" : "30px" } 
                    height={ !isMobile ? "36px" : "30px" } 
                    margin={ !isMobile ? "0px 5px" : "0px 4px" }
                    id="next"
                >
                    <Button backgroundColor="none" id="next">
                        <Img src={ data.page === data.pageCnt ? light_vector : grey_vector } id="next" style={{ transform: data.page === data.pageCnt ? "rotate( 180deg )" : null }}/>
                    </Button>
                </ButtonDiv>
                <ButtonDiv 
                    flex="row" 
                    width={ !isMobile ? "36px" : "30px" } 
                    height={ !isMobile ? "36px" : "30px" }
                    margin={ !isMobile ? "0px 5px" : "0px 4px" }
                    id="end"
                >
                    <Button backgroundColor="none" id="end">
                        <Img src={ data.page === data.pageCnt ? light_grey_double_vector : grey_double_vector } id="end" style={{ transform: data.page === data.pageCnt ? "rotate( 180deg )" : null }}/>
                    </Button>
                </ButtonDiv>
            </Div>
        </Div>
    )
}

const page = (data, option) => {
    const list = []

    const current = data.page
    let start = 1
    let cnt = 5

    if(current > 5){
        if(current % 5 !== 0){
            start = 5 * Math.floor( current / 5 ) + 1
            cnt = 5 * Math.ceil( current / 5 )
        }else if(current % 5 === 0){
            start = 5 * ( ( current / 5 ) - 1 ) + 1
            cnt = 5 * ( current / 5 )
        }
        if(cnt > data.pageCnt){
            cnt = data.pageCnt
        }
    }
    if(data.pageCnt < 5){
        cnt = data.pageCnt
    }

    for(let i = start; i < cnt + 1; i++){
        list.push(
            <ButtonDiv key={i} width={ option.width } height= { option.width } margin={ option.margin }>
                <Button weight="600" 
                    size="extra_small"
                    color={ i === Number(data.page) ? "white" : "bk" }
                    backgroundColor={ i === Number(data.page) ? "bk" : "none" }
                    id={ i }
                >
                    { i }
                </Button>
            </ButtonDiv>
        )
    }
    return list
}

export default React.memo(PageButtonBox)