import { UserEntity } from "@entity"
import { FormatCellphone, RemoveSpecialCaracterString } from "@utils"

export const UserListFilterInSearch = (search: string, users: UserEntity[]) => {
    const searchNormalize = RemoveSpecialCaracterString(search).toLowerCase()
    return users.filter(user => {
        const nameNormalize = RemoveSpecialCaracterString(user.name).toLowerCase()
        return user.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || user.name.toLowerCase().indexOf(searchNormalize) > -1 ||
            nameNormalize.indexOf(search.toLowerCase()) > -1 || nameNormalize.indexOf(searchNormalize) > -1
    })
}

export const UserListFilterInOrder = (order: string, users: UserEntity[]) =>
    users.sort((userA, userB) => {
        if (order === "name") {
            const nameA = RemoveSpecialCaracterString(userA.name)
            const nameB = RemoveSpecialCaracterString(userB.name)
            if (nameA.toLowerCase() > nameB.toLowerCase()) return 1
            if (nameA.toLowerCase() < nameB.toLowerCase()) return -1
        } else if (order === "cellphone") {
            const cellphoneA = userA.cellphone ? FormatCellphone(userA.cellphone) : 'NOT_HAVE'

            const cellphoneB = userB.cellphone ? FormatCellphone(userB.cellphone) : 'NOT_HAVE'

            if (cellphoneA !== null && cellphoneB !== null) {
                if (cellphoneA.toLowerCase() > cellphoneB.toLowerCase()) return 1
                if (cellphoneA.toLowerCase() < cellphoneB.toLowerCase()) return -1
            }
        }
        return 0
    })