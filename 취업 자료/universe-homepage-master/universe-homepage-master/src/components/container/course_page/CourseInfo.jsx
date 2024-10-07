import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonP from "components/common/P"
import commonH1 from "components/common/H1"
import commonButton from "components/common/Button"
import { useRecoilValue, useSetRecoilState } from "recoil"
import star from "../../../svg/star.svg"
import small_user from "../../../svg/small_user.svg"
import eye from "../../../svg/white_eye.svg"
import { isMobileState } from "recoil/mainAtom"
import { courseInfoState, courseRepresentativeState, roundInfoState } from "recoil/coursesAtom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { dialogState } from "recoil/dialogAtom"

const Div = styled(commonDiv)`
    border: ${props => {
        return props.border ? `1px solid ${CommonStyle.setColor("orange")}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth :  null
    }};

    aspect-ratio: ${props => {
        return props.ratio ? props.ratio : null
    }};

    overflow: ${({ overflow }) => {
        return overflow ? overflow : null
    }};
`

const H1 = styled(commonH1)`
    font-size: 34px;
    line-height: 49px;
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: center;
    align-items: center;

    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};
`

const P = styled(commonP)`
    line-height: ${props => {
        return props.lineHeight ? props.lineHeight : null
    }};

    white-space: pre-line;
    word-break: break-all;
`

const Img = styled.img`
    object-fit: cover;
    height: 100%;
`

const Line = styled.div`
    width: 0px;
    height: 14px;
    border-left: 1px solid ${CommonStyle.setColor("grey3")};
    margin: 0px 10px;
`

const CourseInfo = () => {

    //cookie
    const [ cookies ] = useCookies([ "token" ])

    //navigate
    const navigate = useNavigate()

    //recoil
    const isMobile = useRecoilValue(isMobileState)

    const data = useRecoilValue(courseInfoState)

    const videoData = useRecoilValue( roundInfoState )

    const representative = useRecoilValue( courseRepresentativeState )

    const setDialog = useSetRecoilState( dialogState )

    //query
    // const mutation = useMutation(
    //     async data => await fetch( "POST", `/home/purchase`, data, { Authorization: cookies.token } ),
    //     {
    //         onSuccess: () => {
    //             navigate("/purchase-pass-done")
    //         },
    //         onError: (error) => {
    //             setDialog({
    //                 isOpen: true,
    //                 textType: "alert",
    //                 data: { message: error.message, navigate: "back" },
    //                 btnType: 1
    //             })
    //         }
    //     }
    // )

    const onClickEvent = e => {
        const id = e.target.id
        switch( id ){
            case "video":
                if( representative || ( representative === 0 ) ) {
                    setDialog({
                        isOpen: true,
                        textType: "video",
                        data: {
                            src: videoData.roundInfo[ representative ].src
                        },
                        btnType: 1
                    })
                }
                return
            case "takingCourse":
                if( cookies.token ) navigate("/purchase-pass")
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
                return
            default:
                return
        }
    }

    return(
        <Div flex="row" marginTop="50px" onClick={ onClickEvent }>
            {
                !isMobile &&
                <Div flex="row_center" minWidth="672px" height="395px" marginRight="28px" backgroundColor="grey1" radius="4px" overflow="hidden">
                    {
                        data?.img &&
                        <Img src={ `${ process.env.REACT_APP_API_URL }${ data.img }` }/>
                    }
                </Div>
            }

            {/* backendData */}
            <Div flex="column">
                <Div flex="row" marginBottom={ !isMobile ? "12px" : "14px" } style={{ flexWrap: "wrap" }}>
                    {
                        data?.category && data.category.map((e, i) =>
                            <Div key={i} width="fit-content" backgroundColor="bk" radius="15px" padding={ !isMobile ? "4px 10px" : "7px 12px" } marginRight="9px" marginBottom={ !isMobile ? null : "8px" }>
                                <P color="white" weight="500" size="extra_small" lineHeight="20px" style={{ whiteSpace: "nowrap" }}>
                                    { e }
                                </P>
                            </Div>
                        )
                    }
                    <Div flex="row" width="fit-content">
                        <Div flex="row_center" width={ !isMobile ? "18px" : "14px" } height={ !isMobile ? "18px" : "14px" } marginRight="5px">
                            <Img src={star}/>
                        </Div>
                        <Div width="fit-content">
                            <P color="bk" weight="500" size={ !isMobile ? "small" : "extra_small" } lineHeight="22px">
                                { ( data?.score || data.score === 0 ) ? ( data.score * 10 ) % 10 === 0 ? `${ data.score }.0` : data.score : null }
                            </P>
                        </Div>
                    </Div>
                </Div>
                <Div flex="row" marginBottom="2px">
                    <H1 color="bk" weight="700" style={{ fontSize: !isMobile ? 34 : 26 }} lineHeight="49px">
                        { data?.title ? data.title : null }
                    </H1>
                </Div>
                <Div flex="row" marginBottom="18px">
                    {
                        data?.type && data.type.map((e, i) =>
                            <React.Fragment key={i}>
                                <Div flex="row" width="fit-content">
                                    <P color="grey3" size={ !isMobile ? "small" : "extra_small" } lineHeight="22px" weight="400">
                                        { e }
                                    </P>
                                </Div>
                                {
                                    (i + 1) !== data.type.length &&
                                    <Line/>
                                }
                            </React.Fragment>
                        )
                    }
                </Div>
                <Div flex="row" marginBottom={ !isMobile ? "12px" : "3px" }>
                    <P color="bk" size={ !isMobile ? "small_medium" : "extra_small" } weight="400" lineHeight={ !isMobile ? "28px" : "25px" }>
                        { data?.contents ? data.contents : null }
                    </P>
                </Div>
                <Div flex="row" marginBottom="30px">
                    <Div flex="row" width="fit-content" marginRight="9px">
                        <Div flex="row" width={ !isMobile ? "24px" : "20px" } height={ !isMobile ? "24px" : "20px" } marginRight="6px">
                            <Img src={ small_user }/>
                        </Div>
                        <Div width="fit-content">
                            <P color="bk" weight="500" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="28px">
                                강사명
                            </P>
                        </Div>
                    </Div>
                    <Div width="fit-content">
                        <Div width="fit-content">
                            <P color="grey3" weight="500" size={ !isMobile ? "small_medium" : "extra_small" } lineHeight="28px">
                                { data?.name ? data.name : null } 선생님
                            </P>
                        </Div>
                    </Div>
                </Div>
                <Div flex="row" marginBottom={ !isMobile ? null : "30px" }>
                    <Div width={ !isMobile ? "164px" : null } height={ !isMobile ? "54px" : "45px" }>
                        <Button radius="4px" backgroundColor="orange" color="white" size={ !isMobile ? "small_large" : "small" } weight="500" id="video">
                            <Div flex="row" width="20px" height="20px" marginRight="11px" id="video">
                                <Img src={ eye } id="video"/>
                            </Div>
                            대표강의 보기
                        </Button>
                    </Div>
                </Div>

                {
                    isMobile &&
                    <Div flex="row" backgroundColor="grey1" radius="4px" ratio="16/9">
                        {
                            data?.img &&
                            <Img width="100%" src={ `${ process.env.REACT_APP_API_URL }${ data.img }` }/>
                        }
                    </Div>
                }

            </Div>
        </Div>
    )
}

export default React.memo(CourseInfo)