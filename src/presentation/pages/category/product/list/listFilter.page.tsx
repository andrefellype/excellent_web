import { CategoryProductEntity } from "@entity"
import { RemoveSpecialCaracterString } from "@utils"

export const CategoryProductListFilterInSearch = (search: string, categories: CategoryProductEntity[]) => {
    const searchNormalize = RemoveSpecialCaracterString(search).toLowerCase()
    return categories.filter(category => {
        const nameNormalize = RemoveSpecialCaracterString(category.name).toLowerCase()
        return category.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || category.name.toLowerCase().indexOf(searchNormalize) > -1 ||
            nameNormalize.indexOf(search.toLowerCase()) > -1 || nameNormalize.indexOf(searchNormalize) > -1
    })
}

export const CategoryProductListFilterInOrder = (categories: CategoryProductEntity[]) =>
    categories.sort((categoryA, categoryB) => {
        const nameA = RemoveSpecialCaracterString(categoryA.name)
        const nameB = RemoveSpecialCaracterString(categoryB.name)
        if (nameA.toLowerCase() > nameB.toLowerCase()) return 1
        if (nameA.toLowerCase() < nameB.toLowerCase()) return -1
        return 0
    })