import React from "react"
import styled from "styled-components"
import CommonStyle from "components/style"
import commonDiv from "components/common/Div"
import commonButton from "components/common/Button"
import P from "components/common/P"
import document from "../../../svg/document.svg"
import { useRecoilValue } from "recoil"
import CourseStructureTitle from "../../component/passes_page/CourseStructureTitle"
import book from "../../../image/course_page/book.png"
import open_book from "../../../svg/open_book.svg"
import { isMobileState } from "recoil/mainAtom"
import { textbookInfoState } from "recoil/coursesAtom"
import { useNavigate } from "react-router-dom"

const Div = styled(commonDiv)`
    border-bottom: ${props => {
        return props.borderBottom ? `1px solid ${CommonStyle.setColor(props.borderBottom)}` : null
    }};

    min-width: ${props => {
        return props.minWidth ? props.minWidth : null
    }};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const Button = styled(commonButton)`
    display: flex;
    justify-content: ${props => {
        return props.justify ? props.justify : "center"
    }};
    align-items: center;
`

const Line = styled.div`
    width: 100%;
    height: 0px;
    border-bottom: 1px solid ${CommonStyle.setColor("grey1")};
    margin-top: ${props => {
        return props.isMobile ? "5px" : "16px"
    }};
    margin-bottom: ${props => {
        return props.isMobile ? "10px" : "12px"
    }};
`

const Contents = styled(P)`
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`

const BookInfo = () => {

    const isMobile = useRecoilValue(isMobileState)
    const data = useRecoilValue( textbookInfoState )

    const navigate = useNavigate()

    const onClickEvent = e => {
        if( e.target.id && data ) navigate( `/teaching-materials/${ data[ Number( e.target.id ) ].id }` )
    }
    return(
        <Div flex="column" marginTop="50px" marginBottom="60px">
            <CourseStructureTitle>
                {{
                    img: document,
                    title: "교재정보",
                    color: "black"
                }}
            </CourseStructureTitle>

            <Div flex="column" marginTop={ !isMobile ? "40px" : "20px" } marginBottom="30px">
                {
                    data && data.map((e, i) =>
                        <Div key={i} flex="row" marginBottom="27px">
                            {/* 이미지 */}
                            <Div 
                                flex="row" 
                                minWidth={ !isMobile ? "186px" : "112px" }
                                width={ !isMobile ? "186px" : "112px" }
                                height={ !isMobile ? "258px" : "154px" } 
                                marginRight="32px"
                            >
                                <Img src={ e?.img ? `${ process.env.REACT_APP_API_URL }${ e.img }` : open_book }/>
                            </Div>
                            {/* 정보 */}
                            <Div flex="column">
                                {/* 제목 */}
                                <Div flex="row_between">
                                    <Div width="fit-content">
                                        <P 
                                            lineHeight="40px"
                                            size={ !isMobile ? "medium" : "small" } 
                                            weight="700" 
                                            color="bk"
                                        >
                                            {e.title}
                                        </P>
                                    </Div>
                                    <Div flex="row" width="fit-content" height="100%" id={ i } onClick={ onClickEvent }>
                                        <Button color="grey2" size="small_large" weight="400" id={ i }>
                                            <Div 
                                                id={ i }
                                                flex="row" 
                                                width={ !isMobile ? "22px" : "20px" } 
                                                height={ !isMobile ? "22px" : "20px" }
                                                marginRight="9px" 
                                                paddingTop="4px"
                                            >
                                                <Img src={ open_book } id={ i }/>
                                            </Div>
                                            {
                                                !isMobile &&
                                                "자세히보기"
                                            }
                                        </Button>
                                    </Div>
                                </Div> 
                                <Line isMobile={isMobile}/>
                                {/* 내용 */}
                                <Div flex="column" width={ !isMobile ? "810px" : null }>
                                    <Div flex="row" marginBottom={ !isMobile ? "6px" : "15px" }>
                                        <Contents 
                                            color="bk" 
                                            lineHeight="160%"
                                            style={{ fontSize: !isMobile ? 18 : 13 }}
                                            weight="400"
                                        >
                                            {e.contents}
                                        </Contents>
                                    </Div>
                                    <Div flex="column">
                                        <Div flex="row" marginBottom="8px">
                                            <Div width="fit-content" marginRight={ !isMobile ? "22px" : "28px" }>
                                                <P 
                                                    color="bk" 
                                                    style={{ fontSize: !isMobile ? 14 : 12 }} 
                                                    lineHeight={ !isMobile ? "20px" : "17px" }
                                                    weight="400"
                                                >
                                                    발행처
                                                </P>
                                            </Div>
                                            <Div width="fit-content">
                                                <P 
                                                    color="grey3" 
                                                    style={{ fontSize: !isMobile ? 14 : 12 }} 
                                                    lineHeight={ !isMobile ? "20px" : "17px" }
                                                    weight="400"
                                                >
                                                    {e.place}
                                                </P>
                                            </Div>
                                        </Div>
                                        <Div flex="row" marginBottom="8px">
                                            <Div width="fit-content" marginRight={ !isMobile ? "22px" : "28px" }>
                                                <P 
                                                    color="bk" 
                                                    style={{ fontSize: !isMobile ? 14 : 12 }} 
                                                    lineHeight={ !isMobile ? "20px" : "17px" }
                                                    weight="400"
                                                >
                                                    발행일
                                                </P>
                                            </Div>
                                            <Div width="fit-content">
                                                <P 
                                                    color="grey3" 
                                                    style={{ fontSize: !isMobile ? 14 : 12 }} 
                                                    lineHeight={ !isMobile ? "20px" : "17px" }
                                                    weight="400"
                                                >
                                                    {e.date}
                                                </P>
                                            </Div>
                                        </Div>
                                        {
                                            !isMobile &&
                                            <>
                                                <Div flex="row" marginBottom="8px">
                                                    <Div width="fit-content" marginRight="22px">
                                                        <P color="bk" size="extra_small" lineHeight="20px" weight="400">
                                                            사이즈
                                                        </P>
                                                    </Div>
                                                    <Div width="fit-content">
                                                        <P color="grey3" size="extra_small" lineHeight="20px" weight="400">
                                                            {e.size} {"(가로*세로, 단위:mm)"}
                                                        </P>
                                                    </Div>
                                                </Div>
                                                <Div flex="row">
                                                    <Div width="fit-content" marginRight="22px">
                                                        <P color="bk" size="extra_small" lineHeight="20px" weight="400">
                                                            페이지
                                                        </P>
                                                    </Div>
                                                    <Div width="fit-content">
                                                        <P color="grey3" size="extra_small" lineHeight="20px" weight="400">
                                                            {e.page} page
                                                        </P>
                                                    </Div>
                                                </Div>
                                            </>
                                        }
                                    </Div>
                                </Div>
                            </Div>
                        </Div>
                    )
                }
            </Div>
        </Div>
    )
}

export default BookInfo