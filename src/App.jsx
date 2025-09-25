import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      title: "Gym",
      description: "Go to gym for fitness",
      isCompleted: false,
      date: "2025-08-20",
    },
    {
      id: 1,
      title: "Study",
      description: "I will Study at 9 O'clock.",
      isCompleted: true,
      date: "2025-08-22",
    },
  ]);

  console.log("Task", tasks);

  return (
    <div>
      <Home tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
