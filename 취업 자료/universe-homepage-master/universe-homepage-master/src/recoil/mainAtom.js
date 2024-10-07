import { atom, selector } from "recoil"

//atom

//유저정보
const userState = atom({
    key: "user",
    default: {}
})

const promotionState = atom({
    key: "promotion",
    default: {
        id: null,
        registrationDate: null,
        type: null,
        name: "",
        start: null,
        end: null,
        expose: false
    }
})

//메인페이지 동영상
const tutorialSelectedState = atom({
    key: "tutorialSelected",
    default: {
        leaf1: 0,
        leaf2: 0
    }
})

//공용
const isMobileState = atom({
    key: "isMobile",
    default: false
})

const currentPageState = atom({
    key: "currentPage",
    default: 1
})

const dateState = atom({
    key: "date",
    default: {
        date: new Date(),
        year: new Date().getFullYear(),
        month: (new Date().getMonth() + 1) < 10 ? `0${ new Date().getMonth() + 1 }` : new Date().getMonth() + 1,
        day: new Date().getDate() < 10 ? `0${ new Date().getDate() }` : new Date().getDate()
    }
})

//selector
const thisMonthFirstDaySelector = selector({
    key: "thisMonthFirstDay",
    get: ({ get }) => {
        const date = get(dateState)
        const newDate = new Date( date.year, date.month - 1, 1 )
        const data = {
            date: newDate,
            year: newDate.getFullYear(),
            month: (newDate.getMonth() + 1) < 10 ? `0${ newDate.getMonth() + 1 }` : newDate.getMonth() + 1,
            day: newDate.getDate() < 10 ? `0${ newDate.getDate() }` : newDate.getDate()
        }

        return data
    }
})
const thisMonthLastDaySelector = selector({
    key: "thisMonthLasttDay",
    get: ({ get }) => {
        const date = get(dateState)
        const newDate = new Date( date.year, date.month, 0 )
        const data = {
            date: newDate,
            year: newDate.getFullYear(),
            month: (newDate.getMonth() + 1) < 10 ? `0${ newDate.getMonth() + 1 }` : newDate.getMonth() + 1,
            day: newDate.getDate() < 10 ? `0${ newDate.getDate() }` : newDate.getDate()
        }

        return data
    }
})
const lastMonthFirstDaySelector = selector({
    key: "lastMonthFirstDay",
    get: ({ get }) => {
        const date = get(dateState)
        const newDate = new Date( date.year, (date.month - 2), 1 )
        const data = {
            date: newDate,
            year: newDate.getFullYear(),
            month: (newDate.getMonth() + 1) < 10 ? `0${ newDate.getMonth() + 1 }` : newDate.getMonth() + 1,
            day: newDate.getDate() < 10 ? `0${ newDate.getDate() }` : newDate.getDate()
        }

        return data
    }
})
const lastMonthLastDaySelector = selector({
    key: "lastMonthLasttDay",
    get: ({ get }) => {
        const date = get(dateState)
        const newDate = new Date( date.year, date.month - 1, 0 )
        const data = {
            date: newDate,
            year: newDate.getFullYear(),
            month: (newDate.getMonth() + 1) < 10 ? `0${ newDate.getMonth() + 1 }` : newDate.getMonth() + 1,
            day: newDate.getDate() < 10 ? `0${ newDate.getDate() }` : newDate.getDate()
        }

        return data
    }
})

export { 
    userState,
    
    //atom
    tutorialSelectedState, promotionState,
    isMobileState, currentPageState, dateState,

    //selector
    thisMonthFirstDaySelector, thisMonthLastDaySelector,
    lastMonthFirstDaySelector, lastMonthLastDaySelector,
}