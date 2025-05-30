import { create } from "zustand";

interface ModalStore {
    open: boolean;
    setOpen: (val: boolean)=> void;
    toggleOpen: ()=>void;
}


const useModalStore = create<ModalStore>((set) => ({
    open: false,

    setOpen: (val: boolean) => set(()=>({
        open: val,
    })),
    toggleOpen: () => set((state) => ({
        open: !state.open
    })),
}))

export default useModalStore;