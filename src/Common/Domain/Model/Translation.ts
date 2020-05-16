export type Placeholders = {
    [key: string]: string;
};

export type Translation = {
    translationId: string
    placeholders?: Placeholders
}