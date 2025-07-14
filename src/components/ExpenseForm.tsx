import { useEffect, useState } from "react";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import DatePicker from "react-datepicker";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date(),
    });
    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);
    const { dispatch, state, remainingBudget } = useBudget();

    // Si hay un gasto seleccionado, entonces se actualiza el formulario, tengo que extraer (destructurar) el estado del gasto seleccionado
    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount); // Guardamos el gasto anterior para poder restarlo al presupuesto
        }
    }, [state.editingId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name) // Si el campo es amount, entonces convierte el valor a number
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value,
        });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value as Date,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (Object.values(expense).includes('')) {
            setError("Todos los campos son requeridos");
            return;
        }

        // Validar que el presupuesto no sea negativo (O no me pase del limite de gastos)
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError("Ese gasto excede el presupuesto");
            return;
        }

        // Agregar o actualizar el gasto
        if (state.editingId) {
            dispatch({
                type: 'update-expense',
                payload: { // El payload es el gasto que se va a actualizar (es más complejo por qué tengo que encontrar el id de algún gasto, el state del formulario no tiene el id, lo recuperamos de state.editingId, luego toma una copia ...state y luego le agrego el id)
                    expense: {
                        id: state.editingId,
                        ...expense,
                    },
                },
            });
        } else {
            dispatch({
                type: 'add-expense',
                payload: {
                    expense,
                },
            });
        }

        // Reiniciar el formulario (Limpiar el formulario, no necesito una funcion para limpiar el formulario, esto se hace gracias a que existe en los inputs el value, si no existe el value, no se puede limpiar el formulario)
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date(),
        });
        setPreviousAmount(0);
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-emerald-500 py-2"
            >{state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}</legend> {/* Si state.editingId es true, entonces se muestra 'Editar Gasto', si no, se muestra 'Nuevo Gasto' */}

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                > Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName} // Primero expense que es el state, luego el expenseName que sería el campo del state (o valor)
                    onChange={handleChange} // Cambiar el valor del state (Puedo escribir en el input)
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                > Catidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: Ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount} // Primero expense que es el state, luego el amount que sería el campo del state (o valor)
                    onChange={handleChange} // Cambiar el valor del state (Puedo escribir en el input)
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                > Categoria:</label>

                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category} // Primero expense que es el state, luego el category que sería el campo del state (o valor)
                    onChange={handleChange} // Cambiar el valor del state
                >
                    <option value="">-- Selecciona --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                > Fecha Gasto:</label>

                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date ? expense.date.toISOString().split('T')[0] : ''} // Convertir Date a string (YYYY-MM-DD)
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-emerald-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Editar Gasto' : 'Registrar Gasto'}
            />
        </form>
    )
}