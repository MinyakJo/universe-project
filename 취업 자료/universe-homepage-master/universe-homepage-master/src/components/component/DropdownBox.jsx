import React, { useState, useEffect } from "react"
import styled from "styled-components"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import down_vector from "../../svg/down_vector.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import CommonStyle from "components/style"
import { gradeDialogState } from "recoil/dialogAtom"
import { isMobileState } from "recoil/mainAtom"

const DropBox = styled(commonDiv)`
    position: relative;
`

const ItemBox = styled(commonDiv)`
    display: flex;
    max-height: 200px;
    position: absolute;
    flex-direction: column;
    top: 100%;
    left: 0;
    overflow: hidden;
    box-sizing: border-box;
    background-color: ${CommonStyle.setColor("white")};
    z-index: 8;
    border-radius: 0px 0px 10px 10px;

    height: ${props => {
        return props.isOpen ? props.height : "0px"
    }};
    transition: height 0.5s, transform 0.5s, padding 0.5s;

    div{
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar{
            width: 3px;
        }
        &::-webkit-scrollbar-thumb{
            border-radius: 10px;
            background-color: #D7D7D7;
        }
    }
`

const Div = styled(commonDiv)`
    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
`

const Button = styled(commonButton)`
    display: flex;
    align-items: center;
    justify-content: ${props => {
        return props.justify ? props.justify : null
    }};
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
    word-break: break-all;

    rotate: ${props => {
        return props.rotate ? props.rotate : null
    }};
`

const Icon = styled(commonDiv)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => {
        return props.isMobile ? "10px" :"20px"
    }};
    height: ${props => {
        return props.isMobile ? "10px" :"20px"
    }};
    right: 0;
`

const Img = styled.img`
    object-fit: contain;
    width: 10px;
`

const DropdownBox = (props) => {

    const data = props.children
    const [ isOpen, setIsOpen ] = useState(false)
    const [ nowSelect, setNowSelect ] = useState(null)
    const [ grade, setGrade ] = useRecoilState(gradeDialogState)
    const isMobile = useRecoilValue(isMobileState)
    const setState = props.setSelect ? props.setSelect : null
    const refetch = props.refetch ? props.refetch : null

    const onClickEvent = async(e) => {
        const id = e.target.id
        const value = e.target.value

        switch(id){
            case "drop":
                setIsOpen(!isOpen)
                break
            case "reviewBest":
                setIsOpen(!isOpen)
                await setNowSelect(value)
                await setState(2)
                refetch()
                break
            case "reviewNewest":
                setIsOpen(!isOpen)
                await setNowSelect(value)
                await setState(0)
                refetch()
                break
            case "date":
            case "grade":
                setIsOpen(!isOpen)
                setNowSelect(value)

                const copyGrade = { ...grade }

                if(props.grade === "0"){ 
                    const grade1 = {...copyGrade.grade1}
                    const dateList = [...grade1.year]
                    const gradeList = [...grade1.grade]
                    if(id === "date"){
                        dateList[props.index] = value
                    }else{
                        gradeList[props.index] = value
                    }
                    grade1.grade = gradeList
                    grade1.year = dateList
                    copyGrade.grade1 = grade1
                }else if(props.grade === "1"){
                    const grade2 = {...copyGrade.grade2}
                    const dateList = [...grade2.year]
                    const gradeList = [...grade2.grade]

                    if(id === "date"){
                        dateList[props.index] = value
                    }else{
                        gradeList[props.index] = value
                    }
                    grade2.grade = gradeList
                    grade2.year = dateList
                    copyGrade.grade2 = grade2
                }else if(props.grade === "2"){
                    const grade3 = {...copyGrade.grade3}
                    const dateList = [...grade3.year]
                    const gradeList = [...grade3.grade]

                    if(id === "date"){
                        dateList[props.index] = value
                    }else{
                        gradeList[props.index] = value
                    }
                    grade3.grade = gradeList
                    grade3.year = dateList
                    copyGrade.grade3 = grade3
                }
                setGrade(copyGrade)
                break
            default:
        }
    }

    const lineHeightIsPercent = () => {
        let size = props.lineHeight
        if(props.lineHeight.search("%") !== -1){
            size = (Number(props.lineHeight.split("%")[0]) / 100) * Number(CommonStyle.setFontSize(props.size ? props.size : "small_large").split("px")[0])
            return size + "px"
        }
        else{
            return size
        }
    }

    useEffect(() => {
        if(!nowSelect){
            setNowSelect(props.defaultValue ? props.defaultValue : data[0].name)
        }
        setIsOpen(false)
        
    }, [ props.defaultValue, setIsOpen, nowSelect, data ])

    useEffect(() => {
        setNowSelect(null)
    }, [ props.grade ])

    return(
        <DropBox 
            flex="row" 
            width={ props.width ? props.width : "fit-content"} 
            radius={ props.radius ? props.radius : null } 
            borderColor={ props.border ? props.border : null }
            padding={ props.padding ? props.padding : null }
            paddingRight={ props.paddingRight ? props.paddingRight : null }
            onClick={ onClickEvent }
        >
            <Button id="drop" weight={props.weight} color={props.color} size={props.size} lineHeight={props.lineHeight}>
                { nowSelect }
            </Button>
            <ItemBox width="100%" isOpen={ isOpen } height={ `calc((${lineHeightIsPercent()} + 10px) * ${data.length})` } backgroundColor="white">
                <Div height="100%" paddingRight="2px">
                {
                    data && data.map((e, i) =>
                        <Div flex="row" key={i} padding={props.padding ? props.padding : null} paddingTop="5px" paddingBottom="5px" cursor="pointer" backgroundColor="white">
                            <Button id={e.id} value={e.name} weight={props.weight} color={props.color} size={props.size} lineHeight={props.lineHeight}>
                                {e.name}
                            </Button>
                        </Div>
                    )
                }
                </Div>
            </ItemBox>
            <Icon isMobile={ isMobile } marginRight={ props.iconMargin ? props.iconMargin : null }>
                <Button id="drop" backgroundColor="none" justify="center" rotate={ isOpen ? "180deg" : null }>
                    <Img id="drop" src={down_vector}/>
                </Button>
            </Icon>
        </DropBox>
    )
}

export default DropdownBox