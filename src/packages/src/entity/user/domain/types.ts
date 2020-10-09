export type User = {
    id: string
    username: string
}

export type MinimalUser = Pick<User, 'id' | 'username'>
