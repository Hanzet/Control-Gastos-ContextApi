export type BudgetAction =
    { type: 'add-budget', payload: {budget: number} } |
    { type: 'show-modal'}

export type BudgetState = {
    budget: number;
    modal: boolean;
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
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

    return state; // Si no es el tipo de acción que queremos, devuelve el estado actual
}