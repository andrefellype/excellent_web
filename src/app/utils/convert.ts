import { ValidatorError } from "@app/data/http/error-api"
import { ExceptionErrorHttp, ExceptionValidationHttp } from "./http"

export const ConvertDateTimeToString = (value: Date, isSeconds = true) => {
  const yearStr = value.getFullYear()
  const month = value.getMonth() + 1
  const monthStr = month >= 1 && month <= 9 ? `0${month}` : month
  const day = value.getDate()
  const dayStr = day >= 1 && day <= 9 ? `0${day}` : day
  const hours = value.getHours()
  const hoursStr = hours >= 0 && hours <= 9 ? `0${hours}` : hours
  const minutes = value.getMinutes()
  const minutesStr = minutes >= 0 && minutes <= 9 ? `0${minutes}` : minutes
  const seconds = value.getMinutes()
  const secondsStr = seconds >= 0 && seconds <= 9 ? `0${seconds}` : seconds
  return `${dayStr}/${monthStr}/${yearStr} ${hoursStr}:${minutesStr}${isSeconds ? `:${secondsStr}` : ""}`
}

export const ErrorCatchHttpInMsg = (e: any): string[] => {
  if (typeof e.validation !== "undefined") return ValidatorError.convertErrosInMsgs(JSON.parse(e.validation));
  else if (typeof e.error !== "undefined") return [e.error]
  else return [JSON.stringify(e)]
}

export const ErrorException = (reject: any, err: any) => {
  if (err instanceof ExceptionErrorHttp) reject({ error: err.message })
  else if (err instanceof ExceptionValidationHttp) reject({ validation: err.message })
  else reject({ error: err })
}