import { cx } from "class-variance-authority";
import { IconCheck, IconClockPause, IconMusic, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconSearch, IconVolume, IconVolume2, IconVolumeOff, IconX } from "@tabler/icons-react";
import Switch from "@/components/custom-ui/Switch"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import useMusicModalStore from "@/store/musicStore";
import Modal from "@/components/custom-ui/modal";
import { useEffect, useRef, useState } from "react";
import useTimeStore from "@/store/timeStore";
import { useYoutube } from "react-youtube-music-player";
import { Input } from "./ui/input";
import YoutubeMusicComponent from "./YoutubeMusicComponent";
import { toast } from "sonner"


type videoType = "playlist" | "video";
const defaultYoutubeThing: [videoType, string]= ["playlist", "RDATmXfcbG9maQ"];


function getYouTubeTypeAndId(urlString: string): [videoType, string] {
    let url: URL;
    try {
        url = new URL(urlString);
    } catch (e) {
        toast('Invalid URL');
        return defaultYoutubeThing;
    }
    
    const host = url.hostname.replace(/^www\./, '');
    if(!(host === 'youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com'))){
        toast('Unsupported YouTube URL format');
        return defaultYoutubeThing;
    }

    const params = url.searchParams;
    const listId = params.get('list');
    if (listId) {
        return ['playlist', listId];
    }

    const videoIdParam = params.get('v');
    if (videoIdParam) {
        return ['video', videoIdParam];
    }

    return defaultYoutubeThing;
}

function MusicModal() {
    const { youtubeUrl, alertAudio, setYoutubeUrl, open, pauseWithTimer, togglePauseWithTimer, audios, active, toggleActive, isActive, toggle } = useMusicModalStore();
    const { state, ticking } = useTimeStore();
    const [isYoutubeModalActive, setIsYoutubeModalActive] = useState(false);
    const [youtubeUrlModalState, setYoutubeUrlModalState] = useState("https://www.youtube.com/watch?v=iuT8KImN-Rk&list=RDATmXfcbG9maQ");
    const [youtubeUrlIdAndType, setYoutubeUrlIdAndType] = useState<[videoType, string]>(defaultYoutubeThing);
    const [alert, setAlert] = useState(false);

    
    
    useEffect(() => {
        Object.entries(audios).forEach(([key, element]) => {
            const isCurrentlyActive = isActive(element.title);
            const audio = element.music;

            if (audio) {
                if (isCurrentlyActive && !((!ticking && pauseWithTimer)) && !alert) {
                    audio.play().catch(e => console.error("Error playing audio:", e));
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    }, [ticking, pauseWithTimer, active, audios, alert, isActive]);


    useEffect(()=>{
        if(!alertAudio || !ticking) return;

        setAlert(true);

        alertAudio.play();

        setTimeout(()=>{
            setAlert(false)
            alertAudio.pause();
            alertAudio.currentTime = 0;
        }, 700);

    }, [state, ticking])

    useEffect(() => {
        setYoutubeUrlModalState(youtubeUrl);
        setIsYoutubeModalActive(false);

        setYoutubeUrlIdAndType(getYouTubeTypeAndId(youtubeUrl));

    }, [youtubeUrl, useYoutube, setIsYoutubeModalActive])

    function saveChanges() {
        setIsYoutubeModalActive(false);
        setYoutubeUrl(youtubeUrlModalState)
    }

    function toggleMusic() {
        toggle()
    }

    function toggleIsYoutubeActive() {
        setIsYoutubeModalActive(prev => !prev)
    }

    return (
        <>
            
            <YoutubeMusicComponent idAndType={youtubeUrlIdAndType} alert={alert} open={toggleIsYoutubeActive} />
            {isYoutubeModalActive && (
                <Modal title="Youtube Music" close={toggleIsYoutubeActive}
                    headerContent={
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div onClick={toggleIsYoutubeActive} className="cursor-pointer hover:bg-rose-200 rounded p-1">
                                            <IconX size={18} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                        <p className="py-1">Cancel Changes</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="cursor-pointer hover:bg-amber-200 rounded p-1" onClick={saveChanges}>
                                            <IconCheck size={18} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                        <p className="py-1">Save Changes</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    }
                    bodyContent={
                        <div className="p-2">
                            <label className="text-sm font-semibold" htmlFor="url_yb">Youtube Link:</label>
                            <Input onChange={(event) => {
                                setYoutubeUrlModalState(event.target.value)
                            }} defaultValue={youtubeUrlModalState} type="text" placeholder="Enter url here" id="url_yb" className="text-black mt-2" />

                            <div className="mt-4 text-sm">
                                <div className="font-semibold">How it works?</div>
                                <div className="mt-2">Either <span className="font-semibold">video</span> or <span className="font-semibold">playlist</span> can be entered in the input field above. </div>
                                <div className="mt-2">If your link contains the <span className="bg-green-200 p-1 rounded">&list=</span> it is considered as playlist else it is a video url.</div>
                                <div className="mt-4 text-gray-600"><span className="font-semibold">Next</span> and <span className="font-semibold">Previous</span> is only available on playlist mode.</div>
                            </div>
                        </div>
                    } />
            )}

            {open && (<Modal title="Music" close={toggleMusic}
                headerContent={
                    <TooltipProvider>
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
