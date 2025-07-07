import type { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 p-2 text-white text-center text-sm">
      {children}
    </p>
  )
}
