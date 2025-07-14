import { useReducer, createContext, type Dispatch, useMemo } from "react";
import { budgetReducer, initialState, type BudgetAction, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetAction>;
    totalExpenses: number;
    remainingBudget: number;
}

type BudgetProviderProps = {
    children: React.ReactNode;
}

// Context
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Provider (Es donde vinen los datos)
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState); // state es el estado actual y dispatch es la función que se encarga de actualizar el estado
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]); // useMemo para que el código se ejecute cada que cambie el state de gastos
    const remainingBudget = state.budget - totalExpenses;
    
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children} {/* Referencia a los elementos hijos */}
        </BudgetContext.Provider>
    )
}