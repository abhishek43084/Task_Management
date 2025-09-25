import React, { useEffect, useState } from "react";
import Button from "./Button";

const Form = ({ defaultFormData, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    isCompleted: false,
    date: "",
  });

  useEffect(() => {
    if (defaultFormData) {
      setFormData(defaultFormData);
    }
  }, [defaultFormData]);

  const formDataChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "isCompleted" ? (value === "true" ? true : false) : value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);

      if (!defaultFormData) {
        setFormData({
          id: 0,
          title: "",
          description: "",
          isCompleted: false,
          date: "",
        });
      }
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={submitHandler} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={formDataChangeHandler}
            className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100 transition-all duration-300"
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={formDataChangeHandler}
            className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100 transition-all duration-300"
            placeholder="Enter task description"
            required
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label
              htmlFor="isCompleted"
              className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1"
            >
              Status
            </label>
            <select
              name="isCompleted"
              id="isCompleted"
              value={formData.isCompleted}
              onChange={formDataChangeHandler}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100 transition-all duration-300"
            >
              <option value={false}>Not Completed</option>
              <option value={true}>Completed</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={formDataChangeHandler}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100 transition-all duration-300"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-5 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="reset"
            onClick={() =>
              setFormData({
                id: 0,
                title: "",
                description: "",
                isCompleted: false,
                date: "",
              })
            }
          >
            Reset
          </Button>
          <Button type="success">
            {defaultFormData ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
