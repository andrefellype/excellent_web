import { ClientEntity } from "@entity"
import { FormatCnpj, RemoveSpecialCaracterString } from "@utils"

export const ClientListFilterInSearch = (search: string, clients: ClientEntity[]) => {
    const searchNormalize = RemoveSpecialCaracterString(search).toLowerCase()
    return clients.filter(client => {
        const nameNormalize = RemoveSpecialCaracterString(client.name).toLowerCase()
        return client.name.toLowerCase().indexOf(search.toLowerCase()) > -1 || client.name.toLowerCase().indexOf(searchNormalize) > -1 ||
            nameNormalize.indexOf(search.toLowerCase()) > -1 || nameNormalize.indexOf(searchNormalize) > -1
    })
}

export const ClientListFilterInOrder = (order: string, clients: ClientEntity[]) =>
    clients.sort((clientA, clientB) => {
        if (order === "name") {
            const nameA = RemoveSpecialCaracterString(clientA.name)
            const nameB = RemoveSpecialCaracterString(clientB.name)
            if (nameA.toLowerCase() > nameB.toLowerCase()) return 1
            if (nameA.toLowerCase() < nameB.toLowerCase()) return -1
        } else if (order === "documentNumber") {
            const documentNumberA = clientA.documentNumber ? FormatCnpj(clientA.documentNumber) : 'NOT_HAVE'

            const documentNumberB = clientB.documentNumber ? FormatCnpj(clientB.documentNumber) : 'NOT_HAVE'

            if (documentNumberA !== null && documentNumberB !== null) {
                if (documentNumberA.toLowerCase() > documentNumberB.toLowerCase()) return 1
                if (documentNumberA.toLowerCase() < documentNumberB.toLowerCase()) return -1
            }
        }
        return 0
    })