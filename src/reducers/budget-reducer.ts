import { v4 as uuidv4 } from 'uuid'; // npm i uuid && npm i --save-dev @types/uuid
import type { DraftExpense, Expense } from "../types";

export type BudgetAction =
    { type: 'add-budget', payload: {budget: number} } |
    { type: 'show-modal'} |
    { type: 'close-modal'} |
    { type: 'add-expense', payload: {expense: DraftExpense} }

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
}

// Funcion para crear un gasto (Simulamos una base de datos lo cual usamos uuid para generar un id en el gasto)
const createExpense = (DraftExpense: DraftExpense) : Expense => {
    return {
        ...DraftExpense,
        id: uuidv4(),
    }
}

export const budgetReducer = (state: BudgetState, action: BudgetAction) => {

    if (action.type === 'add-budget') {
        return {
            ...state, // Copia el estado actual que es igual a initialState osea {budget: 0}
            budget: action.payload.budget, // Actualiza el budget con el valor del payload
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true,
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
        }
    }

    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense);

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false, // Cerrar el modal sin necesidad de hacer un dispatch (O tener una funcion para cerrar el modal)
        }
    }

    return state; // Si no es el tipo de acción que queremos, devuelve el estado actual
}