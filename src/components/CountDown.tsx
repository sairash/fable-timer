import  { useState, useEffect, useRef } from "react";

interface CountDownTimer {
    time: number,
    tick: (data:number)=> void,
    play: boolean
}

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


const CountDownTimer = ({ time, tick, play }: CountDownTimer) => {
    const [timeRemaining, setTimeRemaining] = useState(time);
    const countdownTimer = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        setTimeRemaining(time)
    }, [time])


    useEffect(()=>{ 
        if(play) {
            countdownTimer.current = setTimeout(() => {
                const new_time = timeRemaining - 1000
                if (new_time <= 0) {
                    clearCountdown();
                    return
                }
    
                setTimeRemaining(new_time);
                tick(new_time);
            }, 1000);
        }else{
            clearCountdown()
        }
    }, [play, timeRemaining])

    function clearCountdown(){
        if(!countdownTimer.current) return;
        clearTimeout(countdownTimer.current);
    }

    useEffect(() => {
        

        return () => {
            clearCountdown();
        };
    }, [timeRemaining])

    return (
        <div className="">
            {formatTime(timeRemaining)}
        </div>
    )
}

export default CountDownTimer;