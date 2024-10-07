import { atom } from "recoil"

//atom

const topBarSelectedState = atom({
    key: "topBarSelectedState",
    default: "main"
})

const menuIsOpenState = atom({
    key: "menuIsOpenState",
    default: false
})

//selector

export { topBarSelectedState, menuIsOpenState }