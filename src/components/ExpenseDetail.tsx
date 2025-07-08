import { formatDate } from "../helpers"
import type { Expense } from "../types"
import Amountdisplay from "./Amountdisplay"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
        <div>

        </div>

        <div>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{ formatDate(expense.date!.toString() )}</p>
        </div>

        <Amountdisplay
            amount={expense.amount}
        />
    </div>
  )
}