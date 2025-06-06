import { create } from "zustand";

interface TaskStore {
    openTask: boolean;
    togglTaskeOpen: ()=>void;
}


const useTaskStore = create<TaskStore>((set) => ({
    openTask: false,
    togglTaskeOpen: ()=> set((state)=>({
        openTask: !state.openTask
    })),

}));

export default useTaskStore;