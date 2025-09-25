import React from "react";
import Button from "./Button";

const Card = ({ oneTask, onEdit, onDelete }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-4">
      <div className="p-6">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {oneTask.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {oneTask.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              oneTask.isCompleted
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {oneTask.isCompleted ? "Completed" : "Not Completed"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {`Date : ${oneTask.date}`}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button type="edit" onClick={() => onEdit(oneTask)}>
            Edit
          </Button>
          <Button type="delete" onClick={() => onDelete(oneTask)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
