import { cx } from "class-variance-authority";
import { IconClockPause, IconMusic, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconSearch, IconVolume, IconVolume2, IconVolumeOff } from "@tabler/icons-react";
import Switch from "@/components/custom-ui/Switch"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import useMusicModalStore from "@/store/musicStore";
import Modal from "@/components/custom-ui/modal";
import { useEffect, useState } from "react";
import useTimeStore from "@/store/timeStore";



type VolumeLevel = "mute" | "50" | "75" | "100"

function MusicModal() {
    const { open, pauseWithTimer, togglePauseWithTimer, audios, active, toggleActive, isActive, toggle } = useMusicModalStore();
    const { ticking } = useTimeStore();
    const [isPlaying, setIsPlaying] = useState(false)
    const [volumeLevel, setVolumeLevel] = useState<VolumeLevel>("75")

    const volumeOptions: VolumeLevel[] = ["mute", "50", "75", "100"]

    const cycleVolume = () => {
        const currentIndex = volumeOptions.indexOf(volumeLevel)
        const nextIndex = (currentIndex + 1) % volumeOptions.length
        setVolumeLevel(volumeOptions[nextIndex])
    }

    const getVolumeIcon = () => {
        switch (volumeLevel) {
            case "mute":
                return <IconVolumeOff className="h-3.5 w-3.5" />
            case "50":
                return <IconVolume2 className="h-3.5 w-3.5" />
            default:
                return <IconVolume className="h-3.5 w-3.5" />
        }
    }

    useEffect(() => {
        Object.entries(audios).forEach(([key, element]) => {
            const isCurrentlyActive = isActive(element.title);
            const audio = element.music;

            if (audio) {
                if (isCurrentlyActive && !((!ticking && pauseWithTimer))) {
                    audio.play().catch(e => console.error("Error playing audio:", e));
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    }, [ticking, pauseWithTimer, active, audios, isActive]);

    const getVolumeDisplay = () => {
        return volumeLevel === "mute" ? "0%" : `${volumeLevel}%`
    }


    function toggleMusic() {
        toggle()
    }

    return (
        <>
            <div className="bg-white w-64 h-20 fixed top-5 left-5 ">
                <div className="w-64 bg-white rounded-xl shadow-xl border border-purple-500/20 p-3 backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0 group">
                            <img
                                src="https://img.youtube.com/vi/PxWleEgi3Hw/default.jpg"
                                alt="Album cover"
                                className="w-12 h-12 rounded object-cover shadow-lg ring-1 ring-white/10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="mb-1.5 flex justify-between gap-1">
                                <h3 className="text-sm text-black truncate leading-tight mt-1">Who am I to say - Hope | ortoPilot Cover</h3>
                                <div className="cursor-pointer hover:bg-black rounded hover:text-white p-1"><IconSearch size={16} /></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <button
                                        className="cursor-pointer text-black hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-white/10"
                                        aria-label="Previous track"
                                    >
                                        <IconPlayerSkipBackFilled className="h-3.5 w-3.5" />
                                    </button>

                                    <button
                                        className="cursor-pointer h-7 w-7 rounded bg-black flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/25 transform mx-1"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? <IconPlayerPauseFilled className="h-3 w-3" /> : <IconPlayerPlayFilled className="h-3 w-3 ml-0.5" />}
                                    </button>

                                    <button
                                        className="cursor-pointer text-black hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-white/10"
                                        aria-label="Next track"
                                    >
                                        <IconPlayerSkipForwardFilled className="h-3.5 w-3.5" />
                                    </button>
                                </div>

                                <button
                                    onClick={cycleVolume}
                                    className="cursor-pointer flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-white/10 group"
                                    aria-label={`Volume: ${getVolumeDisplay()}`}
                                >
                                    {getVolumeIcon()}
                                    <span className="text-xs font-medium min-w-[24px] text-right group-hover:text-black">
                                        {getVolumeDisplay()}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {open && (<Modal title="Music" close={toggleMusic}
                headerContent={
                    <TooltipProvider key="picture-in-picture">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex gap-2">
                                    <label onClick={togglePauseWithTimer}><IconClockPause size={20} /></label>
                                    <Switch
                                        id="airplane-mode"
                                        initialChecked={pauseWithTimer}
                                        onCheckedChange={togglePauseWithTimer}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                <p className="py-1">Auto Pause with Timer</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
                bodyContent={Object.entries(audios).map(([key, element]) => (
                    <div onClick={() => { toggleActive(element.title) }} key={key} className={cx({
                        'p-2 cursor-pointer rounded flex my-2 hover:bg-amber-100 bg-gray-100': true,
                        'bg-gray-200': isActive(element.title)
                    })}>
                        <div className="w-[50px] h-[50px] p-2 bg-white rounded">
                            {element.icon}
                        </div>
                        <div className="px-2 w-full">
                            <div className="title font-bold">
                                {element.title}
                            </div>
                            <div className="text-sm mt-1 truncate h-7">{element.desc}</div>
                        </div>
                        {isActive(element.title) &&
                            <div>
                                <div className="mt-2">
                                    <IconMusic width={30} height={30} stroke={1.5} />

                                </div>
                            </div>
                        }
                    </div>
                ))}
            >
            </Modal>)}
        </>
    )
}

export default MusicModal;