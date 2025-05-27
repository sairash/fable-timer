import { JSX, useEffect } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    IconMusic,
    IconPictureInPicture,
    IconPictureInPictureOff,
    IconPictureInPictureOn,
    IconPlayerPause, IconPlayerPlay, IconSettings
} from "@tabler/icons-react";


const ControlButtons = ({ btnEvent, activeButtons }: { btnEvent: (data: string, close: boolean) => void, activeButtons: string[] }) => {
    const obj_button: Record<string, JSX.Element> = {
        "play": <TooltipProvider key="play">
            <Tooltip>
                <TooltipTrigger>
                    <div className="w-10 h-10 p-1.5 rounded cursor-pointer hover:bg-amber-500 stroke-black hover:stroke-white" onClick={() => {
                        btnEvent("play", false)
                    }}>
                        <IconPlayerPlay width={30} height={30} stroke={2} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="py-1">Play <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">Space</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,
        "pause": <TooltipProvider key="pause">
            <Tooltip>
                <TooltipTrigger>
                    <div className="w-10 h-10 p-1.5 rounded cursor-pointer hover:bg-amber-500 stroke-black hover:stroke-white" onClick={() => {
                        btnEvent("play", false)
                    }}>
                        <IconPlayerPause width={30} height={30} stroke={2} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="py-1">Pause <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">Space</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,
        "music": <TooltipProvider key="music">
            <Tooltip>
                <TooltipTrigger>
                    <div className="w-10 h-10 p-1.5 rounded cursor-pointer hover:bg-amber-500 stroke-black hover:stroke-white" onClick={() => {
                        btnEvent("music", false)
                    }}>
                        <IconMusic width={30} height={30} stroke={2} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="py-1">Music <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">M</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,

        "settings": <TooltipProvider key="settings">
            <Tooltip>
                <TooltipTrigger>
                    <div className="w-10 h-10 p-1.5 rounded cursor-pointer hover:bg-amber-500 stroke-black hover:stroke-white" onClick={() => {
                        btnEvent("settings", false)
                    }}>
                        <IconSettings width={30} height={30} stroke={2} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="py-1">Settings <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">S</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,

        "picture-in-picture": <TooltipProvider key="picture-in-picture">
            <Tooltip>
                <TooltipTrigger>
                    <div className="w-10 h-10 rounded cursor-pointer p-1.5 hover:bg-amber-500 hover:fill-white" onClick={() => {
                        btnEvent("pip", false)
                    }}>
                        <IconPictureInPictureOn width={30} height={30} stroke={2} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="py-1">Pop Out <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">P</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>,
        "picture-in-picture-open": <TooltipProvider key="picture-in-picture-open">
            <Tooltip>
                <TooltipTrigger>
                    <div className="w-10 h-10 rounded cursor-pointer p-1.5 hover:bg-amber-500 hover:fill-white" onClick={() => {
                        btnEvent("pip", true)
                    }}>
                        <IconPictureInPictureOff width={30} height={30} stroke={2} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="py-1">Pop In <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">P</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    }

    // Event listeners
    useEffect(() => {
        document.addEventListener("keydown", (ev) => {
            switch (ev.code) {
                case "Space":
                    btnEvent("play", true);
                    break;
                case "KeyM":
                    btnEvent("music", false);
                    break;
                case "KeyP":
                    btnEvent("pip", false)
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