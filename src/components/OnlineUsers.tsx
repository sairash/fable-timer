import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {IconEye, IconList, IconListCheck, IconListLetters, IconRadar, IconRadarOff} from "@tabler/icons-react";

function OnlineUser() {
    return (
        <>
            <TooltipProvider key="active_users">
                <Tooltip>
                    <TooltipTrigger className="fixed bottom-4 right-5 ">
                        <div className="flex gap-1 cursor-pointer">
                            <IconEye width={20} height={20} stroke={2} /> <span className="text-sm">4</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p className="py-1">Active Users <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">A</span></p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider key="todo">
                <Tooltip>
                    <TooltipTrigger className="fixed top-3 right-5 ">
                        <div className="p-2 rounded bg-gradient-to-r from-amber-400 to-amber-500 shadow-xl cursor-pointer flex gap-1 text-md text-white font-semibold">
                            <IconListCheck width={20} height={20} stroke={2} />
                            <div className="mt-0.5 font-bold text-xs">Tasks</div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p className="py-1">View Tasks <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">T</span></p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default OnlineUser;