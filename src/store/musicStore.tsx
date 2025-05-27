import { IconBeach, IconTree } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { create } from 'zustand';


interface Audios {
    title: string,
    desc: string,
    musicUrl: string,
    icon: ReactNode,
}

interface MusicModalState {
    open: boolean;
    active: string[];
    audios: Audios[];
    toggle: () => void;
    toggleActive: (title: string) => void;
    isActive: (title: string) => boolean
}

const useMusicModalStore = create<MusicModalState>((set, get) => ({
    open: false,
    active: [],
    audios: [{
        title: "Beach",
        desc: "Makes sound like beach.",
        musicUrl: "https://hello.com",
        icon: <IconBeach width={50} height={50} stroke={1.2} />
    }, {
        title: "Forrest",
        desc: "Makes sounds like forrest",
        musicUrl: "https://sadasdasd",
        icon: <IconTree width={50} height={50} stroke={1.2} />
    }],
    toggle: () => set((state) => ({ open: !state.open })),
    toggleActive: (title: string) => set((state) => ({
        active: state.active.includes(title)
            ? state.active.filter((t) => t !== title)
            : [...state.active, title]
    })),
    isActive: (title: string) => get().active.includes(title),
}))

export default useMusicModalStore;