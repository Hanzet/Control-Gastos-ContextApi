import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
  } from "react-swipeable-list" // npm install react-swipeable-list | npm install prop-types
import { formatDate } from "../helpers"
import { categories } from "../data/categories"
import type { Expense } from "../types"
import Amountdisplay from "./Amountdisplay"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  const { dispatch } = useBudget();

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense.category]) // [0] es para obtener el primer elemento del array, nos traemos sólo el que coincide con el id del gasto

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {dispatch({ type: 'get-expense-by-id', payload: {id: expense.id} })}}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: 'remove-expense', payload: {id: expense.id} })
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>
                <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gastos" className="w-20" />
            </div>

            <div className="flex-1 space-y-2">
                <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{ formatDate(expense.date!.toString() )}</p>
            </div>

            <Amountdisplay
                amount={expense.amount}
            />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}