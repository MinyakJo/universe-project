export const loginAlert = ( setDialog, token, navigate ) => {
    if( !token ){
        setDialog({
            isOpen: true,
            textType: "alert",
            btnType: 1,
            data: { message: "로그인 후 이용해 주세요.", navigate: navigate ? navigate : "login" }
        })
    }
}