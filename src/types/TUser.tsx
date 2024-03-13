export type TUser = {
    id?: number | null
    email: string
    password?: string | null
    type?: RegisterType | null
    role?: Role | null
    createdDate?: Date | null
    modifiedDate?: Date | null
}

export enum RegisterType {
    Facebook = 0,
    Google = 1,
    Self = 2,
}

export enum Role {
    Admin = 1,
    User = 2,
}
