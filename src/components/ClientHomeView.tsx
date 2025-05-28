"use client";

import PictureInPictureDiv from "@/components/pip";
import { useEffect, useState } from "react";
import PausePlayFadeEffect from "./pausePlayFadeEffect";
import OnlineUser from "./OnlineUsers";
import MusicModal from "@/components/music"
import useTimeStore from "@/store/timeStore";
import Settings from "./settings";


export default function ClientHomeView() {
    const {ticking} = useTimeStore()

    return (
        <div className="w-full cursor-default h-full sm:h-96 max-w-screen-xl bg-white rounded-md flex flex-col sm:flex-row ">
            <div className="w-full h-full flex-1  flex flex-col cartoon">
                <PictureInPictureDiv/>
            </div>
            <div className="w-full h-full sm:max-w-sm pt-5 grid place-items-center">
                <img src={ticking?'/16377/386049.gif': '/16377/idle.gif'} className="w-96" />
            </div>
            <PausePlayFadeEffect isPlaying={ticking} />
            <OnlineUser />
            <MusicModal />
            <Settings />
        </div>
    );
}