import { v4 as uuidv4 } from 'uuid'; // npm i uuid && npm i --save-dev @types/uuid
import type { DraftExpense, Expense } from "../types";

export type BudgetAction =
    { type: 'add-budget', payload: {budget: number} } |
    { type: 'show-modal'} |
    { type: 'close-modal'} |
    { type: 'add-expense', payload: {expense: DraftExpense} } |
    { type: 'remove-expense', payload: {id: Expense['id']} } | // Lo que tenga Expense['id'] en su campo id |
    { type: 'get-expense-by-id', payload: {id: Expense['id']} } | // Lo que tenga Expense['id'] en su campo id |
    { type: 'update-expense', payload: {expense: Expense} } // Lo que tenga DraftExpense en su campo expense

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense['id'];
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: '', // Si no hay ningún gasto seleccionado, el id es una cadena vacía
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
            editingId: '', // Reiniciar el id del gasto que se está editando
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

    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true, // Abrir el modal para editar el gasto
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id
                ? action.payload.expense
                : expense
            ), // map. acceder a cada elemento (gasto) individualmente. Utilizo ternario para actualizar el gasto, si el id del gasto es igual al id del gasto que quiero actualizar, entonces actualizo el gasto, si no, entonces no actualizo el gasto.
            modal: false, // Cerrar el modal sin necesidad de hacer un dispatch (O tener una funcion para cerrar el modal)
            editingId: '', // Reiniciar el id del gasto que se está editando
        }
    }

    return state; // Si no es el tipo de acción que queremos, devuelve el estado actual
}