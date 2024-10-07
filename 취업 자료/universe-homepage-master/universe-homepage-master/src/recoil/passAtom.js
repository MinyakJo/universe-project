//import
import { atom } from "recoil"

//atom
const passListState = atom({
    key: "passList",
    default: []
})

const passIdState = atom({
    key: "passId",
    default: null
})

const passDetailInfoState = atom({
    key: "passDetailInfo",
    default: {
        img: null,
        title: "",
        contents: "",
        num_lecture: "",
        num_courses: "",
        course_duration: "",
        cost: "",
        price: "",
        sale_price: "",
        id: null
    }
})

const passReviewState = atom({
    key: "passReview",
    default: {
        score: null,
        num: 0,
        totalPage: 1,
        review: []
    }
})

//강좌구성, 커리큘럼, 수강평 버튼
const passDetailCurrentPageState = atom({
    key: "passDetailCurrentPage",
    default: "0"
})

//export

export { 
        //수강신청 페이지
        passListState,
        //수강신청 상세페이지
        passDetailInfoState, passDetailCurrentPageState, passReviewState,
        passIdState
    }