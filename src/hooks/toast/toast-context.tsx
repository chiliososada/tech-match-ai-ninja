
import * as React from "react"
import { State, ToasterToast } from "./toast-types"

export interface ToastContextType {
  toasts: ToasterToast[]
  toast: (props: Omit<ToasterToast, "id">) => {
    id: string
    dismiss: () => void
    update: (props: Omit<Partial<ToasterToast>, "id">) => void
  }
  dismiss: (toastId?: string) => void
}

export const ToastContext = React.createContext<ToastContextType | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}
