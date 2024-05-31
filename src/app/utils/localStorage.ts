import { CryptographyConvertBase64 } from "./cryptography"

export const SaveLocalStorage = (nameLocal: string, value: any, encrypt: "base64" | null = "base64") => {
    if (encrypt === "base64") localStorage.setItem(nameLocal, CryptographyConvertBase64(value, "encode"))
    else localStorage.setItem(nameLocal, value)
}

export const GetLocalStorage = (nameLocal: string, decrypt: "base64" | null = "base64") => {
    let dataLocal: any = localStorage.getItem(nameLocal)
    if (dataLocal !== null) {
        if (decrypt === "base64") dataLocal = CryptographyConvertBase64(dataLocal, "decode")
    }
    return dataLocal
}

export const DeleteLocalStorage = (nameLocal: string) => localStorage.removeItem(nameLocal)