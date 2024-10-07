import React, { useEffect } from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import commonH1 from "components/common/H1"
import commonH2 from "components/common/H2"
import commonButton from "components/common/Button"
import clock from "../../../svg/clock.svg"
import monitor from "../../../svg/monitor.svg"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { passDetailInfoState, passIdState } from "../../../recoil/passAtom"
import PassPrice from "../../component/passes_page/PassPrice"
import { useNavigate, useParams } from "react-router-dom"
import { isMobileState } from "recoil/mainAtom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetch } from "modules/fetch"
import { useCookies } from "react-cookie"
import { dialogState } from "recoil/dialogAtom"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};

    flex-wrap: ${props => {
        return props.wrap ? props.wrap : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};

    max-height: ${({ maxHeight }) => {
        return maxHeight ? maxHeight : null
    }};
`

const H1 = styled(commonH1)`
    line-height: 49px;
`

const H2 = styled(commonH2)`
    line-height: 26px;
`

const Button = styled(commonButton)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
    cursor: ${({ cursor }) => {
        return cursor ? cursor : null
    }};
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
`

const Img = styled.img`
    object-fit: contain;
    width: 100%;
`

const IconBox = styled(Div)`
    width: 18px;
    height: 18px;
`

const PassInfo = () => {

    //param
    const { id } = useParams()

    //navigate
    const navigate = useNavigate()

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    const [ info, setInfo ] = useRecoilState( passDetailInfoState )
    const setPassId = useSetRecoilState( passIdState )
    const setDialog = useSetRecoilState( dialogState )

    const { data } = useQuery(
        [ "passDetailFetchData" ],
        async () => await fetch("GET", `/home/pass/${ id }/detail`, null, { Authorization: cookies.token }),
        { refetchOnWindowFocus: false }
    )

    useEffect(() => {
        if(data?.data){
            const d = data.data.pass

            setInfo({
                ...info,
                img: d.thumbnail,
                title: d.passName,
                contents: d.passDescription,
                course_duration: d.duration,
                cost: Math.floor(d.salesPrice / 12),
                price: d.regularPrice,
                sale_price: d.salesPrice,
                id: d.id,
                num_lecture: data.data.totalVideoCount,
                permission: data.data.permission
            })
            
            setPassId( d.id )
        }
    }, [ data, setInfo ])

    const onClickEvent = () => {
        if( cookies.token && !info.permission ) navigate("/purchase-pass")
        else if( cookies.token && info.permission ) return
        else {
            setDialog({
                isOpen: true,
                textType: "alert",
                data: {
                    navigate: "login",
                    message: "로그인 후 이용해 주세요."
                },
                btnType: 1
            })
        }
    }

    return(
        <Div flex={ !isMobile ? "row" : "column_center" } marginTop="50px" height={ !isMobile ? "360px" : null }>
            <Div flex="row_center" width={ !isMobile ? "50%" : null } height="100%" maxHeight={ !isMobile ? null : "188px" } marginBottom={ !isMobile ? null : "17px" } backgroundColor="grey1" overflow="hidden">
                {
                    info.img &&
                    <Img src={ `${ process.env.REACT_APP_API_URL }${ info.img }` }/>
                }
            </Div>
           <Div flex="column_top" width={ !isMobile ? "50%" : null } height="100%" padding={ !isMobile ? "25px 60px" : null } paddingRight="0px">

                {/* 패스 이름 */}
                <Div flex="row" marginBottom={ !isMobile ? "10px" : "8px" }>
                    <Div width="fit-content">
                        <H1 color="bk" weight="700" size={ !isMobile ? null : "medium_large" } style={{ fontSize: !isMobile ? 34 : null, whiteSpace: "nowrap" }}>
                            { info.title }
                        </H1>
                    </Div>
                </Div>

                {/* 패스 설명 */}
                <Div marginBottom={ !isMobile ? "20px" : "5px" }>
                    <H2 color="grey5" size={ !isMobile ? "small_large" : "extra_small" } weight="600">
                        { info.contents }
                    </H2>
                </Div>

                {/* 패스의 강의 정보 */}
                <Div flex="row" marginBottom={ !isMobile ? "18px" : "15px" } wrap={ !isMobile ? null : "wrap" }>
                    <Div flex="row" width="fit-content" marginRight={ !isMobile ? "16px" : "54px" }>
                        <IconBox marginRight="6px">
                            <Img src={ monitor }/>
                        </IconBox>
                        <Div>
                            <P size="extra_small" color="grey4" weight="600" lineHeight="210%">
                                강의개수 : { info.num_lecture }강
                            </P>
                        </Div>
                    </Div>
                    <Div flex="row" width="fit-content" marginRight="16px">
                        <IconBox marginRight="6px">
                            <Img src={ monitor }/>
                        </IconBox>
                        <Div>
                            <P size="extra_small" color="grey4" weight="600" lineHeight="210%">
                                강좌개수 : { info.num_courses }개
                            </P>
                        </Div>
                    </Div>
                    <Div flex="row" width="fit-content" marginRight={ !isMobile ? "16px" : "54px" }>
                        <IconBox marginRight="6px">
                            <Img src={ clock }/>
                        </IconBox>
                        <Div>
                            <P size="extra_small" color="grey4" weight="600" lineHeight="210%">
                                수강기간 : { info.course_duration }일
                            </P>
                        </Div>
                    </Div>
                </Div>

                {/* 수강료 */}
                <Div marginBottom="25px">
                    <PassPrice>
                        { info }
                    </PassPrice>
                </Div>

                {/* 수강신청 버튼 */}
                <Div height={ !isMobile ? "50px" : "45px" }>
                    <Button 
                        id={ !data?.data?.permission ? "courseRegistration" : null } 
                        color="white" 
                        backgroundColor="orange" 
                        radius="4px" 
                        size="small" 
                        weight="700" 
                        lineHeight="160%"
                        onClick={ onClickEvent }
                        cursor={ !data?.data?.permission ? "pointer" : "default" }
                    >
                        { !data?.data?.permission ? "수강신청" : "구입완료" }
                    </Button>
                </Div>
           </Div>
        </Div>
    )
}

export default React.memo(PassInfo)