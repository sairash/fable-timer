import { useEffect, useState } from "react"
import CountDownTimer from "./CountDown";
import useTimeStore from "@/store/timeStore";

const CountDownContainer = () => {

    const {state, setTimeStamp}= useTimeStore();

    useEffect(()=>{
        setTimeStamp(12 * 60 * 1000);
    }, [])

    return (
        <div className="min-w-xs ">
            <div className="text-center mb-5 text-4xl">
                {state == 0 || state == 1? state == 0? "Focus Timer": "Short Break": "Long Break"}
            </div>
            <div className="flex justify-center p-2 w-full h-full school">
                <div className="p-2 text-7xl">
                    <CountDownTimer />
                </div>
            </div>
        </div>
    )
}

export default CountDownContainer