import { useReducer, createContext, type Dispatch } from "react";
import { budgetReducer, initialState, type BudgetAction, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetAction>;
}

type BudgetProviderProps = {
    children: React.ReactNode;
}

// Context
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Provider (Es donde vinen los datos)
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState); // state es el estado actual y dispatch es la función que se encarga de actualizar el estado
    
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}