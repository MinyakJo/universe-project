//import
import { atom } from "recoil"

//atom
const reviewTotalDataState = atom({
    key: "reviewTotalData",
    default: {
        totalReview: null,
        totalScore: null,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    }
})

//export
export { 
    //atom
    reviewTotalDataState
}