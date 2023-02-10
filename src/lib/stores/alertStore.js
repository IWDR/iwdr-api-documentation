import { create } from 'zustand'

export const useAlertStore = create((set, get) => ({
  open: false,
  message: null,
  variant: 'plain',
  isClosable: false,
  serverErrorAlert: () => {
    set({
      open: true,
      message:
        'There was an issue proccessing your request. Please try again later.',
      variant: 'error',
      isClosable: true,
    })

    setTimeout(() => {
      get().clearAlert()
    }, 6000)
  },
  showAlert: (msg, variant, isClosable = undefined, withTimeout = 0) => {
    set({
      open: true,
      message: msg,
      variant: variant,
      isClosable: isClosable ?? false,
    })

    if (withTimeout > 0) {
      setTimeout(() => {
        get().clearAlert()
      }, withTimeout)
    }
  },
  clearAlert: () => set({ open: false, message: null, variant: 'plain' }),
}))
