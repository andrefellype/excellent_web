export const msgSelector = (state: any) => state.configurationMessage.msg as {
    title?: string | null, icon?: "success" | "error" | "warning" | "info" | "question" | null, type: "message" | "fail_page",
    msgs: string[], confirmText: string | null, uppercase?: boolean
}