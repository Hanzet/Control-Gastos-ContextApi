import Amountdisplay from './Amountdisplay'

function BudgetTracker() {
  return (
    <div className="grid grid-cols1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="gráfica de gastos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
            type="button"
            className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
            Resetear App
        </button>

        <Amountdisplay
            label="Presupuesto"
            amount={300}
        />

        <Amountdisplay
            label="Disponible"
            amount={200}
        />

        <Amountdisplay
            label="Gastado"
            amount={100}
        />
      </div>
    </div>
  )
}

export default BudgetTracker
