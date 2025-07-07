import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget(); // dispatch es la función que se encarga de actualizar el estado

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
        // console.log(e.target.value); // Seteo del state con el valor del input
    }

    // Utilizo useMemo para evitar que el componente se vuelva a renderizar cada vez que el usuario escribe en el input
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
        // console.log(isNaN(budget)); // Si el budget es un número, isNaN devuelve false, si no, devuelve true
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        // console.log("Enviando presupuesto"); // Enviando presupuesto (Dispara el evento submit)
        dispatch({ type: 'add-budget', payload: { budget } }); // Dispara la acción add-budget con el payload budget
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-emerald-600 font-bold text-center">
                    Definir Presupuesto
                </label>

                <input
                    id="budgetID"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget} // Valor del presupuesto, budget vale 0 por defecto gracias a useState(0)
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm