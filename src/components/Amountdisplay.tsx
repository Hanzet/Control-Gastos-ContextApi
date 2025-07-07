import { formatCurrency } from "../helpers";

type AmountdisplayProps = {
    label: string;
    amount: number;
}

function Amountdisplay({ label, amount }: AmountdisplayProps) {
  return (
    <p className="text-2xl text-emerald-600 font-bold">
      {label}: {''}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default Amountdisplay
