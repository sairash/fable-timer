import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {IconRadar, IconRadarOff} from "@tabler/icons-react";

function OnlineUser() {
    return (
        <TooltipProvider key="play">
            <Tooltip>
                <TooltipTrigger className="fixed top-3 right-5 ">
                    <div className="p-2 rounded bg-gradient-to-r from-amber-400 to-amber-500 shadow-xl cursor-pointer flex gap-1 text-md text-white font-semibold">
                        <IconRadar width={20} height={20} stroke={2} />
                        <div className="mt-0.5 font-bold text-xs">10K</div>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p className="py-1">Active Users <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">T</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default OnlineUser;