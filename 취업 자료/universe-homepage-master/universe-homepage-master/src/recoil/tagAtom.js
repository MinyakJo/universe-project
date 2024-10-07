//import
import { atom, selector } from "recoil"

//atom
const typeButtonListState = atom({
    key: "typeButtonList",
    default: [ 
        { name: "전체", id: 0 }, 
    ]
})

const typeSelectedState = atom({
    key: "typeSelected",
    default: [ true ]
})

const selectedIdState = atom({
    key: "selectedId",
    default: 0
})

//selector
const selectedButtonSelector = selector({
    key: "passSelectedButton",
    get: ({ get }) => {
        const boolList = get(typeSelectedState)
        const buttonList = get(typeButtonListState)
        const newList = []

        for(let i = 1; i < boolList.length ; i++){
            if( boolList[i] ){
                newList.push(buttonList[i].id)
            }
        }

        return newList
    }
})

//export

export { typeButtonListState, typeSelectedState, selectedIdState, selectedButtonSelector }