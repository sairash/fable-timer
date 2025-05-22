import { JSX, useEffect } from "react";

const ControlButtons = ({ btnEvent, activeButtons }: { btnEvent: (data: string, close: boolean) => void, activeButtons: string[] }) => {
    const obj_button: Record<string, JSX.Element> = {
        "play": <div key="play" className="w-10 h-10 p-1.5 rounded cursor-pointer hover:bg-amber-500 hover:fill-white" onClick={() => {
            btnEvent("play", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
                <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"/>
            </svg>
        </div>,
        "pause": <div key="pause" className="w-10 h-10 rounded p-0.5 cursor-pointer hover:bg-amber-500 hover:fill-white hover:stroke-white stroke-black" onClick={() => {
            btnEvent("play", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 256 256">
                <path d="M46.677 64.652c0-9.362 7.132-17.387 16.447-17.394 9.315-.007 24.677.007 34.55.007 9.875 0 17.138 7.594 17.138 16.998 0 9.403-.083 119.094-.083 127.82 0 8.726-7.58 16.895-16.554 16.837-8.975-.058-25.349.115-34.963.058-9.614-.058-16.646-7.74-16.646-17.254 0-9.515.11-117.71.11-127.072zm14.759.818s-.09 118.144-.09 123.691c0 5.547 3.124 5.315 6.481 5.832 3.358.518 21.454.47 24.402.47 2.947 0 7.085-1.658 7.167-6.14.08-4.483-.082-119.507-.082-123.249 0-3.742-4.299-4.264-7.085-4.66-2.787-.395-25.796 0-25.796 0l-4.997 4.056zm76.664-.793c.027-9.804 7.518-17.541 17.125-17.689 9.606-.147 25.283.148 35.004.148 9.72 0 17.397 8.52 17.397 17.77s-.178 117.809-.178 127c0 9.192-7.664 17.12-16.323 17.072-8.66-.05-26.354 0-34.991.048-8.638.05-17.98-8.582-18.007-17.783-.027-9.201-.055-116.763-.027-126.566zm16.917.554s-.089 118.145-.089 123.692c0 5.547 3.123 5.314 6.48 5.832 3.359.518 21.455.47 24.402.47 2.948 0 7.086-1.659 7.167-6.141.081-4.482-.08-119.506-.08-123.248 0-3.742-4.3-4.265-7.087-4.66-2.786-.396-25.796 0-25.796 0l-4.997 4.055z" fillRule="evenodd"/>
            </svg>
        </div>,
        "music": <div key="music" className="w-10 h-10 p-1.5 rounded cursor-pointer hover:bg-amber-500 stroke-black hover:stroke-white" onClick={() => {
            btnEvent("play", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="none" xmlns="http://www.w3.org/2000/svg" d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>,

        "picture-in-picture": <div key="picture-in-picture" className="w-10 h-10 rounded cursor-pointer p-1.5 hover:bg-amber-500 hover:fill-white" onClick={() => {
            btnEvent("pip", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path fillRule="nonzero" d="M21 3a1 1 0 0 1 1 1v7h-2V5H4v14h6v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8zm-1 2h-6v4h6v-4zM6.707 6.293l2.25 2.25L11 6.5V12H5.5l2.043-2.043-2.25-2.25 1.414-1.414z" />
                </g>
            </svg>
        </div>,
        "picture-in-picture-open": <div key="picture-in-picture-open" className="w-10 h-10 rounded cursor-pointer p-1.5 hover:bg-amber-500 hover:fill-white" onClick={() => {
            btnEvent("pip", true)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path fillRule="nonzero" d="M21 3a1 1 0 0 1 1 1v7h-2V5H4v14h6v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8zm-1 2h-6v4h6v-4zm-8.5-8L9.457 9.043l2.25 2.25-1.414 1.414-2.25-2.25L6 12.5V7h5.5z" />
                </g>

            </svg>
        </div>
    }

    // Event listeners
    useEffect(() => {
        document.addEventListener("keydown", (ev) => {
            switch (ev.code) {
                case "Space":
                    btnEvent("play", true)
                    break;
                default:
                    break;
            }
        })

        return (
            document.removeEventListener("keydown", (ev) => { })
        )
    }, [])


    return (
        <div className="flex gap-1 fixed bottom-10 left-[50%]" style={{ transform: `translateX(-50%)` }}>
            {activeButtons.map((buttonType) => (
                obj_button[buttonType]
            ))}
        </div>
    )
};

export default ControlButtons;