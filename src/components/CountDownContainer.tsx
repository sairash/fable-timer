import { useEffect, useState } from "react"
import CountDownTimer from "./CountDown";

const CountDownContainer = ({tick}:{tick: (data:number)=>void}) => {
    const [time, setTime] = useState(12 * 60 * 1000);

    useEffect(() => {
        console.log(time)
    }, [time])

    function increaseTime() {
        setTime(time + (60 * 1000 * 5))
    }

    function decreseTime() {
        setTime(time - (60 * 1000 * 5))
    }

    return (
        <div className="min-w-xs">
            <div className="text-center mb-5 text-xl">
                Focus Timer
            </div>
            <div className="flex justify-center p-2 w-full h-full">
                <div className="p-2 text-7xl">
                    <CountDownTimer tick={tick} time={time} />
                </div>
            </div>
        </div>
    )
}

export default CountDownContainer