// Add timer, Sticker Choosing

import { create } from "zustand";

interface settingsStoreInterface {
    open: boolean;
    toggle: ()=>void;
}

const useSettingsStore = create<settingsStoreInterface>((set, get) => ({
    open: false,
    toggle: () => set((state)=>({
        open: !state.open
    }))
}))

export default useSettingsStore