import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface Props {
  completed: number;
  inProgress: number;
}

const TaskPieChart: React.FC<Props> = ({ completed, inProgress }) => {
  const total = completed + inProgress;

  const completedData = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: total - completed },
  ];

  const progressData = [
    { name: "In Progress" , value: inProgress },
    { name: "Remaining", value: total - inProgress },
  ];
  const completedPercent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const progressPercent = total === 0 ? 0 : Math.round((inProgress / total) * 100);

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {/* Completed */}
      <div>
        <PieChart width={150} height={150}>
          <Pie data={completedData} dataKey="value" innerRadius={40} outerRadius={60}>
            <Cell fill="green" />
            <Cell fill="#eee" />
          </Pie>
        </PieChart>
        <p style={{ textAlign: "center" }}>
          {completedPercent}% Completed
        </p>
      </div>

      {/* In Progress */}
      <div>
        <PieChart width={150} height={150}>
          <Pie data={progressData} dataKey="value" innerRadius={40} outerRadius={60}>
            <Cell fill="blue" />
            <Cell fill="#eee" />
          </Pie>
        </PieChart>
        <p style={{ textAlign: "center" }}>
          {progressPercent}% In Progress
        </p>
      </div>
    </div>
  );
};

export default TaskPieChart;