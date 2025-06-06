import Modal from "./custom-ui/modal";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconCheckbox, IconEye, IconList, IconListCheck, IconListLetters, IconPlus, IconRadar, IconRadarOff, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import useTaskStore from "@/store/taskStore";


interface Task {
    id: number
    text: string
    completed: boolean
}


function TaskContainer() {

    const {openTask, togglTaskeOpen} = useTaskStore();


    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState("")

    function openModal() {
        togglTaskeOpen();
    }

    function close() {
        togglTaskeOpen();
    }


    const addTask = () => {
        if (newTask.trim() !== "") {
            const new_task = [
                ...tasks,
                {
                    id: Date.now(),
                    text: newTask,
                    completed: false,
                },
            ];
            setTasks(new_task)
            localStorage.setItem("tasks", JSON.stringify(new_task))
            setNewTask("")
        }
    }


    useEffect(()=>{
        console.log(JSON.parse(localStorage.getItem("tasks") || "[]"))
        setTasks(JSON.parse(localStorage.getItem("tasks") || "[]") as Task[])
    }, [])

    const toggleTaskCompletion = (id: number) => {
        const new_task = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
        setTasks(new_task)
        localStorage.setItem("tasks", JSON.stringify(new_task))

    }

    const removeTask = (id: number) => {
        const new_task = tasks.filter((task) => task.id !== id);
        setTasks(new_task)
        localStorage.setItem("tasks", JSON.stringify(new_task))
    }

    const completedCount = tasks.filter((task) => task.completed).length
    const totalCount = tasks.length

    return (
        <>
            <TooltipProvider key="todo">
                <Tooltip>
                    <TooltipTrigger className="fixed bottom-5 left-1/2" style={{ transform: "translateX(-50%)" }}>
                        <div onClick={openModal} className="p-2 w-screen max-w-[250px] text-xs rounded-xl bg-gradient-to-r from-black to-gray-900 shadow-xl cursor-pointer flex justify-between text-md text-white font-semibold">
                            <div className="flex gap-2">
                                <IconListCheck width={20} height={20} stroke={2} />
                                <div className="mt-0.5 font-bold">Tasks</div>
                            </div>
                            <div className="bg-amber-500 rounded-full px-2 pt-0.5">{totalCount - completedCount}</div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p className="py-1">View Tasks <span className="px-2 rounded py-0.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600">T</span></p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {openTask && <Modal title="Tasks" close={close} headerContent={
                <div className="text-sm text-gray-600">
                    {completedCount}/{totalCount} completed
                </div>
            } bodyContent={
                <div className="p-4">
                    <div className="">
                        <div className="border border-white/20 mb-4">
                            <div className="flex gap-3">
                                <Input
                                    type="text"
                                    placeholder="What needs to be done? 🤔"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            addTask()
                                        }
                                    }}
                                    className="bg-gray-200 rounded p-1 w-full text-black"
                                />
                                <button
                                    onClick={addTask}
                                    className="cursor-pointer text-white bg-black rounded px-4 shadow-lg transition-all duration-200 hover:shadow-xl"
                                >
                                    <IconPlus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {completedCount > 0 && (
                            <div className="mt-6 text-center mb-8">
                                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl p-4 shadow-lg">
                                    <div className="text-2xl mb-1">🎉</div>
                                    <p className="font-medium">
                                        {completedCount === totalCount
                                            ? "Amazing! All tasks completed!"
                                            : `Great job! ${completedCount} task${completedCount !== 1 ? "s" : ""} done!`}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {tasks.length === 0 ? (
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/20">
                                    <div className="text-6xl mb-4">🙅</div>
                                    <p className="text-gray-500 text-lg font-medium">No tasks yet!</p>
                                    <p className="text-gray-400 text-sm mt-1">Add one above to get started</p>
                                </div>
                            ) : (
                                tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${task.completed ? "opacity-75" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Checkbox
                                                id={`task-${task.id}`}
                                                checked={task.completed}
                                                onCheckedChange={() => toggleTaskCompletion(task.id)}
                                                className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 cursor-pointer"
                                            />
                                            <label
                                                htmlFor={`task-${task.id}`}
                                                className={`flex-1 cursor-pointer transition-all duration-200 ${task.completed ? "text-gray-500 line-through" : "text-gray-800 font-medium"
                                                    }`}
                                            >
                                                {task.text}
                                            </label>
                                            <button
                                                onClick={() => removeTask(task.id)}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-all duration-200"
                                                aria-label="Remove task"
                                            >
                                                <IconTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        
                    </div>
                </div>
            } />}
        </>
    )
}

export default TaskContainer;