import { ProductEntity } from "@entity"
import { RemoveSpecialCaracterString } from "@utils"

export const ProductListFilterInSearch = (search: string, products: ProductEntity[]) => {
    const searchNormalize = RemoveSpecialCaracterString(search).toLowerCase()
    return products.filter(product => {
        const nameNormalize = RemoveSpecialCaracterString(product.description).toLowerCase()
        return product.description.toLowerCase().indexOf(search.toLowerCase()) > -1 || product.description.toLowerCase().indexOf(searchNormalize) > -1 ||
            nameNormalize.indexOf(search.toLowerCase()) > -1 || nameNormalize.indexOf(searchNormalize) > -1
    })
}

export const ProductListFilterInOrder = (products: ProductEntity[]) =>
    products.sort((productA, productB) => {
        const descriptionA = RemoveSpecialCaracterString(productA.description)
        const descriptionB = RemoveSpecialCaracterString(productB.description)
        if (descriptionA.toLowerCase() > descriptionB.toLowerCase()) return 1
        if (descriptionA.toLowerCase() < descriptionB.toLowerCase()) return -1
        return 0
    })