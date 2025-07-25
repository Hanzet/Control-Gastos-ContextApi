import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {

  const { state } = useBudget(); // state es el estado actual y dispatch es la función que se encarga de actualizar el estado
  // console.log(state.budget); // {budget: 0}

  const isInvalidBudget = useMemo(() => state.budget > 0, [state.budget]);
  // console.log(isInvalidBudget); // false

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString()); // LocalStorage es un number así que se convierte a string
    localStorage.setItem('expenses', JSON.stringify(state.expenses)); // LocalStorage es un array así que se convierte a string
  }, [state.budget, state.expenses]);

  return (
    <>
      <header className="bg-emerald-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-gray-100 shadow-lg mt-10 p-10">
        {isInvalidBudget ? <BudgetTracker /> : <BudgetForm />} {/* Si el presupuesto es inválido, muestra el tracker, si no, muestra el formulario */}
      </div>

      {isInvalidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )} {/* Si el presupuesto es inválido, no muestra el modal */}
    </>
  )
}

export default App
