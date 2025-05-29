import { create } from "zustand";

interface Sticker {
    id: string;
    name: string;
}

interface stickerStoreInterface {
    stickers: Record<string, Sticker>;
    activeId: string;

    setActiveId: (id: string) => void;
}


const useStickerStore = create<stickerStoreInterface>((set, get) => ({
    stickers: {
        "16377": {
            id: "16377",
            name: "Hedgehog"
        },
        "16264": {
            id: "16264",
            name: "Shikihime"
        },
        "21097": {
            id: "21097",
            name: "Fluffy Star",
        }
    },
    activeId: "16377",
    setActiveId: (id: string) => set(() => ({
        activeId: id
    }))
}))

export default useStickerStore;