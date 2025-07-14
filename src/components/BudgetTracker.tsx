import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // npm i react-circular-progressbar
import { useBudget } from '../hooks/useBudget'
import Amountdisplay from './Amountdisplay'
import 'react-circular-progressbar/dist/styles.css'; // npm i react-circular-progressbar

export default function BudgetTracker() {

  const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2); // El toFixed(2) es para que el resultado sea un número con 2 decimales, el + es para convertir el resultado a un número

  return (
    <div className="grid grid-cols1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage} // El valor del progressbar es el presupuesto restante
          styles={buildStyles({
            pathColor: percentage > 100 ? '#dc2626' : '#059669',
            trailColor: '#f1f5f9',
            textSize: '8',
            textColor: percentage > 100 ? '#dc2626' : '#000000',
          })}
          text={`${percentage}% Gastado`} // El texto del progressbar es el presupuesto restante
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
            type="button"
            className="bg-emerald-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            onClick={() => dispatch({type: 'reset-app'})}
        >
            Resetear App
        </button>

        <Amountdisplay
            label="Presupuesto"
            amount={state.budget} // Mostramos el presupuesto inicial
        />

        <Amountdisplay
            label="Disponible"
            amount={remainingBudget} // Mostramos el presupuesto restante
        />

        <Amountdisplay
            label="Gastado"
            amount={totalExpenses} // Mostramos el total de gastos
        />
      </div>
    </div>
  )
}