import { useEffect, useRef, useState } from "react";

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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-26 h-26" viewBox="0 0 32 32" version="1.1">
                        <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z" />
                    </svg>:
                    <svg xmlns="http://www.w3.org/2000/svg" className="m-2 ml-4 w-20 h-20" viewBox="-3 0 28 28">
                        <g xmlns="http://www.w3.org/2000/svg" id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Icon-Set-Filled" transform="translate(-419.000000, -571.000000)" className="fill-black">
                                <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"></path>
                            </g>
                        </g>
                    </svg>
                }
                    

                </div>
            </div>}

            {
                !isPlaying && <div className="fade-in bg-gradient-to-r from-amber-400 to-amber-500 shadow-xl py-2 px-4 fixed top-5 rounded left-[50%] font-semibold text-white" style={{transform: `translateX(-50%)`}}>Paused </div>
            }
        </>
    )
}


export default PausePlayFadeEffect;