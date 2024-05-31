export interface ProductEntity {
    id: number;
    description: string;
    grossPrice: string | null;
    salePrice: string | null;
    photo: string | null;
    photoMiniature: string | null
    photoPortrait: string | null
}