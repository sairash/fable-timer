import { cx } from "class-variance-authority";
import { IconClockPause, IconMusic } from "@tabler/icons-react";
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



function MusicModal() {
    const { open, audios, active, toggleActive, isActive, toggle } = useMusicModalStore();
    const [stopMusicOnTimerPause, setStopMusicOnTimerPause] = useState(true);


    useEffect(() => {
        Object.entries(audios).forEach(([key, element]) => {
            const isCurrentlyActive = isActive(element.title);
            const audio = element.music;

            if (audio) {
                if (isCurrentlyActive) {
                    audio.play().catch(e => console.error("Error playing audio:", e));
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    }, [active, audios, isActive]);


    function toggleStopMusicOnTimerPause() {
        setStopMusicOnTimerPause(!stopMusicOnTimerPause);
    }

    function toggleMusic() {
        toggle()
    }

    return (
        <>
            {open && (<Modal title="Music" close={toggleMusic}
                headerContent={
                    <TooltipProvider key="picture-in-picture">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex gap-2">
                                    <label onClick={toggleStopMusicOnTimerPause}><IconClockPause size={20} /></label>
                                    <Switch
                                        id="airplane-mode"
                                        initialChecked={stopMusicOnTimerPause}
                                        onCheckedChange={toggleStopMusicOnTimerPause}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                <p className="py-1">Pause on Timer Pause</p>
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