
import * as React from "react"
import {
  ToasterToast,
  ToastActionElement,
  Action,
  actionTypes
} from "./toast-types"
import { reducer, toastTimeouts, dispatchFunction as globalDispatch, genId } from "./toast-reducer"
import { ToastContext } from "./toast-context"

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, innerDispatch] = React.useReducer(reducer, [])

  React.useEffect(() => {
    return () => {
      toastTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
      toastTimeouts.clear()
    }
  }, [])

  // Update the dispatchFunction reference
  React.useEffect(() => {
    // Using a mutable object reference pattern to update the module level variable
    // This avoids the "Cannot assign to 'dispatchFunction' because it is an import" error
    Object.assign(globalDispatch, { current: innerDispatch });
  }, [innerDispatch])

  const toast = React.useCallback((props: Omit<ToasterToast, "id">) => {
    const id = props.id || genId()

    const update = (props: Omit<Partial<ToasterToast>, "id">) => {
      innerDispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: { ...props, id },
      })
      return id
    }

    const dismiss = () => {
      innerDispatch({
        type: actionTypes.DISMISS_TOAST,
        toastId: id,
      })
      return id
    }

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

  return (
    <ToastContext.Provider
      value={{
        state,
        toast,
        dismiss: (toastId?: string) => {
          if (toastId) {
            innerDispatch({
              type: actionTypes.DISMISS_TOAST,
              toastId,
            })
          } else {
            state.forEach((toast) => {
              innerDispatch({
                type: actionTypes.DISMISS_TOAST,
                toastId: toast.id,
              })
            })
          }
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
