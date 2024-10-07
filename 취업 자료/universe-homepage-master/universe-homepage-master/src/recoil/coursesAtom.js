//import
import { atom } from "recoil"

//atom
//대표강의 인덱스
const courseRepresentativeState = atom({
    key: "courseRepresentative",
    default: null
})

const courseCurrentPageState = atom({
    key: "courseCurrentPage",
    default: "0"
})

//강사정보 비디오 인덱스
const courseSelectVideoIndexState = atom({
    key: "courseSelectVideoIndex",
    default: 0
})

const courseInfoState = atom({
    key: "courseInfo",
    default: {
        img: null,
        category: [],
        score: null,
        title: "",
        type: [],
        contents: "",
        name: ""
    }
})

//회차정보
const roundInfoState = atom({
    key: "roundInfo",
    default: {
        ot: { 
            name: "",
            video: null
        },
        roundInfo: []
    }
})

//강사정보
const teacherIdState = atom({
    key: "teacherId",
    default: null
})

const introVideoIdState = atom({
    key: "introVideoId",
    default: null
})

const newsDataState = atom({
    key: "newsData",
    default: []
})

//교재정보
const textbookInfoState = atom({
    key: "textbookInfo",
    default: []
})

//selector

//export

export { 
            courseCurrentPageState, courseSelectVideoIndexState, courseRepresentativeState, 
            courseInfoState, roundInfoState, teacherIdState, introVideoIdState, 
            newsDataState, textbookInfoState
        }