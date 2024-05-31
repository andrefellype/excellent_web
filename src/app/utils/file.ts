export const ConvertFileUpload = (filesElement: any) => {
    const files = filesElement.current?.files
    if (typeof files !== "undefined" && files !== null) {
        let getFile: File | null = null
        if (files && files.length > 0) getFile = files[0]
        return getFile
    }
    return null
}