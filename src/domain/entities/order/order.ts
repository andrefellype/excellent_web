import { ClientEntity } from "../client";
import { ProductEntity } from "../product";

export interface OrderEntity {
    id: number;
    quantity: number;
    product: ProductEntity | null
    client: ClientEntity | null
}