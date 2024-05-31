import { ClientRepository } from "@data/interfaces/repositories";
import { ClientEntity, UserAuthEntity } from "@entity";
import { GetLocalStorage, VALUES_APP } from "@utils";

export class ClientServiceImpl {
    private clientRepository: ClientRepository
    constructor(clientRepository: ClientRepository) { this.clientRepository = clientRepository }

    async register(name: string, documentNumber: string, email: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                const emailValue = email.length > 0 ? email : null
                await this.clientRepository.register({ name, document_number: documentNumber, email: emailValue }, userAuth.token)
                    .then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async all(): Promise<ClientEntity[]> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.clientRepository.all(userAuth.token).then(valueClients => resolve(valueClients)).catch(e => reject(e))
            }
        })
    }

    async deleteById(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.clientRepository.deleteById(id, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async deleteByIds(ids: number[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.clientRepository.deleteByIds(ids, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async openOneById(id: number): Promise<ClientEntity> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.clientRepository.openOneById(id, userAuth.token).then(valueUser => resolve(valueUser)).catch(e => reject(e))
            }
        })
    }

    async updateAllById(id: number, name: string, email: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.clientRepository.updateAllById(id, { name, email }, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async openInformationByCnpj(cnpj: string): Promise<{
        name: string; email: string; foundation: string; addressCodePostal: string; addressStreet: string; addressNumber: string; addressDistrict: string;
    }> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.clientRepository.openInformationByCnpj(cnpj, userAuth.token).then(valueUser => resolve(valueUser)).catch(e => reject(e))
            }
        })
    }
}