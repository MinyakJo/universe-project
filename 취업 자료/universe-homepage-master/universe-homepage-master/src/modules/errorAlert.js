export const errorAlert = ( setDialog, error ) => {
    setDialog({
        isOpen: true,
        btnType: 1,
        data: { message: error.message },
        textType: "alert"
    })
}