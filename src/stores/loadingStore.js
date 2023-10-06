import { create } from 'zustand';

export const useLoadingStore = create((set, get) => ({
    loading: false,
    setLoading: (loading) => set({ loading: loading }),
}));
