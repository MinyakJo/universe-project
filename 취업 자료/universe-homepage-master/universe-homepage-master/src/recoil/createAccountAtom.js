import { atom } from "recoil"

const alertState = atom({
    key: "alert",
    default: null
})
const isSameIdState = atom({
	key: "isSameId",
	default: false
})

const userDataState = atom({
    key: "useDate",
    default: {
		loginId: "", 
		password: "",
		name: "",
		phone: "",
		marketing: false,
		birthday: "",
		profileImage: null,
		grade: null, 
		parentName: "", 
		parentBirthday: "", 
		parentPhone: "",
	}
})

const userOKState = atom({
    key: "userOK",
    default: null
})

const parentsOKState = atom({
    key: "parentsOK",
    default: null
})

const agreementState = atom({
    key: "agreement",
    default: null
})

export { alertState, userOKState, parentsOKState, agreementState, userDataState, isSameIdState }