import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import TopBar from "../container/TopBar"
import Footer from "../container/footer/Footer"
import { Main } from "./MainPage"
import commonDiv from "components/common/Div"
import P from "components/common/P"
import H1 from "components/common/H1"
import Button from "components/common/Button"
import { useNavigate, useParams } from "react-router-dom" 
import { useRecoilValue, useResetRecoilState } from "recoil"
import { isMobileState } from "recoil/mainAtom"
import { newsDataState } from "recoil/coursesAtom"

const Div = styled(commonDiv)`
    max-width: 1180px;

    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    padding: ${props => {
        return props.padding ? props.padding : null
    }};

    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
    }};
`

const TitleText = styled(H1)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: pre-line;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => {
        return props.isMobile ? 2 : 1
    }};
`

const Contents = styled(P)`
    white-space: pre-line;
    word-break: break-all;
`

const TeacherNewsPage = () => {

    const { id } = useParams()

    const data = useRecoilValue(newsDataState)
    const resetData = useResetRecoilState( newsDataState )

    const isMobile = useRecoilValue(isMobileState)

    const navigate = useNavigate()

    const [ index, setIndex ] = useState(0)

    useEffect(() => {
        if( id && ( data.length !== 0 ) ){

            let findIndex = 0

            for( let i of data ){
                if( i.id === Number(id) ){
                    break
                }
                findIndex++
            }

            setIndex( findIndex )
        }

        return () => {
            resetData()
        }
    }, [ data, id, resetData ])

    const onClickEvent = () => {
        navigate(-1)
    }

    return(
        <>
            {/* 상단바 */}
            <TopBar menu="orange"/>
            <Main>
                <Div flex="column" padding={ !isMobile ? "76px 0px" : "100px 20px" } paddingBottom={ !isMobile ? "122px" : null }>
                    <Div paddingBottom={ !isMobile ? "32px" : "16px" } borderBottom="grey2">
                        <TitleText weight="700" color="bk" size={ !isMobile ? "large_medium" : "medium" } lineHeight="140%" isMobile={ isMobile }>
                            { data[ index ]?.title ? data[ index ].title : null }
                        </TitleText>
                    </Div>
                    <Div 
                        marginTop={ !isMobile ? "25px" : "25px" } 
                        paddingBottom={ !isMobile ? "31px" : "15px" }
                        borderBottom="grey2"
                        marginBottom={ !isMobile ? "25px" : "25px" }
                    >
                        <Contents color="bk" size={ !isMobile ? "small_large" : "small" } lineHeight="190%" weight="400" family="pretendard">
                            { data[ index ]?.contents ? data[ index ].contents : null }
                        </Contents>
                    </Div>
                    <Div width="fit-content" padding={ !isMobile ? "10px 14px" : "7px 14px" } borderColor="gray3" radius="4px" cursor="pointer"  onClick={ onClickEvent }>
                        <Button 
                            weight="500"
                            family="pretendard"
                            lineHeight="18px"
                            style={{ 
                                color: "#4D4444",
                                fontSize: !isMobile ? 18 : 13
                            }} 
                        >
                            목록
                        </Button>
                    </Div>
                </Div>
            </Main>
            <Footer/>
        </>
    )
}

export default TeacherNewsPage