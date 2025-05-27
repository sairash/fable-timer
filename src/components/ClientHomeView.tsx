"use client";

import PictureInPictureDiv from "@/components/pip";
import { useEffect, useState } from "react";
import PausePlayFadeEffect from "./pausePlayFadeEffect";
import OnlineUser from "./OnlineUsers";
import Modal from "@/components/custom-ui/modal";
import {IconBeach, IconMusic, IconPlayCard} from "@tabler/icons-react";
import useMusicModalStore from "@/store/musicStore";
import { cx } from "class-variance-authority";


export default function ClientHomeView() {

    const {open, audios, toggleActive, isActive, toggle} = useMusicModalStore();

    
    const [timeNotTicking, setTimeNotTicking] = useState(true)

    function togglePlay() {
        setTimeNotTicking(!timeNotTicking)
    }

    function toggleMusic() {
        toggle()
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
            <OnlineUser />
            {open && (<Modal title="Music" close={toggleMusic}>
                {audios.map((element) => (
                    <div onClick={()=>{toggleActive(element.title)}} key={element.title} className={cx({
                        'p-2 cursor-pointer rounded flex my-2 hover:bg-amber-100 bg-gray-100': true,
                        'bg-gray-200': isActive(element.title)
                    })}>
                        <div className="w-[50px] h-[50px] bg-white rounded">
                            {element.icon}
                        </div>
                        <div className="px-2 w-full">
                            <div className="title font-bold">
                                {element.title}
                            </div>
                            <div className="text-sm mt-1 truncate h-4">{element.desc}</div>
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
            </Modal>)}
        </div>
    );
}