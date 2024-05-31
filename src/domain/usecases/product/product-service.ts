import { ProductRepository } from "@data/interfaces/repositories"
import { ProductEntity, UserAuthEntity } from "@entity"
import { GetLocalStorage, VALUES_APP } from "@utils"

export class ProductServiceImpl {
    private productRepository: ProductRepository
    constructor(productRepository: ProductRepository) { this.productRepository = productRepository }

    async all(): Promise<ProductEntity[]> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.productRepository.all(userAuth.token).then(valueCategories => resolve(valueCategories)).catch(e => reject(e))
            }
        })
    }

    async deleteById(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.productRepository.deleteById(id, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async deleteByIds(ids: number[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.productRepository.deleteByIds(ids, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async upload(fileValue: File | null, token: string): Promise<string | null> {
        return new Promise(async (resolve, reject) => {
            await this.productRepository.upload(fileValue, token).then(value => resolve(value)).catch(e => reject(e))
        })
    }

    async register(description: string, grossPrice: string, salePrice: string, photoFilename: string | null): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity

                const grossPriceValue = grossPrice.length > 0 ? grossPrice : null
                const salePriceValue = salePrice.length > 0 ? salePrice : null

                await this.productRepository.register({ description, gross_price: grossPriceValue, sale_price: salePriceValue, photo: photoFilename }, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async openById(productId: number): Promise<ProductEntity> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.productRepository.openOneById(productId, userAuth.token).then(valueProduct => resolve(valueProduct)).catch(e => reject(e))
            }
        })
    }

    async updateAllById(id: number, description: string, grossPrice: string, salePrice: string, statusPhoto: -1 | 0 | 1, photoFilename: string | null): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity

                const grossPriceValue = grossPrice.length > 0 ? grossPrice : null
                const salePriceValue = salePrice.length > 0 ? salePrice : null

                await this.productRepository.updateAllById(id, { description, gross_price: grossPriceValue, sale_price: salePriceValue, status_photo: statusPhoto, photo: photoFilename }, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }
}