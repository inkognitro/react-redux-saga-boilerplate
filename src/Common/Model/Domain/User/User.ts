type OptionalUserData = Partial<{}>;
export type User = ({
    id: string,
    username: string,
} & OptionalUserData);