import { CryptographyConvertBase64 } from "./cryptography";
import { VALUES_APP } from "./variables";

export const USER_AUTH = () => {
    let tokenLocal: any = localStorage.getItem(VALUES_APP().LOCAL_STORAGE.KEY_USER)
    if (tokenLocal !== null) {
        tokenLocal = CryptographyConvertBase64(tokenLocal, "decode")
    }
    if (tokenLocal !== null) return JSON.parse(tokenLocal) as any;
    return null;
}