import Modal from "./custom-ui/modal";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {IconEye, IconList, IconListCheck, IconListLetters, IconPlus, IconRadar, IconRadarOff} from "@tabler/icons-react";
import { useState } from "react";
import { Input } from "./ui/input";



function TaskContainer(){

    const [taskModalOpen, setTaskModalOpen] = useState(false);

    function open(){
        setTaskModalOpen(true);
    }

    function close(){
        setTaskModalOpen(false);
    }

    return(
        <>
            <TooltipProvider key="todo">
                    <Tooltip>
                        <TooltipTrigger className="fixed bottom-5 left-1/2" style={{transform: "translateX(-50%)"}}>
                            <div onClick={open} className="p-2 w-screen max-w-[250px] text-xs rounded-xl bg-gradient-to-r from-black to-gray-900 shadow-xl cursor-pointer flex justify-between text-md text-white font-semibold">
                                <div className="flex gap-2">
                                    <IconListCheck width={20} height={20} stroke={2} />
                                    <div className="mt-0.5 font-bold">Tasks</div>
                                </div>
                                <div className="bg-amber-500 rounded-full px-2 pt-0.5">1</div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p className="py-1">View Tasks <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">T</span></p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            {taskModalOpen && <Modal title="Tasks" close={close} bodyContent={
                <div className="flex flex-col overflow-none h-full gap-2">
                    <div className="flex gap-2">
                        <Input className="text-black" placeholder="Enter Task" />
                        <button className="p-2 bg-amber-500 rounded text-white cursor-pointer">
                            <IconPlus size={20} />
                        </button>
                    </div>
                    <div className="w-full h-full overflow-y-auto">
                        <div className="text-sm font-semibold py-2">Previous:</div>
                        <div className=" flex gap-2">
                            <div className="">
                                <input type="checkbox"  />
                            </div>
                            <div className="w-full">Hello</div>
                            <div>D</div>
                        </div>
                    </div>
                </div>
            } />}
        </>
    )
}

export default TaskContainer;