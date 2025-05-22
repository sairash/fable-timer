import { useEffect, useState } from "react"
import CountDownTimer from "./CountDown";

const CountDownContainer = ({tick, play}:{tick: (data:number)=>void, play:boolean}) => {
    const [time, setTime] = useState(12 * 60 * 1000);

    useEffect(() => {
        console.log(time)
    }, [time])

    return (
        <div className="min-w-xs">
            <div className="text-center mb-5 text-2xl">
                Focus Timer
            </div>
            <div className="flex justify-center p-2 w-full h-full">
                <div className="p-2 text-7xl">
                    <CountDownTimer tick={tick} play={play} time={time} />
                </div>
            </div>
        </div>
    )
}

export default CountDownContainer