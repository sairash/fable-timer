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
         "1": {
            id: "1",
            name: "Meme"
        },
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
        },
        "16503": {
            id: "16503",
            name: "Cute Dugong"
        }
    },
    activeId: "161377",
    setActiveId: (id: string) => set(() => ({
        activeId: id
    }))
}))

export default useStickerStore;