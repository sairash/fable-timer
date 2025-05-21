import  { useState, useEffect } from "react";

interface CountDownTimer {
    time: number,
    tick: (data:number)=> void
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


const CountDownTimer = ({ time, tick }: CountDownTimer) => {
    const [timeRemaining, setTimeRemaining] = useState(time );

    useEffect(() => {
        setTimeRemaining(time)
    }, [time])

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const new_time = timeRemaining - 1000
            if (new_time <= 0) {
                clearInterval(countdownInterval);
            }

            setTimeRemaining(new_time);
            tick(new_time);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [timeRemaining])

    return (
        <div className="">
            {formatTime(timeRemaining)}
        </div>
    )
}

export default CountDownTimer;