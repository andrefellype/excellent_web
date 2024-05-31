import { ERROR_MSG_API } from '@utils'

export type ERROR_API_PARAMS = { location: string, msg: string, params?: string | null, value: string }

export class ValidatorError {
  public static convertErrosInMsgs(errors: any[], uppercase = false): string[] {
    const errorsStr = errors.map(error => {
      const paramApi = error.path
      if (typeof paramApi !== "undefined") {
        const errorListParam = ERROR_MSG_API.filter((errorV) => (errorV.object === error.object) && paramApi === errorV.param)
        const errorList = errorListParam.filter((errorV) => error.msg === errorV.msgApi)
        if (errorListParam.length > 0) {
          if (errorList.length > 0 && !errorList[0].other_value) {
            const msgApi = typeof errorList[0].msgApiCustom !== "undefined" ? errorList[0].msgApiCustom : errorList[0].msgApi
            return `validation.${errorList[0].object}.${errorList[0].param}.${msgApi}`
          }
          if (errorList.length > 0 && errorList[0].other_value) {
            const errorParamNull = ERROR_MSG_API.filter((errorV) => errorV.param.length === 0 && error.msg === errorV.msgApi)
            if (errorParamNull.length > 0) {
              const msgApi = typeof errorParamNull[0].msgApiCustom !== "undefined" ? errorParamNull[0].msgApiCustom : errorParamNull[0].msgApi
              return CONVERT_ERROR_IN_OTHER(errorParamNull[0].object, errorParamNull[0].param, msgApi)
            }
            return error.msg
          }
          const msgsArray = error.msg.split(":")
          if (errorList.length === 0 && msgsArray.length > 1) {
            const errorListSplit = errorListParam.filter((errorV) => msgsArray[0] === errorV.msgApi)
            if (errorListSplit.length > 0) {
              const msgApi = typeof errorListSplit[0].msgApiCustom !== "undefined" ? errorListSplit[0].msgApiCustom : errorListSplit[0].msgApi
              let validationErro = `validation.${errorListSplit[0].object}.${errorListSplit[0].param}.${msgApi}`
              for (let vv = 0; vv < msgsArray.length; vv++) {
                if (vv !== 0) validationErro += `_${msgsArray[vv]}`
              }
              return validationErro
            }
          }
          if (errorList.length === 0) {
            const errorListSplit = ERROR_MSG_API.filter((errorV) => errorV.param.length === 0 && error.msg === errorV.msgApi)
            if (errorListSplit.length > 0) {
              const msgApi = typeof errorListSplit[0].msgApiCustom !== "undefined" ? errorListSplit[0].msgApiCustom : errorListSplit[0].msgApi
              return `validation.api.${msgApi}`
            }
            return error.msg
          }
          return error.msg
        }
        if (errorListParam.length === 0) {
          const errorListSplit = ERROR_MSG_API.filter((errorV) => errorV.param.length === 0 && error.msg === errorV.msgApi)
          if (errorListSplit.length > 0) {
            const msgApi = typeof errorListSplit[0].msgApiCustom !== "undefined" ? errorListSplit[0].msgApiCustom : errorListSplit[0].msgApi
            return `validation.api.${msgApi}`
          }
        }
        return error.msg
      }
      if (typeof paramApi === "undefined") {
        const errorList = ERROR_MSG_API.filter((errorV) => errorV.param.length === 0 && error.msg === errorV.msgApi)
        if (errorList.length > 0) {
          const msgApi = typeof errorList[0].msgApiCustom !== "undefined" ? errorList[0].msgApiCustom : errorList[0].msgApi
          return `validation.api.${msgApi}`
        }
        return error.msg
      }
      return ""
    })
    return errorsStr.map((error) => {
      let errorStr = uppercase ? error.toUpperCase() : error
      return errorStr
    })
  }
}

export const CONVERT_ERROR_IN_OTHER = (object: string | null, param: string, msgApi: string) =>
  object === null ? `validation.api.${msgApi}` : `validation.${object}.${param}.${msgApi}`