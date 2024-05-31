import { ClientEntity } from "@entity"

export interface ClientRepository {
    register(params: { name: string, document_number: string, email: string | null }, token: string): Promise<void>
    all(token: string): Promise<ClientEntity[]>
    deleteById(id: number, token: string): Promise<void>
    deleteByIds(ids: number[], token: string): Promise<void>
    openOneById(id: number, token: string): Promise<ClientEntity>
    updateAllById(id: number, params: { name: string, email: string }, token: string): Promise<void>
    openInformationByCnpj(cnpj: string, token: string): Promise<{
        name: string; email: string; foundation: string; addressCodePostal: string; addressStreet: string; addressNumber: string; addressDistrict: string;
    }>
}