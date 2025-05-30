import Modal from "@/components/custom-ui/modal"
import useSettingsStore from "@/store/settingsStore"
import { IconCheck, IconInfoCircle, IconRefreshDot, IconX } from "@tabler/icons-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useStickerStore from "@/store/stickerStore";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

export default function Settings() {

    const { open, toggle } = useSettingsStore();
    const { stickers, setActiveId } = useStickerStore();

    const [sticker, setSticker] = useState("");


    function close() {
        toggle()
    }

    useEffect(() => {
        const curSticker = localStorage.getItem("sticker_pack") ?? "16377";
        setSticker(curSticker)
        setActiveId(curSticker)
    }, [])

    function changeSticker(id: string) {
        setSticker(id)
    }

    function saveChanges() {
        setActiveId(sticker)
        localStorage.setItem("sticker_pack", sticker)
        close()
    }

    return (
        <>
            {open && <Modal title="Setting" close={close}
                headerContent={
                    <div className="flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="cursor-pointer hover:bg-gray-200 rounded p-1">
                                        <IconRefreshDot size={18} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                    <p className="py-1">Reset</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="cursor-pointer hover:bg-rose-200 rounded p-1">
                                        <IconX size={18} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                    <p className="py-1">Cancel Changes</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="cursor-pointer hover:bg-amber-200 rounded p-1" onClick={saveChanges}>
                                        <IconCheck size={18} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="left" style={{ zIndex: 1000 }}>
                                    <p className="py-1">Save Changes</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                }

                bodyContent={
                    <div className="mt-2 px-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <b className="flex gap-2 text-sm mb-1">Timer Sequence:
                                        <IconInfoCircle size={17} className="mt-[1px] cursor-pointer" />
                                    </b>
                                </TooltipTrigger>
                                <TooltipContent side="right" style={{ zIndex: 1000 }}>
                                    <p className="py-1 max-w-[200px]">Uses the <b>Pomodoro sequence:</b> Pomodoro → short break, repeat 4x, then one long break</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="flex justify-between gap-2 w-full">
                            <div className="w-full">
                                <small className="font-semibold">Focus Timer</small>
                                <input type="number" name="" id="" className="bg-gray-200 rounded p-1 w-full mt-1" />
                                <small className="">minutes</small>
                            </div>
                            <div className="w-full">
                                <small className="font-semibold">Short Breaks</small>
                                <input type="number" name="" id="" className="bg-gray-200 rounded p-1 w-full mt-1" />
                                <small className="">minutes</small>
                            </div>
                            <div className="w-full">
                                <small className="font-semibold">Long Breaks</small>
                                <input type="number" name="" id="" className="bg-gray-200 rounded p-1 w-full mt-1" />
                                <small className="">minutes</small>
                            </div>
                        </div>
                        <div className="mt-4 text-sm mb-2 font-semibold">Sticker Pack: </div>
                        <div className="flex h-30">
                            <img src={`/sticker/${sticker}/choose.gif`} className="w-30" alt="" />
                            <div className="border-l border-gray-200 w-full p-2">
                                <div className="text-sm">Choose A Pack:</div>
                                <select onChange={(event) => {
                                    changeSticker(event.target.value)
                                }} value={sticker} className="w-full mt-1 px-1 py-2 bg-gray-200">
                                    {Object.entries(stickers).map(([key, value]) => (
                                        value.id == sticker ? <option key={key} id={key} value={value.id}>{value.name}</option> : <option key={key} id={key} value={value.id}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 text-sm mb-8">
                            <div className="font-semibold mb-2">Custom Theme:</div>
                            <div className="">
                                <span>Here is a sample theme: </span>
                                <a href="/" target="_blank" className="text-amber-800 border-b border-amber-600">Link</a>
                            </div>

                            <Textarea placeholder="Add custom theme" className="text-black mt-4 resize-none" />
                        </div>
                    </div>
                }>

            </Modal>}
        </>
    )
}