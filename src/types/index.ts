export type Expense = {
    id: string;
    amount: number;
    expenseName: string;
    category: string;
    date: Date;
}

export type DraftExpense = Omit<Expense, 'id'>;

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece]; // Value personalizado para el DatePicker

export type Category = {
    id: string;
    name: string;
    icon: string;
}