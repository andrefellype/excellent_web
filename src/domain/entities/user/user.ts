export interface UserEntity {
    id: number;
    name: string;
    cellphone: string | null;
    isEnabled: boolean;
    isAdmin: boolean;
    created: string;
}