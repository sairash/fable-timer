import useMusicModalStore from "@/store/musicStore";
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerSkipBackFilled, IconPlayerSkipForwardFilled, IconSearch, IconVolume, IconVolume2, IconVolumeOff } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import { useYoutube } from "react-youtube-music-player";


type VolumeLevel = 0 | 50 | 75 | 100
type videoType = "playlist" | "video";


function YoutubeMusicComponent({ idAndType, alert, open }: { idAndType: [videoType, string], alert: boolean, open: () => void }) {
    const [volumeLevel, setVolumeLevel] = useState<VolumeLevel>(75);
    const [isPlaying, setIsPlaying] = useState(false)


    const isReadyYoutube = useRef(false);

    const youtubePlayer = useYoutube({
        type: idAndType[0],
        id: idAndType[1],
        events: {
            onReady() {
                isReadyYoutube.current = true;
            },
        }
    });


    useEffect(()=>{
        setIsPlaying(false);
    }, [idAndType])

    useEffect(()=>{
        setIsPlaying(!alert && isPlaying)
    }, [alert, isPlaying])


    useEffect(() => {
        if (!isReadyYoutube.current) {
            return
        }

        if (isPlaying) {
            youtubePlayer.actions.playVideo()
            return
        }

        youtubePlayer.actions.pauseVideo();
    }, [isPlaying])

    function next() {
        if(idAndType[0] == "video") return;
        youtubePlayer.actions.nextVideo()
    }

    function prev() {
        if(idAndType[0] == "video") return;
        youtubePlayer.actions.previousVideo()
    }


    useEffect(() => {
        if (isReadyYoutube.current) {
            youtubePlayer.actions.setVolume(volumeLevel)
        }
    }, [volumeLevel])


    const volumeOptions: VolumeLevel[] = [0, 50, 75, 100]

    const cycleVolume = () => {
        const currentIndex = volumeOptions.indexOf(volumeLevel)
        const nextIndex = (currentIndex + 1) % volumeOptions.length
        setVolumeLevel(volumeOptions[nextIndex])
    }

    const getVolumeIcon = () => {
        switch (volumeLevel) {
            case 0:
                return <IconVolumeOff className="h-3.5 w-3.5" />
            case 50:
                return <IconVolume2 className="h-3.5 w-3.5" />
            default:
                return <IconVolume className="h-3.5 w-3.5" />
        }
    }


    function toggleIsYoutubeActive() {
        open()
    }


    return (
        <div className="bg-white w-64 h-20 fixed top-5 left-5">
            <div className="w-64 bg-white rounded-xl shadow-xl border border-purple-500/20 p-3 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <div className="relative flex-shrink-0 group">
                        <img
                            src={`https://img.youtube.com/vi/${youtubePlayer.playerDetails.id}/default.jpg`}
                            alt="Album cover"
                            className="w-12 h-12 rounded object-cover shadow-lg ring-1 ring-white/10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="flex-1 min-w-0 ">
                        <div className="mb-1.5 flex justify-between gap-1">
                            <h3 className="text-sm text-black truncate leading-tight mt-1">{youtubePlayer.playerDetails.title}</h3>
                            <div className="cursor-pointer hover:bg-black rounded hover:text-white p-1" onClick={toggleIsYoutubeActive}><IconSearch size={16} /></div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={prev}
                                    className={cx({
                                        "transition-colors p-1 rounded-lg hover:bg-white/10": true,
                                        "text-gray-500 cursor-not-allowed": idAndType[0] == 'video',
                                        "cursor-pointer text-black hover:text-gray-700": idAndType[0] == 'playlist'
                                    })}
                                    aria-label="Previous track"
                                >
                                    <IconPlayerSkipBackFilled className="h-3.5 w-3.5" />
                                </button>

                                <button
                                    className="cursor-pointer rounded bg-black p-1 flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/25 transform mx-1"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? <IconPlayerPauseFilled size={17} /> : <IconPlayerPlayFilled size={17} />}
                                </button>

                                <button
                                    onClick={next}
                                    className={cx({
                                        "transition-colors p-1 rounded-lg hover:bg-white/10": true,
                                        "text-gray-500 cursor-not-allowed": idAndType[0] == 'video',
                                        "cursor-pointer text-black hover:text-gray-700": idAndType[0] == 'playlist'
                                    })}
                                    aria-label="Next track"
                                >
                                    <IconPlayerSkipForwardFilled className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            <button
                                onClick={cycleVolume}
                                className="cursor-pointer flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-white/10 group"
                                aria-label={`Volume: ${volumeLevel}%`}
                            >
                                {getVolumeIcon()}
                                <span className="text-xs font-medium min-w-[24px] text-right group-hover:text-black">
                                    {volumeLevel} %
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YoutubeMusicComponent;