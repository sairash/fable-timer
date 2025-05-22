import { JSX, useEffect } from "react";

const ControlButtons = ({ btnEvent, activeButtons }: { btnEvent: (data: string, close: boolean) => void, activeButtons: string[] }) => {
    const obj_button: Record<string, JSX.Element> = {
        "play": <div key="play" className="w-10 h-10 rounded cursor-pointer hover:bg-amber-500 hover:fill-white" onClick={() => {
            btnEvent("play", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 stroke-black" viewBox="0 0 256 256">
                <path d="M59 61.922c0-9.768 13.016-15.432 22.352-11.615 10.695 7.017 101.643 58.238 109.869 65.076 8.226 6.838 10.585 17.695-.559 25.77-11.143 8.074-99.712 60.203-109.31 64.73-9.6 4.526-21.952-1.632-22.352-13.088-.4-11.456 0-121.106 0-130.873zm13.437 8.48c0 2.494-.076 112.852-.216 115.122-.23 3.723 3 7.464 7.5 5.245 4.5-2.22 97.522-57.704 101.216-59.141 3.695-1.438 3.45-5.1 0-7.388C177.488 121.952 82.77 67.76 80 65.38c-2.77-2.381-7.563 1.193-7.563 5.023z" fillRule="evenodd" />
            </svg>
        </div>,
        "pause": <div key="pause" className="w-10 h-10 rounded cursor-pointer hover:bg-amber-500 hover:fill-white" onClick={() => {
            btnEvent("play", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 256 256">
                <path d="M46.677 64.652c0-9.362 7.132-17.387 16.447-17.394 9.315-.007 24.677.007 34.55.007 9.875 0 17.138 7.594 17.138 16.998 0 9.403-.083 119.094-.083 127.82 0 8.726-7.58 16.895-16.554 16.837-8.975-.058-25.349.115-34.963.058-9.614-.058-16.646-7.74-16.646-17.254 0-9.515.11-117.71.11-127.072zm14.759.818s-.09 118.144-.09 123.691c0 5.547 3.124 5.315 6.481 5.832 3.358.518 21.454.47 24.402.47 2.947 0 7.085-1.658 7.167-6.14.08-4.483-.082-119.507-.082-123.249 0-3.742-4.299-4.264-7.085-4.66-2.787-.395-25.796 0-25.796 0l-4.997 4.056zm76.664-.793c.027-9.804 7.518-17.541 17.125-17.689 9.606-.147 25.283.148 35.004.148 9.72 0 17.397 8.52 17.397 17.77s-.178 117.809-.178 127c0 9.192-7.664 17.12-16.323 17.072-8.66-.05-26.354 0-34.991.048-8.638.05-17.98-8.582-18.007-17.783-.027-9.201-.055-116.763-.027-126.566zm16.917.554s-.089 118.145-.089 123.692c0 5.547 3.123 5.314 6.48 5.832 3.359.518 21.455.47 24.402.47 2.948 0 7.086-1.659 7.167-6.141.081-4.482-.08-119.506-.08-123.248 0-3.742-4.3-4.265-7.087-4.66-2.786-.396-25.796 0-25.796 0l-4.997 4.055z" fillRule="evenodd"/>
            </svg>
        </div>,
        "music": <div key="music" className="w-10 h-10 p-2 rounded cursor-pointer hover:bg-amber-500 hover:fill-white" onClick={() => {
            btnEvent("play", false)
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                <path id="music" className="cls-1" d="M1088,312a4,4,0,1,1,2-7.445v-14.31l-14,4.49V307a0.925,0.925,0,0,1-.07.332,3.691,3.691,0,0,1,.07.668,4.046,4.046,0,1,1-2-3.445V294a0.9,0.9,0,0,1,1.14-.971l15.62-5.009a0.959,0.959,0,0,1,.2-0.011c0.01,0,.03-0.009.04-0.009a0.146,0.146,0,0,1,.02,0,0.941,0.941,0,0,1,.89.6,0.015,0.015,0,0,1,.01.016c0.01,0.025.03,0.044,0.04,0.07,0.01,0.054,0,.106.01,0.16a0.792,0.792,0,0,1,.03.154v19A4,4,0,0,1,1088,312Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,1088,306Zm-16,0a2,2,0,1,0,2,2A2,2,0,0,0,1072,306Z" transform="translate(-1068 -288)" />
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
        <div className="flex gap-2 fixed bottom-10 left-[50%]" style={{ transform: `translateX(-50%)` }}>
            {activeButtons.map((buttonType) => (
                obj_button[buttonType]
            ))}
        </div>
    )
};

export default ControlButtons;