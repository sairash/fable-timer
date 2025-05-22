"use client";

import PictureInPictureDiv from "@/components/pip";
import { useState } from "react";
import PausePlayFadeEffect from "./pausePlayFadeEffect";

export default function ClientHomeView() {
    
    const [timeNotTicking, setTimeNotTicking] = useState(true)

    function togglePlay() {
        setTimeNotTicking(!timeNotTicking)
    }

    return (
        <div className="w-full cursor-default h-full sm:h-96 max-w-screen-xl bg-white rounded-md flex flex-col sm:flex-row ">
            <div className="w-full h-full flex-1  flex flex-col cartoon">
                <PictureInPictureDiv play={togglePlay} />
            </div>
            <div className="w-full h-full sm:max-w-sm pt-5 grid place-items-center">
                <img src={timeNotTicking?'/16377/386049.gif': '/16377/idle.gif'} className="w-96" />
            </div>
            <PausePlayFadeEffect isPlaying={timeNotTicking} />
        </div>
    );
}