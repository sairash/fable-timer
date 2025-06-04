import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {IconEye} from "@tabler/icons-react";

function OnlineUser() {
    return (
        <>
            <TooltipProvider key="active_users">
                <Tooltip>
                    <TooltipTrigger className="fixed top-4 left-5 ">
                        <div className="flex gap-1 cursor-pointer">
                            <IconEye width={20} height={20} stroke={2} /> <span className="text-sm">4</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p className="py-1">Active Users <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">A</span></p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default OnlineUser;