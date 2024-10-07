import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { passDetailCurrentPageState } from "../../../recoil/passAtom"
import { courseCurrentPageState } from "../../../recoil/coursesAtom"
import { currentPageState, isMobileState } from "recoil/mainAtom"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor(props.border)}` : null
    }};

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    border-bottom-width: ${props => {
        return props.borderBottomWidth ? props.borderBottomWidth : null
    }};
`

const Button = styled(commonButton)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
`

const DetailButtons = (props) => {

    const list = props.children
    const isMobile = useRecoilValue(isMobileState)
    
    const [ currentPage, setCurrentPage ] = useRecoilState(passDetailCurrentPageState)
    const [ courseCurrentPage, setCourseCurrentPage ] = useRecoilState(courseCurrentPageState)
    const resetPage = useResetRecoilState( currentPageState )

    const page = props.course ? courseCurrentPage : currentPage

    const onClickEvent = (e) => {
        if( props.course && e.target.id ){
            setCourseCurrentPage(e.target.id)
            resetPage()
        }else if( e.target.id ){
            setCurrentPage(e.target.id)
            resetPage()
        }
    }

    return(
        <Div flex="row" marginTop={ props.marginTop ? props.marginTop : "50px" } height={ !isMobile ? "54px" : "45px" } onClick={onClickEvent} borderBottom="orange">
            {
                list && list.map((e, i) =>
                    <Div 
                        key={ `${ props.course ? "course" : "pass" }_${ i }` } 
                        border={ e.id === Number(page) ? "orange" : "grey1"} 
                        height="100%" 
                        borderBottomWidth="0px"
                    >
                        <Button 
                            id={ e.id } 
                            color={ e.id === Number(page) ? "orange" : "grey5"} 
                            family="pretendard" 
                            weight="600" 
                            size={ !isMobile ? "small_large" : "extra_small" }
                        >
                            { e.name }
                        </Button>
                    </Div>
                )
            }
        </Div>
    )
}

export default DetailButtons