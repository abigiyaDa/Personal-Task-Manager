import React, { useMemo, useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import type { Task } from "../types/types";
import "../styles/Calendar.css";
import { getTasks, updateTask, createTask } from "../api/taskApi";

// Format a date as YYYY-MM-DD
const formatDateKey = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

// Convert task.dueDate to a date key
const parseDueDateToKey = (dueDate: string, targetYear: number): string | null => {
  if (!dueDate) return null;
  const dateObj = new Date(dueDate);
  if (isNaN(dateObj.getTime())) return null;

  if (dateObj.getFullYear() === targetYear) {
    return formatDateKey(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate()
    );
  }
  return null;
};

// Group tasks by date
const groupTasksByDate = (tasks: Task[], year: number): Map<string, Task[]> => {
  const map = new Map<string, Task[]>();
  for (const task of tasks) {
    const key = parseDueDateToKey(task.dueDate, year);
    if (key) {
      const arr = map.get(key) || [];
      arr.push(task);
      map.set(key, arr);
    }
  }
  return map;
};

// Generate weeks for a given month
const getMonthWeeks = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: any[] = [];
  let week: any[] = [];

  for (let i = 0; i < firstDay; i++) week.push({ day: 0 });

  for (let d = 1; d <= daysInMonth; d++) {
    week.push({ day: d });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push({ day: 0 });
    weeks.push(week);
  }

  return weeks;
};

// Month Card Component
const MonthCard = ({ year, month, tasksByDate, onDateClick }: any) => {
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  const weeks = getMonthWeeks(year, month);

  return (
    <div className="month-card">
      <div className="month-header">{monthName}</div>

      <div className="weekdays">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {weeks.map((week: any, i: number) => (
        <div className="week-row" key={i}>
          {week.map((dayObj: any, j: number) => {
            const key = formatDateKey(year, month, dayObj.day);
            const dayTasks = tasksByDate.get(key) || [];

            return (
              <div
                key={j}
                className={`day-cell ${dayObj.day === 0 ? "empty" : ""}`}
                onClick={() => dayObj.day !== 0 && onDateClick(key, dayTasks)}
              >
                <div className="day-number">{dayObj.day !== 0 ? dayObj.day : ""}</div>

                {dayTasks.slice(0, 2).map((task: Task) => (
                  <div key={task.id} className="task-dot">
                    {task.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Calendar Page Component
const Calendar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const tasksByDate = useMemo(
    () => groupTasksByDate(tasks, currentYear),
    [tasks, currentYear]
  );

  const handleDateClick = (dateKey: string, tasks: Task[]) => {
    setSelectedDate(dateKey);
    setSelectedTasks(tasks);
    setShowForm(false);
  };

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === "Completed" ? "In Progress" : "Completed";
    try {
      await updateTask(task.id, { status: newStatus });
      await fetchTasks();
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const handleCreateTask = async (data: any) => {
    try {
      await createTask({
        ...data,
        due_date: selectedDate,
      });

      await fetchTasks();

      const updated = await getTasks();
      const tasksForDate = updated.filter(
        (t) => parseDueDateToKey(t.dueDate, currentYear) === selectedDate
      );
      setSelectedTasks(tasksForDate);

      setShowForm(false);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="calendar-page">
      <h1>Task Calendar</h1>

      <div className="calendar-grid">
        {months.map((month) => (
          <MonthCard
            key={month}
            year={currentYear}
            month={month}
            tasksByDate={tasksByDate}
            onDateClick={handleDateClick}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="calendar-modal">
          <div className="calendar-modal-content">
            <h3>Tasks on {selectedDate}</h3>

            {selectedTasks.length === 0 ? (
              <p>No tasks for this date</p>
            ) : (
              selectedTasks.map((task) => (
                <div key={task.id} className="calendar-task-item">
                  <span>{task.title}</span>
                  <button onClick={() => toggleTaskStatus(task)}>
                    {task.status === "Completed" ? "Undo" : "Mark Completed"}
                  </button>
                </div>
              ))
            )}

            {/* CREATE TASK BUTTON */}
            {!showForm ? (
              <button
                className="add-task-btn"
                onClick={() => setShowForm(true)}
              >
                + Create Task
              </button>
            ) : (
              <>
                <h3>Create New Task</h3>
                <TaskForm
                  onSubmit={handleCreateTask}
                  initialData={{ due_date: selectedDate }}
                />
              </>
            )}

            <button
              onClick={() => {
                setSelectedDate(null);
                setShowForm(false);
              }}
              className="close-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;