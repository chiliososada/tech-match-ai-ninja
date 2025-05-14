
import { ToasterToast, Action, actionTypes } from "./toast-types"

// A map of toast ids to their timeout ids
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

export function reducer(state: ToasterToast[], action: Action): ToasterToast[] {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [...state, action.toast]
    case actionTypes.UPDATE_TOAST:
      return state.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t))
    case actionTypes.DISMISS_TOAST:
      return state.map((t) => (t.id === action.toastId ? { ...t, open: false } : t))
    case actionTypes.REMOVE_TOAST:
      return state.filter((t) => t.id !== action.toastId)
    default:
      return state
  }
}

// Mutable dispatch function reference using an object with a current property
export const dispatchFunction: { current?: React.Dispatch<Action> } = {}

export function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    if (dispatchFunction.current) {
      dispatchFunction.current({
        type: actionTypes.REMOVE_TOAST,
        toastId: toastId,
      })
    }
  }, 1000)

  toastTimeouts.set(toastId, timeout)
}

export function genId() {
  return Math.random().toString(36).substring(2, 9)
}
