import { ERROR_MSG_DEFAULT, ERROR_MSG_INTERFACE } from "@app/data/http/error-api-const-default";

export const ERROR_MSG_API: ERROR_MSG_INTERFACE[] = [
    ...ERROR_MSG_DEFAULT,

    { object: "user", other_value: false, param: "name", msgApi: "not_empty" },
    { object: "user", other_value: false, param: "cellphone", msgApi: "not_empty" },
    { object: "user", other_value: false, param: "cellphone", msgApi: "format_invalid" },
    { object: "user", other_value: false, param: "cellphone", msgApi: "is_exists" },
    { object: "user", other_value: false, param: "password", msgApi: "not_empty" },
    { object: "user", other_value: true, param: "password", msgApi: "not_length_min_and_max" },
    { object: "user", other_value: false, param: "password_confirm", msgApi: "not_empty" },
    { object: "user", other_value: false, param: "password_confirm", msgApi: "not_confirm_field" },

    { object: "client", other_value: false, param: "name", msgApi: "not_empty" },
    { object: "client", other_value: false, param: "document_number", msgApi: "not_empty" },
    { object: "client", other_value: false, param: "document_number", msgApi: "format_invalid" },
    { object: "client", other_value: false, param: "document_number", msgApi: "is_exists" },
    { object: "client", other_value: false, param: "email", msgApi: "not_empty" },
    { object: "client", other_value: false, param: "email", msgApi: "format_invalid" },

    { object: "category_product", other_value: false, param: "name", msgApi: "not_empty" },
    { object: "category_product", other_value: false, param: "name", msgApi: "is_exists" },

    { object: "product", other_value: false, param: "description", msgApi: "not_empty" },
    { object: "product", other_value: false, param: "description", msgApi: "is_exists" },

    { object: "order", other_value: false, param: "quantity", msgApi: "not_empty" },
    { object: "order", other_value: false, param: "product_id", msgApi: "not_empty" },
    { object: "order", other_value: false, param: "client_id", msgApi: "not_empty" }
]