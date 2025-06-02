import {
    IconCampfire, IconCloudFog, IconCloudStorm,
    IconCup,
    IconDropletFilled,
    IconTree,
    IconWind
} from '@tabler/icons-react';
import { ReactNode } from 'react';
import { create } from 'zustand';


interface Audios {
    title: string,
    desc: string,
    music: HTMLAudioElement | null
    icon: ReactNode,
}

interface MusicModalState {
    open: boolean;
    youtubeUrl: string;
    alertAudio: HTMLAudioElement|null;
    active: string[];
    pauseWithTimer: boolean,
    audios: Record<string, Audios>;

    setYoutubeUrl: (url: string) => void;
    toggle: () => void;
    toggleActive: (title: string) => void;
    isActive: (title: string) => boolean;
    togglePauseWithTimer: () => void;
}

const createAudioElement = (src: string): HTMLAudioElement | null => {
    if (typeof window !== 'undefined') {
        return Object.assign(new Audio(src), {
            loop: true,
            preload: 'auto'
        });
    }
    return null;
};

const useMusicModalStore = create<MusicModalState>((set, get) => ({
    open: false,
    youtubeUrl: "https://www.youtube.com/watch?v=iuT8KImN-Rk&list=RDATmXfcbG9maQ",
    alertAudio: createAudioElement('/alerts/chime.mp3'),
    pauseWithTimer: true,
    audios: {
        "wind": {
            title: "Wind",
            desc: "Howling winds",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6toZgJnNnyciU06w7xkslLhGM2DZ3vBazQFypu'),
            icon: <IconWind width={30} height={30} stroke={1.2} />
        },
        "forrest": {
            title: "Forrest",
            desc: "Birds chirping and forest audio",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tJRx9SAVBlE6tumDzfiKX2RrbsTLOPYUd4IV8'),
            icon: <IconTree width={30} height={30} stroke={1.2} />
        },
        "campfire": {
            title: "Campfire",
            desc: "Bonfire and wood burning",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tcTEN9jajqaumdHJr2VfGkQSE9FveoltNhAM4'),
            icon: <IconCampfire width={30} height={30} stroke={1.2} />
        },
        "cafe": {
            title: "Cafe",
            desc: "A rustling cafe",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6to2Ate7yciU06w7xkslLhGM2DZ3vBazQFypuT'),
            icon: <IconCup width={30} height={30} stroke={1.2} />
        },
        "stream": {
            title: "Stream",
            desc: "River flowing down the stream",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tYVbWUjLr5NPLfyHCAXTI0wcDOVaRt3j1qU7e'),
            icon: <IconDropletFilled width={30} height={30} stroke={1.2} />
        },
        "rain": {
            title: "Rain",
            desc: "Rain Sounds",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tEQ8ZAz9CJBlGwtFz0fbUoaVK5EOIYLA3nv7k'),
            icon: <IconCloudFog width={30} height={30} stroke={1.2} />
        },
        "storm": {
            title: "Storm",
            desc: "Rain with some thunder.",
            music: createAudioElement('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tysQ7T1tCFTLsGa3mY8iJX6eSRWAn2HkNd70x'),
            icon: <IconCloudStorm width={30} height={30} stroke={1.2} />
        }
    },

    setYoutubeUrl: (url: string) => set(() => ({
        youtubeUrl: url,
    })),
    active: [],

    toggle: () => set((state) => ({ open: !state.open })),
    toggleActive: (title: string) => set((state) => ({
        active: state.active.includes(title)
            ? state.active.filter((t) => t !== title)
            : [...state.active, title]
    })),
    isActive: (title: string) => get().active.includes(title),
    togglePauseWithTimer: () => set((state) => ({
        pauseWithTimer: !state.pauseWithTimer,
    }))
}))

export default useMusicModalStore;
