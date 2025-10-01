import {
	CircleCheck,
	CirclePlus,
	PlusIcon,
	Trash2,
	Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface TaskInterface {
	id: string;
	task: string;
	completed: boolean;
}

const Tasks: React.FC = () => {
	const [task, setTask] = useState<string>("");
	const [isTaskSubmited, setIsTaskSubmited] = useState<boolean>(false);
	const [taskError, setTaskError] = useState<string>("");
	const [taskList, setTaskList] = useState<TaskInterface[]>([]);

	const completedStyle = "text-foreground/30 line-through";

	const addTask = (): void => {
		if (task.length < 3) {
			setTaskError("Task must be at least 3 characters long");
			setIsTaskSubmited(true);
			return;
		}
		if (taskList.length >= 10) {
			setTaskError("You can't add more than 10 tasks");
			setIsTaskSubmited(true);
			return;
		}
		setTaskList((prevTaskList) => [
			...prevTaskList,
			{
				id: crypto.randomUUID(),
				task,
				completed: false,
			},
		]);
		setTask("");
		setIsTaskSubmited(false);
	};

	const handleRemoveTask = (id: string): void => {
		const filteredTasks = taskList.filter(({ id: taskId }) => taskId !== id);
		setTaskList(filteredTasks);
	};

	const toggleTaskStatus = (id: string): void => {
		const tasks: TaskInterface[] = taskList.map((task) =>
			task.id === id
				? {
						...task,
						completed: !task.completed,
					}
				: task,
		);
		setTaskList(tasks);
	};

	return (
		<section className="w-full h-fit flex flex-col gap-10 bg-secondary/70 rounded-xl p-4 border-2 border-secondary">
			<h2 className="text-2xl font-bold mt-5">Today's Tasks</h2>
			<div className="flex gap-2 mb-6">
				<Input
					placeholder="Add a new task..."
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && addTask()}
					className="flex-1"
				/>
				<Button
					onClick={addTask}
					size="icon"
					className="bg-ring hover:bg-ring/50"
				>
					<PlusIcon className="size-4 text-foreground" />
				</Button>
			</div>

			<div className="space-y-3">
				{taskList.map(({ id, task, completed }) => (
					<div
						key={id}
						className={`flex items-center gap-3 p-3 rounded-lg border ${completed ? "bg-muted/50" : "bg-card"}`}
					>
						<Checkbox
							checked={completed}
							onCheckedChange={() => toggleTaskStatus(id)}
						/>

						<div className="flex-1">
							<div
								className={`${completed ? "line-through text-muted-foreground" : ""}`}
							>
								{task}
							</div>
							{/* <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{task.pomodoros} pomodoros</span>
                {!completed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => incrementPomodoros(task.id)}
                    className="h-6 px-2 text-xs"
                  >
                    +1
                  </Button>
                )}
              </div> */}
						</div>

						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleRemoveTask(id)}
							className="w-8 h-8 text-muted-foreground hover:text-destructive"
						>
							<Trash2Icon className="w-4 h-4" />
						</Button>
					</div>
				))}
			</div>
			{taskList.length === 0 && (
				<div className="text-center py-8 text-muted-foreground">
					No tasks yet. Add one above to get started!
				</div>
			)}
		</section>
	);
};

export default Tasks;
