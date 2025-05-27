import { useEffect, useRef, useState } from "react";
import {IconPlayerPause, IconPlayerPauseFilled, IconPlayerPlayFilled} from "@tabler/icons-react";

const PausePlayFadeEffect = ({isPlaying}: {isPlaying: boolean}) => {

    const [isHidden, setIsHidden] = useState(true);
    const clearTimeoutId = useRef<NodeJS.Timeout>(null);

    useEffect(()=>{
        if(!isHidden){
            clearTimeoutId.current = setTimeout(()=>{
                setIsHidden(true)
            }, 500)
        }else {
            if(!clearTimeoutId.current) return;
            setIsHidden(true);
            clearTimeout(clearTimeoutId.current);
        }
    }, [isHidden])


    useEffect(()=>{
        setIsHidden(false)
    }, [isPlaying])
    

    return (
        <>
            {!isHidden && <div className='fade-out fixed top-[50%] left-[50%] opacity-50' style={{transform: `translate(-50%, -50%)`}}>
                <div className="bg-button-base-hover shadow-2xl p-2 rounded-full cursor-pointer">
                    
                    {!isPlaying?
                        <IconPlayerPauseFilled width={50} height={50} /> :
                        <IconPlayerPlayFilled width={50} height={50} />
                    }
                    

                </div>
            </div>}

            {
                !isPlaying &&
                <div className="text-sm fade-in bg-gradient-to-r from-gray-400 to-gray-500 shadow-xl py-2 px-4 fixed top-5 rounded left-[50%] font-semibold text-white" style={{transform: `translateX(-50%)`}}>
                    Paused
                </div>
            }
        </>
    )
}


export default PausePlayFadeEffect;