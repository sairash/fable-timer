import {create} from "zustand";

interface timeStamp {
    timeStamp: number;
    ticking: boolean;
    setTimeStamp: (timeStamp: number)=>void;
    toggleTicking: () => void;
}

const useTimeStore = create<timeStamp>((set, get) =>({
    timeStamp: 0,
    ticking: false,
    setTimeStamp: (timeStamp)=> set(()=>({
        timeStamp: timeStamp
    })),
    toggleTicking: () => set((state)=>({
        ticking: !state.ticking,
    }))
}))

export default useTimeStore;