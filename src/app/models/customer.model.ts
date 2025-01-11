// customer.model.ts
export interface Customer {
    id?: number;
    cccd: string;
    fullName: string;
    studentId?: string;
    email: string;
    phoneNumber: string;
    createAt?: Date;
    updateAt?: Date;
}
