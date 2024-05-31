import { VALUES_APP } from "./variables"

export const FormatCellphone = (cellphone: string) =>
  (cellphone.length === 11) ? `(${cellphone.substring(0, 2)}) ${cellphone.substring(2, 7)}-${cellphone.substring(7, 11)}` : cellphone

export const FormatNumberToCurrencyBrl = (value: string, symbolCurrency: string) => {
  if (value.length > 0) {
    let numberIntegerTemp = ""
    let numberDecimal = ""
    let statusPoint = false
    for (let v = 0; v < value.length; v++) {
      if (value[v] !== "." && !statusPoint) numberIntegerTemp += value[v]
      else if (value[v] === ".") statusPoint = true
      else if (statusPoint) numberDecimal += value[v]
    }
    let numberInteger = numberIntegerTemp
    if (numberIntegerTemp.length > 3) {
      numberInteger = ""
      let subNumber = ""
      for (let n = (numberIntegerTemp.length - 1); n >= 0; n--) {
        subNumber += numberIntegerTemp[n]
        if (subNumber.length === 3 && n > 0) {
          numberInteger += `${subNumber}.`
          subNumber = ""
        } else if (n === 0) numberInteger += subNumber
      }
      numberInteger = numberInteger.split("").reverse().join("")
    }
    return `${symbolCurrency} ${numberInteger}${statusPoint ? "," : ",00"}${numberDecimal.length > 0 ? numberDecimal : ""}`
  }
  return value
}

export const FormatCnpj = (cnpj: string) =>
  (cnpj.length === 14) ? `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}-${cnpj.substring(8, 12)}-${cnpj.substring(12, 14)}` : cnpj

export const FormatNumberToCurrencyBrlCustom = (value: string) => FormatNumberToCurrencyBrl(value, VALUES_APP().APP.SYMBOL_CURRENCY)