import { CategoryProductRepository } from "@data/interfaces/repositories"
import { CategoryProductEntity, UserAuthEntity } from "@entity"
import { GetLocalStorage, VALUES_APP } from "@utils"

export class CategoryProductServiceImpl {
    private categoryProductRepository: CategoryProductRepository
    constructor(categoryProductRepository: CategoryProductRepository) { this.categoryProductRepository = categoryProductRepository }

    async all(): Promise<CategoryProductEntity[]> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.categoryProductRepository.all(userAuth.token).then(valueCategories => resolve(valueCategories)).catch(e => reject(e))
            }
        })
    }

    async deleteById(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.categoryProductRepository.deleteById(id, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async deleteByIds(ids: number[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.categoryProductRepository.deleteByIds(ids, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async upload(fileValue: File | null, token: string): Promise<string | null> {
        return new Promise(async (resolve, reject) => {
            await this.categoryProductRepository.upload(fileValue, token).then(value => resolve(value)).catch(e => reject(e))
        })
    }

    async register(name: string, iconFilename: string | null): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity

                await this.categoryProductRepository.register({ name, icon: iconFilename }, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async openById(categoryId: number): Promise<CategoryProductEntity> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.categoryProductRepository.openOneById(categoryId, userAuth.token).then(valueCategory => resolve(valueCategory)).catch(e => reject(e))
            }
        })
    }

    async updateAllById(id: number, name: string, statusIcon: -1 | 0 | 1, iconFilename: string | null): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity

                await this.categoryProductRepository.updateAllById(id, { name, status_icon: statusIcon, icon: iconFilename }, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }
}