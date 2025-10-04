import { useState } from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface TaskInterface {
	id: string;
	task: string;
	completed: boolean;
}

const Tasks: React.FC = () => {
	const [task, setTask] = useState<string>("");
	const [taskError, setTaskError] = useState<string>("");
	const [taskList, setTaskList] = useState<TaskInterface[]>([]);

	const addTask = (): void => {
		if (task.length < 3) {
			setTaskError("Task must be at least 3 characters long");
			return;
		}
		if (taskList.length >= 10) {
			setTaskError("You can't add more than 10 tasks");
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
		setTaskError("");
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
			<div className="space-y-3 mb-6">
				<div className="flex gap-2 ">
					<Input
						placeholder="Add a new task..."
						value={task}
						onChange={(e) => {
							setTask(e.target.value);
							setTaskError("");
						}}
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
				{taskError && (
					<p className="ml-3 text-sm text-destructive">{taskError}</p>
				)}
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
						</div>

						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleRemoveTask(id)}
							className="size-8 text-muted-foreground hover:text-destructive"
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
