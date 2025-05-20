"use client"

import { useEffect, useState } from "react"
import CountDownTimer from "./CountDown";

const CountDownContainer = () => {
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
        <div className="">
            <div className="flex gap-10">
                <button onClick={decreseTime} className="p-2 rounded bg-gray-200 text-black cursor-pointer">-</button>
                <div className="p-2 min-w-64 text-7xl">
                    <CountDownTimer time={time} />
                </div>
                <button onClick={increaseTime} className="p-2 rounded bg-gray-200 text-black cursor-pointer">+</button>
            </div>
        </div>
    )
}

export default CountDownContainer