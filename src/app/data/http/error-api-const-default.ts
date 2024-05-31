export interface ERROR_MSG_INTERFACE {
    object: string | null,
    other_value: boolean,
    param: string,
    msgApi: string,
    msgApiCustom?: string
}

export const ERROR_MSG_DEFAULT: ERROR_MSG_INTERFACE[] = [
    { object: null, other_value: false, param: "", msgApi: "not_empty" },
    { object: null, other_value: false, param: "", msgApi: "format_invalid" },
    { object: null, other_value: false, param: "", msgApi: "is_exists" },
    { object: null, other_value: false, param: "", msgApi: "not_length_min_and_max" },
    { object: null, other_value: false, param: "", msgApi: "not_confirm_field" },
    { object: null, other_value: false, param: "", msgApi: "token_invalid" },
    { object: null, other_value: false, param: "", msgApi: "under_maintenance" },
    { object: null, other_value: false, param: "", msgApi: "not_exists" },
    { object: null, other_value: false, param: "", msgApi: "not_validate" },
    { object: null, other_value: false, param: "", msgApi: "permission_not_validate" },
    { object: null, other_value: false, param: "", msgApi: "format_int_invalid" }
]