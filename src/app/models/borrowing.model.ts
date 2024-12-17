// borrowing.model.ts
export interface Borrowing {
    id?: number;
    userId: number;
    bookId: number;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: 'pending' | 'borrowed' | 'returned' | 'overdue';
    notes?: string;
    quantity: 1
}