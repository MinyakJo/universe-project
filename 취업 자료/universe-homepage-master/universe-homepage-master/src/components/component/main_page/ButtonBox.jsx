import React from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import CommonStyle from "components/style"
import { useRecoilState, useRecoilValue } from "recoil"
import { isMobileState, tutorialSelectedState } from "../../../recoil/mainAtom"
import { useNavigate } from "react-router-dom"

const Div = styled(commonDiv)`
    max-width: ${props => {
        return props.maxWidth ? props.maxWidth : null
    }};
    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
    background-color: ${props => {
        return props.backgroundColor ? `${CommonStyle.setColor(props.backgroundColor)}` : "transparent"
    }};
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};
`

const Button = styled(commonButton)`
    width: ${props => {
        return props.width ? props.width : "100%"
    }};
    font-weight: 700;
    line-height: 160%;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const ButtonBox = (props) => {

    const data = props?.children
    const isMobile = useRecoilValue(isMobileState)
    const navigate = useNavigate()

    const [ select, setSelect ] = useRecoilState( tutorialSelectedState )

    const onClickEvent = (e) => {
        const basic = e.target.id
        const type = basic.split("_")[0]

        if(props.main){
            switch( type ){
                case "leaf":
                    const firstIndex = Number( e.target.id.split("_")[1] )
                    const secondIndex = Number( e.target.id.split("_")[2] )

                    setSelect({
                        leaf1: firstIndex,
                        leaf2: !isNaN( secondIndex ) ? secondIndex : 0                                                      
                    })
                    break
                default:
            }
        }else{
            switch( type ){
                case "courseRegistrationDetail":
                    navigate(`/passes/${ type }`)
                    break
                default:
            }
        }
    }

    return(
        <Div flex="column_between" onClick={ onClickEvent }>

            {/* Leaf First */}
            <Div flex="row_center" maxWidth="1180px" backgroundColor={ props.backgroundColor }>
                {
                    data && data.map(( e, i ) =>
                        <Div key={ `tutorial_leaf_${ i }` } height={ props.height } backgroundColor={ select.leaf1 === i ? "orange" : null }>
                            <Button 
                                id={ `leaf_${ i }` }
                                color={ select.leaf1 === i  ? "white" : "grey4"} 
                                size={ !isMobile ? "medium" : null }
                                style={{ fontSize: isMobile ? 13 : null }}
                            >
                                { e?.data && e.data.title }
                            </Button>
                        </Div>
                    )
                }
            </Div>

            {/* Leaf Second */}
            <Div 
                flex="row_center"
                maxWidth="1180px"
                borderBottom="grey1"
                marginBottom="20px"
            >
                { 
                    data &&
                    data[ select.leaf1 ]?.children && data[ select.leaf1 ].children.map(( e, i ) =>
                        <Div 
                            key={ `tutorial_leaf_${ select.leaf1 }_${ i }` } 
                            width="fit-content"
                            minWidth={ !isMobile ? "105px" : "48px" }
                            paddingBottom={ !isMobile ? "15px" : "9px" }
                            padding={ !isMobile ? "30px 16px" : "24px 16px" }
                            borderBottom={ select.leaf2 === i ? "orange" : null }
                        >
                            <Button 
                                id={`leaf_${ select.leaf1 }_${ i }`}
                                color={ select.leaf2 === i ? "orange" : "grey4" } 
                                size={ !isMobile ? "medium" : "small" }
                            >
                                { e?.data && e.data.title }
                            </Button>
                        </Div>
                    )
                }
            </Div>

            {/* Leaf Third */}
            {/* {
                tutoSelectNum.leaf1 === 1 &&
                <Div flex="row_center" maxWidth="1180px" marginTop={ !isMobile ? "43px" : null } marginBottom="12px">
                    {
                        tuto3List && tuto3List.map((e, i) =>
                            <Div key={i} flex="row_center" width="fit-content" marginRight="25px" marginLeft="25px">
                                <Button 
                                    id={`leaf3_${i}`}
                                    key={i}
                                    color={ tutoSelectNum.leaf3 === i ? "orange" : "grey4"} 
                                    size={ !isMobile ? "small_large" : "small" }
                                >
                                    {e}
                                </Button>
                            </Div>
                        )
                    }
                </Div>
            } */}
        </Div>
    )
}

export default ButtonBox