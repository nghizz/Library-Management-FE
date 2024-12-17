export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    category?: string;
    publishYear?: number;
    quantity: number;
    available: number;
    description?: string;
    coverImage: string;
    selected?: boolean;
}