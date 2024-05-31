export const ReturnValueHttp = (valueResponse: any): any => {
    if (typeof valueResponse.status !== "undefined") {
        if (valueResponse.status) return valueResponse.value
        else {
            if (typeof valueResponse.error !== "undefined") throw new ExceptionErrorHttp(valueResponse.error);
            if (typeof valueResponse.validation !== "undefined") throw new ExceptionValidationHttp(JSON.stringify(valueResponse.validation));
        }
    } else throw new Error(JSON.stringify(valueResponse))
}

export class ExceptionErrorHttp extends Error {
    constructor(msg: string) {
        super(msg);
        this.message = msg
        this.name = 'exception_http_error';
    }
}

export class ExceptionValidationHttp extends Error {
    constructor(msg: string) {
        super(msg);
        this.message = msg
        this.name = 'exception_http_validation';
    }
}