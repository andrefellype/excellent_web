export const RemoveSpecialCaracterString = (value: string) => (value.length > 0) ? value.replace(/[áàãâä]/iu, "a").replace(/[éèêë]/iu, "e").replace(/[íìîï]/iu, "i")
    .replace(/[óòõôö]/iu, "o").replace(/[úùûü]/iu, "u").replace(/[ç]/iu, "c").replace(/_+/, "_") : ""
