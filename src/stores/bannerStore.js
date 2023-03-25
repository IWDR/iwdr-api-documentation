import {create} from "zustand";

export const useBannerStore = create((set, get) => ({
    open: false,
    message: null,
    variant: 'plain',
    isClosable: false,
    showBanner: (msg, variant, isClosable = undefined, withTimeout = 0) => {
        set({
            open: true,
            message: msg,
            variant: variant,
            isClosable: isClosable ?? false,
        })

        if (withTimeout > 0) {
            setTimeout(() => {
                get().clearBanner()
            }, withTimeout)
        }
    },
    clearBanner: () => set({ open: false, message: null, variant: 'plain' }),
}));