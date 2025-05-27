import useTimeStore from "@/store/timeStore";
import  { useState, useEffect, useRef } from "react";



const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return (
        <div className="flex gap-4">
            <div className="countdown-value">
                {minutes.toString().padStart(2, "0")}
            </div>
            <div className="seperator">:</div>
            <div className="countdown-value">
                {seconds.toString().padStart(2, "0")}
            </div>
        </div>
    );
};


const CountDownTimer = () => {

    const {timeStamp, setTimeStamp, ticking} = useTimeStore();

    const countdownTimer = useRef<NodeJS.Timeout>(null);


    useEffect(()=>{ 
        if(ticking) {
            countdownTimer.current = setTimeout(() => {
                const new_time = timeStamp - 1000
                if (new_time <= 0) {
                    clearCountdown();
                    return
                }
    
                setTimeStamp(new_time);
            }, 1000);
        }else{
            clearCountdown()
        }
    }, [ticking, timeStamp])

    function clearCountdown(){
        if(!countdownTimer.current) return;
        clearTimeout(countdownTimer.current);
    }

    useEffect(() => {
        

        return () => {
            clearCountdown();
        };
    }, [timeStamp])

    return (
        <div className="">
            {formatTime(timeStamp)}
        </div>
    )
}

export default CountDownTimer;