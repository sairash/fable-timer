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
        <>
            <div className="flex gap-10">
                <div className="p-2 min-w-64 text-7xl">
                    <CountDownTimer tick={tick} time={time} />
                </div>
            </div>

            <div className="text-center mt-10">
                Focus Timer
            </div>
        </>
    )
}

export default CountDownContainer