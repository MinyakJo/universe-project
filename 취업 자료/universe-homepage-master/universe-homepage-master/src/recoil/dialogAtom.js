//import
import { atom } from "recoil"

//atom
const dialogState = atom({
    key: "dialog",
    default: {
        data: null,
        isOpen: false,
        btnType: null,
        textType: null,
        inputType: null
    }
})

const gradeDialogState = atom({
    key: "gradeDialog",
    default: {
        grade1: {
            year: [ null, null, null, null ],
            grade: [ null, null, null, null ]
        }, 
        grade2: {
            year: [ null, null, null, null ],
            grade: [ null, null, null, null ]
        }, 
        grade3: {
            year: [ null, null, null, null ],
            grade: [ null, null, null, null ]
        }, 
    }
})

//selector

//export

export { dialogState, gradeDialogState }