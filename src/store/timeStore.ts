import {create} from "zustand";

interface timeStamp {
    time: number[]; // 9: focus timer time, 1: short break time, 2: long break time
    state: number; // in 0, 1, 2 corelates to time
    timeStamp: number;
    ticking: boolean;
    setTimeStamp: (timeStamp: number)=>void;
    toggleTicking: () => void;
    setTicking: (ticking: boolean) => void;
    setTime: (time: number[]) => void;
    changeState: () => void;
}

const useTimeStore = create<timeStamp>((set, get) =>({
    time: [0, 0, 0],
    state: 0,
    timeStamp: 0,
    ticking: false,
    setTimeStamp: (timeStamp)=> set(()=>({
        timeStamp: timeStamp
    })),
    toggleTicking: () => set((state)=>({
        ticking: !state.ticking,
    })),
    setTicking: ((ticking: boolean) => set(() => ({
        ticking: ticking,
    }))),
    setTime: ((time: number[]) => set(() =>({
        time: time
    }))),
    changeState: () => set((state)=> ({
        state: state.state == 2? 0: state.state + 1,
        timeStamp: state.time[state.state  == 2? 0: state.state + 1] * 60 * 1000
    }))
}))

export default useTimeStore;