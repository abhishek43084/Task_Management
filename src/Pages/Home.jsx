import React, { useEffect, useState } from "react";
import AddNewTask from "../components/AddNewTask";
import Card from "../components/Card";
import Drawer from "../components/Drawer";
import Form from "../components/Form";

const Home = ({ tasks, setTasks }) => {
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notCompletedTasks, setNotCompletedTasks] = useState([]);

  useEffect(() => {
    setCompletedTasks(tasks.filter((x) => x.isCompleted === true));
    setNotCompletedTasks(tasks.filter((x) => x.isCompleted === false));
  }, [tasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingTask) {
      // update task
      setTasks(tasks.map((t) => (t.id === editingTask.id ? formData : t)));
    }
    setEditingTask(null);
    setOpen(false);
  };

  const handleDelete = (task) => {
    setTasks(tasks.filter((x) => x.id !== task.id));
  };

  return (
    <div>
      <div>
        <AddNewTask tasks={tasks} setTasks={setTasks} />
      </div>
      <h1 className="text-2xl text-center font-bold">Not Completed Tasks</h1>
      <div className="flex flex-wrap border-3 mx-4 rounded-2xl bg-gray-300 min-h-[100px] items-center justify-center">
        {notCompletedTasks.length > 0 ? (
          notCompletedTasks.map((x) => (
            <Card
              oneTask={x}
              key={x.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks to display.</p>
        )}
      </div>
      <h1 className="text-2xl text-center font-bold">Completed Tasks</h1>
      <div className="flex flex-wrap border-3 mx-4 rounded-2xl bg-gray-300 min-h-[100px] items-center justify-center">
        {completedTasks.length > 0 ? (
          completedTasks.map((x) => (
            <Card
              oneTask={x}
              key={x.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No completed tasks yet.</p>
        )}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Form defaultFormData={editingTask} onSubmit={handleSubmit} />
      </Drawer>
    </div>
  );
};

export default Home;
