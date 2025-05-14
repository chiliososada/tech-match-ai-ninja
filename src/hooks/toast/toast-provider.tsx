
import * as React from "react"
import { 
  ToasterToast, 
  Action,
  actionTypes
} from "./toast-types"
import { reducer, toastTimeouts, dispatchFunction, genId } from "./toast-reducer"
import { ToastContext } from "./toast-context"

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, innerDispatch] = React.useReducer(reducer, {
    toasts: [],
  })

  React.useEffect(() => {
    return () => {
      toastTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [])

  // Update the dispatchFunction reference
  React.useEffect(() => {
    dispatchFunction = innerDispatch
  }, [innerDispatch])

  const toast = React.useCallback((props: Omit<ToasterToast, "id">) => {
    const id = genId()

    const update = (props: Omit<ToasterToast, "id">) =>
      innerDispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: { ...props, id },
      })

    const dismiss = () => innerDispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

    innerDispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    return {
      id,
      dismiss,
      update,
    }
  }, [])

  const dismiss = React.useCallback((toastId?: string) => {
    innerDispatch({ type: actionTypes.DISMISS_TOAST, toastId })
  }, [])

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        toast,
        dismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
