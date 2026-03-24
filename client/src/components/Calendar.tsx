import React, { useMemo, useState } from "react";
import { tasks } from "../data/dummyData";
import type { Task } from "../types/types";
import TaskForm from "./TaskForm";
import "../styles/Calendar.css";

const formatDateKey = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const parseDueDateToKey = (dueDate: string, targetYear: number): string | null => {
  if (dueDate === "Today") {
    const today = new Date();
    return formatDateKey(targetYear, today.getMonth(), today.getDate());
  }

  const parts = dueDate.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    if (year === targetYear) {
      return formatDateKey(year, month, day);
    }
  }
  return null;
};

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

const Calendar: React.FC = () => {
  const year = 2023;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const tasksByDate = useMemo(() => groupTasksByDate(tasks, year), []);

  const handleDateClick = (dateKey: string, tasks: Task[]) => {
    setSelectedDate(dateKey);
    setSelectedTasks(tasks);
  };

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="calendar-page">
      <h1>Task Calendar</h1>

      <div className="calendar-grid">
        {months.map((month) => (
          <MonthCard
            key={month}
            year={year}
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
                  {task.title}
                </div>
              ))
            )}

            <h3>Create New Task</h3>
            <TaskForm initialData={{ date: selectedDate }} />

            <button onClick={() => setSelectedDate(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;