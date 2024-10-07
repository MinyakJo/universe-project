import React, { Suspense, useEffect } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import commonButton from "components/common/Button"
import clock from "../../../svg/clock.svg"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { passListState } from "recoil/passAtom"
import { useNavigate } from "react-router-dom"
import PassPrice from "../../component/passes_page/PassPrice"
import { currentPageState, isMobileState } from "recoil/mainAtom"
import { useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import PageButtonBox from "components/component/PageButtonBox"
import Buttons from "components/component/passes_page/Buttons"
import useRefetch from "hooks/useRefetch"
import Spinner from "components/component/Spinner"
import { selectedButtonSelector, selectedIdState, typeButtonListState, typeSelectedState } from "recoil/tagAtom"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};

    position: ${props => {
        return props.position ? props.position : null
    }};

    z-index: ${props => {
        return props.zIndex ? props.zIndex : null
    }};

    left: ${props => {
        return props.left ? props.left : null
    }};

    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => {
        return props.isMobile ? "center" : null
    }};
    align-items: center;
    width: 100%;
    margin-bottom: 40px;
`

const Thumbnail = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 23px 20px;
    box-sizing: border-box;
    width: 100%;
    max-width: 380px;
    margin-left: ${props => {
        return props.marginLeft ? "20px" : null
    }};
    margin-bottom: 20px;
`

const Button = styled(commonButton)`
    font-size: ${CommonStyle.setFontSize("extra_small")};
    line-height: 180%;
    font-weight: 700;
    color: ${CommonStyle.setColor("white")};
    background: linear-gradient(116.86deg, #FF5C00 0%, #FFA959 104.7%);
    border-radius: 4px;
    padding: 9px 0px;
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
    cursor: ${props => {
        return props.cursor ? props.cursor : null
    }};
    border-radius: ${props => {
        return props.radius ? props.radius : null
    }};
`

const PassList = () => {
    const navigate = useNavigate()

    const isMobile = useRecoilValue(isMobileState)

    const page = useRecoilValue(currentPageState)
    const resetPage = useResetRecoilState(currentPageState)

    const [ dataList, setDataList ] = useRecoilState( passListState )

    const selected = useRecoilValue( selectedButtonSelector )
    const selectedId = useRecoilValue( selectedIdState )
    const [ buttonList, setButtonList ] = useRecoilState( typeButtonListState )
    const [ boolList, setBoolList ] = useRecoilState( typeSelectedState )
    
    const tagData = useQuery(
        [ "passTagFetchData" ],
        async () => await fetch("GET", "/property?page=0&type=4"),
        { refetchOnWindowFocus: false, suspense: true }
    )
    const { data, refetch } = useQuery(
        [ "passListFetchData" ],
        async () => await fetch("GET",  selectedId ? `/home/pass?tag=${ selected[ 0 ] }&page=${ page }` : `/home/pass?page=${ page }` ),
        { refetchOnWindowFocus: false, suspense: true }
    )
    
    useEffect(() => {
        if(data?.data){
            const list = []
            const d = data.data
            
            for(let i of d.passArray){
                list.push({
                    img: i.thumbnail,
                    id: i.id,
                    name: i.passName,
                    date: i.duration,
                    cost: Math.floor(i.salesPrice / 12),
                    price: i.regularPrice,
                    sale_price: i.salesPrice,
                })
            }
            setDataList(list)
        }
    }, [ resetPage, data, setDataList ])

    useEffect(() => {
        if(tagData.data?.data && (buttonList.length === 1)){
            const td = tagData.data.data.propertyArray
            const copyButtonList = [ { name: "전체", order: 0 } ]
            const copyBoolList = [ true ]
            
            for(let i of td){
                copyButtonList.push({
                    name: i.name,
                    id: i.id
                })
                copyBoolList.push(true)
            }
            setButtonList(copyButtonList)
            setBoolList(copyBoolList)
        }
    }, [ tagData.data, buttonList.length, setButtonList, setBoolList ])

    useRefetch({ refetch, el: page })
    useRefetch({ refetch, el: selectedId })

    const onClickEvent = (e) => {
        const id = e.target.id
        if(id !== "" && id !== undefined && id !== null){
            navigate(`./${id}`)
        }
    }
    
    return(
        <>
            {/* 수강 타입 버튼 */}
            <Buttons course marginBottom="40px">
                {{
                    button: buttonList,
                    selected: boolList,
                }}
            </Buttons>

            <Section isMobile={isMobile}>
                {
                    dataList && dataList.map((e, i) => 
                        <Suspense key={ i } fallback={ <Spinner width="200px"/> }>
                            <Thumbnail marginLeft={ !isMobile && (i % 3 !== 0) ? true : false } id={ e.id } onClick={ onClickEvent }>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

                                {/* 패스 이미지 */}
                                <Div flex="row_center" height="180px" radius="10px" backgroundColor="grey1" overflow="hidden">
                                    <Img src={ e?.img ? `${ process.env.REACT_APP_API_URL }${ e.img }` : null } cursor="pointer" id={ e.id } radius="10px"/>
                                </Div>

                                {/* 패스 이름 */}
                                <Div marginTop="13px">
                                    <P color="bk" size="medium_small" weight="700" lineHeight="32px">{ e.name }</P>
                                </Div>

                                {/* 수강기간 */}
                                <Div flex="row" marginTop="3px">
                                    <Div flex="row" width="18px" height="18px" backgroundColor="orange" radius="50%" marginRight="6px">
                                        <Img src={clock}/>
                                    </Div>
                                    <Div flex="row">
                                        {
                                            isNaN(Number( e.date ))?
                                            <P color="grey4" size="extra_small" weight="600" lineHeight="29px">수강기간 : { e.date }</P>:
                                            <P color="grey4" size="extra_small" weight="600" lineHeight="29px">수강기간 : { e.date }일</P>
                                        }
                                    </Div>
                                </Div>

                                <Div paddingTop="10px">
                                    <PassPrice>
                                        { e }
                                    </PassPrice>
                                </Div>

                                {/* 자세히 보기 */}
                                <Div marginTop={ !isMobile ? "20px" : "18px" }>
                                    <Button id={ e.id }>
                                        자세히 보기
                                    </Button>
                                </Div>
                            </Thumbnail>
                        </Suspense>
                    )
                }

                <PageButtonBox>
                    {{
                        page: page,
                        pageCnt: data ? data.data.totalPage : 1
                    }}
                </PageButtonBox>
            </Section>
        </>
    )
}

export default PassList