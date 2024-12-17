// user.model.ts
export interface User {
    id?: number;
    username: string;
    email: string;
    fullName: string;
    role: 'admin' | 'user';
    phoneNumber?: string;
    address?: string;
}