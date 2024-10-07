import { atom, selector } from "recoil"

//atom

const upassSelectedState = atom({
    key: "upassSelected",
    default: "0"
})

//selector

//export
export { upassSelectedState }