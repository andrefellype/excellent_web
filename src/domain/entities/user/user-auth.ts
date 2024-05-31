export interface UserAuthEntity {
    user: { id: number; isAdmin: boolean; };
    token: string
}