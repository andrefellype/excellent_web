export class MaskHelper {
    maskValue: string
    constructor(maskValue: string) { this.maskValue = maskValue }

    mask(valueField: string | null) {
        if (valueField !== null && valueField.length > 0) {
            const value = this.unmask(valueField)
            let valueMask = ""
            let position = 0
            for (let m = 0; m < this.maskValue.length; m++) {
                if (position < value.length) {
                    if (this.maskValue[m] !== "*") valueMask += this.maskValue[m]
                    else {
                        valueMask += value[position]
                        position++
                    }
                } else break
            }
            return valueMask
        }
        return valueField ? valueField : ""
    }

    unmask(value: string) {
        let valueUnMask = ""
        for (let v = 0; v < value.length; v++) {
            if (v < this.maskValue.length) {
                if (value[v] !== this.maskValue[v]) {
                    valueUnMask += value[v]
                }
            }
        }
        return valueUnMask
    }
}

export const MASK_PHONE = "(**) ****-****"
export const MASK_CELLPHONE = "(**) *****-****"
export const MASK_CPF = "***.***.***-**"
export const MASK_CNPJ = "**.***.***/****-**"
export const MASK_CODE_POSTAL = "*****-***"
export const MASK_DATE = "**/**/****"
export const MASK_TIME = "**:**"
export const MASK_COIN = "**,**"