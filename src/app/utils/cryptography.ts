import { decode, encode } from "base-64"

export const CryptographyConvertBase64 = (value: string, actionCryptography: string) => {
  switch (actionCryptography) {
    case "encode": return encode(value)
    case "decode": return decode(value)
    default: return value;
  }
};
