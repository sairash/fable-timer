"use client";

import PictureInPictureDiv from "@/components/pip";
import PausePlayFadeEffect from "./pausePlayFadeEffect";
import OnlineUser from "./OnlineUsers";
import MusicModal from "@/components/music"
import useTimeStore from "@/store/timeStore";
import Settings from "./settings";
import useStickerStore from "@/store/stickerStore";
import TaskContainer from "./TaskContainer";
import { IconBrandGithub, IconInfoCircle } from "@tabler/icons-react";

export default function ClientHomeView() {
    const { ticking } = useTimeStore()
    const { activeId } = useStickerStore();


    return (
        <div className="w-full cursor-default h-full sm:h-96 max-w-screen-xl bg-white rounded-md flex flex-col sm:flex-row ">
            <div className="w-full h-full flex-1  flex flex-col cartoon">
                <PictureInPictureDiv />
            </div>
            <div className="w-full h-full sm:max-w-sm pt-5 grid place-items-center">
                <img src={ticking ? `/sticker/${activeId}/active.gif` : `/sticker/${activeId}/idle.gif`} className="w-96" />
            </div>
            <PausePlayFadeEffect isPlaying={ticking} />
            {/* <OnlineUser /> */}
            <MusicModal />
            <Settings />
            <TaskContainer />
            <div className="flex gap-2 fixed top-3 left-3">
                <div className="about cursor-pointer rounded p-1 hover:bg-gray-200">
                    <a href="/about"><IconInfoCircle size={25} /></a>
                </div>
                <div className="about cursor-pointer rounded p-1 hover:bg-gray-200">
                    <a href="http://github.com/sairash/tiktask" target="_blank"><IconBrandGithub size={25} /></a>
                </div>
            </div>
        </div>
    );
}
