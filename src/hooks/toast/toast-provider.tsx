
import * as React from "react"
import {
  ToasterToast,
  Action,
  actionTypes
} from "./toast-types"
import { ToastContext } from "./toast-context"
import { reducer } from "./toast-reducer"

// 生成唯一ID的辅助函数
const genId = () => {
  return Math.random().toString(36).slice(2, 9)
}

// 创建一个可变的dispatch引用对象
export const dispatchFunction = {
  current: (_action: Action) => {},
}

export function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = React.useReducer(
    reducer,
    { toasts: [] }
  )

  const innerDispatch = React.useCallback((action: Action) => {
    dispatch(action)
  }, [dispatch])
  
  React.useEffect(() => {
    dispatchFunction.current = innerDispatch
  }, [innerDispatch])

  const toast = React.useCallback((props: Omit<ToasterToast, "id">) => {
    const id = genId()

    const update = (props: Omit<Partial<ToasterToast>, "id">) => {
      innerDispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: {
          ...props,
          id,
        },
      })
    }

    const dismiss = () => {
      innerDispatch({
        type: actionTypes.DISMISS_TOAST,
        toastId: id,
      })
    }

    innerDispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        onOpenChange: (open) => {
          if (!open) {
            dismiss()
          }
        },
      },
    })

    return {
      id,
      dismiss,
      update,
    }
  }, [innerDispatch])

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        toast,
        dismiss: (toastId?: string) => {
          innerDispatch({
            type: actionTypes.DISMISS_TOAST,
            toastId,
          })
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
