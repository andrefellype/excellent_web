export const VALUES_APP = (): { APP: { NAME: string, COUNTRY: string, SYMBOL_CURRENCY: string }, API: { URL: string, URL_FILES: string }, LOCAL_STORAGE: { KEY_USER: string } } => {
    const isProduction = process.env.NODE_ENV === 'production' || (window.location.href.indexOf("localhost") === -1 && window.location.href.indexOf("127.0.0.1") === -1)
    return {
        APP: { NAME: !isProduction ? "EXCELLENT" : "", COUNTRY: !isProduction ? "BR" : "", SYMBOL_CURRENCY: !isProduction ? "R$" : "" },
        API: { URL: !isProduction ? "http://127.0.0.1:3331/" : "", URL_FILES: !isProduction ? "http://127.0.0.1:3331/files" : "" },
        LOCAL_STORAGE: { KEY_USER: !isProduction ? "user_local_excellent_5F814A2907F8072EE89DAB478D7CEA81" : "" }
    }
}

export const notImage = `${process.env.PUBLIC_URL}/images/noImage.png`