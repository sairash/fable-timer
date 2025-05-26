import { IconBeach } from '@tabler/icons-react';
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
    setActive: (title: string) => void;
    isActive: (title: string) => boolean
}

const useMusicModalStore = create<MusicModalState>((set, get) => ({
    open: false,
    active: [],
    audios: [{
        title: "Beach",
        desc: "Makes sound like beach.",
        musicUrl: "https://hello.com",
        icon: <IconBeach width={50} height={50} stroke={1.2} className="bg-gray-100 p-1 rounded" />
    }],
    toggle: () => set((state) => ({ open: !state.open })),
    setActive: (title: string) => set((state) => ({
        active: state.active.includes(title)
            ? state.active.filter((t) => t !== title)
            : [...state.active, title]
    })),
    isActive: (title: string) => get().active.includes(title),
}))

export default useMusicModalStore;