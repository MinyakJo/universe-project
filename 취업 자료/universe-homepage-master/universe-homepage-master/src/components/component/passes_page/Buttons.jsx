import React, { useEffect } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import Div from "components/common/Div"
import commonButton from "components/common/Button"
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil"
import { selectedIdState, typeSelectedState } from "recoil/tagAtom"
import { isMobileState } from "recoil/mainAtom"

const ButtonBox = styled(Div)`
    width: fit-content;
    flex-wrap: wrap;
`

const Button = styled(commonButton)`
    line-height: 26px;
    border: 1px solid ${CommonStyle.setColor("orange")};
    white-space: nowrap;

    padding: ${props => {
        return props.padding ? props.padding : null
    }};
`

const Buttons = (props) => {

    const isMobile = useRecoilValue(isMobileState)
    const data = props.children.button
    const selected = props.children.selected

    const setSelected = useSetRecoilState( typeSelectedState )
    const setSelectedId = useSetRecoilState( selectedIdState )

    const reset = useResetRecoilState(typeSelectedState)


    const onClickEvent = (e) => {
        const basic = e.target.id
        const index = Number( basic.split("_")[ 1 ] )
        let list = []
        let count = 0
        
        list = [ ...selected ]
        
        if( !isNaN( index ) && data.length > index){
            //전체가 선택되었는데 딴곳을 누르면
            if( index !== 0 && list[ index ] ) list = buttonSelect( list, index )
            //전체를 눌렀는데 이미 눌려있을때
            else if( index === 0 && list[ index ] ) return
            //전체를 눌렀는데 안 눌려있을때
            else if( index === 0 && !list[ index ] ){
                for(let i = 0; i < list.length; i++){
                    list.splice( i, 1, true )
                }
            }
            //그 외
            else list = buttonSelect( list, index )

            //만약 전체를 누르지 않고 전체를 눌렀을때 전체 자동으로 눌리기
            if( !list[ index ] ){
                for(let i = 0; i < list.length; i++){
                    if(list[ i ]){
                        count += 1
                    }
                }
                if( ( list.length - 1 ) === count ){
                    list.splice( 0, 1, true ) 
                }
            }
        }

        //리코일에 반영
        setSelected( list )
        setSelectedId( index )
    }

    const buttonSelect = ( list, index ) => {
        for( let i = 0; i < list.length; i++ ){
            if( index === i ) list.splice(i, 1, true)
            else list.splice(i, 1, false)
        }
        return list
    }

    useEffect(() => {
        return () => {
            reset()
        }
    }, [ reset ])

    return(
        <ButtonBox flex={ !isMobile ? "row" : "row_center" } marginBottom={ props.marginBottom }>
            {
                data && data.map((e, i) => 
                    <Div key={ i } width="fit-content" marginRight="16px" marginBottom="8px">
                        <Button 
                            size={ !isMobile ? "small_large" : "small" } 
                            weight="600" 
                            radius="30px" 
                            backgroundColor={ selected[i] ? "orange" : "white" } 
                            color={ selected[i] ? "white" : "orange" } 
                            padding={ !isMobile ? "8px 28px" : "5px 20px" }
                            id={ `tag_${ i }` }
                            onClick={ onClickEvent }
                        >
                           { e.name } 
                        </Button>
                    </Div>
                )
            }
        </ButtonBox>
    )
}

export default Buttons