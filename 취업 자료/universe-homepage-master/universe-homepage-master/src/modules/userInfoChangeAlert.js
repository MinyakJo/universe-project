export const userInfoChangeAlert = ( setDialog, keyword ) => {
    setDialog({
        isOpen: true,
        textType: "alert",
        btnType: 1,
        data: { message: `${ keyword } 변경이 완료되었습니다.` }
    })
}