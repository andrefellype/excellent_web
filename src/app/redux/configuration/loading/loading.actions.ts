import { loadingTableUpdateReducer, loadingUpdateReducer } from "./loading.reducer";

export const loadingUpdateAction = (dispatch: any, values: { title?: string | null; status: boolean }) => {
    const titleV = typeof values.title === "undefined" ? 'other.loading_datas' : values.title
    dispatch(loadingUpdateReducer({ ...values, title: titleV }))
}

export const loadingTableUpdateAction = (dispatch: any, values: { title?: string | null; status: boolean }) => {
    const titleV = typeof values.title === "undefined" ? 'other.loading_datas' : values.title
    dispatch(loadingTableUpdateReducer({ ...values, title: titleV }))
}