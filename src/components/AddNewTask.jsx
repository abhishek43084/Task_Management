import { useState } from "react";
import Button from "./Button";
import Drawer from "./Drawer";
import Form from "./Form";

const AddNewTask = ({ tasks, setTasks }) => {
  const [open, setOpen] = useState(false);

  const onSubmit = (formData) => {
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newObject = {
      ...formData,
      id: newId,
    };
    setTasks([...tasks, newObject]);
    setOpen(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        Task Manager
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 text-center">
        Organize your work and life, finally.
      </p>
      <div className="text-center mb-2">
      <Button type="success" onClick={() => setOpen(true)}>
        Add New Task
      </Button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white ">
            Add a New Task
          </h2>
          <Form onSubmit={onSubmit} />
        </div>
      </Drawer>
    </div>
  );
};

export default AddNewTask;
