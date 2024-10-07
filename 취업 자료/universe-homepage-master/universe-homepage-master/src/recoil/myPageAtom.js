import { atom, selector } from "recoil"

//atom
const menuSelectedState = atom({
    key: "menuSelected",
    default: "info"
})

const paymentHistoryState = atom({
    key: "paymentHistory",
    default: []
})

//selector

export { menuSelectedState, paymentHistoryState }