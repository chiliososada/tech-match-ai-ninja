
import { ToasterToast } from "./toast-types"
import { useToast } from "./toast-context"

// Export the toast function for use outside the provider
export const toast = (props: Omit<ToasterToast, "id">) => {
  // Protect calls when used directly without being in a provider
  try {
    const { toast } = useToast()
    return toast(props)
  } catch (e) {
    // Simply ignore if not within provider scope
    console.warn("Toast attempted to use outside of provider scope")
    return {
      id: "0",
      dismiss: () => {},
      update: () => {},
    }
  }
}
