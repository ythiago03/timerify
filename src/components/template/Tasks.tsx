import { CircleCheck, CirclePlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface TaskInterface {
  id: string;
  task: string;
  status: "completed" | "incomplete";
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
        id: String(prevTaskList.length + 1),
        task,
        status: "incomplete",
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
            status: task.status === "incomplete" ? "completed" : "incomplete",
          }
        : task
    );
    setTaskList(tasks);
  };

  return (
    <div className="flex flex-col w-full max-w-sm">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full mt-3 max-w-sm items-center gap-1.5 bg-foreground/15 rounded-lg"
      >
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="bg-transparent border-0 py-6 focus-visible:ring-0"
          type="text"
          id="text"
          placeholder="Do homework..."
        />
        <Button
          onClick={addTask}
          className="shadow-none bg-transparent hover:bg-transparent [&_svg]:size-7"
        >
          <CirclePlus className="text-green-500" />
        </Button>
      </form>
      {isTaskSubmited && (
        <span className="text-xs text-destructive p-3">{taskError}</span>
      )}

      <div className="pt-10 w-full max-w-sm">
        {taskList.map(({ id, task, status }) => (
          <div
            key={id}
            className="flex w-full mt-3 max-w-sm items-center gap-1.5 bg-foreground/15 rounded-lg"
          >
            <span
              className={`${
                status === "completed" ? completedStyle : ""
              } p-3 mr-auto`}
            >
              {task}
            </span>
            <Button
              onClick={() => toggleTaskStatus(id)}
              className="px-0 shadow-none bg-transparent hover:bg-transparent [&_svg]:size-7"
            >
              <CircleCheck className="text-green-500" />
            </Button>
            <Button
              onClick={() => handleRemoveTask(id)}
              className="px-0 mx-3 shadow-none bg-transparent hover:bg-transparent [&_svg]:size-7"
            >
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
