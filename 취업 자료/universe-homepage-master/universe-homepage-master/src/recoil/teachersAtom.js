//import
import { atom } from "recoil"

//atom

const lecturePageState = atom({
    key: "lecturePage",
    default: 1
})

//selector

//export
export { lecturePageState }