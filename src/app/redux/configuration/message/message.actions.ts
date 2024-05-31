import { updateMsgReducer } from "./message.reducer";

export const msgUpdateAction = (dispatch: any, values: {
    icon?: "success" | "error" | "warning" | "info" | "question" | null, msgs: string[] | string, type?: "message" | "fail_page",
    title?: string | null, uppercase?: boolean, confirmText?: string | null
}) => {
    let msgsV: string[] = typeof values.msgs === "string" ? [values.msgs] : values.msgs
    const valuesMsg = { ...values, type: values.type ? values.type : "message", msgs: msgsV }
    dispatch(updateMsgReducer(valuesMsg))
}